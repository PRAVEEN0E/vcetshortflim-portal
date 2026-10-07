import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Prevent crawling of admin and api routes
    },
    sitemap: 'https://vcetshortflim-portal.vercel.app/sitemap.xml',
  };
}
