import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francisco Campos Grillon — Portfolio",
  description:
    "Abogado en formación, Administrador Agrario, Músico. Asunción, Paraguay.",
  openGraph: {
    title: "Francisco Campos Grillon",
    description: "Abogado · Administrador Agrario · Músico",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
