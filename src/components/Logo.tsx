import { LOGO_SRC } from '@/content/images';

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
