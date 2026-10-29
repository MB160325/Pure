/* Pure Talent — safe rich text for news posts (shared by the public article page and the dashboard preview).
   Input is plain text. Output is built with DOM APIs only (never innerHTML), so post content can never inject markup.

   Supported syntax:
     blank line            new paragraph
     ## Heading            section heading        ### Subheading
     - item                bullet list            1. item   numbered list
     > quote               quotation
     **bold**  *italic*    [link text](https://example.com)   bare https:// links
     ![caption](https://…) image on its own line (https only) */
(function () {
  "use strict";

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (attrs[k] != null) n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }

  var INLINE_SRC = "\\*\\*([^*]+?)\\*\\*|\\*([^*\\s][^*]*?)\\*|\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+|mailto:[^\\s)]+|tel:[^\\s)]+)\\)|(https?:\\/\\/[^\\s<]+[^\\s<.,;:!?)\"'])";

  function link(href, label) {
    var external = /^https?:/i.test(href);
    var a = el("a", { href: href, rel: "noopener noreferrer nofollow" }, label);
    if (external) a.setAttribute("target", "_blank");
    return a;
  }

  function inline(parent, text) {
    var re = new RegExp(INLINE_SRC, "g"), last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[1] != null) { var s = el("strong"); inline(s, m[1]); parent.appendChild(s); }
      else if (m[2] != null) { var e = el("em"); inline(e, m[2]); parent.appendChild(e); }
      else if (m[3] != null) parent.appendChild(link(m[4], m[3]));
      else parent.appendChild(link(m[5], m[5]));
      last = re.lastIndex;
    }
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
  }

  function render(root, text) {
    root.textContent = "";
    var lines = String(text == null ? "" : text).replace(/\r\n?/g, "\n").split("\n");
    var para = [], list = null, listType = "", quote = [];

    function flushPara() {
      if (!para.length) return;
      var p = el("p");
      para.forEach(function (ln, i) { if (i) p.appendChild(document.createElement("br")); inline(p, ln); });
      root.appendChild(p); para = [];
    }
    function flushList() { if (list) { root.appendChild(list); list = null; listType = ""; } }
    function flushQuote() {
      if (!quote.length) return;
      var q = el("blockquote");
      quote.forEach(function (ln, i) { if (i) q.appendChild(document.createElement("br")); inline(q, ln); });
      root.appendChild(q); quote = [];
    }
    function flushAll() { flushPara(); flushList(); flushQuote(); }

    lines.forEach(function (raw) {
      var ln = raw.trim(), m;
      if (!ln) { flushAll(); return; }
      if ((m = /^!\[([^\]]*)\]\((https:\/\/[^\s)]+)\)$/.exec(ln))) {
        flushAll();
        var fig = el("figure", { class: "article-figure" });
        fig.appendChild(el("img", { src: m[2], alt: m[1], loading: "lazy", decoding: "async" }));
        if (m[1]) fig.appendChild(el("figcaption", {}, m[1]));
        root.appendChild(fig);
      } else if ((m = /^###\s+(.+)$/.exec(ln))) { flushAll(); var h3 = el("h3"); inline(h3, m[1]); root.appendChild(h3); }
      else if ((m = /^##\s+(.+)$/.exec(ln))) { flushAll(); var h2 = el("h2"); inline(h2, m[1]); root.appendChild(h2); }
      else if ((m = /^>\s?(.*)$/.exec(ln))) { flushPara(); flushList(); quote.push(m[1]); }
      else if ((m = /^([-*•])\s+(.+)$/.exec(ln))) {
        flushPara(); flushQuote();
        if (listType !== "ul") { flushList(); list = el("ul"); listType = "ul"; }
        var li = el("li"); inline(li, m[2]); list.appendChild(li);
      } else if ((m = /^\d+[.)]\s+(.+)$/.exec(ln))) {
        flushPara(); flushQuote();
        if (listType !== "ol") { flushList(); list = el("ol"); listType = "ol"; }
        var li2 = el("li"); inline(li2, m[1]); list.appendChild(li2);
      } else { flushList(); flushQuote(); para.push(ln); }
    });
    flushAll();
  }

  window.PT_RICH = { render: render };
})();
