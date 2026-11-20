import type { Metadata } from 'next';
import { DefList, Figure, Notice, PageHero } from '@/components/ui';

export const metadata: Metadata = { title: 'Modelo — Experiência Grand Tour', robots: { index: false, follow: false } };

/** Structural template: shows where each CMS field renders. Contains no invented experience data. */
export default function ExperienceTemplate() {
  return (
    <>
      <div className="integration-banner"><div className="container"><strong>Modelo de página</strong>Estrutura do template de experiência. Os campos entre colchetes serão preenchidos pelo CMS. Página não indexada.</div></div>
      <PageHero tone="black" crumbs={[{ label: 'Grand Tour', href: '/grand-tour/' }, { label: 'Modelo de experiência' }]} eyebrow="[Entrada] · [Destino]" title="[Nome da experiência]" intro="[Descrição — dois ou três parágrafos sobre a jornada, o território e o que a torna singular.]" />
      <section className="section">
        <div className="container grid">
          <div className="col-7 stack-lg">
            <div className="grid" style={{ rowGap: 24 }}>
              <div className="col-8"><Figure ratio="3x2" pendingLabel="Galeria — imagem 1" /></div>
              <div className="col-4"><Figure ratio="4x5" pendingLabel="Galeria — imagem 2" /></div>
            </div>
            <div>
              <p className="eyebrow mb-4">Programa</p>
              <ol className="cols-list" style={{ columns: 1 }}>
                {['[Dia 1 — chegada e abertura]', '[Dia 2 — visitas e encontros]', '[Dia 3 — programa cultural]', '[Dia 4 — encerramento]'].map((d) => <li key={d}>{d}</li>)}
              </ol>
            </div>
          </div>
          <div className="col-4 col-start-9 stack-lg">
            <DefList rows={[
              { label: 'Estado comercial', pending: '[Interesse aberto · Sob consulta · Confirmada · Esgotada · Encerrada]' },
              { label: 'Datas', pending: '[Datas]' },
              { label: 'Duração', pending: '[Duração]' },
              { label: 'Capacidade', pending: '[Número de participantes]' },
              { label: 'Operador responsável', pending: '[Operador de viagem responsável]' },
              { label: 'Preço', pending: '[Somente quando aprovado]' },
              { label: 'Inclui', pending: '[Inclusões]' },
              { label: 'Não inclui', pending: '[Exclusões]' },
              { label: 'Condições', pending: '[Condições de participação]' },
              { label: 'Cancelamento', pending: '[Política de cancelamento]' },
            ]} />
            <Notice title="Sem checkout">O CTA da experiência é o registro de interesse até que reservas e pagamentos sejam especificados e contratados.</Notice>
          </div>
        </div>
      </section>
    </>
  );
}
