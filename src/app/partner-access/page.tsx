import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthLayout } from '@/components/AuthLayout';
import { LoginForm } from '@/components/AuthForms';
export const metadata: Metadata = { title: 'Partner Access — Entrar' };
export default function Page() {
  return (
    <AuthLayout eyebrow="Partner Access" title="Entrar." intro="Use o e-mail profissional da sua empresa aprovada." footer={
      <div className="rule-top stack">
        <p className="body-sm">Ainda não tem acesso? <Link href="/partner-access/register/" className="text-btn">Solicitar cadastro</Link></p>
        <p className="caption muted">Telas internas (pré-visualização sem dados): <Link className="text-btn" href="/partner-access/portal/">Parceiro</Link> · <Link className="text-btn" href="/partner-access/admin/">Administração</Link></p>
      </div>
    }>
      <LoginForm />
    </AuthLayout>
  );
}
