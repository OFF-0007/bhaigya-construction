import Header from '@/components/Header';

export const revalidate = 3600; // Revalidate every hour

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Partners from '@/components/Partners';
import CompetitorComparison from '@/components/CompetitorComparison';
import Gallery from '@/components/Gallery';
import Quality from '@/components/Quality';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Partners />
        <CompetitorComparison />
        <Gallery />
        <Quality />
        <Process />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
