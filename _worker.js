/*
 * منصة نواتج التعلم — API (Cloudflare Pages Functions + D1)
 * كل البيانات (الطلاب، المعلمون، النتائج، الإعدادات) تُخزَّن مركزيًا في D1
 * ويراها جميع المستخدمين من أي جهاز فور حفظها — لا تخزين محلي (localStorage) للبيانات إطلاقًا.
 *
 * ملاحظات أمنية:
 * - كلمات مرور المعلمين والمشرف تُخزَّن بصيغة مُجزّأة PBKDF2-SHA256 (20000 تكرار) + ملح عشوائي، وليست نصًا صريحًا.
 * - الإجابة الصحيحة لأي سؤال (answer_index) لا تُرسل للمتصفح إطلاقًا قبل تسليم الإجابات؛ التصحيح يتم على الخادم فقط.
 * - كل طلب (عدا تسجيل الدخول والصحة) يتطلب رمز جلسة صالح عبر ترويسة Authorization: Bearer <token>.
 * - نطاق كل معلم مقيّد تلقائيًا بصفّه وفصوله ومادته المسندة من المشرف؛ لا يرى بيانات بقية المدرسة.
 */

const DAY_CODES = ['SU','MO','TU','WE','TH','FR','SA'];
const DAY_NAMES = {SU:'الأحد',MO:'الاثنين',TU:'الثلاثاء',WE:'الأربعاء',TH:'الخميس',FR:'الجمعة',SA:'السبت'};
const PBKDF2_ITERATIONS = 20000;
const SESSION_HOURS = 12;

// ---------- ردود موحّدة ----------
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
}
const badRequest   = (msg = 'طلب غير صالح')      => json({ ok: false, error: msg }, 400);
const unauthorized = (msg = 'غير مصرح بالدخول')   => json({ ok: false, error: msg }, 401);
const forbidden    = (msg = 'لا تملك صلاحية لهذا الإجراء') => json({ ok: false, error: msg }, 403);
const notFound     = (msg = 'غير موجود')          => json({ ok: false, error: msg }, 404);

// ---------- تجزئة كلمات المرور (PBKDF2-SHA256) ----------
function toHex(buf) { return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join(''); }
function fromHex(hex) { const a = new Uint8Array(hex.length / 2); for (let i = 0; i < a.length; i++) a[i] = parseInt(hex.substr(i * 2, 2), 16); return a; }
async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, keyMaterial, 256);
  return toHex(salt) + ':' + toHex(bits);
}
async function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [saltHex, hashHex] = stored.split(':');
  const salt = fromHex(saltHex);
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password || ''), { name: 'PBKDF2' }, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, keyMaterial, 256);
  return toHex(bits) === hashHex;
}

// ---------- الوقت/اليوم بتوقيت الرياض (UTC+3، بلا توقيت صيفي) ----------
function riyadhToday() {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' });
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]));
  const code = parts.weekday.slice(0, 2).toUpperCase();
  return { dateStr: `${parts.year}-${parts.month}-${parts.day}`, code };
}
function weekNumber(semesterStart) {
  const { dateStr } = riyadhToday();
  const [y1, m1, d1] = dateStr.split('-').map(Number);
  const [y2, m2, d2] = String(semesterStart).split('-').map(Number);
  const days = Math.floor((Date.UTC(y1, m1 - 1, d1) - Date.UTC(y2, m2 - 1, d2)) / 86400000);
  let w = Math.floor(days / 7) + 1;
  if (w < 1) w = 1; if (w > 17) w = 17;
  return w;
}
function motivationLine(pct) {
  if (pct >= 90) return 'إنجاز رائع! أداء متميز يستحق الفخر 🏆';
  if (pct >= 80) return 'أحسنت! أداء ممتاز، استمر على هذا المستوى 🎉';
  if (pct >= 60) return 'عمل جيد! خطوة أخرى نحو الإتقان الكامل 💪';
  return 'لا بأس، كل محاولة خطوة للأمام. راجع الدرس وحاول مرة أخرى 🌱';
}
function subjectsForGrade(grade) { return Number(grade) === 3 ? ['لغتي', 'رياضيات'] : ['لغتي', 'رياضيات', 'علوم']; }
function parseClasses(classesStr) { return String(classesStr || '').split(/[,،]+/).map(x => x.trim()).filter(Boolean); }

// ---------- الإعدادات ----------
async function readSettings(env) {
  const { results } = await env.DB.prepare('SELECT key,value FROM settings').all();
  const map = {}; results.forEach(r => { map[r.key] = r.value; });
  return {
    examDays: [map.exam_day1 || 'SU', map.exam_day2 || 'WE'],
    semesterStart: map.semester_start || '2026-08-30',
    supervisorUsername: map.supervisor_username || 'admin',
    supervisorPasswordHash: map.supervisor_password_hash || null,
    manualOpenWeek: map.manual_open_week ? Number(map.manual_open_week) : null,
    subjectsSeparate: map.subjects_separate === '1',
  };
}
async function upsertSetting(env, key, value) {
  await env.DB.prepare("INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(key, value).run();
}

// ---------- الجلسات ----------
function newToken() { return crypto.randomUUID() + crypto.randomUUID(); }
async function createSession(env, { role, ref_id, name, grade, classes, subject }) {
  const token = newToken();
  const expires = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();
  await env.DB.prepare('INSERT INTO sessions(token,role,ref_id,name,grade,classes,subject,expires_at) VALUES (?,?,?,?,?,?,?,?)')
    .bind(token, role, ref_id, name || null, grade || null, classes || null, subject || null, expires).run();
  return { token, expires };
}
async function getSession(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  const row = await env.DB.prepare('SELECT * FROM sessions WHERE token=?').bind(token).first();
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();
    return null;
  }
  return row;
}

