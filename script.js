const translations = {
  en: {
    home: "Home", tracker: "Screen time", goals: "Daily goals",
    challenges: "Challenges", statistics: "Statistics",
    sidebarNote: "Small steps make a big difference.",
    welcome: "YOUR MINDFUL SPACE", greeting: "Good day 👋",
    today: "YOUR DAILY CHECK-IN", introTitle: "Make room for what matters.",
    introText: "A little less scrolling, a little more living.",
    todaySummary: "Today's summary", screenToday: "Screen time today",
    dailyGoal: "Daily goal", goalProgress: "Goal progress", quickLinks: "Quick links",
    logTime: "Log screen time →", editGoal: "Edit your daily goal →",
    tryChallenge: "Try today's challenge →", trackerLabel: "TRACKER",
    trackerTitle: "Screen time", logScreenTime: "Log screen time",
    trackerDescription: "Add the time you spent on your devices today.",
    minutesLabel: "Minutes used", addTime: "Add time",
    todaysEntries: "Today's entries", totalToday: "Total today:",
    goalLabel: "YOUR TARGET", goalsTitle: "Daily goals", setGoal: "Set a daily goal",
    goalDescription: "Choose the maximum screen time you want each day.",
    goalHoursLabel: "Goal in hours", saveGoal: "Save goal",
    yourProgress: "Your progress today", challengeLabel: "ONE SMALL STEP",
    challengesTitle: "Challenges", todayChallenge: "TODAY'S CHALLENGE",
    challengeTitle: "Take a 30-minute screen break",
    challengeText: "Step away from your phone and enjoy a screen-free moment.",
    markComplete: "Mark as complete", completed: "Completed ✓",
    overview: "YOUR OVERVIEW", minutesStat: "Minutes logged today",
    entriesStat: "Time entries today", challengeStat: "Today's challenge",
    challengeDone: "Completed", challengePending: "Not yet",
    statsNote: "Your data stays saved on this device.",
    noEntries: "No entries yet. Add your first one above.",
    addedTime: "Time added successfully.", savedGoal: "Your daily goal was saved.",
    challengeMessage: "Nice work! Today's challenge is complete.",
    invalidMinutes: "Enter a number between 1 and 1440.",
    invalidGoal: "Enter a goal between 0.5 and 24 hours.",
    progressText: "of your daily goal used",
    screenTimeEntry: "Screen time"
  },
  ar: {
    home: "الرئيسية", tracker: "وقت الشاشة", goals: "الأهداف",
    challenges: "التحديات", statistics: "الإحصائيات",
    sidebarNote: "خطوات صغيرة بتعمل فرق كبير.",
    welcome: "مساحتك الرقمية الهادئة", greeting: "أهلًا بيك 👋",
    today: "متابعة النهارده", introTitle: "افسح مكان للحاجات المهمة.",
    introText: "تصفح أقل شوية، وحياة أكتر شوية.",
    todaySummary: "ملخص النهارده", screenToday: "وقت الشاشة النهارده",
    dailyGoal: "هدفك اليومي", goalProgress: "التقدم نحو الهدف", quickLinks: "اختصارات",
    logTime: "سجل وقت الشاشة ←", editGoal: "عدّل هدفك اليومي ←",
    tryChallenge: "جرّب تحدي النهارده ←", trackerLabel: "متابعة الوقت",
    trackerTitle: "وقت الشاشة", logScreenTime: "سجل وقت الشاشة",
    trackerDescription: "أضف الوقت اللي استخدمت فيه أجهزتك النهارده.",
    minutesLabel: "عدد الدقايق", addTime: "أضف الوقت",
    todaysEntries: "تسجيلات النهارده", totalToday: "الإجمالي النهارده:",
    goalLabel: "هدفك", goalsTitle: "الأهداف اليومية", setGoal: "حدد هدف يومي",
    goalDescription: "اختار أقصى وقت للشاشة مناسب ليك كل يوم.",
    goalHoursLabel: "الهدف بالساعات", saveGoal: "احفظ الهدف",
    yourProgress: "تقدمك النهارده", challengeLabel: "خطوة صغيرة",
    challengesTitle: "التحديات", todayChallenge: "تحدي النهارده",
    challengeTitle: "خد استراحة ٣٠ دقيقة من الشاشات",
    challengeText: "ابعد عن موبايلك شوية واستمتع بوقت من غير شاشة.",
    markComplete: "خلصت التحدي", completed: "اكتمل ✓",
    overview: "ملخصك", minutesStat: "الدقايق المسجلة النهارده",
    entriesStat: "عدد التسجيلات النهارده", challengeStat: "تحدي النهارده",
    challengeDone: "مكتمل", challengePending: "لسه",
    statsNote: "بياناتك محفوظة على الجهاز ده.",
    noEntries: "لسه مفيش تسجيلات. أضف أول تسجيل من فوق.",
    addedTime: "اتسجل الوقت بنجاح.", savedGoal: "اتحفظ هدفك اليومي.",
    challengeMessage: "عاش! خلصت تحدي النهارده.",
    invalidMinutes: "اكتب عدد دقايق من ١ إلى ١٤٤٠.",
    invalidGoal: "اكتب هدف من نص ساعة إلى ٢٤ ساعة.",
    progressText: "من هدفك اليومي تم استخدامه",
    screenTimeEntry: "وقت شاشة"
  }
};

