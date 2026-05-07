import { useState, useEffect } from "react";
import {
  Play, CheckCircle, Circle, Star, Zap, Trophy, BookOpen,
  FlaskConical, Atom, Leaf, ChevronDown, ChevronUp, X,
  LogOut, BarChart3, Calendar, Target, Sparkles, Lock,
  Copy, Check, Users, Shield, AlertCircle, Key
} from "lucide-react";

// ══════════════════════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════════════════════
const ADMIN_CODE = "000000";

// قاموس الأكواد ← الأسماء  (أضف هنا طلابك)
const STUDENTS = {
  "123456": "أحمد محمد",
  "234567": "سارة علي",
  "345678": "محمود حسن",
  "456789": "نور الهدى",
  "567890": "يوسف كريم",
  "678901": "ريم أحمد",
  "789012": "عمر خالد",
  "890123": "فاطمة إبراهيم",
  "901234": "زياد مصطفى",
  "112233": "لينا سامي",
};

function generateCode(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 900000 + 100000).toString();
}

// ══════════════════════════════════════════════════════════
//  CURRICULUM DATA
// ══════════════════════════════════════════════════════════
const DAYS_DATA = [
  { day:1, subject:"اللغة العربية", color:"#f59e0b", icon:"arabic", tasks:[
    {id:"ar1",title:"نحو 1",videoId:"CB1mCrgngcI",teacher:"محمد صلاح"},
    {id:"ar2",title:"نحو 2",videoId:"Q50l6ppl6LI",teacher:"محمد صلاح"},
    {id:"ar3",title:"نحو 3",videoId:"njNWPciL2G8",teacher:"محمد صلاح"},
  ]},
  { day:2, subject:"اللغة العربية", color:"#f59e0b", icon:"arabic", tasks:[
    {id:"ar4",title:"نحو 4",videoId:"zvIU4yYYf4k",teacher:"محمد صلاح"},
    {id:"ar5",title:"النحو كاملاً",videoId:"i8Gp6CZKs7g",teacher:"محمد صلاح"},
    {id:"ar6",title:"القصة",videoId:"OKfhdW5FZeQ",teacher:"محمد صلاح"},
  ]},
  { day:3, subject:"اللغة العربية", color:"#f59e0b", icon:"arabic", tasks:[
    {id:"ar7",title:"الأدب",videoId:"7SCtjdmpGp4",teacher:"محمد صلاح"},
    {id:"ar8",title:"البلاغة",videoId:"oWIECLrM8NQ",teacher:"محمد صلاح"},
    {id:"ar9",title:"التعبير",videoId:"ngZuAuvPZ5E",teacher:"محمد صلاح"},
  ]},
  { day:4, subject:"اللغة العربية", color:"#f59e0b", icon:"arabic", tasks:[
    {id:"ar10",title:"نصوص وقراءة",videoId:"kAv13VhoWNA",teacher:"محمد صلاح"},
    {id:"ar11",title:"ليلة الامتحان",videoId:"iZsvEBH1m6o",teacher:"محمد صلاح"},
  ]},
  { day:5, subject:"اللغة العربية", color:"#f59e0b", icon:"arabic", tasks:[
    {id:"art1",title:"امتحان 1",videoId:"0dR8UHOjDLo",teacher:"محمد طارق"},
    {id:"art2",title:"امتحان 2",videoId:"8v8YmcAp9gM",teacher:"محمد طارق"},
    {id:"art3",title:"امتحان 3",videoId:"VLPgHkZ2UA0",teacher:"محمد طارق"},
    {id:"art4",title:"امتحان 4",videoId:"tm9XquAfZhg",teacher:"محمد طارق"},
    {id:"art5",title:"امتحان 5",videoId:"o5FzkhGRfg0",teacher:"محمد طارق"},
    {id:"art6",title:"امتحان 6",videoId:"WDqmGAhUujA",teacher:"محمد طارق"},
    {id:"art7",title:"امتحان 7",videoId:"Say2jr-i95o",teacher:"محمد طارق"},
  ]},
  { day:6, subject:"الكيمياء", color:"#10b981", icon:"chemistry", tasks:[
    {id:"ch1",title:"كيمياء مراجعة",videoId:"lvqj9e8zhDk",teacher:"هنذاكر أونلاين"},
  ]},
  { day:7, subject:"الكيمياء", color:"#10b981", icon:"chemistry", tasks:[
    {id:"ch2",title:"كيمياء 1",videoId:"7prJLVckb0w",teacher:"محمد عبد الجواد"},
    {id:"ch3",title:"كيمياء 2",videoId:"gKnFphEz7xM",teacher:"محمد عبد الجواد"},
  ]},
  { day:8, subject:"الكيمياء", color:"#10b981", icon:"chemistry", tasks:[
    {id:"ch4",title:"كيمياء 3",videoId:"vZuU_7DzJGU",teacher:"محمد عبد الجواد"},
    {id:"ch5",title:"كيمياء 4",videoId:"mJMkdzsLkXg",teacher:"محمد عبد الجواد"},
  ]},
  { day:9, subject:"الكيمياء", color:"#10b981", icon:"chemistry", tasks:[
    {id:"ch6",title:"كيمياء 5",videoId:"wDmpooRH3Vo",teacher:"محمد عبد الجواد"},
  ]},
  { day:10, subject:"الكيمياء", color:"#10b981", icon:"chemistry", tasks:[
    {id:"ch7",title:"مراجعة شاملة",videoId:"lvqj9e8zhDk",teacher:"هنذاكر أونلاين"},
  ]},
  { day:11, subject:"الفيزياء", color:"#6366f1", icon:"physics", tasks:[
    {id:"ph1",title:"فيزياء 1",videoId:"Ud51IPZGKus",teacher:"حسام دكروني"},
    {id:"ph2",title:"فيزياء 2",videoId:"EzHyyyYz4T0",teacher:"حسام دكروني"},
  ]},
  { day:12, subject:"الفيزياء", color:"#6366f1", icon:"physics", tasks:[
    {id:"ph3",title:"فيزياء هنذاكر",videoId:"-C9ZQF70AbU",teacher:"هنذاكر أونلاين"},
  ]},
  { day:13, subject:"الفيزياء", color:"#6366f1", icon:"physics", tasks:[
    {id:"ph4",title:"فيزياء خالد صقر",videoId:"WwRIZUysQss",teacher:"خالد صقر"},
  ]},
  { day:14, subject:"الفيزياء", color:"#6366f1", icon:"physics", tasks:[
    {id:"ph5",title:"مراجعة الفيزياء",videoId:"Ud51IPZGKus",teacher:"حسام دكروني"},
  ]},
  { day:15, subject:"الأحياء", color:"#ec4899", icon:"biology", tasks:[
    {id:"bi1",title:"أحياء 1",videoId:"Vh1bxHrR7g4",teacher:"أحمد الجوهري"},
    {id:"bi2",title:"أحياء 2",videoId:"LHYb3-w2L5w",teacher:"أحمد الجوهري"},
  ]},
  { day:16, subject:"الأحياء", color:"#ec4899", icon:"biology", tasks:[
    {id:"bi3",title:"أحياء 3",videoId:"MDKBjOpWQr0",teacher:"أحمد الجوهري"},
    {id:"bi4",title:"أحياء 4",videoId:"WLpNl7_VJ9E",teacher:"أحمد الجوهري"},
    {id:"bi5",title:"أحياء 5",videoId:"jE-uQEaQ5JQ",teacher:"أحمد الجوهري"},
  ]},
  { day:17, subject:"الأحياء", color:"#ec4899", icon:"biology", tasks:[
    {id:"bi6",title:"أحياء 6",videoId:"Q83fgtgNnYM",teacher:"أحمد الجوهري"},
    {id:"bi7",title:"أحياء 7",videoId:"Z_IH_A4xHhs",teacher:"أحمد الجوهري"},
    {id:"bi8",title:"أحياء 8",videoId:"X5Y9BbFjLSY",teacher:"أحمد الجوهري"},
  ]},
  { day:18, subject:"الجيولوجيا", color:"#f97316", icon:"geo", tasks:[
    {id:"ge1",title:"جيولوجيا ماجد",videoId:"Zh3docuAGfc",teacher:"جيو ماجد"},
  ]},
  { day:19, subject:"الجيولوجيا", color:"#f97316", icon:"geo", tasks:[
    {id:"ge2",title:"جيولوجيا أيمن",videoId:"sgzImwa7Hg0",teacher:"محمد أيمن"},
  ]},
];

