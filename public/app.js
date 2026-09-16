/*
 * منصة نواتج التعلم — الواجهة (تتصل بالكامل بواجهة API المدعومة بـ Cloudflare D1)
 * لا يوجد تخزين لأي بيانات مدرسية (طلاب/معلمين/نتائج) في المتصفح؛ كل شيء يُقرأ ويُكتب مباشرة
 * على الخادم. العنصر الوحيد المحفوظ محليًا هو رمز الجلسة (token) للحفاظ على الدخول بعد تحديث الصفحة.
 */
const $ = s => document.querySelector(s);
let token = localStorage.getItem('nawatej_token') || null;
let role = null, user = null, page = 'home';
let proxyStudentId = null;
let lastStudentsCache = []; // للاستخدام في نوافذ التعديل السريعة (prompt) فقط، لا يُعتمد عليه كمصدر بيانات

// ---------- طبقة الاتصال بالـ API ----------
async function api(path, opts = {}) {
  const headers = { 'content-type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch('/api/' + path, {
    method: opts.method || 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const msg = (data && data.error) || `تعذر الاتصال بالخادم (${res.status})`;
    throw new Error(msg);
  }
  return data;
}
function setToken(t) { token = t; if (t) localStorage.setItem('nawatej_token', t); else localStorage.removeItem('nawatej_token'); }

// ---------- تسجيل الدخول/الخروج ----------
document.querySelectorAll('.tab').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const r = b.dataset.role;
  $('#loginPass').disabled = r === 'student';
  $('#loginPass').value = '';
  $('#passwordHint').textContent = r === 'student' ? '(للطالب لا يحتاج كلمة مرور)' : r === 'teacher' ? '(أدخل كلمة المرور التي زودك بها المشرف)' : '(أدخل كلمة مرور المشرف)';
  $('#loginMsg').textContent = '';
});

$('#loginBtn').onclick = async () => {
  const tabBtn = document.querySelector('.tab.active');
  const r = tabBtn ? tabBtn.dataset.role : 'student';
  const u = $('#loginUser').value.trim();
  const p = $('#loginPass').value;
  if (!u) { $('#loginMsg').textContent = 'أدخل بيانات الدخول'; return; }
  $('#loginBtn').disabled = true; $('#loginMsg').textContent = '...جارٍ التحقق';
  try {
    const data = await api('login', { method: 'POST', body: { role: r, username: u, password: p } });
    setToken(data.token);
    user = data.user; role = user.role;
    $('#loginMsg').textContent = '';
    $('#loginView').classList.add('hidden'); $('#appView').classList.remove('hidden');
    await shell();
  } catch (e) {
    $('#loginMsg').textContent = e.message;
  } finally {
    $('#loginBtn').disabled = false;
  }
};

$('#logoutBtn').onclick = async () => {
  try { await api('logout', { method: 'POST' }); } catch {}
  setToken(null);
  location.reload();
};

async function boot() {
  if (!token) return;
  try {
    const me = await api('me');
    user = me.user; role = user.role;
    $('#loginView').classList.add('hidden'); $('#appView').classList.remove('hidden');
    await shell();
  } catch {
    setToken(null);
  }
}
boot();

// ---------- الهيكل العام والتنقل ----------
async function shell() {
  $('#userBox').innerHTML = `<b>${esc(user.name)}</b><br><small>${role === 'supervisor' ? 'مشرف' : role === 'teacher' ? 'معلم' : 'الصف ' + user.grade + ' — ' + user.class}</small>`;
  let items = role === 'supervisor'
    ? [['home', 'الرئيسية'], ['students', 'إدارة الطلاب'], ['teachers', 'المعلمون'], ['curriculum', 'توزيع المنهج'], ['questions', 'بنك الأسئلة'], ['reports', 'التقارير'], ['settings', 'إعدادات الاختبارات']]
    : role === 'teacher'
    ? [['home', 'الرئيسية'], ['students', 'طلاب الفصول'], ['proxy', 'فتح اختبار الطالب'], ['questions', 'الاختبارات'], ['reports', 'تقارير الطلاب']]
    : [['home', 'الرئيسية'], ['tests', 'اختباراتي'], ['results', 'نتائجي']];
  $('#nav').innerHTML = items.map(x => `<button data-p="${x[0]}">${x[1]}</button>`).join('');
  $('#nav').querySelectorAll('button').forEach(b => b.onclick = () => { page = b.dataset.p; render(); });
  await render();
}

