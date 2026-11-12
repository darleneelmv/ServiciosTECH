/* =====================================================================
   Darlene López · Servicios de tecnología
   El contenido vive en /contenido/*.json y se edita desde /entrar.
   ===================================================================== */
(() => {
"use strict";

const ARCHIVOS = ["general", "perfil", "servicios", "planes", "proyectos", "sobre", "video", "proceso", "porque", "faq", "contacto"];
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const em = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
const txt = (sel, v) => { const el = $(sel); if (el) el.textContent = v ?? ""; };
const htm = (sel, v) => { const el = $(sel); if (el) el.innerHTML = v ?? ""; };
const lista = v => Array.isArray(v) ? v.filter(x => x !== null && x !== undefined && x !== "") : [];
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Invitaciones / recuperación de contraseña del panel: llegan a la portada */
if (/(invite|recovery|confirmation|email_change)_token/.test(location.hash)) {
  const s = document.createElement("script");
  s.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  s.onload = () => {
    window.netlifyIdentity.on("init", u => { if (!u) window.netlifyIdentity.on("login", () => { location.href = "/entrar/"; }); });
    window.netlifyIdentity.init();
  };
  document.head.appendChild(s);
}

const ICONOS = {
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
  sistema: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  portafolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  codigo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
  control: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  cohete: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 4.5-8 12-9-1 7.5-5 11-9 12z"/><circle cx="14.5" cy="9.5" r="1.5"/></svg>',
  correo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
  ubicacion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>'
};
const ESTADOS = { "En línea": "#22c55e", "Terminado": "#4f7cff", "En desarrollo": "#f59e0b", "Próximamente": "#a78bfa" };
const flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>';

async function cargar() {
  const r = await Promise.all(ARCHIVOS.map(n =>
    fetch(`/contenido/${n}.json`, { cache: "no-cache" }).then(x => { if (!x.ok) throw new Error(n); return x.json(); })));
  return Object.fromEntries(ARCHIVOS.map((n, i) => [n, r[i]]));
}

function pintar(D) {
  const G = D.general || {}, P = D.perfil || {}, SV = D.servicios || {}, PL = D.planes || {}, SO = D.sobre || {}, PY = D.proyectos || {}, V = D.video || {},
        PR = D.proceso || {}, PQ = D.porque || {}, F = D.faq || {}, C = D.contacto || {};

  if (G.seo?.titulo) document.title = G.seo.titulo;
  if (G.seo?.descripcion) $('meta[name="description"]').setAttribute("content", G.seo.descripcion);
  const raiz = document.documentElement.style, col = G.colores || {};
  if (col.acento) raiz.setProperty("--acento", col.acento);
  if (col.acento2) raiz.setProperty("--acento2", col.acento2);
  if (col.fondo) { raiz.setProperty("--fondo", col.fondo); raiz.setProperty("--fondo-2", `color-mix(in srgb, ${col.fondo} 88%, #1e293b)`); }

  /* Secciones y menú */
  const vis = Object.assign({ servicios: true, planes: true, proyectos: true, sobre: true, video: true, proceso: true, porque: true, faq: true, contacto: true }, G.secciones || {});
  if (!P.video) vis.video = false;
  Object.entries(vis).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.hidden = !v; });
  const MENU = [["servicios", "Servicios"], ["planes", "Planes"], ["proyectos", "Proyectos"], ["sobre", "Sobre mí"], ["proceso", "Cómo trabajo"], ["faq", "Preguntas"], ["contacto", "Contacto"]];
  htm("#menu", MENU.filter(([id]) => vis[id]).map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join(""));
  txt("#btn-barra", G.boton_barra); $("#btn-barra").hidden = !vis.contacto;

  const iniciales = String(P.nombre || "").split(/\s+/).map(p => p[0]).join("").slice(0, 2).toUpperCase();
  const logo = `<span class="marca">${esc(iniciales)}</span><span>${esc(P.nombre)}<b>.</b></span>`;
  htm("#logo", logo); htm("#logo-pie", logo); txt("#pie", G.pie); txt("#anio", new Date().getFullYear());

  /* Portada */
  txt("#h-etiqueta", P.etiqueta); htm("#h-titular", em(P.titular)); txt("#h-desc", P.descripcion);
  txt("#h-btn1", P.boton_principal); txt("#h-btn2", P.boton_secundario);
  txt("#h-nombre", P.nombre); txt("#h-titulo", P.titulo_profesional);
  if (P.avatar || P.foto) { const a = $("#h-avatar"); a.src = P.avatar || P.foto; a.alt = P.nombre || ""; a.hidden = false; }

  /* WhatsApp con mensaje listo */
  const waNum = String(P.whatsapp || "").replace(/\D/g, "");
  const waLink = waNum ? `https://wa.me/${waNum.length === 10 ? "52" + waNum : waNum}?text=${encodeURIComponent(P.whatsapp_mensaje || "Hola, me gustaría información.")}` : "";
  const waFlot = $("#wa-flotante");
  if (waLink) { waFlot.href = waLink; waFlot.hidden = false; setTimeout(() => waFlot.classList.add("ver"), 1200); }

  /* Sobre mí */
  txt("#so-etiqueta", SO.etiqueta); htm("#so-titulo", em(SO.titulo));
  if (P.foto) { $("#so-foto").src = P.foto; $("#so-foto").alt = P.nombre || ""; } else $(".sobre-foto").hidden = true;
  txt("#so-chip", P.chip_foto || ""); $("#so-chip").hidden = !P.chip_foto;
  htm("#so-parrafos", lista(SO.parrafos).map((p, i) => `<p class="rev d${Math.min(i + 1, 3)}">${em(p)}</p>`).join(""));
  htm("#so-datos", lista(SO.datos).map(d => `<li>${esc(d)}</li>`).join(""));
  const soWa = $("#so-wa");
  if (waLink) { soWa.href = waLink; soWa.innerHTML = `${ICONOS.whatsapp}${esc(SO.boton || "Escríbeme por WhatsApp")}`; } else soWa.hidden = true;
  for (const id of ["#h-video", "#v-video"]) {
    const v = $(id); if (!P.video) continue;
    if (P.poster) v.poster = P.poster;
    v.src = P.video;
  }
  const tec = lista(P.tecnologias).map(t => `<span>${esc(t)}</span>`).join("");
  htm("#cinta", tec + tec + tec);
  escribir(lista(P.palabras));

  /* Servicios */
  txt("#sv-etiqueta", SV.etiqueta); htm("#sv-titulo", em(SV.titulo)); txt("#sv-sub", SV.subtitulo);
  const servicios = lista(SV.servicios);
  htm("#tabs", servicios.map((s, i) => `<button class="tab" role="tab" type="button" data-i="${i}" aria-selected="${i === 0}">${ICONOS[s.icono] || ICONOS.codigo}${esc(s.nombre)}</button>`).join(""));
  const mostrar = i => {
    const s = servicios[i]; if (!s) return;
    $$(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.i == i));
    const p = $("#panel-servicio");
    p.innerHTML = `<div class="anim-panel"><h3>${esc(s.nombre)}</h3><p>${esc(s.resumen)}</p>
      <ul class="incluye">${lista(s.incluye).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <a class="btn btn-primario" href="#contacto" data-servicio="${esc(s.nombre)}">Cotizar ${esc(s.nombre.toLowerCase())}</a></div>
      ${s.imagen ? `<div class="captura anim-panel"><img src="${esc(s.imagen)}" alt="Ejemplo de ${esc(s.nombre)}" loading="lazy"></div>` : ""}`;
  };
  $("#tabs").addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) { mostrar(+b.dataset.i); auto.parar(); } });
  mostrar(0);
  /* Las pestañas avanzan solas hasta que la persona toca una */
  const auto = { t: null, i: 0, parar() { clearInterval(this.t); this.t = null; } };
  if (!reducido && servicios.length > 1) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && auto.t === null && !auto.listo) {
        auto.t = setInterval(() => { auto.i = (auto.i + 1) % servicios.length; mostrar(auto.i); }, 5000);
      } else if (!e.isIntersecting && auto.t) { auto.parar(); }
    }, { threshold: .4 });
    io.observe($("#panel-servicio"));
    $("#tabs").addEventListener("click", () => { auto.listo = true; }, { once: true });
  }

  /* Planes */
  txt("#pl-etiqueta", PL.etiqueta); htm("#pl-titulo", em(PL.titulo)); txt("#pl-sub", PL.subtitulo);
  htm("#lista-planes", lista(PL.planes).map((p, i) => `<article class="plan rev d${i + 1}${p.destacado ? " destacado" : ""}">
    ${p.destacado && p.etiqueta_destacado ? `<span class="plan-badge">${esc(p.etiqueta_destacado)}</span>` : ""}
    <h3>${esc(p.nombre)}</h3><p class="para">${esc(p.para)}</p>
    <div class="precio${p.precio ? "" : " cotiza"}">${p.precio ? esc(p.precio) : "Cotización a tu medida"}</div><div class="precio-nota">${esc(p.nota)}</div>
    <ul class="incluye">${lista(p.incluye).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <a class="btn ${p.destacado ? "btn-primario" : "btn-borde"} btn-bloque" href="#contacto" data-plan="${esc(p.nombre)}">${esc(p.boton || "Cotizar")}</a>
  </article>`).join(""));
  txt("#todos-tit", PL.todos_titulo);
  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5 9-10"/></svg>';
  htm("#todos", lista(PL.todos).map(t => `<li>${check}${esc(t)}</li>`).join(""));
  $(".todos").hidden = !lista(PL.todos).length;

  /* Clientes (proyectos en línea o terminados) */
  const clientes = lista(PY.proyectos).filter(p => p.en_clientes !== false && (p.estado === "En línea" || p.estado === "Terminado"));
  txt("#clientes-tit", PY.clientes_titulo);
  htm("#clientes-lista", clientes.map(p => `<li>${esc(p.nombre)}</li>`).join(""));
  $("#clientes").hidden = !clientes.length || !vis.proyectos;

  /* Proyectos */
  txt("#py-etiqueta", PY.etiqueta); htm("#py-titulo", em(PY.titulo));
  htm("#lista-proyectos", lista(PY.proyectos).map((p, i) => {
    const img = p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" data-visor="${esc(p.nombre)} · ${esc(p.tipo)}"><span class="p-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg></span>`
      : `<div class="p-pronto"><div><b>${esc(p.nombre)}</b><span>${esc(p.estado || "Próximamente")}</span></div></div>`;
    return `<article class="proyecto rev d${(i % 2) + 1}">
      <div class="p-imagen">${img}${p.estado ? `<span class="estado" style="--c:${ESTADOS[p.estado] || "#22c55e"}">${esc(p.estado)}</span>` : ""}</div>
      <div class="p-cuerpo"><span class="p-tipo">${esc(p.tipo)}</span><h3>${esc(p.nombre)}</h3><p>${esc(p.descripcion)}</p>
        <div class="p-pie"><ul class="chips">${lista(p.etiquetas).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        ${p.link ? `<a class="p-link" href="${esc(p.link)}" target="_blank" rel="noopener">Ver sitio ${flecha}</a>` : ""}</div></div>
    </article>`;
  }).join(""));

  /* Video */
  txt("#v-etiqueta", V.etiqueta); htm("#v-titulo", em(V.titulo)); txt("#v-sub", V.subtitulo);

  /* Proceso, razones, FAQ */
  txt("#pr-etiqueta", PR.etiqueta); htm("#pr-titulo", em(PR.titulo));
  htm("#pasos", lista(PR.pasos).map((p, i) => `<li class="rev d${(i % 4) + 1}"><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></li>`).join(""));
  txt("#pq-etiqueta", PQ.etiqueta); htm("#pq-titulo", em(PQ.titulo));
  const ic = ["codigo", "chat", "control", "cohete"];
  htm("#razones", lista(PQ.razones).map((r, i) => `<div class="razon rev d${(i % 4) + 1}"><div class="icono">${ICONOS[ic[i % 4]]}</div><h3>${esc(r.titulo)}</h3><p>${esc(r.texto)}</p></div>`).join(""));
  txt("#f-etiqueta", F.etiqueta); htm("#f-titulo", em(F.titulo));
  htm("#preguntas", lista(F.preguntas).map((q, i) => `<details class="pregunta rev d${(i % 4) + 1}"${i === 0 ? " open" : ""}><summary>${esc(q.pregunta)}</summary><div class="resp">${esc(q.respuesta)}</div></details>`).join(""));

  /* Contacto */
  txt("#c-etiqueta", C.etiqueta); htm("#c-titulo", em(C.titulo)); txt("#c-sub", C.subtitulo);
  txt("#f-boton", C.boton || "Enviar");
  const sel = $("#f-servicio");
  servicios.forEach(s => sel.insertAdjacentHTML("beforeend", `<option>${esc(s.nombre)}</option>`));
  sel.insertAdjacentHTML("beforeend", `<option>Otro</option>`);
  const medios = [
    P.correo && [`mailto:${P.correo}`, "correo", "Correo", P.correo],
    waLink && [waLink, "whatsapp", "WhatsApp · respuesta rápida", P.whatsapp],
    P.github && [P.github, "github", "GitHub", P.github.replace(/^https?:\/\//, "")],
    P.linkedin && [P.linkedin, "linkedin", "LinkedIn", P.linkedin.replace(/^https?:\/\/(www\.)?/, "")],
    P.instagram && [P.instagram, "instagram", "Instagram", P.instagram.replace(/^https?:\/\/(www\.)?/, "")]
  ].filter(Boolean);
  htm("#medios", medios.map(([h, i, t, v]) => `<li><a href="${esc(h)}" ${h.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><i>${ICONOS[i]}</i><span class="m-txt"><small>${t}</small>${esc(v)}</span></a></li>`).join("")
    + (P.ubicacion ? `<li><div class="m-item"><i>${ICONOS.ubicacion}</i><span class="m-txt"><small>Ubicación</small>${esc(P.ubicacion)}</span></div></li>` : ""));

  /* Botón "Cotizar X" → preselecciona el servicio o el plan */
  lista(PL.planes).forEach(p => sel.insertAdjacentHTML("beforeend", `<option>Plan ${esc(p.nombre)}</option>`));
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-servicio]"); if (a) sel.value = a.dataset.servicio;
    const b = e.target.closest("[data-plan]"); if (b) sel.value = `Plan ${b.dataset.plan}`;
  });

  /* Visor de capturas */
  const visor = $("#visor"), vImg = $("#visor-img"), vTxt = $("#visor-txt");
  const cerrar = () => { visor.hidden = true; document.body.style.overflow = ""; };
  document.addEventListener("click", e => {
    const im = e.target.closest("[data-visor]");
    if (im) { vImg.src = im.src; vImg.alt = im.alt; vTxt.textContent = im.dataset.visor; visor.hidden = false; document.body.style.overflow = "hidden"; return; }
    if (!visor.hidden && (e.target === visor || e.target.closest("#visor-cerrar"))) cerrar();
  });
  addEventListener("keydown", e => { if (e.key === "Escape" && !visor.hidden) cerrar(); });

  /* Envío del formulario (Netlify Forms) */
  const form = $("#formulario"), estado = $("#f-estado");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const b = $("#f-boton"); b.disabled = true; estado.className = "f-estado"; estado.textContent = "Enviando…";
    try {
      const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
      if (!r.ok) throw new Error(r.status);
      form.reset(); estado.textContent = C.exito || "¡Gracias! Te contesto pronto.";
    } catch {
      estado.className = "f-estado error";
      estado.textContent = `No se pudo enviar. Escríbeme a ${P.correo || "mi correo"}.`;
    } finally { b.disabled = false; }
  });
}

/* Texto que se escribe solo */
function escribir(palabras) {
  const el = $("#escribe"); if (!palabras.length) { el.closest(".hero-escribe").hidden = true; return; }
  if (reducido) { el.textContent = palabras[0]; return; }
  let i = 0, j = 0, borrando = false;
  (function paso() {
    const p = palabras[i];
    el.textContent = p.slice(0, j);
    if (!borrando && j < p.length) { j++; setTimeout(paso, 70); }
    else if (!borrando) { borrando = true; setTimeout(paso, 1600); }
    else if (j > 0) { j--; setTimeout(paso, 35); }
    else { borrando = false; i = (i + 1) % palabras.length; setTimeout(paso, 250); }
  })();
}

function mover() {
  const barra = $("#barra"), prog = $("#progreso");
  const alScroll = () => {
    barra.classList.toggle("solida", scrollY > 30);
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", alScroll, { passive: true }); alScroll();

  /* Menú móvil */
  const ham = $("#hamburguesa"), nav = $(".barra nav");
  ham.addEventListener("click", () => { const a = nav.classList.toggle("abierto"); ham.setAttribute("aria-expanded", a); });
  nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("abierto"); ham.setAttribute("aria-expanded", false); } });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("ver"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  $$(".rev").forEach(el => io.observe(el));

  /* Videos: reproducir solo cuando se ven */
  const ioV = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause(); }), { threshold: .35 });
  $$("video").forEach(v => ioV.observe(v));
  const vb = $("#v-sonido"), vv = $("#v-video");
  vb.addEventListener("click", () => {
    vv.currentTime = 0; vv.play().catch(() => {});
    vb.hidden = true;
  });

  if (!reducido && matchMedia("(hover:hover)").matches) {
    const foco = $(".foco"); let fx = innerWidth / 2, fy = innerHeight / 2, cx = fx, cy = fy;
    addEventListener("pointermove", e => { fx = e.clientX; fy = e.clientY; });
    (function sigue() { cx += (fx - cx) * .1; cy += (fy - cy) * .1; foco.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(sigue); })();

    $$(".proyecto, .razon").forEach(el => el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect(); el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));
    $$("[data-tilt]").forEach(el => {
      el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    $$(".magnetico").forEach(b => {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  if (window.gsap && !reducido) {
    gsap.from(".hero .intro", { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: .08, delay: .1 });
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".hero-visual", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-fondo", { yPercent: 20, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(".video-grande", { scale: .9 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "#video", start: "top bottom", end: "center center", scrub: true } });
    }
  }
}

cargar()
  .then(D => { pintar(D); document.body.classList.remove("cargando"); mover(); })
  .catch(err => {
    console.error("No se pudo cargar el contenido:", err);
    document.body.classList.remove("cargando");
    document.body.insertAdjacentHTML("beforeend", `<p style="position:fixed;inset:auto 0 20px;text-align:center">No se pudo cargar el contenido. Recarga la página.</p>`);
  });
})();
