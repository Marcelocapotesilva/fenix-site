import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthLayout } from '@/components/AuthLayout';
import { RegisterForm } from '@/components/AuthForms';
export const metadata: Metadata = { title: 'Partner Access — Solicitar cadastro' };
export default function Page() {
  return (
    <AuthLayout eyebrow="Partner Access · Cadastro" title="Solicitar cadastro." intro="Quatro etapas. Após o envio, você confirma o e-mail e a FÊNIX analisa a empresa manualmente." footer={<p className="body-sm">Já tem acesso? <Link className="text-btn" href="/partner-access/">Entrar</Link></p>}>
      <RegisterForm />
    </AuthLayout>
  );
}
