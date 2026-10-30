/* Pure Talent — staff dashboard.
   Everything here is protected by Supabase Auth + Row Level Security: even if someone edits this
   file in their browser, the database only accepts writes from users listed in public.admins. */
(function () {
  "use strict";

  var C = window.PT_CONFIG || {};
  var ICONS = window.PT_ICONS;
  var RICH = window.PT_RICH;
  var LANG_KEY = "pureTalentLanguage";
  var CATS = ["company", "announcement", "industry", "careers", "events"];
  var POST_LANGS = ["en", "ar", "ru"];

  /* ---------------------------------------------------------------- strings */
  var T = {
    en: {
      loading: "Loading…", brandSub: "Staff dashboard",
      signInTitle: "Staff sign in", signInCopy: "Sign in with the account that was created for you in Supabase.",
      email: "Email", password: "Password", signIn: "Sign in", signingIn: "Signing in…", forgot: "Forgot your password?",
      resetSent: "If this email has an account, a reset link is on its way.", needEmail: "Enter your email address first.",
      badLogin: "The email or password is incorrect.",
      newPwTitle: "Choose a new password", newPw: "New password", savePw: "Save password", pwShort: "Use at least 8 characters.", pwSaved: "Password updated.",
      notAdminTitle: "No dashboard access", notAdminCopy: "You are signed in as {email}, but this account is not on the admins list. Ask the site owner to add it.",
      signOut: "Sign out", fatal: "The dashboard could not connect to Supabase. Check your internet connection and refresh the page.",
      navOverview: "Overview", navNews: "News", navApps: "Applications", navEnq: "Business requests", viewSite: "View website", otherLang: "العربية",
      ovTitle: "Overview", ovPublished: "Published posts", ovDrafts: "Drafts", ovNewApps: "New applications", ovNewEnq: "New business requests", ovNewPost: "Write a news post",
      newsTitle: "News", newPost: "New post", search: "Search", allStatuses: "All statuses", refresh: "Refresh",
      colTitle: "Title", colCategory: "Category", colStatus: "Status", colDate: "Date", colActions: "Actions",
      stDraft: "Draft", stPublished: "Published", stScheduled: "Scheduled",
      edit: "Edit", view: "View on site", publish: "Publish", unpublish: "Move to drafts", del: "Delete", cancel: "Cancel", close: "Close",
      noPosts: "No posts yet. Write your first news post.", noResults: "Nothing matches your filters.", noRows: "Nothing here yet.",
      delPostTitle: "Delete this post?", delPostCopy: "“{name}” will be removed permanently. This cannot be undone.", deleted: "Deleted.",
      edNew: "New post", edEdit: "Edit post", back: "Back to news",
      fTitle: "Title", fExcerpt: "Short summary", fBody: "Article text", write: "Write", previewTab: "Preview",
      bodyHelp: "Blank line = new paragraph · ## Heading · - bullet · **bold** · [text](https://link) · ![caption](https://image-address)",
      fCategory: "Category", fSlug: "Web address (slug)", slugHelp: "Lowercase letters, numbers and hyphens. It becomes the article link.",
      slugWarn: "Changing the address breaks links that were already shared.",
      fFeatured: "Feature this post at the top of the News page",
      fPublishAt: "Publish date", publishAtHelp: "Leave empty to publish now. A future date schedules the post.",
      fCover: "Cover image", coverUpload: "Upload image", coverRemove: "Remove image", coverUrl: "Or paste an image link (https)",
      coverHelp: "JPG, PNG, WebP or GIF. Large images are resized automatically.", uploading: "Uploading…", coverFail: "The image could not be uploaded. {msg}",
      saveDraft: "Save draft", savePublish: "Publish", saveChanges: "Save changes", saved: "Saved.", published: "Published.", preview: "Preview on site",
      needTitle: "Add a title in at least one language.", slugTaken: "This web address is already used. Change the slug.", saveFail: "Could not save. {msg}",
      unsaved: "You have unsaved changes. Leave without saving?", loadFail: "Could not load data. {msg}",
      cat_company: "Company", cat_announcement: "Announcements", cat_industry: "Industry", cat_careers: "Careers", cat_events: "Events",
      appsTitle: "Applications", enqTitle: "Business requests", exportCsv: "Export CSV",
      cName: "Name", cPosition: "Position", cNationality: "Nationality", cPhone: "Phone", cEmail: "Email", cCompany: "Company", cMessage: "Message",
      cCv: "CV", cNotes: "Internal notes", cReceived: "Received", cLang: "Language", cStatus: "Status",
      openCv: "Open CV", noCv: "No CV attached", replyEmail: "Reply by email", call: "Call", saveDetails: "Save changes",
      ap_new: "New", ap_reviewing: "Reviewing", ap_shortlisted: "Shortlisted", ap_rejected: "Rejected", ap_hired: "Hired",
      en_new: "New", en_replied: "Replied", en_closed: "Closed",
      delAppTitle: "Delete this application?", delAppCopy: "The application from {name} and the attached CV will be removed permanently.",
      delEnqTitle: "Delete this request?", delEnqCopy: "The request from {name} will be removed permanently.",
      botTitle: "Chatbot", botSub: "The answers the website assistant gives. Changes go live for every visitor within a few minutes.",
      botAnswers: "Answers", botUnanswered: "Unanswered questions", botNew: "New answer", botEmpty: "No answers yet. Add the first one.",
      botTopic: "Topic", botAnswerCol: "Answer", botOrder: "Order", botActive: "Active", botOff: "Hidden", botEnable: "Turn on", botDisable: "Hide from chatbot",
      botDelTitle: "Delete this answer?", botDelCopy: "“{name}” will be removed permanently.",
      botBack: "Back to chatbot", botEdNew: "New answer", botEdEdit: "Edit answer",
      botLabel: "Button text", botLabelHelp: "Short question shown as a suggestion chip, e.g. “How do I apply?”",
      botAnswerField: "Answer", botKeywords: "Keywords", botKeywordsHelp: "Words or phrases people may type. One per line (or separated by commas). The more variations, the better the match.",
      botLinkLabel: "Link button text", botPreview: "How it looks in the chat",
      botTopicHelp: "Internal name, only you see it.", botAction: "Special action", botActionHelp: "Optional. Adds something extra to the answer.",
      botAct_none: "None", botAct_latest_news: "Show the latest news", botAct_open_business: "Offer the business request form",
      botLink: "Link", botLinkHelp: "Optional. A page on this site (index.html#careers), https://, tel: or mailto:.",
      botOrderHelp: "Lower numbers come first among suggestions.", botSuggest: "Show as a suggestion chip", botActiveLabel: "Active (the chatbot can use this answer)",
      botNeedTopic: "Give the answer a topic name (at least 2 characters).", botNeedAnswer: "Write the answer in at least one language.",
      botBadLink: "The link must start with https://, mailto:, tel: or be a page on this site.", botNeedLabel: "A suggestion chip needs button text in at least one language.",
      botNeedKeywords: "Add at least one keyword so the chatbot can find this answer.",
      botUnSub: "Questions visitors asked that the chatbot could not answer. Turn the useful ones into answers. Contact details are never stored.",
      botQuestion: "Question", botMakeAnswer: "Create answer", botMarkHandled: "Mark as handled", botReopen: "Reopen", botOpen: "Open", botHandled: "Handled",
      botUnEmpty: "No unanswered questions. The chatbot is keeping up.", navBot: "Chatbot",
      cvFail: "Could not open the CV. {msg}", total: "{n} total"
    },
    ar: {
      loading: "جارٍ التحميل…", brandSub: "لوحة تحكم الموظفين",
      signInTitle: "دخول الموظفين", signInCopy: "سجّل الدخول بالحساب الذي أُنشئ لك في Supabase.",
      email: "البريد الإلكتروني", password: "كلمة المرور", signIn: "تسجيل الدخول", signingIn: "جارٍ الدخول…", forgot: "نسيت كلمة المرور؟",
      resetSent: "إذا كان لهذا البريد حساب، فسيصلك رابط إعادة التعيين.", needEmail: "أدخل بريدك الإلكتروني أولًا.",
      badLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      newPwTitle: "اختر كلمة مرور جديدة", newPw: "كلمة المرور الجديدة", savePw: "حفظ كلمة المرور", pwShort: "استخدم 8 أحرف على الأقل.", pwSaved: "تم تحديث كلمة المرور.",
      notAdminTitle: "لا تملك صلاحية الدخول", notAdminCopy: "أنت مسجّل الدخول بالحساب {email}، لكنه ليس ضمن قائمة المشرفين. اطلب من مالك الموقع إضافته.",
      signOut: "تسجيل الخروج", fatal: "تعذّر اتصال اللوحة بـ Supabase. تحقق من الإنترنت ثم حدّث الصفحة.",
      navOverview: "نظرة عامة", navNews: "الأخبار", navApps: "طلبات التوظيف", navEnq: "الطلبات التجارية", viewSite: "عرض الموقع", otherLang: "English",
      ovTitle: "نظرة عامة", ovPublished: "أخبار منشورة", ovDrafts: "مسودات", ovNewApps: "طلبات توظيف جديدة", ovNewEnq: "طلبات تجارية جديدة", ovNewPost: "اكتب خبرًا جديدًا",
      newsTitle: "الأخبار", newPost: "خبر جديد", search: "بحث", allStatuses: "كل الحالات", refresh: "تحديث",
      colTitle: "العنوان", colCategory: "التصنيف", colStatus: "الحالة", colDate: "التاريخ", colActions: "الإجراءات",
      stDraft: "مسودة", stPublished: "منشور", stScheduled: "مجدول",
      edit: "تعديل", view: "عرض في الموقع", publish: "نشر", unpublish: "إرجاع إلى المسودات", del: "حذف", cancel: "إلغاء", close: "إغلاق",
      noPosts: "لا توجد أخبار بعد. اكتب أول خبر.", noResults: "لا توجد نتائج مطابقة.", noRows: "لا يوجد شيء هنا بعد.",
      delPostTitle: "حذف هذا الخبر؟", delPostCopy: "سيتم حذف «{name}» نهائيًا ولا يمكن التراجع.", deleted: "تم الحذف.",
      edNew: "خبر جديد", edEdit: "تعديل الخبر", back: "العودة إلى الأخبار",
      fTitle: "العنوان", fExcerpt: "ملخص قصير", fBody: "نص الخبر", write: "كتابة", previewTab: "معاينة",
      bodyHelp: "سطر فارغ = فقرة جديدة · ## عنوان · - نقطة · **غامق** · [النص](https://الرابط) · ![وصف](https://رابط-الصورة)",
      fCategory: "التصنيف", fSlug: "عنوان الصفحة (slug)", slugHelp: "أحرف إنجليزية صغيرة وأرقام وشرطات. يصبح رابط الخبر.",
      slugWarn: "تغيير العنوان يكسر الروابط التي سبق مشاركتها.",
      fFeatured: "تمييز هذا الخبر في أعلى صفحة الأخبار",
      fPublishAt: "تاريخ النشر", publishAtHelp: "اتركه فارغًا للنشر الآن. تاريخ مستقبلي يجدول النشر.",
      fCover: "صورة الغلاف", coverUpload: "رفع صورة", coverRemove: "إزالة الصورة", coverUrl: "أو الصق رابط صورة (https)",
      coverHelp: "JPG أو PNG أو WebP أو GIF. تُصغَّر الصور الكبيرة تلقائيًا.", uploading: "جارٍ الرفع…", coverFail: "تعذّر رفع الصورة. {msg}",
      saveDraft: "حفظ كمسودة", savePublish: "نشر", saveChanges: "حفظ التغييرات", saved: "تم الحفظ.", published: "تم النشر.", preview: "معاينة في الموقع",
      needTitle: "أضف عنوانًا بلغة واحدة على الأقل.", slugTaken: "هذا العنوان مستخدم بالفعل. غيّر الـ slug.", saveFail: "تعذّر الحفظ. {msg}",
      unsaved: "لديك تغييرات غير محفوظة. هل تريد المغادرة دون حفظ؟", loadFail: "تعذّر تحميل البيانات. {msg}",
      cat_company: "الشركة", cat_announcement: "إعلانات", cat_industry: "القطاع", cat_careers: "الوظائف", cat_events: "فعاليات",
      appsTitle: "طلبات التوظيف", enqTitle: "الطلبات التجارية", exportCsv: "تصدير CSV",
      cName: "الاسم", cPosition: "الوظيفة", cNationality: "الجنسية", cPhone: "الهاتف", cEmail: "البريد الإلكتروني", cCompany: "الشركة", cMessage: "الرسالة",
      cCv: "السيرة الذاتية", cNotes: "ملاحظات داخلية", cReceived: "تاريخ الاستلام", cLang: "اللغة", cStatus: "الحالة",
      openCv: "فتح السيرة الذاتية", noCv: "لا توجد سيرة ذاتية مرفقة", replyEmail: "الرد بالبريد", call: "اتصال", saveDetails: "حفظ التغييرات",
      ap_new: "جديد", ap_reviewing: "قيد المراجعة", ap_shortlisted: "ضمن القائمة المختصرة", ap_rejected: "مرفوض", ap_hired: "تم التعيين",
      en_new: "جديد", en_replied: "تم الرد", en_closed: "مغلق",
      delAppTitle: "حذف هذا الطلب؟", delAppCopy: "سيتم حذف طلب {name} والسيرة الذاتية المرفقة نهائيًا.",
      delEnqTitle: "حذف هذا الطلب؟", delEnqCopy: "سيتم حذف طلب {name} نهائيًا.",
      botTitle: "الشات بوت", botSub: "الإجابات التي يقدّمها مساعد الموقع. تظهر التعديلات لجميع الزوار خلال دقائق.",
      botAnswers: "الإجابات", botUnanswered: "أسئلة بلا إجابة", botNew: "إجابة جديدة", botEmpty: "لا توجد إجابات بعد. أضف أول إجابة.",
      botTopic: "الموضوع", botAnswerCol: "الإجابة", botOrder: "الترتيب", botActive: "مفعّلة", botOff: "مخفية", botEnable: "تفعيل", botDisable: "إخفاء من الشات بوت",
      botDelTitle: "حذف هذه الإجابة؟", botDelCopy: "سيتم حذف «{name}» نهائيًا.",
      botBack: "العودة إلى الشات بوت", botEdNew: "إجابة جديدة", botEdEdit: "تعديل الإجابة",
      botLabel: "نص الزر", botLabelHelp: "سؤال قصير يظهر كزر اقتراح، مثل «كيف أتقدم لوظيفة؟»",
      botAnswerField: "الإجابة", botKeywords: "الكلمات المفتاحية", botKeywordsHelp: "كلمات أو عبارات قد يكتبها الزائر. واحدة في كل سطر (أو مفصولة بفواصل). كلما زادت الصيغ كانت المطابقة أفضل.",
      botLinkLabel: "نص زر الرابط", botPreview: "شكلها داخل الشات",
      botTopicHelp: "اسم داخلي تراه أنت فقط.", botAction: "إجراء خاص", botActionHelp: "اختياري. يضيف شيئًا إضافيًا إلى الإجابة.",
      botAct_none: "بدون", botAct_latest_news: "عرض آخر الأخبار", botAct_open_business: "عرض نموذج الطلب التجاري",
      botLink: "الرابط", botLinkHelp: "اختياري. صفحة من هذا الموقع (index.html#careers) أو https:// أو tel: أو mailto:.",
      botOrderHelp: "الأرقام الأصغر تظهر أولًا بين الاقتراحات.", botSuggest: "عرضها كزر اقتراح", botActiveLabel: "مفعّلة (يمكن للشات بوت استخدام هذه الإجابة)",
      botNeedTopic: "أعطِ الإجابة اسم موضوع (حرفان على الأقل).", botNeedAnswer: "اكتب الإجابة بلغة واحدة على الأقل.",
      botBadLink: "يجب أن يبدأ الرابط بـ https:// أو mailto: أو tel: أو يكون صفحة من هذا الموقع.", botNeedLabel: "زر الاقتراح يحتاج إلى نص بلغة واحدة على الأقل.",
      botNeedKeywords: "أضف كلمة مفتاحية واحدة على الأقل ليتمكن الشات بوت من إيجاد هذه الإجابة.",
      botUnSub: "أسئلة سألها الزوار ولم يستطع الشات بوت الإجابة عنها. حوّل المفيد منها إلى إجابات. لا تُحفظ بيانات التواصل أبدًا.",
      botQuestion: "السؤال", botMakeAnswer: "إنشاء إجابة", botMarkHandled: "تحديد كمعالَج", botReopen: "إعادة فتح", botOpen: "مفتوحة", botHandled: "معالَجة",
      botUnEmpty: "لا توجد أسئلة بلا إجابة. الشات بوت يواكب الأسئلة.", navBot: "الشات بوت",
      cvFail: "تعذّر فتح السيرة الذاتية. {msg}", total: "الإجمالي {n}"
    }
  };

  var lang = (function () {
    try {
      var s = localStorage.getItem(LANG_KEY);
      if (s === "ar" || s === "en") return s;
    } catch (e) { /* ignore */ }
    return (navigator.language || "").slice(0, 2) === "ar" ? "ar" : "en";
  })();

  function t(key, vars) {
    var s = (T[lang] && T[lang][key]) || T.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }

  /* ---------------------------------------------------------------- helpers */
  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "value") n.value = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) { if (c != null && c !== false) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function ico(name) { var s = h("span", { class: "ico", "aria-hidden": "true" }); s.innerHTML = ICONS ? ICONS.svg(name) : ""; return s; }
  function btn(label, opts) {
    opts = opts || {};
    var kids = [];
    if (opts.icon) kids.push(ico(opts.icon));
    if (label) kids.push(h("span", { text: label }));
    return h(opts.href ? "a" : "button", {
      class: "btn " + (opts.cls || ""), type: opts.href ? null : (opts.type || "button"), href: opts.href, target: opts.target,
      rel: opts.target ? "noopener" : null, "aria-label": opts.aria || null, title: opts.title || null, onclick: opts.onclick
    }, kids);
  }
  function iconBtn(icon, label, onclick, cls) {
    return h("button", { type: "button", class: "icon-btn " + (cls || ""), "aria-label": label, title: label, onclick: onclick }, [ico(icon)]);
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function pick(obj) {
    if (!obj || typeof obj !== "object") return "";
    var order = [lang, "en", "ar", "ru"];
    for (var i = 0; i < order.length; i++) { var v = obj[order[i]]; if (typeof v === "string" && v.trim()) return v.trim(); }
    return "";
  }
  function fmtDate(iso, time) {
    if (!iso) return "—";
    try {
      var o = { year: "numeric", month: "short", day: "numeric" };
      if (time) { o.hour = "2-digit"; o.minute = "2-digit"; }
      return new Intl.DateTimeFormat(lang === "ar" ? "ar-AE-u-nu-latn" : "en-GB", o).format(new Date(iso));
    } catch (e) { return String(iso).slice(0, 10); }
  }
  function errMsg(e) { return (e && (e.message || e.error_description)) || String(e || ""); }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (c) { return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16); });
  }
  function slugify(s) {
    return String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80).replace(/-+$/g, "");
  }
  function toast(msg, kind) {
    var host = $("#toasts");
    if (!host) return;
    var n = h("div", { class: "toast" + (kind ? " toast-" + kind : ""), role: "status", text: msg });
    host.appendChild(n);
    setTimeout(function () { n.classList.add("is-out"); setTimeout(function () { n.remove(); }, 300); }, 3200);
  }
  function localInput(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var p = function (x) { return String(x).padStart(2, "0"); };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function field(label, control, help, cls) {
    var id = control.id || (control.id = "f" + Math.random().toString(36).slice(2, 8));
    return h("div", { class: "field " + (cls || "") }, [h("label", { for: id, text: label }), control, help ? h("p", { class: "help", text: help }) : null]);
  }
  function badge(kind, label) { return h("span", { class: "badge badge-" + kind, text: label }); }

  /* confirm dialog */
  function confirmBox(title, copy, okLabel) {
    return new Promise(function (resolve) {
      var dlg = h("dialog", { class: "modal", "aria-labelledby": "cbT" });
      var done = function (v) { dlg.close(); dlg.remove(); resolve(v); };
      dlg.appendChild(h("div", { class: "modal-inner" }, [
        h("h2", { id: "cbT", text: title }), h("p", { text: copy }),
        h("div", { class: "modal-actions" }, [btn(t("cancel"), { cls: "btn-quiet", onclick: function () { done(false); } }), btn(okLabel || t("del"), { cls: "btn-danger", onclick: function () { done(true); } })])
      ]));
      dlg.addEventListener("cancel", function (e) { e.preventDefault(); done(false); });
      document.body.appendChild(dlg);
      dlg.showModal();
    });
  }

  /* ---------------------------------------------------------------- state */
  var sb = null;
  var state = { ready: false, user: null, isAdmin: false, recovery: false, dirty: false, badges: { apps: 0, enq: 0, bot: 0 } };
  var app;

  function client() {
    if (sb) return sb;
    if (!window.supabase || !window.supabase.createClient) return null;
    sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    return sb;
  }

  /* ---------------------------------------------------------------- auth views */
  function authCard(title, copy, kids) {
    return h("main", { class: "auth" }, [h("div", { class: "auth-card" }, [
      h("div", { class: "auth-brand" }, [logo(), h("span", { text: t("brandSub") })]),
      h("h1", { text: title }), copy ? h("p", { class: "auth-copy", text: copy }) : null
    ].concat(kids)), langToggle("auth-lang")]);
  }
  function logo() {
    var img = h("img", { src: "../" + (C.logoDark || C.logo), alt: "Pure Talent", height: "40" });
    img.addEventListener("error", function () { img.replaceWith(h("strong", { class: "logo-text", text: "Pure Talent" })); });
    return img;
  }
  function langToggle(cls) {
    return h("button", { type: "button", class: "lang-toggle " + (cls || ""), onclick: function () {
      lang = lang === "ar" ? "en" : "ar";
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
      render();
    } }, [ico("globe"), h("span", { text: t("otherLang") })]);
  }

  function loginView() {
    var msg = h("p", { class: "form-msg", role: "alert" });
    var email = h("input", { id: "lEmail", type: "email", required: true, autocomplete: "username", dir: "ltr" });
    var pw = h("input", { id: "lPw", type: "password", required: true, autocomplete: "current-password", dir: "ltr" });
    var submit = btn(t("signIn"), { type: "submit", cls: "btn-primary btn-block", icon: "lock" });
    var form = h("form", { class: "stack", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      submit.disabled = true; msg.textContent = t("signingIn"); msg.className = "form-msg";
      sb.auth.signInWithPassword({ email: email.value.trim(), password: pw.value }).then(function (r) {
        submit.disabled = false;
        if (r.error) { msg.className = "form-msg is-error"; msg.textContent = /invalid/i.test(r.error.message) ? t("badLogin") : r.error.message; }
      }, function (err) { submit.disabled = false; msg.className = "form-msg is-error"; msg.textContent = errMsg(err); });
    } }, [
      field(t("email"), email), field(t("password"), pw), msg, submit,
      h("button", { type: "button", class: "link-btn", text: t("forgot"), onclick: function () {
        if (!email.value.trim()) { msg.className = "form-msg is-error"; msg.textContent = t("needEmail"); email.focus(); return; }
        sb.auth.resetPasswordForEmail(email.value.trim(), { redirectTo: location.origin + location.pathname }).then(function () {
          msg.className = "form-msg is-ok"; msg.textContent = t("resetSent");
        });
      } })
    ]);
    return authCard(t("signInTitle"), t("signInCopy"), [form]);
  }

  function recoveryView() {
    var msg = h("p", { class: "form-msg", role: "alert" });
    var pw = h("input", { id: "nPw", type: "password", required: true, minlength: 8, autocomplete: "new-password", dir: "ltr" });
    var form = h("form", { class: "stack", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      if (pw.value.length < 8) { msg.className = "form-msg is-error"; msg.textContent = t("pwShort"); return; }
      sb.auth.updateUser({ password: pw.value }).then(function (r) {
        if (r.error) { msg.className = "form-msg is-error"; msg.textContent = r.error.message; return; }
        toast(t("pwSaved"), "ok");
        state.recovery = false;
        history.replaceState(null, "", location.pathname);
        sb.auth.getSession().then(function (s) { if (s.data.session) handleSession(s.data.session); else render(); });
      });
    } }, [field(t("newPw"), pw), msg, btn(t("savePw"), { type: "submit", cls: "btn-primary btn-block" })]);
    return authCard(t("newPwTitle"), "", [form]);
  }

  function deniedView() {
    return authCard(t("notAdminTitle"), t("notAdminCopy", { email: state.user.email }), [btn(t("signOut"), { cls: "btn-primary btn-block", icon: "log-out", onclick: signOut })]);
  }
  function signOut() { sb.auth.signOut(); }

  /* ---------------------------------------------------------------- shell + router */
  var NAV = [
    ["#/", "navOverview", "layout-dashboard", "overview"],
    ["#/news", "navNews", "newspaper", "news"],
    ["#/applications", "navApps", "users", "applications"],
    ["#/enquiries", "navEnq", "inbox", "enquiries"],
    ["#/chatbot", "navBot", "messages-square", "chatbot"]
  ];

  function shell() {
    var nav = h("nav", { class: "side-nav", "aria-label": "Dashboard" });
    NAV.forEach(function (n) {
      var a = h("a", { href: n[0], "data-route": n[3], onclick: guardNav }, [ico(n[2]), h("span", { text: t(n[1]) })]);
      if (n[3] === "applications" || n[3] === "enquiries" || n[3] === "chatbot") {
        var count = n[3] === "applications" ? state.badges.apps : n[3] === "enquiries" ? state.badges.enq : state.badges.bot;
        a.appendChild(h("span", { class: "nav-badge", "data-badge": n[3], hidden: count ? null : true, text: String(count) }));
      }
      nav.appendChild(a);
    });
    return h("div", { class: "shell" }, [
      h("header", { class: "topbar" }, [
        h("a", { class: "topbar-brand", href: "#/", onclick: guardNav }, [logo(), h("span", { text: t("brandSub") })]),
        h("div", { class: "topbar-tools" }, [
          langToggle(),
          h("a", { class: "btn btn-quiet btn-sm", href: "../index.html", target: "_blank", rel: "noopener", "aria-label": t("viewSite") }, [ico("external-link"), h("span", { text: t("viewSite") })]),
          h("span", { class: "user-chip", title: state.user.email, text: state.user.email, dir: "ltr" }),
          btn(t("signOut"), { cls: "btn-quiet btn-sm", icon: "log-out", aria: t("signOut"), onclick: signOut })
        ])
      ]),
      h("div", { class: "shell-body" }, [nav, h("main", { id: "view", class: "view", tabindex: "-1" })])
    ]);
  }

  function guardNav(e) {
    if (state.dirty && !window.confirm(t("unsaved"))) { e.preventDefault(); return; }
    state.dirty = false;
  }
  function countOpenQuestions() {
    return sb.from("chatbot_unanswered").select("id", { count: "exact", head: true }).eq("handled", false).then(function (r) { if (r.error) throw r.error; return r.count || 0; });
  }
  function refreshBadges() {
    return Promise.all([countRows("applications", "new"), countRows("enquiries", "new"), countOpenQuestions().catch(function () { return 0; })]).then(function (r) {
      state.badges.apps = r[0]; state.badges.enq = r[1]; state.badges.bot = r[2];
      [["applications", r[0]], ["enquiries", r[1]], ["chatbot", r[2]]].forEach(function (p) {
        $$('[data-badge="' + p[0] + '"]').forEach(function (b) { b.textContent = String(p[1]); b.hidden = !p[1]; });
      });
    }).catch(function () { /* badges are optional */ });
  }

  /* Label every table cell with its column title so tables can render as cards on phones. */
  function labelTables(root) {
    $$("table.table", root).forEach(function (tb) {
      var heads = $$("thead th", tb).map(function (th) { return th.textContent; });
      $$("tbody tr", tb).forEach(function (tr) {
        Array.prototype.forEach.call(tr.children, function (td, i) { if (!td.hasAttribute("data-label") && heads[i]) td.setAttribute("data-label", heads[i]); });
      });
    });
  }
  var labelTimer = 0;
  function watchTables(view) {
    if (view._watch) return;
    view._watch = new MutationObserver(function () { if (labelTimer) return; labelTimer = requestAnimationFrame(function () { labelTimer = 0; labelTables(view); }); });
    view._watch.observe(view, { childList: true, subtree: true });
  }

  function route() {
    var view = $("#view");
    if (!view || !state.isAdmin) return;
    var hash = location.hash || "#/";
    var parts = hash.replace(/^#\/?/, "").split("/");
    var name = parts[0] || "overview";
    NAV.forEach(function (n) {
      var a = $('[data-route="' + n[3] + '"]');
      if (a) { a.classList.toggle("is-active", n[3] === name); if (n[3] === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }
    });
    view.textContent = "";
    watchTables(view);
    try {
      if (name === "news" && parts[1] === "new") viewEditor(view, null);
      else if (name === "news" && parts[1] === "edit" && parts[2]) viewEditor(view, parts[2]);
      else if (name === "news") viewNews(view);
      else if (name === "chatbot" && parts[1] === "new") viewBotEditor(view, null);
      else if (name === "chatbot" && parts[1] === "edit" && parts[2]) viewBotEditor(view, parts[2]);
      else if (name === "chatbot" && parts[1] === "unanswered") viewBotUnanswered(view);
      else if (name === "chatbot") viewBot(view);
      else if (name === "applications") viewInbox(view, INBOX.applications);
      else if (name === "enquiries") viewInbox(view, INBOX.enquiries);
      else viewOverview(view);
    } catch (e) { console.error(e); view.appendChild(h("p", { class: "form-msg is-error", text: errMsg(e) })); }
    window.scrollTo(0, 0);
  }

  function pageHead(title, actions, sub) {
    return h("div", { class: "page-head" }, [
      h("div", {}, [h("h1", { text: title }), sub ? h("p", { class: "muted", text: sub }) : null]),
      h("div", { class: "page-actions" }, actions || [])
    ]);
  }
  function errorBox(e) { return h("p", { class: "form-msg is-error", role: "alert", text: t("loadFail", { msg: errMsg(e) }) }); }

  /* ---------------------------------------------------------------- data helpers */
  function countRows(table, status) {
    var q = sb.from(table).select("id", { count: "exact", head: true });
    if (status) q = q.eq("status", status);
    if (table === "news_posts" && status === "published") q = q.lte("published_at", new Date().toISOString());
    return q.then(function (r) { if (r.error) throw r.error; return r.count || 0; });
  }
  function postState(p) {
    if (p.status !== "published") return "draft";
    if (p.published_at && new Date(p.published_at) > new Date()) return "scheduled";
    return "published";
  }
  var STATE_LABEL = { draft: "stDraft", published: "stPublished", scheduled: "stScheduled" };
  var STORAGE_MARK = "/storage/v1/object/public/news-media/";
  function coverPath(url) { var i = url ? url.indexOf(STORAGE_MARK) : -1; return i > -1 ? decodeURIComponent(url.slice(i + STORAGE_MARK.length).split("?")[0]) : null; }

  /* ---------------------------------------------------------------- overview */
  function viewOverview(view) {
    view.appendChild(pageHead(t("ovTitle"), [btn(t("ovNewPost"), { cls: "btn-primary", icon: "plus", href: "#/news/new", onclick: guardNav })]));
    var grid = h("div", { class: "stat-grid" });
    view.appendChild(grid);
    var cards = [
      ["ovPublished", "news_posts", "published", "#/news", "newspaper"],
      ["ovDrafts", "news_posts", "draft", "#/news", "pencil"],
      ["ovNewApps", "applications", "new", "#/applications", "users"],
      ["ovNewEnq", "enquiries", "new", "#/enquiries", "inbox"]
    ];
    cards.forEach(function (c) {
      var num = h("strong", { text: "…" });
      grid.appendChild(h("a", { class: "stat-card", href: c[3], onclick: guardNav }, [h("span", { class: "stat-icon" }, [ico(c[4])]), num, h("span", { text: t(c[0]) })]));
      countRows(c[1], c[2]).then(function (n) { num.textContent = n.toLocaleString("en-US"); }, function () { num.textContent = "—"; });
    });
    refreshBadges();
  }

  /* ---------------------------------------------------------------- news list */
  function viewNews(view) {
    var rows = [], q = "", st = "";
    var body = h("div", { class: "table-wrap" });
    var search = h("input", { type: "search", id: "nSearch", "aria-label": t("search"), placeholder: t("search"), oninput: function () { q = search.value.trim().toLowerCase(); paint(); } });
    var sel = h("select", { id: "nStatus", "aria-label": t("colStatus"), onchange: function () { st = sel.value; paint(); } }, [
      h("option", { value: "", text: t("allStatuses") }),
      h("option", { value: "published", text: t("stPublished") }), h("option", { value: "scheduled", text: t("stScheduled") }), h("option", { value: "draft", text: t("stDraft") })
    ]);
    view.appendChild(pageHead(t("newsTitle"), [btn(t("refresh"), { cls: "btn-quiet", icon: "loader", onclick: load }), btn(t("newPost"), { cls: "btn-primary", icon: "plus", href: "#/news/new", onclick: guardNav })]));
    view.appendChild(h("div", { class: "toolbar" }, [h("div", { class: "search-box" }, [ico("search"), search]), sel]));
    view.appendChild(body);

    function paint() {
      body.textContent = "";
      var list = rows.filter(function (p) {
        if (st && postState(p) !== st) return false;
        if (q) { var hay = (pick(p.title) + " " + Object.keys(p.title || {}).map(function (k) { return p.title[k]; }).join(" ") + " " + p.slug).toLowerCase(); if (hay.indexOf(q) < 0) return false; }
        return true;
      });
      if (!list.length) { body.appendChild(h("p", { class: "empty", text: rows.length ? t("noResults") : t("noPosts") })); return; }
      var thead = h("thead", {}, [h("tr", {}, [t("colTitle"), t("colCategory"), t("colStatus"), t("colDate"), t("colActions")].map(function (c, i) { return h("th", { scope: "col", class: i === 4 ? "col-actions" : "", text: c }); }))]);
      var tbody = h("tbody");
      list.forEach(function (p) {
        var s = postState(p);
        var titleCell = h("td", { class: "cell-title" }, [
          h("a", { href: "#/news/edit/" + p.id, onclick: guardNav, text: pick(p.title) || "—" }),
          p.is_featured ? h("span", { class: "feat", title: t("fFeatured") }, [ico("star")]) : null
        ]);
        var actions = h("td", { class: "col-actions" }, [h("div", { class: "row-actions" }, [
          iconBtn("pencil", t("edit"), function () { location.hash = "#/news/edit/" + p.id; }),
          h("a", { class: "icon-btn", href: "../article.html?slug=" + encodeURIComponent(p.slug), target: "_blank", rel: "noopener", "aria-label": t("view"), title: t("view") }, [ico("eye")]),
          iconBtn(s === "draft" ? "upload" : "download", s === "draft" ? t("publish") : t("unpublish"), function () { toggle(p); }),
          iconBtn("trash", t("del"), function () { remove(p); }, "is-danger")
        ])]);
        tbody.appendChild(h("tr", {}, [titleCell, h("td", { text: t("cat_" + p.category) }), h("td", {}, [badge(s, t(STATE_LABEL[s]))]), h("td", { class: "nowrap", text: fmtDate(p.published_at || p.created_at) }), actions]));
      });
      body.appendChild(h("table", { class: "table" }, [thead, tbody]));
    }
    function load() {
      body.textContent = ""; body.appendChild(h("p", { class: "empty", text: t("loading") }));
      sb.from("news_posts").select("id,slug,title,category,status,is_featured,published_at,created_at,cover_url").order("created_at", { ascending: false }).limit(500).then(function (r) {
        if (r.error) throw r.error;
        rows = r.data || []; paint();
      }).catch(function (e) { body.textContent = ""; body.appendChild(errorBox(e)); });
    }
    function toggle(p) {
      var publishing = postState(p) === "draft";
      sb.from("news_posts").update({ status: publishing ? "published" : "draft" }).eq("id", p.id).select("id,status,published_at").single().then(function (r) {
        if (r.error) throw r.error;
        p.status = r.data.status; p.published_at = r.data.published_at;
        toast(publishing ? t("published") : t("saved"), "ok"); paint();
      }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
    }
    function remove(p) {
      confirmBox(t("delPostTitle"), t("delPostCopy", { name: pick(p.title) || p.slug })).then(function (ok) {
        if (!ok) return;
        sb.from("news_posts").delete().eq("id", p.id).then(function (r) {
          if (r.error) throw r.error;
          var path = coverPath(p.cover_url);
          if (path) sb.storage.from("news-media").remove([path]);
          rows = rows.filter(function (x) { return x.id !== p.id; }); toast(t("deleted"), "ok"); paint();
        }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
      });
    }
    load();
  }

  /* ---------------------------------------------------------------- news editor */
  function prepareImage(file) {
    var MAX = 5 * 1024 * 1024;
    if (file.type === "image/gif") return file.size <= MAX ? Promise.resolve({ blob: file, ext: "gif", type: "image/gif" }) : Promise.reject(new Error("> 5 MB"));
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var scale = Math.min(1, 1800 / Math.max(img.naturalWidth, img.naturalHeight));
        var w = Math.round(img.naturalWidth * scale), hh = Math.round(img.naturalHeight * scale);
        var c = document.createElement("canvas"); c.width = w; c.height = hh;
        var ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, hh); ctx.drawImage(img, 0, 0, w, hh);
        c.toBlob(function (blob) {
          if (!blob) return reject(new Error("Image conversion failed"));
          if (blob.size > MAX) return reject(new Error("> 5 MB"));
          resolve({ blob: blob, ext: "jpg", type: "image/jpeg" });
        }, "image/jpeg", 0.86);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("Unsupported image")); };
      img.src = url;
    });
  }

  function viewEditor(view, id) {
    var ed = {
      id: id, slug: "", slugTouched: !!id, category: "company", cover_url: "", is_featured: false, status: "draft", published_at: "",
      title: { en: "", ar: "", ru: "" }, excerpt: { en: "", ar: "", ru: "" }, body: { en: "", ar: "", ru: "" }, tab: lang === "ar" ? "ar" : "en", preview: false
    };
    state.dirty = false;
    view.appendChild(h("p", { class: "empty", text: t("loading") }));

    if (!id) return build();
    sb.from("news_posts").select("*").eq("id", id).maybeSingle().then(function (r) {
      if (r.error) throw r.error;
      if (!r.data) { location.hash = "#/news"; return; }
      var p = r.data;
      ed.slug = p.slug; ed.category = p.category; ed.cover_url = p.cover_url || ""; ed.is_featured = !!p.is_featured; ed.status = p.status;
      ed.published_at = localInput(p.published_at);
      POST_LANGS.forEach(function (l) { ed.title[l] = (p.title || {})[l] || ""; ed.excerpt[l] = (p.excerpt || {})[l] || ""; ed.body[l] = (p.body || {})[l] || ""; });
      build();
    }).catch(function (e) { view.textContent = ""; view.appendChild(errorBox(e)); });

    function build() {
      view.textContent = "";
      var dirty = function () { state.dirty = true; };
      var panels = {}, tabs = {};
      var slugInput, previewBox, coverBox;

      /* language tabs + panels */
      var tabBar = h("div", { class: "tabs", role: "tablist" });
      var panelHost = h("div", { class: "panels" });
      var langName = { en: "English", ar: "العربية", ru: "Русский" };

      POST_LANGS.forEach(function (l) {
        var title = h("input", { id: "title_" + l, value: ed.title[l], maxlength: 200, dir: l === "ar" ? "rtl" : "ltr", lang: l, oninput: function () {
          ed.title[l] = title.value; dirty(); markTabs();
          if (l === "en" && !ed.slugTouched) { ed.slug = slugify(title.value); if (slugInput) slugInput.value = ed.slug; }
          renderPreview();
        } });
        var excerpt = h("textarea", { id: "excerpt_" + l, rows: 3, maxlength: 280, dir: l === "ar" ? "rtl" : "ltr", lang: l, oninput: function () { ed.excerpt[l] = excerpt.value; dirty(); renderPreview(); } });
        excerpt.value = ed.excerpt[l];
        var body = h("textarea", { id: "body_" + l, rows: 16, class: "body-input", dir: l === "ar" ? "rtl" : "ltr", lang: l, oninput: function () { ed.body[l] = body.value; dirty(); markTabs(); renderPreview(); } });
        body.value = ed.body[l];
        var write = h("div", { class: "write" }, [field(t("fBody"), body, t("bodyHelp"))]);
        panels[l] = h("div", { class: "panel", role: "tabpanel", "aria-labelledby": "tab_" + l, hidden: ed.tab === l ? null : true }, [
          field(t("fTitle"), title), field(t("fExcerpt"), excerpt), write
        ]);
        panels[l].write = write; panels[l].bodyEl = body;
        panelHost.appendChild(panels[l]);

        tabs[l] = h("button", { type: "button", role: "tab", id: "tab_" + l, class: "tab", "aria-selected": String(ed.tab === l), onclick: function () { setTab(l); } }, [h("span", { text: langName[l] }), h("i", { class: "dot", "aria-hidden": "true" })]);
        tabBar.appendChild(tabs[l]);
      });
      function markTabs() { POST_LANGS.forEach(function (l) { tabs[l].classList.toggle("is-filled", !!(ed.title[l].trim() || ed.body[l].trim())); }); }
      function setTab(l) {
        ed.tab = l;
        POST_LANGS.forEach(function (x) { panels[x].hidden = x !== l; tabs[x].setAttribute("aria-selected", String(x === l)); });
        renderPreview();
      }
      markTabs();

      /* write / preview switch */
      previewBox = h("div", { class: "preview-box", hidden: true });
      var modeWrite = h("button", { type: "button", class: "seg is-active", text: t("write"), onclick: function () { setPreview(false); } });
      var modePrev = h("button", { type: "button", class: "seg", text: t("previewTab"), onclick: function () { setPreview(true); } });
      function setPreview(on) {
        ed.preview = on; modeWrite.classList.toggle("is-active", !on); modePrev.classList.toggle("is-active", on);
        POST_LANGS.forEach(function (l) { panels[l].write.hidden = on; });
        previewBox.hidden = !on; renderPreview();
      }
      function renderPreview() {
        if (!ed.preview) return;
        var l = ed.tab; previewBox.textContent = ""; previewBox.dir = l === "ar" ? "rtl" : "ltr"; previewBox.lang = l;
        previewBox.appendChild(h("h2", { class: "pv-title", text: ed.title[l] || "…" }));
        if (ed.excerpt[l]) previewBox.appendChild(h("p", { class: "pv-lede", text: ed.excerpt[l] }));
        var b = h("div", { class: "pv-body" }); if (RICH) RICH.render(b, ed.body[l]); else b.textContent = ed.body[l];
        previewBox.appendChild(b);
      }

      /* sidebar: settings */
      var cat = h("select", { id: "category", onchange: function () { ed.category = cat.value; dirty(); } }, CATS.map(function (c) { return h("option", { value: c, text: t("cat_" + c) }); }));
      cat.value = ed.category;
      slugInput = h("input", { id: "slug", value: ed.slug, dir: "ltr", maxlength: 120, autocapitalize: "off", spellcheck: "false", oninput: function () {
        ed.slugTouched = true; ed.slug = slugInput.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-"); dirty();
      }, onblur: function () { ed.slug = ed.slug.replace(/^-+|-+$/g, ""); slugInput.value = ed.slug; } });
      var featured = h("input", { type: "checkbox", id: "featured", onchange: function () { ed.is_featured = featured.checked; dirty(); } });
      featured.checked = ed.is_featured;
      var when = h("input", { type: "datetime-local", id: "publishAt", value: ed.published_at, dir: "ltr", onchange: function () { ed.published_at = when.value; dirty(); } });

      /* cover */
      var coverStatus = h("p", { class: "help", role: "status" });
      var fileIn = h("input", { type: "file", id: "coverFile", accept: "image/jpeg,image/png,image/webp,image/gif", class: "sr-only", onchange: function () {
        var f = fileIn.files[0]; if (!f) return;
        coverStatus.textContent = t("uploading"); coverStatus.className = "help";
        prepareImage(f).then(function (img) {
          var path = "covers/" + uuid() + "." + img.ext;
          return sb.storage.from("news-media").upload(path, img.blob, { contentType: img.type, cacheControl: "31536000", upsert: false }).then(function (r) {
            if (r.error) throw r.error;
            ed.cover_url = sb.storage.from("news-media").getPublicUrl(path).data.publicUrl; dirty(); paintCover(); coverStatus.textContent = "";
          });
        }).catch(function (e) { coverStatus.className = "help is-error"; coverStatus.textContent = t("coverFail", { msg: errMsg(e) }); }).then(function () { fileIn.value = ""; });
      } });
      var urlIn = h("input", { id: "coverUrl", type: "url", placeholder: "https://", dir: "ltr", value: ed.cover_url, oninput: function () {
        var v = urlIn.value.trim(); if (v === "" || /^https:\/\//i.test(v)) { ed.cover_url = v; dirty(); paintCover(true); }
      } });
      coverBox = h("div", { class: "cover-preview" });
      function paintCover(skipUrl) {
        coverBox.textContent = "";
        if (ed.cover_url) {
          var im = h("img", { src: ed.cover_url, alt: "" });
          im.addEventListener("error", function () { im.remove(); coverBox.appendChild(h("span", { class: "muted", text: "—" })); });
          coverBox.appendChild(im);
        } else coverBox.appendChild(ico("image"));
        removeBtn.hidden = !ed.cover_url;
        if (!skipUrl) urlIn.value = ed.cover_url;
      }
      var removeBtn = btn(t("coverRemove"), { cls: "btn-quiet btn-sm", icon: "trash", onclick: function () { ed.cover_url = ""; dirty(); paintCover(); } });
      var coverField = h("div", { class: "field" }, [
        h("span", { class: "label", text: t("fCover") }), coverBox,
        h("div", { class: "cover-actions" }, [h("label", { class: "btn btn-outline btn-sm", for: "coverFile" }, [ico("upload"), h("span", { text: t("coverUpload") })]), fileIn, removeBtn]),
        coverStatus, field(t("coverUrl"), urlIn, t("coverHelp"))
      ]);
      paintCover();

      /* actions */
      var msg = h("p", { class: "form-msg", role: "alert" });
      var existingPublished = !!id && ed.status === "published";
      var actions = h("div", { class: "editor-actions" });
      var saveBtns = [];
      function mk(label, icon, cls, target) { var b = btn(label, { cls: cls, icon: icon, onclick: function () { save(target, b); } }); saveBtns.push(b); return b; }
      if (existingPublished) { actions.appendChild(mk(t("saveChanges"), "save", "btn-primary", "published")); actions.appendChild(mk(t("unpublish"), "download", "btn-quiet", "draft")); }
      else { actions.appendChild(mk(t("savePublish"), "upload", "btn-primary", "published")); actions.appendChild(mk(t("saveDraft"), "save", "btn-outline", "draft")); }
      if (id) {
        actions.appendChild(h("a", { class: "btn btn-quiet", href: "../article.html?slug=" + encodeURIComponent(ed.slug), target: "_blank", rel: "noopener" }, [ico("eye"), h("span", { text: t("preview") })]));
        actions.appendChild(btn(t("del"), { cls: "btn-danger-quiet", icon: "trash", onclick: function () {
          confirmBox(t("delPostTitle"), t("delPostCopy", { name: ed.title[ed.tab] || ed.title.en || ed.slug })).then(function (ok) {
            if (!ok) return;
            sb.from("news_posts").delete().eq("id", id).then(function (r) {
              if (r.error) throw r.error;
              var p = coverPath(ed.cover_url); if (p) sb.storage.from("news-media").remove([p]);
              state.dirty = false; toast(t("deleted"), "ok"); location.hash = "#/news";
            }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
          });
        } }));
      }

      function save(target, trigger) {
        msg.className = "form-msg"; msg.textContent = "";
        var hasTitle = POST_LANGS.some(function (l) { return ed.title[l].trim(); });
        if (!hasTitle) { msg.className = "form-msg is-error"; msg.textContent = t("needTitle"); setTab(ed.tab); $("#title_" + ed.tab).focus(); return; }
        var slug = (ed.slug || "").replace(/^-+|-+$/g, "") || slugify(ed.title.en) || ("post-" + Date.now().toString(36));
        var payload = {
          slug: slug, category: ed.category, is_featured: ed.is_featured, status: target,
          cover_url: ed.cover_url ? ed.cover_url : null,
          title: trimObj(ed.title), excerpt: trimObj(ed.excerpt), body: trimObj(ed.body),
          published_at: ed.published_at ? new Date(ed.published_at).toISOString() : null
        };
        saveBtns.forEach(function (b) { b.disabled = true; });
        var op = id
          ? sb.from("news_posts").update(payload).eq("id", id).select("id,slug,status,published_at").single()
          : sb.from("news_posts").insert(payload).select("id,slug,status,published_at").single();
        op.then(function (r) {
          if (r.error) throw r.error;
          state.dirty = false; ed.slug = r.data.slug;
          toast(target === "published" ? t("published") : t("saved"), "ok");
          if (!id || target !== ed.status) { location.hash = "#/news/edit/" + r.data.id; if (id) route(); }
          else { slugInput.value = ed.slug; saveBtns.forEach(function (b) { b.disabled = false; }); }
        }).catch(function (e) {
          saveBtns.forEach(function (b) { b.disabled = false; });
          msg.className = "form-msg is-error";
          msg.textContent = e && e.code === "23505" ? t("slugTaken") : t("saveFail", { msg: errMsg(e) });
        });
      }
      function trimObj(o) { var out = {}; POST_LANGS.forEach(function (l) { out[l] = (o[l] || "").trim(); }); return out; }

      view.appendChild(h("a", { class: "back", href: "#/news", onclick: guardNav }, [ico("arrow-left"), h("span", { text: t("back") })]));
      view.appendChild(pageHead(id ? t("edEdit") : t("edNew"), []));
      view.appendChild(h("div", { class: "editor" }, [
        h("section", { class: "card editor-main" }, [tabBar, h("div", { class: "seg-group", role: "group" }, [modeWrite, modePrev]), panelHost, previewBox]),
        h("aside", { class: "editor-side" }, [
          h("section", { class: "card" }, [
            field(t("fCategory"), cat),
            field(t("fSlug"), slugInput, t("slugHelp") + (id && ed.status === "published" ? " " + t("slugWarn") : "")),
            field(t("fPublishAt"), when, t("publishAtHelp")),
            h("label", { class: "check" }, [featured, h("span", { text: t("fFeatured") })])
          ]),
          h("section", { class: "card" }, [coverField]),
          h("section", { class: "card" }, [msg, actions])
        ])
      ]));
      window.onbeforeunload = function (e) { if (state.dirty) { e.preventDefault(); e.returnValue = ""; return ""; } };
    }
  }

  /* ---------------------------------------------------------------- inboxes (applications + enquiries) */
  var INBOX = {
    applications: {
      table: "applications", title: "appsTitle", statuses: ["new", "reviewing", "shortlisted", "rejected", "hired"], prefix: "ap_", nameField: "full_name",
      cols: [["cReceived", function (r) { return fmtDate(r.created_at, true); }], ["cName", function (r) { return r.full_name; }, "strong"], ["cPosition", function (r) { return r.position; }], ["cNationality", function (r) { return r.nationality; }], ["cCv", function (r) { return r.cv_path ? "yes" : ""; }, "cv"]],
      search: ["full_name", "email", "phone", "position", "nationality"],
      details: [["cName", "full_name"], ["cPosition", "position"], ["cNationality", "nationality"], ["cPhone", "phone", "tel"], ["cEmail", "email", "mail"], ["cLang", "lang"], ["cReceived", "created_at", "date"], ["cMessage", "message", "long"]],
      csv: ["created_at", "full_name", "nationality", "phone", "email", "position", "status", "lang", "message", "admin_notes"],
      delTitle: "delAppTitle", delCopy: "delAppCopy"
    },
    enquiries: {
      table: "enquiries", title: "enqTitle", statuses: ["new", "replied", "closed"], prefix: "en_", nameField: "company_name",
      cols: [["cReceived", function (r) { return fmtDate(r.created_at, true); }], ["cCompany", function (r) { return r.company_name; }, "strong"], ["cEmail", function (r) { return r.email; }], ["cMessage", function (r) { return (r.message || "").replace(/\s+/g, " ").slice(0, 90); }]],
      search: ["company_name", "email", "message"],
      details: [["cCompany", "company_name"], ["cEmail", "email", "mail"], ["cLang", "lang"], ["cReceived", "created_at", "date"], ["cMessage", "message", "long"]],
      csv: ["created_at", "company_name", "email", "status", "lang", "message", "admin_notes"],
      delTitle: "delEnqTitle", delCopy: "delEnqCopy"
    }
  };

  function csvCell(v) {
    var s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s) && !/^[+-]?\d[\d\s().-]*$/.test(s)) s = "'" + s; /* neutralise spreadsheet formulas */
    return '"' + s.replace(/"/g, '""') + '"';
  }
  function downloadCsv(name, cols, rows) {
    var out = [cols.map(csvCell).join(",")].concat(rows.map(function (r) { return cols.map(function (c) { return csvCell(r[c]); }).join(","); })).join("\r\n");
    var blob = new Blob(["﻿" + out], { type: "text/csv;charset=utf-8" });
    var a = h("a", { href: URL.createObjectURL(blob), download: name + "-" + new Date().toISOString().slice(0, 10) + ".csv" });
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function viewInbox(view, cfg) {
    var rows = [], q = "", st = "";
    var body = h("div", { class: "table-wrap" });
    var count = h("span", { class: "muted" });
    var search = h("input", { type: "search", id: "iSearch", "aria-label": t("search"), placeholder: t("search"), oninput: function () { q = search.value.trim().toLowerCase(); paint(); } });
    var sel = h("select", { id: "iStatus", "aria-label": t("cStatus"), onchange: function () { st = sel.value; paint(); } },
      [h("option", { value: "", text: t("allStatuses") })].concat(cfg.statuses.map(function (s) { return h("option", { value: s, text: t(cfg.prefix + s) }); })));
    function filtered() {
      return rows.filter(function (r) {
        if (st && r.status !== st) return false;
        if (q && cfg.search.map(function (f) { return r[f] || ""; }).join(" ").toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
    }
    view.appendChild(pageHead(t(cfg.title), [
      btn(t("refresh"), { cls: "btn-quiet", icon: "loader", onclick: load }),
      btn(t("exportCsv"), { cls: "btn-outline", icon: "download", onclick: function () { downloadCsv(cfg.table, cfg.csv, filtered()); } })
    ]));
    view.appendChild(h("div", { class: "toolbar" }, [h("div", { class: "search-box" }, [ico("search"), search]), sel, count]));
    view.appendChild(body);

    function paint() {
      body.textContent = "";
      var list = filtered();
      count.textContent = t("total", { n: list.length });
      if (!list.length) { body.appendChild(h("p", { class: "empty", text: rows.length ? t("noResults") : t("noRows") })); return; }
      var thead = h("thead", {}, [h("tr", {}, cfg.cols.map(function (c) { return h("th", { scope: "col", text: t(c[0]) }); }).concat([h("th", { scope: "col", text: t("cStatus") })]))]);
      var tbody = h("tbody");
      list.forEach(function (r) {
        var tr = h("tr", { class: "is-click" + (r.status === "new" ? " is-new" : ""), tabindex: "0", onclick: function () { openDetail(r); }, onkeydown: function (e) { if (e.key === "Enter") openDetail(r); } });
        cfg.cols.forEach(function (c) {
          var v = c[1](r), td = h("td", { class: c[2] === "strong" ? "cell-title" : "" });
          if (c[2] === "cv") { if (v) td.appendChild(ico("paperclip")); }
          else td.textContent = v;
          tr.appendChild(td);
        });
        tr.appendChild(h("td", {}, [badge("st-" + r.status, t(cfg.prefix + r.status))]));
        tbody.appendChild(tr);
      });
      body.appendChild(h("table", { class: "table" }, [thead, tbody]));
    }
    function load() {
      body.textContent = ""; body.appendChild(h("p", { class: "empty", text: t("loading") }));
      sb.from(cfg.table).select("*").order("created_at", { ascending: false }).limit(1000).then(function (r) {
        if (r.error) throw r.error;
        rows = r.data || []; paint(); refreshBadges();
      }).catch(function (e) { body.textContent = ""; body.appendChild(errorBox(e)); });
    }

    function openDetail(r) {
      var prevFocus = document.activeElement;
      var status = h("select", { id: "dStatus" }, cfg.statuses.map(function (s) { return h("option", { value: s, text: t(cfg.prefix + s) }); }));
      status.value = r.status;
      var notes = h("textarea", { id: "dNotes", rows: 5, maxlength: 5000 }); notes.value = r.admin_notes || "";
      var info = h("dl", { class: "details" });
      cfg.details.forEach(function (d) {
        var v = r[d[1]]; if (v == null || v === "") return;
        var dd = h("dd", { class: d[2] === "long" ? "long" : "" });
        if (d[2] === "mail") dd.appendChild(h("a", { href: "mailto:" + v, text: v, dir: "ltr" }));
        else if (d[2] === "tel") dd.appendChild(h("a", { href: "tel:" + String(v).replace(/[^0-9+]/g, ""), text: v, dir: "ltr" }));
        else if (d[2] === "date") dd.textContent = fmtDate(v, true);
        else dd.textContent = v;
        info.appendChild(h("dt", { text: t(d[0]) })); info.appendChild(dd);
      });
      var msg = h("p", { class: "form-msg", role: "alert" });
      var overlay = h("div", { class: "overlay" });
      var drawer = h("aside", { class: "drawer", role: "dialog", "aria-modal": "true", "aria-label": r[cfg.nameField] });
      var closeIt = function () { document.removeEventListener("keydown", onKey); overlay.remove(); drawer.remove(); if (prevFocus && prevFocus.focus) prevFocus.focus(); };
      var onKey = function (e) { if (e.key === "Escape") closeIt(); };
      document.addEventListener("keydown", onKey);
      overlay.addEventListener("click", closeIt);

      var extra = [];
      if (r.email) extra.push(h("a", { class: "btn btn-outline btn-sm", href: "mailto:" + r.email }, [ico("mail"), h("span", { text: t("replyEmail") })]));
      if (r.phone) extra.push(h("a", { class: "btn btn-outline btn-sm", href: "tel:" + String(r.phone).replace(/[^0-9+]/g, "") }, [ico("phone"), h("span", { text: t("call") })]));
      if (cfg.table === "applications") {
        if (r.cv_path) extra.push(btn(t("openCv"), { cls: "btn-primary btn-sm", icon: "file-text", onclick: function () {
          sb.storage.from("cvs").createSignedUrl(r.cv_path, 90).then(function (x) {
            if (x.error) throw x.error; window.open(x.data.signedUrl, "_blank", "noopener");
          }).catch(function (e) { msg.className = "form-msg is-error"; msg.textContent = t("cvFail", { msg: errMsg(e) }); });
        } }));
        else extra.push(h("span", { class: "muted", text: t("noCv") }));
      }

      var saveBtn = btn(t("saveDetails"), { cls: "btn-primary", icon: "save", onclick: function () {
        saveBtn.disabled = true;
        sb.from(cfg.table).update({ status: status.value, admin_notes: notes.value.trim() || null }).eq("id", r.id).select("id,status,admin_notes").single().then(function (x) {
          saveBtn.disabled = false;
          if (x.error) throw x.error;
          r.status = x.data.status; r.admin_notes = x.data.admin_notes; toast(t("saved"), "ok"); paint(); refreshBadges();
        }).catch(function (e) { saveBtn.disabled = false; msg.className = "form-msg is-error"; msg.textContent = t("saveFail", { msg: errMsg(e) }); });
      } });
      var delBtn = btn(t("del"), { cls: "btn-danger-quiet", icon: "trash", onclick: function () {
        confirmBox(t(cfg.delTitle), t(cfg.delCopy, { name: r[cfg.nameField] })).then(function (ok) {
          if (!ok) return;
          sb.from(cfg.table).delete().eq("id", r.id).then(function (x) {
            if (x.error) throw x.error;
            if (r.cv_path) sb.storage.from("cvs").remove([r.cv_path]);
            rows = rows.filter(function (y) { return y.id !== r.id; }); closeIt(); toast(t("deleted"), "ok"); paint(); refreshBadges();
          }).catch(function (e) { msg.className = "form-msg is-error"; msg.textContent = t("saveFail", { msg: errMsg(e) }); });
        });
      } });

      drawer.appendChild(h("div", { class: "drawer-head" }, [h("h2", { text: r[cfg.nameField] }), iconBtn("x", t("close"), closeIt)]));
      drawer.appendChild(h("div", { class: "drawer-body" }, [
        info, h("div", { class: "drawer-extra" }, extra),
        field(t("cStatus"), status), field(t("cNotes"), notes), msg,
        h("div", { class: "editor-actions" }, [saveBtn, delBtn])
      ]));
      document.body.appendChild(overlay); document.body.appendChild(drawer);
      status.focus();
    }
    load();
  }

  /* ---------------------------------------------------------------- chatbot management */
  var BOT_ACTIONS = ["", "latest_news", "open_business"];
  var BOT_LINK_OK = /^(https:\/\/\S+|mailto:\S+|tel:[+0-9()\-\s]+|[A-Za-z0-9_\-./#?=&%]+)$/;

  function botTabs(active) {
    return h("div", { class: "seg-group bot-switch", role: "group" }, [
      h("a", { class: "seg" + (active === "answers" ? " is-active" : ""), href: "#/chatbot", onclick: guardNav, text: t("botAnswers") }),
      h("a", { class: "seg" + (active === "unanswered" ? " is-active" : ""), href: "#/chatbot/unanswered", onclick: guardNav }, [
        h("span", { text: t("botUnanswered") }), h("span", { class: "nav-badge seg-badge", "data-badge": "chatbot", hidden: state.badges.bot ? null : true, text: String(state.badges.bot || 0) })
      ])
    ]);
  }

  function viewBot(view) {
    var rows = [], q = "";
    var body = h("div", { class: "table-wrap" });
    var count = h("span", { class: "muted" });
    var search = h("input", { type: "search", id: "bSearch", "aria-label": t("search"), placeholder: t("search"), oninput: function () { q = search.value.trim().toLowerCase(); paint(); } });
    view.appendChild(pageHead(t("botTitle"), [
      btn(t("refresh"), { cls: "btn-quiet", icon: "loader", onclick: load }),
      btn(t("botNew"), { cls: "btn-primary", icon: "plus", href: "#/chatbot/new", onclick: guardNav })
    ], t("botSub")));
    view.appendChild(botTabs("answers"));
    view.appendChild(h("div", { class: "toolbar" }, [h("div", { class: "search-box" }, [ico("search"), search]), count]));
    view.appendChild(body);

    function hay(r) {
      var parts = [r.topic];
      ["label", "answer"].forEach(function (k) { Object.keys(r[k] || {}).forEach(function (l) { parts.push(r[k][l]); }); });
      Object.keys(r.keywords || {}).forEach(function (l) { parts.push((r.keywords[l] || []).join(" ")); });
      return parts.join(" ").toLowerCase();
    }
    function paint() {
      body.textContent = "";
      var list = rows.filter(function (r) { return !q || hay(r).indexOf(q) > -1; });
      count.textContent = t("total", { n: list.length });
      if (!list.length) { body.appendChild(h("p", { class: "empty", text: rows.length ? t("noResults") : t("botEmpty") })); return; }
      var thead = h("thead", {}, [h("tr", {}, [t("botTopic"), t("botAnswerCol"), t("colStatus"), t("botOrder"), t("colActions")].map(function (c, i) {
        return h("th", { scope: "col", class: i === 4 ? "col-actions" : "", text: c });
      }))]);
      var tbody = h("tbody");
      list.forEach(function (r) {
        var a = pick(r.answer);
        var topic = h("td", { class: "cell-title" }, [
          h("a", { href: "#/chatbot/edit/" + r.id, onclick: guardNav, text: r.topic }),
          r.show_suggestion ? h("span", { class: "feat", title: t("botSuggest") }, [ico("star")]) : null
        ]);
        var actions = h("td", { class: "col-actions" }, [h("div", { class: "row-actions" }, [
          iconBtn("pencil", t("edit"), function () { location.hash = "#/chatbot/edit/" + r.id; }),
          iconBtn(r.is_active ? "download" : "upload", r.is_active ? t("botDisable") : t("botEnable"), function () { toggle(r); }),
          iconBtn("trash", t("del"), function () { remove(r); }, "is-danger")
        ])]);
        tbody.appendChild(h("tr", { class: r.is_active ? "" : "is-off" }, [
          topic, h("td", { class: "cell-snip", text: a.length > 110 ? a.slice(0, 110) + "…" : a }),
          h("td", {}, [badge(r.is_active ? "published" : "draft", r.is_active ? t("botActive") : t("botOff"))]),
          h("td", { class: "nowrap", dir: "ltr", text: String(r.sort_order) }), actions
        ]));
      });
      body.appendChild(h("table", { class: "table" }, [thead, tbody]));
    }
    function load() {
      body.textContent = ""; body.appendChild(h("p", { class: "empty", text: t("loading") }));
      sb.from("chatbot_entries").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }).limit(500).then(function (r) {
        if (r.error) throw r.error;
        rows = r.data || []; paint(); refreshBadges();
      }).catch(function (e) { body.textContent = ""; body.appendChild(errorBox(e)); });
    }
    function toggle(r) {
      sb.from("chatbot_entries").update({ is_active: !r.is_active }).eq("id", r.id).select("id,is_active").single().then(function (x) {
        if (x.error) throw x.error;
        r.is_active = x.data.is_active; toast(t("saved"), "ok"); paint();
      }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
    }
    function remove(r) {
      confirmBox(t("botDelTitle"), t("botDelCopy", { name: r.topic })).then(function (ok) {
        if (!ok) return;
        sb.from("chatbot_entries").delete().eq("id", r.id).then(function (x) {
          if (x.error) throw x.error;
          rows = rows.filter(function (y) { return y.id !== r.id; }); toast(t("deleted"), "ok"); paint();
        }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
      });
    }
    load();
  }

  /* ---- unanswered questions */
  function viewBotUnanswered(view) {
    var rows = [], st = "open";
    var body = h("div", { class: "table-wrap" });
    var count = h("span", { class: "muted" });
    var sel = h("select", { id: "uStatus", "aria-label": t("colStatus"), onchange: function () { st = sel.value; paint(); } }, [
      h("option", { value: "open", text: t("botOpen") }), h("option", { value: "handled", text: t("botHandled") }), h("option", { value: "all", text: t("allStatuses") })
    ]);
    view.appendChild(pageHead(t("botTitle"), [btn(t("refresh"), { cls: "btn-quiet", icon: "loader", onclick: load })], t("botUnSub")));
    view.appendChild(botTabs("unanswered"));
    view.appendChild(h("div", { class: "toolbar" }, [sel, count]));
    view.appendChild(body);

    function paint() {
      body.textContent = "";
      var list = rows.filter(function (r) { return st === "all" || (st === "open" ? !r.handled : r.handled); });
      count.textContent = t("total", { n: list.length });
      if (!list.length) { body.appendChild(h("p", { class: "empty", text: rows.length ? t("noResults") : t("botUnEmpty") })); return; }
      var thead = h("thead", {}, [h("tr", {}, [t("cReceived"), t("botQuestion"), t("cLang"), t("colActions")].map(function (c, i) {
        return h("th", { scope: "col", class: i === 3 ? "col-actions" : "", text: c });
      }))]);
      var tbody = h("tbody");
      list.forEach(function (r) {
        var actions = h("td", { class: "col-actions" }, [h("div", { class: "row-actions" }, [
          btn(t("botMakeAnswer"), { cls: "btn-outline btn-sm", icon: "plus", onclick: function () {
            state.prefill = { lang: r.lang, question: r.question, unansweredId: r.id }; location.hash = "#/chatbot/new";
          } }),
          iconBtn(r.handled ? "clock" : "check", r.handled ? t("botReopen") : t("botMarkHandled"), function () { mark(r, !r.handled); }),
          iconBtn("trash", t("del"), function () { remove(r); }, "is-danger")
        ])]);
        tbody.appendChild(h("tr", { class: r.handled ? "is-off" : "" }, [
          h("td", { class: "nowrap", text: fmtDate(r.created_at, true) }),
          h("td", { class: "cell-title", dir: "auto", text: r.question }),
          h("td", { text: (r.lang || "").toUpperCase() }), actions
        ]));
      });
      body.appendChild(h("table", { class: "table" }, [thead, tbody]));
    }
    function load() {
      body.textContent = ""; body.appendChild(h("p", { class: "empty", text: t("loading") }));
      sb.from("chatbot_unanswered").select("*").order("created_at", { ascending: false }).limit(500).then(function (r) {
        if (r.error) throw r.error;
        rows = r.data || []; paint(); refreshBadges();
      }).catch(function (e) { body.textContent = ""; body.appendChild(errorBox(e)); });
    }
    function mark(r, v) {
      sb.from("chatbot_unanswered").update({ handled: v }).eq("id", r.id).select("id,handled").single().then(function (x) {
        if (x.error) throw x.error;
        r.handled = x.data.handled; toast(t("saved"), "ok"); paint(); refreshBadges();
      }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
    }
    function remove(r) {
      sb.from("chatbot_unanswered").delete().eq("id", r.id).then(function (x) {
        if (x.error) throw x.error;
        rows = rows.filter(function (y) { return y.id !== r.id; }); toast(t("deleted"), "ok"); paint(); refreshBadges();
      }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
    }
    load();
  }

  /* ---- answer editor */
  function viewBotEditor(view, id) {
    var LANGS = POST_LANGS;
    var ed = { topic: "", label: {}, answer: {}, kw: {}, link_url: "", link_label: {}, action: "", show_suggestion: false, is_active: true, sort_order: 100, tab: lang === "ar" ? "ar" : "en" };
    LANGS.forEach(function (l) { ed.label[l] = ""; ed.answer[l] = ""; ed.kw[l] = ""; ed.link_label[l] = ""; });
    var prefill = id ? null : state.prefill; state.prefill = null;
    state.dirty = false;

    view.appendChild(h("p", { class: "empty", text: t("loading") }));
    var start = id
      ? sb.from("chatbot_entries").select("*").eq("id", id).maybeSingle().then(function (r) {
          if (r.error) throw r.error;
          if (!r.data) { location.hash = "#/chatbot"; return false; }
          var p = r.data;
          ed.topic = p.topic || ""; ed.link_url = p.link_url || ""; ed.action = p.action || ""; ed.show_suggestion = !!p.show_suggestion; ed.is_active = p.is_active !== false; ed.sort_order = p.sort_order == null ? 100 : p.sort_order;
          LANGS.forEach(function (l) {
            ed.label[l] = (p.label || {})[l] || ""; ed.answer[l] = (p.answer || {})[l] || ""; ed.link_label[l] = (p.link_label || {})[l] || "";
            ed.kw[l] = ((p.keywords || {})[l] || []).join("\n");
          });
          return true;
        })
      : sb.from("chatbot_entries").select("sort_order").order("sort_order", { ascending: false }).limit(1).then(function (r) {
          ed.sort_order = ((r.data && r.data[0] && r.data[0].sort_order) || 0) + 10;
          if (prefill) { ed.tab = LANGS.indexOf(prefill.lang) > -1 ? prefill.lang : ed.tab; ed.kw[ed.tab] = prefill.question; ed.topic = prefill.question.slice(0, 60); }
          return true;
        });
    start.then(function (ok) { if (ok) build(); }).catch(function (e) { view.textContent = ""; view.appendChild(errorBox(e)); });

    function build() {
      view.textContent = "";
      var dirty = function () { state.dirty = true; if (msg && msg.className.indexOf("is-error") > -1) { msg.className = "form-msg"; msg.textContent = ""; } };
      var msg;
      var panels = {}, tabs = {}, langName = { en: "English", ar: "العربية", ru: "Русский" };
      var tabBar = h("div", { class: "tabs", role: "tablist" }), panelHost = h("div", { class: "panels" });
      var bubble = h("div", { class: "bot-bubble" }), bubbleLink = h("span", { class: "bot-bubble-link" });

      LANGS.forEach(function (l) {
        var dirAttr = l === "ar" ? "rtl" : "ltr";
        var label = h("input", { id: "bl_" + l, maxlength: 60, dir: dirAttr, lang: l, oninput: function () { ed.label[l] = label.value; dirty(); markTabs(); } }); label.value = ed.label[l];
        var answer = h("textarea", { id: "ba_" + l, rows: 6, maxlength: 1200, dir: dirAttr, lang: l, oninput: function () { ed.answer[l] = answer.value; dirty(); markTabs(); paintBubble(); } }); answer.value = ed.answer[l];
        var kw = h("textarea", { id: "bk_" + l, rows: 6, dir: dirAttr, lang: l, oninput: function () { ed.kw[l] = kw.value; dirty(); markTabs(); } }); kw.value = ed.kw[l];
        var ll = h("input", { id: "bll_" + l, maxlength: 40, dir: dirAttr, lang: l, oninput: function () { ed.link_label[l] = ll.value; dirty(); paintBubble(); } }); ll.value = ed.link_label[l];
        panels[l] = h("div", { class: "panel", role: "tabpanel", "aria-labelledby": "btab_" + l, hidden: ed.tab === l ? null : true }, [
          field(t("botLabel"), label, t("botLabelHelp")), field(t("botAnswerField"), answer), field(t("botKeywords"), kw, t("botKeywordsHelp")), field(t("botLinkLabel"), ll)
        ]);
        panelHost.appendChild(panels[l]);
        tabs[l] = h("button", { type: "button", role: "tab", id: "btab_" + l, class: "tab", "aria-selected": String(ed.tab === l), onclick: function () { setTab(l); } }, [h("span", { text: langName[l] }), h("i", { class: "dot", "aria-hidden": "true" })]);
        tabBar.appendChild(tabs[l]);
      });
      function markTabs() { LANGS.forEach(function (l) { tabs[l].classList.toggle("is-filled", !!(ed.answer[l].trim() || ed.kw[l].trim())); }); }
      function setTab(l) { ed.tab = l; LANGS.forEach(function (x) { panels[x].hidden = x !== l; tabs[x].setAttribute("aria-selected", String(x === l)); }); paintBubble(); }
      function paintBubble() {
        var l = ed.tab; bubble.dir = l === "ar" ? "rtl" : "ltr"; bubble.lang = l;
        bubble.textContent = ed.answer[l].trim() || "…";
        var lab = ed.link_label[l].trim() || ed.link_url;
        if (ed.link_url && lab) bubble.appendChild(h("span", { class: "bot-bubble-link", text: lab }));
      }
      markTabs();

      var topic = h("input", { id: "bTopic", value: ed.topic, maxlength: 80, oninput: function () { ed.topic = topic.value; dirty(); } });
      var action = h("select", { id: "bAction", onchange: function () { ed.action = action.value; dirty(); } }, BOT_ACTIONS.map(function (a) { return h("option", { value: a, text: t("botAct_" + (a || "none")) }); }));
      action.value = ed.action;
      var link = h("input", { id: "bLink", value: ed.link_url, dir: "ltr", maxlength: 300, placeholder: "index.html#careers  ·  https://…  ·  tel:  ·  mailto:", oninput: function () { ed.link_url = link.value.trim(); dirty(); paintBubble(); } });
      var sugg = h("input", { type: "checkbox", id: "bSugg", onchange: function () { ed.show_suggestion = sugg.checked; dirty(); } }); sugg.checked = ed.show_suggestion;
      var active = h("input", { type: "checkbox", id: "bActive", onchange: function () { ed.is_active = active.checked; dirty(); } }); active.checked = ed.is_active;
      var order = h("input", { type: "number", id: "bOrder", value: String(ed.sort_order), dir: "ltr", min: "0", max: "100000", step: "10", oninput: function () { ed.sort_order = parseInt(order.value, 10); dirty(); } });

      msg = h("p", { class: "form-msg", role: "alert" });
      var saveBtn = btn(t("saveChanges"), { cls: "btn-primary", icon: "save", onclick: save });
      var actions = h("div", { class: "editor-actions" }, [saveBtn]);
      if (id) actions.appendChild(btn(t("del"), { cls: "btn-danger-quiet", icon: "trash", onclick: function () {
        confirmBox(t("botDelTitle"), t("botDelCopy", { name: ed.topic })).then(function (ok) {
          if (!ok) return;
          sb.from("chatbot_entries").delete().eq("id", id).then(function (r) {
            if (r.error) throw r.error;
            state.dirty = false; toast(t("deleted"), "ok"); location.hash = "#/chatbot";
          }).catch(function (e) { toast(t("saveFail", { msg: errMsg(e) }), "error"); });
        });
      } }));

      function parseKw(text) {
        var seen = {}, out = [];
        String(text || "").split(/[\n,;،؛]+/).forEach(function (k) {
          k = k.replace(/\s+/g, " ").trim().slice(0, 60);
          if (k.length >= 2 && !seen[k.toLowerCase()]) { seen[k.toLowerCase()] = 1; out.push(k); }
        });
        return out.slice(0, 80);
      }
      function fail(text, el) { msg.className = "form-msg is-error"; msg.textContent = text; if (el) { var l = el.id.split("_")[1]; if (l) setTab(l); el.focus(); } }
      function save() {
        msg.className = "form-msg"; msg.textContent = "";
        var tp = ed.topic.trim();
        if (tp.length < 2) return fail(t("botNeedTopic"), topic);
        var answers = {}, labels = {}, kws = {}, links = {};
        LANGS.forEach(function (l) { answers[l] = ed.answer[l].trim(); labels[l] = ed.label[l].trim(); kws[l] = parseKw(ed.kw[l]); links[l] = ed.link_label[l].trim(); });
        if (!LANGS.some(function (l) { return answers[l]; }) && !ed.action) return fail(t("botNeedAnswer"), $("#ba_" + ed.tab));
        if (ed.link_url && !BOT_LINK_OK.test(ed.link_url)) return fail(t("botBadLink"), link);
        if (ed.show_suggestion && !LANGS.some(function (l) { return labels[l]; })) return fail(t("botNeedLabel"), $("#bl_" + ed.tab));
        if (!LANGS.some(function (l) { return kws[l].length; })) return fail(t("botNeedKeywords"), $("#bk_" + ed.tab));
        var so = isFinite(ed.sort_order) ? ed.sort_order : 100;
        var payload = {
          topic: tp, label: labels, answer: answers, keywords: kws,
          link_url: ed.link_url || null, link_label: ed.link_url ? links : {}, action: ed.action || null,
          show_suggestion: ed.show_suggestion, is_active: ed.is_active, sort_order: so
        };
        saveBtn.disabled = true;
        var op = id
          ? sb.from("chatbot_entries").update(payload).eq("id", id).select("id").single()
          : sb.from("chatbot_entries").insert(payload).select("id").single();
        op.then(function (r) {
          if (r.error) throw r.error;
          state.dirty = false;
          var un = prefill && prefill.unansweredId;
          var done = function () { toast(t("saved"), "ok"); if (!id) location.hash = "#/chatbot/edit/" + r.data.id; else saveBtn.disabled = false; };
          if (un) sb.from("chatbot_unanswered").update({ handled: true }).eq("id", un).then(done, done); else done();
        }).catch(function (e) { saveBtn.disabled = false; fail(t("saveFail", { msg: errMsg(e) })); });
      }

      view.appendChild(h("a", { class: "back", href: "#/chatbot", onclick: guardNav }, [ico("arrow-left"), h("span", { text: t("botBack") })]));
      view.appendChild(pageHead(id ? t("botEdEdit") : t("botEdNew"), []));
      view.appendChild(h("div", { class: "editor" }, [
        h("section", { class: "card editor-main" }, [tabBar, panelHost, h("div", { class: "bot-preview" }, [h("span", { class: "label", text: t("botPreview") }), bubble])]),
        h("aside", { class: "editor-side" }, [
          h("section", { class: "card" }, [
            field(t("botTopic"), topic, t("botTopicHelp")),
            field(t("botAction"), action, t("botActionHelp")),
            field(t("botLink"), link, t("botLinkHelp")),
            field(t("botOrder"), order, t("botOrderHelp")),
            h("label", { class: "check" }, [sugg, h("span", { text: t("botSuggest") })]),
            h("label", { class: "check" }, [active, h("span", { text: t("botActiveLabel") })])
          ]),
          h("section", { class: "card" }, [msg, actions])
        ])
      ]));
      paintBubble();
      window.onbeforeunload = function (e) { if (state.dirty) { e.preventDefault(); e.returnValue = ""; return ""; } };
    }
  }

  /* ---------------------------------------------------------------- session + boot */
  function handleSession(session) {
    if (state.recovery) return;
    var same = state.user && state.user.id === session.user.id && state.isAdmin;
    state.user = session.user;
    if (same) return;
    sb.from("admins").select("user_id").eq("user_id", session.user.id).maybeSingle().then(function (r) {
      state.isAdmin = !!(r.data && !r.error); state.ready = true; render();
    }, function () { state.isAdmin = false; state.ready = true; render(); });
  }

  function render() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("brandSub") + " | Pure Talent";
    app.textContent = "";
    if (!state.ready) { app.appendChild(h("p", { class: "boot", text: t("loading") })); return; }
    if (state.recovery) { app.appendChild(recoveryView()); return; }
    if (!state.user) { app.appendChild(loginView()); return; }
    if (!state.isAdmin) { app.appendChild(deniedView()); return; }
    app.appendChild(shell());
    route(); refreshBadges();
  }

  function boot() {
    app = $("#app");
    if (!client()) { app.textContent = ""; app.appendChild(h("p", { class: "boot is-error", text: t("fatal") })); return; }
    sb.auth.onAuthStateChange(function (event, session) {
      /* Never call Supabase synchronously inside this callback — hand off to the next tick. */
      setTimeout(function () {
        if (event === "PASSWORD_RECOVERY") { state.recovery = true; state.ready = true; render(); return; }
        if (event === "SIGNED_OUT" || (event === "INITIAL_SESSION" && !session)) { state.user = null; state.isAdmin = false; state.ready = true; render(); return; }
        if (session) handleSession(session);
      }, 0);
    });
    window.addEventListener("hashchange", function () { if (state.isAdmin) route(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
