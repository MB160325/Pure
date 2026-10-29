/* Pure Talent — public News (reads published posts from Supabase).
   Pages: index.html (hero ticker + latest 3), news.html (list), article.html (single post). */
(function () {
  "use strict";
  var PT = window.PT;
  var h = PT.h;
  var FIELDS = "id,slug,title,excerpt,category,cover_url,is_featured,published_at";
  var CAT_KEY = { company: "catCompany", announcement: "catAnnouncement", industry: "catIndustry", careers: "catCareers", events: "catEvents" };
  var CATS = Object.keys(CAT_KEY);

  function client() {
    var sb = PT.sb();
    if (!sb) throw new Error("Supabase client unavailable");
    return sb;
  }

  /* ---------- data ---------- */
  function list(opts) {
    opts = opts || {};
    var limit = opts.limit || PT.cfg.newsPageSize || 9;
    var offset = opts.offset || 0;
    var q;
    try {
      q = client().from("news_posts").select(FIELDS)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false })
        .range(offset, offset + limit); /* one extra row tells us if more exist */
    } catch (e) { return Promise.reject(e); }
    if (opts.category) q = q.eq("category", opts.category);
    return q.then(function (res) {
      if (res.error) throw res.error;
      var rows = res.data || [];
      return { rows: rows.slice(0, limit), hasMore: rows.length > limit };
    });
  }
  function latest(n) { return list({ limit: n || 3 }).then(function (r) { return r.rows; }); }

  /* ---------- rendering helpers ---------- */
  function catLabel(c) { return PT.t(CAT_KEY[c] || "catCompany"); }

  function media(post, cls) {
    var box = h("div", { class: "news-media " + (cls || "") });
    var fallback = function () { box.textContent = ""; box.classList.add("is-empty"); box.appendChild(PT.icon("newspaper")); };
    if (post.cover_url) {
      var img = h("img", { src: post.cover_url, alt: "", loading: "lazy", decoding: "async" });
      img.addEventListener("error", fallback);
      box.appendChild(img);
    } else { fallback(); }
    return box;
  }

  function card(post, opts) {
    opts = opts || {};
    var title = PT.pick(post.title);
    var excerpt = PT.pick(post.excerpt);
    var a = h("a", { class: "news-card" + (opts.featured ? " is-featured" : ""), href: "article.html?slug=" + encodeURIComponent(post.slug) }, [
      media(post),
      h("div", { class: "news-body" }, [
        h("div", { class: "news-meta" }, [
          h("span", { class: "chip chip-" + post.category, text: catLabel(post.category) }),
          h("time", { datetime: post.published_at || "", text: PT.date(post.published_at) })
        ]),
        h("h3", { class: "news-title", text: title }),
        excerpt ? h("p", { class: "news-excerpt", text: excerpt }) : null,
        h("span", { class: "news-more" }, [h("span", { text: PT.t("newsReadMore") }), PT.icon("arrow-right", "flip-rtl")])
      ])
    ]);
    return a;
  }

  /* Body renderer lives in richtext.js (shared with the dashboard preview). */
  function renderBody(el, text) {
    if (window.PT_RICH) window.PT_RICH.render(el, text);
    else el.textContent = String(text || "");
  }

  function setMeta(attr, key, value) {
    if (!value) return;
    var sel = "meta[" + attr + '="' + key + '"]';
    var m = document.head.querySelector(sel);
    if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
    m.setAttribute("content", value);
  }

  /* ---------- home: hero ticker + latest 3 ---------- */
  function initHome() {
    var ticker = document.getElementById("heroNews");
    var section = document.getElementById("homeNews");
    var grid = document.getElementById("homeNewsGrid");
    if (!ticker && !section) return;
    var rows = [];

    function paint() {
      if (ticker && rows[0]) {
        var p = rows[0];
        ticker.textContent = "";
        ticker.appendChild(h("a", { class: "hero-news-link", href: "article.html?slug=" + encodeURIComponent(p.slug) }, [
          h("span", { class: "hero-news-label", text: PT.t("heroNewsLabel") }),
          h("strong", { text: PT.pick(p.title) }),
          h("span", { class: "hero-news-date" }, [PT.icon("calendar"), h("time", { datetime: p.published_at || "", text: PT.date(p.published_at) })]),
          h("span", { class: "hero-news-go" }, [PT.icon("arrow-right", "flip-rtl")])
        ]));
        ticker.hidden = false;
      }
      if (grid && rows.length) {
        grid.textContent = "";
        rows.forEach(function (r) { grid.appendChild(card(r)); });
        section.hidden = false;
      }
    }
    latest(3).then(function (r) { rows = r; if (rows.length) paint(); }).catch(function (e) { console.warn("News unavailable:", e); });
    PT.onLang(function () { if (rows.length) paint(); });
  }

  /* ---------- news list page ---------- */
  function initList() {
    var root = document.getElementById("newsPage");
    if (!root) return;
    var filters = document.getElementById("newsFilters");
    var featuredBox = document.getElementById("newsFeatured");
    var grid = document.getElementById("newsGrid");
    var more = document.getElementById("newsMore");
    var statusEl = document.getElementById("newsStatus");

    var params = new URLSearchParams(location.search);
    var state = { cat: CATS.indexOf(params.get("cat")) > -1 ? params.get("cat") : "", rows: [], hasMore: false, loading: false, error: false, loaded: false };

    function paintFilters() {
      filters.textContent = "";
      [""].concat(CATS).forEach(function (c) {
        var b = h("button", {
          type: "button", class: "filter-chip" + (state.cat === c ? " is-active" : ""),
          "aria-pressed": String(state.cat === c), "data-cat": c,
          text: c ? catLabel(c) : PT.t("catAll")
        });
        filters.appendChild(b);
      });
    }

    function paint() {
      featuredBox.textContent = ""; grid.textContent = "";
      var rows = state.rows.slice();
      var featured = !state.cat ? rows.filter(function (r) { return r.is_featured; })[0] : null;
      if (featured) {
        rows = rows.filter(function (r) { return r.id !== featured.id; });
        featuredBox.appendChild(card(featured, { featured: true }));
      }
      rows.forEach(function (r) { grid.appendChild(card(r)); });

      var msg = "";
      if (state.error) msg = PT.t("newsError");
      else if (state.loading) msg = PT.t("newsLoading");
      else if (state.loaded && !state.rows.length) msg = PT.t(state.cat ? "newsEmptyCategory" : "newsEmpty");
      statusEl.textContent = msg;
      statusEl.hidden = !msg;
      statusEl.classList.toggle("is-error", state.error);
      more.hidden = !state.hasMore;
      more.disabled = state.loading;
      more.textContent = state.loading ? PT.t("newsLoading") : PT.t("newsLoadMore");
      PT.paintIcons(root);
    }

    function load(reset) {
      if (state.loading) return;
      if (reset) { state.rows = []; state.hasMore = false; state.loaded = false; }
      state.loading = true; state.error = false; paint();
      list({ category: state.cat || null, offset: state.rows.length }).then(function (res) {
        state.rows = state.rows.concat(res.rows);
        state.hasMore = res.hasMore;
      }).catch(function (e) { console.error(e); state.error = true; })
        .then(function () { state.loading = false; state.loaded = true; paint(); });
    }

    filters.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b) return;
      state.cat = b.getAttribute("data-cat");
      var url = new URL(location.href);
      if (state.cat) url.searchParams.set("cat", state.cat); else url.searchParams.delete("cat");
      history.replaceState(null, "", url);
      paintFilters(); load(true);
    });
    more.addEventListener("click", function () { load(false); });
    PT.onLang(function () { paintFilters(); paint(); });

    paintFilters(); load(true);
  }

  /* ---------- article page ---------- */
  function initArticle() {
    var root = document.getElementById("articlePage");
    if (!root) return;
    var slug = new URLSearchParams(location.search).get("slug");
    var post = null, related = [];

    function notFound() {
      root.textContent = "";
      root.appendChild(h("div", { class: "empty-state" }, [
        h("h1", { text: PT.t("newsNotFound") }),
        h("p", { text: PT.t("newsNotFoundCopy") }),
        h("a", { class: "btn btn-primary", href: "news.html" }, [PT.icon("arrow-left", "flip-rtl"), h("span", { text: PT.t("newsBack") })])
      ]));
      PT.paintIcons(root);
    }

    function paint() {
      if (!post) return notFound();
      var title = PT.pick(post.title), excerpt = PT.pick(post.excerpt), body = PT.pick(post.body);
      root.textContent = "";

      var future = post.published_at && new Date(post.published_at) > new Date();
      if (post.status !== "published" || future) {
        root.appendChild(h("div", { class: "preview-banner", role: "status" }, [PT.icon("eye"), h("span", {
          text: post.status !== "published" ? PT.t("newsDraft") : PT.t("newsScheduled", { date: PT.date(post.published_at) })
        })]));
      }

      var bodyEl = h("div", { class: "article-body" });
      renderBody(bodyEl, body);

      var url = location.href.split("#")[0];
      var copyBtn = h("button", { type: "button", class: "share-btn", onclick: function () {
        var done = function () { PT.toast(PT.t("newsCopied"), "ok"); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done); else done();
      } }, [PT.icon("link"), h("span", { text: PT.t("newsCopyLink") })]);

      root.appendChild(h("article", { class: "article" }, [
        h("a", { class: "back-link", href: "news.html" }, [PT.icon("arrow-left", "flip-rtl"), h("span", { text: PT.t("newsBack") })]),
        h("div", { class: "news-meta" }, [
          h("span", { class: "chip chip-" + post.category, text: catLabel(post.category) }),
          h("time", { datetime: post.published_at || "", text: PT.date(post.published_at) })
        ]),
        h("h1", { class: "article-title", text: title }),
        excerpt ? h("p", { class: "article-lede", text: excerpt }) : null,
        post.cover_url ? h("figure", { class: "article-cover" }, [h("img", { src: post.cover_url, alt: "", decoding: "async" })]) : null,
        bodyEl,
        h("div", { class: "share-row" }, [
          h("span", { class: "share-label", text: PT.t("newsShare") }),
          copyBtn,
          h("a", { class: "share-btn", target: "_blank", rel: "noopener noreferrer", href: "https://wa.me/?text=" + encodeURIComponent(title + " " + url) }, [PT.icon("message-circle"), h("span", { text: "WhatsApp" })]),
          h("a", { class: "share-btn", target: "_blank", rel: "noopener noreferrer", href: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url) }, [PT.icon("external-link"), h("span", { text: "LinkedIn" })])
        ])
      ]));

      if (related.length) {
        var grid = h("div", { class: "news-grid" });
        related.forEach(function (r) { grid.appendChild(card(r)); });
        root.appendChild(h("section", { class: "related" }, [h("h2", { text: PT.t("newsRelated") }), grid]));
      }
      PT.paintIcons(root);

      document.title = title + " | Pure Talent";
      var desc = excerpt || body.slice(0, 160);
      setMeta("name", "description", desc);
      setMeta("property", "og:title", title);
      setMeta("property", "og:description", desc);
      setMeta("property", "og:type", "article");
      setMeta("property", "og:url", url);
      if (post.cover_url) setMeta("property", "og:image", post.cover_url);
      setMeta("name", "twitter:card", post.cover_url ? "summary_large_image" : "summary");
    }

    if (!slug) { notFound(); return; }
    root.appendChild(h("p", { class: "status-line", text: PT.t("newsLoading") }));

    var sb;
    try { sb = client(); } catch (e) { root.textContent = ""; root.appendChild(h("p", { class: "status-line is-error", text: PT.t("newsError") })); return; }
    sb.from("news_posts").select("*").eq("slug", slug).maybeSingle().then(function (res) {
      if (res.error) throw res.error;
      post = res.data;
      if (!post) { paint(); return; }
      return list({ limit: 4 }).then(function (r) {
        related = r.rows.filter(function (x) { return x.id !== post.id; }).slice(0, 3);
        paint();
      }, function () { paint(); });
    }).catch(function (e) {
      console.error(e); root.textContent = "";
      root.appendChild(h("p", { class: "status-line is-error", text: PT.t("newsError") }));
    });
    PT.onLang(function () { if (post) paint(); });
  }

  PT.news = { list: list, latest: latest, card: card, renderBody: renderBody };

  function boot() { initHome(); initList(); initArticle(); }
  if (PT.ready) boot(); else document.addEventListener("pt:ready", boot, { once: true });
})();
