import type { Metadata } from "next";
import Script from "next/script";
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
  title: {
    default: "Bhaigya Construction | Best Construction Company in Assam & North East India",
    template: "%s | Bhaigya Construction Assam",
  },
  description:
    "Bhaigya Construction — Assam's #1 premium construction company. Expert residential & commercial builders in Guwahati, Bongaigaon, Dibrugarh, Jorhat, Silchar, Tezpur, Nagaon & across North East India. 10+ years | 50+ projects | Free consultation.",
  keywords: [
    "Bhaigya Construction", "Bhaigya Construction Assam",
    "construction company in Guwahati", "builders in Guwahati", "home construction Guwahati",
    "best builder Guwahati", "construction contractor Guwahati Assam",
    "construction company Bongaigaon", "builders Bongaigaon",
    "construction company Dibrugarh", "construction company Jorhat", "construction company Silchar",
    "construction company Tezpur", "construction company Nagaon", "construction company Sivasagar",
    "construction company Lakhimpur", "construction company Dhubri", "construction company Kokrajhar",
    "construction company Barpeta", "construction company Goalpara", "construction company Kamrup",
    "luxury home construction Assam", "residential construction Assam",
    "commercial construction Assam", "civil engineering Assam",
    "best construction company North East India", "top builders Assam",
    "house construction Assam", "building contractor Assam",
    "luxury villa construction Assam", "apartment construction Assam",
  ],
  authors: [{ name: "Bhaigya Construction", url: "https://bhaigyaconstruction.com" }],
  creator: "Bhaigya Construction",
  publisher: "Bhaigya Construction",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://bhaigyaconstruction.com/",
  },
  openGraph: {
    type: "website",
    siteName: "Bhaigya Construction",
    title: "Bhaigya Construction | Best Construction Company in Assam",
    description:
      "Assam's premier residential & commercial construction company. 10+ Years | 50+ Projects | 100+ Happy Clients. Serving all of Assam & North East India.",
    url: "https://bhaigyaconstruction.com/",
    images: [{ url: "/hero.jpeg", width: 1200, height: 630, alt: "Bhaigya Construction — Assam's Premier Construction Company" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhaigya Construction | Best Construction Company in Assam",
    description: "Premium residential & commercial construction across all of Assam & North East India.",
    images: ["/hero.jpeg"],
  },
  icons: {
    icon: "/BGC.jpeg",
    shortcut: "/BGC.jpeg",
    apple: "/BGC.jpeg",
  },
  other: {
    "geo.region": "IN-AS",
    "geo.placename": "Guwahati, Assam, India",
    "geo.position": "26.1305;91.7850",
    "ICBM": "26.1305, 91.7850",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: "Bhaigya Construction",
  alternateName: ["Bhaigya Construction Assam", "BGC Construction"],
  description: "Assam's premier residential and commercial construction company serving all districts of Assam and North East India. 10+ years of excellence in luxury and civil construction.",
  url: "https://bhaigyaconstruction.com",
  logo: { "@type": "ImageObject", url: "https://bhaigyaconstruction.com/BGC.jpeg", width: 200, height: 200 },
  image: "https://bhaigyaconstruction.com/hero.jpeg",
  telephone: "+919678279817",
  email: "bhaigyaconstruction@gmail.com",
  foundingDate: "2014",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
  slogan: "Assam's Premier Construction Company",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ground Floor, PRAG MAHAL RESIDENCY, opp. Durga mandir, Bhetapara Chariali",
    addressLocality: "Guwahati",
    addressRegion: "Assam",
    postalCode: "781038",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "26.1305", longitude: "91.7850" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "City", name: "Guwahati" }, { "@type": "City", name: "Bongaigaon" },
    { "@type": "City", name: "Dibrugarh" }, { "@type": "City", name: "Jorhat" },
    { "@type": "City", name: "Silchar" },  { "@type": "City", name: "Tezpur" },
    { "@type": "City", name: "Nagaon" },   { "@type": "City", name: "Sivasagar" },
    { "@type": "City", name: "Lakhimpur" },{ "@type": "City", name: "Dhubri" },
    { "@type": "City", name: "Goalpara" }, { "@type": "City", name: "Barpeta" },
    { "@type": "City", name: "Kokrajhar" },{ "@type": "State", name: "Assam" },
    { "@type": "AdministrativeArea", name: "North East India" },
  ],
  knowsAbout: ["Residential Construction", "Commercial Construction", "Luxury Interiors", "Civil Engineering", "Villa Construction", "Apartment Construction"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction Service Packages",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ultra Luxury Class Construction" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Class Finishing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "A Class Finishing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "B Class Civil Work" } },
    ],
  },
  founder: { "@type": "Person", name: "Mofidul Rahman", jobTitle: "CEO & Director" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "100", bestRating: "5" },
  sameAs: ["https://bhaigyaconstruction.com"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best construction company in Guwahati Assam?",
      acceptedAnswer: { "@type": "Answer", text: "Bhaigya Construction is one of Assam's premier construction companies, with 10+ years of experience building luxury residential and commercial projects across Guwahati, Bongaigaon, and all of North East India." },
    },
    {
      "@type": "Question",
      name: "What types of construction services does Bhaigya Construction offer in Assam?",
      acceptedAnswer: { "@type": "Answer", text: "Bhaigya Construction offers Ultra Luxury Class, Luxury Class Finishing, A Class Finishing, and B Class Civil Work for residential homes, commercial buildings, villas, and apartments across Assam." },
    },
    {
      "@type": "Question",
      name: "Does Bhaigya Construction serve all districts of Assam?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Bhaigya Construction serves clients across Guwahati, Bongaigaon, Dibrugarh, Jorhat, Silchar, Tezpur, Nagaon, Sivasagar, Lakhimpur, Dhubri, Goalpara, Barpeta, Kokrajhar and more." },
    },
    {
      "@type": "Question",
      name: "How can I get a free consultation from Bhaigya Construction?",
      acceptedAnswer: { "@type": "Answer", text: "Contact Bhaigya Construction at +91 96782 79817, email bhaigyaconstruction@gmail.com, or fill out the free quote form at bhaigyaconstruction.com/contact." },
    },
    {
      "@type": "Question",
      name: "How many years of experience does Bhaigya Construction have?",
      acceptedAnswer: { "@type": "Answer", text: "Bhaigya Construction was founded in 2014 and has over 10 years of experience, having delivered 50+ projects for 100+ satisfied clients across Assam and North East India." },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script src="/animations.js" strategy="afterInteractive" />
        <Script src="/script.js"     strategy="afterInteractive" />
      </body>
    </html>
  );
}
