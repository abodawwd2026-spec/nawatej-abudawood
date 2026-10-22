// ---------- خرائط إحداثيات الفقاعات (نِسَب من أبعاد صفحة نموذج الإجابة PDF 540×780pt) ----------
// BUBBLE_ID_GRID[عمود 0..9][رقم 0..9] = [x نسبي, y نسبي] لرقم الهوية (10 خانات)
const BUBBLE_ID_GRID = [[[0.0337, 0.27564], [0.0337, 0.29564], [0.0337, 0.31519], [0.0337, 0.33564], [0.0337, 0.35564], [0.0337, 0.37513], [0.0337, 0.39404], [0.0337, 0.41455], [0.0337, 0.43449], [0.0337, 0.45404]], [[0.06083, 0.27564], [0.06083, 0.29564], [0.06083, 0.31519], [0.06083, 0.33564], [0.06083, 0.35564], [0.06083, 0.37513], [0.06083, 0.39404], [0.06083, 0.41455], [0.06083, 0.43449], [0.06083, 0.45404]], [[0.08806, 0.27564], [0.08806, 0.29564], [0.08806, 0.31519], [0.08806, 0.33564], [0.08806, 0.35564], [0.08806, 0.37513], [0.08806, 0.39404], [0.08806, 0.41455], [0.08806, 0.43449], [0.08806, 0.45404]], [[0.11509, 0.27564], [0.11509, 0.29564], [0.11509, 0.31519], [0.11509, 0.33564], [0.11509, 0.35564], [0.11509, 0.37513], [0.11509, 0.39404], [0.11509, 0.41455], [0.11509, 0.43449], [0.11509, 0.45404]], [[0.14231, 0.27564], [0.14231, 0.29564], [0.14231, 0.31519], [0.14231, 0.33564], [0.14231, 0.35564], [0.14231, 0.37513], [0.14231, 0.39404], [0.14231, 0.41455], [0.14231, 0.43449], [0.14231, 0.45404]], [[0.16944, 0.27564], [0.16944, 0.29564], [0.16944, 0.31519], [0.16944, 0.33564], [0.16944, 0.35564], [0.16944, 0.37513], [0.16944, 0.39404], [0.16944, 0.41455], [0.16944, 0.43449], [0.16944, 0.45404]], [[0.19657, 0.27564], [0.19657, 0.29564], [0.19657, 0.31519], [0.19657, 0.33564], [0.19657, 0.35564], [0.19657, 0.37513], [0.19657, 0.39404], [0.19657, 0.41455], [0.19657, 0.43449], [0.19657, 0.45404]], [[0.2237, 0.27564], [0.2237, 0.29564], [0.2237, 0.31519], [0.2237, 0.33564], [0.2237, 0.35564], [0.2237, 0.37513], [0.2237, 0.39404], [0.2237, 0.41455], [0.2237, 0.43449], [0.2237, 0.45404]], [[0.25083, 0.27564], [0.25083, 0.29564], [0.25083, 0.31519], [0.25083, 0.33564], [0.25083, 0.35564], [0.25083, 0.37513], [0.25083, 0.39404], [0.25083, 0.41455], [0.25083, 0.43449], [0.25083, 0.45404]], [[0.27796, 0.27564], [0.27796, 0.29564], [0.27796, 0.31519], [0.27796, 0.33564], [0.27796, 0.35564], [0.27796, 0.37513], [0.27796, 0.39404], [0.27796, 0.41455], [0.27796, 0.43449], [0.27796, 0.45404]]];
// BUBBLE_Q_GRID[سؤال 0..59][خيار 0..3 أي أ/ب/ج/د] = [x نسبي, y نسبي]
const BUBBLE_Q_GRID = [[[0.92265, 0.59408], [0.88244, 0.59277], [0.84189, 0.59095], [0.80167, 0.59277]], [[0.92265, 0.62042], [0.88244, 0.61908], [0.84189, 0.61726], [0.80167, 0.61908]], [[0.92265, 0.64437], [0.88244, 0.64301], [0.84189, 0.64119], [0.80167, 0.64301]], [[0.92265, 0.66827], [0.88244, 0.66692], [0.84189, 0.66514], [0.80167, 0.66692]], [[0.92265, 0.69222], [0.88244, 0.69086], [0.84189, 0.68904], [0.80167, 0.69086]], [[0.92265, 0.71612], [0.88246, 0.71476], [0.84189, 0.71299], [0.80167, 0.71476]], [[0.92265, 0.74006], [0.88244, 0.73871], [0.84189, 0.73688], [0.80167, 0.73871]], [[0.92265, 0.764], [0.88244, 0.76264], [0.84189, 0.76083], [0.80167, 0.76264]], [[0.92265, 0.78791], [0.88244, 0.78655], [0.84189, 0.78477], [0.80167, 0.78655]], [[0.92265, 0.81185], [0.88244, 0.81049], [0.84189, 0.80868], [0.80167, 0.81049]], [[0.92265, 0.83576], [0.88246, 0.83438], [0.84189, 0.83262], [0.80167, 0.83438]], [[0.92265, 0.85969], [0.88244, 0.85833], [0.84189, 0.85653], [0.80167, 0.85833]], [[0.92265, 0.88363], [0.88244, 0.88227], [0.84189, 0.88046], [0.80167, 0.88227]], [[0.92265, 0.90754], [0.88244, 0.90618], [0.84189, 0.9044], [0.80167, 0.90618]], [[0.92265, 0.93147], [0.88244, 0.93012], [0.84189, 0.92831], [0.80167, 0.93012]], [[0.67567, 0.59408], [0.63541, 0.59277], [0.59491, 0.59095], [0.5547, 0.59277]], [[0.67567, 0.62042], [0.63541, 0.61908], [0.59491, 0.61726], [0.5547, 0.61908]], [[0.67567, 0.64437], [0.63541, 0.64301], [0.59491, 0.64119], [0.5547, 0.64301]], [[0.67567, 0.66827], [0.63541, 0.66692], [0.59491, 0.66514], [0.5547, 0.66692]], [[0.67567, 0.69222], [0.63541, 0.69086], [0.59491, 0.68904], [0.5547, 0.69086]], [[0.67567, 0.71612], [0.63543, 0.71476], [0.59491, 0.71299], [0.5547, 0.71476]], [[0.67567, 0.74006], [0.63541, 0.73871], [0.59491, 0.73688], [0.5547, 0.73871]], [[0.67567, 0.764], [0.63541, 0.76264], [0.59491, 0.76083], [0.5547, 0.76264]], [[0.67567, 0.78791], [0.63541, 0.78655], [0.59491, 0.78477], [0.5547, 0.78655]], [[0.67567, 0.81185], [0.63541, 0.81049], [0.59491, 0.80868], [0.5547, 0.81049]], [[0.67567, 0.83576], [0.63543, 0.83438], [0.59491, 0.83262], [0.5547, 0.83438]], [[0.67567, 0.85969], [0.63541, 0.85833], [0.59491, 0.85653], [0.5547, 0.85833]], [[0.67567, 0.88363], [0.63541, 0.88227], [0.59491, 0.88046], [0.5547, 0.88227]], [[0.67567, 0.90754], [0.63541, 0.90618], [0.59491, 0.9044], [0.5547, 0.90618]], [[0.67567, 0.93147], [0.63541, 0.93012], [0.59491, 0.92831], [0.5547, 0.93012]], [[0.42869, 0.59408], [0.38844, 0.59277], [0.34793, 0.59095], [0.30767, 0.59277]], [[0.42869, 0.62042], [0.38844, 0.61908], [0.34793, 0.61726], [0.30767, 0.61908]], [[0.42869, 0.64437], [0.38844, 0.64301], [0.34793, 0.64119], [0.30767, 0.64301]], [[0.42869, 0.66827], [0.38844, 0.66692], [0.34793, 0.66514], [0.30767, 0.66692]], [[0.42869, 0.69222], [0.38844, 0.69086], [0.34793, 0.68904], [0.30767, 0.69086]], [[0.42869, 0.71612], [0.38846, 0.71476], [0.34793, 0.71299], [0.30767, 0.71476]], [[0.42869, 0.74006], [0.38844, 0.73871], [0.34793, 0.73688], [0.30767, 0.73871]], [[0.42869, 0.764], [0.38844, 0.76264], [0.34793, 0.76083], [0.30767, 0.76264]], [[0.42869, 0.78791], [0.38844, 0.78655], [0.34793, 0.78477], [0.30767, 0.78655]], [[0.42869, 0.81185], [0.38844, 0.81049], [0.34793, 0.80868], [0.30767, 0.81049]], [[0.42869, 0.83576], [0.38846, 0.83438], [0.34793, 0.83262], [0.30767, 0.83438]], [[0.42869, 0.85969], [0.38844, 0.85833], [0.34793, 0.85653], [0.30767, 0.85833]], [[0.42869, 0.88363], [0.38844, 0.88227], [0.34793, 0.88046], [0.30767, 0.88227]], [[0.42869, 0.90754], [0.38844, 0.90618], [0.34793, 0.9044], [0.30767, 0.90618]], [[0.42869, 0.93147], [0.38844, 0.93012], [0.34793, 0.92831], [0.30767, 0.93012]], [[0.18167, 0.59408], [0.14146, 0.59277], [0.10091, 0.59095], [0.06069, 0.59277]], [[0.18167, 0.62042], [0.14146, 0.61908], [0.10091, 0.61726], [0.06069, 0.61908]], [[0.18167, 0.64437], [0.14146, 0.64301], [0.10091, 0.64119], [0.06069, 0.64301]], [[0.18167, 0.66827], [0.14146, 0.66692], [0.10091, 0.66514], [0.06069, 0.66692]], [[0.18167, 0.69222], [0.14146, 0.69086], [0.10091, 0.68904], [0.06069, 0.69086]], [[0.18167, 0.71612], [0.14146, 0.71476], [0.10091, 0.71299], [0.0607, 0.71476]], [[0.18167, 0.74006], [0.14146, 0.73871], [0.10091, 0.73688], [0.06069, 0.73871]], [[0.18167, 0.764], [0.14146, 0.76264], [0.10091, 0.76083], [0.06069, 0.76264]], [[0.18167, 0.78791], [0.14146, 0.78655], [0.10091, 0.78477], [0.06069, 0.78655]], [[0.18167, 0.81185], [0.14146, 0.81049], [0.10091, 0.80868], [0.06069, 0.81049]], [[0.18167, 0.83576], [0.14146, 0.83438], [0.10091, 0.83262], [0.0607, 0.83438]], [[0.18167, 0.85969], [0.14146, 0.85833], [0.10091, 0.85653], [0.06069, 0.85833]], [[0.18167, 0.88363], [0.14146, 0.88227], [0.10091, 0.88046], [0.06069, 0.88227]], [[0.18167, 0.90754], [0.14146, 0.90618], [0.10091, 0.9044], [0.06069, 0.90618]], [[0.18167, 0.93147], [0.14146, 0.93012], [0.10091, 0.92831], [0.06069, 0.93012]]];
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

