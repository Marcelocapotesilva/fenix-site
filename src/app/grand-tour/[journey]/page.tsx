import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormSection } from '@/components/FormSection';
import { ArrowLink, EmptyState, PageHero } from '@/components/ui';
import { GRAND_TOUR_ENTRIES, GRAND_TOUR_FORM_EXTRA } from '@/content/grand-tour';
import { getPublicExperiences } from '@/lib/cms';

export const dynamicParams = false;
export function generateStaticParams() {
  return GRAND_TOUR_ENTRIES.map((g) => ({ journey: g.slug }));
}
const find = (s: string) => GRAND_TOUR_ENTRIES.find((g) => g.slug === s);
export async function generateMetadata({ params }: { params: Promise<{ journey: string }> }): Promise<Metadata> {
  const g = find((await params).journey);
  return g ? { title: `${g.name} — Grand Tour`, description: g.short } : {};
}

export default async function GrandTourEntry({ params }: { params: Promise<{ journey: string }> }) {
  const g = find((await params).journey);
  if (!g) notFound();
  const exps = getPublicExperiences().filter((x) => x.entry === g.slug);
  const extra = GRAND_TOUR_FORM_EXTRA.filter((f) => f.name !== 'journeyType');
  return (
    <>
      <PageHero tone="black" crumbs={[{ label: 'Grand Tour', href: '/grand-tour/' }, { label: g.name }]} eyebrow={`Grand Tour · ${g.number}`} title={g.name} intro={g.intro} />
      <section className="section section--black">
        <div className="container grid">
          <div className="col-6">
            <p className="eyebrow text-champagne mb-4">Para quem</p>
            <ul className="cols-list" style={{ columns: 1 }}>{g.forWhom.map((x) => <li key={x} style={{ borderColor: 'rgba(243,240,233,.25)' }}>{x}</li>)}</ul>
          </div>
          <div className="col-6">
            <p className="eyebrow text-champagne mb-4">Formato</p>
            <ul className="cols-list" style={{ columns: 1 }}>{g.format.map((x) => <li key={x} style={{ borderColor: 'rgba(243,240,233,.25)' }}>{x}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {exps.length === 0 && (
            <EmptyState title={`Nenhuma experiência de ${g.name} publicada no momento.`} action={<a href="#formulario" className="link-arrow">Registrar interesse →</a>}>
              <p>Programas em preparação só são publicados após aprovação de roteiro, operador e condições.</p>
            </EmptyState>
          )}
          <div className="row row--between mt-10">
            <ArrowLink href="/grand-tour/">Todas as entradas do Grand Tour</ArrowLink>
            <Link href="/grand-tour/experiences/template/" className="text-btn">Modelo de página de experiência</Link>
          </div>
        </div>
      </section>
      <FormSection label={`Grand Tour · ${g.name}`} title="Registrar interesse." formId={`grand-tour-${g.slug}`} intent="Participar do Grand Tour" lockIntent extra={extra} submitLabel="Registrar interesse" />
    </>
  );
}
