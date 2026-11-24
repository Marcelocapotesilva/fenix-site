import type { ImageRef } from '@/lib/types';

/**
 * Photographs supplied by FÊNIX (WhatsApp archive, 19 Nov 2026).
 * `rightsConfirmed: false` = usage rights, credits and image release of identifiable
 * people must be confirmed before production (see README → Pending approvals).
 */
export const IMAGES = {
  river: {
    src: '/images/amazon-river-aerial.webp',
    srcSm: '/images/amazon-river-aerial-sm.webp',
    alt: 'Vista aérea de um rio sinuoso atravessando a floresta amazônica ao pôr do sol',
    caption: 'Amazônia — vista aérea',
    rightsConfirmed: false,
  },
  copaiba: {
    src: '/images/copaiba-extraction.webp',
    srcSm: '/images/copaiba-extraction-sm.webp',
    alt: 'Coletor observa óleo-resina escorrendo de um tronco de árvore para um recipiente graduado',
    caption: 'Extração de óleo-resina na floresta',
    rightsConfirmed: false,
  },
  brazilNut: {
    src: '/images/brazil-nut-harvest.webp',
    srcSm: '/images/brazil-nut-harvest-sm.webp',
    alt: 'Extrativista carregando um cesto de ouriços na mata, com frutos empilhados no chão',
    caption: 'Coleta extrativista na floresta',
    rightsConfirmed: false,
  },
  cupuacu: {
    src: '/images/cupuacu.webp',
    srcSm: '/images/cupuacu-sm.webp',
    alt: 'Frutos amazônicos de casca marrom, um deles aberto mostrando a polpa clara',
    caption: 'Frutos amazônicos',
    rightsConfirmed: false,
  },
  labPipette: {
    src: '/images/labs-pipette.webp',
    srcSm: '/images/labs-pipette-sm.webp',
    alt: 'Técnica de laboratório com luvas azuis pipetando amostra em um béquer, frascos âmbar sobre a bancada',
    caption: 'Ensaio técnico em laboratório',
    rightsConfirmed: false,
  },
  labVisit: {
    src: '/images/lab-visit.webp',
    srcSm: '/images/lab-visit-sm.webp',
    alt: 'Pesquisadora registra dados em bancada de laboratório enquanto um grupo de visitantes observa ao fundo',
    caption: 'Visita técnica a laboratório de pesquisa',
    rightsConfirmed: false,
  },
  manausCampus: {
    src: '/images/manaus-research-campus.webp',
    srcSm: '/images/manaus-research-campus-sm.webp',
    alt: 'Vista aérea de um campus de pesquisa e ensino cercado por floresta',
    caption: 'Ecossistema de pesquisa e indústria — Manaus',
    rightsConfirmed: false,
  },
} satisfies Record<string, ImageRef>;

export const LOGO_SRC = '/brand/fenix-fragrances-holding-official.png';
/** Transparent version (black field converted to alpha from the official file, no redraw). For dark backgrounds only. 688×576. */
export const LOGO_TRANSPARENT_SRC = '/brand/fenix-fragrances-holding-transparent.png';
