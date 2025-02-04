import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Stremio",
  description: "Streaming app with Next.js and Electron",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 p-6">
            <h2 className="text-2xl font-bold">🎥 My Stremio</h2>
            <nav className="mt-4">
              <ul className="space-y-3">
                <li><Link href="/" className="block p-2 rounded bg-gray-700">📺 Catalogo</Link></li>
                <li><Link href="/search" className="block p-2 rounded hover:bg-gray-700">🔍 Cerca</Link></li>
                <li><Link href="/favorites" className="block p-2 rounded hover:bg-gray-700">⭐ Preferiti</Link></li>
              </ul>
            </nav>
          </aside>

          {/* Contenuto principale */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
