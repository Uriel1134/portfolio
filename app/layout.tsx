import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import AdminAccess, { SecretUrlAccess } from '../components/AdminAccess';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auriol Uriel Lissan - Designer UI/UX & Développeur",
  description: "Portfolio d'Auriol Uriel Lissan, Designer UI/UX et Développeur spécialisé en création d'interfaces modernes et expériences utilisateur exceptionnelles. Découvrez mes projets de design, développement web et mobile.",
  keywords: "UI/UX Design, Développement Web, Développement Mobile, Portfolio, Designer, Développeur, Interface Utilisateur, Expérience Utilisateur, Auriol Uriel Lissan",
  authors: [{ name: "Auriol Uriel Lissan" }],
  creator: "Auriol Uriel Lissan",
  openGraph: {
    title: "Auriol Uriel Lissan - Designer UI/UX & Développeur",
    description: "Portfolio d'Auriol Uriel Lissan, Designer UI/UX et Développeur spécialisé en création d'interfaces modernes et expériences utilisateur exceptionnelles.",
    url: "https://portfolio-auriol-lissan-e7e7f0a2fc1a.herokuapp.com",
    siteName: "Portfolio Auriol Uriel Lissan",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auriol Uriel Lissan - Designer UI/UX & Développeur",
    description: "Portfolio d'Auriol Uriel Lissan, Designer UI/UX et Développeur spécialisé en création d'interfaces modernes.",
    creator: "@auriol_lissan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
        <AdminAccess />
        <SecretUrlAccess />
      </body>
    </html>
  );
}
