import type { Metadata } from 'next';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'About Us — Assam\'s Premier Construction Company Since 2014',
  description: 'Learn about Bhaigya Construction — Assam\'s most trusted construction company founded in 2014. Our team of expert architects and civil engineers have delivered 50+ luxury residential and commercial projects across Guwahati, Bongaigaon, and all of North East India.',
  alternates: { canonical: 'https://bhaigyaconstruction.com/about' },
  openGraph: {
    title: 'About Bhaigya Construction | Premier Builder in Assam Since 2014',
    description: 'Discover why Bhaigya Construction is Assam\'s #1 trusted builder — 10+ years, 50+ projects, and 100+ happy clients across Guwahati and North East India.',
    url: 'https://bhaigyaconstruction.com/about',
    images: [{ url: '/hero.jpeg', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" style={{ paddingTop: 'var(--header-h)' }}>
        <About />
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
