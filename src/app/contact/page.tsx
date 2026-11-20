import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from './ContactForm';
import { DefList, PageHero } from '@/components/ui';
import { SITE } from '@/content/site';

export const metadata: Metadata = { title: 'Start a Project — Contato comercial', description: 'Formulário institucional segmentado: o que você deseja desenvolver?' };

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Contato' }]} eyebrow="Start a Project · Contato comercial" title={<>O que você deseja <span className="italic">desenvolver?</span></>} intro="Escolha o objetivo e conte-nos sobre a empresa. A solicitação é registrada, classificada por categoria e território e encaminhada ao responsável." />
      <section className="section">
        <div className="container grid">
          <div className="col-8">
            <Suspense fallback={<div className="skeleton" style={{ height: 480 }} aria-label="Carregando formulário" />}>
              <ContactForm />
            </Suspense>
          </div>
          <div className="col-3 col-start-10 stack-lg">
            <DefList rows={[
              { label: 'E-mail comercial', value: <a href={`mailto:${SITE.email}`} className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>{SITE.email}</a> },
              { label: 'Telefone', pending: 'A confirmar' },
              { label: 'Endereço', pending: 'A confirmar' },
            ]} />
            <p className="caption muted">Telefone e endereço serão publicados após verificação.</p>
          </div>
        </div>
      </section>
    </>
  );
}
