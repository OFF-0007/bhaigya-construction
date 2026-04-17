import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
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
  title: "Bhaigya Construction | Best Construction Company in Assam & North East India",
  description:
    "Premium residential and commercial construction services in Assam. With 10+ years of excellence, Bhaigya Construction delivers luxury finishing and civil engineering across Guwahati, Dibrugarh, and Nagaon.",
  keywords:
    "Best construction company in Assam, Top builders in Bongaigaon, Luxury home construction Guwahati, North East India construction contractors, Top residential builders Guwahati, Luxury commercial contractors North East India, Bhaigya Construction Assam",
  authors: [{ name: "Bhaigya Construction" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://bhaigyaconstruction.com/",
  },
  openGraph: {
    type: "website",
    title: "Bhaigya Construction | Best Construction Company in Assam",
    description:
      "Premium residential and commercial construction services in Assam. 10+ Years | 50+ Projects | 100+ Happy Clients.",
    url: "https://bhaigyaconstruction.com/",
    images: ["/hero_bg.png"],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhaigya Construction | Best Construction Company in Assam",
    description: "Premium residential and commercial construction services in Assam.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: "Bhaigya Construction",
  alternateName: "Bhaigya Construction Assam",
  description:
    "Premium residential and commercial construction company in Assam and North East India with 10+ years of excellence.",
  url: "https://bhaigyaconstruction.com",
  logo: "https://bhaigyaconstruction.com/logo.png",
  image: "https://bhaigyaconstruction.com/hero_bg.png",
  telephone: "+919678279817",
  email: "bhaigyaconstruction@gmail.com",
  foundingDate: "2014",
  numberOfEmployees: "50+",
  slogan: "Assam's Premier Construction Company",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Near Lower Assam Hospital",
      addressLocality: "Bongaigaon",
      addressRegion: "Assam",
      postalCode: "783380",
      addressCountry: "IN",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: "26.4803",
    longitude: "90.5586",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "City", name: "Guwahati" },
    { "@type": "City", name: "Bongaigaon" },
    { "@type": "City", name: "Dibrugarh" },
    { "@type": "City", name: "Nagaon" },
    { "@type": "State", name: "Assam" },
    { "@type": "AdministrativeArea", name: "North East India" },
  ],
  knowsAbout: [
    "Residential Construction",
    "Commercial Construction",
    "Luxury Interiors",
    "Civil Engineering",
    "Building Construction",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction Service Packages",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "A Class Finishing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Class Finishing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ultra Luxury Class" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "B Class Civil Work" } },
    ],
  },
  founder: {
    "@type": "Person",
    name: "Mofidul Rahman",
    jobTitle: "CEO & Director",
  },
  sameAs: ["https://bhaigyaconstruction.com"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
