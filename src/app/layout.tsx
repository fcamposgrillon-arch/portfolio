import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francisco Campos Grillon",
  description:
    "Abogado en formacion, Administrador Agrario, Musico. Asuncion, Paraguay.",
  openGraph: {
    title: "Francisco Campos Grillon",
    description: "Abogado - Administrador Agrario - Musico",
    locale: "es_PY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
