/**
 * Content model — mirrors the collections the CMS (Payload, see docs/INTEGRACOES.md) must expose.
 * Governance rule: operational stage and publication authorization are SEPARATE fields.
 * Nothing renders publicly unless `publication === 'authorized'` and `confidential !== true`.
 */

export type Publication = 'draft' | 'in_review' | 'authorized' | 'withdrawn';

export interface Governance {
  publication: Publication;
  confidential?: boolean;
  /** Who authorized publication (name/role) and when (ISO). Required by the CMS for 'authorized'. */
  authorizedBy?: string;
  authorizedAt?: string;
}

export type ProjectStage = 'concept' | 'in_development' | 'mandated' | 'in_delivery' | 'completed';

export const STAGE_LABEL: Record<ProjectStage, string> = {
  concept: 'Concept',
  in_development: 'In Development',
  mandated: 'Mandated',
  in_delivery: 'In Delivery',
  completed: 'Completed',
};

export interface ImageRef {
  src: string;
  srcSm?: string;
  alt: string;
  caption?: string;
  /** Rights/credit must be confirmed before go-live; surfaced in the README pending list. */
  credit?: string;
  rightsConfirmed: boolean;
}

export interface Expertise {
  slug: string;
  number: string;
  name: string;
  short: string;
  intro: string;
  valueProposition: string;
  capabilities: string[];
  clients: string[];
  applications: string[];
  relatedProjects: string[];
  cta: { label: string; intent: string };
  image?: ImageRef;
  note?: string;
  externalPage?: string;
}

export interface Journey {
  slug: string;
  number: string;
  name: string;
  short: string;
  intro: string;
  forYou: string[];
  weNeed: string[];
  nextSteps: string[];
  intent: string;
  relatedExpertise: string[];
}

export type MarketStatus = 'priority_development' | 'interest_territory' | 'relationship_base';

export interface Market {
  slug: string;
  name: string;
  status: MarketStatus;
  statusLabel: string;
  text: string;
  focus: string[];
  localOperation: string;
  image?: ImageRef;
}

export type ProjectCategory =
  | 'International Brand Expansion'
  | 'Brand Creation & Luxury Growth'
  | 'Retail & Store Development'
  | 'Industry & Manufacturing'
  | 'Amazonian & Latin American Ingredients'
  | 'Hospitality & Scent Spaces'
  | 'Culture & Private Experiences'
  | 'Export & International Trade'
  | 'Education & Innovation';

export interface Project extends Governance {
  slug: string;
  title: string;
  category: ProjectCategory;
  territory: string;
  description: string;
  objective: string;
  fenixRole: string;
  stage: ProjectStage;
  stageNote: string;
  provenResults: string | null;
  track?: 'BIOFOOD' | 'BIOFRAGRANCE';
  image?: ImageRef;
  cta: { label: string; intent: string };
  relatedExpertise: string[];
}

export type Availability = 'in_portfolio' | 'confirmed' | 'on_request' | 'under_evaluation';
export const AVAILABILITY_LABEL: Record<Availability, string> = {
  in_portfolio: 'No portfólio · cotação B2B',
  confirmed: 'Disponibilidade confirmada',
  on_request: 'Sob consulta',
  under_evaluation: 'Em avaliação',
};

export interface CatalogItem extends Governance {
  slug: string;
  name: string;
  type: string;
  /** Portfolio line shown as a filter: Nacional / Internacional */
  line?: 'Portfólio Nacional' | 'Portfólio Internacional';
  botanical?: string;
  brand: string;
  category: string;
  origin: string;
  sku: string | null;
  volume: string | null;
  concentration: string | null;
  availability: Availability;
  enabledMarkets: string[];
  documents: { name: string; status: 'available_partner' | 'pending' }[];
  summary: string;
  description: string;
  image?: ImageRef;
  relatedProject?: string;
}

export interface Maison extends Governance {
  slug: string;
  name: string;
  country: string;
  logo?: ImageRef;
  images: ImageRef[];
  history: string;
  positioning: string;
  collections: string[];
  products: string[];
  categories: string[];
  marketsOfInterest: string[];
  documentation: string[];
  commercialContact: string;
}

export type EditCategory = 'market-edits' | 'category-edits' | 'opportunity-edits';
export interface Edit extends Governance {
  slug: string;
  category: EditCategory;
  title: string;
  market?: string;
  productCategory?: string;
  occasion?: string;
  opportunity?: string;
  intro: string;
  items: string[];
}

export interface Experience extends Governance {
  slug: string;
  entry: 'curated-journeys' | 'private-corporate-journeys' | 'trade-missions';
  name: string;
  destination: string;
  description: string;
  gallery: ImageRef[];
  dates: string | null;
  duration: string | null;
  programme: string[];
  inclusions: string[];
  exclusions: string[];
  operator: string | null;
  capacity: string | null;
  approvedPrice: string | null;
  participationTerms: string | null;
  cancellationPolicy: string | null;
  commercialState: 'interest_open' | 'on_request' | 'confirmed' | 'sold_out' | 'closed';
}

export interface JournalPost {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;      // ISO yyyy-mm-dd
  dateLabel: string; // as entered in the CMS
  image?: string;
  imageCaption?: string;
  body: string[];
  bio?: string;
  category: string;
  tags: string[];
  references: string[];
  seoTitle: string;
  seoDescription: string;
}

/** Feature classification required by the brief (§22). */
export type FeatureStatus = 1 | 2 | 3 | 4;
export const FEATURE_STATUS_LABEL: Record<FeatureStatus, string> = {
  1: 'Implementada e testada',
  2: 'Implementada, aguardando integração',
  3: 'Preparada, ainda inativa',
  4: 'Bloqueada por decisão ou material pendente',
};
