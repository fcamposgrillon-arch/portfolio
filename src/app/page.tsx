"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, HoverCard } from "@/components/Animations";

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "Sobre mi", href: "#about", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
  { label: "Trayectoria", href: "#journey", icon: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" },
  { label: "Proyectos", href: "#projects", icon: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" },
  { label: "Musica", href: "#music", icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" },
  { label: "Skills", href: "#skills", icon: "M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" },
  { label: "Contacto", href: "#contact", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
];

const JOURNEY = [
  {
    year: "2024 -- Actualidad",
    title: "Derecho (ultimo ano)",
    place: "Universidad Nacional de Asuncion",
    desc: "Finalizando la carrera de Derecho con enfoque en derecho agrario y nuevas tecnologias.",
    color: "#8fa89e",
  },
  {
    year: "2025 -- Actualidad",
    title: "Administracion Agraria",
    place: "Facultad de Ciencias Agrarias -- UNA",
    desc: "Comenzando la carrera para combinar gestion agricola con innovacion tecnologica.",
    color: "#9db5a8",
  },
  {
    year: "Permanente",
    title: "FRXN -- Banda",
    place: "Vocalista y Guitarrista",
    desc: "Proyecto musical de rock alternativo con influencias post-punk. Composicion, grabacion y produccion.",
    color: "#b87b6c",
  },
  {
    year: "Permanente",
    title: "Escritura Creativa",
    place: "Pieces of Me y El Bosque",
    desc: "Proyecto literario con personajes como Lottie y Vera. Exploracion narrativa de identidad y memoria.",
    color: "#c9a8c4",
  },
];

const PROJECTS = [
  {
    title: "BioTetris",
    desc: "Sistema personal de seguimiento biometrico con variables como delta, intensidad, coherencia y observacion. Herramienta de gestion de bienestar personal.",
    tags: ["Salud", "Datos", "Automatizacion", "Python"],
    accent: "#8fa89e",
  },
  {
    title: "Hermes Agent",
    desc: "Agente de IA personal multi-plataforma (Telegram, Discord). Investigacion, automatizacion, recordatorios, analisis de tendencias y mas.",
    tags: ["IA", "Automatizacion", "Python", "Telegram"],
    accent: "#b87b6c",
  },
  {
    title: "Pieces of Me",
    desc: "Proyecto de escritura creativa. Novela explorando identidad, memoria y pertenencia. Con su precuela El Bosque.",
    tags: ["Escritura", "Ficcion", "Novela"],
    accent: "#c9a8c4",
  },
  {
    title: "Crypto Trading",
    desc: "Trading activo en Binance con pares SOL/USDT, ETH/USDT, BTC/USDT. Analisis tecnico y gestion de riesgo.",
    tags: ["Crypto", "Trading", "DeFi", "Web3"],
    accent: "#c9a87b",
  },
];

const SKILLS = [
  {
    category: "Legal",
    color: "#8fa89e",
    items: [
      { name: "Derecho Civil", level: 85 },
      { name: "Derecho Agrario", level: 90 },
      { name: "Derecho Empresarial", level: 75 },
      { name: "Contratos", level: 80 },
    ],
  },
  {
    category: "Agronomia",
    color: "#9db5a8",
    items: [
      { name: "Gestion Agricola", level: 80 },
      { name: "Administracion Rural", level: 85 },
      { name: "Cadena de Valor", level: 70 },
      { name: "AgroTech", level: 75 },
    ],
  },
  {
    category: "Tecnologia",
    color: "#c9a87b",
    items: [
      { name: "Python", level: 85 },
      { name: "IA/ML", level: 75 },
      { name: "Automatizacion", level: 80 },
      { name: "Trading Algoritmico", level: 70 },
      { name: "Web3", level: 65 },
    ],
  },
  {
    category: "Creativo",
    color: "#c9a8c4",
    items: [
      { name: "Composicion Musical", level: 90 },
      { name: "Guitarra", level: 85 },
      { name: "Voz", level: 80 },
      { name: "Escritura Creativa", level: 85 },
      { name: "Produccion", level: 70 },
    ],
  },
];

const MUSIC_LINKS = [
  { name: "Spotify", url: "#" },
  { name: "YouTube", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "SoundCloud", url: "#" },
];

/* ─── Dropdown Menu ─── */

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleNav(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-lg font-light tracking-tight text-ink hover:text-candle transition-colors cursor-pointer"
      >
        fc.
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-full left-0 mt-3 w-56 rounded-lg border border-[--border-subtle] overflow-hidden z-50"
            style={{ background: "var(--panel-bg)" }}
          >
            <div className="p-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-ink-dim hover:text-ink hover:bg-white/[0.03] transition-colors text-sm cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 shrink-0 opacity-50"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={link.icon} />
                  </svg>
                  {link.label}
                </button>
              ))}
            </div>
            <div className="border-t border-[--border-subtle] px-4 py-2.5">
              <a
                href="https://github.com/fcamposgrillon-arch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-ink-ghost hover:text-ink-dim transition-colors"
              >
                GitHub
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Layout ─── */

function TopBar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ background: "rgba(26,23,20,0.85)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <DropdownMenu />
        <span className="text-xs text-ink-ghost">Asuncion, Paraguay</span>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-20">
      <div className="max-w-5xl mx-auto w-full">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-ink leading-tight mb-6">
            Francisco<br />Campos Grillon
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-ink-dim text-base md:text-lg font-light max-w-lg mb-8">
            Abogado -- Administrador Agrario -- Musico -- Escritor
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="w-16 h-px bg-[--border-warm] mb-8" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex gap-6">
            <a href="#projects" className="text-sm text-ink-dim hover:text-candle transition-colors">
              Ver proyectos
            </a>
            <a href="#contact" className="text-sm text-ink-dim hover:text-candle transition-colors">
              Contacto
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-12">
            Sobre mi
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-16">
          <FadeIn delay={0.05} className="md:col-span-3">
            <div className="space-y-5 text-ink-dim font-light leading-relaxed text-sm">
              <p>
                Estudiante avanzado de Derecho en la Universidad Nacional de Asuncion
                y comence Administracion Agraria en la Facultad de Ciencias Agrarias.
              </p>
              <p>
                Mi familia tiene raices en el sector agricola, lo que me llevo a buscar
                la combinacion de formacion juridica y gestion del agro. Creo que la
                tecnologia puede transformar la administracion rural paraguaya.
              </p>
              <p>
                Fuera del ambito academico, soy vocalista y guitarrista de FRXN,
                un proyecto de rock alternativo con influencias post-punk. Tambien
                escribo ficcion -- actualmente trabajo en Pieces of Me y su precuela
                El Bosque.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-2">
            <div className="space-y-6">
              <div className="p-5 rounded-lg" style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-ink-ghost mb-4">
                  Datos rapidos
                </h3>
                <ul className="space-y-2.5 text-sm text-ink-dim">
                  <li>Asuncion, Barrio Mburucuya</li>
                  <li>Derecho (ultimo ano) -- UNA</li>
                  <li>Administracion Agraria -- FCA</li>
                  <li>Vocalista y guitarrista -- FRXN</li>
                  <li>Escritor -- Pieces of Me</li>
                  <li>Crypto trader -- Binance</li>
                </ul>
              </div>

              <div className="p-5 rounded-lg" style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-ink-ghost mb-4">
                  Intereses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Derecho Agrario", color: "#8fa89e" },
                    { label: "AgroTech", color: "#9db5a8" },
                    { label: "Cripto", color: "#c9a87b" },
                    { label: "Web3", color: "#c9a87b" },
                    { label: "IA", color: "#b87b6c" },
                    { label: "Automatizacion", color: "#b87b6c" },
                    { label: "Post-Punk", color: "#c9a8c4" },
                    { label: "Rock Alt", color: "#c9a8c4" },
                    { label: "Escritura", color: "#a89d94" },
                  ].map((tag) => (
                    <span
                      key={tag.label}
                      className="px-2 py-0.5 text-xs rounded"
                      style={{
                        color: tag.color,
                        border: `1px solid ${tag.color}22`,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-16">
            Trayectoria
          </h2>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "var(--border-subtle)" }} />

          <div className="space-y-12">
            {JOURNEY.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full mt-2 z-10"
                    style={{ background: item.color, border: `1px solid ${item.color}44` }}
                  />

                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="p-5 rounded-lg" style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}>
                      <span className="text-xs text-ink-ghost">{item.year}</span>
                      <h3 className="text-sm font-medium text-ink mt-1 mb-1">{item.title}</h3>
                      <p className="text-xs text-ink-ghost mb-3">{item.place}</p>
                      <p className="text-xs text-ink-dim leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-4">
            Proyectos
          </h2>
          <p className="text-ink-dim font-light text-sm max-w-lg mb-16">
            Lo que construyo y creo.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.05}>
              <HoverCard>
                <div
                  className="p-6 rounded-lg h-full"
                  style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="w-full h-px mb-5" style={{ background: project.accent }} />
                  <h3 className="text-sm font-medium text-ink mb-3">{project.title}</h3>
                  <p className="text-xs text-ink-dim leading-relaxed mb-5">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] rounded text-ink-ghost"
                        style={{ background: "var(--color-bg)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Music() {
  return (
    <section id="music" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-12">
            Musica
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="p-8 rounded-lg" style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}>
            <h3 className="text-xl font-medium text-ink mb-1">FRXN</h3>
            <p className="text-xs text-ink-ghost mb-6">Rock alternativo -- Post-punk -- Asuncion</p>
            <p className="text-sm text-ink-dim font-light leading-relaxed max-w-xl mb-8">
              Proyecto musical donde exploro la interseccion entre la crudeza del post-punk
              y la melancolia del rock alternativo. Compongo, canto y toco guitarra.
            </p>
            <div className="flex gap-4">
              {MUSIC_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-xs text-ink-ghost hover:text-candle transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-16">
            Skills
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.05}>
              <div className="p-5 rounded-lg" style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-xs font-medium tracking-widest uppercase mb-5" style={{ color: group.color }}>
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex justify-between text-xs text-ink-dim mb-1">
                        <span>{skill.name}</span>
                        <span className="text-ink-ghost">{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: "var(--color-bg)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${skill.level}%`, background: group.color, opacity: 0.6 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-6">
            Contacto
          </h2>
          <p className="text-2xl font-light text-ink mb-4">
            Trabajamos juntos
          </p>
          <p className="text-sm text-ink-dim font-light mb-8 max-w-md mx-auto">
            Abierto a colaboraciones en derecho, agronomia, tecnologia y musica.
          </p>
          <a
            href="mailto:fcamposgrillon@gmail.com"
            className="text-sm text-candle hover:text-ink transition-colors"
          >
            fcamposgrillon@gmail.com
          </a>
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="https://github.com/fcamposgrillon-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-ghost hover:text-ink-dim transition-colors"
            >
              GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-ghost">
        <span>2026 Francisco Campos Grillon</span>
        <span>Hecho en Asuncion</span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <TopBar />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Music />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
