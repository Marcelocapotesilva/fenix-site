import Link from 'next/link';
import { LogoPlate } from '@/components/Logo';
import { RequestForm } from '@/components/RequestForm';
import { ArrowLink, SectionHead, StageBadge } from '@/components/ui';
import { EXPERTISE } from '@/content/expertise';
import { GRAND_TOUR_ENTRIES } from '@/content/grand-tour';
import { IMAGES } from '@/content/images';
import { JOURNEYS } from '@/content/journeys';
import { MARKETS } from '@/content/markets';
import { APPROACH, POSITIONING_LINE, PRINCIPLES, SITE } from '@/content/site';
import { getPosts, getPublicCatalog, getPublicMaisons, getPublicProjects } from '@/lib/cms';
import { formatDatePt } from '@/lib/text';
import type { ImageRef } from '@/lib/types';
import { AVAILABILITY_LABEL } from '@/lib/types';

function Img({ image, sizes = '(max-width: 900px) 100vw, 33vw', eager = false }: { image: ImageRef; sizes?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image.srcSm || image.src} srcSet={image.srcSm ? `${image.srcSm} 800w, ${image.src} 1600w` : undefined} sizes={sizes} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function HomePage() {
  const maisons = getPublicMaisons();
  const allCatalog = getPublicCatalog();
  const catalog = [allCatalog.find((c) => c.slug === 'oleo-copaiba'), allCatalog.find((c) => c.slug === 'oleo-andiroba'), allCatalog.find((c) => c.slug === 'manteiga-cupuacu'), allCatalog.find((c) => c.slug === 'oleo-pau-rosa'), allCatalog.find((c) => c.category === 'Pure Fragrance Oils'), allCatalog.find((c) => c.category === 'Essential Oils')].filter((c): c is NonNullable<typeof c> => Boolean(c));
  const projects = getPublicProjects();
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* 01 — Hero institucional */}
      <section className="st-hero" aria-labelledby="hero-title">
        <span className="st-hero__glow-a" aria-hidden="true" />
        <span className="st-hero__glow-b" aria-hidden="true" />
        <div className="container st-hero__inner">
          <div className="st-strip">
            <span className="text-gold">Perfumaria · Beleza · Luxo</span>
            <span className="muted">Representação · Mercados · Projetos especiais</span>
          </div>
          <div className="st-hero__grid">
            <div className="st-hero__text">
              <h1 id="hero-title" className="st-hero__title">
                Grandes marcas merecem mercados à altura de sua <em>ambição.</em>
              </h1>
              <p className="lead mt-8" style={{ maxWidth: '56ch' }}>
                Representação internacional, desenvolvimento de mercados e projetos especiais para empresas que desejam crescer com direção comercial, identidade e relações duradouras.
              </p>
              <div className="row mt-10" style={{ gap: 16 }}>
                <Link href="/our-expertise/" className="btn btn--primary">Explorar nossos universos</Link>
                <Link href="/contact/" className="btn">Desenvolver um projeto</Link>
              </div>
              <div className="st-ledger">
                <div><span className="serial">Especialidades</span><b>08 <span>universos</span></b></div>
                <div><span className="serial">Jornadas</span><b>06 <span>comerciais</span></b></div>
                <div><span className="serial">Mercados</span><b>03 <span>territórios</span></b></div>
              </div>
            </div>
            <div className="st-hero__plate">
              <div className="plate-frame">
                <div className="media media--4x5"><Img image={IMAGES.copaiba} sizes="(max-width: 900px) 100vw, 40vw" eager /></div>
                <span className="stamp" style={{ top: 28, right: 28, padding: '8px 12px' }}><span className="serial">Proveniência · Amazônia</span></span>
              </div>
              <Link href="/grand-tour/" className="stamp dossier--link" style={{ left: -28, bottom: -28, display: 'block' }}>
                <span className="serial" style={{ display: 'block' }}>Destaque · FÊNIX Grand Tour</span>
                <span className="body-sm" style={{ display: 'block', marginTop: 8, color: 'var(--ivory)' }}>Jornadas curadas pelo universo da perfumaria e do luxo.</span>
                <span className="link-arrow mt-2">Conhecer <span className="arr" aria-hidden="true">→</span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Who We Work With (abre com o manifesto) */}
      <section className="section" aria-labelledby="s2">
        <div className="container reveal">
          <div className="grid" style={{ alignItems: 'center' }}>
            <div className="col-4">
              <div className="seal"><LogoPlate fluid /></div>
            </div>
            <div className="col-7 col-start-6 stack-lg">
              <p className="serial text-gold">Manifesto · Emotion · Logic · Perception</p>
              <p className="st-quote">“A emoção desperta o desejo. <em>A lógica orienta o capital.</em> A percepção constrói autoridade duradoura.”</p>
              <div className="grid" style={{ rowGap: 24 }}>
                <div className="col-6 rule-top">
                  <p className="serial text-gold">Presença não é operação</p>
                  <p className="body-sm muted mt-3">{POSITIONING_LINE} Distribuição cria presença; coordenação cria operação.</p>
                </div>
                <div className="col-6 rule-top">
                  <p className="serial text-gold">Princípios</p>
                  <ul className="body-sm muted mt-3" style={{ display: 'grid', gap: 6 }}>{PRINCIPLES.map((p) => <li key={p.name}>{p.name}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16" style={{ paddingTop: 'var(--space-16)', borderTop: '1px solid rgba(113,110,101,.25)' }}>
            <SectionHead label="02 / Who We Work With" id="s2" title={<>Com quem <em>trabalhamos</em></>} aside={<p>Seis jornadas comerciais, cada uma com página própria e formulário contextual.</p>} />
            <div className="dossier-grid dossier-grid--3">
              {JOURNEYS.map((j, i) => (
                <Link key={j.slug} href={`/who-we-work-with/${j.slug}/`} className="dossier">
                  <span className="serial">[ {pad(i + 1)} / 06 ]</span>
                  <h3 className="dossier__title">{j.name}</h3>
                  <p className="dossier__text">{j.short}</p>
                  <span className="dossier__foot"><span className="serial text-gold">{j.intent}</span><span className="text-gold" aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Selected Maisons */}
      <section className="section section--band" aria-labelledby="s3">
        <div className="container reveal">
          <SectionHead label="03 / Selected Maisons" id="s3" title={<>Maisons <em>representadas</em></>} aside={<ArrowLink href="/maisons/">Diretório completo</ArrowLink>} />
          <div className="table-wrap">
            <table className="table table--archive">
              <thead>
                <tr>{['Índice', 'Maison', 'Origem', 'Categorias', 'Mercados', 'Status'].map((h) => <th key={h} scope="col">{h}</th>)}</tr>
              </thead>
              <tbody>
                {maisons.length === 0 && (
                  <tr>
                    <td>MSN-—</td>
                    <td colSpan={4} style={{ paddingBlock: 28 }}>
                      <span className="h3" style={{ display: 'block' }}>Publicação mediante autorização de cada maison</span>
                      <span className="body-sm muted" style={{ display: 'block', marginTop: 8 }}>O arquivo de maisons representadas é exibido aqui assim que cada marca aprova a sua página.</span>
                    </td>
                    <td><Link href="/who-we-work-with/maisons-and-brands/" className="text-btn">Apresentar uma maison</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 04 — Portfolio & Opportunities */}
      <section className="section" aria-labelledby="s4">
        <div className="container reveal">
          <SectionHead label="04 / Portfolio & Opportunities" id="s4" title={<>Portfólio de <em>óleos</em></>} aside={<><p>{allCatalog.length} itens entre óleos vegetais, manteigas, fragrance oils e essential oils — portfólio nacional e internacional. Preços e condições no canal B2B.</p><p className="mt-4"><ArrowLink href="/portfolio/">Abrir o catálogo completo</ArrowLink></p></>} />
          <div className="table-wrap">
            <table className="table table--archive">
              <thead><tr>{['Índice', 'Item', 'Linha', 'Categoria', 'Apresentações', 'Disponibilidade'].map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {catalog.map((c, i) => (
                  <tr key={c.slug}>
                    <td>PF-{pad(i + 1)}</td>
                    <td><Link href={`/portfolio/${c.slug}/`} className="h3" style={{ fontSize: 18 }}>{c.name}</Link>{(c.botanical || c.sku) && <span className="body-sm muted" style={{ display: 'block', marginTop: 4 }}>{c.botanical ? <em>{c.botanical}</em> : c.sku}</span>}</td>
                    <td className="body-sm">{c.line?.replace('Portfólio ', '')}</td>
                    <td className="body-sm">{c.category}</td>
                    <td className="body-sm">{c.volume}</td>
                    <td><span className="tag">{AVAILABILITY_LABEL[c.availability]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 05 — Our Expertise */}
      <section className="section section--band" aria-labelledby="s5">
        <div className="container reveal">
          <div className="grid" style={{ alignItems: 'end', marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div className="col-7">
              <p className="eyebrow text-gold" style={{ display: 'flex', gap: 14, alignItems: 'center' }}><span style={{ width: 6, height: 6, background: 'var(--bordo)', display: 'inline-block' }} />05 / Our Expertise</p>
              <h2 id="s5" className="h2 mt-4">As oito <em>especialidades</em></h2>
              <p className="lead mt-6" style={{ maxWidth: '60ch' }}>Uma estrutura integrada que vai das matérias-primas e da pesquisa à representação de marcas, ao varejo, à comunicação e às experiências.</p>
            </div>
            <Link href="/fenix-bio/" className="col-4 col-start-9 dossier dossier--raised" style={{ padding: '24px 24px 20px' }}>
              <span className="serial" style={{ color: 'var(--phoenix-red)' }}>■ Pesquisa &amp; desenvolvimento</span>
              <span className="dossier__title">FÊNIX BIO</span>
              <span className="dossier__text">Iniciativa de P&amp;D industrial conectada à FÊNIX Labs e à FÊNIX Amazon Raw. BIOFOOD · BIOFRAGRANCE.</span>
              <span className="dossier__foot"><span className="serial">5 projetos em avaliação</span><span className="text-gold">→</span></span>
            </Link>
          </div>
          <div className="dossier-grid">
            {EXPERTISE.map((e) => (
              <Link key={e.slug} href={e.externalPage || `/our-expertise/${e.slug}/`} className="dossier">
                <span className="serial">{e.number} / 08</span>
                <h3 className="dossier__title">{e.name}</h3>
                <p className="dossier__text">{e.short}</p>
                <span className="dossier__foot"><span className="serial text-gold">{e.cta.label}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Special Projects */}
      <section className="section" aria-labelledby="s6">
        <div className="container reveal">
          <SectionHead label="06 / Special Projects" id="s6" title={<>Projetos &amp; <em>linhas de pesquisa</em></>} aside={<><p>Cada projeto mostra o seu estágio real. Conceito não é produto; resultados só são publicados quando comprovados.</p><p className="mt-4"><ArrowLink href="/special-projects/">Biblioteca de projetos</ArrowLink></p></>} />
          <div className="bio-grid">
            {projects.map((p, i) => (
              <Link key={p.slug} href={`/special-projects/${p.slug}/`} className="bio-card">
                <div className="media" style={{ position: 'relative' }}>
                  {p.image ? <Img image={p.image} /> : <div className="plate" style={{ position: 'absolute', inset: 0 }}><span className="plate__word">{p.title}</span></div>}
                  <span className="bio-card__label serial">{p.track ? `Track ${p.track === 'BIOFOOD' ? 'BD' : 'BF'}-${pad(i + 1)}` : `Projeto ${pad(i + 1)}`}</span>
                </div>
                <div className="bio-card__body">
                  <span className="serial text-gold">{p.track || p.category}</span>
                  <h3 className="dossier__title">{p.title}</h3>
                  <p className="dossier__text">{p.stageNote}</p>
                  <span className="dossier__foot"><StageBadge stage={p.stage} /><span className="serial">{p.territory}</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Selected Markets */}
      <section className="section section--band" aria-labelledby="s7">
        <div className="container reveal">
          <SectionHead label="07 / Selected Markets" id="s7" title={<>Arquitetura <em>territorial</em></>} aside={<><p>Território de interesse não é operação local constituída — o status de cada mercado é indicado.</p><p className="mt-4"><ArrowLink href="/markets/">Detalhes por mercado</ArrowLink></p></>} />
          <div className="dossier-grid dossier-grid--3">
            {MARKETS.map((m) => (
              <div key={m.slug} className="dossier" style={{ borderLeft: '2px solid var(--gold)' }}>
                <span className="serial text-gold">{m.statusLabel}</span>
                <h3 className="market__name">{m.name}</h3>
                <p className="dossier__text">{m.text}</p>
                <span className="dossier__foot"><span className="serial">{m.focus[0]}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Our Approach */}
      <section className="section" aria-labelledby="s8">
        <div className="container reveal">
          <SectionHead label="08 / Our Approach" id="s8" title={<>Discover → Validate → Structure → Activate → <em>Grow</em></>} />
          <ol className="steps">
            {APPROACH.map((s) => (
              <li key={s.name}>
                <span className="serial">{s.pt}</span>
                <p className="step-name">{s.name}</p>
                <p className="body-sm muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 09 — Grand Tour */}
      <section className="section section--deep" aria-labelledby="s9">
        <div className="container reveal">
          <div className="feature" style={{ minHeight: 'min(78vh, 760px)', border: '1px solid rgba(113,110,101,.3)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="feature__img" src={IMAGES.river.src} srcSet={`${IMAGES.river.srcSm} 800w, ${IMAGES.river.src} 1600w`} sizes="100vw" alt={IMAGES.river.alt} loading="lazy" />
            <span className="feature__shade" aria-hidden="true" />
            <div className="feature__body" style={{ paddingInline: 'clamp(24px, 5vw, 72px)' }}>
              <div className="grid" style={{ alignItems: 'end' }}>
                <div className="col-7 stack-lg">
                  <p className="serial" style={{ color: 'var(--gold)' }}><span style={{ color: 'var(--phoenix-red)' }}>■</span> 09 / FÊNIX Grand Tour</p>
                  <h2 id="s9" className="h1">Experiências &amp; viagens <em>privadas</em></h2>
                  <p className="lead" style={{ color: 'var(--ivory)', maxWidth: '52ch' }}>Jornadas pelo universo da perfumaria e do luxo — ateliês, origens de matérias-primas, maisons e destinos culturais — com acesso, contexto e as pessoas certas.</p>
                  <div className="row"><Link href="/grand-tour/#formulario" className="btn btn--primary">Registrar interesse</Link><ArrowLink href="/grand-tour/">Conhecer o Grand Tour</ArrowLink></div>
                </div>
                <div className="col-4 col-start-9 stack">
                  {GRAND_TOUR_ENTRIES.map((g) => (
                    <Link key={g.slug} href={`/grand-tour/${g.slug}/`} className="dossier" style={{ background: 'rgba(23,22,18,.88)', padding: '18px 20px', gap: 6 }}>
                      <span className="serial text-gold">Entrada {g.number}</span>
                      <span className="dossier__title" style={{ fontSize: 18 }}>{g.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — Journal */}
      <section className="section" aria-labelledby="s10">
        <div className="container reveal">
          <SectionHead label="10 / Journal" id="s10" title={<>Monografias &amp; <em>inteligência</em></>} aside={<ArrowLink href="/journal/">Todos os artigos</ArrowLink>} />
          <div className="bio-grid">
            {posts.map((p, i) => (
              <Link key={p.slug} href={`/journal/${p.slug}/`} className="bio-card">
                <div className="media plate" style={{ aspectRatio: '4 / 3' }}><span className="plate__word">{p.category}</span></div>
                <div className="bio-card__body">
                  <span className="dossier__foot" style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}><span className="serial text-gold">{p.category}</span><time className="serial" dateTime={p.date}>{formatDatePt(p.date)}</time></span>
                  <h3 className="dossier__title">{p.title}</h3>
                  <p className="dossier__text">{p.subtitle}</p>
                  <span className="dossier__foot"><span className="serial">Memorando № {pad(i + 1)}</span><span className="text-gold">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Start a Project */}
      <section className="section section--band" aria-labelledby="s11" id="start-a-project">
        <div className="container grid reveal">
          <div className="col-4 stack-lg">
            <p className="eyebrow text-gold">11 / Start a Project</p>
            <h2 id="s11" className="h1" style={{ fontSize: 'clamp(32px, 3.6vw, 54px)' }}>Desenvolva o seu próximo <em>mercado</em></h2>
            <p className="muted">Conte o que você deseja desenvolver. A solicitação é classificada por categoria e território e encaminhada ao responsável.</p>
            <div className="rule-top">
              <p className="serial text-gold">Contato direto</p>
              <a href={`mailto:${SITE.email}`} className="body-sm" style={{ display: 'block', marginTop: 8 }}>{SITE.email}</a>
            </div>
          </div>
          <div className="col-7 col-start-6">
            <div className="dossier" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
              <RequestForm formId="home-start-a-project" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
