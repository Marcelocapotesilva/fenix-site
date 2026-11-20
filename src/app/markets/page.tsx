import type { Metadata } from 'next';
import { Figure, Notice, PageHero } from '@/components/ui';
import { MARKETS } from '@/content/markets';

export const metadata: Metadata = { title: 'Selected Markets', description: 'Europa, Brasil e América Latina — status de cada mercado.' };

export default function MarketsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Selected Markets' }]} eyebrow="Selected Markets" title="Europa, Brasil e América Latina." intro="Cada mercado é apresentado com seu status real. Território de interesse não equivale a operação local constituída." />
      {MARKETS.map((m, i) => (
        <section key={m.slug} className={`section ${i % 2 ? 'section--band' : ''}`} aria-labelledby={`m-${m.slug}`}>
          <div className="container grid">
            <div className="col-7 stack-lg">
              <p className="eyebrow">{String(i + 1).padStart(2, '0')} · {m.statusLabel}</p>
              <h2 id={`m-${m.slug}`} className="display" style={{ fontSize: 'clamp(56px, 9vw, 120px)' }}>{m.name}</h2>
              <p className="lead measure">{m.text}</p>
              <dl className="dl">
                <div><dt>Frentes</dt><dd>{m.focus.join(' · ')}</dd></div>
                <div><dt>Operação local</dt><dd className="pending">{m.localOperation}</dd></div>
              </dl>
            </div>
            <div className="col-4 col-start-9">
              {m.image ? <Figure image={m.image} ratio="4x5" /> : <Figure ratio="4x5" pendingLabel={`fotografia ${m.name}`} />}
            </div>
          </div>
        </section>
      ))}
      <section className="section--tight">
        <div className="container">
          <Notice title="Governança da informação">A FÊNIX só indicará escritórios, entidades ou equipes locais após confirmação jurídica e autorização de publicação.</Notice>
        </div>
      </section>
    </>
  );
}