const storageKey = "digitalDetoxData_v2";

function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

const data = loadData();
data.language = data.language || "ar";
data.goalMinutes = Number(data.goalMinutes) || 180;
data.days = data.days || {};
data.days[todayKey()] = data.days[todayKey()] || { entries: [], challengeDone: false };

function today() {
  return data.days[todayKey()];
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function totalMinutes() {
  return today().entries.reduce((sum, minutes) => sum + minutes, 0);
}

function duration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (data.language === "ar") {
    return `${hours ? `${hours} س ` : ""}${mins ? `${mins} د` : ""}` || "٠ د";
  }
  return `${hours}h ${mins}m`;
}

function translatePage() {
  const t = translations[data.language];
  document.documentElement.lang = data.language;
  document.documentElement.dir = data.language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t[element.dataset.i18n];
  });

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === document.body.dataset.page);
  });

  const languageButton = document.getElementById("languageButton");
  if (languageButton) languageButton.textContent = data.language === "ar" ? "English" : "العربية";
  const minutesInput = document.getElementById("minutesInput");
if (minutesInput) {
  minutesInput.placeholder = data.language === "ar" ? "٤٥" : "e.g. 45";
}
}

function updatePage() {
  const page = document.body.dataset.page;
  const total = totalMinutes();
  const percent = Math.min(Math.round((total / data.goalMinutes) * 100), 100);

  if (page === "home") {
    document.getElementById("homeTime").textContent = duration(total);
    document.getElementById("homeGoal").textContent = duration(data.goalMinutes);
    document.getElementById("homeProgress").textContent =
      data.language === "ar" ? `${toArabicDigits(percent)}٪` : `${percent}%`;
    document.getElementById("homeBar").style.width = `${percent}%`;
  }

  if (page === "tracker") {
    document.getElementById("trackerTotal").textContent = duration(total);
    document.getElementById("entryCount").textContent = today().entries.length;
    const list = document.getElementById("entryList");
    list.replaceChildren();

    if (today().entries.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty-entry";
      empty.textContent = translations[data.language].noEntries;
      list.append(empty);
    } else {
      [...today().entries].reverse().forEach((minutes) => {
        const item = document.createElement("li");
        item.className = "entry-row";
        const label = document.createElement("span");
        label.textContent = translations[data.language].screenTimeEntry;
        const value = document.createElement("strong");
        value.textContent = duration(minutes);
        item.append(label, value);
        list.append(item);
      });
    }
  }

  if (page === "goals") {
    document.getElementById("goalInput").value = (data.goalMinutes / 60).toString();
    document.getElementById("goalTime").textContent = duration(total);
    document.getElementById("goalDisplay").textContent = duration(data.goalMinutes);
    document.getElementById("goalBar").style.width = `${percent}%`;
    const shownPercent = data.language === "ar" ? toArabicDigits(percent) : percent;
    document.getElementById("goalProgressText").textContent =
      `${shownPercent}${data.language === "ar" ? "٪" : "%"} ${translations[data.language].progressText}`;
  }

  if (page === "challenges") {
    const button = document.getElementById("challengeButton");
    button.textContent = today().challengeDone
      ? translations[data.language].completed
      : translations[data.language].markComplete;
    document.getElementById("challengeMessage").textContent =
      today().challengeDone ? translations[data.language].challengeMessage : "";
  }

  if (page === "statistics") {
    document.getElementById("statsMinutes").textContent =
      data.language === "ar" ? toArabicDigits(total) : total;
    document.getElementById("statsEntries").textContent =
      data.language === "ar" ? toArabicDigits(today().entries.length) : today().entries.length;
    document.getElementById("statsTime").textContent = duration(total);
    document.getElementById("statsChallenge").textContent = today().challengeDone
      ? translations[data.language].challengeDone
      : translations[data.language].challengePending;
  }
}

function toArabicDigits(value) {
  return String(value).replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit]);
}

document.getElementById("languageButton").addEventListener("click", () => {
  data.language = data.language === "ar" ? "en" : "ar";
  saveData();
  translatePage();
  updatePage();
});

const timeForm = document.getElementById("timeForm");
if (timeForm) {
  timeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const minutes = Number(document.getElementById("minutesInput").value);
    const message = document.getElementById("trackerMessage");
    const t = translations[data.language];

    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) {
      message.textContent = t.invalidMinutes;
      message.style.color = "#c65d5d";
      return;
    }

    today().entries.push(minutes);
    saveData();
    message.textContent = t.addedTime;
    message.style.color = "";
    document.getElementById("minutesInput").value = "";
    updatePage();
  });
}

const goalForm = document.getElementById("goalForm");
if (goalForm) {
  goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const hours = Number(document.getElementById("goalInput").value);
    const message = document.getElementById("goalMessage");
    const t = translations[data.language];

    if (!Number.isFinite(hours) || hours < 0.5 || hours > 24) {
      message.textContent = t.invalidGoal;
      message.style.color = "#c65d5d";
      return;
    }

    data.goalMinutes = Math.round(hours * 60);
    saveData();
    message.textContent = t.savedGoal;
    message.style.color = "";
    updatePage();
  });
}

const challengeButton = document.getElementById("challengeButton");
if (challengeButton) {
  challengeButton.addEventListener("click", () => {
    today().challengeDone = !today().challengeDone;
    saveData();
    updatePage();
  });
}

translatePage();
updatePage();