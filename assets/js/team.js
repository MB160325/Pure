/* Pure Talent — renders the team grid from PT_TEAM (see data.js). */
(function () {
  "use strict";
  var PT = window.PT, h = PT.h;

  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    return (parts[0] ? Array.from(parts[0])[0] : "") + (parts[1] ? Array.from(parts[1])[0] : "");
  }

  function render() {
    var host = document.getElementById("teamList");
    if (!host || !window.PT_TEAM) return;
    host.textContent = "";
    window.PT_TEAM.forEach(function (m) {
      var name = PT.pick(m.name);
      var photo = h("div", { class: "team-photo" });
      var fallback = function () { photo.appendChild(h("div", { class: "team-initials", "aria-hidden": "true", text: initials(name) })); };
      if (m.image) {
        var img = h("img", { src: m.image, alt: name, loading: "lazy", decoding: "async" });
        img.addEventListener("error", function () { img.remove(); fallback(); });
        photo.appendChild(img);
      } else fallback();
      host.appendChild(h("article", { class: "team-card" }, [
        photo,
        h("div", { class: "team-info" }, [
          h("h2", { text: name }),
          h("div", { class: "team-role", text: PT.pick(m.title) }),
          h("p", { class: "team-bio", text: PT.pick(m.bio) })
        ])
      ]));
    });
  }

  function boot() { render(); PT.onLang(render); }
  if (PT.ready) boot(); else document.addEventListener("pt:ready", boot, { once: true });
})();
