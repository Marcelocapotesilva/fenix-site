import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { publicSitemap } from '@/lib/routes';

export const metadata: Metadata = { title: 'Mapa do site' };

export default function SitemapPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Mapa do site' }]} eyebrow="Sitemap" title="Mapa do site." />
      <section className="section">
        <div className="container entries">
          {publicSitemap().map((g) => (
            <div key={g.title} className="entry">
              <div className="entry__meta"><span className="eyebrow">{g.title}</span></div>
              <ul className="stack" style={{ display: 'grid', gap: 8 }}>
                {g.routes.map((r) => <li key={r.href}><Link href={r.href} className="body-sm">{r.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