// ---------- أهداف اختبار نافس (وثيقة نواتج التعلم للاختبارات الوطنية 2026 — هيئة تقويم التعليم والتدريب) ----------
// بيانات ثابتة من الوثيقة الرسمية (المستوى العام لكل صف ومادة)، تُعرض في الصفحة الرئيسية وصفحة "الأهداف"
const OBJECTIVES = {
  3: {
    'لغتي': [
      'تحديد معاني المفردات الواردة في النص وأضدادها ومرادفاتها، وتصنيفها حسب معانيها وأنواعها من حيث العدد والنوع، واستخدامها في جمل مفيدة وسياقات لغوية جديدة.',
      'تحديد الأفكار الصريحة للنص المقروء، واستنتاج حقائقه، وتفسيرها، وتحليلها، وتمييز نوع النص.',
      'التمييز بين عبارات النص المقروء، وإبداء الرأي حول وجهات النظر، واستنتاج القيم، وتقويمها، واقتراح البدائل.',
    ],
    'رياضيات': [
      'وصف الأعداد ضمن أربع منازل، وجمعها وطرحها وتقديرها، وتكوين حقائق الضرب والقسمة، وتمييز الكسور وتحديد المتكافئة منها، وتمثيلها.',
      'تمييز الأنماط العددية وغير العددية وتكوينها، وفهم خصائص العمليات الحسابية والعلاقات بينها.',
      'وصف الأشكال الهندسية ثنائية وثلاثية الأبعاد، وتمييز خصائصها، وتصنيفها.',
      'وصف المحيط والمساحة لأشكال ثنائية الأبعاد وإيجادها وتقديرها، وتمييز الأطوال والكتل والسعات وفئات النقود ووحدات الزمن.',
      'جمع البيانات من البيئة، وتنظيمها وتمثيلها، وقراءة تلك التمثيلات وتفسيرها.',
    ],
  },
  6: {
    'لغتي': [
      'استنتاج مرادفات المفردات الواردة في النص المقروء ومعانيها، وتمييز المفردات المتشابهة في المعنى مع التمثيل لها، واستخدام المفردات ومرادفاتها وأضدادها في جمل مفيدة.',
      'تمييز الأفكار الرئيسة والفرعية للنص المقروء واستنتاج حقائقه وتفسيرها وتحليلها، وتحديد نوع النص وغرضه.',
      'إبداء الرأي في وجهة نظر الكاتب والقيم والاتجاهات، واقتراح البدائل والحلول، واستخدام أساليب الإقناع والتعليل.',
    ],
    'رياضيات': [
      'وصف الأعداد متعددة المنازل، وإجراء العمليات الأربع عليها، وإيجاد العوامل والمضاعفات والقوى.',
      'تمييز الكسور الاعتيادية والعشرية والأعداد الكسرية، وإجراء العمليات الأربع عليها، وإيجاد النسبة والمعدل والتناسب.',
      'تمييز العلاقات والعبارات العددية والجبرية، وإيجاد قيمها، وحل المعادلة الخطية.',
      'تمييز المفاهيم الهندسية الأولية وخصائص المضلع والمثلث والأشكال الرباعية والدائرة والمنشور، ورسمها.',
      'إيجاد المحيط والمساحة والحجم والمساحة السطحية لأشكال ثنائية وثلاثية الأبعاد، والتحويل بين وحدات القياس المترية.',
      'جمع بيانات كمية ونوعية واقعية وتنظيمها وتمثيلها وقراءة تلك التمثيلات وتفسيرها وتحليلها باستخدام مقاييس النزعة المركزية، وعدّ نواتج تجربة عشوائية، وإيجاد احتمال حادثة.',
    ],
    'علوم': [
      'التعرف على تركيب الخلية ووظائفها الحيوية، ووصف تركيب بعض أجهزة الجسم وربطها بوظائفها، ووصف التغيرات المصاحبة لنمو بعض المخلوقات الحية، وتصنيفها تبعًا لصفاتها الظاهرية.',
      'وصف الأنظمة البيئية ومكوناتها والعلاقات المتبادلة بينها، وتتبع انتقال المادة والطاقة فيها، وتوضيح أثر التغيرات البيئية ومعها، ووصف أثر النشاط البشري على النظام البيئي.',
      'دراسة وراثة الصفات، وتفسير انتقالها من جيل لآخر، والتمييز بين أنواعها (سائدة ومنتحية)، وتوضيح أثر البيئة فيها.',
      'استكشاف الخصائص الفيزيائية والكيميائية للمادة، ووصف تركيبها الجزيئي وتغيراتها بسبب الحرارة، وإدراك مفاهيم التغيرات والتفاعلات الكيميائية ومؤشرات حدوثها وأنواعها، والعوامل المؤثرة في سرعتها، وتطبيق قانون حفظ الكتلة.',
      'التمييز بين مفهوم الطاقة والشغل، واستيعاب مبدأ حفظ الطاقة ومفهوم الطاقة الحركية وانتقالها وتطبيقاتها في الحياة اليومية.',
      'توضيح مفهوم القوة والتمييز بين أنواعها والعوامل المؤثرة فيها، واستيعاب قوانين نيوتن، وتفسير حركة الأجسام في ضوئها.',
      'استيعاب مفهوم الموجات وخصائصها، وانعكاس الضوء، وانتقال الصوت، وتفسير دورهما في التفاعل والتواصل في البيئة من حولنا.',
      'استيعاب مفهوم الشحنة الكهربائية وتجاذب وتنافر الأجسام المشحونة، والمقارنة بين الكهرباء الساكنة والمتحركة، وخصائص المغناطيس واستخداماته.',
      'التعرف على النظام الشمسي ودور الجاذبية في حركة مكوناته، وتفسير الظواهر المرتبطة بذلك، وتوضيح علاقة المجموعة الشمسية بالمجرات والكون من حولها.',
      'وصف أغلفة الأرض ومكوناتها وخصائصها، وشرح العمليات التي تحدث فيها وأسبابها وآثارها.',
    ],
  },
};
function subjectsOfGrade(grade) { return Number(grade) === 3 ? ['لغتي', 'رياضيات'] : ['لغتي', 'رياضيات', 'علوم']; }
function objectivesMarquee(items) {
  if (!items || !items.length) return '';
  const text = items.map((t, i) => `🎯 ${t}`).join('&nbsp;&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;&nbsp;');
  return `<div class="panel" style="overflow:hidden;background:linear-gradient(135deg,#eef6ff,#f4f1ff);border-color:#c9b8f0">
  <h3 style="margin-bottom:8px">🎯 أهداف اختبار نافس</h3>
  <div style="overflow:hidden;white-space:nowrap;border-top:1px solid #dcd3f2;padding-top:10px">
    <div style="display:inline-block;white-space:nowrap;animation:nafsMarquee 38s linear infinite">${text}&nbsp;&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;&nbsp;${text}</div>
  </div>
  <style>@keyframes nafsMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style>
  </div>`;
}
function objectivesCards(items) {
  if (!items || !items.length) return '<p class="muted">لا توجد أهداف مسجَّلة لهذا الاختيار.</p>';
  return `<div class="panel">${items.map((t, i) => `<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;${i ? 'border-top:1px solid var(--line-soft)' : ''}"><span class="pill blue" style="flex:none">0${i + 1}</span><p style="margin:0">${esc(t)}</p></div>`).join('')}</div>`;
}
async function objectivesPage() {
  if (role === 'teacher') {
    const items = (OBJECTIVES[user.grade] || {})[user.subject] || [];
    return `<div class="page-head"><h2>🎯 أهداف مادتي (${esc(user.subject)} — الصف ${user.grade})</h2></div>
    <p class="muted">أهداف التعلم الرسمية لمادتك وصفك، من وثيقة نواتج التعلم للاختبارات الوطنية (نافس) — هيئة تقويم التعليم والتدريب.</p>
    ${objectivesCards(items)}`;
  }
  // المشرف: اختيار صف ومادة
  if (!window.__objGrade) window.__objGrade = 6;
  if (!window.__objSubject) window.__objSubject = 'لغتي';
  const grade = window.__objGrade;
  const subs = subjectsOfGrade(grade);
  if (!subs.includes(window.__objSubject)) window.__objSubject = subs[0];
  const items = (OBJECTIVES[grade] || {})[window.__objSubject] || [];
  return `<div class="page-head"><h2>🎯 الأهداف التعليمية (نافس)</h2></div>
  <div class="panel"><div class="grid2">
    <div><label>الصف</label><div class="tabs"><button class="tab ${grade === 3 ? 'active' : ''}" onclick="window.__objGrade=3;render()">الثالث</button><button class="tab ${grade === 6 ? 'active' : ''}" onclick="window.__objGrade=6;render()">السادس</button></div></div>
    <div><label>المادة</label><div class="tabs">${subs.map(s => `<button class="tab ${window.__objSubject === s ? 'active' : ''}" onclick="window.__objSubject='${s}';render()">${s}</button>`).join('')}</div></div>
  </div></div>
  ${objectivesCards(items)}`;
}

