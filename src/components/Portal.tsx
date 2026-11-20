import Link from 'next/link';
import type { ReactNode } from 'react';

export const PORTAL_NAV = [
  { label: 'Painel', href: '/partner-access/portal/' },
  { label: 'Catálogo privado', href: '/partner-access/portal/catalog/' },
  { label: 'Solicitações e cotações', href: '/partner-access/portal/requests/' },
  { label: 'Documentos liberados', href: '/partner-access/portal/documents/' },
  { label: 'Calendário de lançamentos', href: '/partner-access/portal/calendar/' },
];

export const ADMIN_NAV = [
  { label: 'Visão geral', href: '/partner-access/admin/' },
  { label: 'Usuários', href: '/partner-access/admin/users/' },
  { label: 'Empresas', href: '/partner-access/admin/companies/' },
  { label: 'Produtos', href: '/partner-access/admin/products/' },
  { label: 'Permissões', href: '/partner-access/admin/permissions/' },
  { label: 'Documentos', href: '/partner-access/admin/documents/' },
  { label: 'Solicitações', href: '/partner-access/admin/requests/' },
  { label: 'Relatórios', href: '/partner-access/admin/reports/' },
];

export function IntegrationBanner({ children }: { children?: ReactNode }) {
  return (
    <div className="integration-banner" role="note">
      <div className="container">
        <strong>Pré-visualização de interface</strong>
        {children || 'Sem autenticação e sem dados reais. Esta tela só ficará acessível após login validado pelo servidor (backend pendente — ver docs/INTEGRACOES.md).'}
      </div>
    </div>
  );
}

export function PortalShell({
  area, current, title, intro, children,
}: { area: 'partner' | 'admin'; current: string; title: string; intro?: string; children: ReactNode }) {
  const nav = area === 'admin' ? ADMIN_NAV : PORTAL_NAV;
  return (
    <>
      <IntegrationBanner />
      <div className="portal">
        <aside className="portal__side" aria-label={area === 'admin' ? 'Administração' : 'Área do parceiro'}>
          <h2 className="eyebrow">{area === 'admin' ? 'Administração FÊNIX' : 'Área do parceiro'}</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} aria-current={current === n.href ? 'page' : undefined}>{n.label}</Link></li>
            ))}
          </ul>
          <p className="caption muted mt-8">
            {area === 'admin' ? 'Perfil exigido: Administrador FÊNIX.' : 'Perfis: Maison / fornecedor · Distribuidor / importador · Boutique / comprador · Outros parceiros aprovados.'}
          </p>
          <p className="mt-6"><Link href={area === 'admin' ? '/partner-access/portal/' : '/partner-access/admin/'} className="text-btn">{area === 'admin' ? 'Ver área do parceiro' : 'Ver administração'}</Link></p>
        </aside>
        <div className="portal__main">
          <p className="eyebrow muted">{area === 'admin' ? 'Partner Access · Admin' : 'Partner Access'}</p>
          <h1 className="h2 mt-2">{title}</h1>
          {intro && <p className="muted mt-3 measure">{intro}</p>}
          <div className="mt-10 stack-lg">{children}</div>
        </div>
      </div>
    </>
  );
}

export function EmptyTable({ columns, message }: { columns: string[]; message: string }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody><tr><td className="empty-cell" colSpan={columns.length}>{message}</td></tr></tbody>
      </table>
    </div>
  );
}

export function Kpis({ items }: { items: { label: string }[] }) {
  return (
    <div className="kpis">
      {items.map((k) => (
        <div className="kpi" key={k.label}>
          <p className="eyebrow muted">{k.label}</p>
          <p className="kpi__value" aria-label={`${k.label}: sem dados`}>—</p>
        </div>
      ))}
    </div>
  );
}
