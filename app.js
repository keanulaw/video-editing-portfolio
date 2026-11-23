(function () {
  const cats = window.CATEGORIES;
  const projects = window.PROJECTS;
  const $ = (id) => document.getElementById(id);
  const catLabel = Object.fromEntries(cats.map((c) => [c.id, c.label]));

  // Thumbnails live in /thumbs, named by video id (run thumbs.sh after adding a video).
  const thumb = (v) => `/thumbs/${v.id}.jpg`;
  const embed = (v) =>
    v.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&autoplay=1`
      : `https://drive.google.com/file/d/${v.id}/preview`;
  const openUrl = (v) =>
    v.type === "youtube" ? `https://www.youtube.com/watch?v=${v.id}` : `https://drive.google.com/file/d/${v.id}/view`;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // ---- Filters and jump links ----
  let active = "all";
  const counts = Object.fromEntries(cats.map((c) => [c.id, projects.filter((p) => p.tags.includes(c.id)).length]));
  const filterDefs = [{ id: "all", label: "All" }, ...cats];

  $("filters").innerHTML = filterDefs
    .map(
      (c) =>
        `<button role="tab" type="button" data-cat="${c.id}" aria-selected="${c.id === "all"}">${c.label}<span>${
          c.id === "all" ? projects.length : counts[c.id]
        }</span></button>`
    )
    .join("");
  $("jump").innerHTML = cats.map((c) => `<li><a href="#work" data-cat="${c.id}">${c.label}</a></li>`).join("");

  function setFilter(cat) {
    active = cat;
    document.querySelectorAll("#filters button").forEach((b) => b.setAttribute("aria-selected", b.dataset.cat === cat));
    render();
  }
  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) setFilter(b.dataset.cat);
  });
  $("jump").addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) setFilter(a.dataset.cat);
  });

  // ---- Grid ----
  const visible = () => (active === "all" ? projects : projects.filter((p) => p.tags.includes(active)));

  function render() {
    const list = visible();
    $("count").textContent = list.length;
    $("grid").innerHTML = list
      .map((p) => {
        const v = p.versions[0];
        const n = p.versions.length;
        return `<li class="card">
          <button class="card-thumb ${p.ratio}" type="button" data-slug="${p.slug}" aria-label="Play ${esc(p.title)}">
            <img src="${thumb(v)}" alt="" loading="lazy" />
            <span class="play" aria-hidden="true">▶</span>
            ${n > 1 ? `<span class="badge">${n} videos</span>` : ""}
          </button>
          <div class="card-text">
            <p class="tags">${catLabel[p.tags[0]]}</p>
            <h3><button type="button" data-slug="${p.slug}">${esc(p.title)}</button></h3>
            <p>${esc(p.desc)}</p>
          </div>
        </li>`;
      })
      .join("");
  }
  $("grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-slug]");
    if (b) open(b.dataset.slug, 0);
  });

  // ---- Player ----
  let current = null;
  let lastFocus = null;

  function show(p, vi) {
    current = { p, vi };
    const v = p.versions[vi];
    const list = visible();
    const idx = list.indexOf(p);
    $("p-frame").className = `frame-wrap ${p.ratio}`;
    $("p-frame").innerHTML = `<iframe src="${embed(v)}" title="${esc(p.title)}" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
    $("p-title").textContent = p.title;
    $("p-desc").textContent = p.desc;
    $("p-tags").textContent = p.tags.map((t) => catLabel[t]).join(" · ");
    $("p-count").textContent = idx >= 0 ? `Project ${idx + 1} of ${list.length}` : "";
    $("p-open").href = openUrl(v);
    $("p-versions").innerHTML =
      p.versions.length > 1
        ? `<p class="eyebrow">Videos in this project</p><div class="version-list">${p.versions
            .map(
              (x, i) =>
                `<button type="button" data-vi="${i}" aria-pressed="${i === vi}">${esc(x.label)}</button>`
            )
            .join("")}</div>`
        : "";
    $("p-prev").hidden = $("p-next").hidden = idx < 0;
    history.replaceState(null, "", `#watch/${p.slug}${vi ? "/" + (vi + 1) : ""}`);
  }

  function open(slug, vi) {
    const p = slug === "intro" ? window.INTRO : projects.find((x) => x.slug === slug);
    if (!p) return;
    lastFocus = document.activeElement;
    $("player").hidden = false;
    document.body.classList.add("locked");
    show(p, Math.min(vi || 0, p.versions.length - 1));
    $("p-close").focus();
  }

  function close() {
    $("player").hidden = true;
    $("p-frame").innerHTML = "";
    document.body.classList.remove("locked");
    history.replaceState(null, "", "#work");
    current = null;
    if (lastFocus) lastFocus.focus();
  }

  function step(d) {
    const list = visible();
    const i = list.indexOf(current.p);
    if (i < 0) return;
    show(list[(i + d + list.length) % list.length], 0);
  }

  $("p-close").addEventListener("click", close);
  $("p-prev").addEventListener("click", () => step(-1));
  $("p-next").addEventListener("click", () => step(1));
  $("p-versions").addEventListener("click", (e) => {
    const b = e.target.closest("[data-vi]");
    if (b) show(current.p, +b.dataset.vi);
  });
  $("player").addEventListener("click", (e) => {
    if (e.target.id === "player") close();
  });
  document.addEventListener("keydown", (e) => {
    if (!current) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Tab") {
      const f = [...$("player").querySelectorAll("button:not([hidden]), a[href], iframe")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });
  $("intro-btn").addEventListener("click", () => open("intro", 0));

  // ---- Copy email ----
  $("copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("shannonkeanu1@gmail.com");
      toast("Email copied");
    } catch {
      toast("shannonkeanu1@gmail.com");
    }
  });
  let tt;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("on"), 2000);
  }

  // ---- Start ----
  render();
  function fromHash() {
    const m = location.hash.match(/^#watch\/([\w-]+)(?:\/(\d+))?/);
    if (m && !current) open(m[1], m[2] ? +m[2] - 1 : 0);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
