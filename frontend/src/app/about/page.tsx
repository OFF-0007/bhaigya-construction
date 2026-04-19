import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Script from 'next/script';

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
