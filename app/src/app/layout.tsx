import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books Search",
  description: "Wyszukiwarka książek (OpenLibrary) w Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, 'Helvetica Neue', Arial",
          margin: 0,
          background: "#0b1220",
          color: "#e6e9ef",
        }}
      >
        <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px" }}>
          <h1 style={{ fontSize: 28, margin: "8px 0 24px" }}>📚 Books Search</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
