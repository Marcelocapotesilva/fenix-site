import type { Metadata } from 'next';
import Link from 'next/link';
import { IndexList, PageHero, SectionHead } from '@/components/ui';
import { EXPERTISE, TRANSVERSAL_SERVICES } from '@/content/expertise';

export const metadata: Metadata = {
  title: 'Our Expertise',
  description: 'As oito especialidades da FÊNIX: Beauty, Access, Amazon Raw, Labs, Scent Spaces, Stakeholder Studio, Stakeholder Experiences e Grand Tour.',
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Our Expertise' }]}
        eyebrow="Our Expertise"
        title={<>Oito especialidades. <span className="italic">Um único padrão.</span></>}
        intro="Da representação de maisons às matérias-primas amazônicas, da identidade olfativa às jornadas privadas: cada especialidade tem método, equipe de parceiros e formulário próprios."
      />
      <section className="section">
        <div className="container">
          <IndexList rows={EXPERTISE.map((e) => ({ num: e.number, title: e.name, desc: e.short, href: e.externalPage || `/our-expertise/${e.slug}/` }))} />
        </div>
      </section>
      <section className="section section--band" id="servicos-transversais" aria-labelledby="transv">
        <div className="container">
          <SectionHead label="Serviços transversais" id="transv" title="Serviços que atravessam as oito especialidades." aside={<p className="muted">Complementam as especialidades sem constituir novas divisões empresariais.</p>} />
          <div className="entries">
            {TRANSVERSAL_SERVICES.map((s) => (
              <div key={s.name} className="entry">
                <div className="entry__meta"><span className="eyebrow">Serviço</span></div>
                <h3 className="entry__title">{s.name}</h3>
                <p className="entry__text">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10"><Link href="/contact/" className="btn">Conversar sobre um serviço</Link></p>
        </div>
      </section>
    </>
  );
}
