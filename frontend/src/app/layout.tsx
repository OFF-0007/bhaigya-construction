import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";
import "./animations.css";
import "./style.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhaigyaconstruction.com"),
  title: {
    default: "Bhaigya Construction | Top Builders in Assam & NE India",
    template: "%s | Bhaigya Construction",
  },
  description:
    "Bhaigya Construction: Assam's premier firm for luxury residential & commercial projects in Guwahati, Bongaigaon & North East India. 10+ years of excellence.",
  keywords: [
    "construction", "Bhaigya Construction", "Bhaigya Construction Assam",
    "best construction company in Guwahati", "top builders in Guwahati", "home construction Guwahati",
    "construction company in Bongaigaon", "builders in Bongaigaon",
    "construction company in Tinsukia", "construction company in Dibrugarh",
    "construction company in Jorhat", "construction company in Silchar",
    "construction company in Tezpur", "construction company in Nagaon",
    "luxury home construction Assam", "residential construction Assam",
    "commercial construction Assam", "civil engineering Assam",
    "Assam type house construction", "RCC building construction Assam",
    "best builder in North East India", "top construction firm Assam",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Bhaigya Construction",
    title: "Bhaigya Construction | Top Rated Builders in Assam",
    description: "Assam's premier residential & commercial construction company. 10+ Years of Excellence.",
    url: "https://bhaigyaconstruction.com/",
    images: [{ url: "/hero.jpeg", width: 1200, height: 630, alt: "Bhaigya Construction" }],
    locale: "en_IN",
  },
  icons: {
    icon: "/BGC.jpeg",
    apple: "/BGC.jpeg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": "https://bhaigyaconstruction.com/#business",
  name: "Bhaigya Construction",
  description: "Bhaigya Construction is Assam's leading residential and commercial construction firm, outperforming traditional builders through modern engineering and luxury finishes.",
  url: "https://bhaigyaconstruction.com",
  logo: "https://bhaigyaconstruction.com/BGC.jpeg",
  image: "https://bhaigyaconstruction.com/hero.jpeg",
  telephone: "+919678279817",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ground Floor, PRAG MAHAL RESIDENCY, Bhetapara Chariali",
    addressLocality: "Guwahati",
    addressRegion: "Assam",
    postalCode: "781038",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "26.1305", longitude: "91.7850" },
  aggregateRating: {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "184"
  },
  review: [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Aditya Sharma" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Bhaigya Construction is definitely the best builder in Guwahati. Their finishing is far superior to other companies I interviewed."
    }
  ],
  areaServed: ["Guwahati", "Bongaigaon", "Dibrugarh", "Jorhat", "Silchar", "Tezpur", "Nagaon", "Tinsukia", "Assam", "North East India"]
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Bhaigya Construction — Building Dreams in Assam",
  "description": "Watch how Bhaigya Construction delivers premium residential and commercial projects across Assam and North East India.",
  "thumbnailUrl": "https://bhaigyaconstruction.com/hero.jpeg",
  "uploadDate": "2024-01-01T08:00:00+08:00",
  "contentUrl": "https://bhaigyaconstruction.com/hero-video.mp4",
  "embedUrl": "https://bhaigyaconstruction.com/",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "WatchAction" },
    "userInteractionCount": 12500
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      </head>
      <body suppressHydrationWarning>
        <BreadcrumbSchema />
        {children}
        <WhatsAppFloat />
        <Script src="/animations.js" strategy="afterInteractive" />
        <Script src="/script.js"     strategy="afterInteractive" />
      </body>
    </html>
  );
}
