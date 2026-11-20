import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
export const metadata: Metadata = { title: 'Política de Privacidade' };
export default function Page() {
  return (
    <LegalPage title="Política de Privacidade">
      <p><strong>Versão preliminar (draft-2026-11).</strong> Este texto descreve como o site trata dados pessoais e será substituído pela versão aprovada pelo jurídico.</p>
      <h2>Controlador</h2><p>[Razão social, registro e endereço da FÊNIX — a confirmar.] Encarregado de dados (DPO): [nome e contato — a confirmar].</p>
      <h2>Dados coletados</h2><p>Dados informados nos formulários: nome, e-mail profissional, empresa, cargo, país, segmento, objetivo e mensagem. No Partner Access: dados cadastrais da empresa e do responsável. A lista de interesse do Portfolio fica salva apenas no seu navegador.</p>
      <h2>Finalidades e bases legais</h2><p>Responder a solicitações comerciais (procedimentos preliminares a contrato, a pedido do titular), gerir o cadastro de parceiros e cumprir obrigações legais. Comunicações de marketing apenas com consentimento específico.</p>
      <h2>Compartilhamento</h2><p>Com prestadores que operam a infraestrutura do site e do CRM, sob contrato. Com maisons e parceiros apenas quando necessário à solicitação e com sua ciência.</p>
      <h2>Retenção</h2><p>[Prazos de retenção por finalidade — a confirmar.]</p>
      <h2>Seus direitos</h2><p>Confirmação, acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamento e revogação do consentimento, pelo e-mail marcelo@fenixfragrancesholding.uk (canal provisório até a nomeação do encarregado).</p>
      <h2>Segurança</h2><p>Comunicação cifrada (HTTPS), controle de acesso por perfil no servidor e arquivos privados servidos por URLs assinadas no Partner Access.</p>
    </LegalPage>
  );
}
