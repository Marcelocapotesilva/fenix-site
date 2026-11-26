import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';
import { publicSitemap } from '@/lib/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs = new Set(publicSitemap().flatMap((g) => g.routes.map((r) => r.href)));
  ['/partner-access/', '/partner-access/register/', '/search/', '/portfolio/selection/'].forEach((h) => hrefs.delete(h));
  return [...hrefs].map((h) => ({ url: `${SITE.url}${h}` }));
}
