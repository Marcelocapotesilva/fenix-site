import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { EDIT_CATEGORIES } from '@/content/edits';
import { getPublicEdits } from '@/lib/cms';

export const metadata: Metadata = { title: 'Edits', description: 'Curadorias editoriais e comerciais por mercado, categoria, ocasião e oportunidade.' };

export default function EditsPage() {
  const edits = getPublicEdits();
  return (
    <>
      <PageHero crumbs={[{ label: 'Edits' }]} eyebrow="Edits" title={<>Curadoria é <span className="italic">direção</span>.</>} intro="Seleções editoriais e comerciais por mercado, categoria, ocasião e oportunidade — para compradores, operadores e maisons." />
      <section className="section">
        <div className="container">
          <div className="journeys">
            {EDIT_CATEGORIES.map((c) => {
              const n = edits.filter((e) => e.category === c.slug).length;
              return (
                <Link key={c.slug} href={`/edits/${c.slug}/`} className="journey" style={{ minHeight: 320 }}>
                  <span className="row row--between"><span className="eyebrow">{c.name}</span><span className="eyebrow">{n} {n === 1 ? 'edit' : 'edits'}</span></span>
                  <span>
                    <span className="journey__title" style={{ display: 'block', fontSize: 'clamp(34px, 3.4vw, 48px)' }}>{c.name}</span>
                    <span className="body-sm muted" style={{ display: 'block', marginTop: 12 }}>{c.text}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
