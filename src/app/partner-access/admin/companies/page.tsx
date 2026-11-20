import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Empresas' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/companies/" title="Empresas" intro="Empresas parceiras, perfil, mercados e situação cadastral.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Nova empresa</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Empresa', 'País', 'Perfil', 'Mercados', 'Usuários', 'Status']} message="Nenhuma empresa cadastrada." />
    </PortalShell>
  );
}