// ---------- تسجيل الدخول/الخروج ----------
async function handleLogin(request, env) {
  let body; try { body = await request.json(); } catch { return badRequest('بيانات غير صالحة'); }
  const { role, username, password } = body || {};
  if (!role || !username) return badRequest('أدخل بيانات الدخول');
  const uname = String(username).trim();

  if (role === 'student') {
    const s = await env.DB.prepare('SELECT * FROM students WHERE id=? AND active=1').bind(uname).first();
    if (!s) return unauthorized('رقم الهوية غير مسجل لدى المدرسة. راجع معلم المادة.');
    const { token, expires } = await createSession(env, { role: 'student', ref_id: s.id, name: s.name, grade: s.grade, classes: s.class_name });
    return json({ ok: true, token, expires, user: { id: s.id, name: s.name, grade: s.grade, class: s.class_name, role: 'student' } });
  }
  if (role === 'teacher') {
    const t = await env.DB.prepare('SELECT * FROM teachers WHERE username=? AND active=1').bind(uname).first();
    if (!t || !(await verifyPassword(password || '', t.password_hash))) return unauthorized('اسم المستخدم أو كلمة المرور غير صحيحة');
    const { token, expires } = await createSession(env, { role: 'teacher', ref_id: t.username, name: t.name, grade: t.grade, classes: t.classes, subject: t.subject });
    return json({ ok: true, token, expires, user: { name: t.name, username: t.username, grade: t.grade, classes: t.classes, subject: t.subject, role: 'teacher' } });
  }
  if (role === 'supervisor') {
    const s = await readSettings(env);
    if (uname !== s.supervisorUsername || !(await verifyPassword(password || '', s.supervisorPasswordHash))) return unauthorized('اسم المستخدم أو كلمة المرور غير صحيحة');
    const { token, expires } = await createSession(env, { role: 'supervisor', ref_id: s.supervisorUsername, name: 'المشرف العام' });
    return json({ ok: true, token, expires, user: { name: 'المشرف العام', username: s.supervisorUsername, role: 'supervisor' } });
  }
  return badRequest('نوع مستخدم غير معروف');
}
async function handleLogout(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (token) await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();
  return json({ ok: true });
}
async function handleMe(request, env) {
  const session = await getSession(request, env);
  if (!session) return unauthorized();
  if (session.role === 'student') {
    const s = await env.DB.prepare('SELECT * FROM students WHERE id=? AND active=1').bind(session.ref_id).first();
    if (!s) return unauthorized();
    return json({ ok: true, user: { id: s.id, name: s.name, grade: s.grade, class: s.class_name, role: 'student' } });
  }
  if (session.role === 'teacher') {
    return json({ ok: true, user: { name: session.name, username: session.ref_id, grade: session.grade, classes: session.classes, subject: session.subject, role: 'teacher' } });
  }
  return json({ ok: true, user: { name: session.name || 'المشرف العام', username: session.ref_id, role: 'supervisor' } });
}

// ---------- الطلاب ----------
function normalizePhone(raw) {
  if (!raw) return null;
  let d = String(raw).replace(/[^\d]/g, '');
  if (!d) return null;
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('0')) d = '966' + d.slice(1);
  if (d.length === 9 && d.startsWith('5')) d = '966' + d;
  if (!d.startsWith('966') && d.length === 10 && d.startsWith('05')) d = '966' + d.slice(1);
  return d;
}

async function listStudents(session, env) {
  if (session.role === 'supervisor') {
    const { results } = await env.DB.prepare('SELECT id,name,grade,class_name,parent_phone FROM students WHERE active=1 ORDER BY grade,class_name,name').all();
    return json({ ok: true, students: results.map(r => ({ id: r.id, name: r.name, grade: r.grade, class: r.class_name, phone: r.parent_phone || null })) });
  }
  if (session.role === 'teacher') {
    const classes = parseClasses(session.classes);
    if (!classes.length) return json({ ok: true, students: [] });
    const ph = classes.map(() => '?').join(',');
    const { results } = await env.DB.prepare(`SELECT id,name,grade,class_name,parent_phone FROM students WHERE active=1 AND grade=? AND class_name IN (${ph}) ORDER BY class_name,name`).bind(session.grade, ...classes).all();
    return json({ ok: true, students: results.map(r => ({ id: r.id, name: r.name, grade: r.grade, class: r.class_name, phone: r.parent_phone || null })) });
  }
  return forbidden();
}
async function createStudent(session, env, request) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { id, name, grade, class: className, phone } = body || {};
  if (!id || !name || !grade || !className) return badRequest('بيانات ناقصة');
  const exists = await env.DB.prepare('SELECT id FROM students WHERE id=?').bind(String(id)).first();
  if (exists) return badRequest('رقم الهوية مسجل مسبقًا');
  await env.DB.prepare('INSERT INTO students(id,name,grade,class_name,parent_phone) VALUES (?,?,?,?,?)').bind(String(id), name, Number(grade), className, normalizePhone(phone)).run();
  return json({ ok: true });
}
async function updateStudent(session, env, request, id) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { name, grade, class: className, phone } = body || {};
  await env.DB.prepare('UPDATE students SET name=COALESCE(?,name), grade=COALESCE(?,grade), class_name=COALESCE(?,class_name), parent_phone=COALESCE(?,parent_phone) WHERE id=?')
    .bind(name || null, grade ? Number(grade) : null, className || null, phone !== undefined ? normalizePhone(phone) : null, id).run();
  return json({ ok: true });
}
async function deleteStudent(session, env, id) {
  if (session.role !== 'supervisor') return forbidden();
  await env.DB.prepare('UPDATE students SET active=0 WHERE id=?').bind(id).run(); // حذف ناعم: تبقى نتائجه التاريخية محفوظة
  return json({ ok: true });
}
async function importPhones(session, env, request) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const rows = Array.isArray(body && body.rows) ? body.rows : [];
  if (!rows.length) return badRequest('لا توجد بيانات للاستيراد');
  let updated = 0; const notFound = [];
  for (const row of rows) {
    const id = String(row.id || '').trim();
    const phone = normalizePhone(row.phone);
    if (!id || !phone) continue;
    const r = await env.DB.prepare('UPDATE students SET parent_phone=? WHERE id=? AND active=1').bind(phone, id).run();
    if (r.meta && r.meta.changes) updated++; else notFound.push(id);
  }
  return json({ ok: true, updated, notFoundCount: notFound.length, notFound: notFound.slice(0, 20) });
}

