'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CatalogItem } from '@/lib/types';
import { AVAILABILITY_LABEL } from '@/lib/types';
import { normalize } from '@/lib/text';
import { IconSearch } from './Icons';
import { AddToSelection } from './Selection';

type Filters = { type: string[]; category: string[]; origin: string[]; availability: string[] };
const EMPTY: Filters = { type: [], category: [], origin: [], availability: [] };

export function CatalogBrowser({ items }: { items: CatalogItem[] }) {
  const [q, setQ] = useState('');
  const [f, setF] = useState<Filters>(EMPTY);

  const facets = useMemo(
    () => ({
      type: [...new Set(items.map((i) => i.type))],
      category: [...new Set(items.map((i) => i.category))],
      origin: [...new Set(items.map((i) => i.origin))],
      availability: [...new Set(items.map((i) => i.availability))],
    }),
    [items],
  );

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    return items.filter((i) => {
      const hay = normalize([i.name, i.brand, i.category, i.origin, i.type, i.summary].join(' '));
      if (terms.some((t) => !hay.includes(t))) return false;
      if (f.type.length && !f.type.includes(i.type)) return false;
      if (f.category.length && !f.category.includes(i.category)) return false;
      if (f.origin.length && !f.origin.includes(i.origin)) return false;
      if (f.availability.length && !f.availability.includes(i.availability)) return false;
      return true;
    });
  }, [items, q, f]);

  const toggle = (k: keyof Filters, v: string) =>
    setF((cur) => ({ ...cur, [k]: cur[k].includes(v) ? cur[k].filter((x) => x !== v) : [...cur[k], v] }));
  const active = q || Object.values(f).some((a) => a.length);

  const group = (k: keyof Filters, label: string, render: (v: string) => string = (v) => v) => (
    <div className="filter-group" role="group" aria-label={label}>
      <span className="eyebrow muted">{label}</span>
      <div className="chips">
        {facets[k].map((v) => (
          <button key={v} type="button" className="chip" aria-pressed={f[k].includes(v)} onClick={() => toggle(k, v)}>{render(v)}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="toolbar">
        <div>
          <label htmlFor="catalog-q" className="eyebrow">Buscar no catálogo</label>
          <div className="search-field mt-2">
            <IconSearch />
            <input id="catalog-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nome, categoria, origem…" autoComplete="off" />
          </div>
        </div>
        <div className="row" style={{ gap: 20 }}>
          <span className="result-count" aria-live="polite">{results.length} de {items.length}</span>
          {active && <button type="button" className="text-btn" onClick={() => { setQ(''); setF(EMPTY); }}>Limpar filtros</button>}
        </div>
      </div>
      <div className="filter-groups">
        {group('type', 'Tipo')}
        {group('category', 'Categoria')}
        {group('origin', 'País de origem')}
        {group('availability', 'Disponibilidade', (v) => AVAILABILITY_LABEL[v as keyof typeof AVAILABILITY_LABEL])}
      </div>

      {results.length === 0 ? (
        <div className="empty mt-8" role="status">
          <p className="eyebrow">Sem resultados</p>
          <p className="empty__title">Nenhum item corresponde a esta combinação.</p>
          <p>Remova algum filtro ou registre o que você procura — usamos as solicitações para orientar o portfólio.</p>
          <div className="row">
            <button type="button" className="link-arrow" onClick={() => { setQ(''); setF(EMPTY); }}>Limpar filtros →</button>
            <Link href="/discovery/" className="link-arrow">Registrar interesse →</Link>
          </div>
        </div>
      ) : (
        <ul className="catalog mt-8">
          {results.map((i) => (
            <li key={i.slug} className="catalog-row">
              <Link href={`/portfolio/${i.slug}/`} className="catalog-row__media" tabIndex={-1} aria-hidden="true">
                {i.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={i.image.srcSm || i.image.src} alt="" loading="lazy" />
                ) : (
                  <span className="media-pending" style={{ display: 'flex', width: '100%', height: '100%' }} />
                )}
              </Link>
              <span>
                <span className="eyebrow muted">{i.type} · {i.category}</span>
                <Link href={`/portfolio/${i.slug}/`} className="catalog-row__title" style={{ display: 'block', marginTop: 4 }}>{i.name}</Link>
                <span className="body-sm muted">{i.summary}</span>
              </span>
              <span className="body-sm">{i.brand}<br /><span className="muted">{i.origin}</span></span>
              <span className="status status--development">{AVAILABILITY_LABEL[i.availability]}</span>
              <AddToSelection compact item={{ slug: i.slug, name: i.name, type: i.type }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
