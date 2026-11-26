import type { Metadata } from 'next';
import Link from 'next/link';
import { EmptyState, PageHero } from '@/components/ui';
import { JOURNAL_CATEGORIES } from '@/content/journal';
import { getPosts } from '@/lib/cms';
import { formatDatePt } from '@/lib/text';

export const metadata: Metadata = { title: 'Journal', description: 'Revista digital da FÊNIX: mercado, varejo, origens, indústria, cultura e perfumaria.' };

export default function JournalPage() {
  const posts = getPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero crumbs={[{ label: 'Journal' }]} eyebrow="Journal" title={<>The FÊNIX <span className="italic">Journal.</span></>} intro="Inteligência de mercado, varejo e luxo, origens e ingredientes, indústria, cultura e bastidores da FÊNIX." />
      <nav className="section--tight" aria-label="Editorias" style={{ paddingBottom: 0 }}>
        <div className="container">
          <ul className="chips">
            {JOURNAL_CATEGORIES.map((c) => {
              const n = posts.filter((p) => p.category === c).length;
              return <li key={c}><span className="tag" aria-label={`${c}: ${n} artigos`}>{c} · {n}</span></li>;
            })}
          </ul>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          {!lead ? (
            <EmptyState title="A primeira edição do Journal está em preparação." />
          ) : (
            <>
              <Link href={`/journal/${lead.slug}/`} className="grid" style={{ alignItems: 'end' }}>
                <div className="col-7">
                  {lead.image ? (
                    <div className="media media--3x2">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={lead.image} alt={lead.imageCaption || ''} /></div>
                  ) : (
                    <div className="article-cover" style={{ aspectRatio: '3 / 2' }} aria-hidden="true"><span className="display" style={{ fontSize: 'clamp(40px, 5vw, 76px)' }}>{lead.category}</span></div>
                  )}
                </div>
                <div className="col-5 stack">
                  <div className="entry__meta"><span className="eyebrow">{lead.category}</span><time className="eyebrow" dateTime={lead.date}>{formatDatePt(lead.date)}</time></div>
                  <h2 className="h1" style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}>{lead.title}</h2>
                  <p className="lead muted">{lead.subtitle}</p>
                  <p className="eyebrow">Por {lead.author}</p>
                </div>
              </Link>
              {rest.length > 0 && (
                <div className="entries mt-16">
                  {rest.map((p) => (
                    <Link key={p.slug} href={`/journal/${p.slug}/`} className="entry">
                      <div className="entry__meta"><span className="eyebrow">{p.category}</span><time className="eyebrow" dateTime={p.date}>{formatDatePt(p.date)}</time></div>
                      <h3 className="entry__title">{p.title}</h3>
                      <p className="entry__text">{p.subtitle}</p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
