import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
export const metadata: Metadata = { title: 'Cookies' };
export default function Page() {
  return (
    <LegalPage title="Cookies">
      <p>Hoje o site usa apenas armazenamento local estritamente funcional: idioma da interface e lista de interesse do Portfolio. Nenhum cookie de medição ou publicidade é carregado.</p>
      <h2>Medição (GA4)</h2><p>A medição com Google Analytics 4 está preparada e inativa. Só será carregada após banner de consentimento com opção de recusa, conforme texto a aprovar.</p>
    </LegalPage>
  );
}
