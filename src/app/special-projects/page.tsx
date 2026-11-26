import type { Metadata } from 'next';
import { ProjectsBrowser } from '@/components/ProjectsBrowser';
import { Notice, PageHero } from '@/components/ui';
import { PROJECT_CATEGORIES } from '@/content/projects';
import { getPublicProjects } from '@/lib/cms';
import { STAGE_LABEL, type ProjectStage } from '@/lib/types';

export const metadata: Metadata = { title: 'Special Projects', description: 'Biblioteca de projetos, estudos e conceitos da FÊNIX, com estágio real de cada um.' };

export default function SpecialProjectsPage() {
  const projects = getPublicProjects();
  const stages = Object.keys(STAGE_LABEL) as ProjectStage[];
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Special Projects' }]}
        eyebrow="Special Projects"
        title={<>Projetos, estudos <span className="italic">e conceitos.</span></>}
        intro="Cada projeto indica seu estágio real. Conceito não é produto; desenvolvimento não é entrega; e só publicamos resultados comprovados."
        aside={<p className="caption muted">{stages.map((s) => STAGE_LABEL[s]).join(' → ')}</p>}
      />
      <section className="section">
        <div className="container">
          <ProjectsBrowser projects={projects} categories={PROJECT_CATEGORIES} />
          <div className="mt-16">
            <Notice title="Confidencialidade">Projetos confidenciais, em negociação ou sem autorização de publicação não aparecem nesta biblioteca. O estágio operacional e a autorização de publicação são campos independentes no CMS.</Notice>
          </div>
        </div>
      </section>
    </>
  );
}
