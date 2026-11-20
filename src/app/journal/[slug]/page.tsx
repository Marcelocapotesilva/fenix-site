import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLink, Breadcrumb } from '@/components/ui';
import { SITE } from '@/content/site';
import { getPost } from '@/content/journal';
import { getPosts } from '@/lib/cms';
import { formatDatePt } from '@/lib/text';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/journal/${p.slug}/` },
    openGraph: { type: 'article', title: p.seoTitle, description: p.seoDescription, publishedTime: p.date, authors: [p.author] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const related = getPosts().filter((x) => x.slug !== p.slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t)))).slice(0, 3);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.seoDescription,
    datePublished: p.date, author: { '@type': 'Person', name: p.author }, publisher: { '@type': 'Organization', name: SITE.name },
  };
  return (
    <article lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="article-head">
        <div className="container">
          <div lang="pt-BR"><Breadcrumb items={[{ label: 'Journal', href: '/journal/' }, { label: p.category }]} /></div>
          <div className="grid">
            <div className="col-8">
              <p className="eyebrow mb-4">{p.category}</p>
              <h1 className="h1">{p.title}</h1>
            </div>
            <div className="col-4 stack" style={{ alignSelf: 'end' }}>
              <p className="lead">{p.subtitle}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        {p.image ? (
          <figure className="figure">
            <div className="media media--16x9">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.image} alt={p.imageCaption || ''} /></div>
            {p.imageCaption && <figcaption>{p.imageCaption}</figcaption>}
          </figure>
        ) : (
          <div className="article-cover" aria-hidden="true"><span className="display">{p.category}</span></div>
        )}
      </div>
      <section className="section">
        <div className="container article-layout">
          <aside className="article-layout__meta" lang="pt-BR">
            <div className="rule-top"><p className="eyebrow muted">Autor</p><p>{p.author}</p></div>
            <div className="rule-top"><p className="eyebrow muted">Publicado em</p><p><time dateTime={p.date}>{formatDatePt(p.date)}</time></p></div>
            {p.tags.length > 0 && <div className="rule-top"><p className="eyebrow muted mb-4">Tags</p><div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div></div>}
            <div className="rule-top"><p className="eyebrow muted">Idioma</p><p className="body-sm">Artigo publicado em inglês.</p></div>
          </aside>
          <div className="prose">
            {p.body.map((para, i) => <p key={i}>{para}</p>)}
            {p.bio && <p className="bio">{p.bio}</p>}
            {p.references.length > 0 && (
              <div className="mt-10">
                <h2>References</h2>
                <ol style={{ listStyle: 'decimal', paddingLeft: 20, fontSize: 15 }}>{p.references.map((r) => <li key={r} style={{ marginTop: 8 }}>{r}</li>)}</ol>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section section--band" lang="pt-BR">
        <div className="container">
          <div className="row row--between mb-8"><p className="eyebrow">Artigos relacionados</p><ArrowLink href="/journal/">Journal</ArrowLink></div>
          {related.length ? (
            <div className="entries">
              {related.map((r) => (
                <Link key={r.slug} href={`/journal/${r.slug}/`} className="entry">
                  <div className="entry__meta"><span className="eyebrow">{r.category}</span></div>
                  <h3 className="entry__title">{r.title}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="muted">Novos artigos desta editoria serão listados aqui.</p>
          )}
        </div>
      </section>
    </article>
  );
}
