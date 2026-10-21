/**
 * Rhine AI Avatar Presenter - Overlay Mode (D-ID / HeyGen Style)
 * Full-height video background with transparent floating captions & chat textbox.
 * Embedded intelligence for RHINE Middle East FZE — People and AI. Working for What's Next.
 */
(function (global) {
  'use strict';

  const ICONS = {
    close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    send: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    speakerOn: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    speakerMuted: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,
    replay: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    mic: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    micOff: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
  };

  // RHINE AI Business Advisor — Core Knowledge Base
  // Positioned as Business Advisor: turning ideas into structured operating businesses.
  // Strictly no supply chain, staffing, or manpower supply.
  // Topic title map for dynamic heading updates as per user question
  const TOPIC_TITLES = {
    en: {
      morning_greeting: "Welcome to RHINE",
      evening_greeting: "Welcome to RHINE",
      night_greeting: "Welcome to RHINE",
      greeting: "Welcome to RHINE",
      who_are_you: "RHINE Business Advisor",
      company: "About RHINE Middle East",
      process: "From Idea to Operations",
      idea_to_company: "Turn Idea into a Company",
      transform_company: "Transform Existing Business",
      platform_website: "Platform & Digital Guidance",
      what_we_build: "What RHINE Can Build",
      ai_agents: "Governed Digital Workforce",
      complete_solution: "Complete RHINE Solution",
      solutions: "RHINE Platform Capabilities",
      pillars: "Operating Capability",
      qualification: "Business Qualification",
      contact: "Contact & Consultation",
      hours: "Operating Hours",
      pricing: "Tailored Project Scoping",
      website_info: "Platform Guidance",
      off_topic: "RHINE Company Scope",
      fallback: "RHINE Platform Guidance"
    },
    ar: {
      morning_greeting: "مرحباً بك في RHINE",
      evening_greeting: "مرحباً بك في RHINE",
      night_greeting: "مرحباً بك في RHINE",
      greeting: "مرحباً بك في RHINE",
      who_are_you: "مستشار الأعمال لـ RHINE",
      company: "عن شركة RHINE Middle East",
      process: "من الفكرة إلى التشغيل الفعلي",
      idea_to_company: "تحويل فكرة إلى شركة عاملة",
      transform_company: "تطوير وأتمتة شركة قائمة",
      platform_website: "إرشادات المنصة والموقع",
      what_we_build: "ماذا تبني RHINE",
      ai_agents: "قوى عاملة رقمية محكومة",
      complete_solution: "حلول RHINE المتكاملة",
      solutions: "قدرات منصة RHINE",
      pillars: "بيئة التشغيل المتكاملة",
      qualification: "تحديد مسار العمل",
      contact: "التواصل والاستشارة",
      hours: "أوقات العمل",
      pricing: "تحديد نطاق المشروع",
      website_info: "إرشادات المنصة",
      off_topic: "تنبيه نطاق RHINE",
      fallback: "إرشادات منصة RHINE"
    }
  };

  // RHINE AI Business Advisor — Core Knowledge Base
  // Positioned as Platform Guidance & Business Architecture: turning ideas into structured operating businesses.
  // Strictly no supply chain, staffing, or manpower supply.
  const RHINE_KNOWLEDGE = {
    en: {
      morning_greeting: "Good morning! How can I help you today?",
      evening_greeting: "Good evening! How can I help you today?",
      night_greeting: "Good night! How can I help you today?",
      greeting: "Hello! Welcome to RHINE. How can I help you today?",
      who_are_you: "I am the RHINE AI Business Advisor. I help entrepreneurs and organizations move from an idea or business challenge into a structured, technology-enabled operating company with governed digital agents and platform guidance.",
      company: "RHINE MIDDLE EAST FZE is more than an AI Agent Factory. RHINE helps entrepreneurs, companies, and organizations move from an idea or existing challenge to a structured, technology-enabled operating business. We bring together business design, organizational structure, operational workflows, digital platforms, corporate websites, professional knowledge, human expertise, and governed AI agents built for real work.",
      solutions: "Depending on your needs, RHINE designs and develops: 1. Business concepts and operating models. 2. Organizational structures, departments, and authority levels. 3. Operational workflows and business processes. 4. Industry-specific digital platforms and corporate websites. 5. Governed AI agents for specific professional roles. 6. Knowledge standards, approval paths, and continuous improvement systems.",
      what_we_build: "Depending on client needs, RHINE designs and develops: business concepts and operating models, organizational structures and authority levels, operational workflows, industry-specific digital platforms, corporate websites, governed AI agents for professional roles, and governance frameworks with continuous improvement.",
      process: "From Idea to Operations is RHINE's structured 5-stage transformation roadmap: Stage 1 UNDERSTAND — we study the business idea, objectives, and operating reality. Stage 2 ORGANIZE — we define departments, positions, responsibilities, and decision structures. Stage 3 DESIGN — we design the operating model, digital platform, website, and human-AI workforce. Stage 4 PREPARE — we build, configure, test, and prepare systems and workflows. Stage 5 OPERATE & IMPROVE — we support live operations with ongoing governance.",
      idea_to_company: "Turning an idea into a company is about building an operating business entity from scratch. RHINE provides end-to-end platform guidance: we help you formulate your commercial value proposition, define your core business functions, establish your client-facing digital platform, and embed governed digital agents so your company can execute real transactions from day one without heavy operational overhead.",
      transform_company: "For existing companies, RHINE reviews your operational workflows and decision bottlenecks, introduces governed AI agents into specific professional roles, and redesigns your processes to automate routine tasks while enhancing governance and control.",
      platform_website: "RHINE provides comprehensive platform guidance: we design and build industry-specific digital platforms and professional corporate websites that serve as the operating interface connecting your human team, clients, and governed AI agents.",
      ai_agents: "RHINE governed digital agents are software workers purpose-built for specific professional roles within defined permissions, knowledge boundaries, approval paths, and audit constraints — operating alongside your team with governed execution.",
      complete_solution: "The complete RHINE solution unifies our five core capabilities: business design, organizational structure, operational workflows, digital platforms and websites, and governed AI agents. We guide you through our 5-stage journey from idea to real, continuous operations.",
      pillars: "RHINE does not simply deliver isolated AI agents. An AI agent is one component of a complete business solution. RHINE's wider purpose is to build the operating environment in which people, technology, professional knowledge, and governed AI agents work together effectively. The result is a structured operating capability designed around your real business.",
      qualification: "Which situation best describes you? 1. I have a business idea and want to turn it into an operating company. 2. I already have a company and want to transform or automate it. 3. I need a business platform or professional website. 4. I want AI agents for specific business roles. 5. I want to understand the complete RHINE solution. Tell me your choice, and I will guide you.",
      contact: "Every company starts from a different point. RHINE designs the journey from that starting point to a structured, intelligent and operational business. Contact RHINE Middle East FZE directly: Phone +971 4 8818618, Email info@rhineme.com, JAFZA One, Office No: FZJOBB1609, Jebel Ali Freezone, Dubai, UAE (P.O. Box: 215142). We invite you to arrange a consultation.",
      hours: "RHINE Middle East FZE operates Monday to Friday, 8:00 AM to 5:00 PM Gulf Standard Time in JAFZA One, Jebel Ali Freezone, Dubai, UAE. For urgent enquiries please email info@rhineme.com.",
      pricing: "RHINE project development is tailored to your business scope and operating requirements. Contact us at +971 4 8818618 or info@rhineme.com to discuss your project and arrange an exploratory consultation.",
      website_info: "This platform is the RHINE AI Business Advisor. It features voice interaction, live captions on demand, curated business architecture knowledge, and interactive qualification to help turn your ideas into operations.",
      off_topic: "I don't have information on that type of topic. I can only provide company details and platform guidance for RHINE Middle East FZE. Please visit our website at rhineme.com or ask me how RHINE helps structure and operate your business.",
      fallback: "I don't have information on that type of question. I can only provide company details and platform guidance for RHINE Middle East FZE. For full information, please visit our website at rhineme.com or ask about RHINE's business platforms and services."
    },
    ar: {
      morning_greeting: "صباح الخير! كيف يمكنني مساعدتك اليوم؟",
      evening_greeting: "مساء الخير! كيف يمكنني مساعدتك اليوم؟",
      night_greeting: "تصبح على خير! كيف يمكنني مساعدتك اليوم؟",
      greeting: "أهلاً وسهلاً بك في RHINE! كيف يمكنني مساعدتك اليوم؟",
      who_are_you: "أنا مستشار الأعمال الذكي لـ RHINE. أساعد رواد الأعمال والشركات على الانتقال من فكرة أو تحدٍ تجاري إلى عمل تشغيلي منظم ومدعوم بالتقنية عبر إرشادات المنصة والوكلاء الرقميين المحكومين.",
      company: "RHINE Middle East FZE هي أكثر من مجرد مصنع لوكلاء الذكاء الاصطناعي. نساعد رواد الأعمال والشركات والمؤسسات على الانتقال من فكرة أو تحدٍ تجاري إلى عمل تشغيلي منظم ومدعوم بالتقنية. نجمع بين تصميم الأعمال، والهيكل التنظيمي، وسير العمل التشغيلي، والمنصات الرقمية، والمواقع المؤسسية، والمعرفة المهنية، والخبرة البشرية، ووكلاء الذكاء الاصطناعي الخاضعين للحوكمة والمبنيين لمهام حقيقية.",
      solutions: "وفقاً لاحتياجاتك، تساعد RHINE في تصميم وتطوير: 1. مفاهيم ونماذج الأعمال التشغيلية. 2. الهياكل التنظيمية والأقسام والصلاحيات. 3. إجراءات وسير العمل التشغيلي. 4. المنصات الرقمية والمواقع المؤسسية. 5. وكلاء ذكاء اصطناعي خاضعين للحوكمة لأدوار مهنية محددة. 6. معايير المعرفة ومسارات الاعتماد والحوكمة وأنظمة التطوير المستمر.",
      what_we_build: "تساعد RHINE في تصميم وتطوير: مفاهيم الأعمال ونماذج التشغيل؛ الهياكل التنظيمية ومستويات السلطة؛ مسارات وسير العمليات التشغيلية؛ المنصات الرقمية والمواقع المؤسسية؛ وكلاء ذكاء اصطناعي محكومين لأدوار وظيفية محددة؛ وأطر الحوكمة والمراجعة والتحسين المستمر.",
      process: "من الفكرة إلى التشغيل الفعلي هي خارطة طريق RHINE المنظمة من 5 مراحل: المرحلة 1 الفهم — ندرس فكرة العمل والأهداف والواقع التشغيلي. المرحلة 2 التنظيم — نحدد الأقسام وهياكل القرارات. المرحلة 3 التصميم — نصمم المنصة الرقمية ونموذج التشغيل والتكامل مع الذكاء الاصطناعي. المرحلة 4 التجهيز — نبني ونختبر ونجهز مسارات العمل والأنظمة. المرحلة 5 التشغيل والتحسين — ندعم الانتقال إلى التشغيل الواقعي والتحسين المستمر.",
      idea_to_company: "تحويل فكرة إلى شركة عاملة يركز على تأسيس وبناء كيان تشغيلي متكامل من الصفر. تقدم RHINE إرشادات تأسيسية متكاملة للمنصة: نساعدك على صياغة القيمة التجارية لمشروعك، وتحديد وظائف العمل الأساسية، وتجهيز منصة تشغيلية للتفاعل مع العملاء، ودمج وكلاء رقميين محكومين لإدارة المعاملات اليومية بكفاءة عالية وبدون أعباء تشغيلية ضخمة.",
      transform_company: "للشركات القائمة، تدرس RHINE مسارات العمل ومواضع التعطيل، وتدمج وكلاء ذكاء اصطناعي محكومين في أدوار محددة، وتعيد هيكلة الإجراءات لزيادة الكفاءة والأتمتة مع الحوكمة والرقابة الكاملة.",
      platform_website: "تقدم RHINE إرشادات متكاملة للمنصات الرقمية: نصمم ونبني منصات متخصصة ومواقع مؤسسية وتشغيلية متطورة تمثل واجهة التشغيل المركزية لفريق عملك وعملائك ووكلاء الذكاء الاصطناعي.",
      ai_agents: "وكلاء RHINE المحكومين هم قوى عاملة رقمية مصممة لأدوار مهنية محددة، تعمل ضمن صلاحيات ومعرفة ومسارات اعتماد وسجلات تدقيق محددة، ليعملوا جنباً إلى جنب مع فريقك بحوكمة تامة.",
      complete_solution: "الحل المتكامل من RHINE يوحد ركائزنا الخمس: تصميم الأعمال، الهيكل التنظيمي، العمليات التشغيلية، المنصات والمواقع الرقمية، ووكلاء الذكاء الاصطناعي المحكومين، لنقودك عبر رحلتنا من 5 مراحل من الفكرة إلى التشغيل الفعلي المستمر.",
      pillars: "لا تقدم RHINE مجرد وكلاء ذكاء اصطناعي معزولين. وكيل الذكاء الاصطناعي هو جزء واحد من حل متكامل. هدف RHINE الأوسع هو بناء بيئة العمل التي تتكامل فيها الكفاءات البشرية والتقنية والمعرفة المهنية ووكلاء الذكاء الاصطناعي المحكومين، لتحقيق قدرة تشغيلية منظمة مصممة حول عملك الحقيقي.",
      qualification: "أي الحالات التالية تصف احتياجك الأفضل؟ 1. لدي فكرة عمل وأريد تحويلها إلى شركة عاملة. 2. لدي شركة قائمة وأريد تطويرها أو أتمتتها. 3. أحتاج إلى منصة أعمال أو موقع احترافي. 4. أريد وكلاء ذكاء اصطناعي لأدوار محددة. 5. أريد فهم حلول RHINE المتكاملة. أخبرني باختيارك وسأوجهك للمسار الأنسب.",
      contact: "كل شركة تبدأ من نقطة مختلفة. تصمم RHINE المسار من تلك النقطة إلى عمل تجاري منظم وذكي وعامل. تواصل مع RHINE Middle East FZE: هاتف 97148818618+، بريد info@rhineme.com، جافزا ون، مكتب رقم FZJOBB1609، المنطقة الحرة لجبل علي، دبي، الإمارات (ص.ب: 215142). نرحب بترتيب استشارة أولية.",
      hours: "تعمل RHINE Middle East FZE من الاثنين إلى الجمعة من الساعة 8:00 صباحاً حتى 5:00 مساءً بتوقيت الخليج في جافزا ون، المنطقة الحرة لجبل علي، دبي. للاستفسارات راسل info@rhineme.com.",
      pricing: "يعتمد تطوير مشاريع RHINE على نطاق العمل والمتطلبات التشغيلية لشركتك. تواصل معنا على 97148818618+ أو info@rhineme.com لترتيب استشارة استكشافية.",
      website_info: "هذا هو مستشار الأعمال الذكي لـ RHINE. يتيح التفاعل الصوتي، وإرشادات المنصة المتقدمة، وقاعدة معرفية لهندسة الأعمال، والمساعدة التفاعلية لتحويل أفكارك إلى تشغيل واقعي.",
      off_topic: "لا تتوفر لدي معلومات حول هذا النوع من الأسئلة. أختص فقط بتقديم معلومات الشركة وإرشادات منصة RHINE Middle East FZE. لمزيد من المعلومات، يرجى زيارة موقعنا الإلكتروني rhineme.com أو سؤالي عن كيفية مساعدة RHINE في تأسيس وتشغيل أعمالك.",
      fallback: "لا تتوفر لدي معلومات حول هذا النوع من الأسئلة. أختص فقط بتقديم معلومات الشركة وإرشادات منصة RHINE Middle East FZE. لمزيد من التفاصيل، يرجى زيارة موقعنا rhineme.com أو سؤالي عن كيفية مساعدة RHINE في بناء وتشغيل أعمالك."
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // MEETING FLOW — bilingual strings & step definitions
  // ─────────────────────────────────────────────────────────────────────────
  const MEETING_TEXT = {
    en: {
      offerQ: "Would you like me to help arrange a meeting with the RHINE team to discuss your business requirements?",
      offerYes: "Yes, Arrange a Meeting",
      offerNo: "Not Now",
      steps: [
        { key: "fullName",        label: "Full Name",              prompt: "Great. I will collect the required information one step at a time.\n\nWhat is your full name?",                                                                          validate: (v) => v.trim().length >= 2 ? null : "Please enter your full name (at least 2 characters)." },
        { key: "companyName",     label: "Company Name",           prompt: (d) => `Thank you, ${d.fullName}.\n\nWhat is the name of your company?`,                                                                                               validate: (v) => v.trim().length >= 1 ? null : "Please enter your company name." },
        { key: "website",         label: "Company Website",        prompt: "What is your company's website address?\n\nIf your company does not currently have a website, please tap No Website.",                                                   validate: () => null, optional: true },
        { key: "email",           label: "Email Address",          prompt: "What email address should the RHINE team use to contact you?",                                                                                                         validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Please enter a valid email address (e.g. name@company.com)." },
        { key: "telephone",       label: "Telephone / Mobile",     prompt: "What is your telephone or mobile number?\n\nPlease include the country code (e.g. +971 50 123 4567).",                                                                 validate: (v) => /^\+[1-9][\d\s\-().]{5,20}$/.test(v.trim()) ? null : "Please include the country code starting with + (e.g. +971 50 123 4567)." },
        { key: "topic",           label: "Meeting Topic",          prompt: "What would you like to discuss with the RHINE team?\n\nYou may describe your business idea, existing company, required platform, website, AI agents, or any other relevant requirement. I will include your complete message in the meeting request.", validate: (v) => v.trim().length >= 10 ? null : "Please provide a brief description of what you would like to discuss (at least 10 characters)." },
        { key: "preferredTime",   label: "Preferred Meeting Time", prompt: "When would you prefer to meet? Please indicate your preferred date, time, and time zone.\n\nFor example: Monday 20 November 2026, 10:00 AM Gulf Standard Time.",   validate: (v) => v.trim().length >= 3 ? null : "Please enter a preferred meeting date and time." }
      ],
      reviewTitle: "Please review your meeting request before we send it to the RHINE team.",
      confirmBtn: "Confirm & Send Request",
      editBtn: "Edit Information",
      cancelBtn: "Cancel",
      submitting: "Sending your meeting request to the RHINE team...",
      successTitle: "Meeting Request Sent",
      successMsg: (name) => `Thank you, ${name}. Your meeting request has been sent to the RHINE team. A team member will be in touch with you shortly at the email address you provided.`,
      failTitle: "Sending Failed",
      failMsg: "We were unable to send your meeting request at this time. Please try again or contact us directly at info@rhineme.com or +971 4 8818618.",
      retryBtn: "Try Again",
      closeBtn: "Close",
      noWebsite: "No Website",
      validationError: (msg) => `⚠ ${msg}\n\nPlease try again:`,
      editFormTitle: "Edit Your Information",
      editSaveBtn: "Save Changes",
      editCancelBtn: "Back to Review"
    },
    ar: {
      offerQ: "هل تودّ مني ترتيب اجتماع مع فريق RHINE لمناقشة متطلبات عملك؟",
      offerYes: "نعم، رتّب لي اجتماعاً",
      offerNo: "ليس الآن",
      steps: [
        { key: "fullName",        label: "الاسم الكامل",           prompt: "ممتاز. سأجمع المعلومات المطلوبة خطوة بخطوة.\n\nما اسمك الكامل؟",                                                                                                    validate: (v) => v.trim().length >= 2 ? null : "الرجاء إدخال اسمك الكامل (حرفان على الأقل)." },
        { key: "companyName",     label: "اسم الشركة",             prompt: (d) => `شكراً لك، ${d.fullName}.\n\nما اسم شركتك؟`,                                                                                                                     validate: (v) => v.trim().length >= 1 ? null : "الرجاء إدخال اسم شركتك." },
        { key: "website",         label: "الموقع الإلكتروني",      prompt: "ما عنوان موقع شركتك الإلكتروني؟\n\nإذا لم يكن لشركتك موقع حالياً، اضغط لا يوجد موقع.",                                                                              validate: () => null, optional: true },
        { key: "email",           label: "البريد الإلكتروني",      prompt: "ما البريد الإلكتروني الذي يجب على فريق RHINE استخدامه للتواصل معك؟",                                                                                                validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "الرجاء إدخال بريد إلكتروني صحيح (مثال: name@company.com)." },
        { key: "telephone",       label: "رقم الهاتف",             prompt: "ما رقم هاتفك أو جوالك؟\n\nالرجاء تضمين رمز الدولة (مثال: ‎+971 50 123 4567).",                                                                                        validate: (v) => /^\+[1-9][\d\s\-().]{5,20}$/.test(v.trim()) ? null : "الرجاء تضمين رمز الدولة ويبدأ بـ + (مثال: ‎+971 50 123 4567)." },
        { key: "topic",           label: "موضوع الاجتماع",         prompt: "ماذا تودّ مناقشته مع فريق RHINE؟\n\nيمكنك وصف فكرة عملك أو شركتك القائمة أو المنصة المطلوبة أو الموقع الإلكتروني أو وكلاء الذكاء الاصطناعي أو أي متطلب آخر. سأضمّن رسالتك الكاملة في طلب الاجتماع.", validate: (v) => v.trim().length >= 5 ? null : "الرجاء تقديم وصف موجز لما تودّ مناقشته." },
        { key: "preferredTime",   label: "الوقت المفضل للاجتماع", prompt: "متى تفضّل الاجتماع؟ الرجاء تحديد التاريخ والوقت والمنطقة الزمنية.\n\nمثال: الاثنين 20 نوفمبر 2026، الساعة 10 صباحاً بتوقيت الخليج.",                          validate: (v) => v.trim().length >= 3 ? null : "الرجاء إدخال تاريخ ووقت الاجتماع المفضل." }
      ],
      reviewTitle: "يرجى مراجعة طلب اجتماعك قبل إرساله إلى فريق RHINE.",
      confirmBtn: "تأكيد وإرسال الطلب",
      editBtn: "تعديل المعلومات",
      cancelBtn: "إلغاء",
      submitting: "جارٍ إرسال طلب اجتماعك إلى فريق RHINE...",
      successTitle: "تم إرسال طلب الاجتماع",
      successMsg: (name) => `شكراً لك، ${name}. تم إرسال طلب اجتماعك إلى فريق RHINE. سيتواصل معك أحد أعضاء الفريق قريباً على بريدك الإلكتروني.`,
      failTitle: "فشل الإرسال",
      failMsg: "لم نتمكن من إرسال طلب اجتماعك في الوقت الحالي. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرةً على info@rhineme.com أو ‎+971 4 8818618.",
      retryBtn: "إعادة المحاولة",
      closeBtn: "إغلاق",
      noWebsite: "لا يوجد موقع",
      validationError: (msg) => `⚠ ${msg}\n\nيرجى المحاولة مرة أخرى:`,
      editFormTitle: "تعديل معلوماتك",
      editSaveBtn: "حفظ التغييرات",
      editCancelBtn: "العودة إلى المراجعة"
    }
  };

  // Intent rules: keywords map to knowledge topic keys
  // Arabic notes: keys use base forms; matching normalises alef/hamza variants and strips punctuation.
  const INTENT_RULES = [
    { keys: ["qualify", "describe", "situation", "option", "choice", "من انا", "خيارات", "اي الحالات", "تصنيف", "تحديد الاحتياج"], topic: "qualification" },
    { keys: ["complete solution", "all services", "full rhine", "option 5", "choice 5", "situation 5", "حلول متكاملة", "الحل الكامل", "الخيار الخامس", "الخيار 5", "الحالة 5"], topic: "complete_solution" },
    { keys: ["turn an idea into a company", "turn idea into company", "turn idea into a company", "turn idea", "launch company", "start company", "from scratch", "venture", "option 1", "choice 1", "situation 1", "تحويل فكرة الى شركة", "تحويل فكرة لشركة", "تحويل فكرة الى شركة عاملة", "تاسيس شركة من الصفر", "تأسيس شركة من الصفر", "بدء شركة جديدة", "الخيار الاول", "الخيار 1", "الحالة 1"], topic: "idea_to_company" },
    { keys: ["from idea to operation", "from idea to operations", "5 stages", "five stages", "roadmap", "journey", "understand organize design", "stages", "مراحل", "طريقة العمل", "من الفكرة الى التشغيل", "من الفكرة للتشغيل", "كيف تعملون", "كيف تعمل rhine", "الرحلة", "المراحل الخمس"], topic: "process" },
    { keys: ["transform", "automate", "existing company", "existing business", "improve business", "option 2", "choice 2", "situation 2", "تطوير شركة", "اتمتة", "أتمتة", "تطوير مؤسسة", "شركة قائمة", "تحسين الشركة", "الخيار الثاني", "الخيار 2", "الحالة 2"], topic: "transform_company" },
    { keys: ["platform", "website", "build website", "build platform", "guidance", "option 3", "choice 3", "situation 3", "منصة", "موقع", "بناء موقع", "منصة رقمية", "موقع الكتروني", "إرشادات المنصة", "ارشادات المنصة", "الخيار الثالث", "الخيار 3", "الحالة 3"], topic: "platform_website" },
    { keys: ["what can you build", "what rhine can build", "build", "develop", "ماذا يمكن", "ماذا تبنون", "ماذا تصممون", "ماذا تبني", "ماذا تنشئون"], topic: "what_we_build" },
    { keys: ["positioning", "why rhine", "isolated", "wider purpose", "not simply", "لماذا راين", "بيئة عمل", "فلسفة", "الركائز", "الهدف"], topic: "pillars" },
    { keys: ["solution", "service", "provide", "offer", "what do you do", "what does rhine do", "help", "حلول", "خدمات", "خدماتكم", "ماذا تقدم", "ماذا تفعل", "مساعدة", "ما هي خدماتكم"], topic: "solutions" },
    { keys: ["ai agent", "digital worker", "governed agent", "digital workforce", "option 4", "choice 4", "situation 4", "وكيل", "عامل رقمي", "وكلاء ذكاء", "وكلاء الذكاء", "مساعد ذكي", "وكلاء محكومين", "قوى عاملة رقمية", "الخيار الرابع", "الخيار 4", "الحالة 4"], topic: "ai_agents" },
    { keys: ["contact", "phone", "email", "call", "reach", "address", "location", "office", "headquarter", "number", "consultation", "jafza", "jebel ali", "تواصل", "تواصلوا", "هاتف", "ايميل", "بريد", "عنوان", "مقر", "رقم", "استشارة", "كيف اتواصل", "جافزا", "جبل علي"], topic: "contact" },
    { keys: ["hour", "open", "timing", "schedule", "working hour", "available", "ساعات", "وقت", "توقيت", "متاح", "اوقات", "أوقات", "دوام"], topic: "hours" },
    { keys: ["price", "cost", "fee", "quote", "pricing", "how much", "سعر", "تكلفة", "رسوم", "عرض سعر", "تسعير", "كم يكلف"], topic: "pricing" },
    { keys: ["website info", "advisor", "app", "موقع", "وظائف", "المستشار"], topic: "website_info" },
    { keys: ["who are you", "what are you", "introduce yourself", "tell me about yourself", "من أنت", "من انت", "عرّف نفسك", "عرف نفسك", "من انتم"], topic: "who_are_you" },
    { keys: ["good morning", "morning", "صباح الخير", "صباح النور"], topic: "morning_greeting" },
    { keys: ["good afternoon", "good evening", "evening", "مساء الخير", "مساء النور", "طاب مساؤك"], topic: "evening_greeting" },
    { keys: ["good night", "goodnight", "night", "تصبح على خير", "طابت ليلتك", "ليلة سعيدة"], topic: "night_greeting" },
    { keys: ["hello", "hi ", "hey", "greet", "مرحبا", "مرحباً", "أهلا", "اهلا", "السلام عليكم"], topic: "greeting" },
    { keys: ["arrange meeting", "book meeting", "schedule meeting", "schedule a meeting", "arrange a meeting", "book a meeting", "set a meeting", "set up a meeting", "request meeting", "meeting with rhine", "meeting", "meet", "book appointment", "schedule appointment", "arrange appointment", "appointment", "want to meet", "speak to team", "talk to team", "contact team", "طلب اجتماع", "ترتيب اجتماع", "حجز اجتماع", "اجتماع", "موعد", "حجز موعد", "موعد مع rhine", "اريد اجتماع", "أريد اجتماع", "التحدث مع الفريق", "التواصل مع الفريق"], topic: "__meeting__" },
    { keys: ["do you know", "do you have", "what is ai", "define ai", "tell me about ai", "general knowledge", "who is", "what is the capital", "tell joke", "joke", "weather", "football", "soccer", "recipe", "game", "movie", "song", "crypto", "bitcoin", "politics", "president", "capital of", "هل تعرف", "ما هو الذكاء", "ما معنى الذكاء", "ما هو ai", "معلومات عامة", "نكتة", "الطقس", "كرة القدم", "مباراة", "فيلم", "اغنية", "طبخ", "وصفة", "لعبة", "عملات", "سياسة", "عاصمة"], topic: "off_topic" },
    { keys: ["rhine", "company", "about rhine", "who is rhine", "راين", "شركة", "من هي", "ما هي شركة", "عن راين"], topic: "company" }
  ];

  class RhineAvatarWidget {
    constructor(options = {}) {
      this.options = Object.assign({
        title: "RHINE AI Business Advisor",
        endpoint: "/api/agent/chat",
        statusEndpoint: "/api/agent/status",
        videoSrc: "/avatar-widget/assets/presenter.mp4",
        posterSrc: "/avatar-widget/assets/presenter-ai.png",
        kbUrl: "/kb.json",
        language: "en",
        autoOpen: false,
        antiForgeryHeader: "RequestVerificationToken",
        antiForgeryToken: null
      }, options);

      this.isOpen = false;
      this.isSpeaking = false;
      this.isSpeechMuted = false;
      this.isCaptionsVisible = false;
      this.isListening = false;
      this.speechRecognition = null;
      this.kbData = null;
      this.lastCaption = "";
      this._voicesReady = false;

      this._init();
    }

    async _init() {
      this._extractAntiforgeryToken();
      this._buildDOM();
      this._bindEvents();
      await this._loadKnowledgeBase();

      // Show greeting caption; speak after voices are loaded
      const greet = () => {
        const greeting = RHINE_KNOWLEDGE[this.options.language]?.greeting || RHINE_KNOWLEDGE.en.greeting;
        this.setCaptionAndSpeak(greeting, false);
      };

      if (window.speechSynthesis && window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => { this._voicesReady = true; greet(); }, { once: true });
        setTimeout(() => { if (!this._voicesReady) greet(); }, 1500);
      } else {
        this._voicesReady = true;
        greet();
      }

      if (this.options.autoOpen) {
        this.open();
      } else {
        this.close();
      }
    }

    _extractAntiforgeryToken() {
      if (this.options.antiForgeryToken) return;
      const input = document.querySelector('input[name="__RequestVerificationToken"]');
      if (input && input.value) {
        this.options.antiForgeryToken = input.value;
        return;
      }
      const meta = document.querySelector('meta[name="csrf-token"]') || document.querySelector('meta[name="RequestVerificationToken"]');
      if (meta && meta.content) {
        this.options.antiForgeryToken = meta.content;
      }
    }

    async _loadKnowledgeBase() {
      try {
        const resp = await fetch(this.options.kbUrl, { cache: "no-store" });
        if (resp.ok) {
          this.kbData = await resp.json();
        }
      } catch (e) {
        console.warn("Rhine Avatar: Local knowledge base not loaded", e);
      }
    }

    _buildDOM() {
      // 1. Floating Launcher (Bottom-right circle with presenter avatar)
      this.launcherEl = document.createElement("div");
      this.launcherEl.className = "rhine-launcher";
      this.launcherEl.setAttribute("role", "button");
      this.launcherEl.setAttribute("aria-label", "Open AI Presenter");
      this.launcherEl.innerHTML = `
        <div class="rhine-launcher-avatar">
          <img src="${this._escapeHtml(this.options.posterSrc)}" alt="Presenter" onerror="this.style.display='none'" />
          <span class="rhine-launcher-badge"></span>
        </div>
        <div class="rhine-launcher-text">
          <span class="rhine-launcher-title">${this._escapeHtml(this.options.title)}</span>
          <span class="rhine-launcher-subtitle">RHINE Middle East FZE</span>
        </div>
      `;
      document.body.appendChild(this.launcherEl);

      // 2. Main Avatar Presenter Card (Matches gssilatam.org reference layout)
      this.widgetEl = document.createElement("div");
      this.widgetEl.className = "rhine-avatar-widget rhine-hidden";
      this.widgetEl.setAttribute("role", "dialog");

      const isAr = this.options.language === "ar";
      if (isAr) {
        this.widgetEl.setAttribute("dir", "rtl");
      }

      this.widgetEl.innerHTML = `
        <!-- Full-Height Background Video & Fallback -->
        <div class="rhine-video-stage">
          <video id="rhineVideo"
                 playsinline
                 muted
                 loop
                 preload="auto"
                 poster="${this._escapeHtml(this.options.posterSrc)}">
            <source src="${this._escapeHtml(this.options.videoSrc)}" type="video/mp4">
          </video>
          <div class="rhine-video-fallback" id="rhineVideoFallback"
               style="background-image: url('${this._escapeHtml(this.options.posterSrc)}');">
          </div>
          <div class="rhine-video-scrim"></div>
        </div>

        <!-- Transparent Top Bar -->
        <div class="rhine-top-bar">
          <div class="rhine-top-info">
            <div class="rhine-launcher-avatar" style="width:28px;height:28px;border-width:1.5px;">
              <img src="${this._escapeHtml(this.options.posterSrc)}" alt="Presenter" />
            </div>
            <div>
              <div class="rhine-top-title" id="rhineTopTitle">${this._escapeHtml(this.options.title)}</div>
              <div class="rhine-top-status" id="rhinePresenterStatus">
                <span class="rhine-caption-dot"></span>
                <span id="rhineStatusText">Active</span>
              </div>
            </div>
          </div>
          <div class="rhine-top-actions">
            <!-- Language Toggle (EN / AR) -->
            <button type="button" class="rhine-lang-btn" id="rhineLangToggle">
              ${isAr ? "English" : "العربية"}
            </button>

            <!-- Transparent Caption Button (CC) -->
            <button type="button" class="rhine-btn-icon rhine-cc-btn" id="rhineCcBtn" title="Toggle Captions">
              CC
            </button>

            <!-- Audio Mute / Unmute -->
            <button type="button" class="rhine-btn-icon" id="rhineMuteBtn" title="Toggle audio speech">
              <span id="rhineMuteIcon">${ICONS.speakerOn}</span>
            </button>

            <!-- Close Button -->
            <button type="button" class="rhine-btn-icon" id="rhineCloseBtn" title="Close">
              ${ICONS.close}
            </button>
          </div>
        </div>

        <!-- Mic Listening Overlay -->
        <div class="rhine-mic-overlay" id="rhineMicOverlay" style="display:none;">
          <button type="button" class="rhine-mic-close" id="rhineMicClose" title="Cancel voice input">✕</button>
          <div class="rhine-mic-pulse" id="rhineMicPulseBtn" role="button" title="Tap to finish and ask">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </div>
          <div class="rhine-mic-label" id="rhineMicLabel">Listening... Speak now</div>
          <div class="rhine-mic-interim" id="rhineMicInterim">Speak your question clearly...</div>
          <div class="rhine-mic-actions" id="rhineMicActions">
            <button type="button" class="rhine-mic-submit-btn" id="rhineMicSubmitBtn" style="display:none;">
              Ask AI Presenter
            </button>
          </div>
          <div class="rhine-mic-chips" id="rhineMicChips">
            <div class="rhine-mic-hint">${isAr ? 'أو انقر للتحدث فوراً:' : 'Or tap a question to speak:'}</div>
            <div class="rhine-mic-chip-list">
              ${this._renderQuickChips(isAr)}
            </div>
          </div>
        </div>

        <!-- Bottom Container with Transparent Floating Captions & Chat Textbox -->
        <div class="rhine-bottom-container">
          <!-- Transparent Floating Caption Overlay (D-ID Style) -->
          <div class="rhine-caption-overlay rhine-caption-hidden" id="rhineCaptionOverlay">
            <div class="rhine-caption-header">
              <div class="rhine-caption-badge">
                <span class="rhine-caption-dot"></span>
                <span id="rhineCaptionBadgeText">${isAr ? 'إرشادات المنصة' : 'PLATFORM GUIDANCE'}</span>
                <div class="rhine-sound-wave">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <button type="button" class="rhine-btn-icon" id="rhineReplayBtn" title="Replay answer" style="width:22px;height:22px;">
                ${ICONS.replay}
              </button>
            </div>
            <div class="rhine-caption-content" id="rhineCaptionContent"></div>
          </div>

          <!-- Speak Now Button -->
          <button type="button" class="rhine-speak-now-btn" id="rhineSpeakNowBtn">
            ${ICONS.mic}
            <span>${isAr ? 'تكلّم الآن' : 'Speak Now'}</span>
          </button>

          <!-- Customer Quick Question Chips -->
          <div class="rhine-quick-questions" id="rhineQuickQuestions">
            ${this._renderQuickChips(isAr)}
          </div>

          <!-- Transparent Chat Textbox with Microphone -->
          <form class="rhine-chat-form" id="rhineChatForm">
            <input type="text"
                   class="rhine-chat-input"
                   id="rhineChatInput"
                   placeholder="${isAr ? 'تحدث أو اكتب سؤالك...' : 'Speak or type your question...'}"
                   autocomplete="off" />
            <button type="button" class="rhine-chat-mic" id="rhineChatMic" title="Voice Input">
              <span id="rhineMicBtnIcon">${ICONS.mic}</span>
            </button>
            <button type="submit" class="rhine-chat-send" id="rhineChatSend" title="Send">
              ${ICONS.send}
            </button>
          </form>

          <div class="rhine-legal-subtext">
            RHINE Middle East FZE · The Global Agent Factory
          </div>
        </div>
      `;

      document.body.appendChild(this.widgetEl);

      // Cache elements
      this.videoEl = this.widgetEl.querySelector("#rhineVideo");
      this.videoFallbackEl = this.widgetEl.querySelector("#rhineVideoFallback");
      this.topTitleEl = this.widgetEl.querySelector("#rhineTopTitle");
      this.captionOverlay = this.widgetEl.querySelector("#rhineCaptionOverlay");
      this.captionContent = this.widgetEl.querySelector("#rhineCaptionContent");
      this.captionBadgeText = this.widgetEl.querySelector("#rhineCaptionBadgeText");
      this.chatForm = this.widgetEl.querySelector("#rhineChatForm");
      this.chatInput = this.widgetEl.querySelector("#rhineChatInput");
      this.chatMic = this.widgetEl.querySelector("#rhineChatMic");
      this.micBtnIcon = this.widgetEl.querySelector("#rhineMicBtnIcon");
      this.chatSend = this.widgetEl.querySelector("#rhineChatSend");
      this.muteBtn = this.widgetEl.querySelector("#rhineMuteBtn");
      this.muteIcon = this.widgetEl.querySelector("#rhineMuteIcon");
      this.ccBtn = this.widgetEl.querySelector("#rhineCcBtn");
      this.closeBtn = this.widgetEl.querySelector("#rhineCloseBtn");
      this.replayBtn = this.widgetEl.querySelector("#rhineReplayBtn");
      this.langToggleBtn = this.widgetEl.querySelector("#rhineLangToggle");
      this.micOverlay = this.widgetEl.querySelector("#rhineMicOverlay");
      this.micClose = this.widgetEl.querySelector("#rhineMicClose");
      this.micPulseBtn = this.widgetEl.querySelector("#rhineMicPulseBtn");
      this.micLabel = this.widgetEl.querySelector("#rhineMicLabel");
      this.micInterim = this.widgetEl.querySelector("#rhineMicInterim");
      this.micSubmitBtn = this.widgetEl.querySelector("#rhineMicSubmitBtn");
      this.micChips = this.widgetEl.querySelector("#rhineMicChips");
      this.statusText = this.widgetEl.querySelector("#rhineStatusText");
      this.speakNowBtn = this.widgetEl.querySelector("#rhineSpeakNowBtn");
      this.quickQuestionsEl = this.widgetEl.querySelector("#rhineQuickQuestions");
    }

    _renderQuickChips(isAr) {
      const q1 = isAr ? "ماذا يمكن لـ RHINE بناؤه؟" : "What can RHINE build?";
      const meetingLabel = isAr ? "📅 حجز اجتماع مع RHINE" : "📅 Schedule a Meeting";
      const remainingQuestions = isAr ? [
        "من الفكرة إلى التشغيل الفعلي",
        "تحويل فكرة إلى شركة عاملة",
        "تطوير وأتمتة شركة قائمة",
        "بناء منصة أعمال أو موقع",
        "وكلاء ذكاء اصطناعي لأدوار محددة"
      ] : [
        "From Idea to Operations",
        "Turn an idea into a company",
        "Transform or automate a company",
        "Need a platform or website",
        "AI agents for business roles"
      ];

      const chip1 = `<button type="button" class="rhine-chip" data-question="${this._escapeHtml(q1)}">${this._escapeHtml(q1)}</button>`;
      const meetingChip = `<button type="button" class="rhine-chip rhine-chip-meeting" data-action="schedule-meeting">${this._escapeHtml(meetingLabel)}</button>`;
      const remainingChips = remainingQuestions.map(q => `
        <button type="button" class="rhine-chip" data-question="${this._escapeHtml(q)}">
          ${this._escapeHtml(q)}
        </button>
      `).join("");

      return chip1 + meetingChip + remainingChips;
    }

    setLanguage(lang) {
      if (!lang) lang = "en";
      this.options.language = lang;
      const isAr = lang === "ar";
      if (this.langToggleBtn) {
        this.langToggleBtn.textContent = isAr ? "English" : "العربية";
      }
      if (this.widgetEl) {
        this.widgetEl.setAttribute("dir", isAr ? "rtl" : "ltr");
      }
      if (this.chatInput) {
        this.chatInput.placeholder = isAr ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
      }
      if (this.speakNowBtn) {
        const s = this.speakNowBtn.querySelector("span");
        if (s) s.textContent = isAr ? "تكلّم الآن" : "Speak Now";
      }
      if (this.quickQuestionsEl) {
        this.quickQuestionsEl.innerHTML = this._renderQuickChips(isAr);
      }
      if (this.micChips) {
        const hint = this.micChips.querySelector(".rhine-mic-hint");
        if (hint) hint.textContent = isAr ? "أو انقر للتحدث فوراً:" : "Or tap a question to speak:";
        const list = this.micChips.querySelector(".rhine-mic-chip-list");
        if (list) list.innerHTML = this._renderQuickChips(isAr);
      }
      if (this.activeRecognition) {
        this.activeRecognition.lang = isAr ? "ar-SA" : "en-US";
      }
    }

    _bindEvents() {
      this.launcherEl.addEventListener("click", () => this.open());
      this.closeBtn.addEventListener("click", () => this.close());
      this.muteBtn.addEventListener("click", () => this.toggleMute());
      this.ccBtn.addEventListener("click", () => this.toggleCaptions());

      this.replayBtn.addEventListener("click", () => {
        if (this.lastCaption) this.speak(this.lastCaption);
      });

      // Speak Now big button
      if (this.speakNowBtn) {
        this.speakNowBtn.addEventListener("click", () => this._triggerMic());
      }

      // Mic Overlay interactive controls
      if (this.micClose) {
        this.micClose.addEventListener("click", (e) => {
          e.stopPropagation();
          this._stopListening();
        });
      }

      if (this.micPulseBtn) {
        this.micPulseBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const q = (this.capturedVoiceText || this.chatInput.value).trim();
          this._stopListening();
          if (q) {
            this.ask(q);
          }
        });
      }

      if (this.micSubmitBtn) {
        this.micSubmitBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const q = (this.capturedVoiceText || this.chatInput.value).trim();
          this._stopListening();
          if (q) {
            this.ask(q);
          }
        });
      }

      if (this.micChips) {
        this.micChips.addEventListener("click", (e) => {
          const chip = e.target.closest(".rhine-chip");
          if (!chip) return;
          e.stopPropagation();
          this._stopListening();
          if (chip.dataset.action === "schedule-meeting") {
            this._startMeetingFlow();
          } else if (chip.dataset.question) {
            this.ask(chip.dataset.question);
          }
        });
      }

      // Customer Quick Question Chips click delegation
      if (this.quickQuestionsEl) {
        this.quickQuestionsEl.addEventListener("click", (e) => {
          const chip = e.target.closest(".rhine-chip");
          if (!chip) return;
          if (chip.dataset.action === "schedule-meeting") {
            this._startMeetingFlow();
          } else if (chip.dataset.question) {
            this.ask(chip.dataset.question);
          }
        });
      }

      // Language Switcher
      this.langToggleBtn.addEventListener("click", () => {
        const nextLang = this.options.language === "en" ? "ar" : "en";
        this.setLanguage(nextLang);
        if (typeof window.setStagingLanguage === "function") {
          window.setStagingLanguage(nextLang);
        }
        const greeting = RHINE_KNOWLEDGE[this.options.language]?.greeting || RHINE_KNOWLEDGE.en.greeting;
        this.setCaptionAndSpeak(greeting, false);
      });

      // Chat Form submission — empty input triggers mic
      this.chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = this.chatInput.value.trim();
        if (!text) { this._triggerMic(); return; }
        this.chatInput.value = "";
        this.ask(text);
      });

      // Video error fallback
      this.videoEl.addEventListener("error", () => {
        this.videoFallbackEl.classList.add("visible");
      });

      // Set up speech recognition / mic button
      this._setupSpeechRecognition();
    }

    async _triggerMic() {
      if (this.isListening) {
        this._stopListening();
        return;
      }

      this.stopSpeech();
      this.capturedVoiceText = "";
      this._recognitionRestarts = 0;

      const isAr = this.options.language === "ar";
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        this._setStatus(isAr ? "الصوت غير مدعوم في هذا المتصفح" : "Voice not supported in this browser");
        return;
      }

      // 1. Show listening UI immediately
      this.isListening = true;
      if (this.chatMic) this.chatMic.classList.add("listening");
      if (this.micBtnIcon) this.micBtnIcon.innerHTML = ICONS.micOff;
      if (this.speakNowBtn) {
        this.speakNowBtn.classList.add("listening");
        const btnSpan = this.speakNowBtn.querySelector("span");
        if (btnSpan) btnSpan.textContent = isAr ? "جارٍ الاستماع... تكلّم الآن" : "Listening... Speak now";
      }
      if (this.micOverlay) this.micOverlay.style.display = "flex";
      if (this.micInterim) this.micInterim.textContent = isAr ? "تحدّث الآن بسؤالك، نحن نستمع إليك..." : "Speak your question clearly...";
      if (this.micSubmitBtn) this.micSubmitBtn.style.display = "none";
      const lbl = isAr ? "نستمع إليك... تكلّم براحتك" : "LISTENING... SPEAK YOUR QUESTION NOW";
      if (this.micLabel) this.micLabel.textContent = lbl;
      this.chatInput.placeholder = lbl;
      this._setStatus(isAr ? "جارٍ الاستماع..." : "Listening...");

      // 2. Inject live waveform animation & countdown into overlay if not already present
      this._injectListeningExtras(isAr);

      // 3. Clear any active timers
      if (this._micSilenceTimeout) clearTimeout(this._micSilenceTimeout);
      if (this._micDebounceTimer) clearTimeout(this._micDebounceTimer);
      if (this._countdownInterval) clearInterval(this._countdownInterval);

      // 4. Start 60-second MAX countdown shown in the overlay
      this._listenSecondsLeft = 60;
      this._updateCountdown();
      this._countdownInterval = setInterval(() => {
        this._listenSecondsLeft--;
        this._updateCountdown();
        if (this._listenSecondsLeft <= 0) {
          clearInterval(this._countdownInterval);
          const q = (this.capturedVoiceText || this.chatInput.value).trim();
          this._stopListening();
          if (q) {
            this.ask(q);
          } else {
            this._setStatus(isAr ? "انتهى وقت الاستماع. انقر تكلّم الآن أو اختر سؤالاً:" : "Listening time ended. Click Speak Now or choose a question below:");
          }
        }
      }, 1000);

      // 5. Start SpeechRecognition session exclusively (avoids getUserMedia mic contention)
      this._startRecognitionSession(SpeechRecognition, isAr);
    }

    _startRecognitionSession(SpeechRecognition, isAr) {
      if (!this.isListening) return;

      try {
        if (this.activeRecognition) {
          try { this.activeRecognition.abort(); } catch {}
          this.activeRecognition = null;
        }

        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 1;
        rec.lang = isAr ? "ar-SA" : "en-US";
        this.activeRecognition = rec;

        rec.onresult = (e) => {
          // Reset countdown to 60s on any speech activity
          this._listenSecondsLeft = 60;
          this._updateCountdown();

          let finalTranscript = "";
          let interimTranscript = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal) finalTranscript += t;
            else interimTranscript += t;
          }

          if (finalTranscript) {
            this.capturedVoiceText = ((this.capturedVoiceText || "") + " " + finalTranscript).trim();
          }
          const displayText = this.capturedVoiceText || (interimTranscript ? interimTranscript.trim() : "");

          if (displayText) {
            if (this.micInterim) {
              this.micInterim.innerHTML = this.capturedVoiceText
                ? `<strong>"${this._escapeHtml(this.capturedVoiceText)}"</strong>`
                  + (interimTranscript ? ` <em style="opacity:.6">${this._escapeHtml(interimTranscript.trim())}</em>` : "")
                : `<em>"${this._escapeHtml(displayText)}"</em>`;
            }
            this.chatInput.value = displayText;
            this._setStatus(`"${displayText.slice(0, 40)}"`);

            if (this.micSubmitBtn) {
              this.micSubmitBtn.style.display = "inline-flex";
              this.micSubmitBtn.textContent = isAr
                ? `✓ إرسال السؤال الآن: "${displayText.slice(0, 22)}..."`
                : `✓ Submit Question: "${displayText.slice(0, 24)}..."`;
            }
          }

          // Debounce auto-submit: 4.5 seconds of silence allows long sentences without premature cutoffs
          if (finalTranscript && this.capturedVoiceText) {
            if (this._micDebounceTimer) clearTimeout(this._micDebounceTimer);
            this._micDebounceTimer = setTimeout(() => {
              const q = this.capturedVoiceText.trim();
              if (q && this.isListening) {
                this._showAnalyzing(isAr);
                setTimeout(() => {
                  this._stopListening();
                  this.ask(q);
                }, 400);
              }
            }, 4500);
          }
        };

        rec.onerror = (e) => {
          if (e.error === "not-allowed") {
            this._stopListening();
            this._setStatus(isAr ? "تم حظر الميكروفون. اسمح به أو اكتب سؤالك:" : "Mic blocked. Please allow microphone access.");
          }
          // Do not abort on 'no-speech' or 'aborted' or 'network', let onend restart seamlessly
        };

        rec.onend = () => {
          // If still listening and no submission is in progress, restart seamlessly
          if (this.isListening && !this._micDebounceTimer) {
            if (this._recRestartTimer) clearTimeout(this._recRestartTimer);
            this._recRestartTimer = setTimeout(() => {
              if (this.isListening && !this._micDebounceTimer) {
                this._startRecognitionSession(SpeechRecognition, isAr);
              }
            }, 200);
          }
        };

        rec.start();
      } catch (err) {
        console.warn("Speech recognition session start error:", err);
        if (this.isListening && !this._micDebounceTimer) {
          if (this._recRestartTimer) clearTimeout(this._recRestartTimer);
          this._recRestartTimer = setTimeout(() => {
            if (this.isListening) this._startRecognitionSession(SpeechRecognition, isAr);
          }, 350);
        }
      }
    }

    _injectListeningExtras(isAr) {
      if (!this.micOverlay || this.micOverlay.querySelector(".rhine-live-wave")) return;

      const wave = document.createElement("div");
      wave.className = "rhine-live-wave rhine-wave-animated";
      const barCount = 16;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement("span");
        bar.className = "rhine-wave-bar";
        wave.appendChild(bar);
      }

      const countdown = document.createElement("div");
      countdown.className = "rhine-countdown";
      countdown.id = "rhineMicCountdown";

      const pulseBtn = this.micOverlay.querySelector(".rhine-mic-pulse");
      if (pulseBtn && pulseBtn.parentNode) {
        pulseBtn.parentNode.insertBefore(wave, pulseBtn.nextSibling);
      }
      const label = this.micOverlay.querySelector(".rhine-mic-label");
      if (label && label.parentNode) {
        label.parentNode.insertBefore(countdown, label.nextSibling);
      }
      this._countdownEl = countdown;
    }

    _updateCountdown() {
      if (!this._countdownEl) return;
      const s = this._listenSecondsLeft;
      const isAr = this.options.language === "ar";
      this._countdownEl.textContent = s > 0 ? (isAr ? `الاستماع مستمر (${s} ثانية)` : `Listening for ${s}s`) : "";
      this._countdownEl.style.color = s <= 10 ? "#fca5a5" : "rgba(236,213,158,0.8)";
    }

    _showAnalyzing(isAr) {
      if (this.micLabel) {
        this.micLabel.textContent = isAr ? "جارٍ التحليل..." : "Analyzing your question...";
      }
      if (this.micInterim) {
        const captured = this.capturedVoiceText || "";
        this.micInterim.innerHTML = `
          <span class="rhine-analyzing-dots">●●●</span>
          <em style="display:block;margin-top:4px;opacity:.8">${this._escapeHtml(captured)}</em>`;
      }
      if (this.micPulseBtn) {
        this.micPulseBtn.style.background = "linear-gradient(135deg,rgba(16,185,129,0.3),rgba(16,185,129,0.15))";
        this.micPulseBtn.style.borderColor = "#10b981";
        this.micPulseBtn.style.color = "#10b981";
      }
    }

    _stopListening() {
      this.isListening = false;
      this._micDebounceTimer = null;
      if (this._micSilenceTimeout) { clearTimeout(this._micSilenceTimeout); this._micSilenceTimeout = null; }
      if (this._countdownInterval) { clearInterval(this._countdownInterval); this._countdownInterval = null; }
      if (this._audioAnimFrame) cancelAnimationFrame(this._audioAnimFrame);
      // Reset pulse btn to default style
      if (this.micPulseBtn) {
        this.micPulseBtn.style.background = "";
        this.micPulseBtn.style.borderColor = "";
        this.micPulseBtn.style.color = "";
      }
      if (this.activeAudioStream) {
        try { this.activeAudioStream.getTracks().forEach(t => t.stop()); } catch {}
        this.activeAudioStream = null;
      }
      if (this.activeAudioCtx) {
        try { this.activeAudioCtx.close(); } catch {}
        this.activeAudioCtx = null;
      }
      if (this.activeRecognition) {
        try { this.activeRecognition.abort(); } catch {}
        this.activeRecognition = null;
      }
      this._stopListeningUI();
    }

    _stopListeningUI() {
      this.isListening = false;
      if (this.chatMic) this.chatMic.classList.remove("listening");
      if (this.micBtnIcon) this.micBtnIcon.innerHTML = ICONS.mic;
      if (this.speakNowBtn) {
        this.speakNowBtn.classList.remove("listening");
        const btnSpan = this.speakNowBtn.querySelector("span");
        if (btnSpan) btnSpan.textContent = this.options.language === "ar" ? "تكلّم الآن" : "Speak Now";
      }
      if (this.micOverlay) this.micOverlay.style.display = "none";
      if (this.micPulseBtn) this.micPulseBtn.style.transform = "";
      this.chatInput.placeholder = this.options.language === "ar" ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
    }

    _setupSpeechRecognition() {
      if (this.chatMic) {
        this.chatMic.addEventListener("click", () => this._triggerMic());
      }
    }

    _setStatus(text) {
      if (this.statusText) this.statusText.textContent = text;
    }

    open() {
      this.isOpen = true;
      this.widgetEl.classList.remove("rhine-hidden");
      this.launcherEl.style.display = "none";
      setTimeout(() => this.chatInput.focus(), 150);
    }

    close() {
      this.isOpen = false;
      this.widgetEl.classList.add("rhine-hidden");
      this.launcherEl.style.display = "flex";
      this.stopSpeech();
    }

    toggleMute() {
      this.isSpeechMuted = !this.isSpeechMuted;
      if (this.isSpeechMuted) {
        this.muteIcon.innerHTML = ICONS.speakerMuted;
        this.stopSpeech();
      } else {
        this.muteIcon.innerHTML = ICONS.speakerOn;
      }
    }

    toggleCaptions() {
      this.isCaptionsVisible = !this.isCaptionsVisible;
      if (this.isCaptionsVisible) {
        this.captionOverlay.classList.remove("rhine-caption-hidden");
        this.ccBtn.classList.add("active");
        this.ccBtn.title = "Hide Captions";
      } else {
        this.captionOverlay.classList.add("rhine-caption-hidden");
        this.ccBtn.classList.remove("active");
        this.ccBtn.title = "Show Captions";
      }
    }

    async ask(question) {
      // If we're in the middle of a meeting flow, route to the meeting handler first
      if (this._meetingFlow && this._meetingFlow.active) {
        this._handleMeetingInput(question);
        return;
      }

      this.stopSpeech();
      this.chatSend.disabled = true;
      this._setStatus("Thinking...");

      const lang = this.options.language;
      const lower = question.toLowerCase().trim();

      // 1. Intent rule matching
      // Normalise Arabic: strip punctuation (Arabic ؟ ! ، . ) and normalise alef variants
      const normaliseAr = (t) => t
        .replace(/[\u060C\u061B\u061F\u06D4!?.،؛]/g, " ") // Arabic punctuation → space
        .replace(/[أإآٱ]/g, "ا")                           // alef variants → bare alef
        .replace(/\s+/g, " ").trim();

      const normalised = normaliseAr(lower);

      let answer = "";
      let matchedTopic = null;
      for (const rule of INTENT_RULES) {
        if (rule.keys.some(k => normalised.includes(normaliseAr(k.toLowerCase())))) {
          // Special sentinel: launch meeting flow instead of returning KB text
          if (rule.topic === "__meeting__") {
            this.chatSend.disabled = false;
            this._setStatus("Active");
            this._startMeetingFlow();
            return;
          }
          const kb = RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en;
          answer = kb[rule.topic] || "";
          if (answer) {
            matchedTopic = rule.topic;
            break;
          }
        }
      }

      // If not matched, query backend server /api/agent/chat
      if (!answer) {
        try {
          const headers = { "Content-Type": "application/json" };
          if (this.options.antiForgeryToken) {
            headers[this.options.antiForgeryHeader] = this.options.antiForgeryToken;
          }
          const resp = await fetch(this.options.endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ message: question, language: lang })
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data && data.success && data.message) {
              answer = data.message;
            }
          }
        } catch {}
      }

      // If still not matched, search curated knowledge base topics with strict stop-word filtering
      if (!answer && this.kbData && this.kbData.topics) {
        const STOP_WORDS = new Set([
          "who", "what", "where", "when", "why", "how", "are", "you", "the", "and", "for", 
          "with", "all", "can", "get", "out", "not", "now", "know", "type", "this", "that", 
          "from", "tell", "like", "need", "does", "have", "here", "help", "show", "some", "your",
          "about", "into", "been", "good", "more", "much", "very", "also", "just", "want",
          "هل", "من", "ما", "ماذا", "اين", "أين", "متى", "كيف", "في", "على", "الى", "إلى", "عن", "مع", "هذا", "هذه", "ذلك", "تلك", "كان", "ليس"
        ]);
        for (const t of this.kbData.topics) {
          const kw = (t["keywords_" + lang] || "") + " " + t.title;
          const words = kw.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !STOP_WORDS.has(w));
          if (words.some(w => {
            const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            return new RegExp("(?:^|[^\\w\\u0600-\\u06FF])" + escaped + "(?:$|[^\\w\\u0600-\\u06FF])", "i").test(lower);
          })) {
            answer = t[lang] || t.en;
            if (answer) {
              matchedTopic = "website_info";
              break;
            }
          }
        }
      }

      if (!answer) {
        matchedTopic = "fallback";
        answer = (RHINE_KNOWLEDGE[lang] || RHINE_KNOWLEDGE.en).fallback;
      }

      this._setStatus("Active");
      this.chatSend.disabled = false;
      this.setCaptionAndSpeak(answer, true, question, matchedTopic);

      // After answering a contact/consultation question, offer the meeting flow
      if (matchedTopic === "contact" || matchedTopic === "hours" || matchedTopic === "pricing") {
        setTimeout(() => this._offerMeeting(), 2200);
      }
    }

    setCaptionAndSpeak(text, autoSpeak = true, customerQuestion = null, topicKey = null) {
      this.lastCaption = text;
      this.captionContent.textContent = "";

      // Dynamic heading and badge update as per user question / topic
      const isAr = this.options.language === "ar" || /[\u0600-\u06FF]/.test(text);
      const titles = (TOPIC_TITLES && (TOPIC_TITLES[isAr ? 'ar' : 'en'] || TOPIC_TITLES.en)) || {};
      let displayTitle = (topicKey && titles[topicKey]) ? titles[topicKey] : (customerQuestion ? customerQuestion.slice(0, 32) : this.options.title);
      if (this.topTitleEl && displayTitle) {
        this.topTitleEl.textContent = displayTitle;
      }
      if (this.captionBadgeText && displayTitle) {
        this.captionBadgeText.textContent = displayTitle.toUpperCase();
      }

      if (customerQuestion) {
        const qEl = document.createElement("div");
        qEl.className = "rhine-caption-q";
        qEl.innerHTML = `<strong>${this.options.language === 'ar' ? 'سؤالك:' : 'You asked:'}</strong> "${this._escapeHtml(customerQuestion)}"`;
        this.captionContent.appendChild(qEl);
      }

      const aEl = document.createElement("div");
      aEl.className = "rhine-caption-a";
      aEl.textContent = text;
      this.captionContent.appendChild(aEl);
      this.captionOverlay.scrollTop = 0;

      // Note: captions remain hidden unless user clicks the CC button
      if (autoSpeak && !this.isSpeechMuted) {
        setTimeout(() => this.speak(text), 100);
      }
    }

    speak(text) {
      if (this.isSpeechMuted) return;
      this.stopSpeech();

      const hasArabicChars = /[\u0600-\u06FF]/.test(text);
      const isAr = this.options.language === "ar" || hasArabicChars;
      const clean = text.replace(/[*_#`~\[\]•]/g, " ").replace(/\n/g, ". ").trim();
      if (!clean) return;

      // Audio stream fallback for fluent Arabic when no native voice is installed
      const _speakViaAudioStream = (txt) => {
        const sentences = txt.match(/[^.!?،؟;\n]+[.!?،؟;\n]*/g) || [txt];
        const chunks = [];
        let curr = "";
        for (const s of sentences) {
          if ((curr + " " + s).trim().length <= 150) {
            curr = (curr + " " + s).trim();
          } else {
            if (curr) chunks.push(curr);
            curr = s.trim().slice(0, 150);
          }
        }
        if (curr) chunks.push(curr);
        if (chunks.length === 0) chunks.push(txt.slice(0, 150));

        let idx = 0;
        this.isSpeaking = true;
        this._setVideoActive(true);
        this._setStatus(isAr ? "المقدم يتحدث..." : "AI Presenter speaking...");

        const playNext = () => {
          if (!this.isSpeaking || idx >= chunks.length) {
            this.isSpeaking = false;
            this._setVideoActive(false);
            this._setStatus("Active");
            this._activeAudio = null;
            return;
          }
          const chunk = chunks[idx++];
          const localUrl = "/api/agent/tts?text=" + encodeURIComponent(chunk) + "&lang=" + (isAr ? "ar" : "en");
          const directUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(chunk) + "&tl=ar&client=tw-ob";

          const speakSpeechSynthFallback = () => {
            try {
              const u = new SpeechSynthesisUtterance(chunk);
              u.lang = isAr ? "ar-SA" : "en-US";
              u.rate = 0.92;
              u.onend = () => playNext();
              u.onerror = () => playNext();
              window.speechSynthesis.speak(u);
            } catch {
              playNext();
            }
          };

          const playAudio = (src, onFail) => {
            const audio = new Audio();
            this._activeAudio = audio;
            audio.src = src;
            audio.onended = () => playNext();
            audio.onerror = () => onFail();
            const p = audio.play();
            if (p !== undefined) {
              p.catch(() => onFail());
            }
          };

          playAudio(localUrl, () => {
            playAudio(directUrl, () => {
              speakSpeechSynthFallback();
            });
          });
        };

        playNext();
      };

      // Native SpeechSynthesis check
      if ("speechSynthesis" in window) {
        const _doSpeak = () => {
          const allVoices = window.speechSynthesis.getVoices();
          let voice = null;

          if (isAr) {
            const arTags = ["ar-sa", "ar-ae", "ar-eg", "ar-jo", "ar-kw", "ar"];
            for (const tag of arTags) {
              const found = allVoices.find(v => v.lang.toLowerCase() === tag);
              if (found) { voice = found; break; }
            }
            if (!voice) {
              voice = allVoices.find(v => v.lang.toLowerCase().startsWith("ar") || /arabic|عرب|salma|tariq|maged|layla|zeina/i.test(v.name));
            }

            // CRITICAL: If no Arabic voice found on Windows/browser, NEVER fall back to English voice!
            // Instead stream authentic Arabic audio via Google TTS
            if (!voice) {
              _speakViaAudioStream(clean);
              return;
            }
          } else {
            const enVoices = allVoices.filter(v => v.lang.toLowerCase().startsWith("en"));
            voice =
              enVoices.find(v => /samantha|zira|karen|moira|susan|natural|online/i.test(v.name)) ||
              enVoices.find(v => /female/i.test(v.name)) ||
              enVoices[0] || null;
          }

          const utterance = new SpeechSynthesisUtterance(clean.slice(0, 600));
          utterance.lang = isAr ? "ar-SA" : "en-US";
          utterance.rate = isAr ? 0.9 : 0.95;
          utterance.pitch = 1.05;
          if (voice) utterance.voice = voice;

          utterance.onstart = () => {
            this.isSpeaking = true;
            this._setVideoActive(true);
            this._setStatus(isAr ? "المقدم يتحدث..." : "AI Presenter speaking...");
          };

          utterance.onend = () => {
            this.isSpeaking = false;
            this._setVideoActive(false);
            this._setStatus("Active");
          };

          utterance.onerror = (e) => {
            console.warn("TTS error:", e);
            this.isSpeaking = false;
            this._setVideoActive(false);
            this._setStatus("Active");
            if (isAr) _speakViaAudioStream(clean);
          };

          if (window.speechSynthesis.paused) window.speechSynthesis.resume();
          try {
            window.speechSynthesis.speak(utterance);
          } catch (e) {
            console.warn("Speech synthesis speak error:", e);
            if (isAr) _speakViaAudioStream(clean);
          }
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          window.speechSynthesis.addEventListener("voiceschanged", _doSpeak, { once: true });
        } else {
          setTimeout(_doSpeak, 50);
        }
      } else if (isAr) {
        _speakViaAudioStream(clean);
      }
    }

    stopSpeech() {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (this._activeAudio) {
        try {
          this._activeAudio.pause();
          this._activeAudio.currentTime = 0;
        } catch {}
        this._activeAudio = null;
      }
      this.isSpeaking = false;
      this._setVideoActive(false);
    }

    _setVideoActive(active) {
      if (active) {
        this.widgetEl.classList.add("rhine-speaking");
        if (this.videoEl && !this.videoFallbackEl.classList.contains("visible")) {
          // Always keep video muted — TTS provides the voice
          this.videoEl.muted = true;
          this.videoEl.loop = true;
          const p = this.videoEl.play();
          if (p !== undefined) p.catch(() => {});
        }
      } else {
        this.widgetEl.classList.remove("rhine-speaking");
        if (this.videoEl) {
          try {
            this.videoEl.pause();
          } catch {}
        }
      }
    }

    _escapeHtml(str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MEETING REQUEST FLOW
    // ─────────────────────────────────────────────────────────────────────────

    /** Offer the meeting flow inline (called after contact/pricing answers). */
    _offerMeeting() {
      if (this._meetingFlow && this._meetingFlow.active) return;
      const lang = this.options.language;
      const mt = MEETING_TEXT[lang] || MEETING_TEXT.en;
      this._renderMeetingOfferChips(mt);
    }

    /** Public API to open the avatar widget and start meeting request flow */
    startMeetingFlow() {
      if (!this.isOpen) {
        this.open();
      }
      this._startMeetingFlow();
    }

    /** Start the meeting flow immediately (triggered by explicit meeting intent or button). */
    _startMeetingFlow() {
      if (!this.isOpen) {
        this.open();
      }
      if (this.isListening) {
        this._stopListening();
      }
      const lang = this.options.language;
      const mt = MEETING_TEXT[lang] || MEETING_TEXT.en;
      this.stopSpeech();
      this.setCaptionAndSpeak(mt.offerQ, true, null, "contact");
      this._renderMeetingOfferChips(mt);
    }

    /** Render the Yes / Not Now chips below the chat input. */
    _renderMeetingOfferChips(mt) {
      this._clearMeetingUI();
      const container = document.createElement("div");
      container.id = "rhineMeetingOffer";
      container.className = "rhine-meeting-actions";
      container.innerHTML = `
        <button type="button" class="rhine-meeting-chip primary" id="rhineMeetingYes">${this._escapeHtml(mt.offerYes)}</button>
        <button type="button" class="rhine-meeting-chip secondary" id="rhineMeetingNo">${this._escapeHtml(mt.offerNo)}</button>
      `;
      this.chatForm.insertAdjacentElement("beforebegin", container);

      container.querySelector("#rhineMeetingYes").addEventListener("click", () => {
        this._clearMeetingUI();
        this._initMeetingFlow();
        this._advanceMeetingStep();
      });
      container.querySelector("#rhineMeetingNo").addEventListener("click", () => {
        this._clearMeetingUI();
        const lang = this.options.language;
        const answer = lang === "ar"
          ? "حسناً! إذا احتجت مساعدة في أي وقت، فأنا هنا."
          : "No problem! Feel free to ask me anything else."; 
        this.setCaptionAndSpeak(answer, true, null, "contact");
      });
    }

    /** Initialise/reset the meeting data state. */
    _initMeetingFlow() {
      const lang = this.options.language;
      const mt = MEETING_TEXT[lang] || MEETING_TEXT.en;
      this._meetingFlow = {
        active: true,
        lang,
        mt,
        stepIndex: 0,
        data: {}
      };
    }

    /** Advance to the next step, show prompt and listen for input. */
    _advanceMeetingStep() {
      const flow = this._meetingFlow;
      if (!flow || !flow.active) return;
      const mt = flow.mt;
      const steps = mt.steps;

      if (flow.stepIndex >= steps.length) {
        // All steps collected — show review
        this._showMeetingReview();
        return;
      }

      const step = steps[flow.stepIndex];
      const promptText = typeof step.prompt === "function" ? step.prompt(flow.data) : step.prompt;
      this.setCaptionAndSpeak(promptText, true, null, "contact");

      // For the website step, also inject a "No Website" chip
      this._clearMeetingStepUI();
      if (step.optional) {
        const chip = document.createElement("div");
        chip.id = "rhineMeetingStepUI";
        chip.className = "rhine-meeting-actions";
        chip.innerHTML = `<button type="button" class="rhine-meeting-chip secondary" id="rhineMeetingNoWebsite">${this._escapeHtml(mt.noWebsite)}</button>`;
        this.chatForm.insertAdjacentElement("beforebegin", chip);
        chip.querySelector("#rhineMeetingNoWebsite").addEventListener("click", () => {
          this._clearMeetingStepUI();
          this._saveMeetingValue(mt.noWebsite);
        });
      }

      // Focus the input to invite typing/voice
      if (this.chatInput) {
        this.chatInput.placeholder = flow.lang === "ar" ? "اكتب إجابتك هنا..." : "Type your answer here...";
        this.chatInput.focus();
      }
    }

    /** Called when user submits text while meeting flow is active. */
    _handleMeetingInput(value) {
      const flow = this._meetingFlow;
      if (!flow || !flow.active) return;
      const step = flow.mt.steps[flow.stepIndex];
      if (!step) return;

      const error = step.validate ? step.validate(value) : null;
      if (error) {
        const errText = flow.mt.validationError(error);
        this.setCaptionAndSpeak(errText, true, null, "contact");
        if (this.chatInput) this.chatInput.value = "";
        return;
      }

      this._saveMeetingValue(value.trim());
    }

    /** Save a validated value, advance to next step. */
    _saveMeetingValue(value) {
      const flow = this._meetingFlow;
      const step = flow.mt.steps[flow.stepIndex];
      flow.data[step.key] = value;
      flow.stepIndex++;
      this._clearMeetingStepUI();
      if (this.chatInput) this.chatInput.value = "";
      this._advanceMeetingStep();
    }

    /** Render the full review modal. */
    _showMeetingReview() {
      const flow = this._meetingFlow;
      const mt = flow.mt;
      const data = flow.data;
      this._clearMeetingUI();

      this.setCaptionAndSpeak(mt.reviewTitle, true, null, "contact");

      const overlay = document.createElement("div");
      overlay.id = "rhineMeetingModal";
      overlay.className = "rhine-modal-overlay";

      const isAr = flow.lang === "ar";

      const rows = mt.steps.map(s => `
        <tr>
          <td class="rhine-review-label">${this._escapeHtml(s.label)}</td>
          <td class="rhine-review-value">${this._escapeHtml(data[s.key] || "—")}</td>
        </tr>
      `).join("");

      overlay.innerHTML = `
        <div class="rhine-modal-box" dir="${isAr ? 'rtl' : 'ltr'}">
          <div class="rhine-modal-header">
            <span>${isAr ? '📋 مراجعة طلب الاجتماع' : '📋 Review Meeting Request'}</span>
          </div>
          <div class="rhine-modal-body">
            <table class="rhine-review-table">
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="rhine-modal-footer">
            <button type="button" class="rhine-modal-btn primary" id="rhineMeetingConfirm">${this._escapeHtml(mt.confirmBtn)}</button>
            <button type="button" class="rhine-modal-btn secondary" id="rhineMeetingEdit">${this._escapeHtml(mt.editBtn)}</button>
            <button type="button" class="rhine-modal-btn cancel" id="rhineMeetingCancel">${this._escapeHtml(mt.cancelBtn)}</button>
          </div>
        </div>
      `;

      this.widgetEl.appendChild(overlay);

      overlay.querySelector("#rhineMeetingConfirm").addEventListener("click", () => {
        overlay.remove();
        this._submitMeetingRequest();
      });
      overlay.querySelector("#rhineMeetingEdit").addEventListener("click", () => {
        overlay.remove();
        this._showMeetingEditForm();
      });
      overlay.querySelector("#rhineMeetingCancel").addEventListener("click", () => {
        overlay.remove();
        this._cancelMeetingFlow();
      });
    }

    /** Render editable form so user can change any field before re-confirming. */
    _showMeetingEditForm() {
      const flow = this._meetingFlow;
      const mt = flow.mt;
      const data = flow.data;
      const isAr = flow.lang === "ar";

      const overlay = document.createElement("div");
      overlay.id = "rhineMeetingModal";
      overlay.className = "rhine-modal-overlay";

      const fields = mt.steps.map(s => `
        <div class="rhine-edit-field">
          <label class="rhine-edit-label" for="rhineEdit_${s.key}">${this._escapeHtml(s.label)}</label>
          ${s.key === "topic" 
            ? `<textarea class="rhine-edit-textarea" id="rhineEdit_${s.key}" rows="3">${this._escapeHtml(data[s.key] || "")}</textarea>`
            : `<input type="text" class="rhine-edit-input" id="rhineEdit_${s.key}" value="${this._escapeHtml(data[s.key] || "")}" />`
          }
        </div>
      `).join("");

      overlay.innerHTML = `
        <div class="rhine-modal-box" dir="${isAr ? 'rtl' : 'ltr'}">
          <div class="rhine-modal-header">
            <span>${isAr ? '✏️ تعديل المعلومات' : '✏️ Edit Information'}</span>
          </div>
          <div class="rhine-modal-body">
            <div class="rhine-edit-form">${fields}</div>
          </div>
          <div class="rhine-modal-footer">
            <button type="button" class="rhine-modal-btn primary" id="rhineMeetingEditSave">${this._escapeHtml(mt.editSaveBtn)}</button>
            <button type="button" class="rhine-modal-btn secondary" id="rhineMeetingEditBack">${this._escapeHtml(mt.editCancelBtn)}</button>
          </div>
        </div>
      `;

      this.widgetEl.appendChild(overlay);

      overlay.querySelector("#rhineMeetingEditSave").addEventListener("click", () => {
        // Validate & save each field
        let allOk = true;
        for (const s of mt.steps) {
          const el = overlay.querySelector(`#rhineEdit_${s.key}`);
          if (!el) continue;
          const val = el.value.trim();
          const err = s.validate ? s.validate(val) : null;
          if (err && !s.optional) {
            el.style.borderColor = "#ef4444";
            el.title = err;
            allOk = false;
          } else {
            el.style.borderColor = "";
            data[s.key] = val;
          }
        }
        if (allOk) {
          overlay.remove();
          this._showMeetingReview();
        }
      });

      overlay.querySelector("#rhineMeetingEditBack").addEventListener("click", () => {
        overlay.remove();
        this._showMeetingReview();
      });
    }

    /** Submit the meeting request to /api/agent/meeting-request. */
    async _submitMeetingRequest() {
      const flow = this._meetingFlow;
      if (!flow) return;
      const mt = flow.mt;
      const data = flow.data;

      this.setCaptionAndSpeak(mt.submitting, true, null, "contact");
      this._setStatus(flow.lang === "ar" ? "جارٍ الإرسال..." : "Sending...");

      const payload = {
        fullName: data.fullName || "",
        companyName: data.companyName || "",
        website: data.website || "",
        email: data.email || "",
        telephone: data.telephone || "",
        meetingTopic: data.topic || "",
        preferredDateTime: data.preferredTime || "",
        language: flow.lang
      };

      try {
        const headers = { "Content-Type": "application/json" };
        if (this.options.antiForgeryToken) {
          headers[this.options.antiForgeryHeader] = this.options.antiForgeryToken;
        }
        const resp = await fetch("/api/agent/meeting-request", {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          const result = await resp.json();
          if (result && result.success) {
            this._meetingFlow = null;
            this._showMeetingResult(true, mt.successMsg(data.fullName || ""), mt);
            return;
          }
        }
        // Server returned error or non-ok status
        this._showMeetingResult(false, mt.failMsg, mt);
      } catch {
        this._showMeetingResult(false, mt.failMsg, mt);
      }
    }

    /** Display success or failure result with appropriate actions. */
    _showMeetingResult(success, message, mt) {
      const isAr = (mt === (MEETING_TEXT.ar));
      this.setCaptionAndSpeak(message, true, null, success ? "contact" : "fallback");

      if (!success) {
        // Offer retry chip
        const chip = document.createElement("div");
        chip.id = "rhineMeetingRetry";
        chip.className = "rhine-meeting-actions";
        chip.innerHTML = `<button type="button" class="rhine-meeting-chip primary" id="rhineMeetingRetryBtn">${this._escapeHtml(mt.retryBtn)}</button>`;
        this.chatForm.insertAdjacentElement("beforebegin", chip);
        chip.querySelector("#rhineMeetingRetryBtn").addEventListener("click", () => {
          chip.remove();
          this._showMeetingReview();
        });
      } else {
        this._meetingFlow = null;
        this._clearMeetingUI();
        if (this.chatInput) {
          this.chatInput.placeholder = isAr ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
        }
      }
      this._setStatus("Active");
    }

    /** Cancel the entire meeting flow. */
    _cancelMeetingFlow() {
      this._meetingFlow = null;
      this._clearMeetingUI();
      const lang = this.options.language;
      const answer = lang === "ar"
        ? "تم إلغاء طلب الاجتماع. إذا أردت المحاولة مرة أخرى في أي وقت، فقط اسألني."
        : "Your meeting request has been cancelled. Feel free to ask me anything else or arrange a meeting any time.";
      this.setCaptionAndSpeak(answer, true, null, "contact");
      if (this.chatInput) {
        this.chatInput.placeholder = lang === "ar" ? "تحدث أو اكتب سؤالك..." : "Speak or type your question...";
      }
    }

    /** Remove persistent meeting offer chips/step UI (not the modal). */
    _clearMeetingUI() {
      ["rhineMeetingOffer", "rhineMeetingStepUI", "rhineMeetingRetry"].forEach(id => {
        const el = this.widgetEl.querySelector(`#${id}`) || document.getElementById(id);
        if (el) el.remove();
      });
    }

    /** Remove only the step UI (e.g. No Website chip). */
    _clearMeetingStepUI() {
      const el = this.widgetEl.querySelector("#rhineMeetingStepUI") || document.getElementById("rhineMeetingStepUI");
      if (el) el.remove();
    }
  }

  global.RhineAvatarWidget = RhineAvatarWidget;
})(typeof window !== "undefined" ? window : this);
