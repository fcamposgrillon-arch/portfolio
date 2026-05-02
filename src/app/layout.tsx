import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francisco Campos Grillon",
  description: "Portfolio personal — Abogado, Administrador Agrario, Músico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
