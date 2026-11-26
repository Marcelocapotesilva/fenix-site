import type { CatalogItem } from '@/lib/types';
import { slugify } from '@/lib/text';
import { IMAGES } from './images';

/**
 * FÊNIX oils & ingredients portfolio — source: "FÊNIX — Catálogo de Óleos" (PDF, julho/2026).
 * Public listing only: NO prices (FÊNIX values per presentation stay in the B2B channel / Partner Access).
 * Omitted from the public site: items marked "Not Available" (Cade, Feng/Ferula foetida, Worm Wood)
 * and two fragrance-oil names that evoke third-party perfume trademarks (FSN-2048, FSN-2069) — pending review.
 * The catalogue listed "Babaçu" and "Babassu (Orbignya oleifera)" separately; merged here — confirm.
 */

type Row = [name: string, botanical?: string, quoted?: boolean];

const VEGETABLE_OILS: Row[] = [
  ['Andiroba', 'Carapa guianensis', true],
  ['Copaíba', 'Copaifera spp.', true],
  ['Castanha-do-pará', 'Bertholletia excelsa', true],
  ['Babaçu', 'Orbignya oleifera', true],
  ['Coco verde', 'Cocos nucifera', true],
  ['Pau-rosa', 'Aniba rosaeodora', true],
  ['Buriti', 'Mauritia flexuosa', false],
  ['Graviola', 'Annona muricata', false],
  ['Maracujá', 'Passiflora edulis', false],
  ['Pracaxi', 'Pentaclethra macroloba', false],
];
const BUTTERS: Row[] = [['Cupuaçu', 'Theobroma grandiflorum', true], ['Murumuru', 'Astrocaryum murumuru', true], ['Tucumã', 'Astrocaryum aculeatum', true]];
const SCRUBS: Row[] = [['Andiroba', undefined, true], ['Cupuaçu', undefined, true], ['Açaí', 'Euterpe oleracea', true], ['Murumuru', undefined, true]];
const OTHERS: [string, string][] = [['Açaí em pó 100% puro', '1 kg'], ['Café de açaí 100% puro', '1 kg']];

const FRAGRANCE_OILS: [string, string][] = [
  ['FSN-1127', 'Strawberry Jam'], ['FSN-185', 'Amber'], ['FSN-403', 'Apple'], ['FSN-P151', 'Black Tea'], ['FSN-P117', 'Blackberry'],
  ['FSN-281', 'To Summer Cedarwood'], ['FSN-405', 'Chocolate'], ['FSN-414', 'Cola'], ['FSN-1111', 'Cucumber'], ['FSN-112', 'Norwegian Forest'],
  ['FSN-321', 'Four Seasons'], ['FSN-141', 'Green Bamboo #2'], ['FSN-118', 'Green Tea'], ['FSN-408', 'Milk'], ['FSN-122', 'White Tea'],
  ['FSN-1078', 'Essence Grape'], ['FSN-1126', 'Green Apple'], ['FSN-104', 'Jasmine'], ['FSN-103', 'Lavender'], ['FSN-2006', 'Leather'],
  ['FSN-2030', 'White Musk'], ['FSN-184', 'Oud'], ['FSN-190', 'Patchouli'], ['FSN-1079', 'Peach'], ['FSN-271', 'Pine Crest'],
  ['FSN-136', 'Red Pomegranate'], ['FSN-143', 'Indian Sandalwood'], ['FSN-1125', 'Bergamot'], ['FSN-110', 'Ginger Flower #1'], ['FSN-147', 'Black Tea'],
  ['FSN-187', 'Sandal'], ['FSN-322', 'Ambergris'], ['FSN-1100', 'Cardamom'], ['FSN-1122', 'Sandalwood'], ['FSN-159', 'Vetiver'],
  ['FSN-2014', 'Soft'], ['FSN-1020', 'Stargazing'], ['FSN-1063', 'Sandalwood Rose'], ['FSN-1131', 'Jade Dragon Tea'], ['FSN-1133', 'Guava Fruit'],
  ['FSN-151', 'Blackcurrant'],
];

