import type { Metadata } from "next";
import { Outfit, Hammersmith_One } from 'next/font/google';
import "./globals.css";
import Navbar from './components/Navbar'
import 'animate.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit', 
});

const hammersmith = Hammersmith_One({
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hammersmith', 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dominicdodge.com"),
  title: {
    default: "Dominic Dodge | Full-Stack Engineer & Web Developer",
    template: "%s | Dominic Dodge",
  },
  description:
    "Portfolio of Dominic Dodge, a full-stack engineer and web developer in St. George, Utah. Projects, resume, and contact for full-time roles and freelance work.",
  authors: [{ name: "Dominic Dodge", url: "https://dominicdodge.com" }],
  creator: "Dominic Dodge",
  keywords: [
    "Dominic Dodge",
    "full-stack engineer",
    "software engineer",
    "web developer",
    "St. George Utah web developer",
    "freelance web developer",
    "React developer",
    "Next.js developer",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Dominic Dodge",
    title: "Dominic Dodge | Full-Stack Engineer & Web Developer",
    description:
      "Full-stack engineer in St. George, Utah. Open to full-time roles and freelance website projects.",
    locale: "en_US",
    images: [{ url: "/headshot.png", width: 912, height: 1181, alt: "Dominic Dodge" }],
  },
  twitter: {
    card: "summary",
    title: "Dominic Dodge | Full-Stack Engineer & Web Developer",
    description:
      "Full-stack engineer in St. George, Utah. Open to full-time roles and freelance website projects.",
    images: ["/headshot.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${hammersmith.variable}`}>
      <body>
        <Navbar />
        
        <main>{children}</main>
      </body>
    </html>
  );
}