// ---------- مزامنة كاملة لقائمة الطلاب من إكسل (المشرف فقط): إضافة الجديد، تحديث الموجود، وحذف غير الموجود بالملف ----------
async function syncStudentsExcel(session, env, request) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const rows = Array.isArray(body && body.rows) ? body.rows : [];
  if (!rows.length) return badRequest('لا توجد بيانات للمزامنة');
  const seenIds = new Set();
  let added = 0, updated = 0, skipped = 0;
  for (const row of rows) {
    const id = String(row.id || '').trim();
    const name = String(row.name || '').trim();
    const grade = Number(row.grade);
    const className = String(row.class || '').trim();
    if (!id || !name || !grade || !className || !(grade === 3 || grade === 6)) { skipped++; continue; }
    seenIds.add(id);
    const phone = row.phone ? normalizePhone(row.phone) : null;
    const existing = await env.DB.prepare('SELECT id FROM students WHERE id=?').bind(id).first();
    if (existing) {
      await env.DB.prepare('UPDATE students SET name=?, grade=?, class_name=?, active=1, parent_phone=COALESCE(?,parent_phone) WHERE id=?')
        .bind(name, grade, className, phone, id).run();
      updated++;
    } else {
      await env.DB.prepare('INSERT INTO students(id,name,grade,class_name,parent_phone) VALUES (?,?,?,?,?)').bind(id, name, grade, className, phone).run();
      added++;
    }
  }
  const { results: activeStudents } = await env.DB.prepare('SELECT id FROM students WHERE active=1').all();
  let removed = 0;
  for (const s of activeStudents) {
    if (!seenIds.has(s.id)) {
      await env.DB.prepare('UPDATE students SET active=0 WHERE id=?').bind(s.id).run();
      removed++;
    }
  }
  return json({ ok: true, added, updated, removed, skipped });
}

// ---------- المعلمون ----------
async function listTeachers(session, env) {
  if (session.role !== 'supervisor') return forbidden();
  const { results } = await env.DB.prepare('SELECT name,username,subject,grade,classes FROM teachers WHERE active=1 ORDER BY name').all();
  return json({ ok: true, teachers: results });
}
async function createTeacher(session, env, request) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { name, username, subject, grade, classes, password } = body || {};
  if (!name || !username || !subject || !grade || !classes || !password) return badRequest('بيانات ناقصة');
  const exists = await env.DB.prepare('SELECT id FROM teachers WHERE username=?').bind(username).first();
  if (exists) return badRequest('اسم المستخدم مستخدم من قبل، اختر اسمًا آخر');
  const hash = await hashPassword(password);
  await env.DB.prepare('INSERT INTO teachers(name,username,password_hash,subject,grade,classes) VALUES (?,?,?,?,?,?)')
    .bind(name, username, hash, subject, Number(grade), classes).run();
  return json({ ok: true });
}
async function deleteTeacher(session, env, username) {
  if (session.role !== 'supervisor') return forbidden();
  await env.DB.prepare('UPDATE teachers SET active=0 WHERE username=?').bind(username).run();
  return json({ ok: true });
}

// ---------- المنهج وبنك الأسئلة (عرض فقط، بلا إجابات) ----------
async function getCurriculum(env) {
  const { results } = await env.DB.prepare('SELECT grade,subject,week,lesson FROM curriculum ORDER BY grade,subject,week').all();
  return json({ ok: true, curriculum: results });
}
async function listQuestionsBank(session, env) {
  if (session.role === 'teacher') {
    const { results } = await env.DB.prepare('SELECT id,grade,subject,week,lesson,question FROM questions WHERE active=1 AND grade=? AND subject=? ORDER BY week,id').bind(session.grade, session.subject).all();
    return json({ ok: true, questions: results });
  }
  if (session.role === 'supervisor') {
    const { results } = await env.DB.prepare('SELECT id,grade,subject,week,lesson,question FROM questions WHERE active=1 ORDER BY grade,subject,week,id').all();
    return json({ ok: true, questions: results });
  }
  return forbidden();
}

// ---------- إضافة سؤال جديد لبنك الأسئلة (المعلم فقط، لمادته وصفّه المسندين) ----------
async function createQuestion(session, env, request) {
  if (session.role !== 'teacher') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { week, lesson, question, choices, answerIndex } = body || {};
  const w = Number(week);
  if (!Number.isInteger(w) || w < 1 || w > 17) return badRequest('رقم الأسبوع يجب أن يكون بين 1 و17');
  if (!question || !String(question).trim()) return badRequest('نص السؤال مطلوب');
  if (!Array.isArray(choices) || choices.length < 2 || choices.some(c => !c || !String(c).trim())) return badRequest('يجب إدخال خيارين على الأقل، كلها غير فارغة');
  const ai = Number(answerIndex);
  if (!Number.isInteger(ai) || ai < 0 || ai >= choices.length) return badRequest('حدد الإجابة الصحيحة من بين الخيارات المدخلة');
  await env.DB.prepare('INSERT INTO questions(grade,subject,week,lesson,question,choices_json,answer_index) VALUES (?,?,?,?,?,?,?)')
    .bind(session.grade, session.subject, w, lesson || null, String(question).trim(), JSON.stringify(choices.map(c => String(c).trim())), ai).run();
  return json({ ok: true });
}

