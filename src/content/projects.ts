import type { Project, ProjectCategory } from '@/lib/types';
import { IMAGES } from './images';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'International Brand Expansion',
  'Brand Creation & Luxury Growth',
  'Retail & Store Development',
  'Industry & Manufacturing',
  'Amazonian & Latin American Ingredients',
  'Hospitality & Scent Spaces',
  'Culture & Private Experiences',
  'Export & International Trade',
  'Education & Innovation',
];

const BIO_CTA = { label: 'Colaborar com a FÊNIX BIO', intent: 'Desenvolver um projeto industrial' };

/**
 * Only projects already public by FÊNIX's own decision are listed here:
 * - the five FÊNIX BIO projects named in the Projeto Fênix brief (public BIO page requested);
 * - the Latin America operator review, already published in the FÊNIX Journal (06/10/2026).
 * Confidential or unauthorized projects must live only in the CMS, never in the public bundle.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'acai-seed-infusion',
    title: 'Açaí Seed Infusion',
    category: 'Amazonian & Latin American Ingredients',
    territory: 'Amazônia — Brasil',
    description:
      'Investigação do caroço de açaí — subproduto abundante da cadeia do fruto — como base para uma infusão aplicável à perfumaria.',
    objective: 'Determinar viabilidade técnica, enquadramento regulatório e potencial olfativo de uma infusão a partir do caroço de açaí.',
    fenixRole: 'Estruturação do projeto, coordenação com parceiros técnicos e avaliação de aplicação comercial.',
    stage: 'in_development',
    stageNote: 'Avaliação técnica e regulatória',
    provenResults: null,
    track: 'BIOFRAGRANCE',
    image: IMAGES.labPipette,
    cta: BIO_CTA,
    relatedExpertise: ['fenix-labs', 'fenix-amazon-raw'],
    publication: 'authorized',
    authorizedBy: 'Briefing Projeto Fênix (nov. 2026) — confirmar responsável',
  },
  {
    slug: 'amazonian-honey',
    title: 'Amazonian Honey',
    category: 'Amazonian & Latin American Ingredients',
    territory: 'Amazônia — Brasil',
    description: 'Avaliação de méis amazônicos e de seus produtores para mercados internacionais de alimentos e ingredientes.',
    objective: 'Avaliar a prontidão de fornecedores — documentação, volume, qualidade e logística — e os requisitos de exportação.',
    fenixRole: 'Mapeamento de fornecedores, diagnóstico de prontidão e preparação para trade internacional.',
    stage: 'in_development',
    stageNote: 'Avaliação de prontidão de fornecedores e exportação',
    provenResults: null,
    track: 'BIOFOOD',
    image: IMAGES.cupuacu,
    cta: BIO_CTA,
    relatedExpertise: ['fenix-amazon-raw'],
    publication: 'authorized',
    authorizedBy: 'Briefing Projeto Fênix (nov. 2026) — confirmar responsável',
  },
  {
    slug: 'tucuma-absolute',
    title: 'Tucumã Absolute',
    category: 'Amazonian & Latin American Ingredients',
    territory: 'Amazônia — Brasil',
    description: 'Pesquisa conceitual sobre o tucumã como fonte de um absoluto para perfumaria fina.',
    objective: 'Investigar o potencial do material e definir os estudos necessários para uma avaliação de viabilidade.',
    fenixRole: 'Pesquisa conceitual, definição de hipóteses e busca de parceiros de extração e análise.',
    stage: 'concept',
    stageNote: 'Pesquisa conceitual e viabilidade',
    provenResults: null,
    track: 'BIOFRAGRANCE',
    cta: BIO_CTA,
    relatedExpertise: ['fenix-labs', 'fenix-amazon-raw'],
    publication: 'authorized',
    authorizedBy: 'Briefing Projeto Fênix (nov. 2026) — confirmar responsável',
  },
  {
    slug: 'amazonian-botanical-oils',
    title: 'Amazonian Botanical Oils',
    category: 'Amazonian & Latin American Ingredients',
    territory: 'Amazônia — Brasil',
    description: 'Portfólio de óleos e óleo-resinas botânicos amazônicos em avaliação para perfumaria e cosmética.',
    objective: 'Selecionar materiais com potencial, avaliar fornecedores e estruturar documentação para apresentação à indústria.',
    fenixRole: 'Curadoria do portfólio, avaliação de fornecedores e preparação de amostras técnicas.',
    stage: 'in_development',
    stageNote: 'Portfólio de ingredientes sob avaliação',
    provenResults: null,
    track: 'BIOFRAGRANCE',
    image: IMAGES.copaiba,
    cta: BIO_CTA,
    relatedExpertise: ['fenix-amazon-raw'],
    publication: 'authorized',
    authorizedBy: 'Briefing Projeto Fênix (nov. 2026) — confirmar responsável',
  },
  {
    slug: 'amazonian-nutrition-research',
    title: 'Amazonian Nutrition Research',
    category: 'Education & Innovation',
    territory: 'Amazônia — Brasil',
    description: 'Oportunidade de pesquisa exploratória sobre o potencial nutricional de espécies amazônicas.',
    objective: 'Identificar linhas de pesquisa e instituições parceiras para uma agenda exploratória.',
    fenixRole: 'Articulação entre pesquisadores, instituições e potenciais parceiros industriais.',
    stage: 'concept',
    stageNote: 'Oportunidade de pesquisa exploratória',
    provenResults: null,
    track: 'BIOFOOD',
    image: IMAGES.brazilNut,
    cta: BIO_CTA,
    relatedExpertise: ['fenix-labs'],
    publication: 'authorized',
    authorizedBy: 'Briefing Projeto Fênix (nov. 2026) — confirmar responsável',
  },
  {
    slug: 'latam-operator-governance-review',
    title: 'Latin America Operator & Channel Governance Review',
    category: 'International Brand Expansion',
    territory: 'América Latina',
    description:
      'Avaliação regional com operadores, distribuidores e varejistas para mapear práticas de segurança, autenticidade, rastreabilidade, controle de estoque, prevenção de desvio de canal e governança de dados.',
    objective:
      'Entender não apenas quem pode importar e vender, mas quais estruturas permitem preservar valor, consistência e confiança à medida que uma marca cresce na região.',
    fenixRole: 'Condução da avaliação, definição de critérios e mapeamento de lacunas.',
    stage: 'in_development',
    stageNote: 'Agenda de avaliação em andamento — não é um padrão regional concluído',
    provenResults: null,
    cta: { label: 'Participar como operador', intent: 'Distribuir ou importar produtos' },
    relatedExpertise: ['fenix-beauty', 'fenix-access'],
    publication: 'authorized',
    authorizedBy: 'Publicado pela FÊNIX no Journal (06/10/2026)',
  },
];

export const BIO_PROJECT_SLUGS = [
  'acai-seed-infusion',
  'amazonian-honey',
  'tucuma-absolute',
  'amazonian-botanical-oils',
  'amazonian-nutrition-research',
];
