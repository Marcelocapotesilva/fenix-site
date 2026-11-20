import type { Metadata } from 'next';
import { EmptyTable, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Documentos' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/documents/" title="Documentos" intro="Controle de documentos privados, versões e liberação por empresa.">
      <div className="row"><button type="button" className="btn btn--sm" disabled>Enviar documento</button><span className="caption muted">Ações habilitadas após integração com a API administrativa.</span></div>
      <EmptyTable columns={['Documento', 'Vinculado a', 'Versão', 'Visibilidade', 'Liberações', 'Atualizado']} message="Nenhum documento enviado." />
    </PortalShell>
  );
}
