/* ============================================================
   Pure Talent Recruitment & Manpower Supply — main.js
   Language switching: EN | AR | RU
   ============================================================ */

const PT_LANG_KEY = "pureTalentLanguage";

/* ── Translations ─────────────────────────────────────────── */
const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navClients: "Clients",
    navCareers: "Careers",
    navTeam: "Our Team",
    navContact: "Contact",
    heroEyebrow: "UAE Recruitment & Manpower Supply",
    heroTitle: "Talent delivered with precision, dignity, and trust.",
    heroCopy: "Pure Talent connects leading organizations with reliable people across recruitment, staffing, outsourcing, and manpower supply.",
    ctaApply: "Apply Now",
    ctaExplore: "Explore Services",
    ctaClientRequest: "Client Request",
    proofYears: "Years of Experience",
    proofClients: "Clients Served",
    proofTalent: "Employees Supplied",
    aboutEyebrow: "About Us",
    aboutTitle: "A premium workforce partner built for dependable business growth.",
    aboutCopy: "Pure Talent Recruitment & Manpower Supply supports companies with carefully selected candidates, compliant manpower processes, and responsive account management. We combine market knowledge with a people-first approach to help employers scale confidently.",
    aboutNoteTitle: "Reliable by design",
    aboutNoteCopy: "From sourcing to onboarding, every step is handled with clarity, discretion, and professional care.",
    ceoEyebrow: "CEO Message",
    ceoTitle: "Building stronger teams through trusted talent solutions.",
    ceoCopy: "At Pure Talent, our mission is to provide dependable manpower recruitment solutions that help businesses build capable teams with confidence. We are committed to making the recruitment process transparent, responsive, and truly aligned with what employers need—while ensuring every candidate is treated with respect, fairness, and equal opportunity. As a trusted recruitment partner, we focus on understanding each client’s workforce goals and connecting them with the right talent in a way that is efficient, ethical, and impact-driven. Ultimately, we aim to support long-term growth by matching the right people to the right opportunities—creating stronger teams, better outcomes, and lasting success for both employers and candidates.",
    ceoName: "Chief Executive Officer",
    visionTitle: "Vision",
    visionCopy: "To become a trusted regional leader in recruitment and manpower supply, recognized for quality, integrity, and long-term workforce value.",
    missionTitle: "Mission",
    missionCopy: "To deliver skilled, reliable, and compliant workforce solutions that help clients operate efficiently while creating meaningful employment pathways.",
    offerEyebrow: "What We Offer",
    offerTitle: "Complete manpower solutions for modern companies.",
    service1Title: "Manpower Supply",
    service1Copy: "Reliable workforce deployment for operational, industrial, hospitality, facilities, and corporate requirements.",
    service2Title: "Permanent Recruitment",
    service2Copy: "Targeted candidate sourcing, screening, shortlisting, and placement for critical long-term roles.",
    service3Title: "Contract Staffing",
    service3Copy: "Flexible staffing programs designed for project timelines, seasonal demand, and business continuity.",
    service4Title: "Executive Search",
    service4Copy: "Confidential leadership hiring with structured evaluation and market-sensitive outreach.",
    service5Title: "HR Outsourcing",
    service5Copy: "Support for onboarding, workforce coordination, payroll workflows, and employee documentation.",
    service6Title: "Workforce Planning",
    service6Copy: "Practical talent planning that aligns staffing levels with operational goals and budgets.",
    statsEyebrow: "Performance",
    statsTitle: "Numbers that reflect disciplined delivery.",
    statYears: "Years of Experience",
    statClients: "Clients Served",
    statEmployees: "Employees Supplied",
    statPlacements: "Successful Placements",
    statSectors: "Industry Sectors",
    clientsEyebrow: "Clients",
    clientsTitle: "Trusted by organizations that value consistency.",
    clientsCopy: "A selection of client profiles representing the sectors we support with dependable recruitment and manpower supply.",
    testimonialsEyebrow: "Client Reviews",
    testimonialsTitle: "What our clients say about working with Pure Talent.",
    testimonialsCopy: "A simple view of the service standards our partners value most: responsiveness, clarity, and dependable delivery.",
    testimonial1Copy: "Pure Talent understood our staffing needs quickly and prepared a reliable shortlist with excellent communication throughout the process.",
    testimonial1Name: "Ahmed Al Mansoori",
    testimonial1Role: "Operations Manager",
    testimonial2Copy: "Their team made our manpower request clear, organized, and efficient. The follow-up was professional from the first call to mobilization.",
    testimonial2Name: "Natalia Petrova",
    testimonial2Role: "HR Director",
    testimonial3Copy: "We value Pure Talent for their fast response, respectful candidate handling, and practical understanding of urgent workforce requirements.",
    testimonial3Name: "Omar Hassan",
    testimonial3Role: "Project Lead",
    applicationEyebrow: "Career Application",
    applicationTitle: "Apply for your next opportunity.",
    applicationCopy: "Complete the form and your email app will open with a prepared message. Attach your CV manually before sending.",
    fullName: "Full Name",
    nationality: "Nationality",
    phone: "Phone Number",
    email: "Email Address",
    position: "Position Applying For",
    message: "Message",
    submitApplication: "Prepare Email",
    clientRequestEyebrow: "Business Enquiry",
    clientRequestTitle: "Send a client request or offer",
    clientRequestCopy: "Tell us what your company needs or share your offer, and your email app will open with a polished message ready to send.",
    companyName: "Company Name",
    clientEmail: "Business Email",
    clientMessage: "Request or Offer Details",
    sendClientRequest: "Send Message",
    contactEyebrow: "Visit Us",
    contactTitle: "Pure Talent Recruitment & Manpower Supply",
    contactCopy: "For business enquiries, manpower requests, recruitment partnerships, or applications, contact our team directly.",
    mapTitle: "Location & Directions",
    directions: "Get Directions",
    footerCopy: "Premium recruitment and manpower supply solutions for dependable organizations.",
    footerContact: "Contact Information",
    footerLinks: "Footer Links",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    chatbotTitle: "Pure Talent Assistant",
    chatbotSub: "Online knowledge search",
    chatPlaceholder: "Ask about services, careers, or contact...",
    visaRequestPrompt: "I opened the client request form so our team can guide you on visa types and the right process for your requirement.",
    teamHeroEyebrow: "Our Team",
    teamHeroTitle: "Leadership with discipline, empathy, and market insight.",
    teamHeroCopy: "Meet the people guiding Pure Talent's client service, recruitment quality, and workforce delivery.",
    teamIntroTitle: "A team built around trust and delivery.",
    teamIntroCopy: "Our leadership team combines recruitment discipline, operational follow-through, and responsive client communication across every engagement."
  },
  ar: {
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navServices: "الخدمات",
    navClients: "العملاء",
    navCareers: "الوظائف",
    navTeam: "فريقنا",
    navContact: "تواصل",
    heroEyebrow: "التوظيف وتوريد القوى العاملة في الإمارات",
    heroTitle: "نقدم المواهب بدقة وكرامة وثقة.",
    heroCopy: "تربط بيور تالنت المؤسسات الرائدة بالكفاءات الموثوقة عبر التوظيف والتعهيد وتوريد القوى العاملة.",
    ctaApply: "قدم الآن",
    ctaExplore: "استكشف الخدمات",
    ctaClientRequest: "طلب عميل",
    proofYears: "سنوات الخبرة",
    proofClients: "عميل تم خدمته",
    proofTalent: "موظف تم توفيره",
    aboutEyebrow: "من نحن",
    aboutTitle: "شريك قوى عاملة فاخر يدعم نمو الأعمال بثقة.",
    aboutCopy: "تدعم بيور تالنت الشركات بمرشحين مختارين بعناية وعمليات قوى عاملة متوافقة وإدارة حسابات سريعة الاستجابة.",
    aboutNoteTitle: "موثوقية مصممة باحتراف",
    aboutNoteCopy: "من البحث إلى الانضمام، تتم كل خطوة بوضوح وسرية ورعاية مهنية.",
    ceoEyebrow: "رسالة الرئيس التنفيذي",
    ceoTitle:"نبني فرقًا أقوى من خلال حلول توظيف موثوقة.",
    ceoCopy: "في بيور تالنت، تتمثل مهمتنا في توفير حلول توظيف موثوقة تساعد الشركات على بناء فرق عمل متميزة بثقة. ونحن ملتزمون بجعل عملية التوظيف شفافة وسريعة الاستجابة ومتوافقة تمامًا مع احتياجات أصحاب العمل، مع ضمان معاملة كل مرشح باحترام وإنصاف وتكافؤ الفرص. بصفتنا شريكًا موثوقًا في مجال التوظيف، نركز على فهم أهداف القوى العاملة لكل عميل وربطها بالمواهب المناسبة بطريقة تتسم بالكفاءة والأخلاق والتركيز على تحقيق التأثير. وفي النهاية، نهدف إلى دعم النمو على المدى الطويل من خلال مطابقة الأشخاص المناسبين مع الفرص المناسبة، مما يساهم في تكوين فرق أقوى ونتائج أفضل ونجاح دائم لكل من أصحاب العمل والمرشحين.",
    ceoName: "الرئيس التنفيذي",
    visionTitle: "الرؤية",
    visionCopy: "أن نصبح شريكا إقليميا موثوقا في التوظيف وتوريد القوى العاملة، معروفا بالجودة والنزاهة.",
    missionTitle: "الرسالة",
    missionCopy: "تقديم حلول قوى عاملة ماهرة وملتزمة تساعد العملاء على العمل بكفاءة وتفتح مسارات توظيف هادفة.",
    offerEyebrow: "ماذا نقدم",
    offerTitle: "حلول قوى عاملة متكاملة للشركات الحديثة.",
    service1Title: "توريد القوى العاملة",
    service1Copy: "توفير قوى عاملة موثوقة للمتطلبات التشغيلية والصناعية والضيافة والمرافق والشركات.",
    service2Title: "التوظيف الدائم",
    service2Copy: "بحث وفرز وترشيح وتعيين للوظائف المهمة طويلة الأمد.",
    service3Title: "التوظيف التعاقدي",
    service3Copy: "برامج مرنة للمشاريع والطلب الموسمي واستمرارية الأعمال.",
    service4Title: "البحث التنفيذي",
    service4Copy: "توظيف قيادي سري مع تقييم منظم وتواصل مدروس.",
    service5Title: "تعهيد الموارد البشرية",
    service5Copy: "دعم الانضمام وتنسيق القوى العاملة ومسارات الرواتب والوثائق.",
    service6Title: "تخطيط القوى العاملة",
    service6Copy: "تخطيط عملي يربط مستويات التوظيف بالأهداف والميزانيات.",
    statsEyebrow: "الأداء",
    statsTitle: "أرقام تعكس الانضباط في التنفيذ.",
    statYears: "سنوات الخبرة",
    statClients: "عملاء",
    statEmployees: "موظفون تم توفيرهم",
    statPlacements: "تعيينات ناجحة",
    statSectors: "قطاعات",
    clientsEyebrow: "العملاء",
    clientsTitle: "موثوقون لدى مؤسسات تقدّر الاستمرارية.",
    clientsCopy: "نماذج من ملفات العملاء والقطاعات التي ندعمها من خلال حلول توظيف وتوريد قوى عاملة موثوقة.",
    testimonialsEyebrow: "تقييمات العملاء",
    testimonialsTitle: "ماذا يقول عملاؤنا عن العمل مع بيور تالنت.",
    testimonialsCopy: "عرض بسيط لمعايير الخدمة التي يقدّرها شركاؤنا: سرعة الاستجابة، الوضوح، والالتزام بالتنفيذ.",
    testimonial1Copy: "فهمت بيور تالنت احتياجاتنا بسرعة وقدمت قائمة مرشحين موثوقة مع تواصل ممتاز طوال العملية.",
    testimonial1Name: "أحمد المنصوري",
    testimonial1Role: "مدير العمليات",
    testimonial2Copy: "جعل فريقهم طلب القوى العاملة واضحًا ومنظمًا وفعالًا. كانت المتابعة احترافية من أول اتصال حتى بدء العمل.",
    testimonial2Name: "ناتاليا بيتروفا",
    testimonial2Role: "مديرة الموارد البشرية",
    testimonial3Copy: "نقدّر بيور تالنت لسرعة الاستجابة، واحترام التعامل مع المرشحين، وفهم المتطلبات العاجلة للقوى العاملة.",
    testimonial3Name: "عمر حسن",
    testimonial3Role: "قائد مشروع",
    applicationEyebrow: "طلب توظيف",
    applicationTitle: "قدم لفرصتك التالية.",
    applicationCopy: "املأ النموذج وسيتم فتح تطبيق البريد برسالة جاهزة. أرفق سيرتك الذاتية قبل الإرسال.",
    fullName: "الاسم الكامل",
    nationality: "الجنسية",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    position: "الوظيفة المطلوبة",
    message: "الرسالة",
    submitApplication: "تحضير البريد",
    clientRequestEyebrow: "استفسار تجاري",
    clientRequestTitle: "إرسال طلب أو عرض",
    clientRequestCopy: "أخبرنا بما تحتاجه شركتك أو شاركنا عرضك، وسيتم فتح تطبيق البريد برسالة منسقة وجاهزة للإرسال.",
    companyName: "اسم الشركة",
    clientEmail: "البريد الإلكتروني للشركة",
    clientMessage: "تفاصيل الطلب أو العرض",
    sendClientRequest: "إرسال الرسالة",
    contactEyebrow: "قم بزيارتنا",
    contactTitle: "بيور تالنت للتوظيف وتوريد القوى العاملة",
    contactCopy: "للاستفسارات التجارية وطلبات القوى العاملة والشراكات أو التقديم، تواصل مع فريقنا.",
    mapTitle: "الموقع والاتجاهات",
    directions: "الحصول على الاتجاهات",
    footerCopy: "حلول توظيف وتوريد قوى عاملة راقية للمؤسسات الموثوقة.",
    footerContact: "معلومات التواصل",
    footerLinks: "روابط",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    chatbotTitle: "مساعد بيور تالنت",
    chatbotSub: "بحث معرفي متصل",
    chatPlaceholder: "اسأل عن الخدمات أو الوظائف أو التواصل...",
    visaRequestPrompt: "فتحت لك نموذج طلب العميل حتى يتمكن فريقنا من إرشادك حول أنواع الفيزا والإجراء الأنسب لطلبك.",
    teamHeroEyebrow: "فريقنا",
    teamHeroTitle: "قيادة تجمع الانضباط والتعاطف وفهم السوق.",
    teamHeroCopy: "تعرف إلى الفريق الذي يقود جودة التوظيف وخدمة العملاء وتنفيذ القوى العاملة.",
    teamIntroTitle: "فريق مبني على الثقة والتنفيذ.",
    teamIntroCopy: "يجمع فريق القيادة لدينا بين الانضباط في التوظيف والمتابعة التشغيلية والتواصل السريع مع العملاء في كل مشروع."
  },
  ru: {
    navHome: "Главная",
    navAbout: "О нас",
    navServices: "Услуги",
    navClients: "Клиенты",
    navCareers: "Карьера",
    navTeam: "Наша команда",
    navContact: "Контакты",
    heroEyebrow: "Рекрутмент и обеспечение персоналом в ОАЭ",
    heroTitle: "Таланты — с точностью, достоинством и доверием.",
    heroCopy: "Pure Talent связывает ведущие организации с надёжными специалистами в сфере рекрутмента, аутсорсинга и обеспечения персоналом.",
    ctaApply: "Подать заявку",
    ctaExplore: "Наши услуги",
    ctaClientRequest: "Запрос клиента",
    proofYears: "Лет опыта",
    proofClients: "Клиентов обслужено",
    proofTalent: "Сотрудников предоставлено",
    aboutEyebrow: "О нас",
    aboutTitle: "Премиальный партнёр по подбору персонала для стабильного роста бизнеса.",
    aboutCopy: "Pure Talent помогает компаниям с тщательно отобранными кандидатами, соответствующими процессами управления персоналом и оперативным ведением аккаунтов. Мы сочетаем знание рынка с ориентацией на людей, помогая работодателям уверенно масштабироваться.",
    aboutNoteTitle: "Надёжность — в основе",
    aboutNoteCopy: "От поиска до адаптации — каждый этап выполняется чётко, конфиденциально и профессионально.",
    ceoEyebrow: "Слово генерального директора",
    ceoTitle: "Создаём сильные команды с помощью надёжных решений в области подбора персонала.",
    ceoCopy: "В Pure Talent наша миссия заключается в предоставлении надёжных решений по подбору персонала, которые помогают компаниям уверенно создавать эффективные команды. Мы стремимся сделать процесс найма прозрачным, оперативным и полностью соответствующим потребностям работодателей, гарантируя при этом, что каждый кандидат получает уважительное и справедливое отношение и равные возможности. Как надёжный партнёр в сфере подбора персонала, мы уделяем особое внимание пониманию целей каждого клиента в области кадрового обеспечения и соединению их с подходящими талантами эффективным, этичным и ориентированным на результат способом. В конечном итоге мы стремимся поддерживать долгосрочный рост, подбирая правильных людей для правильных возможностей, создавая более сильные команды, лучшие результаты и устойчивый успех как для работодателей, так и для кандидатов.",
    ceoName: "Генеральный директор",
    visionTitle: "Видение",
    visionCopy: "Стать признанным региональным лидером в рекрутменте, известным качеством, честностью и долгосрочной ценностью персонала.",
    missionTitle: "Миссия",
    missionCopy: "Предоставлять квалифицированные и соответствующие нормативам кадровые решения, помогающие клиентам работать эффективно и создавать значимые пути трудоустройства.",
    offerEyebrow: "Что мы предлагаем",
    offerTitle: "Комплексные кадровые решения для современных компаний.",
    service1Title: "Обеспечение персоналом",
    service1Copy: "Надёжное развёртывание сотрудников для операционных, промышленных, гостиничных, объектовых и корпоративных нужд.",
    service2Title: "Постоянный подбор персонала",
    service2Copy: "Целевой поиск, отбор, составление шортлиста и трудоустройство для ключевых долгосрочных должностей.",
    service3Title: "Контрактный персонал",
    service3Copy: "Гибкие программы найма для проектных сроков, сезонного спроса и непрерывности бизнеса.",
    service4Title: "Executive Search",
    service4Copy: "Конфиденциальный подбор руководящих кадров со структурированной оценкой и рыночно-ориентированным подходом.",
    service5Title: "Аутсорсинг HR",
    service5Copy: "Поддержка адаптации, координации персонала, расчёта заработной платы и кадрового документооборота.",
    service6Title: "Планирование персонала",
    service6Copy: "Практическое кадровое планирование, согласующее уровни укомплектованности с операционными целями и бюджетами.",
    statsEyebrow: "Показатели",
    statsTitle: "Цифры, отражающие дисциплинированную работу.",
    statYears: "Лет опыта",
    statClients: "Клиентов обслужено",
    statEmployees: "Сотрудников предоставлено",
    statPlacements: "Успешных трудоустройств",
    statSectors: "Отраслей",
    clientsEyebrow: "Клиенты",
    clientsTitle: "Доверие организаций, ценящих стабильность.",
    clientsCopy: "Подборка клиентских профилей и отраслей, которые мы поддерживаем надёжными решениями по подбору и предоставлению персонала.",
    testimonialsEyebrow: "Отзывы клиентов",
    testimonialsTitle: "Что клиенты говорят о работе с Pure Talent.",
    testimonialsCopy: "Краткий взгляд на стандарты сервиса, которые ценят наши партнёры: оперативность, ясность и надёжное выполнение.",
    testimonial1Copy: "Pure Talent быстро поняли наши кадровые потребности и подготовили надёжный список кандидатов с отличной коммуникацией на каждом этапе.",
    testimonial1Name: "Ахмед Аль Мансури",
    testimonial1Role: "Операционный менеджер",
    testimonial2Copy: "Команда сделала наш запрос на персонал понятным, организованным и эффективным. Сопровождение было профессиональным от первого звонка до мобилизации.",
    testimonial2Name: "Наталья Петрова",
    testimonial2Role: "HR-директор",
    testimonial3Copy: "Мы ценим Pure Talent за быстрый отклик, уважительное отношение к кандидатам и практическое понимание срочных потребностей в персонале.",
    testimonial3Name: "Омар Хасан",
    testimonial3Role: "Руководитель проекта",
    applicationEyebrow: "Заявка на работу",
    applicationTitle: "Подайте заявку на следующую возможность.",
    applicationCopy: "Заполните форму — откроется почтовое приложение с готовым письмом. Прикрепите резюме перед отправкой.",
    fullName: "Полное имя",
    nationality: "Гражданство",
    phone: "Номер телефона",
    email: "Электронная почта",
    position: "Желаемая должность",
    message: "Сообщение",
    submitApplication: "Подготовить письмо",
    clientRequestEyebrow: "Деловой запрос",
    clientRequestTitle: "Отправить запрос или предложение",
    clientRequestCopy: "Расскажите, что нужно вашей компании, или отправьте предложение, и почтовое приложение откроется с готовым профессиональным письмом.",
    companyName: "Название компании",
    clientEmail: "Рабочая почта",
    clientMessage: "Детали запроса или предложения",
    sendClientRequest: "Отправить сообщение",
    contactEyebrow: "Посетите нас",
    contactTitle: "Pure Talent Recruitment & Manpower Supply",
    contactCopy: "По вопросам сотрудничества, запросам персонала, партнёрству или трудоустройству — свяжитесь с нашей командой напрямую.",
    mapTitle: "Местоположение и маршрут",
    directions: "Построить маршрут",
    footerCopy: "Премиальные решения по рекрутменту и обеспечению персоналом для надёжных организаций.",
    footerContact: "Контактная информация",
    footerLinks: "Ссылки",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    chatbotTitle: "Ассистент Pure Talent",
    chatbotSub: "Поиск по базе знаний",
    chatPlaceholder: "Спросите об услугах, карьере или контактах...",
    visaRequestPrompt: "Я открыл(а) форму запроса клиента, чтобы наша команда помогла вам с типами виз и подходящим процессом для вашего запроса.",
    teamHeroEyebrow: "Наша команда",
    teamHeroTitle: "Лидерство, основанное на дисциплине, эмпатии и знании рынка.",
    teamHeroCopy: "Познакомьтесь с людьми, обеспечивающими качество сервиса, рекрутмента и предоставления персонала Pure Talent.",
    teamIntroTitle: "Команда, построенная на доверии и результатах.",
    teamIntroCopy: "Наша руководящая команда объединяет дисциплину в рекрутинге, операционную точность и внимательную коммуникацию с клиентами на каждом этапе."
  }
};

