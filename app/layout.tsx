import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// ✅ Your live website URL
const siteUrl = "https://ultrafynetworks-2.onpointtech.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Ultrafy Networks",
    template: "%s | Ultrafy Networks",
  },

  description:
    "Ultrafy Networks provides high-speed fiber internet, CCTV installation, electrical installations, solar solutions, fire alarm systems, networking, structured cabling, and ICT services across Kenya.",

  keywords: [
    "Ultrafy Networks",
    "Fiber Internet Kenya",
    "Internet Service Provider",
    "Networking",
    "Structured Cabling",
    "Fiber Installation",
    "CCTV Installation",
    "Solar Installation",
    "Electrical Installation",
    "Fire Alarm Systems",
    "ICT Solutions",
    "Network Security",
    "Thika",
    "Kenya",
  ],

  authors: [
    {
      name: "Ultrafy Networks",
    },
  ],

  creator: "Ultrafy Networks",

  publisher: "Ultrafy Networks",

  verification: {
    google: "QnUzZvGE9aKsz4tqaEgpMQL-YxmEu6RIi1GucRyYje4",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ultrafy Networks",
    title: "Ultrafy Networks",
    description:
      "Reliable fiber internet, networking, CCTV installation, electrical installations, solar solutions, fire alarm systems, and ICT services across Kenya.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ultrafy Networks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ultrafy Networks",
    description:
      "Reliable fiber internet, networking, CCTV installation, electrical installations, solar solutions, fire alarm systems, and ICT services across Kenya.",
    images: [`${siteUrl}/og-image.jpg`],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
