import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Partner Access — Calendário' };
export default function Page() {
  return (
    <PortalShell area="partner" current="/partner-access/portal/calendar/" title="Calendário de lançamentos" intro="Lançamentos autorizados para os seus mercados e categorias.">
      <EmptyTable columns={['Data', 'Marca', 'Lançamento', 'Mercados', 'Materiais']} message="Nenhum lançamento autorizado." />
    </PortalShell>
  );
}
