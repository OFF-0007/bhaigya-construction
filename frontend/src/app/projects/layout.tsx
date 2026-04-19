import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" style={{ minHeight: '100vh', background: 'var(--dark)' }}>
        {children}
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