// ---------- تحديد الطالب المستهدف (نفسه إن كان طالبًا، أو ضمن نطاق المعلم عبر وضع "فتح باسم الطالب") ----------
async function resolveTargetStudent(session, env, studentIdParam) {
  if (session.role === 'student') {
    return await env.DB.prepare('SELECT * FROM students WHERE id=? AND active=1').bind(session.ref_id).first();
  }
  if (session.role === 'teacher') {
    if (!studentIdParam) return null;
    const s = await env.DB.prepare('SELECT * FROM students WHERE id=? AND active=1').bind(studentIdParam).first();
    if (!s) return null;
    const classes = parseClasses(session.classes);
    if (String(s.grade) !== String(session.grade) || !classes.includes(s.class_name)) return null;
    return s;
  }
  return null;
}

// ---------- التحقق من إذن استكمال أسبوع فائت ----------
async function hasCatchupGrant(env, studentId, week) {
  const row = await env.DB.prepare('SELECT id FROM catchup_grants WHERE student_id=? AND week=?').bind(studentId, week).first();
  return !!row;
}

// ---------- تحديد الأسبوع المستهدف (الحالي، أو أسبوع فائت مصرَّح به) ----------
async function resolveTargetWeek(session, env, student, requestedWeek, currentWk) {
  if (!requestedWeek || Number(requestedWeek) === currentWk) return { week: currentWk, isCatchup: false, error: null };
  const w = Number(requestedWeek);
  if (!Number.isInteger(w) || w < 1 || w >= currentWk) return { week: currentWk, isCatchup: false, error: 'أسبوع غير صالح' };
  if (session.role === 'teacher') return { week: w, isCatchup: true, error: null }; // المعلم يفتح أي أسبوع فائت مباشرة نيابةً عن الطالب
  const granted = await hasCatchupGrant(env, student.id, w);
  if (!granted) return { week: currentWk, isCatchup: false, error: 'هذا الأسبوع غير مسموح لك بعد. اطلب من معلمك منحك صلاحية استكماله.' };
  return { week: w, isCatchup: true, error: null };
}

// ---------- اختبار الأسبوع ----------
async function getWeekTest(session, env, url) {
  if (session.role !== 'student' && session.role !== 'teacher') return forbidden();
  const student = await resolveTargetStudent(session, env, url.searchParams.get('studentId'));
  if (!student) return badRequest('طالب غير موجود أو خارج نطاقك');
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const { code } = riyadhToday();
  const manualOpen = settings.manualOpenWeek === currentWk;
  const isExamDay = settings.examDays.includes(code) || manualOpen;
  const examDayNames = settings.examDays.map(c => DAY_NAMES[c]).join(' و');

  const requestedWeek = url.searchParams.get('week');
  const wk = await resolveTargetWeek(session, env, student, requestedWeek, currentWk);
  if (wk.error) return badRequest(wk.error);
  const week = wk.week;
  const allSubjects = subjectsForGrade(student.grade);
  const stObj = { id: student.id, name: student.name, grade: student.grade, class: student.class_name };

  if (settings.subjectsSeparate) {
    const requestedSubject = url.searchParams.get('subject');
    if (!requestedSubject) {
      const { results: doneRows } = await env.DB.prepare('SELECT subject, correct FROM attempts WHERE student_id=? AND week=?').bind(student.id, week).all();
      const bySubj = {};
      doneRows.forEach(r => { bySubj[r.subject] = bySubj[r.subject] || { total: 0, correct: 0 }; bySubj[r.subject].total++; if (r.correct) bySubj[r.subject].correct++; });
      const subjectsOut = allSubjects.map(s => {
        const d = bySubj[s];
        if (d) { const pct = Math.round((d.correct / d.total) * 100); return { subject: s, completed: true, total: d.total, correct: d.correct, pct, message: motivationLine(pct) }; }
        return { subject: s, completed: false };
      });
      const allDone = subjectsOut.every(s => s.completed);
      return json({ ok: true, mode: 'separate', week, isExamDay, completed: allDone, examDayNames, isCatchup: wk.isCatchup, manualOpen, student: stObj, subjects: subjectsOut });
    }
    if (!allSubjects.includes(requestedSubject)) return badRequest('مادة غير صالحة لصف هذا الطالب');
    const existing = await env.DB.prepare('SELECT correct FROM attempts WHERE student_id=? AND week=? AND subject=?').bind(student.id, week, requestedSubject).all();
    if (existing.results.length) {
      const total = existing.results.length, correct = existing.results.filter(r => r.correct).length;
      const pct = Math.round((correct / total) * 100);
      return json({ ok: true, mode: 'separate', week, subject: requestedSubject, isExamDay, completed: true, examDayNames, isCatchup: wk.isCatchup, manualOpen, student: stObj,
        result: { total, correct, wrong: total - correct, pct, message: motivationLine(pct) } });
    }
    if (session.role === 'student' && !wk.isCatchup && !isExamDay) {
      return json({ ok: true, mode: 'separate', week, subject: requestedSubject, isExamDay: false, completed: false, questions: [], examDayNames, isCatchup: false, manualOpen: false, student: stObj });
    }
    const { results } = await env.DB.prepare('SELECT id,grade,subject,week,lesson,question,choices_json FROM questions WHERE active=1 AND grade=? AND subject=? AND week=? ORDER BY id')
      .bind(student.grade, requestedSubject, week).all();
    const qOut = results.map(q => ({ id: q.id, subject: q.subject, week: q.week, lesson: q.lesson, question: q.question, choices: JSON.parse(q.choices_json) }));
    return json({ ok: true, mode: 'separate', week, subject: requestedSubject, isExamDay: true, completed: false, examDayNames, isCatchup: wk.isCatchup, manualOpen, student: stObj, questions: qOut });
  }

  // ---- الوضع المجتمع (الافتراضي): كل مواد الطالب في اختبار واحد ----
  const existing = await env.DB.prepare('SELECT correct FROM attempts WHERE student_id=? AND week=?').bind(student.id, week).all();
  if (existing.results.length) {
    const total = existing.results.length, correct = existing.results.filter(r => r.correct).length;
    const pct = Math.round((correct / total) * 100);
    return json({ ok: true, mode: 'combined', week, isExamDay, completed: true, examDayNames, isCatchup: wk.isCatchup, manualOpen, student: stObj,
      result: { total, correct, wrong: total - correct, pct, message: motivationLine(pct) } });
  }
  if (session.role === 'student' && !wk.isCatchup && !isExamDay) {
    return json({ ok: true, mode: 'combined', week, isExamDay: false, completed: false, questions: [], examDayNames, isCatchup: false, manualOpen: false, student: stObj });
  }
  let questions = [];
  for (const sub of allSubjects) {
    const { results } = await env.DB.prepare('SELECT id,grade,subject,week,lesson,question,choices_json FROM questions WHERE active=1 AND grade=? AND subject=? AND week=? ORDER BY id')
      .bind(student.grade, sub, week).all();
    questions.push(...results);
  }
  const qOut = questions.map(q => ({ id: q.id, subject: q.subject, week: q.week, lesson: q.lesson, question: q.question, choices: JSON.parse(q.choices_json) }));
  return json({ ok: true, mode: 'combined', week, isExamDay: true, completed: false, examDayNames, isCatchup: wk.isCatchup, manualOpen, student: stObj, questions: qOut });
}

