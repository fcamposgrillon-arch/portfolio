export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-lg font-semibold tracking-tight hover:text-violet-400 transition-colors">
            FC
          </a>
          <div className="flex gap-6 text-sm text-neutral-400">
            <a href="#about" className="hover:text-neutral-100 transition-colors">Sobre mí</a>
            <a href="#projects" className="hover:text-neutral-100 transition-colors">Proyectos</a>
            <a href="#music" className="hover:text-neutral-100 transition-colors">Música</a>
            <a href="#contact" className="hover:text-neutral-100 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
            Asunción, Paraguay
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Francisco
            <br />
            <span className="text-neutral-500">Campos Grillon</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
            Abogado en formación · Administrador Agrario · Músico
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors"
            >
              Contactame
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-neutral-700 hover:border-neutral-500 rounded-lg text-sm font-medium transition-colors"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-medium tracking-widest uppercase text-violet-400 mb-8">
            Sobre mí
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Soy estudiante avanzado de Derecho en la Universidad Nacional de Asunción
                y comencé la carrera de Administración Agraria en la Facultad de Ciencias Agrarias.
              </p>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Me interesa la intersección entre el derecho, la tecnología y la agricultura.
                Creo en la innovación como motor de transformación social.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                Cuando no estoy estudiando, soy vocalista y guitarrista de{" "}
                <span className="text-violet-400 font-medium">FRXN</span>.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-3">Educación</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0"></span>
                    <div>
                      <p className="text-neutral-200 font-medium">Derecho</p>
                      <p className="text-sm text-neutral-500">Universidad Nacional de Asunción</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0"></span>
                    <div>
                      <p className="text-neutral-200 font-medium">Administración Agraria</p>
                      <p className="text-sm text-neutral-500">Facultad de Ciencias Agrarias</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-3">Intereses</h3>
                <div className="flex flex-wrap gap-2">
                  {["Derecho", "Agro", "Cripto", "Música", "Tecnología", "Web3"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full border border-neutral-700 text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-medium tracking-widest uppercase text-violet-400 mb-8">
            Proyectos
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "FRXN",
                description: "Banda de música. Vocalista y guitarrista. Rock alternativo con influencias post-punk.",
                tags: ["Música", "Producción"],
                link: "#",
              },
              {
                title: "Pieces of Me",
                description: "Proyecto de escritura creativa. Una exploración narrativa de identidad y memoria.",
                tags: ["Escritura", "Ficción"],
                link: "#",
              },
              {
                title: "BioTetris",
                description: "Sistema personal de seguimiento biométrico y gestión de bienestar.",
                tags: ["Salud", "Datos", "Automatización"],
                link: "#",
              },
              {
                title: "Hermes Agent",
                description: "Agente de IA personal para automatización, investigación y asistencia.",
                tags: ["IA", "Automatización"],
                link: "#",
              },
            ].map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group p-6 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-all hover:bg-neutral-900/50"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music" className="py-20 px-6 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-medium tracking-widest uppercase text-violet-400 mb-8">
            Música
          </h2>
          <div className="p-8 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-violet-600/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">FRXN</h3>
                <p className="text-neutral-500">Rock alternativo · Post-punk</p>
              </div>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Proyecto musical donde exploro sonidos entre el rock alternativo y el post-punk.
              Compongo, canto y toco guitarra.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="px-4 py-2 text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                Spotify
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-sm font-medium tracking-widest uppercase text-violet-400 mb-4">
            Contacto
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-4">
            ¿Tenés un proyecto en mente?
          </p>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            Estoy abierto a colaboraciones en derecho, agronomía, tecnología y música.
          </p>
          <a
            href="mailto:fcamposgrillon@gmail.com"
            className="inline-block px-8 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors"
          >
            fcamposgrillon@gmail.com
          </a>
          <div className="mt-8 flex justify-center gap-6">
            <a href="https://github.com/fcamposgrillon-arch" className="text-neutral-500 hover:text-neutral-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto text-center text-sm text-neutral-600">
          © 2026 Francisco Campos Grillon
        </div>
      </footer>
    </main>
  );
}
