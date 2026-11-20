import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FormSection } from '@/components/FormSection';
import { IndexList, PageHero } from '@/components/ui';
import { getExpertise } from '@/content/expertise';
import { getJourney, JOURNEYS } from '@/content/journeys';

export const dynamicParams = false;
export function generateStaticParams() {
  return JOURNEYS.map((j) => ({ slug: j.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const j = getJourney((await params).slug);
  return j ? { title: j.name, description: j.short } : {};
}

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const j = getJourney((await params).slug);
  if (!j) notFound();
  const expertise = j.relatedExpertise.map(getExpertise).filter((e): e is NonNullable<typeof e> => Boolean(e));
  const cols = [
    { title: 'O que a FÊNIX faz por você', items: j.forYou },
    { title: 'O que precisamos de você', items: j.weNeed },
    { title: 'Próximos passos', items: j.nextSteps },
  ];
  return (
    <>
      <PageHero crumbs={[{ label: 'Who We Work With', href: '/who-we-work-with/' }, { label: j.name }]} eyebrow={`Jornada ${j.number} / 06`} title={j.name} intro={j.intro} />
      <section className="section">
        <div className="container grid">
          {cols.map((c) => (
            <div key={c.title} className="col-4">
              <p className="eyebrow mb-4">{c.title}</p>
              <ol className="cols-list" style={{ columns: 1 }}>
                {c.items.map((it, i) => <li key={it}><span className="numeral muted" style={{ marginRight: 12 }}>{String(i + 1).padStart(2, '0')}</span>{it}</li>)}
              </ol>
            </div>
          ))}
        </div>
      </section>
      <section className="section--tight">
        <div className="container">
          <p className="eyebrow mb-4">Especialidades envolvidas</p>
          <IndexList rows={expertise.map((e) => ({ num: e.number, title: e.name, desc: e.short, href: e.externalPage || `/our-expertise/${e.slug}/` }))} />
        </div>
      </section>
      <FormSection label={`Formulário · ${j.name}`} title="Inicie a conversa." formId={`journey-${j.slug}`} intent={j.intent} intro={<p>O objetivo já vem pré-selecionado para esta jornada; você pode ajustá-lo.</p>} />
    </>
  );
}