// ---------- التغذية الراجعة: اجتماع كل أسبوعين — توقيع إلكتروني + سجل الاجتماعات (قابل للطباعة PDF) ----------
function fbFmtDate(iso) {
  try { return new Date(iso).toLocaleDateString('ar-SA-u-ca-gregory', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' }); } catch { return iso; }
}
function fbFmtHijri(iso) {
  try { return new Date(iso).toLocaleDateString('ar-SA-u-ca-islamic-umalqura', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' }); } catch { return ''; }
}
function fbFmtTime(iso) {
  try { return new Date(iso).toLocaleTimeString('ar-SA-u-ca-gregory', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit' }); } catch { return ''; }
}
function fbRows(log) {
  // صفوف السجل: لكل فترة (الأحدث أولًا) كل معلم مع حالته
  const map = {}; log.signs.forEach(s => { map[s.teacher_username + '|' + s.period_num] = s; });
  const rows = [];
  [...log.periods].reverse().forEach(p => {
    log.teachers.forEach(t => rows.push({ p, t, s: map[t.username + '|' + p.n] || null }));
  });
  return rows;
}
function fbLogTable(log, canCancel) {
  const rows = fbRows(log);
  if (!rows.length) return '<p class="muted">لا يوجد سجل بعد.</p>';
  return `<div style="overflow:auto"><table><thead><tr><th>الفترة</th><th>مدة الاجتماع</th><th>المعلم</th><th>المادة</th><th>الحالة</th><th>تاريخ التوقيع</th><th>التوقيع</th>${canCancel ? '<th></th>' : ''}</tr></thead><tbody>
  ${rows.map(r => `<tr><td>${r.p.n}</td><td>${r.p.start} → ${r.p.end}</td><td>${esc(r.t.name)}</td><td>${esc(r.t.subject)}</td>
  <td>${r.s ? '<span class="pill green">✅ وقّع</span>' : '<span class="pill" style="background:var(--red-bg);color:var(--red)">لم يوقّع</span>'}</td>
  <td>${r.s ? `${fbFmtDate(r.s.signed_at)}<br><span class="muted">${fbFmtHijri(r.s.signed_at)} هـ — ${fbFmtTime(r.s.signed_at)}</span>` : '—'}</td>
  <td>${r.s ? (r.s.signature ? `<img src="${r.s.signature}" style="height:44px;background:#fff;border:1px solid var(--line-soft);border-radius:6px">` : '<span class="muted">إقرار إلكتروني</span>') : '—'}</td>
  ${canCancel ? `<td>${r.s ? `<button class="ghost" onclick="unsignFeedback('${esc(r.t.username)}',${r.p.n})">إلغاء</button>` : ''}</td>` : ''}</tr>`).join('')}
  </tbody></table></div>`;
}
function printFeedbackLog() {
  const log = window.__fbLog; if (!log) return;
  const rows = fbRows(log);
  const title = role === 'teacher' ? 'سجل اجتماعات التغذية الراجعة — ' + (log.teachers[0] ? log.teachers[0].name : '') : 'سجل اجتماعات التغذية الراجعة — المعلمون';
  const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${esc(title)}</title>
  <style>body{font-family:Tahoma,Arial,sans-serif;margin:24px;color:#111}h1{font-size:20px;margin:0 0 4px}p{margin:2px 0 14px;color:#444;font-size:13px}
  table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #888;padding:6px;text-align:center}th{background:#eee}img{height:40px}
  .sig{margin-top:40px;display:flex;justify-content:space-between;font-size:13px}@page{size:A4 landscape;margin:12mm}</style></head><body>
  <h1>مدرسة أبوداوود الابتدائية — ${esc(title)}</h1><p>تاريخ الطباعة: ${fbFmtDate(new Date().toISOString())} م — ${fbFmtHijri(new Date().toISOString())} هـ</p>
  <table><thead><tr><th>م</th><th>الفترة</th><th>مدة الاجتماع</th><th>المعلم</th><th>المادة</th><th>الحالة</th><th>تاريخ التوقيع</th><th>التوقيع</th></tr></thead><tbody>
  ${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r.p.n}</td><td>${r.p.start} إلى ${r.p.end}</td><td>${esc(r.t.name)}</td><td>${esc(r.t.subject)}</td><td>${r.s ? 'وقّع' : 'لم يوقّع'}</td>
  <td>${r.s ? fbFmtDate(r.s.signed_at) + ' — ' + fbFmtHijri(r.s.signed_at) + ' هـ — ' + fbFmtTime(r.s.signed_at) : '—'}</td>
  <td>${r.s ? (r.s.signature ? `<img src="${r.s.signature}">` : 'إقرار إلكتروني') : '—'}</td></tr>`).join('')}
  </tbody></table><div class="sig"><span>مشرف/مدير المدرسة: ....................</span><span>التوقيع: ....................</span></div></body></html>`;
  const f = document.createElement('iframe');
  f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
  document.body.appendChild(f);
  f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
  setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { alert('تعذرت الطباعة'); } setTimeout(() => f.remove(), 60000); }, 400);
}
function fbPadInit() {
  const c = document.getElementById('sigPad'); if (!c) return;
  const ctx = c.getContext('2d'); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.strokeStyle = '#111';
  window.__sigDirty = false; let drawing = false;
  const pos = e => { const r = c.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return [(t.clientX - r.left) * c.width / r.width, (t.clientY - r.top) * c.height / r.height]; };
  const start = e => { e.preventDefault(); drawing = true; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); };
  const move = e => { if (!drawing) return; e.preventDefault(); const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); window.__sigDirty = true; };
  const end = () => { drawing = false; };
  c.addEventListener('mousedown', start); c.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  c.addEventListener('touchstart', start, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', end);
}
function clearSigPad() { const c = document.getElementById('sigPad'); if (c) { c.getContext('2d').clearRect(0, 0, c.width, c.height); window.__sigDirty = false; } }
async function feedbackPage() {
  const st = await api('feedback-status');
  const log = await api('feedback-log');
  window.__fbLog = log;
  const printBtn = '<button class="ghost" onclick="printFeedbackLog()">🖨️ طباعة / حفظ PDF</button>';
  if (role === 'teacher') {
    setTimeout(fbPadInit, 0);
    return `<div class="page-head"><h2>📋 التغذية الراجعة</h2></div>
    <div class="panel" style="border-color:${st.signed ? 'var(--line-soft)' : '#e7c26f'}">
      <h3>اجتماع كل أسبوعين — ${esc(st.periodLabel)}</h3>
      ${st.signed
        ? `<p class="pill green" style="display:inline-block;margin-top:8px">✅ تم التوقيع بتاريخ ${fbFmtDate(st.signedAt)} — ${fbFmtTime(st.signedAt)}</p>`
        : `<p class="muted" style="margin:8px 0">وقّع بإصبعك أو بالفأرة داخل المربع ثم اضغط "اعتماد التوقيع"، ليظهر لدى المشرف في سجل الاجتماعات.</p>
        <canvas id="sigPad" width="500" height="160" style="width:100%;max-width:500px;height:160px;background:#fff;border:2px dashed #999;border-radius:10px;touch-action:none;display:block"></canvas>
        <div style="display:flex;gap:8px;margin-top:8px"><button class="primary" onclick="signFeedback()">اعتماد التوقيع</button><button class="ghost" onclick="clearSigPad()">مسح</button></div>`}
    </div>
    <div class="panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><h3>سجل الاجتماعات</h3>${printBtn}</div>${fbLogTable(log, false)}</div>`;
  }
  const signedCount = st.teachers.filter(t => t.signed).length;
  return `<div class="page-head"><div><h2>📋 التغذية الراجعة — المعلمون</h2><p class="muted">${esc(st.periodLabel)}</p></div><span class="pill ${signedCount === st.teachers.length && st.teachers.length ? 'green' : 'yellow'}">${signedCount} / ${st.teachers.length} وقّعوا</span></div>
  <div class="panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><h3>سجل الاجتماعات (كل الفترات)</h3>${printBtn}</div>${fbLogTable(log, true)}</div>`;
}
async function signFeedback() {
  if (!window.__sigDirty) { alert('ارسم توقيعك داخل المربع أولًا.'); return; }
  try {
    const signature = document.getElementById('sigPad').toDataURL('image/png');
    await api('feedback-sign', { method: 'POST', body: { signature } });
    alert('تم اعتماد توقيعك بنجاح.'); render();
  } catch (e) { alert(e.message); }
}
async function unsignFeedback(username, period) {
  if (!confirm('إلغاء هذا التوقيع؟')) return;
  try { await api('feedback-unsign', { method: 'POST', body: { username, period } }); render(); }
  catch (e) { alert(e.message); }
}

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
    ? [['home', 'الرئيسية'], ['students', 'إدارة الطلاب'], ['teachers', 'المعلمون'], ['feedback', '📋 التغذية الراجعة'], ['curriculum', 'توزيع المنهج'], ['questions', 'بنك الأسئلة'], ['objectives', '🎯 الأهداف التعليمية'], ['paper', '📝 الاختبار المحاكي'], ['scan', '📷 مسح الأوراق'], ['reports', 'التقارير'], ['settings', 'إعدادات الاختبارات']]
    : role === 'teacher'
    ? [['home', 'الرئيسية'], ['students', 'طلاب الفصول'], ['proxy', 'فتح اختبار الطالب'], ['questions', 'الاختبارات'], ['objectives', '🎯 أهداف مادتي'], ['paper', '📝 الاختبار المحاكي'], ['feedback', '📋 التغذية الراجعة'], ['reports', 'تقارير الطلاب']]
    : [['home', 'الرئيسية'], ['tests', 'اختباراتي'], ['bank', 'بنك أسئلتي'], ['results', 'نتائجي']];
  $('#nav').innerHTML = items.map(x => `<button data-p="${x[0]}">${x[1]}</button>`).join('');
  $('#nav').querySelectorAll('button').forEach(b => b.onclick = () => { stopScanner(); page = b.dataset.p; selectedSubject = null; catchupTargetWeek = null; render(); });
  await render();
}

let renderSeq = 0;
async function render() {
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.p === page));
  const mySeq = ++renderSeq;
  $('#page').innerHTML = `<div class="panel" style="text-align:center;color:var(--muted)">...جارٍ التحميل</div>`;
  const fns = { home, students, teachers, curriculum: curriculumPage, questions: questionsPage, reports, settings, tests, results, proxy, bank: myQuestionBank, weeks: studentWeeksPage, deleted: deletedStudentsPage, paper: paperExamPage, scan: scanPage, objectives: objectivesPage, feedback: feedbackPage };
  const fn = fns[page] || home;
  let html;
  try { html = await fn(); }
  catch (e) { html = `<div class="panel"><p class="muted">تعذر تحميل الصفحة: ${esc(e.message)}</p></div>`; }
  if (mySeq !== renderSeq) return; // وصلت استجابة قديمة بعد تنقّل أحدث؛ تجاهلها
  $('#page').innerHTML = html;
}

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function escQ(s) { return esc(s).replace(/\n/g, '<br>'); } // لعرض نص السؤال مع الحفاظ على فواصل الأسطر (مثل نصوص القراءة الطويلة)

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
    const paperPanel = r.isPaperWeek ? `<div class="panel" style="border-color:#e7c26f;background:#fdf6e8"><h3>📝 تنبيه: اختبار هذا الأسبوع محاكٍ (ورقي)</h3><p>اختبار الأسبوع ${r.paperExamWeek} هذا العام سيكون <b>اختبارًا محاكيًا</b> يُجرى في المدرسة حضوريًا على الورق، ولن يتوفر اختبار إلكتروني على المنصة هذا الأسبوع. ستظهر نتيجتك هنا والأسئلة في "بنك أسئلتي" فور تصحيح معلمك لها.</p></div>` : '';
    const studentObjItems = subjectsOfGrade(user.grade).flatMap(sub => (OBJECTIVES[user.grade] || {})[sub] || []);
    return `<div class="page-head"><div><h2>مرحبًا ${esc(user.name)}</h2><p class="muted">نتابع تقدمك خطوة بخطوة نحو إتقان المهارات.</p></div><span class="pill blue">الصف ${user.grade}</span></div>
    ${objectivesMarquee(studentObjItems)}
    <div class="cards"><div class="stat">المحلول<b>${r.total}</b></div><div class="stat">الهدف<b>80</b></div><div class="stat">المتبقي<b>${Math.max(0, 80 - r.total)}</b></div><div class="stat">حالة اختبار الأسبوع<b>${statusIcon}</b></div></div>
    ${paperPanel}
    ${missedPanel}
    <div class="panel"><h3>الاختبارات</h3><p>الاختبار يُفتح تلقائيًا يومي <b>${r.examDayNames}</b> من كل أسبوع وفق توزيع المنهج، دون اعتماد من المعلم ولا تنبيهات. ${done ? 'أنجزت اختبار هذا الأسبوع بالفعل — شاهد نتيجتك.' : r.isPaperWeek ? 'اختبار هذا الأسبوع محاكٍ (ورقي) — راجع التنبيه أعلاه.' : r.isExamDay ? 'اختبار اليوم متاح الآن.' : 'ترقّب أقرب يوم اختبار.'}</p><button class="primary" onclick="page='tests';render()">فتح الاختبارات</button></div>`;
  }
  // معلم / مشرف
  const ov = await api('students-overview');
  const list = ov.students;
  const n = list.length;
  const totalAnswers = list.reduce((s, x) => s + x.total, 0);
  const totalWrong = list.reduce((s, x) => s + x.wrong, 0);
  const struggling = list.filter(x => x.status === 'struggling');
  const notStarted = list.filter(x => x.status === 'not_started');
  const staffObjItems = role === 'teacher'
    ? ((OBJECTIVES[user.grade] || {})[user.subject] || [])
    : [...(OBJECTIVES[3]['لغتي'].slice(0, 1)), ...(OBJECTIVES[3]['رياضيات'].slice(0, 1)), ...(OBJECTIVES[6]['لغتي'].slice(0, 1)), ...(OBJECTIVES[6]['رياضيات'].slice(0, 1)), ...(OBJECTIVES[6]['علوم'].slice(0, 1))];
  return `<div class="page-head"><h2>لوحة المتابعة</h2><span class="pill green">${role === 'teacher' ? 'فصولك المسندة' : 'تلقائي حسب الخطة'}</span></div>
  ${objectivesMarquee(staffObjItems)}
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
function classBadges(classesStr) {
  const classes = String(classesStr || '').split(/[,،]+/).map(x => x.trim()).filter(Boolean);
  if (!classes.length) return '<span class="muted">—</span>';
  return classes.map(c => `<span class="pill" style="background:var(--brand-bg,#eef6f5);color:var(--brand,#0b5d67);margin-inline-end:4px;display:inline-block">${esc(c)}</span>`).join('');
}
async function teachers() {
  const data = await api('teachers');
  window.__teachersCache = data.teachers;
  return `<div class="page-head"><h2>المعلمون</h2><button class="primary" onclick="addTeacher()">+ إضافة معلم</button></div><div class="panel"><p class="muted">يمكن للمشرف تحديد المادة والصف والفصول وكلمة المرور. هذه بيانات دخول المعلم للمنصة.</p><table><thead><tr><th>المعلم</th><th>اسم المستخدم</th><th>المادة</th><th>الصف</th><th>الفصول المسندة</th><th>إجراء</th></tr></thead><tbody>${data.teachers.map(t => `<tr><td>${esc(t.name)}</td><td>${esc(t.username)}</td><td>${esc(t.subject)}</td><td>${t.grade}</td><td>${classBadges(t.classes)}</td><td><div class="actions" style="margin:0"><button onclick="editTeacher('${esc(t.username)}')">تعديل / تغيير كلمة المرور</button><button class="danger" onclick="delTeacher('${esc(t.username)}')">حذف</button></div></td></tr>`).join('') || '<tr><td colspan="6">لا يوجد معلمون.</td></tr>'}</tbody></table></div>`;
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
    <h3>${showAddQuestionForm ? '➖ إغلاق النموذج' : '+ إضافة سؤال جديد'} <button class="small-btn" onclick="showAddQuestionForm=!showAddQuestionForm;render()">${showAddQuestionForm ? 'إغلاق' : 'إضافة سؤال'}</button> <button class="small-btn" onclick="importQuestionsFlow()">📥 استيراد أسئلة من إكسل</button></h3>
    <p class="muted" style="margin-top:6px">ترتيب أعمدة ملف الإكسل: <b>الأسبوع، الدرس، السؤال، الخيار1، الخيار2، الخيار3، الخيار4، رقم الإجابة الصحيحة (1 إلى 4)</b></p>
    ${showAddQuestionForm ? `
    <label>الأسبوع (1 إلى 27)</label><input type="number" id="newQWeek" min="1" max="27" placeholder="مثال: 5">
    <label>الدرس / المهارة (اختياري)</label><input id="newQLesson" placeholder="مثال: الأنماط والدوال">
    <label>نص السؤال</label><input id="newQText" placeholder="اكتب نص السؤال هنا">
    <label>الخيارات الأربعة (حدد الدائرة بجانب الإجابة الصحيحة)</label>
    ${[0, 1, 2, 3].map(i => `<label class="choice"><input type="radio" name="newQCorrect" value="${i}"><input type="text" id="newQChoice${i}" placeholder="الخيار ${i + 1}" style="flex:1;border:none;background:transparent;font-family:inherit;font-size:14px;outline:none"></label>`).join('')}
    <button class="primary" style="margin-top:12px" onclick="submitNewQuestion()">حفظ السؤال</button>
    ` : ''}
  </div>` : '';
  const questionCard = q => {
    const isEditing = role === 'teacher' && editingQuestionId === q.id;
    if (isEditing) {
      return `<div class="question" style="border-color:var(--brand,#0b5d67)"><b>تعديل السؤال — الصف ${q.grade} — ${esc(q.subject)}</b>
      <label>الأسبوع</label><input type="number" id="editQWeek" min="1" max="27" value="${q.week}">
      <label>الدرس / المهارة</label><input id="editQLesson" value="${esc(q.lesson || '')}">
      <label>نص السؤال</label><textarea id="editQText" rows="4" style="width:100%;font-family:inherit;font-size:14px;padding:10px;border-radius:9px;border:1.5px solid var(--line)">${esc(q.question)}</textarea>
      <label>الخيارات (حدد الإجابة الصحيحة)</label>
      ${q.choices.map((c, i) => `<label class="choice"><input type="radio" name="editQCorrect" value="${i}" ${i === q.answerIndex ? 'checked' : ''}><input type="text" id="editQChoice${i}" value="${esc(c)}" style="flex:1;border:none;background:transparent;font-family:inherit;font-size:14px;outline:none"></label>`).join('')}
      <div class="actions" style="margin-top:10px"><button class="primary" onclick="submitEditQuestion(${q.id})">حفظ التعديل</button><button onclick="editingQuestionId=null;render()">إلغاء</button></div>
      </div>`;
    }
    return `<div class="question"><b>الصف ${q.grade} — ${esc(q.subject)} — الأسبوع ${q.week}</b><p>${escQ(q.question)}</p><small>${esc(q.lesson || '')}</small>
    ${role === 'teacher' ? `<div class="actions" style="margin-top:8px"><button class="small-btn" onclick="editingQuestionId=${q.id};render()">✏️ تعديل</button><button class="small-btn danger" onclick="deleteQuestionFlow(${q.id})">🗑️ حذف</button></div>` : ''}
    </div>`;
  };
  return `<div class="page-head"><h2>بنك الأسئلة</h2><span class="pill blue">${role === 'teacher' ? `الصف ${user.grade} — ${esc(user.subject)}` : 'الصف الثالث والسادس'}</span></div>
  ${addForm}
  <div class="panel">${list.map(questionCard).join('') || '<p class="muted">لا توجد أسئلة مطابقة بعد.</p>'}</div>`;
}
let editingQuestionId = null;
async function submitEditQuestion(id) {
  const week = +($('#editQWeek').value);
  const lesson = $('#editQLesson').value.trim();
  const question = $('#editQText').value.trim();
  const choices = [0, 1, 2, 3].map(i => $('#editQChoice' + i).value.trim());
  const correctRadio = document.querySelector('input[name=editQCorrect]:checked');
  if (!week || week < 1 || week > 27) return alert('حدد رقم أسبوع صحيح بين 1 و27.');
  if (!question) return alert('اكتب نص السؤال.');
  if (choices.some(c => !c)) return alert('يجب تعبئة الخيارات الأربعة كلها.');
  if (!correctRadio) return alert('حدد الإجابة الصحيحة بالضغط على الدائرة بجانبها.');
  try {
    await api('questions/' + id, { method: 'PUT', body: { week, lesson, question, choices, answerIndex: +correctRadio.value } });
    editingQuestionId = null; render();
  } catch (e) { alert(e.message); }
}
async function deleteQuestionFlow(id) {
  if (!confirm('حذف هذا السؤال نهائيًا من بنك الأسئلة؟')) return;
  try { await api('questions/' + id, { method: 'DELETE' }); render(); }
  catch (e) { alert(e.message); }
}
async function submitNewQuestion() {
  const week = +($('#newQWeek').value);
  const lesson = $('#newQLesson').value.trim();
  const question = $('#newQText').value.trim();
  const choices = [0, 1, 2, 3].map(i => $('#newQChoice' + i).value.trim());
  const correctRadio = document.querySelector('input[name=newQCorrect]:checked');
  if (!week || week < 1 || week > 27) return alert('حدد رقم أسبوع صحيح بين 1 و27.');
  if (!question) return alert('اكتب نص السؤال.');
  if (choices.some(c => !c)) return alert('يجب تعبئة الخيارات الأربعة كلها.');
  if (!correctRadio) return alert('حدد الإجابة الصحيحة بالضغط على الدائرة بجانبها.');
  try {
    await api('questions', { method: 'POST', body: { week, lesson, question, choices, answerIndex: +correctRadio.value } });
    alert('تمت إضافة السؤال إلى بنك الأسئلة بنجاح.');
    showAddQuestionForm = false; render();
  } catch (e) { alert(e.message); }
}
// ---------- استيراد أسئلة بالجملة من إكسل (المعلم) ----------
function importQuestionsFlow() {
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
      const looksLikeHeader = header.some(h => /أسبوع|week|سؤال|question/i.test(h));
      if (looksLikeHeader) startRow = 1;
      const parsed = [];
      for (let i = startRow; i < rows.length; i++) {
        const row = rows[i]; if (!row || !row.length) continue;
        const week = Number(row[0]);
        const lesson = String(row[1] ?? '').trim();
        const question = String(row[2] ?? '').trim();
        const choices = [row[3], row[4], row[5], row[6]].map(c => String(c ?? '').trim()).filter(Boolean);
        const answerNum = Number(row[7]); // 1 إلى 4 في الملف
        const answerIndex = Number.isInteger(answerNum) ? answerNum - 1 : NaN;
        if (question) parsed.push({ week, lesson, question, choices, answerIndex });
      }
      if (!parsed.length) return alert('لم يتم العثور على بيانات صالحة. تأكدي من ترتيب الأعمدة: الأسبوع، الدرس، السؤال، الخيار1، الخيار2، الخيار3، الخيار4، رقم الإجابة الصحيحة.');
      const res = await api('questions/import-excel', { method: 'POST', body: { rows: parsed } });
      alert(`تم استيراد ${res.added} سؤالًا بنجاح.${res.skippedCount ? `\nتم تجاهل ${res.skippedCount} صفًا لخلل في البيانات:\n` + res.skipped.map(s => `الصف ${s.row}: ${s.reason}`).join('\n') : ''}`);
      showAddQuestionForm = false; render();
    } catch (e) { alert('تعذرت قراءة الملف: ' + e.message); }
  };
  input.click();
}