const QURAN_VERSES = [
  "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ",
  "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  "وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ",
  "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ",
  "وَقُل رَّبِّ زِدْنِي عِلْمًا",
  "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
];

const TOTAL_TASKS = DAYS_DATA.flatMap(d => d.tasks).length;

// ══════════════════════════════════════════════════════════
//  LOGO
// ══════════════════════════════════════════════════════════
function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b"/><stop offset="1" stopColor="#ec4899"/>
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1"/><stop offset="1" stopColor="#10b981"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="80" rx="22" ry="8" fill="url(#lg2)" opacity="0.4"/>
      <path d="M30 75 Q28 55 35 40 Q42 25 50 20 Q58 25 65 40 Q72 55 70 75 Q60 82 50 82 Q40 82 30 75Z" fill="url(#lg1)" opacity="0.85"/>
      <path d="M50 10 L52.5 17.5 L60 17.5 L54 22 L56 30 L50 25.5 L44 30 L46 22 L40 17.5 L47.5 17.5Z" fill="#fde68a"/>
      <path d="M50 65 L50 45 M44 51 L50 45 L56 51" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SubjectIcon({ type, color, size=18 }) {
  const p = { size, color, strokeWidth:2 };
  if (type==="arabic")    return <BookOpen {...p}/>;
  if (type==="chemistry") return <FlaskConical {...p}/>;
  if (type==="physics")   return <Atom {...p}/>;
  if (type==="biology")   return <Leaf {...p}/>;
  return <Target {...p}/>;
}