/* ── Static Data ──────────────────────────────────────────── */
const clientProfiles = [
  { name: "Majid Al Futtaim",           logo: "assets/images/clients/Majid_Al_Futtaim_logo.svg.png",    sector: "Facilities Management", summary: "Facilities staffing, supervisory support, and operational workforce coordination for consistent site delivery." },
  { name: "Taqa Distribution",          logo: "assets/images/clients/TAQA logo.png",                    sector: "Operations",            summary: "Volume recruitment, workforce continuity, and project staffing support for active operational teams." },
  { name: "Siemens",                    logo: "assets/images/clients/Siemens-logo.svg.png",             sector: "Healthcare",            summary: "Screened support staff, onboarding coordination, and compliant documentation for healthcare environments." },
  { name: "Atlas Industrial Supply",    logo: "assets/images/clients/client-atlas.jpg",                 sector: "Industrial",            summary: "Technical helpers, site teams, and manpower ramp-up planning for industrial requirements." },
  { name: "Oasis Hospitality Network",  logo: "assets/images/clients/client-oasis.jpg",                 sector: "Hospitality",           summary: "Hospitality support, guest-service staffing, and seasonal workforce planning for service-led businesses." },
  { name: "Prime Contracting LLC",      logo: "assets/images/clients/client-prime.jpg",                 sector: "Contracting",           summary: "Construction support manpower and project-based staffing aligned with site schedules and compliance needs." }
];

