import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = { title: 'Help', description: 'Perguntas frequentes sobre solicitações, Partner Access, amostras, cotações e privacidade.' };

const FAQ = [
  { q: 'Como apresento uma marca ou um projeto à FÊNIX?', a: <>Use o formulário <Link className="text-btn" href="/contact/">Start a Project</Link> ou o formulário da jornada correspondente em <Link className="text-btn" href="/who-we-work-with/">Who We Work With</Link>. A solicitação é classificada por categoria e território e encaminhada ao responsável.</> },
  { q: 'O que acontece depois que envio uma solicitação?', a: 'A equipe avalia a aderência e retorna pelo e-mail profissional informado. Enquanto a integração com o CRM não estiver ativa, o site informa explicitamente que a solicitação não foi transmitida e oferece um resumo para cópia.' },
  { q: 'Os preços estão disponíveis no site?', a: 'Não. Preços, margens, estoque e condições wholesale não são publicados no ambiente público. Eles ficam restritos a parceiros aprovados no Partner Access.' },
  { q: 'Como funciona o Partner Access?', a: <>O cadastro de empresas passa por verificação de e-mail e aprovação manual. As permissões são definidas por empresa, mercado e categoria. <Link className="text-btn" href="/partner-access/register/">Solicitar cadastro</Link>.</> },
  { q: 'Posso solicitar amostras?', a: <>Sim, pelo <Link className="text-btn" href="/discovery/">Discovery</Link> ou pela lista de interesse do <Link className="text-btn" href="/portfolio/">Portfolio</Link>. Disponibilidade e autorização da marca são confirmadas antes de qualquer aprovação.</> },
  { q: 'Por que algumas áreas mostram “imagem pendente” ou “sem publicações”?', a: 'Porque a FÊNIX só publica maisons, projetos, fotografias e resultados com autorização formal. Áreas sem conteúdo aprovado exibem esse estado em vez de conteúdo fictício.' },
  { q: 'O site está disponível em inglês e espanhol?', a: 'A interface pode ser alternada entre PT, EN e ES. As versões editoriais em inglês e espanhol estão em tradução.' },
  { q: 'Como meus dados são tratados?', a: <>De acordo com a <Link className="text-btn" href="/legal/privacy/">Política de Privacidade</Link> (LGPD). Os dados são usados apenas para responder à solicitação e você pode pedir acesso, correção ou exclusão.</> },
];

export default function HelpPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Help' }]} eyebrow="Help" title="Como podemos ajudar?" intro="Respostas sobre solicitações, Partner Access, amostras, cotações e privacidade." />
      <section className="section">
        <div className="container grid">
          <div className="col-8">
            <ul className="index-list">
              {FAQ.map((f, i) => (
                <li key={i}>
                  <details style={{ padding: '20px 0' }}>
                    <summary className="h3" style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 24 }}>
                      <span>{f.q}</span><span aria-hidden="true">+</span>
                    </summary>
                    <div className="muted mt-4 measure">{f.a}</div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-3 col-start-10 stack">
            <p className="eyebrow">Ainda com dúvidas?</p>
            <Link href="/contact/" className="btn">Falar com a FÊNIX</Link>
          </div>
        </div>
      </section>
    </>
  );
}
