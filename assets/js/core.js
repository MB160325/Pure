/* Pure Talent — core (language, layout, forms, chatbot).
   Loaded on every public page after config.js, icons.js, i18n.js, data.js. */
(function () {
  "use strict";

  var C = window.PT_CONFIG || {};
  var I18N = window.PT_I18N || { en: {} };
  var LANGS = ["en", "ar", "ru"];
  var LANG_KEY = "pureTalentLanguage";
  var LOCALES = { en: "en-GB", ar: "ar-AE-u-nu-latn", ru: "ru-RU" };
  var PT = (window.PT = window.PT || {});
  PT.cfg = C;

  /* ---------- helpers ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  /* h("div", {class:"x", onclick: fn}, [child | "text"]) — builds DOM without innerHTML */
  PT.h = function (tag, attrs, kids) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  };
  PT.icon = function (name, cls) {
    var s = PT.h("span", { class: "ico" + (cls ? " " + cls : ""), "data-icon": name });
    if (window.PT_ICONS) { s.innerHTML = window.PT_ICONS.svg(name); s.dataset.painted = name; }
    return s;
  };
  PT.paintIcons = function (root) { if (window.PT_ICONS) window.PT_ICONS.paint(root); };

  /* ---------- language ---------- */
  var current = (function () {
    var s = store.get(LANG_KEY);
    if (LANGS.indexOf(s) > -1) return s;
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) > -1 ? n : "en";
  })();

  PT.lang = function () { return current; };
  PT.t = function (key, vars) {
    var s = I18N[current] && I18N[current][key];
    if (s == null) s = I18N.en[key];
    if (s == null) return key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  };
  /* Pick the text for the current language from a {en, ar, ru} object, falling back. */
  PT.pick = function (obj) {
    if (!obj || typeof obj !== "object") return "";
    var order = [current, "en", "ar", "ru"];
    for (var i = 0; i < order.length; i++) {
      var v = obj[order[i]];
      if (typeof v === "string" && v.trim()) return v;
    }
    return "";
  };
  PT.date = function (iso, opts) {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat(LOCALES[current], opts || { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
    } catch (e) { return String(iso).slice(0, 10); }
  };

  var langHandlers = [];
  PT.onLang = function (fn) { langHandlers.push(fn); };

  PT.applyLang = function (lang) {
    if (LANGS.indexOf(lang) < 0) lang = "en";
    current = lang;
    store.set(LANG_KEY, lang);
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = PT.t(n.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (n) { n.setAttribute("placeholder", PT.t(n.getAttribute("data-i18n-placeholder"))); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (n) { n.setAttribute("aria-label", PT.t(n.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-title]").forEach(function (n) { n.setAttribute("title", PT.t(n.getAttribute("data-i18n-title"))); });
    document.querySelectorAll(".lang-select").forEach(function (s) { s.value = lang; });

    var tk = document.body.dataset.titleKey;
    if (tk) document.title = tk === "titleHome" ? PT.t(tk) : PT.t(tk) + " | Pure Talent";

    langHandlers.forEach(function (fn) { try { fn(lang); } catch (e) { console.error(e); } });
    document.dispatchEvent(new CustomEvent("pt:lang", { detail: { lang: lang } }));
  };

  /* ---------- supabase ---------- */
  PT.sb = function () {
    if (PT._sb) return PT._sb;
    if (!window.supabase || !window.supabase.createClient || !C.supabaseUrl) return null;
    PT._sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
    return PT._sb;
  };

  /* ---------- toast ---------- */
  PT.toast = function (msg, kind) {
    var host = document.getElementById("toasts");
    if (!host) return;
    var t = PT.h("div", { class: "toast" + (kind ? " toast-" + kind : ""), role: "status" }, [msg]);
    host.appendChild(t);
    setTimeout(function () { t.classList.add("is-out"); setTimeout(function () { t.remove(); }, 300); }, 2800);
  };

  /* ---------- layout ---------- */
  var NAV = [
    ["index.html#about", "navAbout", ""],
    ["index.html#services", "navServices", ""],
    ["news.html", "navNews", "news"],
    ["index.html#careers", "navCareers", ""],
    ["team.html", "navTeam", "team"],
    ["index.html#contact", "navContact", ""]
  ];

  function navLinks(page, cls) {
    return NAV.map(function (n) {
      var active = n[2] && n[2] === page;
      return '<a href="' + n[0] + '"' + (active ? ' class="is-active" aria-current="page"' : "") + ' data-i18n="' + n[1] + '"></a>';
    }).join("");
  }

  function mountLayout() {
    var page = document.body.dataset.page || "";
    var logo = C.logo;
    var year = new Date().getFullYear();

    var header =
      '<a class="skip-link" href="#main" data-i18n="skip"></a>' +
      '<header class="site-header" id="siteHeader">' +
      '<div class="container header-row">' +
      '<a class="brand" href="index.html" aria-label="Pure Talent"><img src="' + logo + '" alt="Pure Talent Recruitment &amp; Manpower Supply" height="44" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'brand-text\',textContent:\'Pure Talent\'}))"></a>' +
      '<nav class="main-nav" aria-label="Primary">' + navLinks(page) + "</nav>" +
      '<div class="header-tools">' +
      '<label class="sr-only" for="langSelect" data-i18n="langLabel"></label>' +
      '<select id="langSelect" class="lang-select"><option value="en">English</option><option value="ar">العربية</option><option value="ru">Русский</option></select>' +
      '<a class="staff-link" href="admin/index.html"><span class="ico" data-icon="lock"></span><span data-i18n="staffLogin"></span></a>' +
      '<button type="button" class="btn btn-gold btn-sm header-cta" data-open-business data-i18n="ctaBusiness"></button>' +
      '<button type="button" class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileMenu" data-i18n-aria="menuOpen"><span class="ico" data-icon="menu"></span></button>' +
      "</div></div>" +
      '<div class="mobile-menu" id="mobileMenu" hidden><div class="container">' + navLinks(page) +
      '<a class="mobile-staff" href="admin/index.html"><span class="ico" data-icon="lock"></span><span data-i18n="staffLogin"></span></a>' +
      '<button type="button" class="btn btn-gold" data-open-business data-i18n="ctaBusiness"></button></div></div>' +
      "</header>";

    var footer =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div><img class="footer-logo" src="' + logo + '" alt="Pure Talent Recruitment &amp; Manpower Supply" height="48" onerror="this.style.display=\'none\'"><p class="footer-copy" data-i18n="footerCopy"></p></div>' +
      '<div><h2 class="footer-title" data-i18n="footerContact"></h2><div class="footer-links">' +
      '<a href="tel:' + C.phoneHref + '" dir="ltr">' + C.phone + "</a>" +
      '<a href="mailto:' + C.email + '">' + C.email + "</a>" +
      '<span data-i18n="address"></span></div></div>' +
      '<div><h2 class="footer-title" data-i18n="footerLinks"></h2><div class="footer-links">' +
      '<a href="news.html" data-i18n="navNews"></a><a href="team.html" data-i18n="navTeam"></a><a href="index.html#careers" data-i18n="navCareers"></a>' +
      '<a href="privacy-policy.html" data-i18n="privacy"></a><a href="terms.html" data-i18n="terms"></a></div></div>' +
      "</div>" +
      '<div class="footer-bottom"><small>© ' + year + ' Pure Talent Recruitment &amp; Manpower Supply. <span data-i18n="rights"></span></small>' +
      '<div class="footer-bottom-links"><a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a><a href="admin/index.html" data-i18n="staffLogin"></a></div></div>' +
      "</div></footer>";

    var chat =
      '<button type="button" id="chatToggle" class="chat-toggle" aria-expanded="false" aria-controls="chatWindow" data-i18n-aria="chatOpen">' +
      '<span class="chat-toggle-icon"><span class="ico" data-icon="message-circle"></span></span><span class="chat-toggle-label" data-i18n="chatLauncher"></span><i class="chat-toggle-dot" aria-hidden="true"></i></button>' +
      '<section id="chatWindow" class="chat-window" role="dialog" aria-labelledby="chatTitle" hidden>' +
      '<header class="chat-head"><span class="chat-avatar" aria-hidden="true"><img src="' + (C.favicon || "assets/images/favicon.png") + '" alt=""></span>' +
      '<div class="chat-id"><strong id="chatTitle" data-i18n="chatbotTitle"></strong><small><i class="chat-online" aria-hidden="true"></i><span data-i18n="chatbotSub"></span></small></div>' +
      '<button type="button" id="chatClose" class="icon-btn icon-btn-light" data-i18n-aria="chatClose"><span class="ico" data-icon="x"></span></button></header>' +
      '<div id="chatBody" class="chat-body" role="log" aria-live="polite" aria-relevant="additions"></div>' +
      '<div id="chatChips" class="chat-chips" role="group" data-i18n-aria="chatSuggestions"></div>' +
      '<form id="chatForm" class="chat-form" autocomplete="off"><label class="sr-only" for="chatInput" data-i18n="chatbotTitle"></label>' +
      '<input id="chatInput" type="text" maxlength="300" enterkeyhint="send" autocomplete="off" autocapitalize="sentences" data-i18n-placeholder="chatPlaceholder">' +
      '<button type="submit" class="chat-send" data-i18n-aria="chatSend" disabled><span class="ico flip-rtl" data-icon="send"></span></button></form>' +
      '<p class="chat-foot" data-i18n="chatFootnote"></p></section>';

    var dialog =
      '<dialog id="bizDialog" class="dialog" aria-labelledby="bizTitle"><div class="dialog-inner">' +
      '<div class="dialog-head"><div><h2 id="bizTitle" data-i18n="bizTitle"></h2><p data-i18n="bizCopy"></p></div>' +
      '<button type="button" class="icon-btn" data-close-dialog data-i18n-aria="close"><span class="ico" data-icon="x"></span></button></div>' +
      '<form id="bizForm" class="form" novalidate>' +
      '<div class="field"><label for="bizCompany" data-i18n="companyName"></label><input id="bizCompany" name="company_name" required minlength="2" maxlength="160" autocomplete="organization"></div>' +
      '<div class="field"><label for="bizEmail" data-i18n="clientEmail"></label><input id="bizEmail" name="email" type="email" required maxlength="254" autocomplete="email" dir="ltr"></div>' +
      '<div class="field"><label for="bizMessage" data-i18n="clientMessage"></label><textarea id="bizMessage" name="message" rows="5" required minlength="5" maxlength="4000"></textarea></div>' +
      '<div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<p class="form-status" role="status" aria-live="polite"></p>' +
      '<div class="form-actions"><button type="submit" class="btn btn-primary"><span class="ico" data-icon="send"></span><span data-i18n="sendBusiness"></span></button></div>' +
      "</form></div></dialog>";

    var slot = function (id, html) { var n = document.getElementById(id); if (n) n.innerHTML = html; };
    slot("site-header", header);
    slot("site-footer", footer);
    var tail = document.createElement("div");
    tail.innerHTML = chat + dialog + '<div id="toasts" class="toasts" aria-live="polite"></div>';
    while (tail.firstChild) document.body.appendChild(tail.firstChild);
  }

  function initHeader() {
    var header = document.getElementById("siteHeader");
    var btn = document.getElementById("menuBtn");
    var menu = document.getElementById("mobileMenu");
    if (!header) return;

    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
      if (!btn || !menu) return;
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", PT.t(open ? "menuClose" : "menuOpen"));
      btn.firstElementChild.dataset.icon = open ? "x" : "menu";
      PT.paintIcons(btn);
      document.documentElement.classList.toggle("menu-open", open);
    }
    if (btn) btn.addEventListener("click", function () { setMenu(menu.hidden); });
    if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a, button")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu && !menu.hidden) { setMenu(false); btn.focus(); } });
    window.matchMedia("(min-width: 981px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });

    document.querySelectorAll(".lang-select").forEach(function (s) {
      s.addEventListener("change", function () { PT.applyLang(s.value); });
    });
  }

  /* ---------- counters ---------- */
  function initCounters() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fmt = function (n) { return n.toLocaleString("en-US"); };
    var run = function (node) {
      var target = Number(node.dataset.count);
      if (reduce) { node.textContent = fmt(target); return; }
      var start = performance.now(), dur = 1300;
      var tick = function (now) {
        var p = Math.min((now - start) / dur, 1);
        node.textContent = fmt(Math.floor(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick); else node.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { nodes.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- forms ---------- */
  var pageLoadedAt = Date.now();

  function status(form, kind, msg) {
    var el = form.querySelector(".form-status");
    if (!el) return;
    el.textContent = msg || "";
    el.className = "form-status" + (kind ? " is-" + kind : "");
  }
  function busy(form, on) {
    var b = form.querySelector('button[type="submit"]');
    if (b) { b.disabled = on; b.classList.toggle("is-busy", on); }
  }
  function tooSoon(form) {
    var last = Number(store.get("pt_last_submit") || 0);
    if (Date.now() - pageLoadedAt < 2500 || Date.now() - last < 15000) { status(form, "error", PT.t("tooFast")); return true; }
    return false;
  }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (c) {
      return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
    });
  }
  function clean(v) { return String(v == null ? "" : v).trim(); }

  var CV_TYPES = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  };

  function initBusinessDialog() {
    var dlg = document.getElementById("bizDialog");
    var form = document.getElementById("bizForm");
    if (!dlg || !form) return;

    PT.openBusiness = function (prefill) {
      if (prefill) {
        var m = document.getElementById("bizMessage");
        if (m && !m.value.trim()) m.value = prefill;
      }
      status(form, "", "");
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    };
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-open-business]")) { e.preventDefault(); PT.openBusiness(); }
      if (e.target.closest("[data-close-dialog]")) dlg.close();
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = Object.fromEntries(new FormData(form).entries());
      if (data.website) { status(form, "ok", PT.t("bizSuccess", { email: clean(data.email) })); return; } /* honeypot */
      if (tooSoon(form)) return;

      var sb = PT.sb();
      if (!sb) { status(form, "error", PT.t("bizError")); return; }
      busy(form, true); status(form, "", PT.t("sending"));
      sb.from("enquiries").insert({
        company_name: clean(data.company_name),
        email: clean(data.email),
        message: clean(data.message),
        lang: current
      }).then(function (res) {
        busy(form, false);
        if (res.error) { console.error(res.error); status(form, "error", PT.t("bizError")); return; }
        store.set("pt_last_submit", String(Date.now()));
        status(form, "ok", PT.t("bizSuccess", { email: clean(data.email) }));
        form.reset();
      }, function (err) { busy(form, false); console.error(err); status(form, "error", PT.t("bizError")); });
    });
  }

  function initApplicationForm() {
    var form = document.getElementById("applicationForm");
    if (!form) return;
    var fileInput = form.querySelector('input[type="file"]');
    var fileName = form.querySelector(".file-name");
    var done = document.getElementById("applicationDone");

    if (fileInput && fileName) {
      fileInput.addEventListener("change", function () {
        fileName.textContent = fileInput.files[0] ? fileInput.files[0].name : "";
      });
    }
    var again = document.getElementById("applicationAgain");
    if (again) again.addEventListener("click", function () {
      done.hidden = true; form.hidden = false; status(form, "", "");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = Object.fromEntries(new FormData(form).entries());
      if (data.website) { form.hidden = true; done.hidden = false; return; } /* honeypot */
      if (!form.querySelector("#consent").checked) { status(form, "error", PT.t("consentRequired")); return; }

      var file = fileInput && fileInput.files[0];
      var ext = "";
      if (file) {
        ext = (file.name.split(".").pop() || "").toLowerCase();
        if (!CV_TYPES[ext]) { status(form, "error", PT.t("cvTypeError")); return; }
        if (file.size > 5 * 1024 * 1024) { status(form, "error", PT.t("cvSizeError")); return; }
      }
      if (tooSoon(form)) return;

      var sb = PT.sb();
      if (!sb) { status(form, "error", PT.t("appError")); return; }
      busy(form, true); status(form, "", PT.t("sending"));

      var id = uuid();
      var upload = file
        ? sb.storage.from("cvs").upload(id + "/cv." + ext, file, { contentType: CV_TYPES[ext], upsert: false })
            .then(function (r) { if (r.error) throw r.error; return id + "/cv." + ext; })
        : Promise.resolve(null);

      upload.then(function (cvPath) {
        return sb.from("applications").insert({
          id: id,
          full_name: clean(data.full_name),
          nationality: clean(data.nationality),
          phone: clean(data.phone),
          email: clean(data.email),
          position: clean(data.position),
          message: clean(data.message) || null,
          cv_path: cvPath,
          lang: current
        });
      }).then(function (res) {
        if (res.error) throw res.error;
        busy(form, false);
        store.set("pt_last_submit", String(Date.now()));
        form.reset();
        if (fileName) fileName.textContent = "";
        status(form, "", "");
        form.hidden = true; done.hidden = false;
        done.focus();
      }).catch(function (err) {
        console.error(err);
        busy(form, false);
        status(form, "error", PT.t("appError"));
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    document.documentElement.classList.add("js");
    mountLayout();
    initHeader();
    initBusinessDialog();
    initApplicationForm();
    PT.applyLang(current);
    PT.paintIcons(document);
    initCounters();
    PT.ready = true;
    document.dispatchEvent(new CustomEvent("pt:ready"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
