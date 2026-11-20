import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Partner Access — Documentos' };
export default function Page() {
  return (
    <PortalShell area="partner" current="/partner-access/portal/documents/" title="Documentos liberados" intro="Fichas técnicas, materiais comerciais e documentos regulatórios liberados para a sua empresa. Downloads por URL assinada e temporária.">
      <EmptyTable columns={['Documento', 'Marca / produto', 'Tipo', 'Versão', 'Liberado em', 'Download']} message="Nenhum documento liberado." />
    </PortalShell>
  );
}
