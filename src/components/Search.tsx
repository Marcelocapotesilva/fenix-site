'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, type ReactNode } from 'react';
import { useI18n } from '@/lib/i18n';
import type { SearchDoc } from '@/lib/search-index';
import { normalize } from '@/lib/text';
import { IconClose, IconSearch } from './Icons';

export function searchDocs(index: SearchDoc[], query: string, limit = 40) {
  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return index
    .map((d) => {
      const title = normalize(d.title);
      const text = normalize(d.text + ' ' + d.section);
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 10;
        else if (text.includes(t)) score += 2;
        else return { d, score: 0 };
      }
      return { d, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.d);
}

function snippet(text: string, query: string): ReactNode {
  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
  const n = normalize(text);
  const first = terms.map((t) => n.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, first - 60);
  const raw = (start > 0 ? '…' : '') + text.slice(start, start + 200) + (text.length > start + 200 ? '…' : '');
  const out: ReactNode[] = [];
  let rest = raw;
  let key = 0;
  while (rest) {
    const nr = normalize(rest);
    const hits = terms.map((t) => ({ t, i: nr.indexOf(t) })).filter((h) => h.i >= 0).sort((a, b) => a.i - b.i);
    if (!hits.length) { out.push(rest); break; }
    const h = hits[0];
    out.push(rest.slice(0, h.i));
    out.push(<mark key={key++}>{rest.slice(h.i, h.i + h.t.length)}</mark>);
    rest = rest.slice(h.i + h.t.length);
  }
  return out;
}

function Results({ results, query }: { results: SearchDoc[]; query: string }) {
  return (
    <ul className="search-results">
      {results.map((r) => (
        <li key={r.href + r.title}>
          <Link href={r.href}>
            <span className="eyebrow muted">{r.section}</span>
            <span>
              <span className="h3" style={{ display: 'block' }}>{r.title}</span>
              <span className="body-sm muted" style={{ display: 'block', marginTop: 6 }}>{snippet(r.text, query)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SearchOverlay({ index, onClose }: { index: SearchDoc[]; onClose: () => void }) {
  const { t } = useI18n();
  const router = useRouter();
  const [q, setQ] = useState('');
  const results = useMemo(() => searchDocs(index, q, 8), [index, q]);
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={t('search')}>
      <div className="container">
        <div className="overlay__top">
          <span className="eyebrow">{t('search')}</span>
          <button type="button" className="close-btn" onClick={onClose}>{t('close')} <IconClose /></button>
        </div>
        <form
          role="search"
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim().length > 1) router.push(`/search/?q=${encodeURIComponent(q.trim())}`);
          }}
        >
          <label htmlFor="overlay-q" className="sr-only">{t('search')}</label>
          <div className="search-field">
            <IconSearch />
            <input id="overlay-q" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('searchPlaceholder')} autoComplete="off" />
          </div>
        </form>
        <div className="mt-8 mb-8" aria-live="polite">
          {q.trim().length < 2 ? (
            <p className="muted body-sm">{t('searchHint')}</p>
          ) : results.length ? (
            <>
              <Results results={results} query={q} />
              <p className="mt-6"><Link className="link-arrow" href={`/search/?q=${encodeURIComponent(q.trim())}`}>Ver todos os resultados</Link></p>
            </>
          ) : (
            <p className="muted">{t('searchNoResults')} “{q}”.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function SearchPage({ index }: { index: SearchDoc[] }) {
  const { t } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get('q') || '';
  const [q, setQ] = useState(initial);
  const results = useMemo(() => searchDocs(index, q), [index, q]);
  return (
    <>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/search/?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <label htmlFor="page-q" className="sr-only">{t('search')}</label>
        <div className="search-field">
          <IconSearch />
          <input id="page-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('searchPlaceholder')} autoComplete="off" />
        </div>
      </form>
      <div className="mt-8" aria-live="polite">
        {q.trim().length < 2 ? (
          <p className="muted">{t('searchHint')}</p>
        ) : results.length ? (
          <>
            <p className="result-count mb-4">{results.length} {results.length === 1 ? 'resultado' : 'resultados'}</p>
            <Results results={results} query={q} />
          </>
        ) : (
          <div className="empty" role="status">
            <p className="empty__title">{t('searchNoResults')} “{q}”.</p>
            <p>Tente outro termo ou navegue pelas áreas principais.</p>
            <Link className="link-arrow" href="/sitemap/">Mapa do site →</Link>
          </div>
        )}
      </div>
    </>
  );
}
