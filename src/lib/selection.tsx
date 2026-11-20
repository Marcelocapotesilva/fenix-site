'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface SelectedItem {
  slug: string;
  name: string;
  type: string;
}

interface Ctx {
  items: SelectedItem[];
  has: (slug: string) => boolean;
  toggle: (item: SelectedItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  ready: boolean;
}

const KEY = 'fenix.selection.v1';
const SelectionContext = createContext<Ctx>({
  items: [], has: () => false, toggle: () => {}, remove: () => {}, clear: () => {}, ready: false,
});

/** Interest list kept only in this browser (no personal data). Synced to the account once Partner Access is live. */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);
  const toggle = useCallback(
    (item: SelectedItem) =>
      setItems((cur) => (cur.some((i) => i.slug === item.slug) ? cur.filter((i) => i.slug !== item.slug) : [...cur, item])),
    [],
  );
  const remove = useCallback((slug: string) => setItems((cur) => cur.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, has, toggle, remove, clear, ready }), [items, has, toggle, remove, clear, ready]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export const useSelection = () => useContext(SelectionContext);
