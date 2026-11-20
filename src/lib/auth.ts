/**
 * Partner Access client. There is NO simulated authentication.
 * Real protection happens on the server: session cookies (httpOnly), role/permission checks on
 * every API route and signed URLs for private files. See docs/INTEGRACOES.md §4.
 */
export const PARTNER_API = process.env.NEXT_PUBLIC_PARTNER_API_URL || '';

export type AuthResult =
  | { status: 'ok'; redirect: string }
  | { status: 'not_configured' }
  | { status: 'error'; message: string };

async function call(path: string, body: unknown): Promise<AuthResult> {
  if (!PARTNER_API) return { status: 'not_configured' };
  try {
    const res = await fetch(`${PARTNER_API}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { redirect?: string; message?: string };
    if (!res.ok) return { status: 'error', message: data.message || `Erro ${res.status}` };
    return { status: 'ok', redirect: data.redirect || '/partner-access/portal/' };
  } catch {
    return { status: 'error', message: 'Não foi possível conectar ao serviço de autenticação.' };
  }
}

export const signIn = (email: string, password: string) => call('/auth/login', { email, password });
export const requestPasswordReset = (email: string) => call('/auth/forgot-password', { email });
export const registerCompany = (data: Record<string, unknown>) => call('/auth/register', data);
