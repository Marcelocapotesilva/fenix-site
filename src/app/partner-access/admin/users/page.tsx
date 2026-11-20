import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Usuários' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/users/" title="Usuários" intro="Aprovar, suspender e reativar usuários; verificar e-mail e perfil.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Convidar usuário</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Nome', 'E-mail', 'Empresa', 'Perfil', 'Status', 'Ações']} message="Nenhum usuário cadastrado." />
    </PortalShell>
  );
}
