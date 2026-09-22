/*
 * منصة نواتج التعلم — الواجهة (تتصل بالكامل بواجهة API المدعومة بـ Cloudflare D1)
 * لا يوجد تخزين لأي بيانات مدرسية (طلاب/معلمين/نتائج) في المتصفح؛ كل شيء يُقرأ ويُكتب مباشرة
 * على الخادم. العنصر الوحيد المحفوظ محليًا هو رمز الجلسة (token) للحفاظ على الدخول بعد تحديث الصفحة.
 */
const $ = s => document.querySelector(s);
let token = localStorage.getItem('nawatej_token') || null;
let role = null, user = null, page = 'home';
let proxyStudentId = null;
let proxyTargetWeek = null;      // أسبوع فائت يفتحه المعلم مباشرة نيابةً عن الطالب (دون حاجة لإذن)
let catchupTargetWeek = null;    // أسبوع فائت يحله الطالب نفسه بعد إذن المعلم
let selectedSubject = null;      // المادة المختارة حاليًا (عند تفعيل وضع "كل مادة لوحدها")
let weeksViewStudentId = null;   // الطالب المعروض حاليًا في صفحة "متابعة الأسابيع" (المعلم)
let showAddQuestionForm = false; // إظهار/إخفاء نموذج إضافة سؤال جديد (المعلم)
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
    : [['home', 'الرئيسية'], ['tests', 'اختباراتي'], ['bank', 'بنك أسئلتي'], ['results', 'نتائجي']];
  $('#nav').innerHTML = items.map(x => `<button data-p="${x[0]}">${x[1]}</button>`).join('');
  $('#nav').querySelectorAll('button').forEach(b => b.onclick = () => { page = b.dataset.p; selectedSubject = null; catchupTargetWeek = null; render(); });
  await render();
}