const teamMembers = [
  { name: "Saleem Bakheet",  title: "Chief Executive Officer",  image: "assets/images/team/WhatsApp Image 2026-06-11 at 2.05.59 PM.jpeg", bio: "Leads strategic partnerships and client service standards with a focus on ethical recruitment, delivery discipline, and long-term trust.", linkedin: "#" },
  { name: "Ravi Kumar",      title: "Head of Recruitment",      image: "assets/images/team/team-placeholder-2.jpg", bio: "Oversees sourcing, candidate assessment, and placement quality across multiple sectors and high-volume workforce programs.", linkedin: "#" },
  { name: "Maya Perera",     title: "Operations Manager",       image: "assets/images/team/team-placeholder-3.jpg", bio: "Coordinates workforce mobilization, documentation workflows, and client communication to keep manpower delivery smooth and reliable.", linkedin: "#" },
  { name: "Bishal Shrestha", title: "Client Relations Lead",    image: "assets/images/team/team-placeholder-4.jpg", bio: "Supports employers with responsive account management, service reviews, and practical staffing plans aligned with business needs.", linkedin: "#" }
];

const clientRequestEmailTemplates = {
  en: {
    subject: (company) => `Client Request / Offer - ${company || "Pure Talent"}`,
    body: (data) => [
      "Dear Pure Talent Recruitment & Manpower Supply Team,",
      "",
      "I would like to submit a business enquiry or offer with the details below:",
      "",
      `Company Name: ${data.companyName || ""}`,
      `Business Email: ${data.clientEmail || ""}`,
      "",
      "Request / Offer Details:",
      data.clientMessage || "",
      "",
      "Please contact me to discuss the next steps.",
      "",
      "Kind regards,"
    ].join("\n")
  },
  ar: {
    subject: (company) => `طلب أو عرض - ${company || "بيور تالنت"}`,
    body: (data) => [
      "إلى فريق بيور تالنت للتوظيف وتوريد القوى العاملة،",
      "",
      "أود إرسال طلب أو عرض تجاري بالتفاصيل التالية:",
      "",
      `اسم الشركة: ${data.companyName || ""}`,
      `البريد الإلكتروني للشركة: ${data.clientEmail || ""}`,
      "",
      "تفاصيل الطلب أو العرض:",
      data.clientMessage || "",
      "",
      "يرجى التواصل معي لمناقشة الخطوات التالية.",
      "",
      "مع خالص التحية،"
    ].join("\n")
  },
  ru: {
    subject: (company) => `Запрос или предложение - ${company || "Pure Talent"}`,
    body: (data) => [
      "Уважаемая команда Pure Talent Recruitment & Manpower Supply,",
      "",
      "Я хотел(а) бы отправить деловой запрос или предложение со следующими деталями:",
      "",
      `Название компании: ${data.companyName || ""}`,
      `Рабочая почта: ${data.clientEmail || ""}`,
      "",
      "Детали запроса или предложения:",
      data.clientMessage || "",
      "",
      "Пожалуйста, свяжитесь со мной, чтобы обсудить следующие шаги.",
      "",
      "С уважением,"
    ].join("\n")
  }
};