const ESSENTIAL_OILS: string[] = [
  'Cedarwood', 'Chamomile Roman', 'Vetiver', 'Ylang Ylang', 'Amber', 'Oudh', 'Sandalwood', 'Fennel', 'Green Tea', 'Jasmine', 'Juniper Berry',
  'Lavender', 'Niaouli', 'Patchouli', 'Pine', 'Rose', 'Tea Tree', 'Agarwood', 'Anise', 'Aniseed', 'Ashwagandha', 'Cassia', 'Chamomile German',
  'Citronella', 'Clove Seed', 'Davana', 'Fir Needle', 'Frankincense', 'Geranium', 'Lemon Balm', 'Litsea Cubeba', 'Mandarin', 'Melissa', 'Oregano',
  'Palmarosa', 'Rose (Centifolia)', 'Rose (Damascena)', 'Rose Indian', 'Tangerine', 'Vanilla', 'Lotus', 'Apple', 'Cherry', 'Saffron', 'Mango',
  'Red Raspberry', 'Strawberry', 'Watermelon',
];

const DOCS = [{ name: 'Ficha técnica e laudo do lote', status: 'pending' as const }];
const base = { brand: 'FÊNIX Fragrances Holding', concentration: null, enabledMarkets: [] as string[], documents: DOCS, publication: 'authorized' as const, authorizedBy: 'Catálogo de Óleos FÊNIX (jul. 2026), sem preços' };

function national(rows: Row[], type: string, category: string, volume: string, noun: string): CatalogItem[] {
  return rows.map(([name, botanical, quoted]) => ({
    ...base,
    slug: slugify(`${noun} ${name}`),
    name: `${noun} de ${name.toLowerCase()}`.replace(/^(\w)/, (m) => m.toUpperCase()),
    type,
    line: 'Portfólio Nacional',
    botanical,
    category,
    origin: 'Brasil',
    sku: null,
    volume,
    availability: quoted ? 'in_portfolio' : 'on_request',
    summary: `${type} do portfólio nacional FÊNIX${botanical ? ` — ${botanical}` : ''}. Apresentações: ${volume}.`,
    description: `${type} brasileiro do portfólio FÊNIX, fornecido nas apresentações ${volume}. Especificações técnicas, laudo do lote, prazos e condições comerciais são enviados mediante solicitação de cotação.`,
    image: name === 'Copaíba' ? IMAGES.copaiba : name === 'Castanha-do-pará' ? IMAGES.brazilNut : undefined,
  }));
}

export const OILS_PORTFOLIO: CatalogItem[] = [
  ...national(VEGETABLE_OILS, 'Óleo vegetal', 'Óleos vegetais', '5 L · 18 L', 'Óleo'),
  ...national(BUTTERS, 'Manteiga vegetal', 'Manteigas vegetais', '5 kg · 20 kg', 'Manteiga'),
  ...national(SCRUBS, 'Grão esfoliante', 'Grãos esfoliantes', '5 kg · 20 kg', 'Grãos esfoliantes'),
  ...OTHERS.map(([name, volume]) => ({
    ...base, slug: slugify(name), name, type: 'Ingrediente', line: 'Portfólio Nacional' as const, category: 'Outros ingredientes', origin: 'Brasil',
    sku: null, volume, availability: 'in_portfolio' as const,
    summary: `Ingrediente complementar do portfólio nacional FÊNIX. Apresentação: ${volume}.`,
    description: `Ingrediente do portfólio nacional FÊNIX, apresentação de ${volume}. Condições comerciais mediante cotação.`,
  })),
  ...FRAGRANCE_OILS.map(([code, name]) => ({
    ...base, slug: slugify(`${code} ${name}`), name: `${name} Fragrance`, type: 'Fragrance oil', line: 'Portfólio Internacional' as const,
    category: 'Pure Fragrance Oils', origin: 'Internacional', sku: code, volume: '1 kg', availability: 'in_portfolio' as const,
    summary: `Pure fragrance oil do portfólio internacional FÊNIX · código ${code} · 1 kg.`,
    description: `Fragrance oil do portfólio internacional FÊNIX (código ${code}), comercializado por quilo. Ficha técnica, IFRA e condições comerciais mediante solicitação de cotação.`,
  })),
  ...ESSENTIAL_OILS.map((name) => ({
    ...base, slug: slugify(`essential oil ${name}`), name: `${name} Oil`, type: 'Essential oil', line: 'Portfólio Internacional' as const,
    category: 'Essential Oils', origin: 'Internacional', sku: null, volume: '1 kg', availability: 'in_portfolio' as const,
    summary: 'Óleo essencial do portfólio internacional FÊNIX · 1 kg.',
    description: 'Óleo essencial do portfólio internacional FÊNIX, comercializado por quilo. Origem do lote, ficha técnica e condições comerciais mediante solicitação de cotação.',
  })),
];
