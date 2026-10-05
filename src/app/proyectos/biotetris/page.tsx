import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/Animations";

export const metadata: Metadata = {
  title: "BioTetris -- Francisco Campos Grillon",
  description:
    "Case study de diseno: sistema personal de seguimiento biometrico basado en delta, intensidad, coherencia y observacion.",
};

const VARIABLES = [
  {
    name: "Delta",
    color: "var(--color-aly)",
    desc: "La fuga de energia. Estres, dispersion. Un gasto que hay que cuantificar, no evitar.",
  },
  {
    name: "Intensidad",
    color: "var(--color-candle)",
    desc: "El nivel de actitud o activacion. En exceso, genera delta.",
  },
  {
    name: "Coherencia",
    color: "var(--color-vera)",
    desc: "Si lo que hago tiene sentido y esta alineado con quien soy en este momento.",
  },
  {
    name: "Observacion",
    color: "var(--color-misty)",
    desc: "El registro en si. El acto de observar ya cambia lo observado -- el efecto del observador, aplicado a mi mismo.",
  },
];

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <section className="mb-16">
        <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-ink-ghost mb-5">
          {title}
        </h2>
        <div className="space-y-4 text-sm text-ink-dim font-light leading-relaxed max-w-2xl">
          {children}
        </div>
      </section>
    </FadeIn>
  );
}

export default function BioTetrisCaseStudy() {
  return (
    <main className="px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <Link
            href="/#projects"
            className="text-xs text-ink-ghost hover:text-candle transition-colors"
          >
            &larr; Proyectos
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="w-10 h-px mt-8 mb-5" style={{ background: "var(--color-vera)" }} />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-ink mb-2">
            BioTetris
          </h1>
          <p className="text-sm text-ink-ghost font-light mb-6">
            Case study de diseno y producto
          </p>
          <div className="flex flex-wrap gap-1.5 mb-12">
            {["Salud", "Datos", "Automatizacion", "Python", "UX"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded text-ink-ghost"
                style={{ background: "var(--color-surface-mid)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <blockquote
            className="pl-5 mb-16 max-w-2xl"
            style={{ borderLeft: "2px solid var(--color-vera)" }}
          >
            <div className="space-y-3 text-sm text-ink-dim font-light leading-relaxed">
              <p>
                El péndulo marca la fuerza, la rueda la coordenada. Cuanto más
                querés frenar al péndulo descontrolado, más fuerza toma.
                Cuanto más lo ignorás, más avanza igual.
              </p>
              <p>
                La vida se parece más al Tetris: velocidad, peso, piezas
                cayendo, estrategia que nace mientras todo se desordena.
              </p>
              <p>
                Un sistema realmente funcional no necesita mil reglas.
                Necesita al baqueano interno, ese que sabe cuándo viene la
                tormenta. No la evita. La lee.
              </p>
            </div>
            <a
              href="https://fcamposgrillon.substack.com/p/6b715264-3a40-47eb-8732-a5b3774afc7c"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-xs text-ink-ghost hover:text-candle transition-colors"
            >
              -- El Paraiso Perdido, El Substack de Francisco, nov. 2025
            </a>
          </blockquote>
        </FadeIn>

        <Section title="Origen" delay={0.1}>
          <p>
            La idea nacio leyendo a Democrito y los libros de divulgacion sobre
            fisica cuantica de Scott Aaronson. Si todo, hasta el comportamiento
            humano, puede describirse con formulas y despejes, entonces el
            bienestar personal tambien deberia poder medirse y mejorarse por
            iteracion -- como entrena una IA.
          </p>
          <p>
            Esa fue la hipotesis de partida, no una necesidad practica de
            &ldquo;llevar un registro&rdquo;. Me di cuenta de esto recien
            despues de haber empezado a construirlo.
          </p>
        </Section>

        <Section title="Modelo de datos" delay={0.15}>
          <p>Cuatro variables, no elegidas al azar:</p>
          <div className="space-y-4 pt-2">
            {VARIABLES.map((v) => (
              <div
                key={v.name}
                className="p-4 rounded-lg"
                style={{
                  background: "var(--color-surface-mid)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.color }} />
                  <span className="text-xs font-medium" style={{ color: v.color }}>
                    {v.name}
                  </span>
                </div>
                <p className="text-xs text-ink-dim leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <p className="pt-2">
            Delta tiene signo. Hay acciones catalogadas que lo mueven a
            negativo -- por ejemplo, yoga yin despeja fugas acumuladas.
          </p>
        </Section>

        <Section title="Principio de diseno: continuidad sobre completitud" delay={0.2}>
          <p>
            El sistema esta inspirado en el futbol de posicion de Guardiola: la
            pelota se toca, siempre sobra uno, se circula con paciencia hasta
            que aparece un movimiento disruptivo. El cambio real sale del
            movimiento sostenido, no de la intencion de cambiar.
          </p>
          <p>
            Por eso el objetivo de BioTetris nunca fue completar un registro
            perfecto -- fue no dejar de tocar el sistema.
          </p>
        </Section>

        <Section title="Interfaz" delay={0.25}>
          <p>
            La ultima version tiene una estetica cercana a Apple: fisica de
            cursor y transiciones cuidadas, no solo una pantalla estatica. Los
            datos se organizan ademas en una estructura tematica de paises y
            epocas, con promedios semanales y mensuales que marcan fases.
          </p>
          <p>
            Hay bastante de El Bosque (mi proyecto de escritura) metido en el
            lenguaje visual -- no es una herramienta generica de formularios.
          </p>
        </Section>

        <Section title="Donde se tensiona el diseno" delay={0.3}>
          <p>
            Nueve meses de pausa -- mientras mi mama estuvo enferma, ya esta
            mejor -- mostraron el limite real del sistema: exige todo o nada.
            No hay una version minima para los meses sin margen, asi que en vez
            de usar una version mas chica, deje de usarlo por completo.
          </p>
          <p>
            El siguiente paso de diseno no es simplificar en general, es
            agregar un <strong className="text-ink font-normal">modo reducido</strong>: un
            solo gesto diario en los meses dificiles, sin categorizar en las
            cuatro variables, para no cortar la cadena de datos. Es la misma
            logica de coherencia que mide el sistema, aplicada al sistema
            mismo.
          </p>
        </Section>

        <FadeIn delay={0.35}>
          <div
            className="p-5 rounded-lg mb-8"
            style={{ background: "var(--color-surface-mid)", border: "1px solid var(--border-subtle)" }}
          >
            <p className="text-sm text-ink-dim font-light leading-relaxed">
              Escribir esto como case study fue en si un ejercicio de
              orientacion vocacional. La parte que mas disfrute de construir
              BioTetris no fue la automatizacion ni el analisis de datos --
              fue disenar como se siente usarlo.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link
            href="/#projects"
            className="text-xs text-ink-ghost hover:text-candle transition-colors"
          >
            &larr; Volver a proyectos
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
