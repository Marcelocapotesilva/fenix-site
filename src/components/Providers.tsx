'use client';
import type { ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n';
import { SelectionProvider } from '@/lib/selection';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <SelectionProvider>{children}</SelectionProvider>
    </I18nProvider>
  );
}
