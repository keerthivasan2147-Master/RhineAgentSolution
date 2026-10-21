const $ = id => document.getElementById(id);

const labels = {
  en: {
    welcome: "Welcome to RHINE. Whether you are starting with a business idea, establishing a new company, transforming an existing organization, or building an AI-enabled workforce, I can explain how RHINE helps turn your vision into structured, real-world operations. What would you like to build or improve?",
    enter: "Tell me what you want to build, improve or automate...",
    send: "Send",
    speak: "Speak answer",
    caption: "Captions [CC]",
    mic: "Microphone",
    newChat: "New chat",
    correct: "Correct",
    revise: "Needs correction",
    export: "Export QA",
    reviewTitle: "Knowledge and reply review",
    reviewDesc: "Mark answers and export corrections. No automatic model training occurs.",
    ready: "RHINE AI Business Advisor mode: verified operational guidance and intelligence.",
    loading: "Loading AI model into this browser. Download may be large; hardware support is required.",
    gpuFail: "Browser AI unavailable on this device. RHINE reference mode remains active.",
    aiReady: "RHINE AI Business Advisor ready (on-device model).",
    disclaimer: "Business architecture guidance, not binding commercial contract.",
    unsupported: "Voice output unavailable on this browser. Answer remains text.",
    micNotice: "Your browser may send microphone audio to its speech-recognition provider. Do not share sensitive information.",
    fallback: "Every company starts from a different point. RHINE designs the journey from that starting point to a structured, intelligent and operational business. Tell me what you want to build, or contact info@rhineme.com to arrange a consultation.",
    progress: "This download runs inside your browser and does not contact remote servers.",
    suggestions: [
      "What can RHINE build?",
      "From Idea to Operations",
      "Turn an idea into a company",
      "Transform or automate a company",
      "Need a platform or website",
      "AI agents for business roles"
    ]
  },
  ar: {
    welcome: "مرحباً بك في RHINE. سواء كنت تبدأ بفكرة عمل جديدة، أو تؤسس شركة، أو تطور مؤسسة قائمة، أو تبني قوى عاملة مدعومة بالذكاء الاصطناعي، يمكنني شرح كيف تحول RHINE رؤيتك إلى تشغيل فعلي منظم. ماذا تود أن تبني أو تطور؟",
    enter: "أخبرني بما تود بناءه أو تطويره أو أتمتته...",
    send: "إرسال",
    speak: "استمع للرد",
    caption: "الترجمة [CC]",
    mic: "ميكروفون",
    newChat: "محادثة جديدة",
    correct: "صحيح",
    revise: "يحتاج تصحيح",
    export: "تصدير الملاحظات",
    reviewTitle: "مراجعة المعرفة والردود",
    reviewDesc: "قيّم الإجابات وصدّر التصحيحات. لا يتم تدريب النموذج تلقائياً.",
    ready: "وضع مستشار الأعمال لـ RHINE: إرشادات مؤسسية وتشغيلية موثقة.",
    loading: "تحميل نموذج الذكاء الاصطناعي داخل المتصفح. يعتمد على الجهاز والذاكرة.",
    gpuFail: "محرك المتصفح غير متاح على هذا الجهاز. يمكن استخدام الإجابات المرجعية.",
    aiReady: "مستشار الأعمال لـ RHINE داخل المتصفح جاهز.",
    disclaimer: "إرشادات لهندسة الأعمال لا تمثل تعهداً تجارياً أو قانونياً ملزماً.",
    unsupported: "لا يوجد مشغل صوت متاح؛ يبقى الرد نصياً.",
    micNotice: "قد يستخدم المتصفح خدمة خارجية للتعرف على الصوت. لا تذكر بيانات حساسة.",
    fallback: "كل شركة تبدأ من نقطة مختلفة. تصمم RHINE المسار من تلك النقطة إلى عمل تشغيلي منظم وذكي. أخبرني بما تود بناءه أو تواصل معنا عبر info@rhineme.com لترتيب استشارة.",
    progress: "يتم تنزيل النموذج داخل المتصفح بأمان.",
    suggestions: [
      "ماذا يمكن لـ RHINE بناؤه؟",
      "من الفكرة إلى التشغيل الفعلي",
      "تحويل فكرة إلى شركة عاملة",
      "تطوير وأتمتة شركة قائمة",
      "بناء منصة أعمال أو موقع",
      "وكلاء ذكاء اصطناعي لأدوار محددة"
    ]
  }
};

