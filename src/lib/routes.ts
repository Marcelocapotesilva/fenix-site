import { EDIT_CATEGORIES } from '@/content/edits';
import { EXPERTISE } from '@/content/expertise';
import { GRAND_TOUR_ENTRIES } from '@/content/grand-tour';
import { JOURNEYS } from '@/content/journeys';
import { getPosts, getPublicCatalog, getPublicProjects } from './cms';

export interface RouteGroup { title: string; routes: { label: string; href: string }[] }

/** Public sitemap (Partner Access and templates are excluded from indexing). */
export function publicSitemap(): RouteGroup[] {
  return [
    { title: 'Institucional', routes: [
      { label: 'Home', href: '/' },
      { label: 'About / People', href: '/about/' },
      { label: 'Who We Work With', href: '/who-we-work-with/' },
      ...JOURNEYS.map((j) => ({ label: `— ${j.name}`, href: `/who-we-work-with/${j.slug}/` })),
      { label: 'Selected Markets', href: '/markets/' },
      { label: 'Help', href: '/help/' },
      { label: 'Contato / Start a Project', href: '/contact/' },
    ] },
    { title: 'Grand Tour', routes: [
      { label: 'Grand Tour', href: '/grand-tour/' },
      ...GRAND_TOUR_ENTRIES.map((g) => ({ label: `— ${g.name}`, href: `/grand-tour/${g.slug}/` })),
    ] },
    { title: 'Maisons & Edits', routes: [
      { label: 'Maisons', href: '/maisons/' },
      { label: 'Edits', href: '/edits/' },
      ...EDIT_CATEGORIES.map((c) => ({ label: `— ${c.name}`, href: `/edits/${c.slug}/` })),
    ] },
    { title: 'Portfolio & Discovery', routes: [
      { label: 'Portfolio', href: '/portfolio/' },
      ...getPublicCatalog().map((c) => ({ label: `— ${c.name}`, href: `/portfolio/${c.slug}/` })),
      { label: 'Lista de interesse', href: '/portfolio/selection/' },
      { label: 'Discovery', href: '/discovery/' },
    ] },
    { title: 'Our Expertise', routes: [
      { label: 'Our Expertise', href: '/our-expertise/' },
      ...EXPERTISE.map((e) => ({ label: `— ${e.name}`, href: `/our-expertise/${e.slug}/` })),
    ] },
    { title: 'Special Projects', routes: [
      { label: 'Special Projects', href: '/special-projects/' },
      ...getPublicProjects().map((p) => ({ label: `— ${p.title}`, href: `/special-projects/${p.slug}/` })),
      { label: 'FÊNIX BIO', href: '/fenix-bio/' },
    ] },
    { title: 'Journal', routes: [
      { label: 'Journal', href: '/journal/' },
      ...getPosts().map((p) => ({ label: `— ${p.title}`, href: `/journal/${p.slug}/` })),
    ] },
    { title: 'Parceiros & Políticas', routes: [
      { label: 'Partner Access', href: '/partner-access/' },
      { label: 'Solicitar cadastro', href: '/partner-access/register/' },
      { label: 'Busca', href: '/search/' },
      { label: 'Privacidade', href: '/legal/privacy/' },
      { label: 'Termos de uso', href: '/legal/terms/' },
      { label: 'Cookies', href: '/legal/cookies/' },
    ] },
  ];
}