/* ── Language Helpers ─────────────────────────────────────── */
function currentLanguage() {
  return localStorage.getItem(PT_LANG_KEY) || "en";
}

/**
 * applyLanguage — core function that switches the entire page language.
 * Called on page load and every time the user selects a new language.
 */
function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.en;

  /* 1. Persist selection */
  localStorage.setItem(PT_LANG_KEY, lang);

  /* 2. Update <html> lang attribute */
  document.documentElement.lang = lang;

  /* 3. RTL / LTR direction (Arabic = RTL, all others = LTR) */
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  /* 4. Translate all data-i18n elements */
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key] !== undefined) node.textContent = dictionary[key];
  });

  /* 5. Translate all data-i18n-placeholder elements */
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dictionary[key] !== undefined) node.setAttribute("placeholder", dictionary[key]);
  });

  /* 6. Sync every language selector to show the active language */
  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = lang;
  });

  /* 7. Update chatbot input placeholder directly (safety fallback) */
  const chatInput = document.querySelector("#chatInput");
  if (chatInput && dictionary.chatPlaceholder) {
    chatInput.placeholder = dictionary.chatPlaceholder;
  }

  /* 8. Notify other modules (chatbot welcome reset, etc.) */
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

/* ── Language Selector Init ───────────────────────────────── */
function initLanguageSelectors() {
  document.querySelectorAll(".language-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      applyLanguage(e.currentTarget.value);
    });
  });
}