let kb = null, engine = null, engineModel = "", lang = "en", history = [], last = null, waiting = false, qa = [], speakEpoch = 0, rec = null;

try {
  const a = JSON.parse(localStorage.getItem("rhineIndependentQA") || "[]");
  if (Array.isArray(a)) qa = a.slice(-100);
} catch {}

const stopEn = new Set("is the a an how what do does are can of this that it in and for with to on give me about tell explain".split(" "));
const stopAr = new Set("ما ماذا كيف من عن هي هو في على مع هذا هذه شركة اي هل شرح لي".split(" "));

function norm(t) {
  return String(t || "").toLowerCase().normalize("NFKC")
    .replace(/[\u064b-\u065f\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}-]/gu, " ")
    .trim();
}

function tokens(t) {
  const stop = lang === "ar" ? stopAr : stopEn;
  const res = [];
  for (const x of norm(t).split(/\s+/)) {
    if (x.length < 2 || stop.has(x)) continue;
    res.push(x);
    if (lang === "ar" && x.startsWith("ال") && x.length > 4) res.push(x.slice(2));
  }
  return res;
}

function retrieve(text) {
  if (!kb || !kb.topics) return [];
  const tt = new Set(tokens(text));
  const query = norm(text);
  const scored = kb.topics.map(t => {
    const k = t["keywords_" + lang] || "";
    const terms = new Set(tokens(k + " " + t.title + " " + (t[lang] || "")));
    let score = 0;
    for (const v of tt) {
      if (terms.has(v)) score += 3;
      if (tokens(k).includes(v)) score += 5;
    }
    if (t.id === "rhine_company" && (tt.has("rhine") || tt.has("راين"))) score += 15;
    if (t.id === "ocean_lcl" && (query.includes("lcl") || query.includes("جزئي"))) score += 15;
    if (t.id === "ocean_fcl" && (query.includes("fcl") || query.includes("كامله"))) score += 15;
    return [score, t];
  }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]);

  return scored.length ? scored.slice(0, 3).map(x => x[1]) : kb.topics.filter(x => x.id === "rhine_company");
}

function policy(q) {
  const s = norm(q);
  if (/\b(book|reserve|confirm)\s+(?:\d+\s+)?(containers?|cargo|shipments?|space)\b/i.test(q) ||
      /\b(give|send|provide)\s+(me|us)\s+(a\s+)?(firm\s+|live\s+)?(price|rate|quote)\b/i.test(q) ||
      s.includes("confirm booking") || s.includes("سعر الشحن") || s.includes("احجز الشحن")) {
    return lang === "ar"
      ? "يمكنني توضيح بيانات طلب عرض السعر، ولكن لا أستطيع الحجز أو تأكيد السعر أو مساحات الشحن. يجب مراجعة الناقل والمتخصص البشري."
      : "I can help structure your enquiry, but cannot book shipments, confirm carrier space or issue binding live rates. A licensed provider must verify all details.";
  }
  return null;
}

function curated(q, refs) {
  const result = policy(q);
  if (result) return { text: result, mode: "commercial safety rule" };
  if (!refs.length) return { text: labels[lang].fallback, mode: "reference fallback" };
  return {
    text: refs.map(t => t[lang]).filter(Boolean).slice(0, 2).join("\n\n"),
    mode: "curated reference (not LLM)"
  };
}

function bubble(who, text, refs = [], mode = "") {
  const e = document.createElement("article");
  e.className = "bubble " + who;
  e.dir = lang === "ar" ? "rtl" : "ltr";
  const n = document.createElement("div");
  n.className = "who";
  n.textContent = who === "user" ? "Visitor" : "Rhine Agent" + (mode ? " · " + mode : "");
  const p = document.createElement("p");
  p.textContent = text;
  e.append(n, p);

  if (who !== "user" && refs.length) {
    const d = document.createElement("details");
    const sum = document.createElement("summary");
    sum.textContent = lang === "ar" ? "المواضيع والمراجع العامة" : "Reference topics and sources";
    d.append(sum);
    for (const t of refs) {
      const line = document.createElement("p");
      line.textContent = t.title + " — " + (t.review || "Pending review");
      d.append(line);
      for (const url of (t.sources || [])) {
        if (!url.startsWith("https://")) continue;
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = new URL(url).hostname;
        d.append(a);
      }
    }
    e.append(d);
  }

  $("feed").append(e);
  $("feed").scrollTop = $("feed").scrollHeight;
}

