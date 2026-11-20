import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthLayout } from '@/components/AuthLayout';
import { Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'Partner Access — Cadastro em análise' };
export default function Page() {
  return (
    <AuthLayout eyebrow="Cadastro · Etapa 3 de 3" title="Cadastro em análise." intro="Seu e-mail foi confirmado. A equipe FÊNIX está analisando a empresa e definirá as permissões por mercado e categoria.">
      <Notice title="Próximo passo">Você receberá um e-mail quando o acesso for aprovado. Cadastros também podem ser recusados ou suspensos pela administração.</Notice>
      <p className="body-sm"><Link className="text-btn" href="/help/">Dúvidas sobre o cadastro</Link></p>
    </AuthLayout>
  );
}