async function submitWeekTest(session, env, request) {
  if (session.role !== 'student' && session.role !== 'teacher') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { studentId, answers, reason, week: requestedWeek, subject: requestedSubject } = body || {};
  const student = await resolveTargetStudent(session, env, studentId);
  if (!student) return badRequest('طالب غير موجود أو خارج نطاقك');
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const { code } = riyadhToday();

  const wk = await resolveTargetWeek(session, env, student, requestedWeek, currentWk);
  if (wk.error) return badRequest(wk.error);
  const week = wk.week;
  const manualOpen = settings.manualOpenWeek === currentWk;
  if (session.role === 'student' && !wk.isCatchup && !settings.examDays.includes(code) && !manualOpen) return badRequest('لا يوجد اختبار اليوم');

  const allSubjects = subjectsForGrade(student.grade);
  let subjectsToGrade;
  if (settings.subjectsSeparate) {
    if (!requestedSubject || !allSubjects.includes(requestedSubject)) return badRequest('يجب تحديد المادة');
    const already = await env.DB.prepare('SELECT id FROM attempts WHERE student_id=? AND week=? AND subject=? LIMIT 1').bind(student.id, week, requestedSubject).first();
    if (already) return badRequest('تم إنجاز اختبار هذه المادة لهذا الأسبوع مسبقًا');
    subjectsToGrade = [requestedSubject];
  } else {
    const already = await env.DB.prepare('SELECT id FROM attempts WHERE student_id=? AND week=? LIMIT 1').bind(student.id, week).first();
    if (already) return badRequest('تم إنجاز اختبار هذا الأسبوع مسبقًا');
    subjectsToGrade = allSubjects;
  }

  let questions = [];
  for (const sub of subjectsToGrade) {
    const { results } = await env.DB.prepare('SELECT * FROM questions WHERE active=1 AND grade=? AND subject=? AND week=? ORDER BY id')
      .bind(student.grade, sub, week).all();
    questions.push(...results);
  }
  const ansMap = answers || {};
  const missing = questions.filter(q => { const sel = ansMap[String(q.id)]; return sel === undefined || sel === null || sel === ''; });
  if (missing.length) return badRequest(`لم تُجب عن جميع الأسئلة بعد (متبقٍ ${missing.length} سؤالًا). يجب الإجابة عن كل الأسئلة قبل الإرسال.`);

  const source = session.role === 'teacher' ? 'teacher_student_session' : 'self';
  const now = new Date().toISOString();
  let correctCount = 0, total = 0;
  for (const q of questions) {
    const sel = ansMap[String(q.id)];
    total++;
    const isCorrect = Number(sel) === Number(q.answer_index) ? 1 : 0;
    if (isCorrect) correctCount++;
    await env.DB.prepare('INSERT INTO attempts(student_id,question_id,week,subject,answer_index,correct,source,teacher_username,reason,entered_at) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .bind(student.id, q.id, week, q.subject, Number(sel), isCorrect, source, session.role === 'teacher' ? session.ref_id : null, reason || null, now).run();
  }
  if (!total) return badRequest('لا توجد أسئلة لهذا الأسبوع' + (settings.subjectsSeparate ? ' لهذه المادة' : ''));
  if (wk.isCatchup) {
    if (!settings.subjectsSeparate) {
      await env.DB.prepare('DELETE FROM catchup_grants WHERE student_id=? AND week=?').bind(student.id, week).run();
    } else {
      const doneSubjRows = await env.DB.prepare('SELECT DISTINCT subject FROM attempts WHERE student_id=? AND week=?').bind(student.id, week).all();
      const doneSubjSet = new Set(doneSubjRows.results.map(r => r.subject));
      if (allSubjects.every(s => doneSubjSet.has(s))) {
        await env.DB.prepare('DELETE FROM catchup_grants WHERE student_id=? AND week=?').bind(student.id, week).run();
      }
    }
  }
  const pct = Math.round((correctCount / total) * 100);
  return json({ ok: true, week, subject: settings.subjectsSeparate ? subjectsToGrade[0] : undefined, total, correct: correctCount, wrong: total - correctCount, pct, message: motivationLine(pct), studentName: student.name });
}

// ---------- الأسابيع الفائتة (للطالب: ما سُمح له باستكماله) ----------
async function myMissedWeeks(session, env) {
  if (session.role !== 'student') return forbidden();
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const { results: doneRows } = await env.DB.prepare('SELECT DISTINCT week FROM attempts WHERE student_id=?').bind(session.ref_id).all();
  const doneSet = new Set(doneRows.map(r => r.week));
  const { results: grantRows } = await env.DB.prepare('SELECT week FROM catchup_grants WHERE student_id=?').bind(session.ref_id).all();
  const weeks = grantRows.map(r => r.week).filter(w => w < currentWk && !doneSet.has(w)).sort((a, b) => a - b);
  return json({ ok: true, weeks });
}

// ---------- منح/سحب صلاحية استكمال أسبوع فائت (المعلم فقط) ----------
async function grantCatchup(session, env, request) {
  if (session.role !== 'teacher') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { studentId, week } = body || {};
  const student = await resolveTargetStudent(session, env, studentId);
  if (!student) return badRequest('طالب غير موجود أو خارج نطاقك');
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const w = Number(week);
  if (!Number.isInteger(w) || w < 1 || w >= currentWk) return badRequest('أسبوع غير صالح');
  await env.DB.prepare('INSERT OR IGNORE INTO catchup_grants(student_id,week,granted_by,granted_at) VALUES (?,?,?,?)')
    .bind(student.id, w, session.ref_id, new Date().toISOString()).run();
  return json({ ok: true });
}
async function revokeCatchup(session, env, request) {
  if (session.role !== 'teacher') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { studentId, week } = body || {};
  const student = await resolveTargetStudent(session, env, studentId);
  if (!student) return badRequest('طالب غير موجود أو خارج نطاقك');
  await env.DB.prepare('DELETE FROM catchup_grants WHERE student_id=? AND week=?').bind(student.id, Number(week)).run();
  return json({ ok: true });
}

// ---------- أسابيع طالب معيّن مع حالة الإنجاز والصلاحية (للمعلم) ----------
async function studentWeeksStatus(session, env, url) {
  if (session.role !== 'teacher' && session.role !== 'supervisor') return forbidden();
  const studentId = url.searchParams.get('studentId');
  const student = session.role === 'teacher' ? await resolveTargetStudent(session, env, studentId)
    : await env.DB.prepare('SELECT * FROM students WHERE id=? AND active=1').bind(studentId).first();
  if (!student) return badRequest('طالب غير موجود أو خارج نطاقك');
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const { results: doneRows } = await env.DB.prepare('SELECT DISTINCT week FROM attempts WHERE student_id=?').bind(student.id).all();
  const doneSet = new Set(doneRows.map(r => r.week));
  const { results: grantRows } = await env.DB.prepare('SELECT week FROM catchup_grants WHERE student_id=?').bind(student.id).all();
  const grantSet = new Set(grantRows.map(r => r.week));
  const weeks = [];
  for (let w = 1; w <= currentWk; w++) {
    weeks.push({ week: w, completed: doneSet.has(w), granted: grantSet.has(w), isCurrent: w === currentWk });
  }
  return json({ ok: true, student: { id: student.id, name: student.name, grade: student.grade, class: student.class_name }, weeks });
}

// ---------- نتائجي (الطالب) ----------
async function myResults(session, env) {
  if (session.role !== 'student') return forbidden();
  const { results } = await env.DB.prepare('SELECT week, correct FROM attempts WHERE student_id=?').bind(session.ref_id).all();
  const total = results.length, correct = results.filter(r => r.correct).length;
  const settings = await readSettings(env);
  const week = weekNumber(settings.semesterStart);
  const { code } = riyadhToday();
  const isExamDay = settings.examDays.includes(code);
  const examDayNames = settings.examDays.map(c => DAY_NAMES[c]).join(' و');
  const weekRows = results.filter(r => r.week === week);
  let weekBanner = null;
  if (weekRows.length) {
    const wt = weekRows.length, wc = weekRows.filter(r => r.correct).length;
    const pct = Math.round((wc / wt) * 100);
    weekBanner = { total: wt, correct: wc, pct, message: motivationLine(pct) };
  }
  const byWeekMap = {};
  results.forEach(r => { byWeekMap[r.week] = byWeekMap[r.week] || { total: 0, correct: 0 }; byWeekMap[r.week].total++; if (r.correct) byWeekMap[r.week].correct++; });
  const byWeek = Object.keys(byWeekMap).map(Number).sort((a, b) => a - b)
    .map(w => ({ week: w, total: byWeekMap[w].total, correct: byWeekMap[w].correct, pct: Math.round((byWeekMap[w].correct / byWeekMap[w].total) * 100) }));
  let change = null;
  if (byWeek.length >= 2) change = byWeek[byWeek.length - 1].pct - byWeek[byWeek.length - 2].pct;
  return json({ ok: true, total, correct, wrong: total - correct, achievement: Math.min(100, Math.round((total / 80) * 100)), week, isExamDay, examDayNames, weekBanner, byWeek, change });
}

// ---------- بنك أسئلتي (مراجعة الطالب لكل ما حلّه، مع كشف الإجابة الصحيحة للمحلول فقط) ----------
// لا تظهر أسئلة الأسابيع المستقبلية إطلاقًا حتى يأتي دورها
async function myQuestionBank(session, env) {
  if (session.role !== 'student') return forbidden();
  const s = await env.DB.prepare('SELECT * FROM students WHERE id=? AND active=1').bind(session.ref_id).first();
  if (!s) return unauthorized();
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const { results: qRows } = await env.DB.prepare('SELECT id,subject,week,lesson,question,choices_json,answer_index FROM questions WHERE active=1 AND grade=? AND week<=? ORDER BY subject,week,id').bind(s.grade, currentWk).all();
  const { results: aRows } = await env.DB.prepare('SELECT question_id,answer_index,correct FROM attempts WHERE student_id=?').bind(session.ref_id).all();
  const aMap = {}; aRows.forEach(a => { aMap[a.question_id] = a; });
  const out = qRows.map(q => {
    const a = aMap[q.id];
    const base = { id: q.id, subject: q.subject, week: q.week, lesson: q.lesson, question: q.question, choices: JSON.parse(q.choices_json) };
    if (a) return { ...base, attempted: true, selected: a.answer_index, correct: !!a.correct, correctIndex: q.answer_index };
    return { ...base, attempted: false };
  });
  return json({ ok: true, questions: out });
}

// ---------- إحصاءات الأداء الأسبوعي (للتقارير — معلم/مشرف) ----------
async function reportsStats(session, env) {
  if (session.role !== 'teacher' && session.role !== 'supervisor') return forbidden();
  let allowedIds = null;
  if (session.role === 'teacher') {
    const classes = parseClasses(session.classes);
    if (!classes.length) return json({ ok: true, weeks: [] });
    const ph = classes.map(() => '?').join(',');
    const { results } = await env.DB.prepare(`SELECT id FROM students WHERE active=1 AND grade=? AND class_name IN (${ph})`).bind(session.grade, ...classes).all();
    allowedIds = new Set(results.map(r => r.id));
  }
  const { results: rows } = await env.DB.prepare('SELECT student_id, week, correct FROM attempts').all();
  const filtered = allowedIds ? rows.filter(r => allowedIds.has(r.student_id)) : rows;
  const byWeekMap = {};
  filtered.forEach(r => { byWeekMap[r.week] = byWeekMap[r.week] || { total: 0, correct: 0 }; byWeekMap[r.week].total++; if (r.correct) byWeekMap[r.week].correct++; });
  const weeks = Object.keys(byWeekMap).map(Number).sort((a, b) => a - b)
    .map(w => ({ week: w, total: byWeekMap[w].total, correct: byWeekMap[w].correct, pct: Math.round((byWeekMap[w].correct / byWeekMap[w].total) * 100) }));
  let change = null;
  if (weeks.length >= 2) change = weeks[weeks.length - 1].pct - weeks[weeks.length - 2].pct;
  return json({ ok: true, weeks, change });
}

// ---------- نظرة عامة على الطلاب (للتقارير ولوحة المتابعة عند المعلم/المشرف) ----------
async function studentsOverview(session, env) {
  if (session.role !== 'teacher' && session.role !== 'supervisor') return forbidden();
  let students;
  if (session.role === 'supervisor') {
    const { results } = await env.DB.prepare('SELECT id,name,grade,class_name,parent_phone FROM students WHERE active=1 ORDER BY grade,class_name,name').all();
    students = results;
  } else {
    const classes = parseClasses(session.classes);
    if (!classes.length) students = [];
    else {
      const ph = classes.map(() => '?').join(',');
      const { results } = await env.DB.prepare(`SELECT id,name,grade,class_name,parent_phone FROM students WHERE active=1 AND grade=? AND class_name IN (${ph}) ORDER BY class_name,name`).bind(session.grade, ...classes).all();
      students = results;
    }
  }
  let aggMap = {};
  const { results: aggRows } = await env.DB.prepare(
    `SELECT student_id, COUNT(*) as total, SUM(correct) as correct, SUM(CASE WHEN source='teacher_student_session' THEN 1 ELSE 0 END) as proxy_count FROM attempts GROUP BY student_id`
  ).all();
  aggRows.forEach(r => { aggMap[r.student_id] = { total: r.total, correct: r.correct || 0, proxyCount: r.proxy_count || 0 }; });
  const settings = await readSettings(env);
  const currentWk = weekNumber(settings.semesterStart);
  const { results: currentWeekRows } = await env.DB.prepare('SELECT DISTINCT student_id FROM attempts WHERE week=?').bind(currentWk).all();
  const currentWeekDoneSet = new Set(currentWeekRows.map(r => r.student_id));
  const qCountRow = session.role === 'teacher'
    ? await env.DB.prepare('SELECT COUNT(*) as c FROM questions WHERE active=1 AND grade=? AND subject=?').bind(session.grade, session.subject).first()
    : await env.DB.prepare('SELECT COUNT(*) as c FROM questions WHERE active=1').first();

  const list = students.map(s => {
    const a = aggMap[s.id] || { total: 0, correct: 0, proxyCount: 0 };
    const wrong = a.total - a.correct;
    const acc = a.total ? a.correct / a.total : null;
    const status = a.total === 0 ? 'not_started' : (acc < 0.5 && a.total >= 4) ? 'struggling' : 'ok';
    return { id: s.id, name: s.name, grade: s.grade, class: s.class_name, phone: s.parent_phone || null, total: a.total, correct: a.correct, wrong, proxyCount: a.proxyCount, status, accuracyPct: acc !== null ? Math.round(acc * 100) : null, currentWeekDone: currentWeekDoneSet.has(s.id) };
  });
  return json({ ok: true, students: list, questionBankCount: qCountRow ? qCountRow.c : 0, currentWeek: currentWk });
}

// ---------- الإعدادات ----------
async function getSettingsRoute(env) {
  const s = await readSettings(env);
  return json({ ok: true, settings: { examDays: s.examDays, semesterStart: s.semesterStart, supervisorUsername: s.supervisorUsername, currentWeek: weekNumber(s.semesterStart), manualOpenWeek: s.manualOpenWeek, subjectsSeparate: s.subjectsSeparate } });
}
async function putSettingsRoute(session, env, request) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { examDays, semesterStart, manualOpenWeek, subjectsSeparate } = body || {};
  if (Array.isArray(examDays) && examDays.length === 2 && examDays.every(c => DAY_CODES.includes(c))) {
    await upsertSetting(env, 'exam_day1', examDays[0]);
    await upsertSetting(env, 'exam_day2', examDays[1]);
  }
  if (semesterStart && /^\d{4}-\d{2}-\d{2}$/.test(semesterStart)) {
    await upsertSetting(env, 'semester_start', semesterStart);
  }
  if (manualOpenWeek !== undefined) {
    if (manualOpenWeek === null || manualOpenWeek === '') await upsertSetting(env, 'manual_open_week', '');
    else if (Number.isInteger(Number(manualOpenWeek)) && Number(manualOpenWeek) >= 1 && Number(manualOpenWeek) <= 17) await upsertSetting(env, 'manual_open_week', String(Number(manualOpenWeek)));
    else return badRequest('رقم أسبوع غير صالح');
  }
  if (subjectsSeparate !== undefined) {
    await upsertSetting(env, 'subjects_separate', subjectsSeparate ? '1' : '0');
  }
  return json({ ok: true });
}
async function putSupervisorCreds(session, env, request) {
  if (session.role !== 'supervisor') return forbidden();
  let body; try { body = await request.json(); } catch { return badRequest(); }
  const { username, password } = body || {};
  if (!username || !password || password.length < 6) return badRequest('اسم مستخدم وكلمة مرور صالحة (6 أحرف فأكثر) مطلوبة');
  const hash = await hashPassword(password);
  await upsertSetting(env, 'supervisor_username', username);
  await upsertSetting(env, 'supervisor_password_hash', hash);
  return json({ ok: true });
}


