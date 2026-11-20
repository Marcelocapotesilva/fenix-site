import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthLayout } from '@/components/AuthLayout';
import { Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'Partner Access — Verifique seu e-mail' };
export default function Page() {
  return (
    <AuthLayout eyebrow="Cadastro · Etapa 2 de 3" title="Verifique seu e-mail." intro="Enviamos um link de confirmação para o endereço informado. O link expira em 24 horas.">
      <ol className="steps" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {['Solicitação enviada', 'E-mail verificado', 'Aprovação manual'].map((s, i) => (
          <li key={s} style={{ opacity: i <= 1 ? 1 : 0.5 }}><span className="eyebrow muted">0{i + 1}</span><p className="h4 mt-2">{s}</p></li>
        ))}
      </ol>
      <Notice title="Estado de tela">Esta tela é exibida pelo servidor após um cadastro real. O reenvio do link depende do backend de autenticação.</Notice>
      <p className="body-sm"><Link className="text-btn" href="/partner-access/">Voltar ao login</Link></p>
    </AuthLayout>
  );
}
