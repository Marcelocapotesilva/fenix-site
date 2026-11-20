import '@fontsource/bodoni-moda/400.css';
import '@fontsource/bodoni-moda/500.css';
import '@fontsource/bodoni-moda/400-italic.css';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';
import { RevealObserver } from '@/components/Reveal';
import { SelectionBar } from '@/components/Selection';
import { SITE } from '@/content/site';
import { buildSearchIndex } from '@/lib/search-index';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}`, template: `%s — FÊNIX` },
  description: SITE.description,
  icons: { icon: '/brand/fenix-fragrances-holding-official.png' },
  openGraph: { siteName: SITE.name, type: 'website', locale: 'pt_BR', images: ['/brand/fenix-fragrances-holding-official.png'] },
};

export const viewport: Viewport = { themeColor: '#171612', width: 'device-width', initialScale: 1 };

const searchIndex = buildSearchIndex().map((d) => ({ ...d, text: d.text.slice(0, 900) }));

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Header searchIndex={searchIndex} />
          <main id="conteudo" tabIndex={-1}>{children}</main>
          <Footer />
          <SelectionBar />
          <RevealObserver />
        </Providers>
      </body>
    </html>
  );
}
