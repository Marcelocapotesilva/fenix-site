import type { Metadata } from 'next';
import { FormSection } from '@/components/FormSection';
import { ArrowLink, Figure, Notice, PageHero, SectionHead } from '@/components/ui';
import { IMAGES } from '@/content/images';

export const metadata: Metadata = { title: 'Discovery', description: 'Solicite amostras, kits comerciais, apresentações e materiais de marcas.' };

const OPTIONS = [
  { name: 'Amostras', text: 'Amostras de produtos e ingredientes para avaliação técnica ou comercial.' },
  { name: 'Kits comerciais', text: 'Kits de apresentação para compradores, varejo e equipes.' },
  { name: 'Apresentações', text: 'Apresentações de marcas, coleções e oportunidades — presenciais ou remotas.' },
  { name: 'Materiais de marcas', text: 'Book de marca, fichas e materiais comerciais autorizados.' },
  { name: 'Registro de interesse', text: 'Indique produtos ou categorias que deseja acompanhar.' },
];

export default function DiscoveryPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Discovery' }]} eyebrow="Discovery" title={<>Descobrir antes de <span className="italic">decidir.</span></>} intro="Amostras, kits comerciais, apresentações e materiais de marcas para compradores, operadores e parceiros." />
      <section className="section">
        <div className="container grid">
          <div className="col-7">
            <SectionHead label="O que você pode solicitar" title="Cinco formas de conhecer o portfólio." />
            <ul className="index-list">
              {OPTIONS.map((o, i) => (
                <li key={o.name}>
                  <div className="index-row index-row--3">
                    <span className="index-row__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="index-row__title">{o.name}</span>
                    <span className="index-row__desc">{o.text}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8"><Notice title="Aprovação">Disponibilidade e autorização da marca são confirmadas antes de cada aprovação. Nenhum envio é automático.</Notice></div>
          </div>
          <div className="col-4 col-start-9 stack">
            <Figure image={IMAGES.cupuacu} ratio="4x5" />
            <ArrowLink href="/portfolio/">Ver o Portfolio</ArrowLink>
          </div>
        </div>
      </section>
      <FormSection
        label="Discovery · Solicitação"
        title="Solicite materiais e amostras."
        formId="discovery-request"
        intent="Solicitar amostras"
        lockIntent
        extra={[
          { name: 'discoveryType', label: 'O que você deseja receber?', type: 'checks', options: OPTIONS.map((o) => o.name), required: true },
          { name: 'brandsOrProducts', label: 'Marcas, produtos ou categorias de interesse', type: 'text', required: true },
          { name: 'deliveryCountry', label: 'País de entrega', type: 'text', hint: 'Endereço completo será solicitado somente após aprovação.' },
        ]}
      />
    </>
  );
}
