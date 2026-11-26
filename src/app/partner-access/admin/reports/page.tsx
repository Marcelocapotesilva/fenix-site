import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Relatórios' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/reports/" title="Relatórios" intro="Exportação de solicitações, cadastros e atividade em CSV.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Exportar CSV</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Relatório', 'Período', 'Formato', 'Gerado em']} message="Nenhum relatório gerado." />
    </PortalShell>
  );
}
