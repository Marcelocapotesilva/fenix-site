import type { Metadata } from 'next';
import Link from 'next/link';
import { FormSection } from '@/components/FormSection';
import { Figure, Notice, PageHero, SectionHead, StageBadge } from '@/components/ui';
import { IMAGES } from '@/content/images';
import { BIO_PROJECT_SLUGS } from '@/content/projects';
import { getPublicProject } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'FÊNIX BIO',
  description: 'Iniciativa de pesquisa e desenvolvimento industrial conectada à FÊNIX Labs e à FÊNIX Amazon Raw. BIOFOOD e BIOFRAGRANCE.',
};

export default function BioPage() {
  const projects = BIO_PROJECT_SLUGS.map(getPublicProject).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const tracks = [
    { name: 'BIOFRAGRANCE', text: 'Materiais amazônicos para perfumaria e cosmética: infusões, absolutos, óleos e óleo-resinas em avaliação técnica, regulatória e de fornecimento.' },
    { name: 'BIOFOOD', text: 'Ingredientes e pesquisa para alimentos e nutrição: prontidão de fornecedores, requisitos de exportação e agenda exploratória com instituições.' },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Special Projects', href: '/special-projects/' }, { label: 'FÊNIX BIO' }]}
        eyebrow="FÊNIX BIO · Pesquisa e desenvolvimento industrial"
        title={<>FÊNIX <span className="italic">BIO</span></>}
        intro="Iniciativa de pesquisa e desenvolvimento industrial conectada à FÊNIX Labs e à FÊNIX Amazon Raw, dedicada a transformar a biodiversidade amazônica em projetos avaliados com rigor técnico, regulatório e comercial."
      />
      <section className="section">
        <div className="container grid">
          <div className="col-6 stack-lg">
            <p className="lead">A FÊNIX BIO organiza perguntas técnicas, reúne parceiros de pesquisa, fornecedores e indústria e documenta cada etapa até a decisão de seguir — ou não — com um projeto.</p>
            <Notice title="O que a FÊNIX BIO não é">Não é um laboratório operacional, uma fábrica ou uma empresa de biotecnologia independente. Os projetos abaixo são conceitos e avaliações em andamento: não há fórmulas validadas, certificações ou produtos finalizados.</Notice>
            <p className="body-sm muted">Conexões: <Link href="/our-expertise/fenix-labs/" className="text-btn">FÊNIX Labs</Link> · <Link href="/our-expertise/fenix-amazon-raw/" className="text-btn">FÊNIX Amazon Raw</Link></p>
          </div>
          <div className="col-5 col-start-8"><Figure image={IMAGES.labVisit} ratio="4x5" /></div>
        </div>
      </section>
      <section className="section section--band">
        <div className="container">
          <SectionHead label="Duas frentes" title="BIOFRAGRANCE e BIOFOOD." />
          <div className="grid">
            {tracks.map((t) => (
              <div key={t.name} className="col-6 rule-top">
                <p className="display" style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}>{t.name}</p>
                <p className="muted mt-4 measure">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead label="Os cinco projetos" title="Status de cada projeto." />
          <ul className="index-list">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/special-projects/${p.slug}/`} className="index-row index-row--bio">
                  <span className="index-row__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="index-row__title">{p.title}</span>
                  <span className="eyebrow">{p.track}</span>
                  <span className="stack" style={{ display: 'grid', gap: 6 }}><StageBadge stage={p.stage} /><span className="index-row__desc">{p.stageNote}</span></span>
                  <span className="index-row__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section--tight">
        <div className="container grid">
          <div className="col-4"><Figure image={IMAGES.copaiba} ratio="4x5" /></div>
          <div className="col-4"><Figure image={IMAGES.brazilNut} ratio="4x5" /></div>
          <div className="col-4 stack">
            <p className="eyebrow">Possibilidades de colaboração</p>
            <ul className="cols-list" style={{ columns: 1 }}>
              {['Pesquisadores e instituições: estudos técnicos e de viabilidade', 'Fornecedores e cooperativas: qualificação e rastreabilidade', 'Indústria e casas de composição: avaliação de aplicação', 'Investidores e fomento: projetos estruturados por etapa'].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <FormSection
        label="FÊNIX BIO · Colaboração"
        title="Pesquisadores, fornecedores e parceiros."
        formId="fenix-bio-collaboration"
        intent="Desenvolver um projeto industrial"
        extra={[
          { name: 'bioProfile', label: 'Você é', type: 'radio', options: ['Pesquisador(a) / instituição', 'Fornecedor / cooperativa', 'Indústria / casa de composição', 'Investidor / fomento', 'Outro parceiro'], required: true },
          { name: 'bioProject', label: 'Projeto de interesse', type: 'select', options: [...projects.map((p) => p.title), 'Nova proposta'] },
          { name: 'bioTrack', label: 'Frente', type: 'select', options: ['BIOFRAGRANCE', 'BIOFOOD', 'Ambas'] },
        ]}
      />
    </>
  );
}
