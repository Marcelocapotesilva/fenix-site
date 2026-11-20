'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelection, type SelectedItem } from '@/lib/selection';

export function AddToSelection({ item, compact = false }: { item: SelectedItem; compact?: boolean }) {
  const { has, toggle, ready } = useSelection();
  const selected = ready && has(item.slug);
  return (
    <button
      type="button"
      className={compact ? 'chip' : 'btn'}
      aria-pressed={selected}
      onClick={() => toggle(item)}
      disabled={!ready}
    >
      {selected ? '✓ Na lista de interesse' : '+ Lista de interesse'}
    </button>
  );
}

export function SelectionBar() {
  const { items, clear, ready } = useSelection();
  const pathname = usePathname() || '';
  if (!ready || items.length === 0 || pathname.startsWith('/portfolio/selection') || pathname.startsWith('/partner-access')) return null;
  return (
    <div className="selection-bar" role="region" aria-label="Lista de interesse">
      <div className="container selection-bar__inner">
        <span className="eyebrow">
          Lista de interesse · {items.length} {items.length === 1 ? 'item' : 'itens'}
        </span>
        <span className="row" style={{ gap: 24 }}>
          <button type="button" className="text-btn" onClick={clear}>Limpar</button>
          <Link href="/portfolio/selection/" className="btn btn--light btn--sm">Solicitar cotação ou amostras</Link>
        </span>
      </div>
    </div>
  );
}

export function SelectionList() {
  const { items, remove, ready } = useSelection();
  if (!ready) return <div className="skeleton" style={{ height: 120 }} aria-label="Carregando lista" />;
  if (!items.length)
    return (
      <div className="empty" role="status">
        <p className="eyebrow">Lista vazia</p>
        <p className="empty__title">Sua lista de interesse ainda não tem itens.</p>
        <p>Adicione ingredientes, produtos ou oportunidades a partir do Portfolio. A lista fica salva apenas neste navegador.</p>
        <Link href="/portfolio/" className="link-arrow">Abrir o Portfolio →</Link>
      </div>
    );
  return (
    <ul className="catalog">
      {items.map((i) => (
        <li key={i.slug} className="catalog-row" style={{ gridTemplateColumns: '1fr auto' }}>
          <span>
            <span className="eyebrow muted">{i.type}</span>
            <Link href={`/portfolio/${i.slug}/`} className="catalog-row__title" style={{ display: 'block' }}>{i.name}</Link>
          </span>
          <button type="button" className="text-btn" onClick={() => remove(i.slug)} aria-label={`Remover ${i.name}`}>Remover</button>
        </li>
      ))}
    </ul>
  );
}
