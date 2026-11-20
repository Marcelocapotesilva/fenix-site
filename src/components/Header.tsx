'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MAIN_NAV, UTILITY_NAV } from '@/content/site';
import { LOCALES, useI18n } from '@/lib/i18n';
import type { SearchDoc } from '@/lib/search-index';
import { IconClose, IconLock, IconMenu, IconSearch } from './Icons';
import { LogoPlate } from './Logo';
import { SearchOverlay } from './Search';

function LangSwitch({ light = true }: { light?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t('language')} style={light ? undefined : { color: 'inherit' }}>
      {LOCALES.map((l) => (
        <button key={l} type="button" aria-pressed={locale === l} onClick={() => setLocale(l)} lang={l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header({ searchIndex }: { searchIndex: SearchDoc[] }) {
  const pathname = usePathname() || '/';
  const { t, locale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = pathname === '/';
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.45);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <a href="#conteudo" className="skip-link">{t('skip')}</a>
      <header className="masthead">
        <div className="container masthead__inner">
          <div className="masthead__left">
            <span className="masthead__tagline hide-mobile">{t('tagline')}</span>
            <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}>
              <IconMenu /> {t('menu')}
            </button>
          </div>
          <Link href="/" className={`masthead__home masthead__brand${isHome && !pastHero ? ' is-hidden' : ''}`} aria-label="FÊNIX — Fragrances Holding, página inicial" tabIndex={isHome && !pastHero ? -1 : undefined}>
            <LogoPlate />
          </Link>
          <div className="masthead__right">
            <button type="button" className="util-link" onClick={() => setSearchOpen(true)} aria-haspopup="dialog">
              <IconSearch /> <span className="hide-mobile">{t('search')}</span>
            </button>
            <span className="hide-mobile"><LangSwitch /></span>
            <Link href="/partner-access/" className="util-link util-link--boxed hide-mobile">
              <IconLock /> {t('partnerAccess')}
            </Link>
          </div>
        </div>
      </header>

      <nav className="navbar" aria-label="Navegação principal">
        <div className="container navbar__inner">
          <ul className="navbar__list">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} className={item.featured ? 'is-featured' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {locale !== 'pt' && (
        <div className="locale-note" role="note">
          <div className="container">{t('editorialNote')}</div>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label={t('menu')}>
          <div className="container">
            <div className="mobile-menu__top">
              <Link href="/" className="masthead__home" style={{ height: 60 }} aria-label="Página inicial"><LogoPlate /></Link>
              <button type="button" className="close-btn" onClick={() => setMenuOpen(false)} autoFocus>
                {t('close')} <IconClose />
              </button>
            </div>
            <ul className="mobile-menu__list">
              {MAIN_NAV.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
                    <span>{item.label}</span>
                    <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-menu__util">
              <Link href="/partner-access/" className="util-link util-link--boxed"><IconLock /> {t('partnerAccess')}</Link>
              {UTILITY_NAV.map((u) => (
                <Link key={u.href} href={u.href} className="util-link">{u.label}</Link>
              ))}
              <LangSwitch />
            </div>
          </div>
        </div>
      )}

      {searchOpen && <SearchOverlay index={searchIndex} onClose={() => setSearchOpen(false)} />}
    </>
  );
}