let renderSeq = 0;
async function render() {
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.p === page));
  const mySeq = ++renderSeq;
  $('#page').innerHTML = `<div class="panel" style="text-align:center;color:var(--muted)">...جارٍ التحميل</div>`;
  const fns = { home, students, teachers, curriculum: curriculumPage, questions: questionsPage, reports, settings, tests, results, proxy };
  const fn = fns[page] || home;
  let html;
  try { html = await fn(); }
  catch (e) { html = `<div class="panel"><p class="muted">تعذر تحميل الصفحة: ${esc(e.message)}</p></div>`; }
  if (mySeq !== renderSeq) return; // وصلت استجابة قديمة بعد تنقّل أحدث؛ تجاهلها
  $('#page').innerHTML = html;
}

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// ---------- الرئيسية ----------
async function home() {
  if (role === 'student') {
    const r = await api('my-results');
    const done = !!r.weekBanner;
    const statusIcon = done ? '🟢' : r.isExamDay ? '🟡' : '⚪';
    return `<div class="page-head"><div><h2>مرحبًا ${esc(user.name)}</h2><p class="muted">نتابع تقدمك خطوة بخطوة نحو إتقان المهارات.</p></div><span class="pill blue">الصف ${user.grade}</span></div>
    <div class="cards"><div class="stat">المحلول<b>${r.total}</b></div><div class="stat">الهدف<b>80</b></div><div class="stat">المتبقي<b>${Math.max(0, 80 - r.total)}</b></div><div class="stat">حالة اختبار الأسبوع<b>${statusIcon}</b></div></div>
    <div class="panel"><h3>الاختبارات</h3><p>الاختبار يُفتح تلقائيًا يومي <b>${r.examDayNames}</b> من كل أسبوع وفق توزيع المنهج، دون اعتماد من المعلم ولا تنبيهات. ${done ? 'أنجزت اختبار هذا الأسبوع بالفعل — شاهد نتيجتك.' : r.isExamDay ? 'اختبار اليوم متاح الآن.' : 'ترقّب أقرب يوم اختبار.'}</p><button class="primary" onclick="page='tests';render()">فتح الاختبارات</button></div>`;
  }
  // معلم / مشرف
  const ov = await api('students-overview');
  const list = ov.students;
  const n = list.length;
  const totalAnswers = list.reduce((s, x) => s + x.total, 0);
  const totalWrong = list.reduce((s, x) => s + x.wrong, 0);
  const struggling = list.filter(x => x.status === 'struggling');
  const notStarted = list.filter(x => x.status === 'not_started');
  return `<div class="page-head"><h2>لوحة المتابعة</h2><span class="pill green">${role === 'teacher' ? 'فصولك المسندة' : 'تلقائي حسب الخطة'}</span></div>
  <div class="cards"><div class="stat">الطلاب<b>${n}</b></div><div class="stat">الإجابات<b>${totalAnswers}</b></div><div class="stat">الإجابات الخاطئة<b>${totalWrong}</b></div><div class="stat">بنك الأسئلة<b>${ov.questionBankCount}</b></div></div>
  <div class="panel" style="border-color:${struggling.length ? '#f0c6cb' : 'var(--line-soft)'}"><h3>🔴 طلاب بحاجة إلى متابعة (متعثرون)</h3>${struggling.length ? `<table><thead><tr><th>الاسم</th><th>الصف</th><th>الفصل</th><th>نسبة الصواب</th></tr></thead><tbody>${struggling.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td><span class="pill yellow">${s.accuracyPct}%</span></td></tr>`).join('')}</tbody></table>` : '<p class="muted">لا يوجد طلاب متعثرون حاليًا وفق نتائج الاختبارات.</p>'}</div>
  <div class="grid2"><div class="panel"><h3>حالات الطالب</h3><p>🟢 صحيح — متقن</p><p>🔴 خطأ — متعثر</p><p>🟡 لم يدخل — لم يشارك (${notStarted.length} من ${n})</p></div><div class="panel"><h3>الفصول</h3><p>الثالث: 3 فصول</p><p>السادس: 7 فصول</p></div></div>`;
}

// ---------- إدارة الطلاب ----------
async function students() {
  const data = await api('students');
  const list = data.students;
  lastStudentsCache = list;
  return `<div class="page-head"><div><h2>${role === 'teacher' ? 'طلاب فصولي' : 'إدارة الطلاب'}</h2><p class="muted">${role === 'teacher' ? 'تظهر هنا فصولك المسندة فقط. يمكنك فتح اسم الطالب ليحل بنفسه من جهازك عند تعذر دخوله من المنزل.' : 'يمكن للمعلم فتح اسم الطالب ليحل الطالب بنفسه من جهاز المعلم عند تعذر دخوله من المنزل.'}</p></div>${role === 'supervisor' ? '<button class="primary" onclick="addStudent()">+ إضافة طالب</button>' : ''}</div>
  <div class="panel"><table><thead><tr><th>الاسم</th><th>الهوية</th><th>الصف</th><th>الفصل</th><th>إجراء</th></tr></thead><tbody>${list.map(s => `<tr><td>${esc(s.name)}</td><td>${esc(s.id)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${role === 'teacher' ? `<button class="primary small-btn" onclick="startProxy('${esc(s.id)}')">فتح باسم الطالب</button>` : role === 'supervisor' ? `<button onclick="editStudent('${esc(s.id)}')">تعديل/نقل</button> <button class="danger" onclick="delStudent('${esc(s.id)}')">حذف</button>` : '—'}</td></tr>`).join('') || '<tr><td colspan="5">لا يوجد طلاب بعد.</td></tr>'}</tbody></table></div>`;
}
async function addStudent() {
  const name = prompt('اسم الطالب'); if (!name) return;
  const id = prompt('رقم الهوية'); if (!id) return;
  const grade = +(prompt('الصف (3 أو 6)', '3') || 3);
  const cls = prompt('الفصل (مثل 3/1 أو 6/1)', grade === 3 ? '3/1' : '6/1'); if (!cls) return;
  try { await api('students', { method: 'POST', body: { id, name, grade, class: cls } }); render(); }
  catch (e) { alert(e.message); }
}
async function editStudent(id) {
  const s = lastStudentsCache.find(x => x.id === id); if (!s) return;
  const name = prompt('اسم الطالب', s.name) || s.name;
  const grade = +(prompt('الصف', s.grade) || s.grade);
  const cls = prompt('الفصل', s.class) || s.class;
  try { await api('students/' + encodeURIComponent(id), { method: 'PUT', body: { name, grade, class: cls } }); render(); }
  catch (e) { alert(e.message); }
}
async function delStudent(id) {
  if (!confirm('حذف الطالب؟ ستبقى نتائجه التاريخية محفوظة.')) return;
  try { await api('students/' + encodeURIComponent(id), { method: 'DELETE' }); render(); }
  catch (e) { alert(e.message); }
}

// ---------- المعلمون ----------
async function teachers() {
  const data = await api('teachers');
  return `<div class="page-head"><h2>المعلمون</h2><button class="primary" onclick="addTeacher()">+ إضافة معلم</button></div><div class="panel"><p class="muted">يمكن للمشرف تحديد المادة والصف والفصول وكلمة المرور. هذه بيانات دخول المعلم للمنصة.</p><table><thead><tr><th>المعلم</th><th>اسم المستخدم</th><th>المادة</th><th>الصف</th><th>الفصول</th><th>إجراء</th></tr></thead><tbody>${data.teachers.map(t => `<tr><td>${esc(t.name)}</td><td>${esc(t.username)}</td><td>${esc(t.subject)}</td><td>${t.grade}</td><td>${esc(t.classes)}</td><td><button class="danger" onclick="delTeacher('${esc(t.username)}')">حذف</button></td></tr>`).join('') || '<tr><td colspan="6">لا يوجد معلمون.</td></tr>'}</tbody></table></div>`;
}
async function addTeacher() {
  const name = prompt('اسم المعلم'); if (!name) return;
  const username = prompt('اسم المستخدم لتسجيل الدخول (بالإنجليزية بدون مسافات)'); if (!username) return;
  const subject = prompt('المادة: لغتي / رياضيات / علوم'); if (!subject) return;
  const grade = prompt('الصف: 3 أو 6'); if (!grade) return;
  const classes = prompt('الفصول (افصل بينها بفاصلة، مثل 3/1, 3/2)'); if (!classes) return;
  const password = prompt('كلمة المرور'); if (!password) return alert('كلمة المرور مطلوبة.');
  try { await api('teachers', { method: 'POST', body: { name, username, subject, grade: +grade, classes, password } }); render(); }
  catch (e) { alert(e.message); }
}
async function delTeacher(username) {
  if (!confirm('حذف هذا المعلم؟')) return;
  try { await api('teachers/' + encodeURIComponent(username), { method: 'DELETE' }); render(); }
  catch (e) { alert(e.message); }
}

// ---------- توزيع المنهج / بنك الأسئلة ----------
async function curriculumPage() {
  const data = await api('curriculum');
  const rows = data.curriculum.map(r => `<tr><td>${r.grade}</td><td>${esc(r.subject)}</td><td>${r.week}</td><td>${esc(r.lesson)}</td></tr>`).join('');
  return `<div class="page-head"><h2>توزيع المنهج — الفصل الأول 1448هـ</h2><span class="pill green">الخطة المرفقة</span></div><div class="panel"><table><thead><tr><th>الصف</th><th>المادة</th><th>الأسبوع</th><th>الدرس</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
async function questionsPage() {
  const data = await api('questions-bank');
  const list = data.questions;
  return `<div class="page-head"><h2>بنك الأسئلة</h2><span class="pill blue">${role === 'teacher' ? `الصف ${user.grade} — ${esc(user.subject)}` : 'الصف الثالث والسادس'}</span></div><div class="panel">${list.map(q => `<div class="question"><b>الصف ${q.grade} — ${esc(q.subject)} — الأسبوع ${q.week}</b><p>${esc(q.question)}</p><small>${esc(q.lesson || '')}</small></div>`).join('') || '<p class="muted">لا توجد أسئلة مطابقة بعد.</p>'}</div>`;
}

// ---------- اختبار الطالب (نفسه) ----------
async function tests() {
  const r = await api('week-test');
  if (r.completed) {
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week} — أُنجز بالفعل.</p></div><span class="pill green">مكتمل</span></div>
    <div class="panel"><h3>نتيجتك في اختبار هذا الأسبوع</h3><div class="cards"><div class="stat">الأسئلة<b>${r.result.total}</b></div><div class="stat">صحيح 🟢<b>${r.result.correct}</b></div><div class="stat">خطأ 🔴<b>${r.result.wrong}</b></div><div class="stat">النسبة<b>${r.result.pct}%</b></div></div><p style="font-size:16px;font-weight:800;color:var(--teal);margin-top:6px">${r.result.message}</p><p class="muted" style="margin-top:10px">الاختبار القادم يوم ${r.examDayNames} بإذن الله.</p></div>`;
  }
  if (!r.isExamDay) {
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">لا يوجد اختبار اليوم.</p></div><span class="pill yellow">مغلق اليوم</span></div><div class="panel"><h3>موعد الاختبار القادم</h3><p>تُفتح الاختبارات يومي <b>${r.examDayNames}</b> من كل أسبوع فقط. عد إلى المنصة في أقرب يوم اختبار.</p></div>`;
  }
  if (!r.questions.length) {
    return `<div class="page-head"><h2>اختباراتي</h2></div><div class="panel"><p class="muted">لا توجد أسئلة مجهزة لهذا الأسبوع بعد.</p></div>`;
  }
  return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week} — أجب عن الأسئلة ثم أرسل الإجابات.</p></div><span class="pill green">يظهر تلقائيًا</span></div><div class="panel"><h3>اختبار الأسبوع</h3>${r.questions.map((q, i) => `<div class="question"><b>${i + 1}. ${esc(q.question)}</b><div class="muted" style="margin-top:5px;font-weight:600">${esc(q.subject)}</div>${q.choices.map((c, j) => `<label class="choice"><input type="radio" name="q_${q.id}" value="${j}"><span>${esc(c)}</span></label>`).join('')}</div>`).join('')}<button class="primary" onclick="submitTest()">إرسال الإجابات</button></div>`;
}
async function submitTest() {
  const inputs = document.querySelectorAll('#page input[type=radio]:checked');
  const answers = {};
  inputs.forEach(inp => { const qid = inp.name.replace('q_', ''); answers[qid] = +inp.value; });
  if (!Object.keys(answers).length) { alert('لم تجب عن أي سؤال بعد.'); return; }
  try { await api('week-test/submit', { method: 'POST', body: { answers } }); page = 'results'; await render(); }
  catch (e) { alert(e.message); await render(); }
}
async function results() {
  const r = await api('my-results');
  const banner = r.weekBanner ? `<div class="panel" style="border-color:var(--teal-bright)"><h3>نتيجة اختبار هذا الأسبوع</h3><p style="font-size:16px;font-weight:800;color:var(--teal)">${r.weekBanner.message}</p><p class="muted">حصلت على ${r.weekBanner.correct} من ${r.weekBanner.total} (${r.weekBanner.pct}%).</p></div>` : '';
  return `<div class="page-head"><h2>نتائجي</h2></div>${banner}<div class="cards"><div class="stat">المحلول<b>${r.total}</b></div><div class="stat">صحيح 🟢<b>${r.correct}</b></div><div class="stat">خطأ 🔴<b>${r.wrong}</b></div><div class="stat">الإنجاز<b>${r.achievement}%</b></div></div>`;
}

// ---------- فتح اختبار الطالب من حساب المعلم ----------
function startProxy(id) { if (role !== 'teacher') return; proxyStudentId = id; page = 'proxy'; render(); }
async function proxy() {
  if (!proxyStudentId) return `<div class="panel"><h3>اختر طالبًا</h3><button class="primary" onclick="page='students';render()">اختيار من قائمة الطلاب</button></div>`;
  let r;
  try { r = await api('week-test?studentId=' + encodeURIComponent(proxyStudentId)); }
  catch (e) { proxyStudentId = null; return `<div class="panel"><p class="muted">${esc(e.message)}</p><button onclick="page='students';render()">رجوع</button></div>`; }
  const st = r.student;
  if (r.completed) {
    return `<div class="page-head"><div><h2>اختبار الطالب</h2><p class="muted">الطالب: <b>${esc(st.name)}</b> — الصف ${st.grade} — الفصل ${esc(st.class)}</p></div><span class="pill green">مكتمل هذا الأسبوع</span></div><div class="panel"><h3>نتيجة اختبار الأسبوع ${r.week}</h3><p>حصل الطالب على ${r.result.correct} من ${r.result.total} (${r.result.pct}%).</p><p style="font-weight:800;color:var(--teal)">${r.result.message}</p><button onclick="proxyStudentId=null;page='students';render()">رجوع لقائمة الطلاب</button></div>`;
  }
  if (!r.questions.length) return `<div class="panel"><p class="muted">لا توجد أسئلة مجهزة لهذا الأسبوع بعد.</p></div>`;
  return `<div class="page-head"><div><h2>اختبار الطالب</h2><p class="muted">الطالب: <b>${esc(st.name)}</b> — الصف ${st.grade} — الفصل ${esc(st.class)}</p></div><span class="pill yellow">الطالب يحل من حساب المعلم</span></div>
  <div class="proxy-banner"><div><strong>تنبيه مهم</strong><p>تُحفظ الإجابات باسم الطالب. المعلم يفتح ملف الطالب فقط، ثم الطالب نفسه يختار الإجابات ويحل الاختبار.</p></div></div>
  <div class="panel"><label>حالة الدخول</label><select id="proxyReason"><option>الطالب يحل من جهاز المعلم</option><option>تعذر دخول الطالب من المنزل</option><option>مشكلة تقنية لدى الطالب</option></select></div>
  <div class="panel"><h3>اختبار الأسبوع ${r.week}</h3>${r.questions.map((q, i) => `<div class="question"><b>${i + 1}. ${esc(q.question)}</b><div class="muted" style="margin-top:5px">${esc(q.subject)} — الأسبوع ${q.week} — ${esc(q.lesson || '')}</div>${q.choices.map((c, j) => `<label class="choice"><input type="radio" name="pq_${q.id}" value="${j}"><span>${esc(c)}</span></label>`).join('')}</div>`).join('')}<div class="actions"><button class="primary" onclick="submitProxyTest()">حفظ إجابات الطالب</button><button onclick="proxyStudentId=null;page='students';render()">إلغاء</button></div></div>`;
}
async function submitProxyTest() {
  if (!proxyStudentId) return;
  const reason = $('#proxyReason') ? $('#proxyReason').value : '';
  const inputs = document.querySelectorAll('#page input[type=radio]:checked');
  const answers = {};
  inputs.forEach(inp => { const qid = inp.name.replace('pq_', ''); answers[qid] = +inp.value; });
  if (!Object.keys(answers).length) { alert('لم تُسجَّل أي إجابة.'); return; }
  try {
    const res = await api('week-test/submit', { method: 'POST', body: { studentId: proxyStudentId, answers, reason } });
    alert(`تم حفظ ${res.total} إجابة باسم الطالب ${res.studentName}.\nالطالب هو من أجاب، وتم تسجيل أن الجلسة تمت من حساب المعلم.\nالحالة: ${reason}`);
    proxyStudentId = null; page = 'reports'; await render();
  } catch (e) { alert(e.message); }
}

// ---------- التقارير ----------
async function reports() {
  const ov = await api('students-overview');
  const list = ov.students;
  const statusBadge = s => s.status === 'not_started' ? '<span class="pill yellow">🟡 لم يشارك</span>' : s.status === 'struggling' ? '<span class="pill" style="background:var(--red-bg);color:var(--red)">🔴 متعثر</span>' : '<span class="pill green">🟢 متقن</span>';
  return `<div class="page-head"><div><h2>التقارير</h2><p class="muted">${role === 'teacher' ? 'تقارير طلاب فصولك المسندة فقط. ' : ''}يظهر هنا أيضًا إذا كانت الإجابة من الطالب أو نيابةً عنه بواسطة المعلم.</p></div><button onclick="window.print()">طباعة / PDF</button></div>
  <div class="panel"><table><thead><tr><th>الطالب</th><th>الصف</th><th>الفصل</th><th>الحالة</th><th>حل</th><th>صحيح</th><th>خطأ</th><th>طريقة الحل</th></tr></thead><tbody>${list.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${statusBadge(s)}</td><td>${s.total}</td><td>${s.correct}</td><td>${s.wrong}</td><td>${s.proxyCount ? `<span class="pill yellow">${s.proxyCount} من جلسة حساب المعلم</span>` : '<span class="pill green">من حساب الطالب</span>'}</td></tr>`).join('') || '<tr><td colspan="8">لا يوجد طلاب.</td></tr>'}</tbody></table></div>`;
}

