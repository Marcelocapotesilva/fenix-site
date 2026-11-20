import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Solicitações' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/requests/" title="Solicitações" intro="Todas as solicitações do site e do portal, classificadas por categoria e território, com responsável e histórico.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Atribuir responsável</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Referência', 'Origem', 'Objetivo', 'Território', 'Responsável', 'Status']} message="Nenhuma solicitação registrada." />
    </PortalShell>
  );
}
