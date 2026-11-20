import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { JOURNEYS } from '@/content/journeys';
import { POSITIONING_LINE } from '@/content/site';

export const metadata: Metadata = { title: 'Who We Work With', description: 'Seis jornadas comerciais para marcas, operadores, varejo, produtores, hotelaria e instituições.' };

export default function JourneysPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Who We Work With' }]} eyebrow="Who We Work With" title="Com quem trabalhamos." intro={POSITIONING_LINE} />
      <section className="section">
        <div className="container">
          <div className="journeys">
            {JOURNEYS.map((j) => (
              <Link key={j.slug} href={`/who-we-work-with/${j.slug}/`} className="journey">
                <span className="eyebrow">{j.number}</span>
                <span>
                  <span className="journey__title" style={{ display: 'block' }}>{j.name}</span>
                  <span className="body-sm muted" style={{ display: 'block', marginTop: 12 }}>{j.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
