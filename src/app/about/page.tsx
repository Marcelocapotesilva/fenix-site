import type { Metadata } from 'next';
import { ArrowLink, Figure, PageHero, SectionHead } from '@/components/ui';
import { LogoFull } from '@/components/Logo';
import { PEOPLE, POSITIONING_LINE, PRINCIPLES } from '@/content/site';

export const metadata: Metadata = { title: 'About / People', description: 'Quem é a FÊNIX — Fragrances Holding: posicionamento, princípios e pessoas.' };

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'About / People' }]} eyebrow="About / People" title={<>Presença não é <span className="italic">operação.</span></>} intro="A FÊNIX é uma plataforma de representação internacional, desenvolvimento e coordenação de mercados em perfumaria, beleza e luxo — que trabalha ao lado do ecossistema local, não acima dele nem em seu lugar." />
      <section className="section">
        <div className="container grid">
          <div className="col-4"><LogoFull /></div>
          <div className="col-7 col-start-6 stack-lg">
            <p className="statement">{POSITIONING_LINE}</p>
            <p className="measure muted">Atendemos dois públicos que precisam um do outro: marcas internacionais que desejam crescer em novos territórios e parceiros locais — distribuidores, importadores, especialistas regulatórios e varejistas — que desejam marcas e relações mais estruturadas. Distribuição cria presença; coordenação cria operação.</p>
          </div>
        </div>
      </section>
      <section className="section section--band">
        <div className="container">
          <SectionHead label="Princípios" title="Três princípios de trabalho." />
          <ul className="principles">
            {PRINCIPLES.map((p) => (
              <li key={p.name}><p className="h3">{p.name}</p><p className="muted mt-2">{p.text}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead label="People" title="Pessoas." aside={<p className="muted">Equipe, conselheiros e parceiros serão apresentados mediante autorização individual.</p>} />
          <div className="grid">
            {PEOPLE.map((p) => (
              <div key={p.name} className="col-8 grid" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)', display: 'grid' }}>
                <Figure ratio="4x5" pendingLabel={`retrato oficial — ${p.name}`} />
                <div className="stack">
                  <p className="eyebrow">{p.role}</p>
                  <h3 className="h2">{p.name}</h3>
                  <p className="muted">{p.bio}</p>
                  <p className="caption muted">Fonte: {p.source}</p>
                </div>
              </div>
            ))}
            <div className="col-4 stack">
              <div className="empty" style={{ height: '100%' }}>
                <p className="eyebrow">Equipe</p>
                <p className="empty__title" style={{ fontSize: 26 }}>Demais integrantes: publicação pendente de autorização.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section--tight section--ruled">
        <div className="container row row--between">
          <ArrowLink href="/our-expertise/">Our Expertise</ArrowLink>
          <ArrowLink href="/markets/">Selected Markets</ArrowLink>
          <ArrowLink href="/contact/">Start a Project</ArrowLink>
        </div>
      </section>
    </>
  );
}
