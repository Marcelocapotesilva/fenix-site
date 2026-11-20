import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Partner Access — Solicitações' };
export default function Page() {
  return (
    <PortalShell area="partner" current="/partner-access/portal/requests/" title="Solicitações e cotações" intro="Acompanhe cotações e pedidos de amostras: Recebida → Em análise → Respondida → Encerrada.">
      <EmptyTable columns={['Referência', 'Tipo', 'Itens', 'Responsável FÊNIX', 'Atualizado em', 'Status']} message="Nenhuma solicitação encontrada." />
    </PortalShell>
  );
}
