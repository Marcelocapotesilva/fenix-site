import Link from 'next/link';
import type { ReactNode } from 'react';
import { LogoFull } from './Logo';

export function AuthLayout({ eyebrow, title, intro, children, footer }: { eyebrow: string; title: string; intro?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="auth-wrap">
      <div className="auth-wrap__brand">
        <div style={{ maxWidth: 300 }}><LogoFull /></div>
        <div className="stack">
          <p className="eyebrow text-champagne">Partner Access</p>
          <p className="h2">Ambiente privado para maisons, distribuidores, boutiques e parceiros aprovados.</p>
          <ul className="body-sm muted" style={{ display: 'grid', gap: 6 }}>
            <li>— Catálogo privado e documentos técnicos</li>
            <li>— Condições comerciais restritas</li>
            <li>— Cotações, amostras e histórico</li>
            <li>— Calendário de lançamentos autorizados</li>
          </ul>
        </div>
        <p className="caption muted">Acesso concedido após verificação de e-mail e aprovação manual. <Link href="/help/" className="text-btn">Ajuda</Link></p>
      </div>
      <div className="auth-wrap__form">
        <div className="stack-lg">
          <div className="stack">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="h1" style={{ fontSize: 'clamp(40px, 4.4vw, 64px)' }}>{title}</h1>
            {intro && <div className="muted">{intro}</div>}
          </div>
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}
