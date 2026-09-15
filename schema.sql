PRAGMA foreign_keys=ON;

-- إعدادات عامة (أيام الاختبار، بداية الفصل، بيانات دخول المشرف)
CREATE TABLE IF NOT EXISTS settings(
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- الطلاب
CREATE TABLE IF NOT EXISTS students(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  grade INTEGER NOT NULL CHECK(grade IN (3,6)),
  class_name TEXT NOT NULL,
  parent_phone TEXT,
  active INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_students_grade_class ON students(grade, class_name);

-- المعلمون (password_hash بصيغة "salt_hex:hash_hex" عبر PBKDF2-SHA256)
CREATE TABLE IF NOT EXISTS teachers(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL CHECK(grade IN (3,6)),
  classes TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);

-- توزيع المنهج
CREATE TABLE IF NOT EXISTS curriculum(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grade INTEGER NOT NULL,
  subject TEXT NOT NULL,
  week INTEGER NOT NULL,
  lesson TEXT NOT NULL,
  unit TEXT,
  UNIQUE(grade,subject,week,lesson)
);

-- بنك الأسئلة (answer_index لا يُرسل أبدًا للطالب قبل التصحيح على الخادم)
CREATE TABLE IF NOT EXISTS questions(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grade INTEGER NOT NULL,
  subject TEXT NOT NULL,
  week INTEGER NOT NULL,
  lesson TEXT,
  skill TEXT,
  question TEXT NOT NULL,
  choices_json TEXT NOT NULL,
  answer_index INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_questions_lookup ON questions(grade, subject, week);

-- محاولات/إجابات الطلاب (كل صف = إجابة واحدة على سؤال ضمن اختبار أسبوع معيّن)
CREATE TABLE IF NOT EXISTS attempts(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  week INTEGER NOT NULL,
  subject TEXT,
  answer_index INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  source TEXT NOT NULL DEFAULT 'self',            -- 'self' أو 'teacher_student_session'
  teacher_username TEXT,                           -- المعلم الذي فتح الجلسة نيابة عن الطالب (إن وجد)
  reason TEXT,
  entered_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_attempts_student ON attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_attempts_student_week ON attempts(student_id, week);

-- تدخلات المعلم العلاجية (لاستخدام مستقبلي — متابعة المتعثرين بملاحظات)
CREATE TABLE IF NOT EXISTS interventions(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL,
  teacher_username TEXT,
  action TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL
);

-- جلسات الدخول (بديل تسجيل الدخول بدون كلمة مرور محليًا — كل جلسة صالحة 12 ساعة)
CREATE TABLE IF NOT EXISTS sessions(
  token TEXT PRIMARY KEY,
  role TEXT NOT NULL,               -- student | teacher | supervisor
  ref_id TEXT NOT NULL,             -- رقم هوية الطالب أو اسم مستخدم المعلم/المشرف
  name TEXT,
  grade INTEGER,
  classes TEXT,
  subject TEXT,
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

INSERT OR IGNORE INTO settings(key,value) VALUES
  ('exam_day1','SU'),
  ('exam_day2','WE'),
  ('semester_start','2026-08-30'),
  ('semester','الفصل الأول 1448هـ'),
  ('student_target','80'),
  ('school','مدرسة أبوداوود الابتدائية');
