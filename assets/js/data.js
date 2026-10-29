/* Pure Talent — team data and chatbot knowledge.
   Images are language-independent so every language shows the right face.
   If a photo path is wrong, the card falls back to the person's initials. */
window.PT_TEAM = [
  {
    image: "assets/images/team/ceo.jpg",
    name: { en: "Salem Al Katheeri", ar: "سالم الكثيري", ru: "Салем Аль-Катхири" },
    title: { en: "Chief Executive Officer (CEO)", ar: "الرئيس التنفيذي", ru: "Генеральный директор (CEO)" },
    bio: {
      en: "Leads the company's vision, strategic growth, and operational excellence while ensuring the highest standards of workforce solutions and client satisfaction.",
      ar: "يقود رؤية الشركة وخططها الاستراتيجية ويشرف على تطوير الأعمال وضمان أعلى معايير الجودة في تقديم حلول الموارد البشرية.",
      ru: "Определяет стратегию развития компании и обеспечивает высокие стандарты качества услуг по подбору персонала."
    }
  },
  {
    image: "assets/images/team/member-1.jpg",
    name: { en: "Latifa Al Katheeri", ar: "لطيفة الكثيري", ru: "Латифа Аль-Катхири" },
    title: { en: "General Manager", ar: "المدير العام", ru: "Генеральный менеджер" },
    bio: {
      en: "Oversees daily business operations, corporate performance, and organizational development to achieve sustainable growth.",
      ar: "تشرف على العمليات اليومية للشركة وتطوير الأداء المؤسسي وتحقيق أهداف النمو والاستدامة.",
      ru: "Руководит ежедневной деятельностью компании, контролирует эффективность и устойчивое развитие бизнеса."
    }
  },
  {
    image: "",
    name: { en: "Ali Khatib", ar: "علي خطيب", ru: "Али Хатиб" },
    title: { en: "Operations Manager", ar: "مدير العمليات", ru: "Операционный менеджер" },
    bio: {
      en: "Manages workforce operations, mobilization, compliance, and service delivery to ensure efficient execution across all projects.",
      ar: "يشرف على تشغيل القوى العاملة وإدارة العمليات اليومية وضمان تنفيذ الخدمات بكفاءة وجودة عالية.",
      ru: "Управляет операционной деятельностью, мобилизацией персонала и качеством предоставления услуг."
    }
  },
  {
    image: "",
    name: { en: "Sultan Saeed", ar: "سلطان سعيد", ru: "Султан Саид" },
    title: { en: "Public Relations Manager", ar: "مدير العلاقات العامة", ru: "Менеджер по связям с общественностью" },
    bio: {
      en: "Builds strong relationships with government entities, partners, and stakeholders while strengthening the company's public image.",
      ar: "يعزز العلاقات مع الجهات الحكومية والعملاء والشركاء ويساهم في بناء الصورة المؤسسية للشركة.",
      ru: "Развивает отношения с государственными органами, партнёрами и укрепляет корпоративный имидж компании."
    }
  },
  {
    image: "assets/images/team/member-2.jpg",
    name: { en: "Sophia Anderson", ar: "صوفيا أندرسون", ru: "София Андерсон" },
    title: { en: "HR Manager", ar: "مدير الموارد البشرية", ru: "HR-менеджер" },
    bio: {
      en: "Leads recruitment strategies, employee relations, performance management, and talent development across the organization.",
      ar: "تقود عمليات التوظيف وإدارة الموظفين وتطوير الكفاءات وتحسين بيئة العمل.",
      ru: "Отвечает за подбор персонала, развитие сотрудников и управление кадровой политикой компании."
    }
  },
  {
    image: "assets/images/team/member-3.jpg",
    name: { en: "Emma Wilson", ar: "إيما ويلسون", ru: "Эмма Уилсон" },
    title: { en: "Business Development Manager", ar: "مدير تطوير الأعمال", ru: "Менеджер по развитию бизнеса" },
    bio: {
      en: "Develops new business opportunities, strengthens client partnerships, and drives long-term commercial growth.",
      ar: "تعمل على توسيع قاعدة العملاء وبناء شراكات استراتيجية وتعزيز نمو الشركة.",
      ru: "Развивает новые направления бизнеса, привлекает клиентов и укрепляет коммерческие партнёрства."
    }
  },
  {
    image: "assets/images/team/member-4.jpg",
    name: { en: "Olivia Carter", ar: "أوليفيا كارتر", ru: "Оливия Картер" },
    title: { en: "Talent Acquisition Specialist", ar: "أخصائي استقطاب المواهب", ru: "Специалист по подбору талантов" },
    bio: {
      en: "Identifies, attracts, and recruits qualified professionals while ensuring an exceptional candidate experience.",
      ar: "تتولى استقطاب أفضل الكفاءات وإدارة عمليات التوظيف بما يتوافق مع احتياجات الشركة والعملاء.",
      ru: "Занимается поиском, оценкой и привлечением высококвалифицированных специалистов."
    }
  }
];

