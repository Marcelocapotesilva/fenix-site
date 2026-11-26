'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'pt' | 'en' | 'es';
export const LOCALES: Locale[] = ['pt', 'en', 'es'];

/**
 * Interface strings (navigation chrome, forms, states). Editorial content is authored in PT;
 * EN/ES editorial versions are pending translation (status 3 — prepared, inactive).
 */
const DICT = {
  pt: {
    skip: 'Pular para o conteúdo',
    menu: 'Menu',
    close: 'Fechar',
    search: 'Buscar',
    searchPlaceholder: 'Buscar maisons, especialidades, projetos, artigos…',
    searchNoResults: 'Nenhum resultado para',
    searchHint: 'Digite ao menos duas letras.',
    partnerAccess: 'Partner Access',
    language: 'Idioma',
    tagline: 'Representação internacional · Mercados · Projetos especiais',
    required: 'Obrigatório',
    name: 'Nome',
    email: 'E-mail profissional',
    company: 'Empresa',
    role: 'Cargo',
    country: 'País',
    segment: 'Segmento',
    objective: 'O que você deseja desenvolver?',
    message: 'Conte-nos sobre o projeto',
    select: 'Selecione',
    consent: 'Li a Política de Privacidade e autorizo o tratamento dos meus dados para retorno a esta solicitação.',
    submit: 'Enviar solicitação',
    sending: 'Enviando…',
    sent: 'Solicitação registrada',
    notConfiguredTitle: 'Envio ainda não conectado',
    notConfigured:
      'Sua solicitação foi validada, mas NÃO foi enviada: o serviço de recebimento (CRM) ainda não está integrado a este site. Copie o resumo abaixo para não perder as informações.',
    copy: 'Copiar resumo',
    copied: 'Resumo copiado',
    errorTitle: 'Não foi possível enviar',
    retry: 'Tentar novamente',
    fixErrors: 'Revise os campos indicados.',
    editorialNote: 'Interface em português. Conteúdo editorial em português.',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    search: 'Search',
    searchPlaceholder: 'Search maisons, expertise, projects, articles…',
    searchNoResults: 'No results for',
    searchHint: 'Type at least two letters.',
    partnerAccess: 'Partner Access',
    language: 'Language',
    tagline: 'International representation · Markets · Special projects',
    required: 'Required',
    name: 'Name',
    email: 'Business email',
    company: 'Company',
    role: 'Job title',
    country: 'Country',
    segment: 'Segment',
    objective: 'What would you like to develop?',
    message: 'Tell us about the project',
    select: 'Select',
    consent: 'I have read the Privacy Policy and consent to my data being processed to answer this request.',
    submit: 'Send request',
    sending: 'Sending…',
    sent: 'Request received',
    notConfiguredTitle: 'Submission not connected yet',
    notConfigured:
      'Your request was validated but NOT sent: the receiving service (CRM) is not yet connected to this site. Copy the summary below so you keep the information.',
    copy: 'Copy summary',
    copied: 'Summary copied',
    errorTitle: 'Could not send',
    retry: 'Try again',
    fixErrors: 'Please review the highlighted fields.',
    editorialNote: 'Interface in English. Editorial content is being translated and is shown in Portuguese.',
  },
  es: {
    skip: 'Saltar al contenido',
    menu: 'Menú',
    close: 'Cerrar',
    search: 'Buscar',
    searchPlaceholder: 'Buscar maisons, especialidades, proyectos, artículos…',
    searchNoResults: 'Sin resultados para',
    searchHint: 'Escriba al menos dos letras.',
    partnerAccess: 'Partner Access',
    language: 'Idioma',
    tagline: 'Representación internacional · Mercados · Proyectos especiales',
    required: 'Obligatorio',
    name: 'Nombre',
    email: 'Correo profesional',
    company: 'Empresa',
    role: 'Cargo',
    country: 'País',
    segment: 'Segmento',
    objective: '¿Qué desea desarrollar?',
    message: 'Cuéntenos sobre el proyecto',
    select: 'Seleccione',
    consent: 'He leído la Política de Privacidad y autorizo el tratamiento de mis datos para responder a esta solicitud.',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    sent: 'Solicitud recibida',
    notConfiguredTitle: 'Envío aún no conectado',
    notConfigured:
      'Su solicitud fue validada pero NO fue enviada: el servicio de recepción (CRM) aún no está integrado a este sitio. Copie el resumen para conservar la información.',
    copy: 'Copiar resumen',
    copied: 'Resumen copiado',
    errorTitle: 'No fue posible enviar',
    retry: 'Intentar de nuevo',
    fixErrors: 'Revise los campos indicados.',
    editorialNote: 'Interfaz en español. El contenido editorial está en traducción y se muestra en portugués.',
  },
} as const;

export type DictKey = keyof (typeof DICT)['pt'];

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: DictKey) => string;
}

const I18nContext = createContext<Ctx>({ locale: 'pt', setLocale: () => {}, t: (k) => DICT.pt[k] });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('fenix.locale') as Locale | null;
      if (saved && LOCALES.includes(saved)) setLocaleState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem('fenix.locale', l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(() => ({ locale, setLocale, t: (k) => DICT[locale][k] }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
