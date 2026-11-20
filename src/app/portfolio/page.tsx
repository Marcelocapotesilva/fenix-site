import type { Metadata } from 'next';
import Link from 'next/link';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { Notice, PageHero } from '@/components/ui';
import { getPublicCatalog } from '@/lib/cms';

export const metadata: Metadata = { title: 'Portfolio', description: 'Catálogo B2B da FÊNIX: marcas, fragrâncias, ingredientes e oportunidades comerciais.' };

const FLOW = ['Catálogo', 'Seleção de produtos', 'Identificação da empresa', 'Solicitação', 'Registro', 'Notificação ao responsável'];

export default function PortfolioPage() {
  const items = getPublicCatalog();
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Portfolio' }]}
        eyebrow="Portfolio · Catálogo B2B"
        title="Portfolio & Opportunities."
        intro="Marcas, fragrâncias, ingredientes e oportunidades comerciais. Selecione itens, monte sua lista de interesse e solicite cotação ou amostras."
        aside={<Link href="/portfolio/selection/" className="link-arrow">Minha lista de interesse →</Link>}
      />
      <section className="section">
        <div className="container">
          <CatalogBrowser items={items} />
          <div className="grid mt-16">
            <div className="col-7">
              <p className="eyebrow mb-4">Como funciona</p>
              <ol className="steps" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
                {FLOW.map((s, i) => (
                  <li key={s} style={{ borderBottom: 'var(--rule-soft)' }}>
                    <span className="eyebrow muted">{String(i + 1).padStart(2, '0')}</span>
                    <p className="h3 mt-2">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-4 col-start-9 stack">
              <Notice title="Informação comercial restrita">Preços, margens, estoque e condições wholesale não são publicados. Ficam disponíveis apenas a parceiros aprovados no Partner Access.</Notice>
              <Notice title="Marcas de terceiros">Fragrâncias e SKUs de maisons serão listados após autorização de publicação de cada marca.</Notice>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
