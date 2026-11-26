import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
export const metadata: Metadata = { title: 'Termos de uso' };
export default function Page() {
  return (
    <LegalPage title="Termos de uso">
      <p><strong>Versão preliminar.</strong></p>
      <h2>Conteúdo público</h2><p>As informações deste site têm caráter institucional. A menção a marcas, projetos e mercados não constitui oferta, exclusividade ou compromisso comercial.</p>
      <h2>Partner Access</h2><p>O acesso é pessoal, concedido após aprovação manual e limitado às permissões atribuídas por empresa, mercado e categoria. Informações comerciais e documentos são confidenciais e não podem ser redistribuídos.</p>
      <h2>Propriedade intelectual</h2><p>Marca, logotipo e conteúdos FÊNIX são protegidos. Marcas de terceiros pertencem aos seus titulares.</p>
      <h2>Lei aplicável</h2><p>[Jurisdição e foro — a confirmar.]</p>
    </LegalPage>
  );
}
