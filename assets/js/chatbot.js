/* Pure Talent — chat assistant.
   Answers come from the Supabase table `chatbot_entries` (edited in the dashboard). If the database is
   unreachable the built-in answers in data.js are used, so the assistant always replies.
   Questions it cannot answer are logged to `chatbot_unanswered` so staff can add the missing answers. */
(function () {
  "use strict";

  var PT = window.PT;
  if (!PT) return;
  var h = PT.h;
  var SS = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
             set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  var REDUCED = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MOBILE = window.matchMedia ? matchMedia("(max-width: 640px)") : { matches: false, addEventListener: function () {} };

  var toggle, win, body, chips, form, input, send, closeBtn;
  var KB = null, kbPromise = null;
  var messages = [];              /* persisted conversation */
  var busy = false, opened = false, loggedCount = 0, logged = {};

  /* ------------------------------------------------------------ knowledge base */
  var FIELDS = "id,topic,label,keywords,answer,link_url,link_label,action,show_suggestion,sort_order";

  function flattenKeywords(k) {
    if (Array.isArray(k)) return k;
    var out = [];
    if (k && typeof k === "object") Object.keys(k).forEach(function (l) { if (Array.isArray(k[l])) out = out.concat(k[l]); });
    return out;
  }
  function builtIn() {
    var d = window.PT_CHATBOT_DATA || { entries: [] };
    return d.entries.map(function (e, i) {
      return { id: e.id, topic: e.id, label: e.label || {}, keywords: e.keywords, answer: e.answers,
               link_url: e.link ? e.link.href : null, link_label: e.link ? e.link.label : {},
               action: e.id === "news" ? "latest_news" : null, show_suggestion: !!e.suggest, sort_order: i * 10 };
    });
  }
  function prepare(rows) {
    return rows.map(function (r) {
      var kws = flattenKeywords(r.keywords).map(normalize).filter(function (k) { return k.length >= 2; });
      return { row: r, kws: kws, title: normalize(PT.pick(r.label) || r.topic) };
    });
  }
  function loadKB() {
    if (KB) return Promise.resolve(KB);
    if (kbPromise) return kbPromise;
    var cached = null;
    try { cached = JSON.parse(SS.get("pt_kb_v1") || "null"); } catch (e) { cached = null; }
    if (cached && cached.t && Date.now() - cached.t < 10 * 60 * 1000 && cached.rows && cached.rows.length) {
      KB = prepare(cached.rows); return Promise.resolve(KB);
    }
    var sb = PT.sb && PT.sb();
    var fallback = function () { KB = prepare(builtIn()); return KB; };
    if (!sb) { kbPromise = Promise.resolve(fallback()); return kbPromise; }
    kbPromise = Promise.resolve(sb.from("chatbot_entries").select(FIELDS).eq("is_active", true).order("sort_order", { ascending: true }).limit(300))
      .then(function (r) {
        if (r.error || !r.data || !r.data.length) return fallback();
        SS.set("pt_kb_v1", JSON.stringify({ t: Date.now(), rows: r.data }));
        KB = prepare(r.data); return KB;
      }, fallback);
    return kbPromise;
  }

  /* ------------------------------------------------------------ matching */
  function normalize(s) {
    return String(s || "").toLowerCase()
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ё/g, "е")
      .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  }
  function tokens(s) { return s ? s.split(" ") : []; }
  function stripAr(t) { return t.length > 4 ? t.replace(/^(وال|بال|لل|ال|و)/, "") : t; }
  function lev1(a, b) { /* true when the words differ by at most one edit */
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, edits = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    return edits + (la - i) + (lb - j) <= 1;
  }
  function stemEq(a, b) { return a.length >= 5 && b.length >= 5 && a.slice(0, -2) === b.slice(0, -2); }

  function score(query) {
    var q = normalize(query), toks = tokens(q).map(stripAr);
    var padded = " " + q + " ";
    return KB.map(function (p) {
      var sc = 0;
      p.kws.forEach(function (kw) {
        var multi = kw.indexOf(" ") > -1;
        if (!multi && kw.length <= 3) { if (toks.indexOf(kw) > -1) sc += 3; return; }
        if (padded.indexOf(" " + kw + " ") > -1) { sc += kw.length + (multi ? 3 : 0); return; }
        if (q.indexOf(kw) > -1 && kw.length >= 5) { sc += kw.length - 1; return; }
        if (!multi) {
          var k2 = stripAr(kw);
          if (toks.some(function (t) { return t === k2 || stemEq(t, k2) || (k2.length >= 5 && lev1(t, k2)); })) sc += Math.max(2, kw.length - 2);
        }
      });
      if (p.title && p.title.length > 3 && q.indexOf(p.title) > -1) sc += p.title.length;
      return { p: p, score: sc };
    }).sort(function (a, b) { return b.score - a.score; });
  }

  /* ------------------------------------------------------------ helpers */
  function safeHref(u) { return typeof u === "string" && /^(https:\/\/[^\s]+|mailto:[^\s]+|tel:\+?[0-9]+|[A-Za-z0-9_.\/#?=&%-]+)$/.test(u) ? u : null; }
  function entryLabel(r) { return PT.pick(r.label) || r.topic; }
  function save() { SS.set("pt_chat_v1", JSON.stringify(messages.slice(-40))); }
  function scrollDown(smooth) {
    var go = function () { body.scrollTo ? body.scrollTo({ top: body.scrollHeight, behavior: smooth && !REDUCED ? "smooth" : "auto" }) : (body.scrollTop = body.scrollHeight); };
    go(); requestAnimationFrame(go);
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, REDUCED ? Math.min(ms, 200) : ms); }); }

  /* ------------------------------------------------------------ rendering */
  function buttonsFor(m) {
    var wrap = h("div", { class: "chat-actions" });
    (m.links || []).forEach(function (l) {
      var href = safeHref(l.href); if (!href) return;
      var external = /^https:/.test(href);
      wrap.appendChild(h("a", { class: "chat-btn", href: href, target: external ? "_blank" : null, rel: external ? "noopener" : null, "data-chat-link": "1" }, [
        PT.icon(/^tel:/.test(href) ? "phone" : /^mailto:/.test(href) ? "mail" : "arrow-right"), h("span", { text: l.label })
      ]));
    });
    if (m.biz) {
      wrap.appendChild(h("button", { type: "button", class: "chat-btn chat-btn-primary", "data-chat-biz": m.bizPrefill || "" }, [PT.icon("briefcase"), h("span", { text: PT.t("chatBusinessBtn") })]));
    }
    if (m.contact) {
      var cfg = PT.cfg || {};
      wrap.appendChild(h("a", { class: "chat-btn", href: "tel:" + (cfg.phoneHref || "+97126660935"), "data-chat-link": "1" }, [PT.icon("phone"), h("span", { text: PT.t("chatCall") })]));
      wrap.appendChild(h("a", { class: "chat-btn", href: "mailto:" + (cfg.email || "info@puretalent.ae"), "data-chat-link": "1" }, [PT.icon("mail"), h("span", { text: PT.t("chatEmail") })]));
    }
    return wrap.children.length ? wrap : null;
  }

  function bubble(m, animateText) {
    var row = h("div", { class: "chat-row " + (m.w === "u" ? "user" : "bot") });
    var b = h("div", { class: "chat-message" });
    if (m.w === "b") {
      var vis = h("span", { class: "chat-text", "aria-hidden": "true" });
      b.appendChild(h("span", { class: "sr-only", text: m.t }));
      b.appendChild(vis);
      row.appendChild(b);
      body.appendChild(row);
      var finish = function () { vis.textContent = m.t; var btns = buttonsFor(m); if (btns) { b.appendChild(btns); PT.paintIcons(btns); } scrollDown(true); };
      if (!animateText || REDUCED) { finish(); return Promise.resolve(); }
      var words = m.t.split(/(\s+)/), i = 0, per = Math.max(12, Math.min(36, 1300 / Math.max(words.length / 2, 1)));
      return new Promise(function (resolve) {
        var tick = function () {
          i = Math.min(words.length, i + 2);
          vis.textContent = words.slice(0, i).join("");
          scrollDown(false);
          if (i < words.length) setTimeout(tick, per); else { finish(); resolve(); }
        };
        tick();
      });
    }
    b.appendChild(h("span", { text: m.t }));
    row.appendChild(b); body.appendChild(row); scrollDown(true);
    return Promise.resolve();
  }

  function showTyping() {
    var row = h("div", { class: "chat-row bot is-typing", role: "status", "aria-label": PT.t("chatTyping") }, [
      h("div", { class: "chat-message chat-typing" }, [h("i"), h("i"), h("i")])
    ]);
    body.appendChild(row); scrollDown(true);
    return function () { row.remove(); };
  }

  function renderChips(list, caption) {
    chips.textContent = "";
    chips.hidden = !list.length;
    if (!list.length) return;
    if (caption) chips.appendChild(h("span", { class: "chat-chips-caption", text: caption }));
    list.forEach(function (c) {
      chips.appendChild(h("button", { type: "button", class: "chat-chip", text: c.text, onclick: function () { if (!busy) ask(c.text, c.entry); } }));
    });
    chips.scrollLeft = 0;
  }
  function defaultChips(excludeId) {
    var list = (KB || []).filter(function (p) { return p.row.show_suggestion && p.row.id !== excludeId; })
      .map(function (p) { return { text: entryLabel(p.row), entry: p }; });
    renderChips(list.slice(0, 7));
  }

  /* ------------------------------------------------------------ answering */
  function logUnanswered(q) {
    var clean = q.trim().slice(0, 300), key = normalize(clean);
    if (clean.length < 2 || logged[key] || loggedCount >= 10) return;
    if (/@|\d{7,}/.test(clean)) return;              /* never store contact details */
    logged[key] = 1; loggedCount++;
    var sb = PT.sb && PT.sb();
    if (sb) { try { Promise.resolve(sb.from("chatbot_unanswered").insert({ question: clean, lang: PT.lang() })).catch(function () {}); } catch (e) { /* ignore */ } }
  }

  function resolve(q, forced) {
    /* returns a promise of {t, links, biz, contact, chips, entryId} */
    if (forced) return answerFrom(forced.row, q);
    var ranked = score(q), top = ranked[0];
    if (top && top.score >= 4) return answerFrom(top.p.row, q);
    var near = ranked.filter(function (r) { return r.score > 0; }).slice(0, 3).map(function (r) { return { text: entryLabel(r.p.row), entry: r.p }; });
    logUnanswered(q);
    return Promise.resolve({ t: fallbackText(), contact: true, near: near });
  }
  function fallbackText() { return PT.t("chatFallbackText"); }

  function answerFrom(r, q) {
    var text = PT.pick(r.answer) || fallbackText();
    var links = [];
    var href = safeHref(r.link_url);
    if (href) links.push({ href: href, label: PT.pick(r.link_label) || PT.t("chatOpenLink") || "Open" });
    var out = { t: text, links: links, biz: r.action === "open_business", bizPrefill: q, entryId: r.id };
    if (r.action === "latest_news" && PT.news && PT.news.latest) {
      return Promise.resolve(PT.news.latest(3)).then(function (rows) {
        if (rows && rows.length) {
          out.t = text + " " + PT.t("chatLatestNews");
          out.links = rows.map(function (x) { return { href: "article.html?slug=" + encodeURIComponent(x.slug), label: PT.pick(x.title) }; }).concat(links);
        }
        return out;
      }, function () { return out; });
    }
    return Promise.resolve(out);
  }

  function setBusy(v) { busy = v; send.disabled = v || !input.value.trim(); input.setAttribute("aria-busy", String(v)); }

  function ask(text, forced) {
    var q = String(text || "").trim();
    if (!q || busy) return;
    setBusy(true);
    var um = { w: "u", t: q }; messages.push(um); bubble(um); input.value = ""; renderChips([]);
    var stopTyping = showTyping();
    var started = Date.now();
    loadKB().then(function () { return resolve(q, forced); }).catch(function () { return { t: fallbackText(), contact: true }; }).then(function (ans) {
      var min = 650 + Math.min(ans.t.length * 7, 1000);
      return wait(Math.max(0, min - (Date.now() - started))).then(function () { return ans; });
    }).then(function (ans) {
      stopTyping();
      var bm = { w: "b", t: ans.t, links: ans.links, biz: ans.biz, bizPrefill: ans.bizPrefill, contact: ans.contact };
      messages.push(bm); save();
      return bubble(bm, true).then(function () {
        if (ans.near && ans.near.length) renderChips(ans.near, PT.t("chatMaybe")); else defaultChips(ans.entryId);
      });
    }).catch(function () { stopTyping(); }).then(function () { setBusy(false); });
  }

  /* ------------------------------------------------------------ open / close / layout */
  function setOpen(open) {
    opened = open;
    win.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.hidden = open && MOBILE.matches;
    document.documentElement.classList.toggle("chat-open", open && MOBILE.matches);
    win.setAttribute("aria-modal", MOBILE.matches ? "true" : "false");
    if (open) {
      requestAnimationFrame(function () { win.classList.add("is-in"); });
      if (!body.children.length) startConversation();
      else { defaultChips(null); scrollDown(false); }
      if (!MOBILE.matches) setTimeout(function () { input.focus(); }, 60);
      fitViewport();
    } else {
      win.classList.remove("is-in");
      win.style.removeProperty("height"); win.style.removeProperty("top");
    }
  }

  function fitViewport() {   /* keep the sheet above the on-screen keyboard on phones */
    var vv = window.visualViewport;
    if (!vv || !opened || !MOBILE.matches) { win.style.removeProperty("height"); win.style.removeProperty("top"); return; }
    win.style.height = vv.height + "px";
    win.style.top = vv.offsetTop + "px";
    scrollDown(false);
  }

  function startConversation() {
    var stored = null;
    try { stored = JSON.parse(SS.get("pt_chat_v1") || "null"); } catch (e) { stored = null; }
    loadKB().then(function () {
      if (stored && stored.length) {
        messages = stored;
        messages.forEach(function (m) { bubble(m, false); });
        defaultChips(null); scrollDown(false);
        return;
      }
      var stop = showTyping();
      wait(700).then(function () {
        stop();
        var wm = { w: "b", t: PT.t("chatWelcomeText") };
        messages = [wm]; save();
        return bubble(wm, true);
      }).then(function () { defaultChips(null); });
    });
  }

  function boot() {
    toggle = document.getElementById("chatToggle"); win = document.getElementById("chatWindow");
    body = document.getElementById("chatBody"); chips = document.getElementById("chatChips");
    form = document.getElementById("chatForm"); input = document.getElementById("chatInput");
    closeBtn = document.getElementById("chatClose");
    if (!toggle || !win || !body || !form || !input) return;
    send = form.querySelector(".chat-send");

    toggle.addEventListener("click", function () { setOpen(true); });
    closeBtn.addEventListener("click", function () { setOpen(false); toggle.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && opened) { setOpen(false); toggle.focus(); } });
    input.addEventListener("input", function () { send.disabled = busy || !input.value.trim(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
    input.addEventListener("focus", function () { setTimeout(function () { fitViewport(); scrollDown(false); }, 250); });

    body.addEventListener("click", function (e) {
      var biz = e.target.closest("[data-chat-biz]");
      if (biz) { if (MOBILE.matches) setOpen(false); PT.openBusiness(biz.getAttribute("data-chat-biz") || ""); return; }
      if (e.target.closest("[data-chat-link]") && MOBILE.matches) setOpen(false);
    });
    if (window.visualViewport) { visualViewport.addEventListener("resize", fitViewport); visualViewport.addEventListener("scroll", fitViewport); }
    if (MOBILE.addEventListener) MOBILE.addEventListener("change", function () { if (opened) setOpen(true); });

    PT.onLang(function () {
      var onlyWelcome = messages.length <= 1;
      if (onlyWelcome && opened) { body.textContent = ""; messages = []; SS.set("pt_chat_v1", "[]"); startConversation(); }
      else if (opened) defaultChips(null);
    });
    loadKB();   /* warm the cache so the first answer is instant */
  }

  if (PT.ready) boot(); else document.addEventListener("pt:ready", boot, { once: true });
})();
