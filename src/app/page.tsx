"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  Typewriter,
} from "@/components/Animations";

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "Sobre mí", href: "#about" },
  { label: "Trayectoria", href: "#journey" },
  { label: "Proyectos", href: "#projects" },
  { label: "Música", href: "#music" },
  { label: "Skills", href: "#skills" },
  { label: "Contacto", href: "#contact" },
];

const JOURNEY = [
  {
    year: "2024 — Actualidad",
    title: "Derecho (último año)",
    place: "Universidad Nacional de Asunción",
    desc: "Finalizando la carrera de Derecho con enfoque en derecho agrario y nuevas tecnologías.",
    icon: "⚖️",
  },
  {
    year: "2025 — Actualidad",
    title: "Administración Agraria",
    place: "Facultad de Ciencias Agrarias — UNA",
    desc: "Comenzando la carrera para combinar gestión agrícola con innovación tecnológica.",
    icon: "🌱",
  },
  {
    year: "Permanente",
    title: "FRXN — Banda",
    place: "Vocalista & Guitarrista",
    desc: "Proyecto musical de rock alternativo con influencias post-punk. Composición, grabación y producción.",
    icon: "🎸",
  },
  {
    year: "Permanente",
    title: "Escritura Creativa",
    place: "\"Pieces of Me\" & \"El Bosque\"",
    desc: "Proyecto literario con personajes como Lottie y Vera. Exploración narrativa de identidad y memoria.",
    icon: "✍️",
  },
];

const PROJECTS = [
  {
    title: "BioTetris",
    desc: "Sistema personal de seguimiento biométrico con variables como delta, intensidad, coherencia y observación. Herramienta de gestión de bienestar personal.",
    tags: ["Salud", "Datos", "Automatización", "Python"],
    color: "from-violet-600/20 to-purple-600/5",
  },
  {
    title: "Hermes Agent",
    desc: "Agente de IA personal multi-plataforma (Telegram, Discord). Investigación, automatización, recordatorios, análisis de tendencias y más.",
    tags: ["IA", "Automatización", "Python", "Telegram"],
    color: "from-blue-600/20 to-cyan-600/5",
  },
  {
    title: "Pieces of Me",
    desc: "Proyecto de escritura creativa. Novela explorando identidad, memoria y pertenencia. Con su precuela \"El Bosque\".",
    tags: ["Escritura", "Ficción", "Novela"],
    color: "from-amber-600/20 to-orange-600/5",
  },
  {
    title: "Crypto Trading",
    desc: "Trading activo en Binance con pares SOL/USDT, ETH/USDT, BTC/USDT. Análisis técnico y gestión de riesgo.",
    tags: ["Crypto", "Trading", "DeFi", "Web3"],
    color: "from-emerald-600/20 to-green-600/5",
  },
];

const SKILLS = [
  {
    category: "Legal",
    items: ["Derecho Civil", "Derecho Agrario", "Derecho Empresarial", "Contratos"],
  },
  {
    category: "Agronomía",
    items: ["Gestión Agrícola", "Administración Rural", "Cadena de Valor", "AgroTech"],
  },
  {
    category: "Tecnología",
    items: ["Python", "IA/ML", "Automatización", "Trading Algorítmico", "Web3"],
  },
  {
    category: "Creativo",
    items: ["Composición Musical", "Guitarra", "Voz", "Escritura Creativa", "Producción"],
  },
];

const MUSIC_LINKS = [
  { name: "Spotify", url: "#" },
  { name: "YouTube", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "SoundCloud", url: "#" },
];

