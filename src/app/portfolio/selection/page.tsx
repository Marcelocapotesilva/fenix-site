import type { Metadata } from 'next';
import { RequestForm } from '@/components/RequestForm';
import { SelectionList } from '@/components/Selection';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = { title: 'Lista de interesse — Portfolio', description: 'Solicite cotação, amostras ou registre interesse nos itens selecionados.', robots: { index: false } };

export default function SelectionPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Portfolio', href: '/portfolio/' }, { label: 'Lista de interesse' }]} eyebrow="Portfolio" title="Sua lista de interesse." intro="Revise os itens, identifique sua empresa e envie a solicitação. Ela será registrada e encaminhada ao responsável pelo portfólio." />
      <section className="section">
        <div className="container grid">
          <div className="col-5">
            <p className="eyebrow mb-4">01 · Itens selecionados</p>
            <SelectionList />
          </div>
          <div className="col-7">
            <p className="eyebrow mb-4">02 · Identificação e solicitação</p>
            <RequestForm
              formId="portfolio-quote"
              intent="Solicitar amostras"
              lockIntent
              includeSelection
              extra={[
                { name: 'requestType', label: 'Tipo de solicitação', type: 'radio', options: ['Cotação', 'Amostras', 'Cotação e amostras', 'Registro de interesse'], required: true },
                { name: 'markets', label: 'Mercado de destino', type: 'text', required: true },
                { name: 'volume', label: 'Volume estimado', type: 'text', hint: 'Opcional. Ajuda a qualificar a solicitação.' },
              ]}
              submitLabel="Enviar solicitação"
              messageLabel="Observações"
            />
          </div>
        </div>
      </section>
    </>
  );
}