// ---------- اختبار الطالب (نفسه) ----------
async function tests() {
  let params = [];
  if (catchupTargetWeek) params.push('week=' + catchupTargetWeek);
  if (selectedSubject) params.push('subject=' + encodeURIComponent(selectedSubject));
  const path = 'week-test' + (params.length ? '?' + params.join('&') : '');
  let r;
  try { r = await api(path); } catch (e) { catchupTargetWeek = null; selectedSubject = null; return `<div class="panel"><p class="muted">${esc(e.message)}</p><button onclick="page='home';render()">رجوع للرئيسية</button></div>`; }

  // أسبوع الاختبار المحاكي: لا يوجد اختبار إلكتروني هذا الأسبوع
  if (r.isPaperWeek && !r.completed) {
    catchupTargetWeek = null; selectedSubject = null;
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week}</p></div><span class="pill yellow">📝 اختبار محاكٍ</span></div>
    <div class="panel" style="border-color:#e7c26f;background:#fdf6e8"><h3>📝 اختبار هذا الأسبوع محاكٍ، وليس إلكترونيًا</h3><p>سيُجري معلمك اختبارًا محاكيًا في المدرسة هذا الأسبوع. لا حاجة لفتح اختبار هنا — بعد أن يصحّح معلمك ورقتك، ستظهر نتيجتك ومراجعة الأسئلة هنا تلقائيًا وفي "بنك أسئلتي".</p></div>`;
  }
  if (r.isPaperWeek && r.completed) {
    catchupTargetWeek = null; selectedSubject = null;
    return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week} — اختبار محاكٍ، تم تصحيحه.</p></div><span class="pill green">مكتمل</span></div>
    <div class="panel"><h3>نتيجتك في الاختبار المحاكي</h3><div class="cards"><div class="stat">الأسئلة<b>${r.result.total}</b></div><div class="stat">صحيح 🟢<b>${r.result.correct}</b></div><div class="stat">خطأ 🔴<b>${r.result.wrong}</b></div><div class="stat">النسبة<b>${r.result.pct}%</b></div></div><p style="font-size:16px;font-weight:800;color:var(--teal);margin-top:6px">${r.result.message}</p><p class="muted" style="margin-top:10px">يمكنك مراجعة كل سؤال والإجابة الصحيحة من "بنك أسئلتي".</p></div>`;
  }

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
  return `<div class="page-head"><div><h2>اختباراتي</h2><p class="muted">اختبار الأسبوع ${r.week}${r.subject ? ' — ' + esc(r.subject) : ''}${r.isCatchup ? ' (استكمال أسبوع فائت)' : ''}${r.manualOpen ? ' — فُتح اليوم استثنائيًا من المشرف' : ''} — أجب عن جميع الأسئلة ثم أرسل الإجابات.</p></div><span class="pill green">${r.isCatchup ? 'استكمال بإذن معلمك' : r.manualOpen ? '🔓 فتح استثنائي' : 'يظهر تلقائيًا'}</span></div><div class="panel"><h3>اختبار الأسبوع</h3>${r.questions.map((q, i) => `<div class="question"><b>${i + 1}. ${escQ(q.question)}</b><div class="muted" style="margin-top:5px;font-weight:600">${esc(q.subject)}</div>${q.choices.map((c, j) => `<label class="choice"><input type="radio" name="q_${q.id}" value="${j}"><span>${esc(c)}</span></label>`).join('')}</div>`).join('')}<div class="actions"><button class="primary" onclick="submitTest()">إرسال الإجابات</button>${backBtn}</div></div>`;
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
          html += `<div class="question"><b>${escQ(q.question)}</b><p class="muted" style="margin-top:6px">🟡 لم تُحل بعد</p></div>`;
        } else {
          const statusLine = q.correct ? '<p style="color:var(--green);font-weight:700;margin-top:6px">🟢 إجابتك صحيحة</p>' : '<p style="color:var(--red);font-weight:700;margin-top:6px">🔴 إجابتك خاطئة</p>';
          html += `<div class="question"><b>${escQ(q.question)}</b>${statusLine}${q.choices.map((c, j) => {
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
function startProxy(id) { if (role !== 'teacher' && role !== 'supervisor') return; proxyStudentId = id; proxyTargetWeek = null; selectedSubject = null; page = 'proxy'; render(); }
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
  <div class="panel"><h3>اختبار الأسبوع ${r.week}${r.subject ? ' — ' + esc(r.subject) : ''}</h3>${r.questions.map((q, i) => `<div class="question"><b>${i + 1}. ${escQ(q.question)}</b><div class="muted" style="margin-top:5px">${esc(q.subject)} — الأسبوع ${q.week} — ${esc(q.lesson || '')}</div>${q.choices.map((c, j) => `<label class="choice"><input type="radio" name="pq_${q.id}" value="${j}"><span>${esc(c)}</span></label>`).join('')}</div>`).join('')}<div class="actions"><button class="primary" onclick="submitProxyTest()">حفظ إجابات الطالب</button><button onclick="proxyStudentId=null;proxyTargetWeek=null;selectedSubject=null;page='students';render()">إلغاء</button>${backBtn}</div></div>`;
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

function whatsappConcernLink(phone, studentName) {
  const msg = `السلام عليكم، نأمل من الله ثم منكم متابعة الطالب/ة ${studentName} بخصوص أداء اختبارات نواتج التعلم الأسبوعية. نرجو المتابعة والمراجعة معه/ا في المنزل، ونحن جاهزون لأي دعم إضافي يلزم. شكرًا لتعاونكم.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
function studentActionButtons(s, showActions) {
  if (!showActions) return '—';
  const canProxy = role === 'teacher' || role === 'supervisor';
  const parts = [];
  if (canProxy) parts.push(`<button class="small-btn" onclick="startProxy('${esc(s.id)}')">👤 دخول الطالب من حساب المعلم</button>`);
  if (s.phone) {
    parts.push(`<a href="${whatsappLink(s.phone, s.name)}" target="_blank" rel="noopener" class="small-btn" style="display:inline-block;text-decoration:none;border:1.5px solid var(--line);border-radius:9px;padding:6px 12px;color:var(--ink)">📱 رسالة واتساب لولي الأمر</a>`);
    parts.push(`<a href="${whatsappConcernLink(s.phone, s.name)}" target="_blank" rel="noopener" class="small-btn" style="display:inline-block;text-decoration:none;border:1.5px solid var(--red);border-radius:9px;padding:6px 12px;color:var(--red)">🔔 إشعار ولي الأمر</a>`);
  } else {
    parts.push('<span class="muted" style="font-size:12px">لا يوجد جوال مسجَّل</span>');
  }
  return `<div class="actions" style="margin:0;flex-wrap:wrap">${parts.join('')}</div>`;
}
let reportsCategory = 'struggling'; // الفئة المختارة حاليًا في قائمة التقارير المنسدلة
function changeReportsCategory(val) { reportsCategory = val; render(); }
async function reports() {
  const ov = await api('students-overview');
  const list = ov.students;
  let stats = null;
  try { stats = await api('reports-stats'); } catch {}
  let wrongRows = [];
  try { wrongRows = (await api('wrong-answers')).rows; } catch {}
  const wrongPanel = `<div class="panel"><h3>❌ الإجابات الخاطئة بالتفصيل (آخر ${wrongRows.length})</h3><p class="muted">اسم الطالب، نص السؤال، والمهارة التي أخفق فيها — لمتابعة نقاط الضعف الدقيقة لكل طالب.</p>
  ${wrongRows.length ? `<table><thead><tr><th>الطالب</th><th>الصف/الفصل</th><th>المادة</th><th>الأسبوع</th><th>السؤال</th><th>المهارة</th><th>إجابته</th><th>الصحيحة</th></tr></thead><tbody>
  ${wrongRows.map(r => `<tr><td>${esc(r.studentName)}</td><td>${r.grade}/${esc(r.class)}</td><td>${esc(r.subject)}</td><td>${r.week}</td><td style="max-width:260px">${esc(r.question)}</td><td>${r.skill ? esc(r.skill) : '<span class="muted">—</span>'}</td><td style="color:var(--red)">${esc(r.chosenText ?? '—')}</td><td style="color:var(--teal)">${esc(r.correctText ?? '—')}</td></tr>`).join('')}
  </tbody></table>` : '<p class="muted">لا توجد إجابات خاطئة مسجَّلة حتى الآن.</p>'}</div>`;
  const weekChart = stats && stats.weeks && stats.weeks.length ? `<div class="panel"><h3>نسبة الإتقان عبر الأسابيع${role === 'teacher' ? ' (فصولك)' : ''}</h3>${changeBadge(stats.change)}<div style="margin-top:14px">${barChart(stats.weeks.map(w => ({ label: 'أسبوع ' + w.week, value: w.pct })))}</div></div>` : '';
  const subjectChart = stats && stats.bySubject && stats.bySubject.length ? `<div class="panel"><h3>مقارنة الأداء بين المواد</h3><div style="margin-top:14px">${barChart(stats.bySubject.map(s => ({ label: s.subject, value: s.pct })))}</div></div>` : '';
  const insights = stats ? generateInsights(stats, list) : [];
  const teacherContext = role === 'teacher' ? `<div class="panel" style="background:#eef6f5;border-color:var(--brand,#0b5d67)"><h3>📋 نطاقك التدريسي</h3><p style="margin-top:8px">الصف: <b>${user.grade}</b> &nbsp;|&nbsp; الفصول المسندة: ${classBadges(user.classes)} &nbsp;|&nbsp; المادة: <b>${esc(user.subject)}</b></p></div>` : '';
  const insightsPanel = `<div class="panel" style="background:linear-gradient(135deg,#f4f1ff,#eef6ff);border-color:#c9b8f0"><h3>🧠 قياس الأثر — تحليل تلقائي</h3>${role === 'teacher' ? `<p class="muted" style="margin:6px 0 0">التحليل التالي خاص بالصف ${user.grade} — الفصول ${esc(user.classes)} — مادة ${esc(user.subject)}</p>` : ''}<ul style="margin:10px 0 0;padding-inline-start:22px;line-height:2.1">${insights.map(l => `<li>${l}</li>`).join('')}</ul></div>`;

  const groups = {
    ok: { title: 'الطلاب المتقنون', icon: '🟢', students: list.filter(s => s.status === 'ok'), showActions: false },
    struggling: { title: 'الطلاب المخفقون', icon: '🔴', students: list.filter(s => s.status === 'struggling'), showActions: true },
    not_started: { title: 'الطلاب الذين لم يحلّوا', icon: '🟡', students: list.filter(s => s.status === 'not_started'), showActions: true },
  };
  const g = groups[reportsCategory] || groups.struggling;
  function groupByClass(students) {
    const map = {};
    const order = [];
    students.forEach(s => {
      const key = `${s.grade}|${s.class}`;
      if (!map[key]) { map[key] = []; order.push(key); }
      map[key].push(s);
    });
    order.sort((a, b) => a.localeCompare(b, 'ar'));
    return order.map(key => { const [grade, cls] = key.split('|'); return { grade, cls, students: map[key] }; });
  }
  const classGroups = groupByClass(g.students);
  const catTable = `<div class="panel"><h3>${g.icon} ${g.title} (${g.students.length})</h3>
  ${classGroups.length ? classGroups.map(cg => `
    <div style="margin-top:16px"><div class="pill blue" style="display:inline-block;margin-bottom:8px">الصف ${esc(cg.grade)} — الفصل ${esc(cg.cls)} (${cg.students.length})</div>
    <table><thead><tr><th>الطالب</th><th>حل</th><th>صحيح</th><th>خطأ</th>${g.showActions ? '<th>إجراءات المعلم/المشرف (اختر ما يناسب — واحد أو أكثر)</th>' : ''}</tr></thead><tbody>
    ${cg.students.map(s => `<tr><td>${esc(s.name)}</td><td>${s.total}</td><td>${s.correct}</td><td>${s.wrong}</td>${g.showActions ? `<td>${studentActionButtons(s, true)}</td>` : ''}</tr>`).join('')}
    </tbody></table></div>`).join('') : '<p class="muted">لا يوجد طلاب في هذه الفئة حاليًا.</p>'}</div>`;

  const categorySelector = `<div class="panel"><label>عرض قائمة:</label>
  <select onchange="changeReportsCategory(this.value)">
    <option value="struggling" ${reportsCategory === 'struggling' ? 'selected' : ''}>🔴 المخفقون (${groups.struggling.students.length})</option>
    <option value="ok" ${reportsCategory === 'ok' ? 'selected' : ''}>🟢 المتقنون (${groups.ok.students.length})</option>
    <option value="not_started" ${reportsCategory === 'not_started' ? 'selected' : ''}>🟡 الذين لم يحلّوا (${groups.not_started.students.length})</option>
  </select></div>`;

  return `<div class="page-head"><div><h2>التقارير</h2><p class="muted">${role === 'teacher' ? 'تقارير طلاب فصولك المسندة فقط. ' : ''}يظهر هنا أيضًا إذا كانت الإجابة من الطالب أو نيابةً عنه بواسطة المعلم أو المشرف.</p></div><button onclick="window.print()">طباعة / PDF</button></div>
  ${teacherContext}
  ${insightsPanel}
  ${weekChart}
  ${subjectChart}
  ${categorySelector}
  ${catTable}
  ${wrongPanel}
  <div class="panel"><h3>كل الطلاب</h3><table><thead><tr><th>الطالب</th><th>الصف</th><th>الفصل</th><th>الحالة</th><th>حل</th><th>صحيح</th><th>خطأ</th><th>طريقة الحل</th></tr></thead><tbody>${list.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${s.status === 'not_started' ? '<span class="pill yellow">🟡 لم يشارك</span>' : s.status === 'struggling' ? '<span class="pill" style="background:var(--red-bg);color:var(--red)">🔴 مخفق</span>' : '<span class="pill green">🟢 متقن</span>'}</td><td>${s.total}</td><td>${s.correct}</td><td>${s.wrong}</td><td>${s.proxyCount ? `<span class="pill yellow">${s.proxyCount} من جلسة حساب المعلم/المشرف</span>` : '<span class="pill green">من حساب الطالب</span>'}</td></tr>`).join('') || '<tr><td colspan="8">لا يوجد طلاب.</td></tr>'}</tbody></table></div>`;
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
  <div class="panel"><h3>بداية الفصل الدراسي</h3><label>تاريخ بداية الفصل (لحساب أسبوع المنهج الحالي)</label><input type="date" id="semStart" value="${s.semesterStart}" onchange="updateSemesterStart()"><p class="muted" style="margin-top:8px">الأسبوع الحالي وفق هذا التاريخ: <b>${s.currentWeek}</b> من 27 (17 أسبوعًا للفصل الأول + 10 أسابيع للفصل الثاني حتى تطبيق الاختبارات).</p></div>
  <div class="panel" style="border-color:${s.manualOpenWeek ? '#e7c26f' : 'var(--line-soft)'}"><h3>🔓 فتح استثنائي (عطلة أو ظرف طارئ)</h3><p class="muted">استخدم هذا فقط إذا صادف يوم الاختبار المعتاد إجازة رسمية، لفتح اختبار الأسبوع الحالي (${s.currentWeek}) لجميع الطلاب اليوم بشكل استثنائي، دون تعديل الجدول التلقائي.</p>
  ${s.manualOpenWeek ? `<p style="font-weight:800;color:var(--yellow)">مُفعَّل الآن للأسبوع ${s.manualOpenWeek}</p><button class="danger" onclick="clearManualOpen()">إلغاء الفتح الاستثنائي</button>` : `<button class="primary" onclick="setManualOpen(${s.currentWeek})">فتح اختبار الأسبوع ${s.currentWeek} اليوم استثنائيًا</button>`}</div>
  <div class="panel"><h3>📚 طريقة فتح المواد</h3><p class="muted">مجتمعة: كل مواد الطالب (لغتي/رياضيات/علوم) تظهر معًا في اختبار واحد بجلسة واحدة (الطريقة الحالية). منفصلة: كل مادة تفتح وتُنجز على حدة، ويمكن للطالب إكمالها بأوقات مختلفة.</p>
  <div class="tabs" style="max-width:360px"><button class="tab ${!s.subjectsSeparate ? 'active' : ''}" onclick="setSubjectsMode(false)">مجتمعة (الحالية)</button><button class="tab ${s.subjectsSeparate ? 'active' : ''}" onclick="setSubjectsMode(true)">منفصلة (كل مادة لوحدها)</button></div></div>
  <div class="panel" style="border-color:${s.paperExamActive ? '#e7c26f' : 'var(--line-soft)'}"><h3>📝 الاختبار المحاكي</h3><p class="muted">حدّد أسبوعًا يصبح فيه اختبار الطلاب محاكيًا (حضوريًا في المدرسة) بدلاً من الإلكتروني. يظهر تنبيه تلقائي للطلاب عند الدخول في ذلك الأسبوع، ولا يُفتح لهم اختبار إلكتروني إطلاقًا. أدخل النتائج بعد التصحيح من صفحة "الاختبار المحاكي" في القائمة.</p>
  <div class="grid2"><div><label>رقم الأسبوع</label><input type="number" id="paperWeek" min="1" max="27" value="${s.paperExamWeek || ''}" placeholder="مثال: 10"></div><div><label>الحالة</label><div class="tabs"><button class="tab ${s.paperExamActive ? 'active' : ''}" onclick="setPaperExamActive(true)">مُفعَّل</button><button class="tab ${!s.paperExamActive ? 'active' : ''}" onclick="setPaperExamActive(false)">مُعطَّل</button></div></div></div>
  <button class="primary" style="margin-top:10px" onclick="savePaperExamWeek()">حفظ رقم الأسبوع</button></div>
  <div class="panel"><h3>بيانات دخول المشرف</h3><p class="muted">اسم المستخدم الحالي: <b>${esc(s.supervisorUsername)}</b></p><button onclick="changeSupervisorPass()">تغيير اسم المستخدم/كلمة المرور</button></div>`;
}
async function savePaperExamWeek() {
  const v = $('#paperWeek').value;
  try { await api('settings', { method: 'PUT', body: { paperExamWeek: v ? Number(v) : null } }); alert('تم الحفظ.'); render(); }
  catch (e) { alert(e.message); }
}
async function setPaperExamActive(v) {
  try { await api('settings', { method: 'PUT', body: { paperExamActive: v } }); render(); }
  catch (e) { alert(e.message); }
}

// ---------- الاختبار المحاكي: متابعة التصحيح واستيراد النتائج ----------
async function paperExamPage() {
  const st = await api('paper-exam/status');
  if (!st.week) {
    return `<div class="page-head"><h2>📝 الاختبار المحاكي</h2></div><div class="panel"><p class="muted">لم يُحدَّد بعد أسبوع الاختبار المحاكي. ${role === 'supervisor' ? 'اذهب إلى "إعدادات الاختبارات" لتحديد رقم الأسبوع وتفعيله.' : 'اطلب من المشرف تحديد الأسبوع من الإعدادات.'}</p></div>`;
  }
  const list = st.students;
  const graded = list.filter(s => s.graded);
  const notGraded = list.filter(s => !s.graded);
  const importPanel = role === 'supervisor' ? `
  <div class="panel"><h3>⬆️ استيراد نتائج مصحَّحة</h3>
  <p class="muted">الصق سطرًا لكل طالب: <b>رقم الهوية</b> ثم إجابات الأسئلة من 1 إلى 60 بالترتيب (الحروف أ/ب/ج/د)، مفصولة بفواصل أو مسافات. اترك فراغًا أو "-" للسؤال غير المجاب عنه. الأسئلة غير المستخدمة لصف الطالب (مثل أسئلة 41-60 لدى الثالث) تُتجاهل تلقائيًا.</p>
  <textarea id="paperPaste" rows="8" style="width:100%;font-family:monospace;direction:ltr;text-align:right" placeholder="1173456524, أ,ب,ج,د,أ,ب, ...(60 إجابة)
2222222222, أ,أ,ب,ج, ...(60 إجابة)"></textarea>
  <div class="actions"><button class="primary" onclick="importPaperExamFlow()">تصحيح واستيراد</button></div>
  <div id="paperImportResult"></div>
  </div>` : '';
  return `<div class="page-head"><div><h2>📝 الاختبار المحاكي</h2><p class="muted">أسبوع الاختبار: ${st.week} — تتابع هنا من صُحِّحت ورقته ومن تبقّى.</p></div><span class="pill ${notGraded.length ? 'yellow' : 'green'}">${graded.length} / ${list.length} صُحِّحت</span></div>
  <div class="panel"><h3>🖨️ طباعة الأسئلة</h3><p class="muted">تطبع أسئلة اختبار هذا الأسبوع مرتبةً بنفس أرقام ورقة الإجابة. من نافذة الطباعة اختر "حفظ كـ PDF" أو الطابعة مباشرة.</p>
  <div class="actions"><button class="primary" onclick="printPaperQuestions(3,false)">طباعة أسئلة الثالث</button><button class="primary" onclick="printPaperQuestions(6,false)">طباعة أسئلة السادس</button></div>
  <div class="actions"><button class="ghost" onclick="printPaperQuestions(3,true)">الثالث مع الإجابات (للمعلم)</button><button class="ghost" onclick="printPaperQuestions(6,true)">السادس مع الإجابات (للمعلم)</button></div></div>
  ${importPanel}
  <div class="panel"><h3>حالة التصحيح</h3><table><thead><tr><th>الاسم</th><th>الصف</th><th>الفصل</th><th>الحالة</th><th>النتيجة</th></tr></thead><tbody>
  ${list.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${s.graded ? '<span class="pill green">✓ صُحِّحت</span>' : '<span class="pill yellow">لم تُصحَّح بعد</span>'}</td><td>${s.graded ? `${s.correct}/${s.total} (${s.pct}%)` : '—'}</td></tr>`).join('') || '<tr><td colspan="5">لا يوجد طلاب.</td></tr>'}
  </tbody></table></div>`;
}
async function printPaperQuestions(grade, withKey) {
  try {
    const res = await api('paper-exam/questions');
    const qs = (res.grades && res.grades[grade]) || [];
    if (!qs.length) { alert('لا توجد أسئلة محفوظة لهذا الصف في أسبوع الاختبار المحاكي.'); return; }
    const letters = ['أ', 'ب', 'ج', 'د'];
    let lastSubject = '';
    const body = qs.map(q => {
      const head = q.subject !== lastSubject ? `<h2>${esc(q.subject)}</h2>` : ''; lastSubject = q.subject;
      return head + `<div class="q"><div class="qt"><b>${q.no}.</b> ${escQ(q.question)}</div><div class="ch">${q.choices.map((c, i) => `<span>${letters[i]}) ${esc(c)}</span>`).join('')}</div>${withKey ? `<div class="key">الإجابة: ${letters[q.answerIndex]}</div>` : ''}</div>`;
    }).join('');
    const title = `الاختبار المحاكي — ${grade === 3 ? 'الثالث' : 'السادس'} الابتدائي${withKey ? ' (نسخة المعلم مع الإجابات)' : ''}`;
    const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${title}</title>
    <style>body{font-family:Tahoma,Arial,sans-serif;margin:0;color:#111;font-size:14px}h1{font-size:18px;text-align:center;margin:0 0 4px}.sub{text-align:center;color:#444;margin-bottom:10px;font-size:12px}
    .info{display:flex;justify-content:space-between;border:1px solid #333;padding:6px 10px;margin-bottom:10px;font-size:13px}
    h2{background:#0b5d67;color:#fff;padding:5px 10px;font-size:15px;margin:14px 0 8px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .q{break-inside:avoid;margin-bottom:10px;padding-bottom:6px;border-bottom:1px dotted #aaa}.qt{line-height:1.7}.ch{display:grid;grid-template-columns:1fr 1fr;gap:3px 14px;margin-top:4px;padding-right:18px}
    .key{color:#0a7a2f;font-weight:bold;margin-top:3px;font-size:12px}@page{size:A4;margin:12mm}</style></head><body>
    <h1>مدرسة أبوداوود الابتدائية — ${title}</h1><div class="sub">أسبوع الاختبار: ${res.week} — أجب في ورقة الإجابة بتظليل الدائرة الصحيحة</div>
    <div class="info"><span>الاسم: ..........................................</span><span>الفصل: ............</span></div>${body}</body></html>`;
    const f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
    document.body.appendChild(f);
    f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
    setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { alert('تعذرت الطباعة'); } setTimeout(() => f.remove(), 60000); }, 500);
  } catch (e) { alert(e.message); }
}

function parsePaperLine(line) {
  // افصل أولاً بالفواصل، وإن لم توجد فواصل كافية افصل بالمسافات
  const byComma = line.split(/[,،]+/).map(x => x.trim()).filter(x => x !== '');
  const tokens = byComma.length > 2 ? byComma : line.trim().split(/\s+/);
  if (!tokens.length) return null;
  const studentId = tokens[0].replace(/[^\d]/g, '');
  const answers = tokens.slice(1);
  if (!studentId) return null;
  return { studentId, answers };
}
async function importPaperExamFlow() {
  const raw = $('#paperPaste').value;
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) { alert('الصق بيانات الطلاب أولاً.'); return; }
  const rows = lines.map(parsePaperLine).filter(Boolean);
  if (!rows.length) { alert('تعذّر قراءة أي سطر صالح.'); return; }
  try {
    const res = await api('paper-exam/import', { method: 'POST', body: { rows } });
    let html = `<div class="panel" style="margin-top:10px"><h3>نتيجة الاستيراد</h3><p>تم تصحيح وإدخال نتائج <b>${res.imported}</b> طالبًا.</p>`;
    if (res.summary && res.summary.length) {
      html += `<table><thead><tr><th>الاسم</th><th>الصف</th><th>الفصل</th><th>النتيجة</th></tr></thead><tbody>${res.summary.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${s.correct}/${s.total} (${s.pct}%)</td></tr>`).join('')}</tbody></table>`;
    }
    if (res.errorsCount) {
      html += `<p style="color:var(--red);font-weight:700;margin-top:8px">تعذّر إدخال ${res.errorsCount} سطر:</p><ul>${res.errors.map(e => `<li>سطر ${e.row}${e.studentId ? ' (' + esc(e.studentId) + ')' : ''}: ${esc(e.reason)}</li>`).join('')}</ul>`;
    }
    html += `</div>`;
    $('#paperImportResult').innerHTML = html;
    $('#paperPaste').value = '';
  } catch (e) { alert(e.message); }
}

// ---------- مسح أوراق الإجابة بكاميرا الجوال وتصحيحها تلقائيًا أثناء التصوير ----------
let scannerStream = null, scannerTimer = null, scannerBusy = false;
let scannerRoster = null;       // خريطة رقم الهوية -> بيانات الطالب (تُحمَّل مرة واحدة عند فتح الصفحة)
let scannerLastId = null, scannerLastAt = 0;
let scannerLog = [];            // آخر الأوراق الممسوحة في هذه الجلسة: {studentId,name,pct,total,correct,at}
const SCAN_DEBOUNCE_MS = 3000;

function stopScanner() {
  if (scannerTimer) { clearInterval(scannerTimer); scannerTimer = null; }
  if (scannerStream) { scannerStream.getTracks().forEach(t => t.stop()); scannerStream = null; }
}

async function scanPage() {
  if (role !== 'supervisor') return `<div class="panel"><p class="muted">هذه الصفحة متاحة لحساب المشرف فقط.</p></div>`;
  const st = await api('paper-exam/status');
  if (!st.week) {
    return `<div class="page-head"><h2>📷 مسح الأوراق بالكاميرا</h2></div><div class="panel"><p class="muted">حدّد أولاً أسبوع الاختبار المحاكي وفعِّله من "إعدادات الاختبارات".</p></div>`;
  }
  setTimeout(initScanner, 50); // بعد إدراج الـ HTML في الصفحة
  return `<div class="page-head"><div><h2>📷 مسح الأوراق بالكاميرا</h2><p class="muted">وجّه الكاميرا نحو ورقة الإجابة بحيث تملأ الإطار كاملاً وبإضاءة جيدة، وثبّتها لحظة — سيتم تصحيحها وحفظها تلقائيًا بمجرد التعرف على رقم الهوية بوضوح، دون أي ضغط منك. انتقل للورقة التالية مباشرة.</p></div><span class="pill blue">الأسبوع ${st.week}</span></div>
  <div class="panel" style="text-align:center">
    <div id="scanWrap" style="position:relative;max-width:420px;margin:0 auto">
      <video id="scanVideo" autoplay playsinline muted style="width:100%;aspect-ratio:540/780;object-fit:cover;border-radius:12px;border:3px solid var(--teal-bright);background:#000;display:block"></video>
      <div id="scanOverlay" style="position:absolute;inset:0;pointer-events:none;border-radius:12px;box-shadow:inset 0 0 0 2px rgba(255,255,255,.35)"></div>
      <div id="scanToast" style="position:absolute;bottom:10px;left:10px;right:10px;background:rgba(11,93,103,.92);color:#fff;border-radius:8px;padding:8px 10px;font-size:13px;font-weight:700;min-height:20px"></div>
    </div>
    <canvas id="scanCanvas" width="540" height="780" style="display:none"></canvas>
    <p class="muted" id="scanStatusLine" style="margin-top:10px">...جارٍ تشغيل الكاميرا</p>
  </div>
  <div class="panel"><h3>آخر الأوراق الممسوحة في هذه الجلسة</h3><div id="scanLogBox"><p class="muted">لم تُمسح أي ورقة بعد.</p></div></div>`;
}

async function initScanner() {
  const video = $('#scanVideo');
  if (!video) return; // غادر المستخدم الصفحة قبل اكتمال التحميل
  stopScanner();
  renderScanLog();
  try {
    const roster = await api('students');
    scannerRoster = {};
    roster.students.forEach(s => { scannerRoster[s.id] = s; });
  } catch { scannerRoster = {}; }
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 1280 } } });
  } catch (e) {
    $('#scanStatusLine').textContent = 'تعذّر الوصول إلى الكاميرا: ' + e.message + ' — تأكد من السماح للمتصفح باستخدام الكاميرا.';
    return;
  }
  video.srcObject = scannerStream;
  $('#scanStatusLine').textContent = 'جارٍ المسح التلقائي... قرّب الورقة من الكاميرا';
  scannerTimer = setInterval(scanTick, 500);
}

// رسم إطار الفيديو على الكانفاس بنفس منطق object-fit:cover (لمطابقة ما يظهر على الشاشة فعليًا)
function drawVideoCover(video, canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const vw = video.videoWidth, vh = video.videoHeight;
  if (!vw || !vh) return false;
  const targetRatio = canvas.width / canvas.height;
  const srcRatio = vw / vh;
  let sx, sy, sw, sh;
  if (srcRatio > targetRatio) { sh = vh; sw = vh * targetRatio; sx = (vw - sw) / 2; sy = 0; }
  else { sw = vw; sh = vw / targetRatio; sx = 0; sy = (vh - sh) / 2; }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  return true;
}

function sampleDarkness(data, w, h, xFrac, yFrac, rPx) {
  const cx = Math.round(xFrac * w), cy = Math.round(yFrac * h);
  let sum = 0, n = 0;
  for (let dy = -rPx; dy <= rPx; dy++) {
    for (let dx = -rPx; dx <= rPx; dx++) {
      if (dx * dx + dy * dy > rPx * rPx) continue;
      const x = cx + dx, y = cy + dy;
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const i = (y * w + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      sum += lum; n++;
    }
  }
  return n ? sum / n : 255; // 0=أسود(محبَّر) .. 255=أبيض
}
// يختار الخيار الأغمق ضمن مجموعة، بشرط فارق واضح عن بقية الخيارات وقتامة مطلقة كافية (حبر حقيقي لا ظل)
function pickFilled(lums, darkMax = 150, gapMin = 28) {
  const sorted = lums.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const [best, bestIdx] = sorted[0];
  const second = sorted[1] ? sorted[1][0] : 255;
  if (best <= darkMax && (second - best) >= gapMin) return bestIdx;
  return -1;
}

async function scanTick() {
  if (scannerBusy) return;
  const video = $('#scanVideo'), canvas = $('#scanCanvas');
  if (!video || !canvas || video.readyState < 2) return;
  scannerBusy = true;
  try {
    if (!drawVideoCover(video, canvas)) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;
    const r = Math.max(3, Math.round(w * 0.012));

    // 1) قراءة رقم الهوية (10 خانات)
    let idStr = '', idOk = true;
    for (let col = 0; col < 10; col++) {
      const lums = BUBBLE_ID_GRID[col].map(([x, y]) => sampleDarkness(data, w, h, x, y, r));
      const picked = pickFilled(lums, 150, 24);
      if (picked === -1) { idOk = false; break; }
      idStr += String(picked);
    }
    if (!idOk || idStr.length !== 10) { $('#scanStatusLine').textContent = 'جارٍ المسح... قرّب الورقة ليظهر رقم الهوية بوضوح داخل الإطار'; return; }

    const student = scannerRoster && scannerRoster[idStr];
    if (!student) { $('#scanStatusLine').textContent = `رقم الهوية ${idStr} غير مسجَّل لدى المدرسة — تحقق من محاذاة الورقة`; return; }

    const now = Date.now();
    if (idStr === scannerLastId && (now - scannerLastAt) < SCAN_DEBOUNCE_MS) {
      $('#scanStatusLine').textContent = `تم بالفعل: ${student.name} — انتقل للورقة التالية`;
      return;
    }

    // 2) قراءة إجابات الأسئلة الستين
    const letters = ['أ', 'ب', 'ج', 'د'];
    const answers = [];
    for (let q = 0; q < 60; q++) {
      const lums = BUBBLE_Q_GRID[q].map(([x, y]) => sampleDarkness(data, w, h, x, y, r));
      const picked = pickFilled(lums, 160, 22);
      answers.push(picked === -1 ? '' : letters[picked]);
    }

    scannerLastId = idStr; scannerLastAt = now;
    $('#scanStatusLine').textContent = `جارٍ حفظ ورقة: ${student.name}...`;
    try {
      const res = await api('paper-exam/import', { method: 'POST', body: { rows: [{ studentId: idStr, answers }] } });
      const s = res.summary && res.summary[0];
      if (s) {
        scannerLog.unshift({ studentId: idStr, name: s.name, grade: s.grade, class: s.class, total: s.total, correct: s.correct, pct: s.pct });
        scannerLog = scannerLog.slice(0, 40);
        renderScanLog();
        flashToast(`✅ ${s.name} — ${s.correct}/${s.total} (${s.pct}%)`);
        if (navigator.vibrate) navigator.vibrate(70);
      }
      $('#scanStatusLine').textContent = 'جارٍ المسح التلقائي... انتقل للورقة التالية';
    } catch (e) {
      $('#scanStatusLine').textContent = 'تعذّر الحفظ: ' + e.message;
    }
  } finally {
    scannerBusy = false;
  }
}
function flashToast(msg) {
  const t = $('#scanToast'); if (!t) return;
  t.textContent = msg;
  t.style.background = 'rgba(18,148,107,.95)';
  setTimeout(() => { if ($('#scanToast')) { $('#scanToast').style.background = 'rgba(11,93,103,.92)'; } }, 1800);
}
function renderScanLog() {
  const box = $('#scanLogBox'); if (!box) return;
  if (!scannerLog.length) { box.innerHTML = '<p class="muted">لم تُمسح أي ورقة بعد.</p>'; return; }
  box.innerHTML = `<table><thead><tr><th>الاسم</th><th>الصف</th><th>الفصل</th><th>النتيجة</th><th></th></tr></thead><tbody>
  ${scannerLog.map(s => `<tr><td>${esc(s.name)}</td><td>${s.grade}</td><td>${esc(s.class)}</td><td>${s.correct}/${s.total} (${s.pct}%)</td><td><button class="small-btn danger" onclick="undoScan('${esc(s.studentId)}')">تراجع</button></td></tr>`).join('')}
  </tbody></table>`;
}
async function undoScan(studentId) {
  if (!confirm('حذف نتيجة هذه الورقة لإعادة مسحها؟')) return;
  try {
    await api('paper-exam/' + encodeURIComponent(studentId), { method: 'DELETE' });
    scannerLog = scannerLog.filter(s => s.studentId !== studentId);
    renderScanLog();
    if (scannerLastId === studentId) scannerLastId = null;
  } catch (e) { alert(e.message); }
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
