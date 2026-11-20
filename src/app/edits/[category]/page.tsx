import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FormSection } from '@/components/FormSection';
import { ArrowLink, EmptyState, PageHero } from '@/components/ui';
import { EDIT_CATEGORIES, getEditCategory } from '@/content/edits';
import { getPublicEdits } from '@/lib/cms';

export const dynamicParams = false;
export function generateStaticParams() {
  return EDIT_CATEGORIES.map((c) => ({ category: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = getEditCategory((await params).category);
  return c ? { title: `${c.name} — Edits`, description: c.text } : {};
}

export default async function EditCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getEditCategory((await params).category);
  if (!c) notFound();
  const edits = getPublicEdits().filter((e) => e.category === c.slug);
  return (
    <>
      <PageHero crumbs={[{ label: 'Edits', href: '/edits/' }, { label: c.name }]} eyebrow="Edits" title={c.name} intro={c.text} />
      <section className="section">
        <div className="container">
          <div className="filter-groups" style={{ borderTop: 'var(--rule)' }} aria-label="Recortes previstos">
            <div className="filter-group">
              <span className="eyebrow muted">Recortes previstos</span>
              <div className="chips">{c.facets.map((f) => <span key={f} className="tag">{f}</span>)}</div>
            </div>
          </div>
          <div className="mt-8">
            {edits.length === 0 && (
              <EmptyState title={`As primeiras ${c.name} estão em curadoria.`} action={<ArrowLink href="/edits/">Outras categorias</ArrowLink>}>
                <p>Cada edit é publicada depois que as marcas e produtos incluídos têm autorização de publicação.</p>
              </EmptyState>
            )}
          </div>
        </div>
      </section>
      <FormSection label="Edits sob medida" title="Peça uma curadoria para o seu mercado." formId={`edits-${c.slug}`} intent="Comprar produtos para uma boutique" />
    </>
  );
}
