import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
import { Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'Partner Access — Catálogo privado' };
export default function Page() {
  return (
    <PortalShell area="partner" current="/partner-access/portal/catalog/" title="Catálogo privado" intro="Produtos autorizados para a sua empresa, mercado e categoria, com documentos técnicos e condições comerciais restritas.">
      <Notice title="Proteção no servidor">Preços wholesale, estoque e documentos são entregues apenas pela API após verificação de sessão e permissão. Nada disso existe no código público do site.</Notice>
      <EmptyTable columns={['Produto', 'Marca', 'SKU', 'Volume', 'Concentração', 'Condição wholesale', 'Ações']} message="Nenhum produto liberado para o seu perfil." />
    </PortalShell>
  );
}
