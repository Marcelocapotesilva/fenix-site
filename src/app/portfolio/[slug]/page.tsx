import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToSelection } from '@/components/Selection';
import { ArrowLink, DefList, Figure, Notice, PageHero, StageBadge } from '@/components/ui';
import { getPublicCatalog, getPublicCatalogItem, getPublicProject } from '@/lib/cms';
import { AVAILABILITY_LABEL } from '@/lib/types';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPublicCatalog().map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getPublicCatalogItem((await params).slug);
  return c ? { title: `${c.name} — Portfolio`, description: c.summary } : {};
}

export default async function CatalogItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getPublicCatalogItem((await params).slug);
  if (!c) notFound();
  const project = c.relatedProject ? getPublicProject(c.relatedProject) : undefined;
  return (
    <>
      <PageHero crumbs={[{ label: 'Portfolio', href: '/portfolio/' }, { label: c.name }]} eyebrow={`${c.type} · ${c.category}`} title={c.name} intro={c.summary} />
      <section className="section">
        <div className="container grid">
          <div className="col-6"><Figure image={c.image} ratio="4x5" pendingLabel={`imagem oficial — ${c.name}`} /></div>
          <div className="col-5 col-start-8 stack-lg">
            <p className="measure">{c.description}</p>
            <DefList rows={[
              { label: 'Marca / origem do portfólio', value: c.brand },
              { label: 'Tipo', value: c.type },
              { label: 'Categoria', value: c.category },
              { label: 'País de origem', value: c.origin },
              { label: 'SKU', value: c.sku, pending: 'Não atribuído nesta etapa' },
              { label: 'Volume', value: c.volume, pending: 'Não aplicável nesta etapa' },
              { label: 'Concentração', value: c.concentration, pending: 'Não aplicável nesta etapa' },
              { label: 'Disponibilidade', value: AVAILABILITY_LABEL[c.availability] },
              { label: 'Mercados habilitados', value: c.enabledMarkets.length ? c.enabledMarkets.join(', ') : null, pending: 'A definir após qualificação' },
            ]} />
            <div>
              <p className="eyebrow mb-4">Documentos técnicos</p>
              <ul className="cols-list" style={{ columns: 1 }}>
                {c.documents.map((d) => (
                  <li key={d.name} className="row row--between">
                    <span>{d.name}</span>
                    {d.status === 'pending' ? <span className="status status--pending">Em preparação</span> : <span className="status">Partner Access</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="row">
              <AddToSelection item={{ slug: c.slug, name: c.name, type: c.type }} />
              <ArrowLink href="/portfolio/selection/">Solicitar cotação ou amostras</ArrowLink>
            </div>
            {c.availability === 'under_evaluation' && (
              <Notice title="Item em avaliação">Neste estágio, a solicitação é registrada como manifestação de interesse. Amostras e cotações dependem da conclusão da avaliação.</Notice>
            )}
            {project && (
              <div className="rule-top">
                <p className="eyebrow mb-2">Projeto relacionado</p>
                <Link href={`/special-projects/${project.slug}/`} className="row row--between">
                  <span className="h3">{project.title}</span>
                  <StageBadge stage={project.stage} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
