import type { EditCategory } from '@/lib/types';

export const EDIT_CATEGORIES: { slug: EditCategory; name: string; text: string; facets: string[] }[] = [
  { slug: 'market-edits', name: 'Market Edits', text: 'Curadorias por mercado: o que faz sentido para cada território, canal e consumidor.', facets: ['Brasil', 'América Latina', 'Europa'] },
  { slug: 'category-edits', name: 'Category Edits', text: 'Curadorias por categoria e ocasião: famílias olfativas, formatos, presentes e sazonalidade.', facets: ['Perfumaria', 'Home fragrance', 'Beleza', 'Ingredientes', 'Presentes', 'Sazonal'] },
  { slug: 'opportunity-edits', name: 'Opportunity Edits', text: 'Curadorias por oportunidade comercial: lançamentos, lacunas de portfólio e projetos abertos.', facets: ['Lançamentos', 'Lacunas de portfólio', 'Matérias-primas', 'Projetos abertos'] },
];
export const getEditCategory = (s: string) => EDIT_CATEGORIES.find((c) => c.slug === s);