let renderSeq = 0;
async function render() {
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.p === page));
  const mySeq = ++renderSeq;
  $('#page').innerHTML = `<div class="panel" style="text-align:center;color:var(--muted)">...جارٍ التحميل</div>`;
  const fns = { home, students, teachers, curriculum: curriculumPage, questions: questionsPage, reports, settings, tests, results, proxy, bank: myQuestionBank, weeks: studentWeeksPage, deleted: deletedStudentsPage };
  const fn = fns[page] || home;
  let html;
  try { html = await fn(); }
  catch (e) { html = `<div class="panel"><p class="muted">تعذر تحميل الصفحة: ${esc(e.message)}</p></div>`; }
  if (mySeq !== renderSeq) return; // وصلت استجابة قديمة بعد تنقّل أحدث؛ تجاهلها
  $('#page').innerHTML = html;
}

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// ---------- رسم بياني بسيط (أعمدة) بلا أي مكتبات خارجية ----------
function barChart(data, opts = {}) {
  if (!data || !data.length) return '<p class="muted">لا توجد بيانات كافية بعد لعرض الرسم البياني.</p>';
  const W = opts.width || 640, H = opts.height || 200, PAD = 34, barGap = 10;
  const n = data.length;
  const barW = Math.max(18, Math.min(52, (W - PAD * 2 - barGap * (n - 1)) / n));
  const chartW = barW * n + barGap * (n - 1);
  const startX = (W - chartW) / 2;
  const colorFor = v => v >= 80 ? '#12946b' : v >= 60 ? '#c99a3e' : '#d1495b';
  let bars = '', labels = '';
  data.forEach((d, i) => {
    const x = startX + i * (barW + barGap);
    const v = Math.max(0, Math.min(100, d.value));
    const barH = (v / 100) * (H - PAD * 2);
    const y = H - PAD - barH;
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="5" fill="${colorFor(v)}"><title>${esc(d.label)}: ${v}%</title></rect>`;
    bars += `<text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">${v}%</text>`;
    labels += `<text x="${x + barW / 2}" y="${H - PAD + 16}" text-anchor="middle" font-size="11" fill="var(--muted)">${esc(d.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">
    <line x1="${startX - 6}" y1="${H - PAD}" x2="${startX + chartW + 6}" y2="${H - PAD}" stroke="var(--line)" stroke-width="1"/>
    ${bars}${labels}
  </svg>`;
}
function changeBadge(change) {
  if (change === null || change === undefined) return '';
  if (change > 0) return `<span class="pill green">▲ +${change}% عن آخر اختبار</span>`;
  if (change < 0) return `<span class="pill" style="background:var(--red-bg);color:var(--red)">▼ ${change}% عن آخر اختبار</span>`;
  return `<span class="pill blue">— لا تغيير عن آخر اختبار</span>`;
}

// ---------- الرئيسية ----------
async function home() {
  if (role === 'student') {
    const r = await api('my-results');
    const missed = await api('my-missed-weeks');
    const done = !!r.weekBanner;
    const statusIcon = done ? '🟢' : r.isExamDay ? '🟡' : '⚪';
    const missedPanel = missed.weeks.length ? `<div class="panel" style="border-color:#e7c26f"><h3>🔓 أسابيع فائتة مسموح لك باستكمالها</h3><p class="muted">معلمك سمح لك بحل الأسابيع التالية اللي فاتتك. اضغط ابدأ لحل أي منها الآن.</p>${missed.weeks.map(w => `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line-soft)"><span>الأسبوع ${w}</span><button class="primary small-btn" onclick="catchupTargetWeek=${w};page='tests';render()">ابدأ الآن</button></div>`).join('')}</div>` : '';
    return `<div class="page-head"><div><h2>مرحبًا ${esc(user.name)}</h2><p class="muted">نتابع تقدمك خطوة بخطوة نحو إتقان المهارات.</p></div><span class="pill blue">الصف ${user.grade}</span></div>
    <div class="cards"><div class="stat">المحلول<b>${r.total}</b></div><div class="stat">الهدف<b>80</b></div><div class="stat">المتبقي<b>${Math.max(0, 80 - r.total)}</b></div><div class="stat">حالة اختبار الأسبوع<b>${statusIcon}</b></div></div>
    ${missedPanel}
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
  return `<div class="page-head"><div><h2>${role === 'teacher' ? 'طلاب فصولي' : 'إدارة الطلاب'}</h2><p class="muted">${role === 'teacher' ? 'تظهر هنا فصولك المسندة فقط. يمكنك فتح اسم الطالب ليحل بنفسه من جهازك عند تعذر دخوله من المنزل، أو متابعة أسابيعه الفائتة.' : 'يمكن للمعلم فتح اسم الطالب ليحل الطالب بنفسه من جهاز المعلم عند تعذر دخوله من المنزل.'}</p></div>${role === 'supervisor' ? `<div class="actions" style="margin:0"><button class="primary" onclick="addStudent()">+ إضافة طالب</button><button onclick="importPhonesFlow()">📱 استيراد أرقام الجوال من إكسل</button><button onclick="syncStudentsFlow()">🔄 مزامنة كاملة لقائمة الطلاب من إكسل</button><button onclick="page='deleted';render()">🗑️ الطلاب المحذوفون</button></div>` : role === 'teacher' ? `<div class="actions" style="margin:0"><button onclick="grantCatchupAllStudents()">🔓 فتح أسبوع فائت لجميع الطلاب دفعة واحدة</button></div>` : ''}</div>
  <div class="panel"><table><thead><tr><th>الاسم</th><th>الهوية</th><th>الصف</th><th>الفصل</th><th>جوال ولي الأمر</th><th>إجراء</th></tr></thead><tbody>${list.map(s => `<tr><td>${esc(s.name)}</td><td>${esc(s.id)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${s.phone ? esc(s.phone) : '<span class="muted">—</span>'}</td><td>${role === 'teacher' ? `<div class="actions" style="margin:0"><button class="primary small-btn" onclick="startProxy('${esc(s.id)}')">فتح باسم الطالب</button><button class="small-btn" onclick="weeksViewStudentId='${esc(s.id)}';page='weeks';render()">متابعة الأسابيع</button></div>` : role === 'supervisor' ? `<div class="actions" style="margin:0"><button onclick="editStudent('${esc(s.id)}')">تعديل/نقل</button><button onclick="clearStudentAttemptsFlow('${esc(s.id)}','${esc(s.name)}')">🧹 حذف الإجابات</button><button class="danger" onclick="delStudent('${esc(s.id)}')">حذف</button></div>` : '—'}</td></tr>`).join('') || '<tr><td colspan="6">لا يوجد طلاب بعد.</td></tr>'}</tbody></table></div>`;
}
async function clearStudentAttemptsFlow(id, name) {
  if (!confirm(`سيتم حذف جميع إجابات الطالب "${name}" في كل الاختبارات نهائيًا (تصفير كامل لسجله)، مع بقاء الطالب نفسه مسجلاً في المنصة.\n\nهذا الإجراء لا يمكن التراجع عنه. هل تريد المتابعة؟`)) return;
  try {
    const res = await api('students/' + encodeURIComponent(id) + '/clear-attempts', { method: 'POST' });
    alert(`تم حذف ${res.deleted} إجابة مسجَّلة لهذا الطالب. سجله الآن فارغ ويمكنه البدء من جديد.`);
    render();
  } catch (e) { alert(e.message); }
}
// ---------- الطلاب المحذوفون: عرض واستعادة ----------
async function deletedStudentsPage() {
  const data = await api('students-deleted');
  const list = data.students;
  return `<div class="page-head"><div><h2>الطلاب المحذوفون</h2><p class="muted">يمكنك استعادة أي طالب محذوف بدلاً من إضافته من جديد (يحافظ على نفس رقم الهوية وسجله التاريخي).</p></div><button onclick="page='students';render()">رجوع لإدارة الطلاب</button></div>
  <div class="panel"><table><thead><tr><th>الاسم</th><th>الهوية</th><th>الصف</th><th>الفصل</th><th>إجراء</th></tr></thead><tbody>${list.map(s => `<tr><td>${esc(s.name)}</td><td>${esc(s.id)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td><button class="primary small-btn" onclick="restoreStudentFlow('${esc(s.id)}')">↩ استعادة</button></td></tr>`).join('') || '<tr><td colspan="5">لا يوجد طلاب محذوفون حاليًا.</td></tr>'}</tbody></table></div>`;
}
async function restoreStudentFlow(id) {
  if (!confirm('استعادة هذا الطالب إلى القائمة النشطة؟')) return;
  try { await api('students/' + encodeURIComponent(id) + '/restore', { method: 'POST' }); alert('تمت الاستعادة بنجاح.'); page = 'students'; render(); }
  catch (e) { alert(e.message); }
}
async function addStudent() {
  const name = prompt('اسم الطالب'); if (!name) return;
  const id = prompt('رقم الهوية'); if (!id) return;
  const grade = +(prompt('الصف (3 أو 6)', '3') || 3);
  const cls = prompt('الفصل (مثل 3/1 أو 6/1)', grade === 3 ? '3/1' : '6/1'); if (!cls) return;
  const phone = prompt('جوال ولي الأمر (اختياري، مثال: 0501234567)') || '';
  try { await api('students', { method: 'POST', body: { id, name, grade, class: cls, phone } }); render(); }
  catch (e) { alert(e.message); }
}
async function editStudent(id) {
  const s = lastStudentsCache.find(x => x.id === id); if (!s) return;
  const name = prompt('اسم الطالب', s.name) || s.name;
  const grade = +(prompt('الصف', s.grade) || s.grade);
  const cls = prompt('الفصل', s.class) || s.class;
  const phone = prompt('جوال ولي الأمر (اتركه كما هو أو عدّله)', s.phone || '') || s.phone || '';
  try { await api('students/' + encodeURIComponent(id), { method: 'PUT', body: { name, grade, class: cls, phone } }); render(); }
  catch (e) { alert(e.message); }
}
async function delStudent(id) {
  if (!confirm('حذف الطالب؟ ستبقى نتائجه التاريخية محفوظة.')) return;
  try { await api('students/' + encodeURIComponent(id), { method: 'DELETE' }); render(); }
  catch (e) { alert(e.message); }
}
// ---------- استيراد أرقام الجوال من إكسل (SheetJS، يُحمَّل من index.html) ----------
function importPhonesFlow() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.xlsx,.xls,.csv';
  input.onchange = async () => {
    const file = input.files[0]; if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (!rows.length) return alert('الملف فارغ.');
      let startRow = 0;
      const header = (rows[0] || []).map(x => String(x || ''));
      const looksLikeHeader = header.some(h => /هوي|id|جوال|phone|هاتف/i.test(h));
      if (looksLikeHeader) startRow = 1;
      const parsed = [];
      for (let i = startRow; i < rows.length; i++) {
        const row = rows[i]; if (!row || !row.length) continue;
        const id = String(row[0] ?? '').trim();
        const phone = String(row[1] ?? '').trim();
        if (id && phone) parsed.push({ id, phone });
      }
      if (!parsed.length) return alert('لم يتم العثور على بيانات صالحة. تأكد أن العمود الأول رقم الهوية والثاني رقم الجوال.');
      const res = await api('students/import-phones', { method: 'POST', body: { rows: parsed } });
      alert(`تم تحديث ${res.updated} رقمًا بنجاح.${res.notFoundCount ? `\nلم يُعثر على ${res.notFoundCount} رقم هوية في قائمة الطلاب.` : ''}`);
      render();
    } catch (e) { alert('تعذرت قراءة الملف: ' + e.message); }
  };
  input.click();
}
// ---------- مزامنة كاملة لقائمة الطلاب من إكسل: إضافة الجديد، تحديث الموجود، وحذف غير الموجود في الملف ----------
function syncStudentsFlow() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.xlsx,.xls,.csv';
  input.onchange = async () => {
    const file = input.files[0]; if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (!rows.length) return alert('الملف فارغ.');
      let startRow = 0;
      const header = (rows[0] || []).map(x => String(x || ''));
      const looksLikeHeader = header.some(h => /هوي|id|اسم|name|صف|فصل/i.test(h));
      if (looksLikeHeader) startRow = 1;
      const parsed = [];
      for (let i = startRow; i < rows.length; i++) {
        const row = rows[i]; if (!row || !row.length) continue;
        const id = String(row[0] ?? '').trim();
        const name = String(row[1] ?? '').trim();
        const grade = String(row[2] ?? '').trim();
        const cls = String(row[3] ?? '').trim();
        const phone = row[4] !== undefined ? String(row[4] ?? '').trim() : '';
        if (id && name && grade && cls) parsed.push({ id, name, grade, class: cls, phone });
      }
      if (!parsed.length) return alert('لم يتم العثور على بيانات صالحة. ترتيب الأعمدة المطلوب: رقم الهوية، الاسم، الصف، الفصل، (وجوال ولي الأمر اختياريًا).');
      const ok = confirm(`سيتم رفع ${parsed.length} طالبًا من الملف.\n\n⚠️ تنبيه مهم: أي طالب مسجَّل حاليًا في المنصة وغير موجود في هذا الملف سيُحذف (حذف يحفظ نتائجه التاريخية، لكن يخرجه من القوائم النشطة).\n\nهل تريد المتابعة؟`);
      if (!ok) return;
      const res = await api('students/sync-excel', { method: 'POST', body: { rows: parsed } });
      alert(`تمت المزامنة بنجاح:\nطلاب جدد أُضيفوا: ${res.added}\nطلاب حُدِّثت بياناتهم: ${res.updated}\nطلاب حُذفوا (غير موجودين بالملف): ${res.removed}${res.skipped ? `\nصفوف تم تجاهلها لنقص أو خطأ في البيانات: ${res.skipped}` : ''}`);
      render();
    } catch (e) { alert('تعذرت قراءة الملف: ' + e.message); }
  };
  input.click();
}
function whatsappLink(phone, studentName) {
  const msg = `السلام عليكم، تذكير من مدرسة أبوداوود الابتدائية: يرجى تسجيل دخول الطالب/ة ${studentName} إلى منصة نواتج التعلم (نافس) لحل اختبار هذا الأسبوع. شكرًا لتعاونكم.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

// ---------- متابعة أسابيع طالب معيّن (المعلم): منح/سحب صلاحية استكمال أسبوع فائت ----------
async function studentWeeksPage() {
  if (!weeksViewStudentId) return `<div class="panel"><p class="muted">لم يُحدَّد طالب.</p><button onclick="page='students';render()">رجوع لقائمة الطلاب</button></div>`;
  let data;
  try { data = await api('student-weeks?studentId=' + encodeURIComponent(weeksViewStudentId)); }
  catch (e) { weeksViewStudentId = null; return `<div class="panel"><p class="muted">${esc(e.message)}</p><button onclick="page='students';render()">رجوع</button></div>`; }
  const st = data.student;
  const rows = data.weeks.map(w => {
    let statusBadge, action;
    if (w.completed) { statusBadge = '<span class="pill green">🟢 مكتمل</span>'; action = '—'; }
    else if (w.isCurrent) { statusBadge = '<span class="pill blue">الأسبوع الحالي</span>'; action = '<span class="muted">يُفتح تلقائيًا حسب أيام الاختبار</span>'; }
    else if (w.granted) { statusBadge = '<span class="pill yellow">🔓 مسموح له بالاستكمال</span>'; action = `<button class="small-btn" onclick="revokeCatchupWeek(${w.week})">سحب الصلاحية</button> <button class="primary small-btn" onclick="startProxyWeek('${esc(st.id)}',${w.week})">فتح الآن من حسابي</button>`; }
    else { statusBadge = '<span class="pill" style="background:var(--red-bg);color:var(--red)">🔴 فائت</span>'; action = `<button class="primary small-btn" onclick="grantCatchupWeek(${w.week})">منح صلاحية للطالب</button> <button class="small-btn" onclick="startProxyWeek('${esc(st.id)}',${w.week})">فتح الآن من حسابي</button>`; }
    return `<tr><td>الأسبوع ${w.week}</td><td>${statusBadge}</td><td>${action}</td></tr>`;
  }).join('');
  return `<div class="page-head"><div><h2>متابعة أسابيع الطالب</h2><p class="muted">${esc(st.name)} — الصف ${st.grade} — الفصل ${esc(st.class)}</p></div><button onclick="weeksViewStudentId=null;page='students';render()">رجوع لقائمة الطلاب</button></div>
  <div class="panel"><table><thead><tr><th>الأسبوع</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
async function grantCatchupWeek(week) {
  try { await api('catchup-grant', { method: 'POST', body: { studentId: weeksViewStudentId, week } }); render(); }
  catch (e) { alert(e.message); }
}
async function revokeCatchupWeek(week) {
  try { await api('catchup-revoke', { method: 'POST', body: { studentId: weeksViewStudentId, week } }); render(); }
  catch (e) { alert(e.message); }
}
async function grantCatchupAllStudents() {
  const week = prompt('اكتب رقم الأسبوع الفائت الذي تريد فتحه لجميع طلاب فصولك (مثال: 3)');
  if (!week) return;
  if (!confirm(`سيُسمح لجميع طلاب فصولك المسندة باستكمال اختبار الأسبوع ${week} من حساباتهم. هل تريد المتابعة؟`)) return;
  try {
    const res = await api('catchup-grant-bulk', { method: 'POST', body: { week: +week } });
    alert(`تم منح الصلاحية لـ${res.count} طالبًا لاستكمال اختبار الأسبوع ${week}.`);
  } catch (e) { alert(e.message); }
}
function startProxyWeek(id, week) { if (role !== 'teacher') return; proxyStudentId = id; proxyTargetWeek = week; selectedSubject = null; page = 'proxy'; render(); }

// ---------- المعلمون ----------
async function teachers() {
  const data = await api('teachers');
  window.__teachersCache = data.teachers;
  return `<div class="page-head"><h2>المعلمون</h2><button class="primary" onclick="addTeacher()">+ إضافة معلم</button></div><div class="panel"><p class="muted">يمكن للمشرف تحديد المادة والصف والفصول وكلمة المرور. هذه بيانات دخول المعلم للمنصة.</p><table><thead><tr><th>المعلم</th><th>اسم المستخدم</th><th>المادة</th><th>الصف</th><th>الفصول</th><th>إجراء</th></tr></thead><tbody>${data.teachers.map(t => `<tr><td>${esc(t.name)}</td><td>${esc(t.username)}</td><td>${esc(t.subject)}</td><td>${t.grade}</td><td>${esc(t.classes)}</td><td><div class="actions" style="margin:0"><button onclick="editTeacher('${esc(t.username)}')">تعديل / تغيير كلمة المرور</button><button class="danger" onclick="delTeacher('${esc(t.username)}')">حذف</button></div></td></tr>`).join('') || '<tr><td colspan="6">لا يوجد معلمون.</td></tr>'}</tbody></table></div>`;
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
async function editTeacher(username) {
  const t = (window.__teachersCache || []).find(x => x.username === username); if (!t) return;
  const name = prompt('اسم المعلم', t.name) || t.name;
  const newUsername = prompt('اسم المستخدم (غيّره فقط إذا أردت تحديثه)', t.username) || t.username;
  const subject = prompt('المادة', t.subject) || t.subject;
  const grade = prompt('الصف', t.grade) || t.grade;
  const classes = prompt('الفصول', t.classes) || t.classes;
  const password = prompt('كلمة مرور جديدة (اتركه فارغًا للإبقاء على القديمة)') || '';
  try {
    await api('teachers/' + encodeURIComponent(username), { method: 'PUT', body: { name, username: newUsername, subject, grade: +grade, classes, password: password || undefined } });
    alert('تم تحديث بيانات المعلم بنجاح.' + (password ? ' كلمة المرور الجديدة: ' + password : ''));
    render();
  } catch (e) { alert(e.message); }
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
  const addForm = role === 'teacher' ? `<div class="panel">
    <h3>${showAddQuestionForm ? '➖ إغلاق النموذج' : '+ إضافة سؤال جديد'} <button class="small-btn" onclick="showAddQuestionForm=!showAddQuestionForm;render()">${showAddQuestionForm ? 'إغلاق' : 'إضافة سؤال'}</button></h3>
    ${showAddQuestionForm ? `
    <label>الأسبوع (1 إلى 17)</label><input type="number" id="newQWeek" min="1" max="17" placeholder="مثال: 5">
    <label>الدرس / المهارة (اختياري)</label><input id="newQLesson" placeholder="مثال: الأنماط والدوال">
    <label>نص السؤال</label><input id="newQText" placeholder="اكتب نص السؤال هنا">
    <label>الخيارات الأربعة (حدد الدائرة بجانب الإجابة الصحيحة)</label>
    ${[0, 1, 2, 3].map(i => `<label class="choice"><input type="radio" name="newQCorrect" value="${i}"><input type="text" id="newQChoice${i}" placeholder="الخيار ${i + 1}" style="flex:1;border:none;background:transparent;font-family:inherit;font-size:14px;outline:none"></label>`).join('')}
    <button class="primary" style="margin-top:12px" onclick="submitNewQuestion()">حفظ السؤال</button>
    ` : ''}
  </div>` : '';
  return `<div class="page-head"><h2>بنك الأسئلة</h2><span class="pill blue">${role === 'teacher' ? `الصف ${user.grade} — ${esc(user.subject)}` : 'الصف الثالث والسادس'}</span></div>
  ${addForm}
  <div class="panel">${list.map(q => `<div class="question"><b>الصف ${q.grade} — ${esc(q.subject)} — الأسبوع ${q.week}</b><p>${esc(q.question)}</p><small>${esc(q.lesson || '')}</small></div>`).join('') || '<p class="muted">لا توجد أسئلة مطابقة بعد.</p>'}</div>`;
}
async function submitNewQuestion() {
  const week = +($('#newQWeek').value);
  const lesson = $('#newQLesson').value.trim();
  const question = $('#newQText').value.trim();
  const choices = [0, 1, 2, 3].map(i => $('#newQChoice' + i).value.trim());
  const correctRadio = document.querySelector('input[name=newQCorrect]:checked');
  if (!week || week < 1 || week > 17) return alert('حدد رقم أسبوع صحيح بين 1 و17.');
  if (!question) return alert('اكتب نص السؤال.');
  if (choices.some(c => !c)) return alert('يجب تعبئة الخيارات الأربعة كلها.');
  if (!correctRadio) return alert('حدد الإجابة الصحيحة بالضغط على الدائرة بجانبها.');
  try {
    await api('questions', { method: 'POST', body: { week, lesson, question, choices, answerIndex: +correctRadio.value } });
    alert('تمت إضافة السؤال إلى بنك الأسئلة بنجاح.');
    showAddQuestionForm = false; render();
  } catch (e) { alert(e.message); }
}

// ---------- اختبار الطالب (نفسه) ----------
async function tests() {
  let params = [];
  if (catchupTargetWeek) params.push('week=' + catchupTargetWeek);
  if (selectedSubject) params.push('subject=' + encodeURIComponent(selectedSubject));
  const path = 'week-test' + (params.length ? '?' + params.join('&') : '');
  let r;
  try { r = await api(path); } catch (e) { catchupTargetWeek = null; selectedSubject = null; return `<div class="panel"><p class="muted">${esc(e.message)}</p><button onclick="page='home';render()">رجوع للرئيسية</button></div>`; }

  // وضع المواد المنفصلة ولم تُحدَّد مادة بعد -> اعرض قائمة المواد لاختيار واحدة
  if (r.mode === 'separate' && !selectedSubject) {
    if (r.completed) {
      catchupTargetWeek = null;
      return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week} — أُنجزت كل المواد.</p></div><span class="pill green">مكتمل</span></div>
      <div class="panel"><h3>نتائجك في اختبار هذا الأسبوع</h3>${r.subjects.map(s => `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line-soft)"><span>${esc(s.subject)}</span><span class="pill green">${s.correct}/${s.total} (${s.pct}%)</span></div>`).join('')}<p class="muted" style="margin-top:10px">الاختبار القادم يوم ${r.examDayNames} بإذن الله.</p></div>`;
    }
    if (!r.isExamDay && !r.isCatchup) {
      return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">لا يوجد اختبار اليوم.</p></div><span class="pill yellow">مغلق اليوم</span></div><div class="panel"><h3>موعد الاختبار القادم</h3><p>تُفتح الاختبارات يومي <b>${r.examDayNames}</b> من كل أسبوع فقط. عد إلى المنصة في أقرب يوم اختبار.</p></div>`;
    }
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week} — كل مادة تُحل على حدة. اختر مادة لتبدأ.</p></div><span class="pill green">${r.isCatchup ? 'استكمال بإذن معلمك' : r.manualOpen ? '🔓 فتح استثنائي' : 'يظهر تلقائيًا'}</span></div>
    <div class="panel">${r.subjects.map(s => `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--line-soft)"><span style="font-weight:700">${esc(s.subject)}</span>${s.completed ? `<span class="pill green">✓ مكتمل (${s.pct}%)</span>` : `<button class="primary small-btn" onclick="selectedSubject='${esc(s.subject)}';render()">ابدأ</button>`}</div>`).join('')}</div>`;
  }

  if (r.completed) {
    catchupTargetWeek = null; selectedSubject = null;
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week}${r.subject ? ' — ' + esc(r.subject) : ''} — أُنجز بالفعل.</p></div><span class="pill green">مكتمل</span></div>
    <div class="panel"><h3>نتيجتك في اختبار هذا الأسبوع</h3><div class="cards"><div class="stat">الأسئلة<b>${r.result.total}</b></div><div class="stat">صحيح 🟢<b>${r.result.correct}</b></div><div class="stat">خطأ 🔴<b>${r.result.wrong}</b></div><div class="stat">النسبة<b>${r.result.pct}%</b></div></div><p style="font-size:16px;font-weight:800;color:var(--teal);margin-top:6px">${r.result.message}</p><p class="muted" style="margin-top:10px">الاختبار القادم يوم ${r.examDayNames} بإذن الله.</p></div>`;
  }
  if (!r.isExamDay && !r.isCatchup) {
    selectedSubject = null;
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">لا يوجد اختبار اليوم.</p></div><span class="pill yellow">مغلق اليوم</span></div><div class="panel"><h3>موعد الاختبار القادم</h3><p>تُفتح الاختبارات يومي <b>${r.examDayNames}</b> من كل أسبوع فقط. عد إلى المنصة في أقرب يوم اختبار.</p></div>`;
  }
  if (!r.questions.length) {
    return `<div class="page-head"><h2>اختباراتي</h2></div><div class="panel"><p class="muted">لا توجد أسئلة مجهزة لهذا الأسبوع بعد.</p></div>`;
  }
  const backBtn = r.mode === 'separate' ? `<button onclick="selectedSubject=null;render()">رجوع لقائمة المواد</button>` : '';
  return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week}${r.subject ? ' — ' + esc(r.subject) : ''}${r.isCatchup ? ' (استكمال أسبوع فائت)' : ''}${r.manualOpen ? ' — فُتح اليوم استثنائيًا من المشرف' : ''} — أجب عن جميع الأسئلة ثم أرسل الإجابات.</p></div><span class="pill green">${r.isCatchup ? 'استكمال بإذن معلمك' : r.manualOpen ? '🔓 فتح استثنائي' : 'يظهر تلقائيًا'}</span></div><div class="panel"><h3>اختبار الأسبوع</h3>${r.questions.map((q, i) => `<div class="question"><b>${i + 1}. ${esc(q.question)}</b><div class="muted" style="margin-top:5px;font-weight:600">${esc(q.subject)}</div>${q.choices.map((c, j) => `<label class="choice"><input type="radio" name="q_${q.id}" value="${j}"><span>${esc(c)}</span></label>`).join('')}</div>`).join('')}<div class="actions"><button class="primary" onclick="submitTest()">إرسال الإجابات</button>${backBtn}</div></div>`;
}
async function submitTest() {
  const questionBlocks = document.querySelectorAll('#page .question');
  const answers = {};
  let missing = 0;
  questionBlocks.forEach(block => {
    const checked = block.querySelector('input[type=radio]:checked');
    const anyInput = block.querySelector('input[type=radio]');
    if (!anyInput) return;
    const qid = anyInput.name.replace('q_', '');
    if (checked) answers[qid] = +checked.value; else missing++;
  });
  if (missing > 0) { alert(`يجب الإجابة عن جميع الأسئلة قبل الإرسال. متبقٍ ${missing} سؤالًا بدون إجابة.`); return; }
  const body = { answers };
  if (catchupTargetWeek) body.week = catchupTargetWeek;
  const wasSeparate = !!selectedSubject;
  if (selectedSubject) body.subject = selectedSubject;
  try {
    await api('week-test/submit', { method: 'POST', body });
    catchupTargetWeek = null; selectedSubject = null;
    page = wasSeparate ? 'tests' : 'results';
    await render();
  } catch (e) { alert(e.message); await render(); }
}
async function results() {
  const r = await api('my-results');
  const banner = r.weekBanner ? `<div class="panel" style="border-color:var(--teal-bright)"><h3>نتيجة اختبار هذا الأسبوع</h3><p style="font-size:16px;font-weight:800;color:var(--teal)">${r.weekBanner.message}</p><p class="muted">حصلت على ${r.weekBanner.correct} من ${r.weekBanner.total} (${r.weekBanner.pct}%).</p></div>` : '';
  const chart = r.byWeek && r.byWeek.length ? `<div class="panel"><h3>تقدّمي عبر الأسابيع</h3>${changeBadge(r.change)}<div style="margin-top:14px">${barChart(r.byWeek.map(w => ({ label: 'أسبوع ' + w.week, value: w.pct })))}</div></div>` : '';
  return `<div class="page-head"><h2>نتائجي</h2></div>${banner}<div class="cards"><div class="stat">المحلول<b>${r.total}</b></div><div class="stat">صحيح 🟢<b>${r.correct}</b></div><div class="stat">خطأ 🔴<b>${r.wrong}</b></div><div class="stat">الإنجاز<b>${r.achievement}%</b></div></div>${chart}`;
}

// ---------- بنك أسئلتي (مراجعة الطالب لما حلّه، مع إظهار الصحيح عند الخطأ) ----------
async function myQuestionBank() {
  const data = await api('my-question-bank');
  const bySubjectWeek = {};
  data.questions.forEach(q => {
    const key = q.subject; bySubjectWeek[key] = bySubjectWeek[key] || {};
    bySubjectWeek[key][q.week] = bySubjectWeek[key][q.week] || [];
    bySubjectWeek[key][q.week].push(q);
  });
  let html = `<div class="page-head"><div><h2>بنك أسئلتي</h2><p class="muted">راجع كل الأسئلة التي حللتها من قبل. عند الخطأ تظهر لك الإجابة الصحيحة. الأسئلة غير المحلولة بعد لا تظهر إجابتها.</p></div></div>`;
  Object.keys(bySubjectWeek).forEach(subject => {
    html += `<div class="panel"><h3>${esc(subject)}</h3>`;
    const weeks = Object.keys(bySubjectWeek[subject]).map(Number).sort((a, b) => a - b);
    weeks.forEach(w => {
      html += `<div style="margin-bottom:10px"><b style="color:var(--navy)">الأسبوع ${w}</b></div>`;
      bySubjectWeek[subject][w].forEach((q, i) => {
        if (!q.attempted) {
          html += `<div class="question"><b>${esc(q.question)}</b><p class="muted" style="margin-top:6px">🟡 لم تُحل بعد</p></div>`;
        } else {
          const statusLine = q.correct ? '<p style="color:var(--green);font-weight:700;margin-top:6px">🟢 إجابتك صحيحة</p>' : '<p style="color:var(--red);font-weight:700;margin-top:6px">🔴 إجابتك خاطئة</p>';
          html += `<div class="question"><b>${esc(q.question)}</b>${statusLine}${q.choices.map((c, j) => {
            let style = '';
            if (j === q.correctIndex) style = 'border-color:var(--green);background:var(--green-bg)';
            else if (j === q.selected && !q.correct) style = 'border-color:var(--red);background:var(--red-bg)';
            const mark = j === q.correctIndex ? ' ✓' : (j === q.selected && !q.correct ? ' ✗' : '');
            return `<div class="choice" style="cursor:default;${style}"><span>${esc(c)}${mark}</span></div>`;
          }).join('')}</div>`;
        }
      });
    });
    html += `</div>`;
  });
  if (!data.questions.length) html += `<div class="panel"><p class="muted">لا توجد أسئلة بعد لصفك.</p></div>`;
  return html;
}

// ---------- فتح اختبار الطالب من حساب المعلم ----------
function startProxy(id) { if (role !== 'teacher') return; proxyStudentId = id; proxyTargetWeek = null; selectedSubject = null; page = 'proxy'; render(); }
async function proxy() {
  if (!proxyStudentId) return `<div class="panel"><h3>اختر طالبًا</h3><button class="primary" onclick="page='students';render()">اختيار من قائمة الطلاب</button></div>`;
  let r;
  let params = [`studentId=${encodeURIComponent(proxyStudentId)}`];
  if (proxyTargetWeek) params.push(`week=${proxyTargetWeek}`);
  if (selectedSubject) params.push(`subject=${encodeURIComponent(selectedSubject)}`);
  try { r = await api('week-test?' + params.join('&')); }
  catch (e) { proxyStudentId = null; proxyTargetWeek = null; selectedSubject = null; return `<div class="panel"><p class="muted">${esc(e.message)}</p><button onclick="page='students';render()">رجوع</button></div>`; }
  const st = r.student;

  if (r.mode === 'separate' && !selectedSubject) {
    if (r.completed) {
      return `<div class="page-head"><div><h2>اختبار الطالب</h2><p class="muted">الطالب: <b>${esc(st.name)}</b> — الصف ${st.grade} — الفصل ${esc(st.class)}</p></div><span class="pill green">مكتمل هذا الأسبوع</span></div>
      <div class="panel"><h3>نتائج اختبار الأسبوع ${r.week}</h3>${r.subjects.map(s => `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line-soft)"><span>${esc(s.subject)}</span><span class="pill green">${s.correct}/${s.total} (${s.pct}%)</span></div>`).join('')}<button onclick="proxyStudentId=null;proxyTargetWeek=null;page='students';render()" style="margin-top:12px">رجوع لقائمة الطلاب</button></div>`;
    }
    return `<div class="page-head"><div><h2>اختبار الطالب</h2><p class="muted">الطالب: <b>${esc(st.name)}</b> — الصف ${st.grade} — الفصل ${esc(st.class)} — كل مادة تُحل على حدة</p></div><span class="pill yellow">${r.isCatchup ? 'استكمال أسبوع فائت' : 'اختر مادة'}</span></div>
    <div class="panel">${r.subjects.map(s => `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--line-soft)"><span style="font-weight:700">${esc(s.subject)}</span>${s.completed ? `<span class="pill green">✓ مكتمل (${s.pct}%)</span>` : `<button class="primary small-btn" onclick="selectedSubject='${esc(s.subject)}';render()">ابدأ</button>`}</div>`).join('')}<button onclick="proxyStudentId=null;proxyTargetWeek=null;page='students';render()" style="margin-top:12px">إلغاء</button></div>`;
  }

  if (r.completed) {
    return `<div class="page-head"><div><h2>اختبار الطالب</h2><p class="muted">الطالب: <b>${esc(st.name)}</b> — الصف ${st.grade} — الفصل ${esc(st.class)}</p></div><span class="pill green">مكتمل هذا الأسبوع</span></div><div class="panel"><h3>نتيجة اختبار الأسبوع ${r.week}${r.subject ? ' — ' + esc(r.subject) : ''}</h3><p>حصل الطالب على ${r.result.correct} من ${r.result.total} (${r.result.pct}%).</p><p style="font-weight:800;color:var(--teal)">${r.result.message}</p><button onclick="proxyStudentId=null;proxyTargetWeek=null;selectedSubject=null;page='students';render()">رجوع لقائمة الطلاب</button></div>`;
  }
  if (!r.questions.length) return `<div class="panel"><p class="muted">لا توجد أسئلة مجهزة لهذا الأسبوع بعد.</p></div>`;
  const backBtn = r.mode === 'separate' ? `<button onclick="selectedSubject=null;render()">رجوع لقائمة المواد</button>` : '';
  return `<div class="page-head"><div><h2>اختبار الطالب</h2><p class="muted">الطالب: <b>${esc(st.name)}</b> — الصف ${st.grade} — الفصل ${esc(st.class)}</p></div><span class="pill yellow">${r.isCatchup ? 'استكمال أسبوع فائت — من حساب المعلم' : 'الطالب يحل من حساب المعلم'}</span></div>
  <div class="proxy-banner"><div><strong>تنبيه مهم</strong><p>تُحفظ الإجابات باسم الطالب. المعلم يفتح ملف الطالب فقط، ثم الطالب نفسه يختار الإجابات ويحل الاختبار. يجب الإجابة عن جميع الأسئلة.</p></div></div>
  <div class="panel"><label>حالة الدخول</label><select id="proxyReason"><option>الطالب يحل من جهاز المعلم</option><option>تعذر دخول الطالب من المنزل</option><option>استكمال أسبوع فائت</option><option>مشكلة تقنية لدى الطالب</option></select></div>
  <div class="panel"><h3>اختبار الأسبوع ${r.week}${r.subject ? ' — ' + esc(r.subject) : ''}</h3>${r.questions.map((q, i) => `<div class="question"><b>${i + 1}. ${esc(q.question)}</b><div class="muted" style="margin-top:5px">${esc(q.subject)} — الأسبوع ${q.week} — ${esc(q.lesson || '')}</div>${q.choices.map((c, j) => `<label class="choice"><input type="radio" name="pq_${q.id}" value="${j}"><span>${esc(c)}</span></label>`).join('')}</div>`).join('')}<div class="actions"><button class="primary" onclick="submitProxyTest()">حفظ إجابات الطالب</button><button onclick="proxyStudentId=null;proxyTargetWeek=null;selectedSubject=null;page='students';render()">إلغاء</button>${backBtn}</div></div>`;
}
async function submitProxyTest() {
  if (!proxyStudentId) return;
  const reason = $('#proxyReason') ? $('#proxyReason').value : '';
  const questionBlocks = document.querySelectorAll('#page .question');
  const answers = {};
  let missing = 0;
  questionBlocks.forEach(block => {
    const checked = block.querySelector('input[type=radio]:checked');
    const anyInput = block.querySelector('input[type=radio]');
    if (!anyInput) return;
    const qid = anyInput.name.replace('pq_', '');
    if (checked) answers[qid] = +checked.value; else missing++;
  });
  if (missing > 0) { alert(`يجب الإجابة عن جميع الأسئلة قبل الحفظ. متبقٍ ${missing} سؤالًا بدون إجابة.`); return; }
  try {
    const body = { studentId: proxyStudentId, answers, reason };
    if (proxyTargetWeek) body.week = proxyTargetWeek;
    const wasSeparate = !!selectedSubject;
    if (selectedSubject) body.subject = selectedSubject;
    const res = await api('week-test/submit', { method: 'POST', body });
    alert(`تم حفظ ${res.total} إجابة باسم الطالب ${res.studentName}.\nالطالب هو من أجاب، وتم تسجيل أن الجلسة تمت من حساب المعلم.\nالحالة: ${reason}`);
    selectedSubject = null;
    if (wasSeparate) { await render(); } // ابقَ في صفحة الطالب لإكمال بقية المواد
    else { proxyStudentId = null; proxyTargetWeek = null; page = 'reports'; await render(); }
  } catch (e) { alert(e.message); }
}

// ---------- التقارير ----------
// ---------- توليد تحليل تلقائي (قياس الأثر) من بيانات الأداء ----------
function generateInsights(stats, students) {
  const lines = [];
  if (stats.overallPct !== null && stats.overallPct !== undefined) {
    if (stats.overallPct >= 80) lines.push(`📈 المستوى العام ممتاز، بمعدل إتقان ${stats.overallPct}% على جميع الأسئلة المحلولة.`);
    else if (stats.overallPct >= 60) lines.push(`📊 المستوى العام جيد، بمعدل إتقان ${stats.overallPct}%، مع وجود مجال للتحسين.`);
    else lines.push(`⚠️ المستوى العام يحتاج دعمًا إضافيًا، بمعدل إتقان ${stats.overallPct}% فقط.`);
  }
  if (stats.change !== null && stats.change !== undefined) {
    if (stats.change > 5) lines.push(`✅ تحسّن ملحوظ بنسبة ${stats.change}% مقارنة بالأسبوع السابق — استمروا على هذا الأداء.`);
    else if (stats.change < -5) lines.push(`🔻 تراجع بنسبة ${Math.abs(stats.change)}% مقارنة بالأسبوع السابق — يُنصح بمراجعة أسباب التراجع.`);
    else lines.push(`➖ الأداء مستقر تقريبًا مقارنة بالأسبوع السابق (فرق ${stats.change}%).`);
  }
  if (stats.bySubject && stats.bySubject.length >= 2) {
    const sorted = [...stats.bySubject].sort((a, b) => b.pct - a.pct);
    const best = sorted[0], worst = sorted[sorted.length - 1];
    if (best.subject !== worst.subject) lines.push(`🏆 أقوى مادة: ${esc(best.subject)} بنسبة ${best.pct}%. 🎯 المادة الأكثر احتياجًا للتعزيز: ${esc(worst.subject)} بنسبة ${worst.pct}%.`);
  }
  if (students && students.length) {
    const strugglingCount = students.filter(s => s.status === 'struggling').length;
    const notStartedCount = students.filter(s => s.status === 'not_started').length;
    if (strugglingCount > 0) lines.push(`🔴 يوجد ${strugglingCount} طالبًا في مستوى متعثر ويحتاجون متابعة عاجلة.`);
    if (notStartedCount > 0) lines.push(`🟡 يوجد ${notStartedCount} طالبًا لم يشاركوا بعد في أي اختبار.`);
    if (strugglingCount === 0 && notStartedCount === 0) lines.push(`🎉 جميع الطلاب شاركوا، ولا يوجد طالب في مستوى متعثر حاليًا.`);
  }
  if (stats.weeks && stats.weeks.length >= 3) {
    const bestWeek = [...stats.weeks].sort((a, b) => b.pct - a.pct)[0];
    lines.push(`📅 أفضل أسبوع أداءً حتى الآن: الأسبوع ${bestWeek.week} بنسبة ${bestWeek.pct}%.`);
  }
  if (!lines.length) lines.push('لا توجد بيانات كافية بعد لتوليد تحليل. سيظهر التحليل تلقائيًا بعد إنجاز عدد كافٍ من الاختبارات.');
  return lines;
}

async function reports() {
  const ov = await api('students-overview');
  const list = ov.students;
  const statusBadge = s => s.status === 'not_started' ? '<span class="pill yellow">🟡 لم يشارك</span>' : s.status === 'struggling' ? '<span class="pill" style="background:var(--red-bg);color:var(--red)">🔴 متعثر</span>' : '<span class="pill green">🟢 متقن</span>';
  let stats = null;
  try { stats = await api('reports-stats'); } catch {}
  const weekChart = stats && stats.weeks && stats.weeks.length ? `<div class="panel"><h3>نسبة الإتقان عبر الأسابيع${role === 'teacher' ? ' (فصولك)' : ''}</h3>${changeBadge(stats.change)}<div style="margin-top:14px">${barChart(stats.weeks.map(w => ({ label: 'أسبوع ' + w.week, value: w.pct })))}</div></div>` : '';
  const subjectChart = stats && stats.bySubject && stats.bySubject.length ? `<div class="panel"><h3>مقارنة الأداء بين المواد</h3><div style="margin-top:14px">${barChart(stats.bySubject.map(s => ({ label: s.subject, value: s.pct })))}</div></div>` : '';
  const insights = stats ? generateInsights(stats, list) : [];
  const insightsPanel = `<div class="panel" style="background:linear-gradient(135deg,#f4f1ff,#eef6ff);border-color:#c9b8f0"><h3>🧠 قياس الأثر — تحليل تلقائي</h3><ul style="margin:10px 0 0;padding-inline-start:22px;line-height:2.1">${insights.map(l => `<li>${l}</li>`).join('')}</ul></div>`;
  return `<div class="page-head"><div><h2>التقارير</h2><p class="muted">${role === 'teacher' ? 'تقارير طلاب فصولك المسندة فقط. ' : ''}يظهر هنا أيضًا إذا كانت الإجابة من الطالب أو نيابةً عنه بواسطة المعلم.</p></div><button onclick="window.print()">طباعة / PDF</button></div>
  ${insightsPanel}
  ${weekChart}
  ${subjectChart}
  <div class="panel"><table><thead><tr><th>الطالب</th><th>الصف</th><th>الفصل</th><th>الحالة</th><th>حل</th><th>صحيح</th><th>خطأ</th><th>طريقة الحل</th><th>تذكير</th></tr></thead><tbody>${list.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${statusBadge(s)}</td><td>${s.total}</td><td>${s.correct}</td><td>${s.wrong}</td><td>${s.proxyCount ? `<span class="pill yellow">${s.proxyCount} من جلسة حساب المعلم</span>` : '<span class="pill green">من حساب الطالب</span>'}</td><td>${!s.currentWeekDone && s.phone ? `<a href="${whatsappLink(s.phone, s.name)}" target="_blank" rel="noopener" class="small-btn" style="display:inline-block;text-decoration:none;border:1.5px solid var(--line);border-radius:9px;padding:8px 14px;color:var(--ink)">📱 واتساب</a>` : (!s.currentWeekDone ? '<span class="muted" style="font-size:12px">لا يوجد جوال</span>' : '—')}</td></tr>`).join('') || '<tr><td colspan="9">لا يوجد طلاب.</td></tr>'}</tbody></table></div>`;
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
  <div class="panel" style="border-color:${s.manualOpenWeek ? '#e7c26f' : 'var(--line-soft)'}"><h3>🔓 فتح استثنائي (عطلة أو ظرف طارئ)</h3><p class="muted">استخدم هذا فقط إذا صادف يوم الاختبار المعتاد إجازة رسمية، لفتح اختبار الأسبوع الحالي (${s.currentWeek}) لجميع الطلاب اليوم بشكل استثنائي، دون تعديل الجدول التلقائي.</p>
  ${s.manualOpenWeek ? `<p style="font-weight:800;color:var(--yellow)">مُفعَّل الآن للأسبوع ${s.manualOpenWeek}</p><button class="danger" onclick="clearManualOpen()">إلغاء الفتح الاستثنائي</button>` : `<button class="primary" onclick="setManualOpen(${s.currentWeek})">فتح اختبار الأسبوع ${s.currentWeek} اليوم استثنائيًا</button>`}</div>
  <div class="panel"><h3>📚 طريقة فتح المواد</h3><p class="muted">مجتمعة: كل مواد الطالب (لغتي/رياضيات/علوم) تظهر معًا في اختبار واحد بجلسة واحدة (الطريقة الحالية). منفصلة: كل مادة تفتح وتُنجز على حدة، ويمكن للطالب إكمالها بأوقات مختلفة.</p>
  <div class="tabs" style="max-width:360px"><button class="tab ${!s.subjectsSeparate ? 'active' : ''}" onclick="setSubjectsMode(false)">مجتمعة (الحالية)</button><button class="tab ${s.subjectsSeparate ? 'active' : ''}" onclick="setSubjectsMode(true)">منفصلة (كل مادة لوحدها)</button></div></div>
  <div class="panel"><h3>بيانات دخول المشرف</h3><p class="muted">اسم المستخدم الحالي: <b>${esc(s.supervisorUsername)}</b></p><button onclick="changeSupervisorPass()">تغيير اسم المستخدم/كلمة المرور</button></div>`;
}
async function setSubjectsMode(sep) {
  try { await api('settings', { method: 'PUT', body: { subjectsSeparate: sep } }); render(); }
  catch (e) { alert(e.message); }
}
async function setManualOpen(week) {
  try { await api('settings', { method: 'PUT', body: { manualOpenWeek: week } }); render(); }
  catch (e) { alert(e.message); }
}
async function clearManualOpen() {
  try { await api('settings', { method: 'PUT', body: { manualOpenWeek: null } }); render(); }
  catch (e) { alert(e.message); }
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
