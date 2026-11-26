export const GRAND_TOUR_ENTRIES = [
  {
    slug: 'curated-journeys',
    number: 'I',
    name: 'Curated Journeys',
    short: 'Jornadas com roteiro curado pela FÊNIX, abertas a convidados qualificados.',
    intro:
      'Roteiros desenhados em torno de feiras, ateliês, maisons, origens de matérias-primas e destinos culturais. Grupos reduzidos, acesso seletivo e uma narrativa que conecta perfumaria, território e pessoas.',
    forWhom: ['Colecionadores e apreciadores de perfumaria', 'Profissionais de varejo e marcas', 'Convidados de parceiros FÊNIX'],
    format: ['Roteiro com datas fixas', 'Grupo reduzido', 'Programa cultural e de visitas'],
  },
  {
    slug: 'private-corporate-journeys',
    number: 'II',
    name: 'Private & Corporate Journeys',
    short: 'Viagens sob medida para pessoas, famílias, empresas e equipes.',
    intro:
      'Programas privados e corporativos construídos a partir do objetivo do cliente — incentivo, relacionamento, formação ou descoberta — com curadoria FÊNIX e operação por parceiros responsáveis.',
    forWhom: ['Viajantes privados', 'Empresas e programas de incentivo', 'Equipes de marcas e varejo'],
    format: ['Datas e duração sob medida', 'Programa exclusivo', 'Integração com experiências e identidade olfativa'],
  },
  {
    slug: 'trade-missions',
    number: 'III',
    name: 'Trade Missions & Cultural Experiences',
    short: 'Missões comerciais e programas culturais para delegações e instituições.',
    intro:
      'Missões que combinam agenda de negócios, visitas técnicas e programação cultural, para delegações de empresas, associações e instituições interessadas em um território ou categoria.',
    forWhom: ['Delegações empresariais', 'Associações e instituições', 'Produtores e exportadores'],
    format: ['Agenda de reuniões qualificadas', 'Visitas técnicas e industriais', 'Programa cultural'],
  },
] as const;

export type GrandTourEntrySlug = (typeof GRAND_TOUR_ENTRIES)[number]['slug'];

/** Fields every published experience must carry (CMS schema — brief §14). */
export const EXPERIENCE_FIELDS = [
  'Nome', 'Destino', 'Descrição', 'Galeria', 'Datas', 'Duração', 'Programa', 'Inclusões e exclusões',
  'Operador responsável', 'Capacidade', 'Preço aprovado, quando aplicável', 'Condições de participação',
  'Política de cancelamento', 'Estado comercial',
];

export const GRAND_TOUR_FORM_EXTRA = [
  { name: 'journeyType', label: 'Tipo de jornada', type: 'radio' as const, options: GRAND_TOUR_ENTRIES.map((g) => g.name), required: true },
  { name: 'period', label: 'Período de interesse', type: 'text' as const, hint: 'Ex.: primeiro semestre de 2027' },
  { name: 'groupSize', label: 'Número de participantes', type: 'select' as const, options: ['1–2', '3–6', '7–12', '13–25', 'Mais de 25'] },
  { name: 'destinations', label: 'Destinos ou temas de interesse', type: 'text' as const },
];
