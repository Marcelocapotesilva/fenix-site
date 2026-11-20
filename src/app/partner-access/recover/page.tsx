import type { Metadata } from 'next';
import { AuthLayout } from '@/components/AuthLayout';
import { RecoverForm } from '@/components/AuthForms';
export const metadata: Metadata = { title: 'Partner Access — Recuperar senha' };
export default function Page() {
  return (
    <AuthLayout eyebrow="Partner Access" title="Recuperar senha." intro="Enviaremos um link de redefinição válido por tempo limitado.">
      <RecoverForm />
    </AuthLayout>
  );
}