/* ─── Components ─── */

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 dots-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/5 rounded-full blur-[120px]" />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl border-b border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-lg font-bold tracking-tighter hover:text-violet-400 transition-colors"
        >
          fc<span className="text-violet-400">.</span>
        </a>
        <div className="hidden md:flex gap-8 text-[13px] text-neutral-500 font-medium tracking-wide">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-neutral-200 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-violet-400 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <a
          href="https://github.com/fcamposgrillon-arch"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-neutral-200 transition-colors text-sm"
        >
          GitHub ↗
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center px-6">
      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Asunción, Paraguay
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="gradient-text">Francisco</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-neutral-600">Campos Grillon</span>
          </motion.div>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-lg"
        >
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-2 font-light">
            <Typewriter text="Abogado · Administrador Agrario · Músico" />
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-4">
            Explorando la intersección entre el derecho, la tecnología y la
            agricultura. Creando en la intersección de lo legal, lo rural y lo
            digital.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12 flex gap-4"
        >
          <a
            href="#projects"
            className="group px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-600/20"
          >
            Ver proyectos
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-neutral-700 hover:border-neutral-500 rounded-lg text-sm font-medium transition-colors text-neutral-300"
          >
            Contacto
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-neutral-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 block">
            Sobre mí
          </span>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-16">
          <FadeIn delay={0.1} className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Construyendo en la intersección
              <br />
              <span className="text-neutral-500">de lo legal, lo rural y lo digital</span>
            </h2>
            <div className="space-y-5 text-neutral-400 leading-relaxed">
              <p>
                Soy estudiante avanzado de <strong className="text-neutral-200">Derecho</strong> en
                la Universidad Nacional de Asunción y comencé{" "}
                <strong className="text-neutral-200">Administración Agraria</strong> en la Facultad
                de Ciencias Agrarias.
              </p>
              <p>
                Mi familia tiene raíces en el sector agrícola, lo que me llevó a buscar la
                combinación de formación jurídica y gestión del agro. Creo que la tecnología puede
                transformar la administración rural paraguaya.
              </p>
              <p>
                Fuera del ámbito académico, soy vocalista y guitarrista de{" "}
                <strong className="text-violet-400">FRXN</strong>, un proyecto de rock alternativo
                con influencias post-punk. También escribo ficción — actualmente trabajo en{" "}
                <strong className="text-neutral-200">"Pieces of Me"</strong> y su precuela{" "}
                <strong className="text-neutral-200">"El Bosque"</strong>.
              </p>
              <p>
                Me interesan las criptomonedas, la automatización con IA, y las herramientas que
                permiten hacer más con menos.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="md:col-span-2">
            <div className="space-y-6">
              {/* Quick facts */}
              <div className="p-5 rounded-xl border border-neutral-800/60 bg-neutral-900/30">
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral-500 mb-4">
                  Datos rápidos
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    ["📍", "Asunción, Barrio Mburucuyá"],
                    ["🎓", "Derecho (último año) — UNA"],
                    ["🌱", "Administración Agraria — FCA"],
                    ["🎸", "Vocalista & guitarrista — FRXN"],
                    ["✍️", "Escritor — Pieces of Me"],
                    ["₿", "Crypto trader — Binance"],
                  ].map(([icon, text]) => (
                    <li key={text} className="flex items-center gap-3 text-neutral-300">
                      <span className="text-base">{icon}</span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interests */}
              <div className="p-5 rounded-xl border border-neutral-800/60 bg-neutral-900/30">
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral-500 mb-4">
                  Intereses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Derecho Agrario",
                    "AgroTech",
                    "Cripto",
                    "Web3",
                    "IA",
                    "Automatización",
                    "Post-Punk",
                    "Rock Alt",
                    "Escritura",
                    "EMDR",
                    "Neurodivergencia",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-md border border-neutral-800 text-neutral-400 hover:border-violet-600/40 hover:text-violet-300 transition-colors cursor-default"
                    >
                      {tag}
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
    <section id="journey" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 block">
            Trayectoria
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
            Dónde estoy y hacia dónde voy
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />

          <StaggerContainer className="space-y-12">
            {JOURNEY.map((item, i) => (
              <StaggerItem key={i}>
                <div
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neutral-900 border-2 border-violet-400 z-10" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <HoverCard className="p-6 rounded-xl border border-neutral-800/60 bg-neutral-900/30 glow-card">
                      <span className="text-2xl mb-3 block">{item.icon}</span>
                      <span className="text-xs text-violet-400 font-medium">{item.year}</span>
                      <h3 className="text-lg font-semibold mt-1 mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-500 mb-3">{item.place}</p>
                      <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                    </HoverCard>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 block">
            Proyectos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Lo que construyo y creo
          </h2>
          <p className="text-neutral-500 max-w-lg mb-16">
            Proyectos que reflejan mis intereses en tecnología, salud, escritura y finanzas.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.title}>
              <HoverCard>
                <div className="group p-6 rounded-xl border border-neutral-800/60 bg-neutral-900/30 hover:bg-neutral-900/60 transition-all glow-card h-full">
                  <div
                    className={`w-full h-1 rounded-full bg-gradient-to-r ${project.color} mb-6`}
                  />
                  <h3 className="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] rounded bg-neutral-800/80 text-neutral-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Music() {
  return (
    <section id="music" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 block">
            Música
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="p-8 md:p-12 rounded-2xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900/80 to-neutral-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-600/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shrink-0 shadow-lg shadow-violet-600/20">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-black tracking-tight mb-2">FRXN</h3>
                <p className="text-neutral-500 font-medium mb-6">
                  Rock alternativo · Post-punk · Asunción
                </p>
                <p className="text-neutral-400 leading-relaxed max-w-xl mb-8">
                  Proyecto musical donde exploro la intersección entre la crudeza del post-punk y
                  la melancolía del rock alternativo. Compongo, canto y toco guitarra. Influencias
                  que van desde Joy Division hasta Radiohead, con letras en español e inglés.
                </p>

                <div className="flex flex-wrap gap-3">
                  {MUSIC_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="px-4 py-2 text-sm rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700/50 transition-all hover:border-violet-600/30 text-neutral-300"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 block">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
            Áreas de conocimiento
          </h2>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((group) => (
            <StaggerItem key={group.category}>
              <HoverCard className="p-6 rounded-xl border border-neutral-800/60 bg-neutral-900/30 h-full">
                <h3 className="text-sm font-bold text-violet-400 tracking-wide uppercase mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-neutral-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-600" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-violet-400 mb-4 block">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            ¿Trabajamos juntos?
          </h2>
          <p className="text-neutral-500 max-w-md mx-auto mb-10 leading-relaxed">
            Abierto a colaboraciones en derecho, agronomía, tecnología, música y escritura.
          </p>
          <a
            href="mailto:fcamposgrillon@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-violet-600/25 hover:-translate-y-0.5"
          >
            fcamposgrillon@gmail.com
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <div className="mt-12 flex justify-center gap-8">
            {[
              { label: "GitHub", url: "https://github.com/fcamposgrillon-arch" },
              { label: "Email", url: "mailto:fcamposgrillon@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 hover:text-violet-400 transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
        <span>© 2026 Francisco Campos Grillon</span>
        <span>
          Hecho con{" "}
          <span className="text-violet-400">♥</span> en Asunción
        </span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navbar />
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
