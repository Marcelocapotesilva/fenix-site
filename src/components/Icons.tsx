type P = { className?: string; title?: string };
const base = (title?: string) => (title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const });

export const IconSearch = ({ className = 'icon', title }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base(title)}><circle cx="7" cy="7" r="5" /><path d="M11 11l4 4" /></svg>
);
export const IconClose = ({ className = 'icon', title }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base(title)}><path d="M3 3l10 10M13 3L3 13" /></svg>
);
export const IconMenu = ({ className = 'icon', title }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base(title)}><path d="M1 4h14M1 8h14M1 12h14" /></svg>
);
export const IconUser = ({ className = 'icon', title }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base(title)}><circle cx="8" cy="5" r="3" /><path d="M2 15c1-3 3.4-4.5 6-4.5s5 1.5 6 4.5" /></svg>
);
export const IconLock = ({ className = 'icon', title }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base(title)}><rect x="3" y="7" width="10" height="8" /><path d="M5 7V5a3 3 0 016 0v2" /></svg>
);

export const Arrow = () => <span className="arr" aria-hidden="true">→</span>;
