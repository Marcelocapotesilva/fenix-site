'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Project, ProjectCategory, ProjectStage } from '@/lib/types';
import { STAGE_LABEL } from '@/lib/types';
import { StageBadge } from './ui';

const STAGES: ProjectStage[] = ['concept', 'in_development', 'mandated', 'in_delivery', 'completed'];

export function ProjectsBrowser({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [cat, setCat] = useState<string>('');
  const [stage, setStage] = useState<string>('');
  const results = useMemo(
    () => projects.filter((p) => (!cat || p.category === cat) && (!stage || p.stage === stage)),
    [projects, cat, stage],
  );
  const count = (c: string) => projects.filter((p) => p.category === c).length;

  return (
    <div>
      <div className="filter-groups" style={{ borderTop: 'var(--rule)' }}>
        <div className="filter-group" role="group" aria-label="Categoria">
          <span className="eyebrow muted">Categoria</span>
          <div className="chips">
            <button type="button" className="chip" aria-pressed={!cat} onClick={() => setCat('')}>Todas</button>
            {categories.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? '' : c)}>
                {c} <span className="muted">({count(c)})</span>
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group" role="group" aria-label="Estágio">
          <span className="eyebrow muted">Estágio</span>
          <div className="chips">
            <button type="button" className="chip" aria-pressed={!stage} onClick={() => setStage('')}>Todos</button>
            {STAGES.map((s) => (
              <button key={s} type="button" className="chip" aria-pressed={stage === s} onClick={() => setStage(stage === s ? '' : s)}>{STAGE_LABEL[s]}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="result-count mt-6" aria-live="polite">{results.length} {results.length === 1 ? 'projeto' : 'projetos'}</p>
      {results.length === 0 ? (
        <div className="empty mt-6" role="status">
          <p className="eyebrow">Sem projetos publicados</p>
          <p className="empty__title">Ainda não há projetos autorizados para publicação nesta combinação.</p>
          <p>Projetos confidenciais ou em negociação não aparecem publicamente.</p>
          <button type="button" className="link-arrow" onClick={() => { setCat(''); setStage(''); }}>Ver todos →</button>
        </div>
      ) : (
        <div className="entries mt-6">
          {results.map((p) => (
            <Link key={p.slug} href={`/special-projects/${p.slug}/`} className="entry">
              <div className={`media media--4x5 ${p.image ? '' : 'media-pending'}`}>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image.srcSm || p.image.src} alt={p.image.alt} loading="lazy" />
                ) : (
                  <span className="media-pending__label eyebrow">Imagem pendente</span>
                )}
              </div>
              <div className="entry__meta">
                <span className="eyebrow">{p.category}</span>
                <StageBadge stage={p.stage} />
              </div>
              <h3 className="entry__title">{p.title}</h3>
              <p className="entry__text">{p.stageNote} · {p.territory}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
