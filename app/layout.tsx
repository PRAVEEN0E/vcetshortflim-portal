import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vcetshortfilmfest.com"), // Use actual production domain here
  title: {
    default: "VCET State Level Short Film Competition 2026",
    template: "%s | VCET Short Film Fest",
  },
  description:
    "Velalar College of Engineering and Technology presents the State Level Short Film Competition 2026. Show Your Story. Create Your Impact. Open Theme for School & College students in Tamil Nadu. ₹38,000+ Prize Pool.",
  keywords: [
    "VCET",
    "Velalar College of Engineering and Technology",
    "Short Film Competition",
    "State Level Short Film Fest",
    "Tamil Nadu Short Film Contest",
    "Student Filmmaking",
    "Film Festival 2026",
    "Erode Short Film Festival",
    "Short Film Contest Tamil Nadu",
  ],
  authors: [{ name: "Velalar College of Engineering and Technology" }],
  creator: "VCET",
  publisher: "VCET",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VCET State Level Short Film Competition 2026",
    description: "An exclusive creative arena for 10th-12th school students and college filmmakers across Tamil Nadu to compete for state honours and cash rewards.",
    url: "https://vcetshortfilmfest.com",
    siteName: "VCET Short Film Fest",
    images: [
      {
        url: "/images/vcet-film-fest-logo.png",
        width: 1200,
        height: 630,
        alt: "VCET State Level Short Film Competition 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VCET State Level Short Film Competition 2026",
    description: "Tamil Nadu's premier short film competition for students. ₹38,000+ Prize Pool. Register now!",
    images: ["/images/vcet-film-fest-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{
          background: "#050505",
          color: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </body>
    </html>
  );
}
