export const SITE = {
  email: 'marcelo@fenixfragrancesholding.uk',
  instagram: 'https://www.instagram.com/fenixfragrancesholding/',
  name: 'FÊNIX — Fragrances Holding',
  shortName: 'FÊNIX',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fenixfragrancesholding.uk',
  description:
    'Representação internacional, desenvolvimento de mercados e projetos especiais em perfumaria, beleza e luxo.',
};

export interface NavItem {
  label: string;
  href: string;
  hint: string;
  featured?: boolean;
}

/** Exactly the eight entries required by the brief, in order. */
export const MAIN_NAV: NavItem[] = [
  { label: 'Grand Tour', href: '/grand-tour/', hint: 'Experiências e viagens privadas', featured: true },
  { label: 'Maisons', href: '/maisons/', hint: 'Diretório de marcas' },
  { label: 'Edits', href: '/edits/', hint: 'Curadorias de mercado' },
  { label: 'Portfolio', href: '/portfolio/', hint: 'Catálogo B2B' },
  { label: 'Discovery', href: '/discovery/', hint: 'Amostras e materiais' },
  { label: 'Our Expertise', href: '/our-expertise/', hint: 'Oito especialidades' },
  { label: 'Special Projects', href: '/special-projects/', hint: 'Projetos e estudos' },
  { label: 'Journal', href: '/journal/', hint: 'Revista digital' },
];

export const UTILITY_NAV = [
  { label: 'About / People', href: '/about/' },
  { label: 'Help', href: '/help/' },
  { label: 'Contato', href: '/contact/' },
];

export const FOOTER_GROUPS = [
  {
    title: 'Universos',
    links: MAIN_NAV.map(({ label, href }) => ({ label, href })),
  },
  {
    title: 'Empresa',
    links: [
      { label: 'About / People', href: '/about/' },
      { label: 'Who We Work With', href: '/who-we-work-with/' },
      { label: 'Selected Markets', href: '/markets/' },
      { label: 'FÊNIX BIO', href: '/fenix-bio/' },
      { label: 'Help', href: '/help/' },
    ],
  },
  {
    title: 'Parceiros',
    links: [
      { label: 'Partner Access', href: '/partner-access/' },
      { label: 'Solicitar cadastro', href: '/partner-access/register/' },
      { label: 'Start a Project', href: '/contact/' },
      { label: 'Busca', href: '/search/' },
    ],
  },
  {
    title: 'Políticas',
    links: [
      { label: 'Privacidade (LGPD)', href: '/legal/privacy/' },
      { label: 'Termos de uso', href: '/legal/terms/' },
      { label: 'Cookies', href: '/legal/cookies/' },
      { label: 'Mapa do site', href: '/sitemap/' },
    ],
  },
];

/** Options for "O que você deseja desenvolver?" (brief §17), in order. */
export const OBJECTIVES = [
  'Representar ou expandir uma marca',
  'Distribuir ou importar produtos',
  'Comprar produtos para uma boutique',
  'Solicitar amostras',
  'Encontrar compradores internacionais',
  'Apresentar matérias-primas',
  'Desenvolver um projeto industrial',
  'Criar uma experiência ou evento',
  'Desenvolver uma identidade olfativa',
  'Participar do Grand Tour',
  'Apresentar outra oportunidade',
] as const;

export const SEGMENTS = [
  'Maison / marca',
  'Distribuidor / importador',
  'Varejo / boutique',
  'Produtor / fabricante',
  'Casa de composição / ingredientes',
  'Hotelaria / destino',
  'Instituição / pesquisa',
  'Grupo empresarial',
  'Imprensa / mídia',
  'Outro',
];

export const COUNTRIES = [
  'Brasil', 'Argentina', 'Chile', 'Colômbia', 'México', 'Peru', 'Uruguai', 'Paraguai', 'Equador',
  'Portugal', 'Espanha', 'França', 'Itália', 'Reino Unido', 'Alemanha', 'Suíça', 'Países Baixos', 'Bélgica',
  'Estados Unidos', 'Canadá', 'Emirados Árabes Unidos', 'Arábia Saudita', 'Outro',
];

/** Stated by the founder as FÊNIX's strategic principles. */
export const PRINCIPLES = [
  { name: 'Desirability Before Visibility', text: 'Construir desejo antes de buscar alcance.' },
  { name: 'Strategy Before Activity', text: 'Cada ação responde a uma direção comercial definida.' },
  { name: 'Relationships Create Revenue', text: 'Relações duradouras são a base do crescimento.' },
];

export const POSITIONING_LINE =
  'A marca é dona da marca. O operador opera. O especialista exerce a função especializada. A FÊNIX governa e desenvolve o mercado.';

export const APPROACH = [
  { name: 'Discover', pt: 'Descobrir', text: 'Entender a marca, a categoria, o território e as pessoas que movem o mercado.' },
  { name: 'Validate', pt: 'Validar', text: 'Testar hipóteses comerciais, regulatórias e de posicionamento antes de investir.' },
  { name: 'Structure', pt: 'Estruturar', text: 'Definir parceiros, papéis, governança, documentação e calendário.' },
  { name: 'Activate', pt: 'Ativar', text: 'Lançar com coordenação entre marca, operador, varejo e comunicação.' },
  { name: 'Grow', pt: 'Crescer', text: 'Acompanhar desempenho, ajustar e expandir com previsibilidade.' },
];

export const PEOPLE = [
  {
    name: 'Marcelo Capote',
    role: 'Founder, CEO & President',
    bio:
      'Formado em Relações Públicas, com pós-graduação em Luxury Brand Management em Londres. Atua no desenvolvimento da indústria de luxo e perfumaria na América Latina e na criação de metodologias e tecnologias aplicadas ao varejo, ao desenvolvimento de mercados e à expansão internacional.',
    source: 'Biografia publicada no Journal FÊNIX (06/10/2026)',
  },
];
