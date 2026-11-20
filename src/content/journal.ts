import type { JournalPost } from '@/lib/types';
import raw from '../../content/posts.json';
import { slugify } from '@/lib/text';

export const JOURNAL_CATEGORIES = [
  'World of Fragrance',
  'Business & Market Intelligence',
  'Retail & Luxury',
  'Origins & Ingredients',
  'Industry & Innovation',
  'Culture & Experiences',
  'Inside FÊNIX',
] as const;

interface RawPost {
  date: string;
  title: string;
  sub?: string;
  img?: string;
  imgCaption?: string;
  body: string;
  author?: string;
  category?: string;
  tags?: string[];
  references?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

/** Accepts the CMS formats in use: "DD/MM/YYYY", "20 AUGUST 2026" or ISO. */
function toIso(d: string): string {
  const m = d.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  const t = Date.parse(d);
  return Number.isNaN(t) ? '1970-01-01' : new Date(t).toISOString().slice(0, 10);
}

/** Paragraphs that open with the author's name followed by "is founder" are treated as the author bio. */
function splitBio(paragraphs: string[], author: string) {
  const last = paragraphs[paragraphs.length - 1] ?? '';
  if (author && last.startsWith(author) && /\bis\b/.test(last.slice(author.length, author.length + 6))) {
    return { body: paragraphs.slice(0, -1), bio: last };
  }
  return { body: paragraphs, bio: undefined };
}

export const POSTS: JournalPost[] = ((raw as { posts: RawPost[] }).posts || [])
  .map((p) => {
    const paragraphs = p.body.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    const author = p.author || 'FÊNIX';
    const { body, bio } = splitBio(paragraphs, author);
    return {
      slug: slugify(p.title),
      title: p.title,
      subtitle: p.sub || '',
      author,
      date: toIso(p.date),
      dateLabel: p.date,
      image: p.img || undefined,
      imageCaption: p.imgCaption || undefined,
      body,
      bio,
      category: p.category || 'Inside FÊNIX',
      tags: p.tags || [],
      references: p.references || [],
      seoTitle: p.seoTitle || p.title,
      seoDescription: p.seoDescription || p.sub || body[0]?.slice(0, 155) || '',
    } satisfies JournalPost;
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
