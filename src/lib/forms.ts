/**
 * Form submission — honest by design.
 * If NEXT_PUBLIC_FORMS_ENDPOINT is not configured, nothing is sent and the UI says so.
 * Payload contract (JSON) is documented in docs/INTEGRACOES.md §3.
 */
export interface RequestPayload {
  formId: string;
  intent: string;
  sourcePage: string;
  fields: Record<string, string | string[] | boolean>;
  items?: { slug: string; name: string }[];
  consent: { privacy: boolean; at: string; policyVersion: string };
  locale: string;
  submittedAt: string;
}

export type SubmitResult =
  | { status: 'sent'; reference?: string }
  | { status: 'not_configured' }
  | { status: 'error'; message: string };

export const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT || '';
export const PRIVACY_POLICY_VERSION = 'draft-2026-11';

export async function submitRequest(payload: RequestPayload): Promise<SubmitResult> {
  if (!FORMS_ENDPOINT) return { status: 'not_configured' };
  try {
    const res = await fetch(FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { status: 'error', message: `Servidor respondeu ${res.status}.` };
    const data = (await res.json().catch(() => ({}))) as { reference?: string };
    return { status: 'sent', reference: data.reference };
  } catch {
    return { status: 'error', message: 'Não foi possível conectar ao servidor.' };
  }
}

const FREE_MAIL = ['gmail.', 'hotmail.', 'outlook.', 'yahoo.', 'icloud.', 'live.', 'bol.com', 'uol.com', 'terra.com'];
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isFreeMail = (v: string) => FREE_MAIL.some((d) => v.toLowerCase().split('@')[1]?.startsWith(d) || v.toLowerCase().includes('@' + d));

export function summarize(payload: RequestPayload): string {
  const lines = [
    `Solicitação FÊNIX — ${payload.intent}`,
    `Origem: ${payload.sourcePage}`,
    '',
    ...Object.entries(payload.fields).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`),
  ];
  if (payload.items?.length) lines.push('', 'Itens selecionados:', ...payload.items.map((i) => `- ${i.name}`));
  lines.push('', `Consentimento de privacidade: ${payload.consent.privacy ? 'sim' : 'não'} (${payload.consent.policyVersion})`);
  return lines.join('\n');
}
