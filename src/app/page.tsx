import Link from 'next/link';
import { LogoPlate } from '@/components/Logo';
import { RequestForm } from '@/components/RequestForm';
import { ArrowLink, EmptyState, Figure, IndexList, SectionHead, StageBadge } from '@/components/ui';
import { EXPERTISE } from '@/content/expertise';
import { GRAND_TOUR_ENTRIES } from '@/content/grand-tour';
import { IMAGES } from '@/content/images';
import { JOURNEYS } from '@/content/journeys';
import { MARKETS } from '@/content/markets';
import { APPROACH } from '@/content/site';
import { getPosts, getPublicCatalog, getPublicMaisons, getPublicProjects } from '@/lib/cms';
import { formatDatePt } from '@/lib/text';
import { AVAILABILITY_LABEL } from '@/lib/types';

export default function HomePage() {
  const maisons = getPublicMaisons();
  const catalog = getPublicCatalog().slice(0, 3);
  const projects = getPublicProjects().slice(0, 3);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* 01 — Hero institucional */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__text">
            <p className="eyebrow">FÊNIX — Fragrances Holding · Perfumaria, beleza e luxo</p>
            <div className="stack-lg">
              <h1 id="hero-title" className="display">
                Grandes marcas merecem mercados à altura de sua <span className="italic">ambição.</span>
              </h1>
              <p className="lead measure" style={{ maxWidth: '46ch' }}>
                Representação internacional, desenvolvimento de mercados e projetos especiais para empresas que desejam crescer com direção comercial, identidade e relações duradouras.
              </p>
              <div className="hero__actions">
                <Link href="/our-expertise/" className="btn">Explorar nossos universos</Link>
                <ArrowLink href="/contact/">Desenvolver um projeto</ArrowLink>
              </div>
            </div>
          </div>
          <div className="hero__logo">
            <LogoPlate fluid priority />
          </div>
        </div>
        <Link href="/grand-tour/" className="feature-strip" aria-label="FÊNIX Grand Tour — experiências e viagens privadas">
          <div className="feature-strip__media" style={{ minHeight: 260 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.river.src} srcSet={`${IMAGES.river.srcSm} 800w, ${IMAGES.river.src} 1600w`} sizes="(max-width: 900px) 100vw, 58vw" alt={IMAGES.river.alt} style={{ objectPosition: '50% 40%' }} />
          </div>
          <div className="feature-strip__body">
            <p className="eyebrow text-champagne">Destaque · Grand Tour</p>
            <p className="h2">Jornadas curadas pelo universo da perfumaria e do luxo.</p>
            <span className="link-arrow">Conhecer o Grand Tour <span className="arr" aria-hidden="true">→</span></span>
          </div>
        </Link>
      </section>

      {/* 02 — Who We Work With */}
      <section className="section" aria-labelledby="s2">
        <div className="container">
          <SectionHead num="02" label="Who We Work With" id="s2" title="Seis jornadas comerciais. Uma direção." aside={<p className="muted">Escolha o seu ponto de partida: cada jornada tem página própria e formulário contextual.</p>} />
          <div className="journeys">
            {JOURNEYS.map((j) => (
              <Link key={j.slug} href={`/who-we-work-with/${j.slug}/`} className="journey">
                <span className="eyebrow">{j.number}</span>
                <span>
                  <span className="journey__title" style={{ display: 'block' }}>{j.name}</span>
                  <span className="body-sm muted" style={{ display: 'block', marginTop: 12 }}>{j.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Selected Maisons */}
      <section className="section section--band" aria-labelledby="s3">
        <div className="container">
          <SectionHead num="03" label="Selected Maisons" id="s3" title="Maisons representadas" aside={<ArrowLink href="/maisons/">Diretório de maisons</ArrowLink>} />
          {maisons.length === 0 ? (
            <EmptyState
              title="A vitrine de maisons será publicada mediante autorização de cada marca."
              action={<ArrowLink href="/who-we-work-with/maisons-and-brands/">Apresentar uma maison</ArrowLink>}
            >
              <p>Nenhuma maison é exibida publicamente sem contrato e autorização formal de publicação registrados no CMS.</p>
            </EmptyState>
          ) : null}
        </div>
      </section>

      {/* 04 — Portfolio & Opportunities */}
      <section className="section" aria-labelledby="s4">
        <div className="container">
          <SectionHead num="04" label="Portfolio & Opportunities" id="s4" title="Fragrâncias, ingredientes e oportunidades comerciais." aside={<ArrowLink href="/portfolio/">Abrir o catálogo B2B</ArrowLink>} />
          <div className="entries">
            {catalog.map((c) => (
              <Link key={c.slug} href={`/portfolio/${c.slug}/`} className="entry">
                <Figure image={c.image} ratio="4x5" pendingLabel={c.name} showRights={false} sizes="(max-width: 900px) 100vw, 33vw" />
                <div className="entry__meta">
                  <span className="eyebrow">{c.type} · {c.category}</span>
                  <span className="status status--development">{AVAILABILITY_LABEL[c.availability]}</span>
                </div>
                <h3 className="entry__title">{c.name}</h3>
                <p className="entry__text">{c.summary}</p>
              </Link>
            ))}
          </div>
          <p className="caption muted mt-8">Preços, estoque e condições comerciais não são publicados. Cotações e amostras são tratadas no canal B2B.</p>
        </div>
      </section>

      {/* 05 — Our Expertise */}
      <section className="section section--ruled" aria-labelledby="s5">
        <div className="container">
          <SectionHead num="05" label="Our Expertise" id="s5" title="Oito especialidades, um mesmo padrão de execução." aside={<ArrowLink href="/our-expertise/">Todas as especialidades</ArrowLink>} />
          <IndexList rows={EXPERTISE.map((e) => ({ num: e.number, title: e.name, desc: e.short, href: e.externalPage || `/our-expertise/${e.slug}/` }))} />
        </div>
      </section>

      {/* 06 — Special Projects */}
      <section className="section section--band" aria-labelledby="s6">
        <div className="container">
          <SectionHead num="06" label="Special Projects" id="s6" title="Projetos, estudos e conceitos — cada um com o seu estágio real." aside={<ArrowLink href="/special-projects/">Biblioteca de projetos</ArrowLink>} />
          <div className="entries">
            {projects.map((p) => (
              <Link key={p.slug} href={`/special-projects/${p.slug}/`} className="entry">
                <Figure image={p.image} ratio="3x2" pendingLabel={p.title} showRights={false} sizes="(max-width: 900px) 100vw, 33vw" />
                <div className="entry__meta"><span className="eyebrow">{p.category}</span><StageBadge stage={p.stage} /></div>
                <h3 className="entry__title">{p.title}</h3>
                <p className="entry__text">{p.stageNote}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Selected Markets */}
      <section className="section" aria-labelledby="s7">
        <div className="container">
          <SectionHead num="07" label="Selected Markets" id="s7" title="Europa, Brasil e América Latina." aside={<p className="muted">Território de interesse não é operação local constituída — indicamos o status de cada mercado.</p>} />
          <div className="markets">
            {MARKETS.map((m) => (
              <div key={m.slug} className="market">
                <span className="eyebrow">{m.statusLabel}</span>
                <h3 className="market__name">{m.name}</h3>
                <p className="body-sm muted">{m.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8"><ArrowLink href="/markets/">Detalhes por mercado</ArrowLink></p>
        </div>
      </section>

      {/* 08 — Our Approach */}
      <section className="section section--band" aria-labelledby="s8">
        <div className="container">
          <SectionHead num="08" label="Our Approach" id="s8" title="Discover → Validate → Structure → Activate → Grow." />
          <ol className="steps">
            {APPROACH.map((s, i) => (
              <li key={s.name}>
                <span className="eyebrow muted">{String(i + 1).padStart(2, '0')} · {s.pt}</span>
                <p className="step-name">{s.name}</p>
                <p className="body-sm muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 09 — Grand Tour */}
      <section className="section section--black" aria-labelledby="s9">
        <div className="container">
          <div className="grid" style={{ alignItems: 'end' }}>
            <div className="col-7">
              <Figure image={IMAGES.river} ratio="16x9" sizes="(max-width: 900px) 100vw, 58vw" />
            </div>
            <div className="col-5 stack-lg">
              <p className="eyebrow text-champagne"><span className="numeral" style={{ fontSize: 12, marginRight: 12 }}>09</span>FÊNIX Grand Tour</p>
              <h2 id="s9" className="h1">Experiências e viagens privadas.</h2>
              <ul className="index-list" style={{ borderColor: 'rgba(243,240,233,.4)' }}>
                {GRAND_TOUR_ENTRIES.map((g) => (
                  <li key={g.slug} style={{ borderColor: 'rgba(243,240,233,.4)' }}>
                    <Link href={`/grand-tour/${g.slug}/`} className="row row--between" style={{ padding: '16px 0' }}>
                      <span className="h3">{g.name}</span><span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/grand-tour/" className="btn btn--light">Registrar interesse</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — Journal */}
      <section className="section" aria-labelledby="s10">
        <div className="container">
          <SectionHead num="10" label="Journal" id="s10" title="Notas sobre mercado, cultura e perfumaria." aside={<ArrowLink href="/journal/">Todos os artigos</ArrowLink>} />
          {posts.length ? (
            <div className="entries entries--2">
              {posts.map((p) => (
                <Link key={p.slug} href={`/journal/${p.slug}/`} className="entry">
                  {p.image ? (
                    <div className="media media--3x2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.imageCaption || ''} loading="lazy" />
                    </div>
                  ) : (
                    <div className="article-cover" style={{ aspectRatio: '3 / 2' }} aria-hidden="true">
                      <span className="h2" style={{ maxWidth: '16ch' }}>{p.category}</span>
                    </div>
                  )}
                  <div className="entry__meta">
                    <span className="eyebrow">{p.category}</span>
                    <time className="eyebrow" dateTime={p.date}>{formatDatePt(p.date)}</time>
                  </div>
                  <h3 className="entry__title">{p.title}</h3>
                  <p className="entry__text">{p.subtitle}</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="A primeira edição do Journal está em preparação." />
          )}
        </div>
      </section>

      {/* 11 — Start a Project */}
      <section className="section section--band" aria-labelledby="s11" id="start-a-project">
        <div className="container">
          <div className="grid">
            <div className="col-4 stack">
              <p className="eyebrow"><span className="numeral" style={{ fontSize: 12, marginRight: 12 }}>11</span>Start a Project</p>
              <h2 id="s11" className="h1">Vamos desenvolver o seu próximo mercado.</h2>
              <p className="muted">Conte o que você deseja desenvolver. A solicitação é classificada por categoria e território e encaminhada ao responsável.</p>
            </div>
            <div className="col-8">
              <RequestForm formId="home-start-a-project" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
