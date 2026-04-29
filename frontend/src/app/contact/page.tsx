import type { Metadata } from 'next';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Construction Quote in Assam',
  description: 'Contact Bhaigya Construction for a free consultation on your residential or commercial construction project anywhere in Assam. Call +91 96782 79817 or visit our Guwahati office at Bhetapara Chariali.',
  alternates: { canonical: 'https://bhaigyaconstruction.com/contact' },
  openGraph: {
    title: 'Contact Bhaigya Construction | Free Quote for Assam Construction Projects',
    description: 'Get a free consultation from Assam\'s best construction company. We serve Guwahati, Bongaigaon, Dibrugarh, Jorhat, and all districts of Assam.',
    url: 'https://bhaigyaconstruction.com/contact',
    images: [{ url: '/hero.jpeg', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" style={{ paddingTop: 'var(--header-h)' }}>
        <Contact />
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