/* ── Preloader ────────────────────────────────────────────── */
function initPreloader() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.querySelector(".preloader")?.classList.add("is-hidden");
    }, 420);
  });
}

/* ── Header scroll state ──────────────────────────────────── */
function initHeader() {
  const header = document.querySelector(".site-header");
  const update = () => header?.classList.toggle("is-scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ── Third-party libraries ────────────────────────────────── */
function initLibraries() {
  if (window.AOS) {
    AOS.init({ once: true, duration: 850, easing: "ease-out-cubic", offset: 80 });
  }

  if (window.gsap) {
    gsap.from(".hero .eyebrow, .hero h1, .hero p, .hero-actions, .hero-proof", {
      y: 34, opacity: 0, duration: 0.9, stagger: 0.1,
      ease: "power3.out", delay: 0.35
    });
  }

  if (window.Swiper && document.querySelector(".client-slider")) {
    new Swiper(".client-slider", {
      slidesPerView: 1.15,
      spaceBetween: 18,
      loop: true,
      autoplay: { delay: 2600, disableOnInteraction: false },
      pagination: { el: ".client-slider .swiper-pagination", clickable: true },
      breakpoints: {
        640:  { slidesPerView: 2.2 },
        900:  { slidesPerView: 3   },
        1180: { slidesPerView: 4   }
      }
    });
  }

  if (window.Swiper && document.querySelector(".testimonial-slider")) {
    new Swiper(".testimonial-slider", {
      slidesPerView: 1,
      spaceBetween: 18,
      loop: true,
      autoplay: { delay: 3200, disableOnInteraction: false },
      pagination: { el: ".testimonial-slider .swiper-pagination", clickable: true },
      breakpoints: {
        780:  { slidesPerView: 2 },
        1180: { slidesPerView: 3 }
      }
    });
  }
}

/* ── Client cards ─────────────────────────────────────────── */
function renderClients() {
  const wrapper = document.querySelector("#clientSlides");
  if (!wrapper) return;

  wrapper.innerHTML = clientProfiles.map((client, index) => `
    <div class="swiper-slide">
      <article class="client-card" tabindex="0" role="button" data-client-index="${index}">
        <img src="${client.logo}" alt="${client.name} logo" loading="lazy">
        <p>${client.name}</p>
      </article>
    </div>
  `).join("");

  wrapper.addEventListener("click", (e) => {
    const card = e.target.closest(".client-card");
    if (card) openClientModal(Number(card.dataset.clientIndex));
  });
  wrapper.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest(".client-card");
    if (card) openClientModal(Number(card.dataset.clientIndex));
  });
}

