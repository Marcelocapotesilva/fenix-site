import type { Metadata } from 'next';
import { EmptyTable, Kpis, PortalShell } from '@/components/Portal';
import { EmptyState } from '@/components/ui';
export const metadata: Metadata = { title: 'Partner Access — Painel' };
export default function Page() {
  return (
    <PortalShell area="partner" current="/partner-access/portal/" title="Painel do parceiro" intro="Resumo de solicitações, cotações, documentos liberados e lançamentos autorizados para a sua empresa.">
      <Kpis items={[{ label: 'Solicitações abertas' }, { label: 'Cotações em análise' }, { label: 'Documentos liberados' }, { label: 'Lançamentos autorizados' }]} />
      <div>
        <p className="eyebrow mb-4">Histórico de solicitações</p>
        <EmptyTable columns={['Referência', 'Tipo', 'Itens', 'Data', 'Status']} message="Nenhuma solicitação registrada. Os dados aparecerão aqui após a integração com o servidor." />
      </div>
      <EmptyState title="Sem lançamentos autorizados no calendário." />
    </PortalShell>
  );
}
