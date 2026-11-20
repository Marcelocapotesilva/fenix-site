import type { Metadata } from 'next';
import { DefList, Figure, PageHero, SectionHead } from '@/components/ui';

export const metadata: Metadata = { title: 'Modelo — Página de maison', robots: { index: false, follow: false } };

/** Structural template for /maisons/[slug]. No real or invented brand data. */
export default function MaisonTemplate() {
  return (
    <>
      <div className="integration-banner"><div className="container"><strong>Modelo de página</strong>Template de maison. Os campos entre colchetes vêm do CMS e só são exibidos com autorização de publicação.</div></div>
      <PageHero crumbs={[{ label: 'Maisons', href: '/maisons/' }, { label: 'Modelo' }]} eyebrow="[País de origem] · [Categorias]" title="[Nome da maison]" intro="[Posicionamento — uma frase que define a maison.]" aside={<Figure ratio="3x2" pendingLabel="Logo autorizada" showRights={false} />} />
      <section className="section">
        <div className="container grid">
          <div className="col-7"><Figure ratio="16x9" pendingLabel="Fotografia oficial" /></div>
          <div className="col-4 col-start-9 stack">
            <p className="eyebrow">História</p>
            <p className="muted">[História da maison — fundação, criadores, momentos e linguagem olfativa.]</p>
          </div>
        </div>
      </section>
      <section className="section section--band">
        <div className="container">
          <SectionHead label="Coleções" title="[Coleções]" />
          <div className="entries">
            {[1, 2, 3].map((n) => (
              <div key={n} className="entry">
                <Figure ratio="4x5" pendingLabel={`Produto ${n}`} showRights={false} />
                <div className="entry__meta"><span className="eyebrow">[Coleção]</span><span className="eyebrow">[Concentração · Volume]</span></div>
                <p className="entry__title">[Produto associado]</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid">
          <div className="col-6">
            <DefList rows={[
              { label: 'Mercados de interesse', pending: '[Mercados]' },
              { label: 'Documentação', pending: '[Disponível a parceiros aprovados no Partner Access]' },
              { label: 'Contato comercial', pending: '[Responsável FÊNIX pela maison]' },
            ]} />
          </div>
        </div>
      </section>
    </>
  );
}
