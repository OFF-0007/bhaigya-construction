'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  const domain = 'https://bhaigyaconstruction.com';

  // Don't show breadcrumbs on homepage
  if (pathname === '/' || !pathname) return null;

  const pathSegments = pathname.split('/').filter((v) => v);
  
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": domain
      },
      ...pathSegments.map((segment, index) => {
        const url = `${domain}/${pathSegments.slice(0, index + 1).join('/')}`;
        const name = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": url
        };
      })
    ]
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
