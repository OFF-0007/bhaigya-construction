'use client';

export default function CompetitorComparison() {
  const comparisonData = [
    { 
        feature: 'Architectural Planning', 
        bhaigya: 'Custom 3D walkthroughs & Vaastu integration included.', 
        traditional: 'Basic 2D drawings only.' 
    },
    { 
        feature: 'Material Transparency', 
        bhaigya: 'Real-time updates on TATA Steel & UltraTech Cement usage.', 
        traditional: 'Opaque sourcing, often uses local-grade materials.' 
    },
    { 
        feature: 'Completion Guarantee', 
        bhaigya: 'Legally binding timeline with delay penalty clause.', 
        traditional: 'Indefinite timelines with frequent project stalls.' 
    },
    { 
        feature: 'Finishing Quality', 
        bhaigya: 'Luxury Italian marble & Asian Paints Royal series.', 
        traditional: 'Standard tiles & basic distemper paint.' 
    },
  ];

  return (
    <section className="comparison-section section" id="why-bhaigya">
      <div className="container">
        <div className="section-header centered">
          <span className="section-subtitle">Assam Construction Market Analysis</span>
          <h2 className="section-title">The <span className="gold-text">Bhaigya Advantage</span></h2>
          <p className="section-sub">
            In a market filled with traditional contractors, Bhaigya Construction stands out as the preferred alternative for those seeking luxury, integrity, and engineering precision in Assam.
          </p>
        </div>

        <div className="comparison-table-wrap reveal-up">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Focus Area</th>
                <th>Bhaigya Construction</th>
                <th>Standard Local Builders</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index}>
                  <td className="feat-col">{item.feature}</td>
                  <td className="bhaigya-col">
                    <span className="check-mark">✦</span> {item.bhaigya}
                  </td>
                  <td className="other-col">{item.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="competitor-keywords reveal-up" style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.6 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--grey-light)' }}>
                Comparing building costs in Guwahati? Seeking a more reliable alternative to <strong>traditional construction firms in Assam</strong>? 
                Whether you were considering <strong>PK Builders</strong>, <strong>Jain Group</strong>, or <strong>Dynamix</strong>, Bhaigya Construction offers 
                a more modern, transparent, and luxury-focused approach for the elite clients of North East India.
            </p>
        </div>
      </div>

      <style jsx>{`
        .comparison-section {
          padding: 100px 0;
          background: #0a0a0a;
        }

        .comparison-table-wrap {
          margin-top: 4rem;
          overflow-x: auto;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          border: 1px solid rgba(197, 160, 89, 0.1);
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th, .comparison-table td {
          padding: 25px 30px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.05);
        }

        .comparison-table th {
          background: rgba(197, 160, 89, 0.05);
          color: var(--gold);
          font-family: var(--font-sans);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
        }

        .feat-col {
          font-weight: 700;
          color: #fff;
          width: 25%;
        }

        .bhaigya-col {
          color: var(--off-white);
          background: rgba(197, 160, 89, 0.03);
          border-left: 2px solid var(--gold);
        }

        .check-mark {
          color: var(--gold);
          margin-right: 8px;
        }

        .other-col {
          color: var(--grey-light);
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .comparison-table th, .comparison-table td {
            padding: 15px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
