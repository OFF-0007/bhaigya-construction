import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Quality from '@/components/Quality';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Quality />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