// ---------- توجيه طلبات API (نفس منطق functions/api/[[path]].js، بصيغة _worker.js) ----------
async function handleApi(request, env, path) {
  const url = new URL(request.url);
  const method = request.method;
  const seg = path.split('/').filter(Boolean);

  if (path === 'health') return json({ ok: true, school: 'مدرسة أبوداوود الابتدائية', semester: 'الفصل الأول 1448هـ' });
  if (!env.DB) return json({ ok: false, demo: true, error: 'D1 binding DB غير مهيأ. راجع إعدادات المشروع وربط قاعدة البيانات.' }, 503);

  try {
    if (method === 'POST' && path === 'login') return await handleLogin(request, env);
    if (method === 'POST' && path === 'logout') return await handleLogout(request, env);
    if (method === 'GET' && path === 'me') return await handleMe(request, env);

    const session = await getSession(request, env);
    if (!session) return unauthorized();

    if (method === 'GET' && path === 'students') return await listStudents(session, env);
    if (method === 'POST' && path === 'students') return await createStudent(session, env, request);
    if (method === 'POST' && path === 'students/import-phones') return await importPhones(session, env, request);
    if (method === 'POST' && path === 'students/sync-excel') return await syncStudentsExcel(session, env, request);
    if (method === 'PUT' && seg[0] === 'students' && seg[1]) return await updateStudent(session, env, request, decodeURIComponent(seg[1]));
    if (method === 'DELETE' && seg[0] === 'students' && seg[1]) return await deleteStudent(session, env, decodeURIComponent(seg[1]));

    if (method === 'GET' && path === 'teachers') return await listTeachers(session, env);
    if (method === 'POST' && path === 'teachers') return await createTeacher(session, env, request);
    if (method === 'DELETE' && seg[0] === 'teachers' && seg[1]) return await deleteTeacher(session, env, decodeURIComponent(seg[1]));

    if (method === 'GET' && path === 'curriculum') return await getCurriculum(env);
    if (method === 'GET' && path === 'questions-bank') return await listQuestionsBank(session, env);
    if (method === 'POST' && path === 'questions') return await createQuestion(session, env, request);

    if (method === 'GET' && path === 'week-test') return await getWeekTest(session, env, url);
    if (method === 'POST' && path === 'week-test/submit') return await submitWeekTest(session, env, request);
    if (method === 'GET' && path === 'my-missed-weeks') return await myMissedWeeks(session, env);
    if (method === 'GET' && path === 'my-question-bank') return await myQuestionBank(session, env);
    if (method === 'POST' && path === 'catchup-grant') return await grantCatchup(session, env, request);
    if (method === 'POST' && path === 'catchup-revoke') return await revokeCatchup(session, env, request);
    if (method === 'GET' && path === 'student-weeks') return await studentWeeksStatus(session, env, url);

    if (method === 'GET' && path === 'students-overview') return await studentsOverview(session, env);
    if (method === 'GET' && path === 'my-results') return await myResults(session, env);
    if (method === 'GET' && path === 'reports-stats') return await reportsStats(session, env);

    if (method === 'GET' && path === 'settings') return await getSettingsRoute(env);
    if (method === 'PUT' && path === 'settings') return await putSettingsRoute(session, env, request);
    if (method === 'PUT' && path === 'supervisor-credentials') return await putSupervisorCreds(session, env, request);

    return notFound();
  } catch (err) {
    return json({ ok: false, error: 'خطأ في الخادم', detail: String((err && err.message) || err) }, 500);
  }
}

// ---------- نقطة الدخول (Advanced Mode Worker) ----------
// هذه الصيغة (_worker.js في جذر المشروع) مدعومة من "الرفع المباشر" في لوحة Cloudflare
// (بخلاف مجلد /functions الذي لا يدعمه الرفع المباشر إطلاقًا - يحتاج Wrangler CLI).
// أي طلب لا يبدأ بـ /api/ يُمرَّر لخدمة الملفات الثابتة (env.ASSETS) تلقائيًا.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      const path = url.pathname.replace(/^\/api\/?/, '');
      return handleApi(request, env, path);
    }
    return env.ASSETS.fetch(request);
  },
};
