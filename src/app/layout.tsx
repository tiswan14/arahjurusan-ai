import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Temukan Arah Jurusanmu | AI-Powered Career Guidance",
  description: "Platform berbasis AI untuk membantu kamu menentukan jurusan yang sesuai dengan minat, bakat, dan potensi diri.",
  keywords: "pendidikan, jurusan kuliah, bimbingan karir, AI, rekomendasi jurusan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} font-sans antialiased bg-[#f8fafc] text-[#0f172a]`}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </body>
    </html>
  );
}