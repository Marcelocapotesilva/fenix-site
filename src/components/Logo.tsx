import { LOGO_SRC, LOGO_TRANSPARENT_SRC } from '@/content/images';

/**
 * Official FÊNIX — Fragrances Holding logo. The PNG is served byte-identical to the file supplied.
 * - LogoPlate: framed view used in the masthead. It only hides empty black field around the mark;
 *   the symbol, wordmark and signature are always complete, never scaled non-uniformly, never filtered.
 * - LogoFull: the complete square artwork, uncropped.
 */
export function LogoPlate({ label = 'FÊNIX — Fragrances Holding', fluid = false, priority = false }: { label?: string; fluid?: boolean; priority?: boolean }) {
  return (
    <span className={`logo-plate${fluid ? ' logo-plate--fluid' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_SRC} alt={label} width={1600} height={1600} loading={priority ? 'eager' : undefined} />
    </span>
  );
}

export function LogoFull({ label = 'FÊNIX — Fragrances Holding', priority = false }: { label?: string; priority?: boolean }) {
  return (
    <span className="logo-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_SRC} alt={label} width={1600} height={1600} loading={priority ? 'eager' : 'lazy'} />
    </span>
  );
}

/**
 * Transparent logo (approved by FÊNIX, 24/11/2026): generated from the official PNG by converting the
 * black field to transparency (colour-to-alpha), keeping glow and anti-aliasing. Dark backgrounds only.
 */
export function LogoMark({ label = 'FÊNIX — Fragrances Holding', className = '', priority = false }: { label?: string; className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`logo-mark ${className}`} src={LOGO_TRANSPARENT_SRC} alt={label} width={688} height={576} loading={priority ? 'eager' : 'lazy'} decoding="async" />
  );
}