// ══════════════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen]           = useState("login");
  const [isAdmin, setIsAdmin]         = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [completed, setCompleted]     = useState({});
  const [expandedDay, setExpandedDay] = useState(null);
  const [videoModal, setVideoModal]   = useState(null);
  const [verseIdx, setVerseIdx]       = useState(0);
  const [activeTab, setActiveTab]     = useState("dashboard");

  useEffect(() => {
    const code = localStorage.getItem("katwa_code");
    const comp = localStorage.getItem("katwa_completed");
    if (comp) setCompleted(JSON.parse(comp));
    if (code === ADMIN_CODE) {
      setIsAdmin(true); setScreen("app");
    } else if (code && STUDENTS[code]) {
      setStudentCode(code); setStudentName(STUDENTS[code]); setScreen("app");
    }
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setVerseIdx(v => (v+1) % QURAN_VERSES.length), 4500);
    return () => clearInterval(iv);
  }, []);

  const handleLogin = (code) => {
    if (code === ADMIN_CODE) {
      setIsAdmin(true);
      localStorage.setItem("katwa_code", code);
      setScreen("app");
      return true;
    }
    if (STUDENTS[code]) {
      setStudentCode(code); setStudentName(STUDENTS[code]);
      localStorage.setItem("katwa_code", code);
      setScreen("app");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("katwa_code");
    setIsAdmin(false); setStudentCode(""); setStudentName("");
    setScreen("login"); setActiveTab("dashboard");
  };

  const toggleTask = (id) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem("katwa_completed", JSON.stringify(next));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress       = Math.round((completedCount / TOTAL_TASKS) * 100);
  const todayDayNum    = (new Date().getDate() % 19) || 1;
  const todayData      = DAYS_DATA.find(d => d.day === todayDayNum) || DAYS_DATA[0];

  // ── LOGIN ──
  if (screen === "login") return <LoginScreen onLogin={handleLogin}/>;

  // ── ADMIN PANEL ──
  if (isAdmin) return (
    <AdminPanel onLogout={handleLogout} DAYS_DATA={DAYS_DATA} STUDENTS={STUDENTS} generateCode={generateCode}/>
  );

  // ── STUDENT APP ──
  return (
    <div style={S.app}>
      <div style={S.ticker}>
        <span style={S.tickerText}>✦ {QURAN_VERSES[verseIdx]} ✦</span>
      </div>

      <header style={S.header}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Logo size={38}/>
          <div>
            <div style={S.platformName}>خطوة إلى الحلم</div>
            <div style={S.heroLine}>
              <Sparkles size={12} color="#f59e0b" style={{marginLeft:4}}/>
              البطل:&nbsp;
              <span style={{color:"#f59e0b"}} className="glow-name">{studentName}</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={S.codePill}>
            <Lock size={11} color="#6366f1"/>
            <span style={{direction:"ltr",letterSpacing:3,fontWeight:800}}>{studentCode}</span>
          </div>
          <button style={S.iconBtn} onClick={handleLogout}><LogOut size={17} color="#64748b"/></button>
        </div>
      </header>

      <div style={S.gpWrap}>
        <div style={S.gpTrack}><div style={{...S.gpFill,width:`${progress}%`}}/></div>
        <span style={S.gpLabel}>{progress}% · {completedCount}/{TOTAL_TASKS} مهمة مكتملة</span>
      </div>

      <nav style={S.nav}>
        {[
          {id:"dashboard",label:"الرئيسية",   icon:<BarChart3 size={15}/>},
          {id:"schedule", label:"الجدول",      icon:<Calendar  size={15}/>},
          {id:"today",    label:"نشاطي اليوم", icon:<Target    size={15}/>},
        ].map(t => (
          <button key={t.id}
            style={{...S.navBtn,...(activeTab===t.id?S.navActive:{})}}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon}<span style={{marginRight:6}}>{t.label}</span>
          </button>
        ))}
      </nav>

      <main style={S.main}>
        {activeTab==="dashboard" && (
          <DashboardView
            studentName={studentName} progress={progress}
            completedCount={completedCount} todayData={todayData}
            completed={completed} DAYS_DATA={DAYS_DATA}
            onGoToday={() => setActiveTab("today")}
          />
        )}
        {activeTab==="schedule" && (
          <ScheduleView
            DAYS_DATA={DAYS_DATA} completed={completed} toggleTask={toggleTask}
            expandedDay={expandedDay} setExpandedDay={setExpandedDay}
            setVideoModal={setVideoModal}
          />
        )}
        {activeTab==="today" && (
          <TodayView
            todayData={todayData} completed={completed}
            toggleTask={toggleTask} setVideoModal={setVideoModal}
          />
        )}
      </main>

      {videoModal && (
        <div style={S.overlay} onClick={() => setVideoModal(null)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalTop}>
              <span style={S.modalTitle}>{videoModal.title} — {videoModal.teacher}</span>
              <button style={S.closeBtn} onClick={() => setVideoModal(null)}><X size={19} color="#e2e8f0"/></button>
            </div>
            <div style={S.iframeWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&rel=0`}
                style={S.iframe} allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={videoModal.title}
              />
            </div>
          </div>
        </div>
      )}

      <GlobalStyles/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  LOGIN  — كود فقط
// ══════════════════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [code, setCode]   = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const tryLogin = () => {
    const ok = onLogin(code.trim());
    if (!ok) {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={LS.bg}>
      {[...Array(70)].map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          width:Math.random()*2.5+0.5+"px",height:Math.random()*2.5+0.5+"px",
          borderRadius:"50%",background:"white",
          left:Math.random()*100+"%",top:Math.random()*100+"%",
          opacity:Math.random()*0.55+0.08,
          animation:`twinkle ${Math.random()*4+2}s ease-in-out infinite`,
          animationDelay:Math.random()*5+"s",
        }}/>
      ))}
      <div style={{position:"absolute",top:"12%",right:"8%",width:280,height:280,
        background:"radial-gradient(circle,rgba(99,102,241,.16),transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"18%",left:"4%",width:220,height:220,
        background:"radial-gradient(circle,rgba(245,158,11,.1),transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>

      <div style={{...LS.card, animation: shake?"shake .4s ease":"fadeUp .6s ease"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
            <div style={LS.logoRing}><Logo size={60}/></div>
          </div>
          <h1 style={LS.title}>خطوة إلى الحلم</h1>
          <p style={LS.sub}>منصتك الأسطورية نحو قمة الثانوية</p>
        </div>

        <div style={LS.verse}>
          <span style={LS.verseText}>❝ وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ❞</span>
        </div>

        <label style={LS.label}>
          <Key size={14} color="#6366f1" style={{marginLeft:7}}/>
          أدخل كودك السري (6 أرقام)
        </label>

        {/* code boxes */}
        <div style={LS.codeBoxes}>
          {[...Array(6)].map((_,i) => (
            <div key={i} style={{...LS.box,...(code[i]?LS.boxFilled:{})}}>
              {code[i]||""}
            </div>
          ))}
        </div>

        {/* hidden input driving the boxes */}
        <input
          style={LS.hiddenInput}
          type="text" inputMode="numeric" maxLength={6}
          value={code}
          onChange={e => { setCode(e.target.value.replace(/\D/g,"")); setError(false); }}
          onKeyDown={e => e.key==="Enter" && tryLogin()}
          autoFocus
        />

        {error && (
          <div style={LS.errMsg}>
            <AlertCircle size={13} color="#ef4444" style={{marginLeft:5}}/>
            الكود غير صحيح — تواصل مع المسؤول
          </div>
        )}

        <button
          style={{...LS.btn, opacity:code.length===6?1:0.45, marginTop:16}}
          onClick={tryLogin}
          disabled={code.length!==6}
        >
          <Zap size={17}/><span style={{marginRight:8}}>دخول</span>
        </button>

        <p style={LS.hint}>لا تملك كوداً؟ تواصل مع الأستاذ المسؤول</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#0f172a;font-family:'Cairo',sans-serif;direction:rtl}
        @keyframes twinkle{0%,100%{opacity:.08}50%{opacity:.7}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
      `}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  ADMIN PANEL — مخفية خلف 000000
// ══════════════════════════════════════════════════════════
function AdminPanel({ onLogout, DAYS_DATA, STUDENTS, generateCode }) {
  const [searchName, setSearchName] = useState("");
  const [result, setResult]         = useState(null);
  const [copied, setCopied]         = useState(false);
  const [activeTab, setActiveTab]   = useState("codes");

  const doSearch = () => {
    const n = searchName.trim();
    if (!n) return;
    setResult({ name:n, code:generateCode(n) });
  };

  const copyCode = (c) => {
    navigator.clipboard.writeText(c).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={AP.bg}>
      <div style={AP.header}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Logo size={36}/>
          <div>
            <div style={AP.platformName}>خطوة إلى الحلم</div>
            <div style={AP.adminBadge}>
              <Shield size={11} color="#6366f1" style={{marginLeft:4}}/>
              لوحة تحكم المسؤول
            </div>
          </div>
        </div>
        <button style={AP.logoutBtn} onClick={onLogout}>
          <LogOut size={15} color="#64748b"/><span style={{marginRight:6}}>خروج</span>
        </button>
      </div>

      <div style={AP.tabs}>
        {[
          {id:"codes",    label:"توليد الأكواد"},
          {id:"schedule", label:"جدول الأيام"},
          {id:"students", label:"قائمة الطلاب"},
        ].map(t => (
          <button key={t.id}
            style={{...AP.tab,...(activeTab===t.id?AP.tabActive:{})}}
            onClick={() => setActiveTab(t.id)}
          >{t.label}</button>
        ))}
      </div>

      <div style={AP.main}>

        {/* ── CODES TAB ── */}
        {activeTab==="codes" && (
          <div>
            <h2 style={AP.secTitle}><Key size={18} color="#f59e0b" style={{marginLeft:8}}/>توليد كود من الاسم</h2>
            <div style={AP.searchRow}>
              <input style={AP.input} placeholder="اكتب اسم الطالب..."
                value={searchName} onChange={e => setSearchName(e.target.value)}
                onKeyDown={e => e.key==="Enter" && doSearch()}/>
              <button style={AP.searchBtn} onClick={doSearch}>توليد الكود</button>
            </div>
            {result && (
              <div style={AP.resultCard}>
                <div style={AP.resultName}>
                  <Users size={16} color="#f59e0b" style={{marginLeft:8}}/>{result.name}
                </div>
                <div style={AP.resultRow}>
                  <span style={AP.codeDisplay}>{result.code}</span>
                  <button style={AP.copyBtn} onClick={() => copyCode(result.code)}>
                    {copied?<Check size={15} color="#10b981"/>:<Copy size={15} color="#94a3b8"/>}
                    <span style={{marginRight:6,fontSize:13}}>{copied?"تم النسخ!":"نسخ"}</span>
                  </button>
                </div>
              </div>
            )}
            <div style={AP.infoBox}>
              <Shield size={14} color="#6366f1" style={{marginLeft:8,flexShrink:0}}/>
              <span style={{color:"#94a3b8",fontSize:13,lineHeight:1.7}}>
                الكود يُولَّد من الاسم بخوارزمية ثابتة — نفس الاسم دائماً = نفس الكود
              </span>
            </div>
          </div>
        )}

        {/* ── SCHEDULE TAB ── */}
        {activeTab==="schedule" && (
          <div>
            <h2 style={AP.secTitle}><Calendar size={18} color="#f59e0b" style={{marginLeft:8}}/>جدول الـ 19 يوم</h2>
            <div style={AP.schedGrid}>
              {DAYS_DATA.map(d => (
                <div key={d.day} style={{...AP.dayCard,borderColor:d.color+"44"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{...AP.dayNum,background:d.color+"22",color:d.color}}>{d.day}</div>
                      <SubjectIcon type={d.icon} color={d.color} size={13}/>
                      <span style={{color:"#e2e8f0",fontWeight:700,fontSize:12}}>{d.subject}</span>
                    </div>
                    <span style={{color:"#64748b",fontSize:11}}>{d.tasks.length} مهام</span>
                  </div>
                  {d.tasks.map(t => (
                    <div key={t.id} style={AP.taskRow}>
                      <span style={{color:"#94a3b8",fontSize:11}}>{t.title}</span>
                      <span style={{color:"#475569",fontSize:10}}>{t.teacher}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STUDENTS TAB ── */}
        {activeTab==="students" && (
          <div>
            <h2 style={AP.secTitle}><Users size={18} color="#f59e0b" style={{marginLeft:8}}/>قائمة الطلاب المسجلين</h2>
            <div style={{background:"#1e293b",border:"1px solid #334155",borderRadius:14,overflow:"hidden"}}>
              <div style={AP.tableHead}>
                <span>الاسم</span>
                <span style={{direction:"ltr"}}>الكود</span>
              </div>
              {Object.entries(STUDENTS).map(([c,n]) => (
                <div key={c} style={AP.tableRow}>
                  <span style={{color:"#e2e8f0",fontWeight:600}}>{n}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#f59e0b",fontWeight:800,direction:"ltr",letterSpacing:3}}>{c}</span>
                    <button style={AP.miniCopy} onClick={() => copyCode(c)}>
                      <Copy size={12} color="#64748b"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p style={{color:"#475569",fontSize:12,marginTop:10,textAlign:"center"}}>
              لإضافة طالب: أضف الكود والاسم في مصفوفة STUDENTS بالكود
            </p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#0f172a;font-family:'Cairo',sans-serif;direction:rtl}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0f172a}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:2px}
      `}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════════════════
function DashboardView({ studentName, progress, completedCount, todayData, completed, DAYS_DATA, onGoToday }) {
  const subjects = [
    {name:"اللغة العربية",color:"#f59e0b",icon:"arabic",  days:[1,2,3,4,5]},
    {name:"الكيمياء",     color:"#10b981",icon:"chemistry",days:[6,7,8,9,10]},
    {name:"الفيزياء",     color:"#6366f1",icon:"physics",  days:[11,12,13,14]},
    {name:"الأحياء",      color:"#ec4899",icon:"biology",  days:[15,16,17]},
    {name:"الجيولوجيا",   color:"#f97316",icon:"geo",      days:[18,19]},
  ].map(s => {
    const tasks = DAYS_DATA.filter(d=>s.days.includes(d.day)).flatMap(d=>d.tasks);
    const done  = tasks.filter(t=>completed[t.id]).length;
    return {...s,done,total:tasks.length,pct:Math.round((done/tasks.length)*100)};
  });

  const todayDone  = todayData.tasks.filter(t=>completed[t.id]).length;
  const todayTotal = todayData.tasks.length;

  return (
    <div style={{animation:"fadeIn .4s ease"}}>
      <div style={D.hero}>
        <div style={D.heroGlow}/>
        <div style={{position:"relative",flex:1}}>
          <p style={{color:"#64748b",fontSize:13,marginBottom:3}}>أهلاً بك يا</p>
          <h2 className="glow-name" style={D.heroName}>{studentName} 🏆</h2>
          <p style={{color:"#94a3b8",fontSize:13,marginTop:5}}>
            {progress<30?"مرحلة الانطلاق 🚀":progress<70?"مرحلة التسارع ⚡":"مرحلة الفتح 🌟"}
          </p>
        </div>
        <div style={{position:"relative",width:108,height:108,flexShrink:0}}>
          <svg width="108" height="108" style={{transform:"rotate(-90deg)"}}>
            <circle cx="54" cy="54" r="44" fill="none" stroke="#1e293b" strokeWidth="7"/>
            <circle cx="54" cy="54" r="44" fill="none" stroke="url(#cg)" strokeWidth="7"
              strokeDasharray={`${2*Math.PI*44}`}
              strokeDashoffset={`${2*Math.PI*44*(1-progress/100)}`}
              strokeLinecap="round"/>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#f59e0b"/><stop offset="1" stopColor="#ec4899"/>
              </linearGradient>
            </defs>
          </svg>
          <div style={D.circleCenter}>
            <div style={{color:"#f1f5f9",fontWeight:900,fontSize:20}}>{progress}%</div>
            <div style={{color:"#64748b",fontSize:10}}>مكتمل</div>
          </div>
        </div>
      </div>

      <div style={D.statsRow}>
        {[
          {label:"منجز",  val:completedCount,           color:"#10b981",icon:<CheckCircle size={19} color="#10b981"/>},
          {label:"متبقي", val:TOTAL_TASKS-completedCount,color:"#6366f1",icon:<Circle size={19} color="#6366f1"/>},
          {label:"الكل",  val:TOTAL_TASKS,               color:"#f59e0b",icon:<Star size={19} color="#f59e0b"/>},
        ].map(s=>(
          <div key={s.label} style={D.statCard}>
            {s.icon}
            <div style={{color:s.color,fontWeight:900,fontSize:20}}>{s.val}</div>
            <div style={{color:"#64748b",fontSize:11}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={D.todayCard} onClick={onGoToday}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Target size={21} color="#f59e0b"/>
          <div>
            <div style={{color:"#f1f5f9",fontWeight:700,fontSize:15}}>نشاط اليوم — {todayData.subject}</div>
            <div style={{color:"#94a3b8",fontSize:13}}>{todayDone}/{todayTotal} مهام · اضغط للبدء</div>
          </div>
        </div>
        <div style={D.todayBar}>
          <div style={{...D.todayFill,width:`${Math.round((todayDone/todayTotal)*100)}%`}}/>
        </div>
      </div>

      <h3 style={D.secTitle}><BarChart3 size={16} color="#6366f1" style={{marginLeft:8}}/>تقدمك في المواد</h3>
      <div style={D.subGrid}>
        {subjects.map(s=>(
          <div key={s.name} style={D.subCard}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <SubjectIcon type={s.icon} color={s.color} size={15}/>
                <span style={{color:"#e2e8f0",fontWeight:700,fontSize:13}}>{s.name}</span>
              </div>
              <span style={{color:s.color,fontWeight:900,fontSize:16}}>{s.pct}%</span>
            </div>
            <div style={{height:5,background:"#0f172a",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${s.pct}%`,background:s.color,borderRadius:3,transition:"width .5s"}}/>
            </div>
            <div style={{color:"#64748b",fontSize:11,marginTop:4}}>{s.done}/{s.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  SCHEDULE
// ══════════════════════════════════════════════════════════
function ScheduleView({ DAYS_DATA, completed, toggleTask, expandedDay, setExpandedDay, setVideoModal }) {
  return (
    <div style={{animation:"fadeIn .4s ease"}}>
      <h3 style={D.secTitle}><Calendar size={16} color="#f59e0b" style={{marginLeft:8}}/>جدول الـ 19 يوم</h3>
      {DAYS_DATA.map(day => {
        const done = day.tasks.filter(t=>completed[t.id]).length;
        const pct  = Math.round((done/day.tasks.length)*100);
        const open = expandedDay===day.day;
        return (
          <div key={day.day} style={{marginBottom:10}}>
            <button style={{...SC.header,borderColor:day.color+"44"}} onClick={() => setExpandedDay(open?null:day.day)}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{...SC.num,background:day.color+"22",color:day.color}}>{day.day}</div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <SubjectIcon type={day.icon} color={day.color} size={14}/>
                    <span style={{color:"#f1f5f9",fontWeight:700,fontSize:14}}>اليوم {day.day} — {day.subject}</span>
                  </div>
                  <div style={{color:"#64748b",fontSize:12,marginTop:2}}>{done}/{day.tasks.length} مهام</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:day.color,fontWeight:900,fontSize:14}}>{pct}%</span>
                {open?<ChevronUp size={15} color="#64748b"/>:<ChevronDown size={15} color="#64748b"/>}
              </div>
            </button>
            <div style={{height:3,background:"#1e293b",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:day.color,transition:"width .4s"}}/>
            </div>
            {open && (
              <div style={SC.tasks}>
                {day.tasks.map(t => (
                  <TaskRow key={t.id} task={t} done={!!completed[t.id]} color={day.color}
                    onToggle={() => toggleTask(t.id)} onPlay={() => setVideoModal(t)}/>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  TODAY
// ══════════════════════════════════════════════════════════
function TodayView({ todayData, completed, toggleTask, setVideoModal }) {
  const done    = todayData.tasks.filter(t=>completed[t.id]).length;
  const total   = todayData.tasks.length;
  const allDone = done===total;

  return (
    <div style={{animation:"fadeIn .4s ease"}}>
      <div style={T.header}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <SubjectIcon type={todayData.icon} color={todayData.color} size={21}/>
          <div>
            <h3 style={{color:"#f1f5f9",fontWeight:900,fontSize:18}}>نشاطي اليوم</h3>
            <p style={{color:"#64748b",fontSize:13}}>اليوم {todayData.day} — {todayData.subject}</p>
          </div>
        </div>
        {allDone && (
          <div style={{display:"flex",alignItems:"center",gap:6,
            background:"rgba(245,158,11,.13)",border:"1px solid rgba(245,158,11,.4)",
            borderRadius:10,padding:"6px 12px",color:"#f59e0b",fontWeight:700,fontSize:14}}>
            <Trophy size={14} color="#f59e0b"/>أحسنت!
          </div>
        )}
      </div>

      <div style={T.progCard}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
          <span style={{color:"#94a3b8",fontSize:13}}>التقدم اليوم</span>
          <span style={{color:todayData.color,fontWeight:800}}>{done}/{total}</span>
        </div>
        <div style={{height:8,background:"#0f172a",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${Math.round((done/total)*100)}%`,
            background:todayData.color,borderRadius:4,transition:"width .5s"}}/>
        </div>
      </div>

      <div style={{marginTop:12}}>
        {todayData.tasks.map(t => (
          <TaskRow key={t.id} task={t} done={!!completed[t.id]} color={todayData.color}
            onToggle={() => toggleTask(t.id)} onPlay={() => setVideoModal(t)} large/>
        ))}
      </div>

      {allDone && (
        <div style={T.celebration}>
          <Trophy size={42} color="#f59e0b"/>
          <h3 style={{color:"#f59e0b",fontWeight:900,fontSize:21,marginTop:12}}>أنهيت كل مهام اليوم! 🎉</h3>
          <p style={{color:"#94a3b8",marginTop:8}}>رائع جداً، استمر في تحقيق الحلم ✨</p>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  TASK ROW
// ══════════════════════════════════════════════════════════
function TaskRow({ task, done, color, onToggle, onPlay, large }) {
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:10,
      background:done?color+"11":"#1e293b",
      border:`1px solid ${done?color+"44":"#334155"}`,
      borderRadius:12,padding:large?"13px 14px":"10px 13px",
      marginBottom:8,transition:"all .2s",
    }}>
      <button style={{background:"none",border:"none",cursor:"pointer",padding:0,flexShrink:0}} onClick={onToggle}>
        {done?<CheckCircle size={21} color={color} fill={color+"44"}/>:<Circle size={21} color="#475569"/>}
      </button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:done?"#64748b":"#e2e8f0",fontWeight:600,fontSize:large?14:13,
          textDecoration:done?"line-through":"none",
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {task.title}
        </div>
        {task.teacher && <div style={{color:"#475569",fontSize:11,marginTop:1}}>{task.teacher}</div>}
      </div>
      <button style={{display:"flex",alignItems:"center",justifyContent:"center",
        width:30,height:30,borderRadius:8,cursor:"pointer",
        background:color+"22",border:`1px solid ${color}44`}} onClick={onPlay}>
        <Play size={12} color={color} fill={color}/>
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  GLOBAL STYLES
// ══════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      body{background:#0f172a;font-family:'Cairo',sans-serif;direction:rtl}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-track{background:#0f172a}
      ::-webkit-scrollbar-thumb{background:#334155;border-radius:2px}
      @keyframes glow{
        0%,100%{text-shadow:0 0 8px #f59e0b,0 0 18px #f59e0b44}
        50%{text-shadow:0 0 18px #f59e0b,0 0 38px #f59e0b88,0 0 55px #f59e0b33}
      }
      @keyframes marquee{0%{transform:translateX(100vw)}100%{transform:translateX(-100%)}}
      @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      .glow-name{animation:glow 2.5s ease-in-out infinite}
    `}</style>
  );
}

// ══════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════
const S = {
  app:        {minHeight:"100vh",background:"#0f172a",fontFamily:"'Cairo',sans-serif",direction:"rtl",paddingBottom:40},
  ticker:     {background:"linear-gradient(90deg,#0f172a,#1e1b4b,#0f172a)",borderBottom:"1px solid #1e293b",padding:"7px 0",overflow:"hidden",whiteSpace:"nowrap"},
  tickerText: {display:"inline-block",color:"#fde68a",fontSize:13,fontWeight:600,animation:"marquee 22s linear infinite"},
  header:     {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 17px",background:"rgba(15,23,42,.95)",borderBottom:"1px solid #1e293b",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(14px)"},
  platformName:{color:"#f1f5f9",fontWeight:900,fontSize:16},
  heroLine:   {color:"#94a3b8",fontSize:12,fontWeight:600,display:"flex",alignItems:"center"},
  codePill:   {background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"4px 9px",display:"flex",alignItems:"center",gap:5,color:"#94a3b8",fontSize:12},
  iconBtn:    {background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:8,display:"flex"},
  gpWrap:     {padding:"7px 17px",background:"#0f172a",borderBottom:"1px solid #1e293b"},
  gpTrack:    {height:5,background:"#1e293b",borderRadius:3,overflow:"hidden",marginBottom:3},
  gpFill:     {height:"100%",background:"linear-gradient(90deg,#6366f1,#ec4899,#f59e0b)",borderRadius:3,transition:"width .6s ease"},
  gpLabel:    {color:"#64748b",fontSize:11},
  nav:        {display:"flex",gap:4,padding:"9px 13px",background:"#0f172a",borderBottom:"1px solid #1e293b",overflowX:"auto"},
  navBtn:     {display:"flex",alignItems:"center",padding:"7px 13px",background:"#1e293b",border:"1px solid #334155",borderRadius:10,color:"#94a3b8",cursor:"pointer",fontSize:13,fontFamily:"'Cairo',sans-serif",fontWeight:600,whiteSpace:"nowrap",transition:"all .2s"},
  navActive:  {background:"linear-gradient(135deg,#6366f1,#ec4899)",border:"1px solid transparent",color:"white"},
  main:       {padding:"13px"},
  overlay:    {position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:14},
  modal:      {background:"#0f172a",border:"1px solid #334155",borderRadius:16,width:"100%",maxWidth:820,overflow:"hidden"},
  modalTop:   {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 15px",borderBottom:"1px solid #1e293b",background:"#1e293b"},
  modalTitle: {color:"#f1f5f9",fontWeight:700,fontSize:13},
  closeBtn:   {background:"none",border:"none",cursor:"pointer",padding:4,display:"flex"},
  iframeWrap: {position:"relative",paddingBottom:"56.25%",height:0},
  iframe:     {position:"absolute",inset:0,width:"100%",height:"100%",border:"none"},
};

const LS = {
  bg:         {minHeight:"100vh",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:20,fontFamily:"'Cairo',sans-serif",direction:"rtl"},
  card:       {position:"relative",zIndex:10,background:"rgba(15,23,42,.93)",border:"1px solid #1e293b",borderRadius:24,padding:34,width:"100%",maxWidth:400,backdropFilter:"blur(24px)",boxShadow:"0 0 80px rgba(99,102,241,.18)"},
  logoRing:   {width:84,height:84,borderRadius:"50%",background:"linear-gradient(135deg,rgba(99,102,241,.18),rgba(236,72,153,.18))",border:"1px solid rgba(99,102,241,.3)",display:"flex",alignItems:"center",justifyContent:"center"},
  title:      {color:"#f1f5f9",fontWeight:900,fontSize:24,marginTop:4},
  sub:        {color:"#64748b",fontSize:13,marginTop:5},
  verse:      {background:"rgba(99,102,241,.09)",border:"1px solid rgba(99,102,241,.22)",borderRadius:12,padding:"10px 14px",marginBottom:20,marginTop:18,textAlign:"center"},
  verseText:  {color:"#a5b4fc",fontSize:14,fontWeight:600,lineHeight:1.9},
  label:      {display:"flex",alignItems:"center",color:"#94a3b8",fontSize:13,marginBottom:10},
  codeBoxes:  {display:"flex",justifyContent:"center",gap:8,marginBottom:6},
  box:        {width:40,height:50,background:"#1e293b",border:"1px solid #334155",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",color:"#f1f5f9",fontWeight:900,fontSize:22,transition:"all .2s"},
  boxFilled:  {background:"rgba(99,102,241,.2)",border:"1px solid #6366f1",color:"#a5b4fc"},
  hiddenInput:{position:"absolute",opacity:0,width:"100%",height:60,left:0,cursor:"pointer",fontSize:1},
  errMsg:     {display:"flex",alignItems:"center",color:"#ef4444",fontSize:12,marginTop:6,justifyContent:"center"},
  btn:        {width:"100%",background:"linear-gradient(135deg,#6366f1,#ec4899)",border:"none",borderRadius:12,padding:"13px",color:"white",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cairo',sans-serif",transition:"opacity .2s"},
  hint:       {textAlign:"center",color:"#475569",fontSize:12,marginTop:14},
};

const AP = {
  bg:          {minHeight:"100vh",background:"#0f172a",fontFamily:"'Cairo',sans-serif",direction:"rtl",paddingBottom:40},
  header:      {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 18px",background:"rgba(15,23,42,.95)",borderBottom:"1px solid #1e293b",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(14px)"},
  platformName:{color:"#f1f5f9",fontWeight:900,fontSize:16},
  adminBadge:  {display:"flex",alignItems:"center",color:"#6366f1",fontSize:12,fontWeight:700,marginTop:2},
  logoutBtn:   {display:"flex",alignItems:"center",background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"7px 13px",color:"#94a3b8",cursor:"pointer",fontSize:13,fontFamily:"'Cairo',sans-serif"},
  tabs:        {display:"flex",gap:4,padding:"10px 14px",background:"#0f172a",borderBottom:"1px solid #1e293b",overflowX:"auto"},
  tab:         {padding:"8px 16px",background:"#1e293b",border:"1px solid #334155",borderRadius:10,color:"#94a3b8",cursor:"pointer",fontSize:13,fontFamily:"'Cairo',sans-serif",fontWeight:600,whiteSpace:"nowrap"},
  tabActive:   {background:"linear-gradient(135deg,#6366f1,#ec4899)",border:"1px solid transparent",color:"white"},
  main:        {padding:"16px"},
  secTitle:    {display:"flex",alignItems:"center",color:"#f1f5f9",fontWeight:900,fontSize:17,marginBottom:16},
  searchRow:   {display:"flex",gap:10,marginBottom:14},
  input:       {flex:1,background:"#1e293b",border:"1px solid #334155",borderRadius:12,padding:"11px 15px",color:"#f1f5f9",fontSize:14,fontFamily:"'Cairo',sans-serif",outline:"none"},
  searchBtn:   {background:"linear-gradient(135deg,#6366f1,#ec4899)",border:"none",borderRadius:10,padding:"11px 18px",color:"white",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"'Cairo',sans-serif"},
  resultCard:  {background:"#1e293b",border:"1px solid #334155",borderRadius:14,padding:"15px 18px",marginBottom:14},
  resultName:  {display:"flex",alignItems:"center",color:"#e2e8f0",fontWeight:700,fontSize:15,marginBottom:10},
  resultRow:   {display:"flex",alignItems:"center",justifyContent:"space-between"},
  codeDisplay: {color:"#f59e0b",fontWeight:900,fontSize:32,letterSpacing:6,direction:"ltr"},
  copyBtn:     {display:"flex",alignItems:"center",background:"#0f172a",border:"1px solid #334155",borderRadius:8,padding:"8px 12px",cursor:"pointer",gap:4,color:"#94a3b8",fontSize:13,fontFamily:"'Cairo',sans-serif"},
  infoBox:     {display:"flex",alignItems:"flex-start",background:"rgba(99,102,241,.07)",border:"1px solid rgba(99,102,241,.18)",borderRadius:10,padding:"10px 13px"},
  schedGrid:   {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
  dayCard:     {background:"#1e293b",border:"1px solid #334155",borderRadius:11,padding:"11px"},
  dayNum:      {width:26,height:26,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13},
  taskRow:     {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderTop:"1px solid #0f172a",marginTop:4},
  tableHead:   {display:"flex",justifyContent:"space-between",padding:"9px 15px",background:"#0f172a",borderBottom:"1px solid #334155",color:"#64748b",fontWeight:700,fontSize:13},
  tableRow:    {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 15px",borderBottom:"1px solid #1e293b"},
  miniCopy:    {background:"none",border:"none",cursor:"pointer",padding:3,display:"flex"},
};

const D = {
  hero:        {position:"relative",background:"linear-gradient(135deg,#0f172a,#1e1b4b,#1e293b)",border:"1px solid #334155",borderRadius:18,padding:20,marginBottom:12,overflow:"hidden",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10},
  heroGlow:    {position:"absolute",top:-50,right:-50,width:170,height:170,background:"radial-gradient(circle,rgba(245,158,11,.16),transparent 70%)",borderRadius:"50%",pointerEvents:"none"},
  heroName:    {color:"#f59e0b",fontWeight:900,fontSize:24},
  circleCenter:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},
  statsRow:    {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:12},
  statCard:    {background:"#1e293b",border:"1px solid #334155",borderRadius:13,padding:"11px 9px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:5},
  todayCard:   {background:"linear-gradient(135deg,rgba(99,102,241,.14),rgba(236,72,153,.09))",border:"1px solid rgba(99,102,241,.28)",borderRadius:13,padding:13,marginBottom:16,cursor:"pointer"},
  todayBar:    {height:4,background:"#1e293b",borderRadius:2,overflow:"hidden",marginTop:9},
  todayFill:   {height:"100%",background:"linear-gradient(90deg,#6366f1,#ec4899)",borderRadius:2,transition:"width .5s"},
  secTitle:    {display:"flex",alignItems:"center",color:"#94a3b8",fontWeight:700,fontSize:13,marginBottom:10},
  subGrid:     {display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:16},
  subCard:     {background:"#1e293b",border:"1px solid #334155",borderRadius:11,padding:11},
};

const SC = {
  header: {width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#1e293b",border:"1px solid #334155",borderRadius:11,padding:"10px 13px",cursor:"pointer",fontFamily:"'Cairo',sans-serif"},
  num:    {width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,flexShrink:0},
  tasks:  {background:"rgba(15,23,42,.6)",border:"1px solid #334155",borderTop:"none",borderRadius:"0 0 11px 11px",padding:9},
};

const T = {
  header:      {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},
  progCard:    {background:"#1e293b",border:"1px solid #334155",borderRadius:13,padding:13,marginBottom:4},
  celebration: {textAlign:"center",padding:"34px 18px",background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.28)",borderRadius:18,marginTop:18,display:"flex",flexDirection:"column",alignItems:"center"},
};
