import Link from 'next/link';
import { FOOTER_GROUPS, SITE } from '@/content/site';
import { LogoFull } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="col-4">
            <Link href="/" className="footer__logo" style={{ display: 'block' }} aria-label="FÊNIX — Fragrances Holding, página inicial">
              <LogoFull />
            </Link>
          </div>
          <div className="col-8">
            <p className="h2" style={{ maxWidth: '20ch' }}>
              Grandes marcas merecem mercados à altura de sua ambição.
            </p>
            <div className="row mt-8">
              <Link href="/contact/" className="btn btn--light">Start a Project</Link>
              <Link href="/partner-access/" className="link-arrow">Partner Access →</Link>
            </div>
          </div>
        </div>

        <div className="footer__cols mt-16">
          {FOOTER_GROUPS.map((g) => (
            <div className="footer__col" key={g.title}>
              <h2 className="eyebrow">{g.title}</h2>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href + l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid mt-16">
          <div className="col-4">
            <h2 className="eyebrow text-champagne mb-4">Contato comercial</h2>
            <p className="body-sm">Formulário institucional: <Link href="/contact/" className="text-btn">Start a Project</Link></p>
            <p className="body-sm mt-2">E-mail: <a href={`mailto:${SITE.email}`} className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>{SITE.email}</a></p>
            <p className="body-sm muted mt-2">Telefone e endereço: pendentes de confirmação.</p>
          </div>
          <div className="col-4">
            <h2 className="eyebrow text-champagne mb-4">Informações institucionais</h2>
            <p className="body-sm muted">Razão social, registro e sede: pendentes de verificação para publicação.</p>
          </div>
          <div className="col-4">
            <h2 className="eyebrow text-champagne mb-4">Redes sociais</h2>
            <p className="body-sm"><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>Instagram · @fenixfragrancesholding</a></p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} FÊNIX — Fragrances Holding. Todos os direitos reservados.</span>
          <span>Conteúdo público sujeito a autorização. Informações comerciais restritas a parceiros aprovados.</span>
        </div>
      </div>
    </footer>
  );
}
