import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchPage } from '@/components/Search';
import { PageHero } from '@/components/ui';
import { buildSearchIndex } from '@/lib/search-index';

export const metadata: Metadata = { title: 'Busca', robots: { index: false } };

export default function Page() {
  const index = buildSearchIndex();
  return (
    <>
      <PageHero crumbs={[{ label: 'Busca' }]} eyebrow="Busca global" title="Buscar no site." />
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="skeleton" style={{ height: 64 }} />}>
            <SearchPage index={index} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
