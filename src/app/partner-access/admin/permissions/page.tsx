import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Permissões' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/permissions/" title="Permissões" intro="Matriz de permissões por empresa, mercado e categoria.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Nova regra</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Empresa', 'Mercado', 'Categoria', 'Catálogo', 'Wholesale', 'Documentos']} message="Nenhuma regra de permissão definida." />
    </PortalShell>
  );
}
