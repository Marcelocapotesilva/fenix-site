import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Produtos' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/products/" title="Produtos" intro="Produtos, SKUs e ingredientes; campo de autorização de publicação separado do estágio operacional.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Novo produto</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Produto', 'Marca', 'SKU', 'Disponibilidade', 'Publicação', 'Mercados']} message="Nenhum produto cadastrado no CMS." />
    </PortalShell>
  );
}
