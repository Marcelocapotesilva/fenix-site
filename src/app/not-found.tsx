import Link from 'next/link';
import { ArrowLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container grid">
        <div className="col-8 stack-lg">
          <p className="eyebrow">Erro 404</p>
          <h1 className="display">Página não encontrada.</h1>
          <p className="lead measure">O endereço pode ter mudado ou o conteúdo ainda não foi autorizado para publicação.</p>
          <div className="row">
            <Link href="/" className="btn">Voltar à página inicial</Link>
            <ArrowLink href="/search/">Buscar no site</ArrowLink>
            <ArrowLink href="/sitemap/">Mapa do site</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