function status(s) {
  $("status").textContent = s;
}

function clear() {
  history = [];
  last = null;
  $("feed").replaceChildren();
  bubble("assistant", labels[lang].welcome);
  status(labels[lang].ready);
}

function switchLang(x) {
  if (waiting) return;
  lang = x;
  document.documentElement.lang = lang;
  document.documentElement.dir = x === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === x)));
  const l = labels[lang];
  $("question").placeholder = l.enter;
  $("submit").textContent = l.send;
  $("mic").textContent = l.mic;
  $("speak").textContent = l.speak;
  if ($("toggleCc")) $("toggleCc").textContent = l.caption;
  $("clear").textContent = l.newChat;
  $("correct").textContent = l.correct;
  $("revise").textContent = l.revise;
  $("export").textContent = l.export;
  $("reviewTitle").textContent = l.reviewTitle;
  $("reviewDesc").textContent = l.reviewDesc;
  $("samples").replaceChildren();

  if (l.suggestions && l.suggestions.length > 0) {
    // 1. What can RHINE build?
    const firstQ = l.suggestions[0];
    const b1 = document.createElement("button");
    b1.type = "button";
    b1.textContent = firstQ;
    b1.addEventListener("click", () => {
      $("question").value = firstQ;
      ask(firstQ);
      if (window.rhineAvatar) {
        if (!window.rhineAvatar.isOpen) window.rhineAvatar.open();
        window.rhineAvatar.ask(firstQ);
      }
    });
    $("samples").append(b1);

    // 2. Schedule a Meeting button (right after What can RHINE build?)
    const meetBtn = document.createElement("button");
    meetBtn.type = "button";
    meetBtn.className = "meeting-btn";
    meetBtn.id = "stagingMeetingBtn";
    meetBtn.textContent = lang === "ar" ? "📅 حجز اجتماع مع RHINE" : "📅 Schedule a Meeting";
    meetBtn.addEventListener("click", () => {
      if (window.rhineAvatar) {
        if (!window.rhineAvatar.isOpen) window.rhineAvatar.open();
        if (typeof window.rhineAvatar.startMeetingFlow === "function") {
          window.rhineAvatar.startMeetingFlow();
        } else if (typeof window.rhineAvatar._startMeetingFlow === "function") {
          window.rhineAvatar._startMeetingFlow();
        }
      }
    });
    $("samples").append(meetBtn);

    // 3. Remaining suggestion chips
    for (let i = 1; i < l.suggestions.length; i++) {
      const q = l.suggestions[i];
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = q;
      b.addEventListener("click", () => {
        $("question").value = q;
        ask(q);
        if (window.rhineAvatar) {
          if (!window.rhineAvatar.isOpen) window.rhineAvatar.open();
          window.rhineAvatar.ask(q);
        }
      });
      $("samples").append(b);
    }
  }

  // Also sync avatar widget language if open
  if (window.rhineAvatar) {
    if (typeof window.rhineAvatar.setLanguage === "function") {
      window.rhineAvatar.setLanguage(lang);
    } else {
      window.rhineAvatar.options.language = lang;
    }
  }

  clear();
}

window.setStagingLanguage = function(newLang) {
  if (newLang && newLang !== lang) {
    switchLang(newLang);
  }
};

