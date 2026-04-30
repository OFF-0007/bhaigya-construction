'use client';
import { useState } from 'react';

const faqs = [
  {
    question: "How much does it cost to build a house in Assam?",
    answer: "The cost depends on the finish quality. Our B Class starts at roughly ₹1400/sqft, A Class is around ₹1800/sqft, and our Ultra Luxury construction goes up to ₹2500+/sqft."
  },
  {
    question: "What brands of materials do you use?",
    answer: "We strictly use premium brands. For steel, we use Tata Tiscon or Durgapur. For cement, we use Dalmia, UltraTech, or Star. Our luxury packages include Jaquar/Kohler fittings and Asian Paints."
  },
  {
    question: "Do you provide Vastu-compliant designs?",
    answer: "Yes! All our architectural floor plans are 100% Vastu-compliant, ensuring peace, prosperity, and optimal space utilization."
  },
  {
    question: "Do you handle both residential and commercial projects?",
    answer: "Absolutely. We have over 10 years of experience building luxury homes, duplexes, commercial complexes, and apartments across Assam and North East India."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="section dark-section" style={{ padding: '60px 0' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        
        <div className="faq-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item" 
              style={{ 
                marginBottom: '1rem', 
                borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
                paddingBottom: '1rem'
              }}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--gold)', 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0'
                }}
              >
                {faq.question}
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              
              <div 
                className="faq-answer"
                style={{ 
                  maxHeight: openIndex === index ? '500px' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.3s ease',
                  color: 'var(--grey-light)',
                  lineHeight: '1.6'
                }}
              >
                <p style={{ paddingTop: '10px' }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
