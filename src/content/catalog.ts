import type { CatalogItem, Edit, Experience, Maison } from '@/lib/types';
import { IMAGES } from './images';

/**
 * Public B2B catalogue.
 * No third-party maison, fragrance or SKU is listed: none has publication authorization yet.
 * The entries below are FÊNIX's own ingredient projects (public via the brief) and are shown
 * as "under evaluation" — never as finished, certified or available products.
 * Prices, margins, stock and wholesale terms are NEVER part of this public model.
 */
export const CATALOG: CatalogItem[] = [
  {
    slug: 'acai-seed-infusion',
    name: 'Açaí Seed Infusion',
    type: 'Ingrediente',
    brand: 'FÊNIX Amazon Raw · FÊNIX BIO',
    category: 'Infusões e tinturas',
    origin: 'Brasil — Amazônia',
    sku: null,
    volume: null,
    concentration: null,
    availability: 'under_evaluation',
    enabledMarkets: [],
    documents: [
      { name: 'Ficha técnica', status: 'pending' },
      { name: 'Enquadramento regulatório', status: 'pending' },
    ],
    summary: 'Infusão a partir do caroço de açaí em avaliação técnica e regulatória.',
    description:
      'Material em estudo para aplicação em perfumaria. Ainda não há especificação técnica validada, volume ou condição comercial. O registro de interesse ajuda a priorizar o desenvolvimento.',
    image: IMAGES.labPipette,
    relatedProject: 'acai-seed-infusion',
    publication: 'authorized',
  },
  {
    slug: 'tucuma-absolute',
    name: 'Tucumã Absolute',
    type: 'Ingrediente',
    brand: 'FÊNIX Amazon Raw · FÊNIX BIO',
    category: 'Absolutos e extratos',
    origin: 'Brasil — Amazônia',
    sku: null,
    volume: null,
    concentration: null,
    availability: 'under_evaluation',
    enabledMarkets: [],
    documents: [{ name: 'Nota conceitual', status: 'pending' }],
    summary: 'Absoluto de tucumã em pesquisa conceitual e de viabilidade.',
    description:
      'Conceito de material para perfumaria fina. A pesquisa está em fase conceitual; não existe amostra disponível nesta etapa.',
    relatedProject: 'tucuma-absolute',
    publication: 'authorized',
  },
  {
    slug: 'amazonian-botanical-oils',
    name: 'Amazonian Botanical Oils',
    type: 'Ingrediente',
    brand: 'FÊNIX Amazon Raw',
    category: 'Óleos e óleo-resinas',
    origin: 'Brasil — Amazônia',
    sku: null,
    volume: null,
    concentration: null,
    availability: 'under_evaluation',
    enabledMarkets: [],
    documents: [
      { name: 'Lista de materiais em avaliação', status: 'pending' },
      { name: 'Fichas técnicas por material', status: 'pending' },
    ],
    summary: 'Portfólio de óleos botânicos amazônicos em avaliação para perfumaria e cosmética.',
    description:
      'Seleção de óleos e óleo-resinas em avaliação com fornecedores. Materiais, especificações e volumes serão publicados individualmente após qualificação.',
    image: IMAGES.copaiba,
    relatedProject: 'amazonian-botanical-oils',
    publication: 'authorized',
  },
  {
    slug: 'amazonian-honey',
    name: 'Amazonian Honey',
    type: 'Oportunidade',
    brand: 'FÊNIX Amazon Raw · FÊNIX BIO',
    category: 'Alimentos e nutrição',
    origin: 'Brasil — Amazônia',
    sku: null,
    volume: null,
    concentration: null,
    availability: 'under_evaluation',
    enabledMarkets: [],
    documents: [{ name: 'Diagnóstico de prontidão de fornecedores', status: 'pending' }],
    summary: 'Méis amazônicos em avaliação de prontidão de fornecedores e exportação.',
    description:
      'Oportunidade comercial para importadores e indústria de alimentos. A avaliação de fornecedores e de requisitos de exportação está em andamento.',
    image: IMAGES.cupuacu,
    relatedProject: 'amazonian-honey',
    publication: 'authorized',
  },
];

/** No maison has publication authorization yet. Registered maisons stay in the CMS only. */
export const MAISONS: Maison[] = [];

/** No edit has been curated and approved yet. */
export const EDITS: Edit[] = [];

/** No Grand Tour experience has an approved programme, operator and terms yet. */
export const EXPERIENCES: Experience[] = [];