async function enableAI() {
  if (engine) return;
  if (!navigator.gpu) {
    status(labels[lang].gpuFail);
    $("engineState").textContent = "WebGPU unavailable · reference mode";
    return;
  }
  const btn = $("enable");
  btn.disabled = true;
  status(labels[lang].loading);
  $("progress").textContent = labels[lang].progress;

  try {
    const mlc = await import("https://esm.run/@mlc-ai/web-llm");
    const ids = mlc.prebuiltAppConfig.model_list.map(x => x.model_id);
    const choices = ["Qwen2.5-0.5B-Instruct-q4f16_1-MLC", "Qwen3-0.6B-q4f16_1-MLC", "Llama-3.2-1B-Instruct-q4f16_1-MLC"];
    const id = choices.find(x => ids.includes(x));
    if (!id) throw Error("No supported model mapping");
    engineModel = id;
    engine = await mlc.CreateMLCEngine(id, {
      initProgressCallback: p => {
        $("progress").textContent = (p.text || "Downloading AI model") + " " + Math.round((p.progress || 0) * 100) + "%";
      }
    });
    $("engineName").textContent = "Browser model: " + id;
    $("engineState").textContent = "On-device WebGPU · no API token";
    $("progress").textContent = "AI ready · multilingual output is experimental";
    status(labels[lang].aiReady);
    // Let the avatar widget know browser AI is active
    if (window.rhineAvatar) {
      window.rhineAvatar.setCaptionAndSpeak(
        "Browser AI is now enabled. You can ask me advanced questions using on-device AI. No cloud connection required.",
        true
      );
    }
  } catch (e) {
    engine = null;
    btn.disabled = false;
    $("engineState").textContent = "Reference-only (model unavailable)";
    $("progress").textContent = "Model failed: " + String(e.message || e).slice(0, 170);
    status(labels[lang].gpuFail);
  }
}

async function ask(q) {
  q = String(q || "").trim();
  if (waiting || !q || q.length > 650) return;
  $("question").value = "";
  bubble("user", q);
  waiting = true;
  $("submit").disabled = true;
  const refs = retrieve(q);
  let reply = curated(q, refs);

  try {
    if (engine && !policy(q)) {
      status(lang === "ar" ? "جارٍ توليد الرد داخل المتصفح…" : "Generating in your browser…");
      const base = (lang === "ar" ? "أجب بالعربية فقط. " : "Answer only in English. ") +
        "You are Rhine Agent, a nonproduction educational assistant. Distinguish RHINE intelligent workforce technology from generic logistics knowledge. Only use candidate facts. Under 90 words.\n" +
        refs.map(t => t.title + ": " + t[lang]).join("\n");
      const messages = [{ role: "system", content: base }, ...history.slice(-4), { role: "user", content: q }];
      const ans = await engine.chat.completions.create({ messages, max_tokens: 180, temperature: 0.2 });
      const s = ans.choices?.[0]?.message?.content?.trim();
      if (s) {
        reply = { text: s.replace(/<think>[\s\S]*?<\/think>/g, "").trim(), mode: "experimental in-browser Qwen" };
      }
    } else if (!engine) {
      status(labels[lang].ready);
    }
  } catch (e) {
    reply = curated(q, refs);
    status("Model error: reference-only answer");
  }

  bubble("assistant", reply.text, refs, reply.mode);
  last = { q, reply: reply.text, mode: reply.mode, lang, ids: refs.map(t => t.id) };
  history.push({ role: "user", content: q }, { role: "assistant", content: reply.text });
  history = history.slice(-8);
  waiting = false;
  $("submit").disabled = false;

  // Sync to floating voice avatar widget (update transparent captions & video speech)
  if (window.rhineAvatar) {
    window.rhineAvatar.setCaptionAndSpeak(reply.text, true);
  }
}

function speak() {
  if (!last) return status(labels[lang].unsupported);

  // Trigger avatar widget voice + transparent captions (preferred)
  if (window.rhineAvatar) {
    if (!window.rhineAvatar.isOpen) window.rhineAvatar.open();
    window.rhineAvatar.setCaptionAndSpeak(last.reply, true);
    status("AI Presenter speaking...");
    return;
  }

  // Browser-native fallback TTS
  if (!("speechSynthesis" in window)) return status(labels[lang].unsupported);
  const voices = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith(lang));
  const preferred = lang === "en"
    ? ["samantha", "victoria", "karen", "moira", "zira", "susan"]
    : ["layla", "maged"];
  let match = null;
  for (const s of preferred) {
    match = voices.find(v => v.name.toLowerCase().includes(s));
    if (match) break;
  }
  if (!match) match = voices[0];
  if (!match) return status(labels[lang].unsupported);
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(last.reply.slice(0, 600));
  u.voice = match;
  u.lang = match.lang;
  u.rate = 0.95;
  speechSynthesis.speak(u);
  status(match.name + " · " + match.lang);
}

