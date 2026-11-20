import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink, EmptyState, PageHero, SectionHead } from '@/components/ui';
import { getPublicMaisons } from '@/lib/cms';

export const metadata: Metadata = { title: 'Maisons', description: 'Diretório editorial das maisons representadas pela FÊNIX.' };

const PROFILE_FIELDS = ['Nome', 'País de origem', 'Logo autorizada', 'Fotografias oficiais', 'História', 'Posicionamento', 'Coleções', 'Produtos associados', 'Categorias', 'Mercados de interesse', 'Documentação', 'Contato comercial'];

export default function MaisonsPage() {
  const maisons = getPublicMaisons();
  return (
    <>
      <PageHero crumbs={[{ label: 'Maisons' }]} eyebrow="Maisons" title={<>O diretório das <span className="italic">maisons</span>.</>} intro="Histórias, coleções e mercados das marcas representadas pela FÊNIX — publicados somente com autorização de cada maison." />
      <section className="section">
        <div className="container">
          {maisons.length === 0 ? (
            <div className="grid">
              <div className="col-7">
                <EmptyState title="Nenhuma maison autorizada para publicação até o momento." action={<ArrowLink href="/who-we-work-with/maisons-and-brands/">Apresentar uma maison</ArrowLink>}>
                  <p>Maisons cadastradas internamente não aparecem automaticamente: cada página depende do campo de autorização de publicação no CMS.</p>
                </EmptyState>
              </div>
              <div className="col-4 col-start-9">
                <p className="eyebrow mb-4">Cada página de maison apresenta</p>
                <ul className="cols-list" style={{ columns: 1 }}>{PROFILE_FIELDS.map((f) => <li key={f}>{f}</li>)}</ul>
                <p className="mt-4"><Link className="text-btn" href="/maisons/template/">Ver modelo de página</Link></p>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <section className="section section--band">
        <div className="container">
          <SectionHead label="Para marcas" title="Sua maison no próximo mercado." aside={<p className="muted">Representação, desenvolvimento de mercado e coordenação com o ecossistema local.</p>} />
          <div className="row">
            <Link href="/our-expertise/fenix-beauty/" className="btn">FÊNIX Beauty</Link>
            <ArrowLink href="/contact/?intent=Representar%20ou%20expandir%20uma%20marca">Representar ou expandir uma marca</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
