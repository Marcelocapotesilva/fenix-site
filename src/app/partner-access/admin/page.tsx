import type { Metadata } from 'next';
import Link from 'next/link';
import { ADMIN_NAV, Kpis, PortalShell } from '@/components/Portal';
export const metadata: Metadata = { title: 'Admin — Visão geral' };
export default function Page() {
  return (
    <PortalShell area="admin" current="/partner-access/admin/" title="Administração FÊNIX" intro="Gestão de usuários, empresas, produtos, permissões, documentos, solicitações e relatórios.">
      <Kpis items={[{ label: 'Cadastros pendentes' }, { label: 'Empresas ativas' }, { label: 'Solicitações abertas' }, { label: 'Documentos privados' }]} />
      <ul className="index-list">
        {ADMIN_NAV.slice(1).map((n, i) => (
          <li key={n.href}><Link href={n.href} className="index-row" style={{ gridTemplateColumns: '48px 1fr 24px' }}><span className="index-row__num">{String(i + 1).padStart(2, '0')}</span><span className="index-row__title" style={{ fontSize: 24 }}>{n.label}</span><span aria-hidden="true">→</span></Link></li>
        ))}
      </ul>
    </PortalShell>
  );
}
