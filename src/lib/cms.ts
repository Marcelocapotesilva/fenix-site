/**
 * CMS adapter — the single place pages read content from.
 * Today it reads typed local content (src/content, content/posts.json via Pages CMS).
 * When Payload CMS is connected, replace the bodies of these functions with API calls;
 * page components do not need to change. See docs/INTEGRACOES.md §2.
 */
import type { Governance } from './types';
import { PROJECTS } from '@/content/projects';
import { CATALOG, EDITS, EXPERIENCES, MAISONS } from '@/content/catalog';
import { POSTS } from '@/content/journal';

/** Publication gate: stage never implies publication; confidential always wins. */
export function isPublic(item: Governance): boolean {
  return item.publication === 'authorized' && item.confidential !== true;
}

export const getPublicProjects = () => PROJECTS.filter(isPublic);
export const getPublicProject = (slug: string) => getPublicProjects().find((p) => p.slug === slug);
export const getPublicCatalog = () => CATALOG.filter(isPublic);
export const getPublicCatalogItem = (slug: string) => getPublicCatalog().find((p) => p.slug === slug);
export const getPublicMaisons = () => MAISONS.filter(isPublic);
export const getPublicEdits = () => EDITS.filter(isPublic);
export const getPublicExperiences = () => EXPERIENCES.filter(isPublic);
export const getPosts = () => POSTS;
