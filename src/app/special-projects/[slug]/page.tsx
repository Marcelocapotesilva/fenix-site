import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormSection } from '@/components/FormSection';
import { ArrowLink, DefList, Figure, PageHero, StageBadge } from '@/components/ui';
import { getExpertise } from '@/content/expertise';
import { BIO_PROJECT_SLUGS } from '@/content/projects';
import { getPublicProject, getPublicProjects } from '@/lib/cms';
import { STAGE_LABEL, type ProjectStage } from '@/lib/types';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPublicProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPublicProject((await params).slug);
  return p ? { title: `${p.title} — Special Projects`, description: p.description } : {};
}

const STAGES = Object.keys(STAGE_LABEL) as ProjectStage[];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPublicProject((await params).slug);
  if (!p) notFound();
  const current = STAGES.indexOf(p.stage);
  const expertise = p.relatedExpertise.map(getExpertise).filter((e): e is NonNullable<typeof e> => Boolean(e));
  return (
    <>
      <PageHero crumbs={[{ label: 'Special Projects', href: '/special-projects/' }, { label: p.title }]} eyebrow={p.category} title={p.title} intro={p.description} aside={<StageBadge stage={p.stage} />} />
      <section className="section">
        <div className="container grid">
          <div className="col-6"><Figure image={p.image} ratio="4x5" pendingLabel={`imagem autorizada — ${p.title}`} /></div>
          <div className="col-5 col-start-8 stack-lg">
            <div>
              <p className="eyebrow mb-4">Etapa de desenvolvimento</p>
              <ol className="row" style={{ gap: 0, borderTop: 'var(--rule)' }} aria-label="Estágios">
                {STAGES.map((s, i) => (
                  <li key={s} className="caption" style={{ flex: 1, padding: '10px 4px 0 0', borderTop: i <= current ? '2px solid var(--carvao)' : '2px solid transparent', marginTop: -1, opacity: i <= current ? 1 : 0.45 }} aria-current={i === current ? 'step' : undefined}>
                    {STAGE_LABEL[s]}
                  </li>
                ))}
              </ol>
              <p className="body-sm mt-3">{p.stageNote}</p>
            </div>
            <DefList rows={[
              { label: 'Categoria', value: p.category },
              { label: 'Território', value: p.territory },
              ...(p.track ? [{ label: 'Frente', value: p.track }] : []),
              { label: 'Objetivo', value: p.objective },
              { label: 'Papel da FÊNIX', value: p.fenixRole },
              { label: 'Resultados comprovados', value: p.provenResults, pending: 'Ainda não há resultados comprovados a publicar.' },
            ]} />
            {expertise.length > 0 && (
              <div>
                <p className="eyebrow mb-2">Especialidades</p>
                <p>{expertise.map((e, i) => <span key={e.slug}>{i > 0 && ' · '}<Link className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 15 }} href={`/our-expertise/${e.slug}/`}>{e.name}</Link></span>)}</p>
              </div>
            )}
            {BIO_PROJECT_SLUGS.includes(p.slug) && <ArrowLink href="/fenix-bio/">Ver todos os projetos FÊNIX BIO</ArrowLink>}
          </div>
        </div>
      </section>
      <FormSection label={`Projeto · ${p.title}`} title={p.cta.label} formId={`project-${p.slug}`} intent={p.cta.intent} />
    </>
  );
}