function mic() {
  const API = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!API) {
    status(labels[lang].micNotice + " Feature unavailable in this browser.");
    return;
  }
  // If currently recording, stop
  if (rec) {
    rec.stop();
    rec = null;
    $("mic").textContent = labels[lang].mic;
    $("mic").classList.remove("recording");
    return;
  }

  status(labels[lang].micNotice);
  $("mic").textContent = lang === "ar" ? "جارٍ الاستماع..." : "Listening...";
  $("mic").classList.add("recording");

  const r = new API();
  rec = r;
  r.lang = lang === "en" ? "en-US" : "ar-SA";
  r.interimResults = false;
  r.continuous = false;

  r.onresult = e => {
    const transcript = e.results[0][0].transcript;
    if (transcript) {
      $("question").value = transcript;
      // Auto-submit the captured speech as a question
      ask(transcript);
    }
  };

  r.onerror = e => {
    status(e.error === "not-allowed"
      ? "Microphone permission denied. Please allow microphone access in your browser settings."
      : ("Voice error: " + e.error));
  };

  r.onend = () => {
    rec = null;
    $("mic").textContent = labels[lang].mic;
    $("mic").classList.remove("recording");
  };

  r.start();
}

function rating(value) {
  if (!last) return;
  qa.push({ at: new Date().toISOString(), ...last, feedback: value, correction: $("correction").value.trim(), status: "HUMAN_REVIEW_REQUIRED" });
  qa = qa.slice(-100);
  try {
    localStorage.setItem("rhineIndependentQA", JSON.stringify(qa));
  } catch {}
  $("correction").value = "";
  status("Feedback saved locally; no automatic training");
}

function exportQA() {
  const b = new Blob([JSON.stringify({ review: "pending", model_training: false, items: qa }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rhine-independent-staging-qa.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

$("ask").addEventListener("submit", e => {
  e.preventDefault();
  ask($("question").value);
});

document.querySelectorAll("[data-lang]").forEach(b => {
  b.addEventListener("click", () => switchLang(b.dataset.lang));
});

$("enable").addEventListener("click", enableAI);
$("speak").addEventListener("click", speak);
if ($("toggleCc")) {
  $("toggleCc").addEventListener("click", () => {
    if (window.rhineAvatar) {
      if (!window.rhineAvatar.isOpen) {
        window.rhineAvatar.open();
      }
      window.rhineAvatar.toggleCaptions();
      const state = window.rhineAvatar.isCaptionsVisible ? "ON" : "OFF";
      status("AI Assistant captions: " + state);
    }
  });
}
$("mic").addEventListener("click", mic);
$("clear").addEventListener("click", clear);
$("correct").addEventListener("click", () => rating("correct"));
$("revise").addEventListener("click", () => rating("needs_correction"));
$("export").addEventListener("click", exportQA);

// Hook sample question pills on main page
document.querySelectorAll("#samples button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("meeting-btn") || btn.id === "stagingMeetingBtn") {
      if (window.rhineAvatar) {
        if (!window.rhineAvatar.isOpen) window.rhineAvatar.open();
        if (typeof window.rhineAvatar.startMeetingFlow === "function") {
          window.rhineAvatar.startMeetingFlow();
        } else if (typeof window.rhineAvatar._startMeetingFlow === "function") {
          window.rhineAvatar._startMeetingFlow();
        }
      }
      return;
    }
    const q = btn.textContent.trim();
    if (q) {
      $("question").value = q;
      ask(q);
      if (window.rhineAvatar) {
        if (!window.rhineAvatar.isOpen) window.rhineAvatar.open();
        window.rhineAvatar.ask(q);
      }
    }
  });
});

async function main() {
  try {
    const r = await fetch("/kb.json", { cache: "no-store" });
    kb = await r.json();
  } catch {
    kb = { topics: [] };
    status("Knowledge retrieval failed");
  }
  switchLang("en");
  if (!navigator.gpu) {
    $("engineState").textContent = "WebGPU not detected · reference-only mode";
  }
}

main();