// ---------- الإعدادات ----------
const DAY_CODES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
const DAY_NAMES = { SU: 'الأحد', MO: 'الاثنين', TU: 'الثلاثاء', WE: 'الأربعاء', TH: 'الخميس', FR: 'الجمعة', SA: 'السبت' };
async function settings() {
  const data = await api('settings');
  const s = data.settings;
  const opts1 = DAY_CODES.map(c => `<option value="${c}" ${s.examDays[0] === c ? 'selected' : ''}>${DAY_NAMES[c]}</option>`).join('');
  const opts2 = DAY_CODES.map(c => `<option value="${c}" ${s.examDays[1] === c ? 'selected' : ''}>${DAY_NAMES[c]}</option>`).join('');
  return `<div class="page-head"><h2>إعدادات الاختبارات</h2></div><div class="panel"><h3>يومان في الأسبوع</h3><div class="grid2"><div><label>اليوم الأول</label><select id="examDay1" onchange="updateExamDays()">${opts1}</select></div><div><label>اليوم الثاني</label><select id="examDay2" onchange="updateExamDays()">${opts2}</select></div></div><p class="muted">الاختبار يُنشر تلقائيًا وفق الخطة المرفقة أيام <b>${DAY_NAMES[s.examDays[0]]} و${DAY_NAMES[s.examDays[1]]}</b> فقط، دون اعتماد المعلم.</p></div>
  <div class="panel"><h3>بداية الفصل الدراسي</h3><label>تاريخ بداية الفصل (لحساب أسبوع المنهج الحالي)</label><input type="date" id="semStart" value="${s.semesterStart}" onchange="updateSemesterStart()"><p class="muted" style="margin-top:8px">الأسبوع الحالي وفق هذا التاريخ: <b>${s.currentWeek}</b> من 17.</p></div>
  <div class="panel"><h3>بيانات دخول المشرف</h3><p class="muted">اسم المستخدم الحالي: <b>${esc(s.supervisorUsername)}</b></p><button onclick="changeSupervisorPass()">تغيير اسم المستخدم/كلمة المرور</button></div>`;
}
async function updateExamDays() {
  try { await api('settings', { method: 'PUT', body: { examDays: [$('#examDay1').value, $('#examDay2').value] } }); render(); }
  catch (e) { alert(e.message); }
}
async function updateSemesterStart() {
  try { await api('settings', { method: 'PUT', body: { semesterStart: $('#semStart').value } }); render(); }
  catch (e) { alert(e.message); }
}
async function changeSupervisorPass() {
  const nu = prompt('اسم المستخدم الجديد', user.username); if (!nu) return;
  const np = prompt('كلمة المرور الجديدة (6 أحرف على الأقل)'); if (!np || np.length < 6) return alert('كلمة المرور قصيرة جدًا.');
  try {
    await api('supervisor-credentials', { method: 'PUT', body: { username: nu, password: np } });
    user.username = nu;
    alert('تم تحديث بيانات دخول المشرف.'); render();
  } catch (e) { alert(e.message); }
}
