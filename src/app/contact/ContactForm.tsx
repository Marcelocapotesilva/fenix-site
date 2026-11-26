'use client';
import { useSearchParams } from 'next/navigation';
import { RequestForm } from '@/components/RequestForm';
import { OBJECTIVES } from '@/content/site';

export function ContactForm() {
  const intent = useSearchParams().get('intent') || '';
  const valid = (OBJECTIVES as readonly string[]).includes(intent) ? intent : undefined;
  return <RequestForm key={valid || 'none'} formId="contact-general" intent={valid} />;
}
