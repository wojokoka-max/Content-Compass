import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Content Compass — silnik decyzji contentowych",
  description:
    "Content Compass nie pisze treści. Wskazuje, co tworzyć następne: okazje, klastry, trendy, luki konkurencji i okna sezonowe — w jednym werdykcie.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
