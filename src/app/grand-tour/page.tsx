import type { Metadata } from 'next';
import Link from 'next/link';
import { FormSection } from '@/components/FormSection';
import { Breadcrumb, EmptyState, Figure, Notice, SectionHead } from '@/components/ui';
import { EXPERIENCE_FIELDS, GRAND_TOUR_ENTRIES, GRAND_TOUR_FORM_EXTRA } from '@/content/grand-tour';
import { IMAGES } from '@/content/images';
import { getPublicExperiences } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Grand Tour',
  description: 'FÊNIX Grand Tour — Curated Journeys, Private & Corporate Journeys, Trade Missions & Cultural Experiences.',
};

export default function GrandTourPage() {
  const experiences = getPublicExperiences();
  return (
    <>
      <section className="gt-hero" aria-labelledby="gt-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gt-hero__img" src={IMAGES.river.src} srcSet={`${IMAGES.river.srcSm} 800w, ${IMAGES.river.src} 1600w`} sizes="100vw" alt={IMAGES.river.alt} />
        <div className="gt-hero__shade" aria-hidden="true" />
        <div className="container gt-hero__content">
          <div style={{ color: 'var(--marfim)' }}><Breadcrumb items={[{ label: 'Grand Tour' }]} /></div>
          <p className="eyebrow text-champagne">FÊNIX Grand Tour · Experiências e viagens privadas</p>
          <h1 id="gt-title" className="display mt-4">Grand<br />Tour</h1>
          <div className="row row--between mt-8" style={{ alignItems: 'flex-end' }}>
            <p className="lead" style={{ maxWidth: '44ch' }}>Jornadas pelo universo da perfumaria e do luxo — ateliês, origens, maisons e destinos culturais — com acesso, contexto e as pessoas certas.</p>
            <a href="#formulario" className="btn btn--light">Registrar interesse</a>
          </div>
        </div>
      </section>

      <section className="section section--black" aria-labelledby="gt-entries">
        <div className="container">
          <h2 id="gt-entries" className="sr-only">Três entradas</h2>
          <div className="gt-entries">
            {GRAND_TOUR_ENTRIES.map((g) => (
              <Link key={g.slug} href={`/grand-tour/${g.slug}/`} className="gt-entry">
                <span className="gt-entry__num">{g.number}</span>
                <span>
                  <span className="h2" style={{ display: 'block' }}>{g.name}</span>
                  <span className="body-sm muted" style={{ display: 'block', marginTop: 12 }}>{g.short}</span>
                </span>
                <span className="link-arrow">Explorar <span className="arr" aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="gt-exp">
        <div className="container">
          <SectionHead label="Experiências publicadas" id="gt-exp" title="Próximas jornadas" aside={<p className="muted">Cada experiência só é publicada com programa, operador responsável e condições aprovados.</p>} />
          {experiences.length === 0 ? (
            <div className="grid">
              <div className="col-7">
                <EmptyState title="Nenhuma jornada com programa aprovado para publicação neste momento." action={<a href="#formulario" className="link-arrow">Registrar interesse na próxima jornada →</a>}>
                  <p>Registre seu interesse: avisaremos quando a próxima jornada for confirmada.</p>
                </EmptyState>
              </div>
              <div className="col-4 col-start-9">
                <p className="eyebrow mb-4">Cada experiência apresentará</p>
                <ul className="cols-list" style={{ columns: 1 }}>{EXPERIENCE_FIELDS.map((f) => <li key={f}>{f}</li>)}</ul>
                <p className="mt-4"><Link href="/grand-tour/experiences/template/" className="text-btn">Ver modelo de página</Link></p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section--tight">
        <div className="container grid">
          <div className="col-6"><Figure image={IMAGES.brazilNut} ratio="3x2" /></div>
          <div className="col-5 col-start-8 stack">
            <p className="eyebrow">Fase 1</p>
            <p className="h3">Apresentação e registro de interesse.</p>
            <Notice title="Sem checkout nesta fase">Reservas, pagamentos e contratos dependem de especificação e contratação próprias e de operador responsável. Nenhum pagamento é solicitado por este site.</Notice>
          </div>
        </div>
      </section>

      <FormSection
        label="Grand Tour · Interesse"
        title="Registre seu interesse."
        intro={<p>Informe o tipo de jornada e o período. Entraremos em contato quando houver programa compatível.</p>}
        formId="grand-tour-interest"
        intent="Participar do Grand Tour"
        lockIntent
        extra={GRAND_TOUR_FORM_EXTRA}
        submitLabel="Registrar interesse"
      />
    </>
  );
}
