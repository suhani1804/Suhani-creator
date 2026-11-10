(function () {
  var S = window.SITE, $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + S.email; a.textContent = a.dataset.email === "text" ? S.email : a.textContent; });
  document.querySelectorAll("[data-ig]").forEach(function (a) { a.href = S.instagram; });

  var stats = $("#stats");
  if (stats) S.stats.forEach(function (s) { stats.appendChild(el("div", "stat", '<dd>' + esc(s.value) + '</dd><dt>' + esc(s.label) + '</dt>')); });

  var ins = $("#insights");
  if (ins) {
    var rows = S.insights.filter(function (i) { return i.value && i.value.trim(); });
    if (rows.length) { var dl = el("dl", "insights"); rows.forEach(function (r) { dl.appendChild(el("div", "", "<dt>" + esc(r.label) + "</dt><dd>" + esc(r.value) + "</dd>")); }); ins.before(dl); }
  }

  var grid = $("#portfolio-grid"), filters = $("#filters");
  if (grid) {
    var cats = ["All"]; S.portfolio.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    cats.forEach(function (c, i) { var b = el("button", "chip", esc(c)); b.type = "button"; b.setAttribute("aria-pressed", i === 0); b.onclick = function () {
      filters.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      grid.querySelectorAll("figure").forEach(function (f) { f.hidden = !(c === "All" || f.dataset.cat === c); }); }; filters.appendChild(b); });
    var dlg = $("#lightbox");
    S.portfolio.forEach(function (p) {
      var f = el("figure", "work"); f.dataset.cat = p.cat;
      var link = p.reel ? '<a href="' + esc(p.reel) + '" target="_blank" rel="noopener">Watch the Reel on Instagram</a>' : (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">View on Instagram</a>' : "");
      f.innerHTML = '<button type="button" aria-label="Open ' + esc(p.title) + '"><img src="images/' + p.img + '-sm.jpg" srcset="images/' + p.img + '-sm.jpg 800w, images/' + p.img + '-lg.jpg 1800w" sizes="(min-width:900px) 30vw, 50vw" alt="' + esc(p.alt) + '" loading="lazy"></button><figcaption><b>' + esc(p.title) + '</b><span>' + esc(p.cat) + (p.brand ? " · Brand: " + esc(p.brand) : " · Personal work") + '</span><p>' + esc(p.desc) + '</p>' + link + '</figcaption>';
      f.querySelector("button").onclick = function () {
        $("#lb-img").src = "images/" + p.img + "-lg.jpg"; $("#lb-img").alt = p.alt;
        $("#lb-cap").innerHTML = "<b>" + esc(p.title) + "</b> " + esc(p.cat) + "<br>" + esc(p.desc) + (link ? "<br>" + link : ""); dlg.showModal(); };
      grid.appendChild(f);
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.id === "lb-close") dlg.close(); });
  }

  var rs = $("#reels");
  if (rs && S.reels && S.reels.length) {
    rs.hidden = false;
    S.reels.forEach(function (u) { var q = el("blockquote", "instagram-media"); q.setAttribute("data-instgrm-permalink", u); q.setAttribute("data-instgrm-version", "14"); q.innerHTML = '<a href="' + esc(u) + '" target="_blank" rel="noopener">Watch this Reel on Instagram</a>'; $("#reel-grid").appendChild(q); });
    var sc = document.createElement("script"); sc.async = true; sc.src = "https://www.instagram.com/embed.js"; document.body.appendChild(sc);
  }

  var nav = $("#nav"), tg = $("#nav-toggle");
  if (tg) { tg.onclick = function () { var o = nav.classList.toggle("open"); tg.setAttribute("aria-expanded", o); };
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); tg.setAttribute("aria-expanded", false); } }); }
  var hd = $(".site-header"); if (hd) addEventListener("scroll", function () { hd.classList.toggle("solid", scrollY > 40); }, { passive: true });

  document.querySelectorAll("[data-enquiry]").forEach(function (a) { a.addEventListener("click", function () { var s = $("#type"); if (s) s.value = a.dataset.enquiry; }); });

  var form = $("#enquiry"), status = $("#form-status");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault(); if (form.elements.website.value) return;
    var d = {}; new FormData(form).forEach(function (v, k) { d[k] = v; }); delete d.website;
    if (S.formEndpoint) {
      status.textContent = "Sending…";
      fetch(S.formEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw 0; status.textContent = "Thank you. Your enquiry is in, and I'll reply by email."; form.reset(); })
        .catch(function () { status.innerHTML = 'That did not send. Please email <a href="mailto:' + S.email + '">' + S.email + "</a> directly."; });
    } else {
      var body = "Name: " + d.name + "\nBrand / company: " + d.brand + "\nEmail: " + d.email + "\nEnquiry: " + d.type + "\n\n" + d.message;
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(d.type + " | " + d.brand) + "&body=" + encodeURIComponent(body);
      status.textContent = "Your email app should open with the enquiry ready to send. If it doesn't, write to " + S.email + ".";
    }
  });
})();
