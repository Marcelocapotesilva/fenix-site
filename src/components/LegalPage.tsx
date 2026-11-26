import type { ReactNode } from 'react';
import { Notice, PageHero } from './ui';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ label: 'Políticas' }, { label: title }]} eyebrow="Políticas" title={title} />
      <section className="section">
        <div className="container grid">
          <div className="col-8 prose">{children}</div>
          <div className="col-3 col-start-10">
            <Notice title="Texto pendente de revisão jurídica">Estrutura preparada para LGPD (e UK GDPR, se aplicável). Razão social, encarregado (DPO), bases legais e prazos devem ser confirmados pelo jurídico antes da publicação.</Notice>
          </div>
        </div>
      </section>
    </>
  );
}