/* Chatbot knowledge base. Matching is phrase-based: longer keyword matches score higher. */
window.PT_CHATBOT_DATA = {
  welcome: {
    en: "Welcome to Pure Talent. Ask me about recruitment, manpower supply, careers, services, news, or contact details.",
    ar: "مرحبًا بك في بيور تالنت. اسألني عن التوظيف أو توريد القوى العاملة أو الوظائف أو الخدمات أو الأخبار أو بيانات التواصل.",
    ru: "Добро пожаловать в Pure Talent. Спросите меня о подборе персонала, поставке рабочей силы, вакансиях, услугах, новостях или контактных данных."
  },
  noResult: {
    en: "I could not find an exact answer yet. Please contact info@puretalent.ae or call 02 666 0935 for confirmed assistance.",
    ar: "لم أجد إجابة دقيقة بعد. يرجى التواصل عبر info@puretalent.ae أو الاتصال على 02 666 0935.",
    ru: "Точного ответа пока не нашлось. Свяжитесь с нами по адресу info@puretalent.ae или позвоните по номеру 02 666 0935."
  },
  entries: [
    {
      id: "company",
      keywords: [
        "company", "about us", "about pure talent", "pure talent", "who are you", "what do you do", "company profile",
        "overview", "who we are", "recruitment agency", "manpower agency", "staffing agency", "hr company", "employment agency",
        "founded", "established", "company history", "license", "licensed", "registered", "legitimate", "trusted", "mission", "vision", "why choose",
        "شركة", "عن الشركة", "عن بيور تالنت", "من انتم", "من أنتم", "ماذا تفعلون", "نبذة", "شركة توظيف", "مكتب توظيف", "تأسست", "ترخيص", "مرخصة", "موثوقة", "رؤية", "رسالة الشركة", "من نحن",
        "компания", "о компании", "о нас", "кто вы", "чем занимается", "кадровое агентство", "рекрутинговое агентство", "основана", "лицензия", "надежная", "надёжная", "миссия"
      ],
      answers: {
        en: "Pure Talent Recruitment & Manpower Supply provides professional recruitment, staffing, outsourcing, and manpower supply support for organizations that need dependable talent.",
        ar: "تقدم بيور تالنت للتوظيف وتوريد القوى العاملة خدمات توظيف وموارد بشرية وتعهيد مهني للشركات التي تحتاج إلى كفاءات موثوقة.",
        ru: "Pure Talent Recruitment & Manpower Supply предоставляет профессиональные услуги по подбору персонала, аутстаффингу, аутсорсингу и поставке рабочей силы для организаций, нуждающихся в надёжных специалистах."
      }
    },
    {
      id: "services",
      keywords: [
        "service", "services", "what services", "what do you offer", "your services", "staffing", "outsourcing", "placement",
        "permanent recruitment", "contract staffing", "temporary staffing", "executive search", "headhunting", "onboarding",
        "workforce planning", "hr outsourcing", "hr services", "payroll", "visa", "work permit", "labor supply", "labour supply",
        "manpower supply", "manpower services", "bulk hiring", "background check", "screening", "can you supply workers",
        "خدمات", "خدمة", "ما هي خدماتكم", "ماذا تقدمون", "توريد القوى العاملة", "توظيف دائم", "توظيف مؤقت", "توظيف تعاقدي", "البحث التنفيذي", "تعهيد", "استقدام", "رواتب", "تأشيرة", "تأشيرات", "عمالة",
        "услуги", "какие услуги", "поставка рабочей силы", "аутстаффинг", "аутсорсинг", "постоянный подбор", "контрактный", "поиск руководителей", "хедхантинг", "зарплат", "виза", "персонал"
      ],
      answers: {
        en: "Our core services include manpower supply, permanent recruitment, contract staffing, executive search, HR outsourcing, and workforce planning.",
        ar: "تشمل خدماتنا توريد القوى العاملة، التوظيف الدائم، التوظيف التعاقدي، البحث التنفيذي، تعهيد الموارد البشرية، وتخطيط القوى العاملة.",
        ru: "Наши ключевые услуги: поставка рабочей силы, постоянный подбор персонала, контрактный стаффинг, поиск руководителей, HR-аутсорсинг и планирование персонала."
      }
    },
    {
      id: "careers",
      keywords: [
        "career", "careers", "job", "jobs", "apply", "how to apply", "submit cv", "submit resume", "send cv", "send resume",
        "vacancy", "vacancies", "open positions", "job openings", "application", "hiring", "are you hiring", "join your team",
        "internship", "fresh graduate", "looking for a job", "looking for work", "cv", "resume",
        "وظائف", "وظيفة", "تقديم", "كيف أتقدم", "السيرة الذاتية", "فرص عمل", "شواغر", "هل توظفون", "أبحث عن عمل", "ابحث عن عمل", "تدريب", "خريج",
        "карьера", "вакансии", "вакансия", "работа", "подать заявку", "резюме", "стажировка", "ищу работу", "выпускник"
      ],
      answers: {
        en: "You can apply through the Careers form on our home page. Send your details and attach your CV (PDF or Word, up to 5 MB). Our recruitment team reviews every application.",
        ar: "يمكنك التقديم من خلال نموذج الوظائف في الصفحة الرئيسية. أرسل بياناتك وأرفق سيرتك الذاتية (PDF أو Word بحجم أقصاه 5 ميغابايت). يراجع فريق التوظيف كل طلب.",
        ru: "Вы можете подать заявку через форму «Карьера» на главной странице. Отправьте данные и прикрепите резюме (PDF или Word, до 5 МБ). Наша команда рассматривает каждую заявку."
      },
      link: { href: "index.html#careers", label: { en: "Open the careers form", ar: "فتح نموذج الوظائف", ru: "Открыть форму" } }
    },
    {
      id: "news",
      keywords: [
        "news", "latest news", "announcement", "announcements", "updates", "press", "blog",
        "أخبار", "الأخبار", "اخبار", "آخر الأخبار", "مستجدات", "إعلانات",
        "новости", "последние новости", "объявления", "обновления"
      ],
      answers: {
        en: "You can read our announcements and hiring updates on the News page.",
        ar: "يمكنك قراءة إعلاناتنا ومستجدات التوظيف في صفحة الأخبار.",
        ru: "Объявления и новости о найме доступны на странице «Новости»."
      },
      link: { href: "news.html", label: { en: "Open the News page", ar: "فتح صفحة الأخبار", ru: "Открыть новости" } }
    },
    {
      id: "contact",
      keywords: [
        "contact", "contact us", "phone", "phone number", "telephone", "call", "email", "email address", "location", "address",
        "where are you located", "where is your office", "map", "directions", "office address", "opening hours", "working hours",
        "business hours", "whatsapp", "social media", "linkedin", "facebook", "get in touch", "reach you", "support",
        "اتصال", "تواصل", "هاتف", "رقم الهاتف", "اتصل بنا", "بريد", "البريد الالكتروني", "البريد الإلكتروني", "الموقع", "العنوان", "اين تقعون", "أين تقعون", "خريطة", "ساعات العمل", "اوقات العمل", "واتساب", "لينكدإن", "فيسبوك",
        "контакт", "контакты", "связаться", "телефон", "позвонить", "почта", "адрес", "где вы находитесь", "где офис", "карта", "маршрут", "часы работы", "whatsapp", "линкедин", "фейсбук"
      ],
      answers: {
        en: "Contact Pure Talent at 02 666 0935 or info@puretalent.ae. Location: Baynunah Tower 2, Corniche Street, Level 4, Office 114, Al Hisn, Al Markaziyah West, Abu Dhabi.",
        ar: "تواصل مع بيور تالنت على 02 666 0935 أو info@puretalent.ae. الموقع: برج بينونة 2، شارع الكورنيش، الطابق الرابع، مكتب 114، الحصن، المركزية غرب، أبوظبي.",
        ru: "Свяжитесь с Pure Talent по номеру 02 666 0935 или info@puretalent.ae. Адрес: Baynunah Tower 2, Corniche Street, 4 этаж, офис 114, Al Hisn, Al Markaziyah West, Абу-Даби."
      },
      link: { href: "index.html#contact", label: { en: "Open the map", ar: "فتح الخريطة", ru: "Открыть карту" } }
    }
  ]
};
