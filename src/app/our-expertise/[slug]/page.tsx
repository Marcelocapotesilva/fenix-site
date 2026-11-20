import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormSection } from '@/components/FormSection';
import { ArrowLink, EmptyState, Figure, Notice, PageHero, SectionHead, StageBadge } from '@/components/ui';
import { EXPERTISE, getExpertise } from '@/content/expertise';
import { getPublicProject } from '@/lib/cms';

export const dynamicParams = false;
export function generateStaticParams() {
  return EXPERTISE.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getExpertise((await params).slug);
  return e ? { title: e.name, description: e.short } : {};
}

export default async function ExpertiseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const e = getExpertise((await params).slug);
  if (!e) notFound();
  const idx = EXPERTISE.findIndex((x) => x.slug === e.slug);
  const next = EXPERTISE[(idx + 1) % EXPERTISE.length];
  const related = e.relatedProjects.map(getPublicProject).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Our Expertise', href: '/our-expertise/' }, { label: e.name }]}
        eyebrow={`Especialidade ${e.number} / 08`}
        title={e.name}
        intro={e.short}
        aside={<ArrowLink href="#formulario">{e.cta.label}</ArrowLink>}
      />

      {/* Apresentação + proposta de valor */}
      <section className="section">
        <div className="container grid">
          <div className={e.image ? 'col-6' : 'col-7'}>
            <p className="eyebrow mb-4">Apresentação</p>
            <p className="lead" style={{ fontSize: 'clamp(22px, 2.2vw, 30px)' }}>{e.intro}</p>
            <div className="rule-top mt-10">
              <p className="eyebrow mb-4">Proposta de valor</p>
              <p className="measure">{e.valueProposition}</p>
            </div>
            {e.note && <div className="mt-8"><Notice title="Nota de veracidade">{e.note}</Notice></div>}
            {e.externalPage && <p className="mt-8"><Link className="btn" href={e.externalPage}>Abrir a área do Grand Tour</Link></p>}
          </div>
          <div className={e.image ? 'col-5 col-start-8' : 'col-4 col-start-9'}>
            <Figure image={e.image} ratio="4x5" pendingLabel={`fotografia ${e.name}`} />
          </div>
        </div>
      </section>

      {/* Capacidades / clientes / aplicações */}
      <section className="section section--band">
        <div className="container grid">
          <div className="col-6">
            <p className="eyebrow mb-4">Capacidades</p>
            <ul className="cols-list" style={{ columns: 1 }}>{e.capabilities.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="col-3">
            <p className="eyebrow mb-4">Tipos de clientes</p>
            <ul className="cols-list" style={{ columns: 1 }}>{e.clients.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="col-3">
            <p className="eyebrow mb-4">Aplicações</p>
            <ul className="cols-list" style={{ columns: 1 }}>{e.applications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Exemplos autorizados + projetos relacionados */}
      <section className="section">
        <div className="container">
          <SectionHead label="Exemplos autorizados" title="Casos e referências" />
          <EmptyState title="Exemplos serão publicados após autorização dos clientes e parceiros envolvidos.">
            <p>Não exibimos clientes, contratos ou resultados sem aprovação formal registrada.</p>
          </EmptyState>
          {related.length > 0 && (
            <div className="mt-16">
              <p className="eyebrow mb-4">Projetos relacionados</p>
              <div className="entries">
                {related.map((p) => (
                  <Link key={p.slug} href={`/special-projects/${p.slug}/`} className="entry">
                    <div className="entry__meta"><span className="eyebrow">{p.category}</span><StageBadge stage={p.stage} /></div>
                    <h3 className="entry__title">{p.title}</h3>
                    <p className="entry__text">{p.stageNote}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FormSection
        label={`Formulário · ${e.name}`}
        title={e.cta.label}
        intro={<p>Sua solicitação chega classificada como <strong>{e.name}</strong>.</p>}
        formId={`expertise-${e.slug}`}
        intent={e.cta.intent}
      />

      <section className="section--tight">
        <div className="container row row--between">
          <span className="eyebrow muted">Próxima especialidade</span>
          <ArrowLink href={next.externalPage || `/our-expertise/${next.slug}/`}>{next.number} — {next.name}</ArrowLink>
        </div>
      </section>
    </>
  );
}
