import type { Market } from '@/lib/types';
import { IMAGES } from './images';

/**
 * Status vocabulary deliberately separates "territory of interest" from "constituted local operation".
 * `localOperation` must only change after legal confirmation (see README → Pending approvals).
 */
export const MARKETS: Market[] = [
  {
    slug: 'europe',
    name: 'Europa',
    status: 'relationship_base',
    statusLabel: 'Base de relacionamento',
    text:
      'Origem de grande parte das maisons, casas de composição e feiras que movem a perfumaria internacional. Na Europa concentramos relacionamento com marcas, parceiros industriais e agenda do Grand Tour.',
    focus: ['Relacionamento com maisons', 'Feiras e calendário internacional', 'Parceiros industriais e de composição'],
    localOperation: 'Estrutura societária e endereço a confirmar para publicação.',
  },
  {
    slug: 'brazil',
    name: 'Brasil',
    status: 'priority_development',
    statusLabel: 'Mercado prioritário em desenvolvimento',
    text:
      'Um dos mercados de perfumaria mais relevantes do mundo, com consumidor sofisticado e complexidade regulatória e logística própria. É o território prioritário de desenvolvimento de mercado e de origem de matérias-primas amazônicas.',
    focus: ['Entrada e desenvolvimento de maisons', 'Varejo seletivo e boutiques', 'Matérias-primas amazônicas e pesquisa'],
    localOperation: 'Operação local constituída: a confirmar. Atuação com parceiros locais.',
    image: IMAGES.manausCampus,
  },
  {
    slug: 'latin-america',
    name: 'América Latina',
    status: 'interest_territory',
    statusLabel: 'Território de interesse',
    text:
      'Mercados em amadurecimento para o luxo. A FÊNIX conduz uma avaliação regional com operadores, distribuidores e varejistas para mapear práticas, lacunas e caminhos de presença com mais controle e previsibilidade.',
    focus: ['Avaliação regional de operadores', 'Governança de canal e autenticidade', 'Missões comerciais'],
    localOperation: 'Sem operação local constituída. Território em avaliação.',
  },
];
