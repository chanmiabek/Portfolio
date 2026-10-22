import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MyWeb | Portfolio", template: "%s | MyFolio" },
  description: "A personal portfolio showcasing projects, experience, services, and ways to get in touch.",
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: 
  Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