function openClientModal(index) {
  const client = clientProfiles[index];
  if (!client || !window.bootstrap) return;
  document.querySelector("#clientModalLabel").textContent  = client.name;
  document.querySelector("#clientModalLogo").src           = client.logo;
  document.querySelector("#clientModalLogo").alt           = `${client.name} logo`;
  document.querySelector("#clientModalSector").textContent = client.sector;
  document.querySelector("#clientModalSummary").textContent = client.summary;
  bootstrap.Modal.getOrCreateInstance(document.querySelector("#clientModal")).show();
}

/* ── Animated counters ────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node   = entry.target;
      const target = Number(node.dataset.count);
      const start  = 0;
      const duration   = 1300;
      const startTime  = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.floor(start + (target - start) * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(node);
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

/* ── Career application form ──────────────────────────────── */
function initApplicationForm() {
  const form = document.querySelector("#applicationForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data    = Object.fromEntries(new FormData(form).entries());
    const subject = `Career Application - ${data.position || "Pure Talent"}`;
    const body    = [
      "Dear Pure Talent Recruitment & Manpower Supply Team,",
      "",
      "Please find my career application details below:",
      "",
      `Full Name: ${data.fullName   || ""}`,
      `Nationality: ${data.nationality || ""}`,
      `Phone Number: ${data.phone    || ""}`,
      `Email Address: ${data.email   || ""}`,
      `Position Applying For: ${data.position || ""}`,
      "",
      "Message:",
      data.message || "",
      "",
      "I will attach my CV before sending this email.",
      "",
      "Kind regards,"
    ].join("\n");

    window.location.href = `mailto:info@puretalent.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* ── Client request form ──────────────────────────────────── */
function initClientRequestForm() {
  const form = document.querySelector("#clientRequestForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const template = clientRequestEmailTemplates[currentLanguage()] || clientRequestEmailTemplates.en;
    const subject = template.subject(data.companyName);
    const body = template.body(data);

    window.location.href = `mailto:info@puretalent.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function isVisaTypesQuestion(query) {
  const normalized = query.toLowerCase();
  const visaTerms = [
    "visa", "visas", "work permit",
    "فيزا", "الفيزا", "تأشيرة", "تأشيرات", "تاشيرة", "تاشيرات",
    "виза", "визы", "виз", "разрешение на работу"
  ];
  const typeTerms = [
    "type", "types", "kind", "kinds", "category", "categories",
    "نوع", "انواع", "أنواع", "نوعية", "اصناف", "أصناف",
    "тип", "типы", "вид", "виды", "категория", "категории"
  ];

  return visaTerms.some((term) => normalized.includes(term)) &&
    typeTerms.some((term) => normalized.includes(term));
}

function openClientRequestModalFromChat(query) {
  const modal = document.querySelector("#clientRequestModal");
  const message = document.querySelector("#clientMessage");

  if (message && !message.value.trim()) {
    message.value = query;
  }

  if (modal && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modal).show();
  }
}

/* ── Team page render ─────────────────────────────────────── */
function renderTeam() {
  const target = document.querySelector("#teamList");
  if (!target) return;

  target.innerHTML = teamMembers.map((member, index) => `
    <article class="team-row ${index % 2 ? "reversed" : ""}" data-aos="${index % 2 ? "fade-left" : "fade-right"}">
      <div class="team-photo">
        <img src="${member.image}" alt="${member.name}" loading="lazy">
      </div>
      <div class="team-content">
        <span class="eyebrow">${String(index + 1).padStart(2, "0")}</span>
        <h2>${member.name}</h2>
        <div class="team-title">${member.title}</div>
        <p>${member.bio}</p>
        <a class="linkedin-link" href="${member.linkedin}" aria-label="${member.name} LinkedIn profile">
          <i data-lucide="external-link"></i> LinkedIn
        </a>
      </div>
    </article>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

/* ── Chatbot ──────────────────────────────────────────────── */
function initChatbot() {
  const toggle   = document.querySelector("#chatToggle");
  const close    = document.querySelector("#chatClose");
  const windowEl = document.querySelector("#chatWindow");
  const body     = document.querySelector("#chatBody");
  const form     = document.querySelector("#chatForm");
  const input    = document.querySelector("#chatInput");

  if (!toggle || !windowEl || !body || !form || !input || !window.PT_CHATBOT_DATA) return;

  const addMessage = (text, sender = "bot") => {
    const item = document.createElement("div");
    item.className = `chat-message ${sender === "user" ? "user" : "bot"}`;
    item.textContent = text;
    body.appendChild(item);
    body.scrollTop = body.scrollHeight;
  };

  const resetWelcome = () => {
    body.innerHTML = "";
    const lang = currentLanguage();
    addMessage(window.PT_CHATBOT_DATA.welcome[lang] || window.PT_CHATBOT_DATA.welcome.en);
  };

  const answerFor = (query) => {
    const lang  = currentLanguage();
    const dictionary = translations[lang] || translations.en;

    if (isVisaTypesQuestion(query)) {
      openClientRequestModalFromChat(query);
      return dictionary.visaRequestPrompt || translations.en.visaRequestPrompt;
    }

    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    let best = null, bestScore = 0;

    window.PT_CHATBOT_DATA.entries.forEach((entry) => {
      const keywordText = entry.keywords.join(" ").toLowerCase();
      const answerText  = (entry.answers[lang] || entry.answers.en || "").toLowerCase();
      const score = words.reduce(
        (sum, word) => sum + (keywordText.includes(word) || answerText.includes(word) ? 1 : 0), 0
      );
      if (score > bestScore) { bestScore = score; best = entry; }
    });

    if (!best || bestScore === 0) {
      return window.PT_CHATBOT_DATA.noResult[lang] || window.PT_CHATBOT_DATA.noResult.en;
    }
    return best.answers[lang] || best.answers.en;
  };

  toggle.addEventListener("click", () => {
    windowEl.classList.toggle("is-open");
    if (windowEl.classList.contains("is-open") && !body.children.length) resetWelcome();
  });
  close.addEventListener("click", () => windowEl.classList.remove("is-open"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    addMessage(query, "user");
    input.value = "";
    setTimeout(() => addMessage(answerFor(query)), 180);
  });

  /* Reset welcome message whenever language changes */
  document.addEventListener("languagechange", resetWelcome);
}

/* ── Bootstrap ────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");

  /* Render dynamic content first */
  renderClients();
  renderTeam();

  /* Apply saved (or default) language to the whole page */
  applyLanguage(currentLanguage());

  /* Wire up all language selectors */
  initLanguageSelectors();

  /* Init remaining features */
  initPreloader();
  initHeader();
  initCounters();
  initApplicationForm();
  initClientRequestForm();
  initChatbot();
  initLibraries();

  /* Ensure Lucide icons are painted */
  if (window.lucide) lucide.createIcons();
});
