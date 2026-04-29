import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://bhaigyaconstruction.com/sitemap.xml',
    host: 'https://bhaigyaconstruction.com',
  };
}
