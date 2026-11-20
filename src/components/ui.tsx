import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ImageRef, ProjectStage } from '@/lib/types';
import { STAGE_LABEL } from '@/lib/types';
import { Arrow } from './Icons';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="breadcrumb">
        <li><Link href="/">FÊNIX</Link></li>
        {items.map((it, i) => (
          <li key={i}>{it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow, title, intro, aside, crumbs, tone = 'light', titleClass = 'h1',
}: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; aside?: ReactNode;
  crumbs?: { label: string; href?: string }[]; tone?: 'light' | 'ink' | 'black'; titleClass?: string;
}) {
  return (
    <header className={`page-hero ${tone === 'ink' ? 'page-hero--ink' : tone === 'black' ? 'page-hero--black' : ''}`}>
      <div className="container">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className="page-hero__grid">
          <div className="page-hero__title">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className={titleClass}>{title}</h1>
          </div>
          {(intro || aside) && (
            <div className="page-hero__aside stack">
              {intro && <div className="lead">{intro}</div>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function SectionHead({ num, label, title, aside, id }: { num?: string; label: string; title: ReactNode; aside?: ReactNode; id?: string }) {
  return (
    <div className="sec-head">
      <div className="sec-head__num">
        {num && <span className="numeral">{num}</span>}
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="h2 sec-head__title" id={id}>{title}</h2>
      {aside && <div className="sec-head__aside">{aside}</div>}
    </div>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children} <Arrow />
    </Link>
  );
}

export function Figure({
  image, ratio = '4x5', pendingLabel, showRights = false, priority = false, sizes = '(max-width: 900px) 100vw, 50vw',
}: {
  image?: ImageRef; ratio?: '4x5' | '3x2' | '16x9' | '1x1' | 'tall'; pendingLabel?: string;
  showRights?: boolean; priority?: boolean; sizes?: string;
}) {
  if (!image) {
    return (
      <figure className="figure">
        <div className={`media media--${ratio} media-pending`} role="img" aria-label={`Fotografia em produção: ${pendingLabel || 'imagem oficial'}`}>
          <span className="media-pending__label">Fotografia em produção</span>
        </div>
      </figure>
    );
  }
  return (
    <figure className="figure">
      <div className={`media media--${ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={image.srcSm ? `${image.srcSm} 800w, ${image.src} 1600w` : undefined}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {(image.caption || (showRights && !image.rightsConfirmed)) && (
        <figcaption>
          <span>{image.caption}</span>
          {showRights && !image.rightsConfirmed && <span className="nowrap">Créditos a confirmar</span>}
        </figcaption>
      )}
    </figure>
  );
}

const STAGE_CLASS: Record<ProjectStage, string> = {
  concept: 'status--concept',
  in_development: 'status--development',
  mandated: 'status--mandated',
  in_delivery: 'status--delivery',
  completed: 'status--completed',
};
export function StageBadge({ stage }: { stage: ProjectStage }) {
  return <span className={`status ${STAGE_CLASS[stage]}`}>{STAGE_LABEL[stage]}</span>;
}
export function PendingBadge({ children = 'Pendente' }: { children?: ReactNode }) {
  return <span className="status status--pending">{children}</span>;
}

export function EmptyState({ title, children, action, label }: { title: string; children?: ReactNode; action?: ReactNode; label?: string }) {
  return (
    <div className="empty" role="status">
      {label && <p className="eyebrow">{label}</p>}
      <p className="empty__title">{title}</p>
      {children && <div>{children}</div>}
      {action}
    </div>
  );
}

export function Notice({ kind = 'pending', title, children }: { kind?: 'pending' | 'success' | 'error' | 'info'; title: string; children?: ReactNode }) {
  return (
    <div className={`notice notice--${kind}`} role={kind === 'error' ? 'alert' : 'note'}>
      <p className="eyebrow">{title}</p>
      {children && <div className="body-sm">{children}</div>}
    </div>
  );
}

export function DefList({ rows }: { rows: { label: string; value?: ReactNode; pending?: string }[] }) {
  return (
    <dl className="dl">
      {rows.map((r) => (
        <div key={r.label}>
          <dt>{r.label}</dt>
          {r.value ? <dd>{r.value}</dd> : <dd className="pending">{r.pending || 'Pendente'}</dd>}
        </div>
      ))}
    </dl>
  );
}

export function IndexList({ rows }: { rows: { num: string; title: string; desc: string; href: string }[] }) {
  return (
    <ul className="index-list">
      {rows.map((r) => (
        <li key={r.href}>
          <Link href={r.href} className="index-row">
            <span className="index-row__num">{r.num}</span>
            <span className="index-row__title">{r.title}</span>
            <span className="index-row__desc">{r.desc}</span>
            <span className="index-row__arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
