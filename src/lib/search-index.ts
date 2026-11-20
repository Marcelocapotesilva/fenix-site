import { EXPERTISE, TRANSVERSAL_SERVICES } from '@/content/expertise';
import { JOURNEYS } from '@/content/journeys';
import { MARKETS } from '@/content/markets';
import { MAIN_NAV } from '@/content/site';
import { getPosts, getPublicCatalog, getPublicExperiences, getPublicMaisons, getPublicProjects } from './cms';

export interface SearchDoc {
  title: string;
  href: string;
  section: string;
  text: string;
}

/** Built at compile time from PUBLIC content only (governance filters applied). */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  MAIN_NAV.forEach((n) => docs.push({ title: n.label, href: n.href, section: 'Navegação', text: n.hint }));
  EXPERTISE.forEach((e) =>
    docs.push({
      title: e.name,
      href: e.externalPage || `/our-expertise/${e.slug}/`,
      section: 'Our Expertise',
      text: [e.short, e.intro, e.capabilities.join(' '), e.applications.join(' ')].join(' '),
    }),
  );
  TRANSVERSAL_SERVICES.forEach((s) =>
    docs.push({ title: s.name, href: '/our-expertise/#servicos-transversais', section: 'Serviços transversais', text: s.text }),
  );
  JOURNEYS.forEach((j) =>
    docs.push({ title: j.name, href: `/who-we-work-with/${j.slug}/`, section: 'Who We Work With', text: [j.short, j.intro].join(' ') }),
  );
  MARKETS.forEach((m) => docs.push({ title: m.name, href: '/markets/', section: 'Selected Markets', text: [m.statusLabel, m.text].join(' ') }));
  getPublicProjects().forEach((p) =>
    docs.push({
      title: p.title,
      href: `/special-projects/${p.slug}/`,
      section: 'Special Projects',
      text: [p.category, p.stageNote, p.description, p.objective, p.track || ''].join(' '),
    }),
  );
  getPublicCatalog().forEach((c) =>
    docs.push({ title: c.name, href: `/portfolio/${c.slug}/`, section: 'Portfolio', text: [c.type, c.category, c.origin, c.summary].join(' ') }),
  );
  getPublicMaisons().forEach((m) => docs.push({ title: m.name, href: `/maisons/${m.slug}/`, section: 'Maisons', text: m.positioning }));
  getPublicExperiences().forEach((x) =>
    docs.push({ title: x.name, href: `/grand-tour/`, section: 'Grand Tour', text: [x.destination, x.description].join(' ') }),
  );
  getPosts().forEach((p) =>
    docs.push({
      title: p.title,
      href: `/journal/${p.slug}/`,
      section: `Journal · ${p.category}`,
      text: [p.subtitle, p.tags.join(' '), p.body.join(' ')].join(' '),
    }),
  );
  [
    { title: 'FÊNIX BIO', href: '/fenix-bio/', section: 'Pesquisa', text: 'BIOFOOD BIOFRAGRANCE pesquisa desenvolvimento industrial Amazônia açaí mel tucumã óleos nutrição' },
    { title: 'About / People', href: '/about/', section: 'Empresa', text: 'Sobre FÊNIX pessoas fundador princípios posicionamento Marcelo Capote' },
    { title: 'Help', href: '/help/', section: 'Ajuda', text: 'perguntas frequentes ajuda cadastro amostras cotação privacidade' },
    { title: 'Start a Project', href: '/contact/', section: 'Contato', text: 'contato comercial formulário projeto' },
    { title: 'Partner Access', href: '/partner-access/', section: 'Parceiros', text: 'portal B2B login cadastro parceiros catálogo privado' },
    { title: 'Discovery', href: '/discovery/', section: 'Discovery', text: 'amostras kits comerciais apresentações materiais de marcas interesse' },
  ].forEach((d) => docs.push(d));
  return docs;
}
