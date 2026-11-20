import Link from 'next/link';
import { LogoPlate } from '@/components/Logo';
import { RequestForm } from '@/components/RequestForm';
import { ArrowLink, IndexList, SectionHead, StageBadge } from '@/components/ui';
import { EXPERTISE } from '@/content/expertise';
import { GRAND_TOUR_ENTRIES } from '@/content/grand-tour';
import { IMAGES } from '@/content/images';
import { JOURNEYS } from '@/content/journeys';
import { MARKETS } from '@/content/markets';
import { APPROACH, POSITIONING_LINE } from '@/content/site';
import { getPosts, getPublicCatalog, getPublicMaisons, getPublicProjects } from '@/lib/cms';
import { formatDatePt } from '@/lib/text';
import type { ImageRef } from '@/lib/types';
import { AVAILABILITY_LABEL } from '@/lib/types';

function Visual({ image, word, ratio = '4x5' }: { image?: ImageRef; word: string; ratio?: '4x5' | '3x2' }) {
  return image ? (
    <div className={`media media--${ratio}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.srcSm || image.src} srcSet={image.srcSm ? `${image.srcSm} 800w, ${image.src} 1600w` : undefined} sizes="(max-width: 900px) 100vw, 33vw" alt={image.alt} loading="lazy" decoding="async" />
    </div>
  ) : (
    <div className={`media media--${ratio} plate`} aria-hidden="true"><span className="plate__word">{word}</span></div>
  );
}

export default function HomePage() {
  const maisons = getPublicMaisons();
  const catalog = getPublicCatalog().slice(0, 3);
  const projects = getPublicProjects().slice(0, 3);
  const posts = getPosts().slice(0, 2);

  return (
    <>
      {/* 01 — Hero institucional */}
      <section className="noir-hero" aria-labelledby="hero-title">
        <div className="noir-hero__logo"><LogoPlate fluid priority /></div>
        <h1 id="hero-title" className="noir-hero__title">
          Grandes marcas merecem mercados à altura de sua <em>ambição</em>.
        </h1>
        <p className="noir-hero__sub">
          Representação internacional, desenvolvimento de mercados e projetos especiais para empresas que desejam crescer com direção comercial, identidade e relações duradouras.
        </p>
        <div className="noir-hero__actions">
          <Link href="/our-expertise/" className="btn">Explorar nossos universos</Link>
          <ArrowLink href="/contact/">Desenvolver um projeto</ArrowLink>
        </div>
        <span className="noir-hero__cue" aria-hidden="true" />
      </section>

      {/* Grand Tour — destaque imediato */}
      <Link href="/grand-tour/" className="feature" aria-label="FÊNIX Grand Tour — experiências e viagens privadas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="feature__img" src={IMAGES.river.src} srcSet={`${IMAGES.river.srcSm} 800w, ${IMAGES.river.src} 1600w`} sizes="100vw" alt={IMAGES.river.alt} />
        <span className="feature__shade" aria-hidden="true" />
        <span className="container feature__body grid" style={{ alignItems: 'end' }}>
          <span className="col-7">
            <span className="eyebrow text-gold" style={{ display: 'block' }}>FÊNIX Grand Tour</span>
            <span className="display" style={{ display: 'block', marginTop: 16 }}>Grand Tour</span>
          </span>
          <span className="col-4 col-start-9 stack">
            <span className="lead" style={{ display: 'block' }}>Jornadas curadas pelo universo da perfumaria e do luxo — ateliês, origens, maisons e destinos culturais.</span>
            <span className="link-arrow">Conhecer as jornadas <span className="arr" aria-hidden="true">→</span></span>
          </span>
        </span>
      </Link>

      {/* 02 — Who We Work With */}
      <section className="section" aria-labelledby="s2">
        <div className="container reveal">
          <SectionHead label="Who We Work With" id="s2" title={<>Com quem <span className="italic">trabalhamos</span></>} aside={<p>{POSITIONING_LINE}</p>} />
          <div className="journeys">
            {JOURNEYS.map((j) => (
              <Link key={j.slug} href={`/who-we-work-with/${j.slug}/`} className="journey">
                <span className="eyebrow">{j.number}</span>
                <span>
                  <span className="journey__title" style={{ display: 'block' }}>{j.name}</span>
                  <span className="body-sm muted" style={{ display: 'block', marginTop: 14 }}>{j.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Selected Maisons */}
      <section className="section section--band" aria-labelledby="s3">
        <div className="container grid reveal" style={{ alignItems: 'center' }}>
          <div className="col-5">
            <p className="eyebrow text-gold">Selected Maisons</p>
            <h2 id="s3" className="h1 mt-6">Maisons</h2>
          </div>
          <div className="col-6 col-start-7 stack-lg">
            {maisons.length === 0 && (
              <>
                <p className="lead">Cada maison representada é apresentada aqui com sua história, coleções e mercados — sempre com a autorização da própria marca.</p>
                <p className="muted measure">Para casas que avaliam novos territórios, a conversa começa por um diagnóstico do mercado e do papel de cada parceiro local.</p>
                <div className="row">
                  <Link href="/who-we-work-with/maisons-and-brands/" className="btn">Apresentar uma maison</Link>
                  <ArrowLink href="/maisons/">Diretório</ArrowLink>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 04 — Portfolio & Opportunities */}
      <section className="section" aria-labelledby="s4">
        <div className="container reveal">
          <SectionHead label="Portfolio & Opportunities" id="s4" title={<>Ingredientes e <span className="italic">oportunidades</span></>} aside={<><p>Matérias-primas amazônicas em avaliação técnica e comercial. Preços e condições ficam restritos ao canal B2B.</p><p className="mt-4"><ArrowLink href="/portfolio/">Abrir o catálogo</ArrowLink></p></>} />
          <div className="entries">
            {catalog.map((c) => (
              <Link key={c.slug} href={`/portfolio/${c.slug}/`} className="entry">
                <Visual image={c.image} word={c.name} />
                <div className="entry__meta"><span className="eyebrow">{c.category}</span><span className="status status--development">{AVAILABILITY_LABEL[c.availability]}</span></div>
                <h3 className="entry__title">{c.name}</h3>
                <p className="entry__text">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Our Expertise */}
      <section className="section section--band" aria-labelledby="s5">
        <div className="container reveal">
          <SectionHead label="Our Expertise" id="s5" title={<>Oito <span className="italic">especialidades</span></>} aside={<ArrowLink href="/our-expertise/">Ver todas</ArrowLink>} />
          <IndexList rows={EXPERTISE.map((e) => ({ num: e.number, title: e.name, desc: e.short, href: e.externalPage || `/our-expertise/${e.slug}/` }))} />
        </div>
      </section>

      {/* 06 — Special Projects */}
      <section className="section" aria-labelledby="s6">
        <div className="container reveal">
          <SectionHead label="Special Projects" id="s6" title={<>Projetos <span className="italic">especiais</span></>} aside={<><p>Estudos, conceitos e projetos em andamento, cada um com o seu estágio real.</p><p className="mt-4"><ArrowLink href="/special-projects/">Biblioteca de projetos</ArrowLink></p></>} />
          <div className="entries">
            {projects.map((p) => (
              <Link key={p.slug} href={`/special-projects/${p.slug}/`} className="entry">
                <Visual image={p.image} word={p.title} ratio="3x2" />
                <div className="entry__meta"><span className="eyebrow">{p.track || p.category}</span><StageBadge stage={p.stage} /></div>
                <h3 className="entry__title">{p.title}</h3>
                <p className="entry__text">{p.stageNote}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Selected Markets */}
      <section className="section section--band" aria-labelledby="s7">
        <div className="container reveal">
          <SectionHead label="Selected Markets" id="s7" title={<>Três <span className="italic">territórios</span></>} aside={<><p>Indicamos o status de cada mercado: território de interesse não é operação local constituída.</p><p className="mt-4"><ArrowLink href="/markets/">Detalhes por mercado</ArrowLink></p></>} />
          <div className="markets">
            {MARKETS.map((m) => (
              <div key={m.slug} className="market">
                <span className="eyebrow">{m.statusLabel}</span>
                <h3 className="market__name">{m.name}</h3>
                <p className="body-sm muted">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Our Approach */}
      <section className="section" aria-labelledby="s8">
        <div className="container reveal">
          <SectionHead label="Our Approach" id="s8" title={<>Do diagnóstico ao <span className="italic">crescimento</span></>} />
          <ol className="steps">
            {APPROACH.map((s) => (
              <li key={s.name}>
                <span className="eyebrow">{s.pt}</span>
                <p className="step-name">{s.name}</p>
                <p className="body-sm muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 09 — Grand Tour */}
      <section className="section section--band" aria-labelledby="s9">
        <div className="container grid reveal" style={{ alignItems: 'center' }}>
          <div className="col-6">
            <div className="media media--4x5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.brazilNut.srcSm} srcSet={`${IMAGES.brazilNut.srcSm} 800w, ${IMAGES.brazilNut.src} 1600w`} sizes="(max-width: 900px) 100vw, 50vw" alt={IMAGES.brazilNut.alt} loading="lazy" />
            </div>
          </div>
          <div className="col-5 col-start-8 stack-lg">
            <p className="eyebrow text-gold">FÊNIX Grand Tour</p>
            <h2 id="s9" className="h1">Experiências e viagens <span className="italic">privadas</span></h2>
            <ul className="index-list">
              {GRAND_TOUR_ENTRIES.map((g) => (
                <li key={g.slug}>
                  <Link href={`/grand-tour/${g.slug}/`} className="index-row" style={{ gridTemplateColumns: '40px 1fr 24px' }}>
                    <span className="index-row__num">{g.number}</span>
                    <span className="index-row__title" style={{ fontSize: 'clamp(24px, 2.2vw, 32px)' }}>{g.name}</span>
                    <span className="index-row__arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/grand-tour/#formulario" className="btn">Registrar interesse</Link>
          </div>
        </div>
      </section>

      {/* 10 — Journal */}
      <section className="section" aria-labelledby="s10">
        <div className="container reveal">
          <SectionHead label="Journal" id="s10" title={<>Notas de <span className="italic">mercado</span></>} aside={<ArrowLink href="/journal/">Todos os artigos</ArrowLink>} />
          {posts.map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}/`} className="grid entry" style={{ alignItems: 'end', display: 'grid' }}>
              <div className="col-7">
                <h3 className="h2" style={{ transition: 'color var(--dur) var(--ease)' }}>{p.title}</h3>
              </div>
              <div className="col-4 col-start-9 stack">
                <p className="eyebrow muted">{p.category} · <time dateTime={p.date}>{formatDatePt(p.date)}</time></p>
                <p className="muted">{p.subtitle}</p>
                <span className="link-arrow">Ler o artigo <span className="arr" aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11 — Start a Project */}
      <section className="section section--bordo" aria-labelledby="s11" id="start-a-project">
        <div className="container grid reveal">
          <div className="col-4 stack-lg">
            <p className="eyebrow text-gold">Start a Project</p>
            <h2 id="s11" className="h1">Vamos falar do seu próximo <span className="italic">mercado</span></h2>
            <p className="muted">Conte o que você deseja desenvolver. A solicitação é classificada por categoria e território e encaminhada ao responsável.</p>
          </div>
          <div className="col-7 col-start-6">
            <RequestForm formId="home-start-a-project" />
          </div>
        </div>
      </section>
    </>
  );
}
