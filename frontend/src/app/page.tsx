import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Gallery from '@/components/Gallery';
import Quality from '@/components/Quality';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Gallery />
        <Quality />
        <Process />
        <Testimonials />
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
