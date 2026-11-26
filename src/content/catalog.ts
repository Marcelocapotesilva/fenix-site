import type { CatalogItem, Edit, Experience, Maison } from '@/lib/types';
import { OILS_PORTFOLIO } from './oils';

/**
 * Public B2B catalogue.
 * No third-party maison, fragrance or SKU is listed: none has publication authorization yet.
 * The entries below are FÊNIX's own ingredient projects (public via the brief) and are shown
 * as "under evaluation" — never as finished, certified or available products.
 * Prices, margins, stock and wholesale terms are NEVER part of this public model.
 */
/**
 * Public B2B catalogue = FÊNIX oils & ingredients portfolio (see oils.ts).
 * FÊNIX BIO concepts (e.g. Tucumã Absolute, Açaí Seed Infusion) are research projects, NOT catalogue items —
 * they live in Special Projects / FÊNIX BIO.
 * Prices, margins, stock and wholesale terms are NEVER part of this public model.
 */
export const CATALOG: CatalogItem[] = OILS_PORTFOLIO;

/** No maison has publication authorization yet. Registered maisons stay in the CMS only. */
export const MAISONS: Maison[] = [];

/** No edit has been curated and approved yet. */
export const EDITS: Edit[] = [];

/** No Grand Tour experience has an approved programme, operator and terms yet. */
export const EXPERIENCES: Experience[] = [];
