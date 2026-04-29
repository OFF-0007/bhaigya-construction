import Preloader from '@/components/Preloader';

export const dynamic = 'force-dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Gallery from '@/components/Gallery';
import Quality from '@/components/Quality';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
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
    </>
  );
}
