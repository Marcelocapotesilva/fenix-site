'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { registerCompany, requestPasswordReset, signIn, type AuthResult } from '@/lib/auth';
import { isEmail } from '@/lib/forms';
import { COUNTRIES } from '@/content/site';

function ResultNotice({ result }: { result: AuthResult | null }) {
  if (!result || result.status === 'ok') return null;
  if (result.status === 'not_configured')
    return (
      <div className="notice notice--pending" role="alert">
        <p className="eyebrow">Serviço de autenticação não conectado</p>
        <p className="body-sm">
          O Partner Access ainda não está ligado ao servidor. Nenhum acesso é concedido por esta tela e nenhum dado foi enviado.
          Para solicitar acesso antecipado, use o <Link href="/contact/?intent=Distribuir%20ou%20importar%20produtos" className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>formulário comercial</Link>.
        </p>
      </div>
    );
  return (
    <div className="notice notice--error" role="alert">
      <p className="eyebrow">Não foi possível continuar</p>
      <p className="body-sm">{result.message}</p>
    </div>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isEmail(email)) errs.email = 'Informe o e-mail profissional cadastrado.';
    if (password.length < 8) errs.password = 'A senha tem ao menos 8 caracteres.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const r = await signIn(email, password);
    setBusy(false);
    if (r.status === 'ok') window.location.assign(r.redirect);
    else setResult(r);
  }

  return (
    <form className="form" style={{ gridTemplateColumns: '1fr' }} noValidate onSubmit={onSubmit}>
      <div className={`field${errors.email ? ' field--error' : ''}`}>
        <label htmlFor="login-email">E-mail profissional</label>
        <input id="login-email" name="email" className="input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'login-email-err' : undefined} />
        {errors.email && <span id="login-email-err" className="error-text">{errors.email}</span>}
      </div>
      <div className={`field${errors.password ? ' field--error' : ''}`}>
        <label htmlFor="login-password">Senha</label>
        <input id="login-password" name="password" className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} aria-describedby={errors.password ? 'login-password-err' : undefined} />
        {errors.password && <span id="login-password-err" className="error-text">{errors.password}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn" disabled={busy} aria-busy={busy}>{busy ? <><span className="spinner" aria-hidden="true" /> Verificando…</> : 'Entrar'}</button>
        <Link href="/partner-access/recover/" className="text-btn">Esqueci a senha</Link>
      </div>
      <div aria-live="polite"><ResultNotice result={result} /></div>
    </form>
  );
}

export function RecoverForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError('Informe um e-mail válido.');
    setError('');
    setBusy(true);
    const r = await requestPasswordReset(email);
    setBusy(false);
    setResult(r);
  }
  if (result?.status === 'ok')
    return (
      <div className="notice notice--success" role="status">
        <p className="eyebrow">Verifique seu e-mail</p>
        <p className="body-sm">Se houver uma conta aprovada para este endereço, enviaremos as instruções de redefinição.</p>
      </div>
    );
  return (
    <form className="form" style={{ gridTemplateColumns: '1fr' }} noValidate onSubmit={onSubmit}>
      <div className={`field${error ? ' field--error' : ''}`}>
        <label htmlFor="rec-email">E-mail profissional</label>
        <input id="rec-email" className="input" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); if (error && isEmail(e.target.value)) setError(''); }} aria-invalid={!!error} aria-describedby={error ? 'rec-email-err' : undefined} />
        {error && <span id="rec-email-err" className="error-text">{error}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn" disabled={busy}>{busy ? <><span className="spinner" aria-hidden="true" /> Enviando…</> : 'Enviar instruções'}</button>
        <Link href="/partner-access/" className="text-btn">Voltar ao login</Link>
      </div>
      <div aria-live="polite"><ResultNotice result={result} /></div>
    </form>
  );
}

const PROFILES = ['Maison / fornecedor', 'Distribuidor / importador', 'Boutique / comprador', 'Outro parceiro'];
const MARKETS = ['Brasil', 'América Latina', 'Europa', 'Outros'];
const CATEGORIES = ['Perfumaria', 'Beleza e cuidados', 'Home fragrance', 'Ingredientes e matérias-primas', 'Alimentos e nutrição'];
const STEPS = ['Empresa', 'Responsável', 'Perfil e permissões', 'Revisão'];

export function RegisterForm() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Record<string, string | string[] | boolean>>({
    companyName: '', taxId: '', country: '', website: '', fullName: '', role: '', email: '', phone: '',
    profile: '', markets: [], categories: [], terms: false, privacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);

  const set = (k: string, val: string | string[] | boolean) => {
    setV((c) => ({ ...c, [k]: val }));
    if (errors[k]) setErrors((c) => ({ ...c, [k]: '' }));
  };
  const toggleArr = (k: string, o: string) => {
    const arr = v[k] as string[];
    set(k, arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
  };

  function validate(s: number) {
    const e: Record<string, string> = {};
    const need = (k: string, msg = 'Campo obrigatório.') => { if (!String(v[k] || '').trim()) e[k] = msg; };
    if (s === 0) { need('companyName'); need('country'); }
    if (s === 1) { need('fullName'); need('role'); if (!isEmail(String(v.email))) e.email = 'Informe um e-mail profissional válido.'; }
    if (s === 2) {
      need('profile', 'Escolha um perfil.');
      if (!(v.markets as string[]).length) e.markets = 'Escolha ao menos um mercado.';
      if (!(v.categories as string[]).length) e.categories = 'Escolha ao menos uma categoria.';
    }
    if (s === 3) {
      if (!v.terms) e.terms = 'É necessário aceitar os termos de uso.';
      if (!v.privacy) e.privacy = 'É necessário aceitar a Política de Privacidade.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 3) { if (validate(step)) setStep(step + 1); return; }
    if (!validate(3)) return;
    setBusy(true);
    const r = await registerCompany(v);
    setBusy(false);
    if (r.status === 'ok') window.location.assign('/partner-access/verify-email/');
    else setResult(r);
  }

  const text = (k: string, label: string, opts: { type?: string; req?: boolean; auto?: string; hint?: string } = {}) => (
    <div className={`field${errors[k] ? ' field--error' : ''}`}>
      <label htmlFor={`reg-${k}`}>{label}{opts.req !== false && <span className="req" aria-hidden="true">*</span>}</label>
      <input id={`reg-${k}`} className="input" type={opts.type || 'text'} autoComplete={opts.auto} value={String(v[k])} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `reg-${k}-err` : undefined} />
      {opts.hint && <span className="hint">{opts.hint}</span>}
      {errors[k] && <span id={`reg-${k}-err`} className="error-text">{errors[k]}</span>}
    </div>
  );
  const checks = (k: string, label: string, options: string[], radio = false) => (
    <fieldset className={`field full${errors[k] ? ' field--error' : ''}`}>
      <legend className="mb-4">{label}<span className="req" aria-hidden="true">*</span></legend>
      <div className="choice-grid">
        {options.map((o) => (
          <label className="choice" key={o}>
            <input type={radio ? 'radio' : 'checkbox'} name={k} checked={radio ? v[k] === o : (v[k] as string[]).includes(o)} onChange={() => (radio ? set(k, o) : toggleArr(k, o))} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {errors[k] && <span className="error-text">{errors[k]}</span>}
    </fieldset>
  );

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-labelledby="reg-step-title">
      <ol className="full row" style={{ gap: 0, borderTop: 'var(--rule)' }} aria-label="Etapas do cadastro">
        {STEPS.map((s, i) => (
          <li key={s} className="eyebrow" style={{ flex: 1, padding: '12px 0', borderTop: i <= step ? '2px solid var(--carvao)' : '2px solid transparent', marginTop: -1, opacity: i <= step ? 1 : 0.5 }} aria-current={i === step ? 'step' : undefined}>
            {String(i + 1).padStart(2, '0')} {s}
          </li>
        ))}
      </ol>
      <h2 id="reg-step-title" className="h3 full">{STEPS[step]}</h2>

      {step === 0 && (<>
        {text('companyName', 'Razão social / nome da empresa', { auto: 'organization' })}
        {text('taxId', 'Registro empresarial (CNPJ, VAT…)', { req: false, hint: 'Usado na verificação manual.' })}
        <div className={`field${errors.country ? ' field--error' : ''}`}>
          <label htmlFor="reg-country">País<span className="req" aria-hidden="true">*</span></label>
          <select id="reg-country" className="select" value={String(v.country)} onChange={(e) => set('country', e.target.value)} aria-invalid={!!errors.country}>
            <option value="">Selecione</option>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.country && <span className="error-text">{errors.country}</span>}
        </div>
        {text('website', 'Site', { req: false, type: 'url', auto: 'url' })}
      </>)}

      {step === 1 && (<>
        {text('fullName', 'Nome completo', { auto: 'name' })}
        {text('role', 'Cargo', { auto: 'organization-title' })}
        {text('email', 'E-mail profissional', { type: 'email', auto: 'email', hint: 'Enviaremos um link de verificação.' })}
        {text('phone', 'Telefone', { req: false, type: 'tel', auto: 'tel' })}
      </>)}

      {step === 2 && (<>
        {checks('profile', 'Perfil de parceiro', PROFILES, true)}
        {checks('markets', 'Mercados de atuação', MARKETS)}
        {checks('categories', 'Categorias de interesse', CATEGORIES)}
        <p className="full caption muted">As permissões finais por empresa, mercado e categoria são definidas pela FÊNIX na aprovação manual.</p>
      </>)}

      {step === 3 && (<>
        <dl className="dl full">
          {[
            ['Empresa', `${v.companyName} · ${v.country}`],
            ['Responsável', `${v.fullName} · ${v.role}`],
            ['E-mail', String(v.email)],
            ['Perfil', String(v.profile)],
            ['Mercados', (v.markets as string[]).join(', ')],
            ['Categorias', (v.categories as string[]).join(', ')],
          ].map(([k, val]) => <div key={k}><dt>{k}</dt><dd>{val}</dd></div>)}
        </dl>
        <div className={`full ${errors.terms ? 'field--error' : ''}`}>
          <label className="check"><input type="checkbox" checked={Boolean(v.terms)} onChange={(e) => set('terms', e.target.checked)} /><span>Aceito os <Link href="/legal/terms/" className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>termos de uso</Link> do Partner Access.</span></label>
          {errors.terms && <span className="error-text">{errors.terms}</span>}
        </div>
        <div className={`full ${errors.privacy ? 'field--error' : ''}`}>
          <label className="check"><input type="checkbox" checked={Boolean(v.privacy)} onChange={(e) => set('privacy', e.target.checked)} /><span>Li a <Link href="/legal/privacy/" className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>Política de Privacidade</Link> e autorizo o tratamento dos dados para análise do cadastro.</span></label>
          {errors.privacy && <span className="error-text">{errors.privacy}</span>}
        </div>
      </>)}

      <div className="full form-actions">
        {step > 0 && <button type="button" className="text-btn" onClick={() => setStep(step - 1)}>Voltar</button>}
        <button type="submit" className="btn" disabled={busy}>
          {busy ? <><span className="spinner" aria-hidden="true" /> Enviando…</> : step < 3 ? 'Continuar' : 'Solicitar cadastro'}
        </button>
      </div>
      <div className="full" aria-live="polite"><ResultNotice result={result} /></div>
    </form>
  );
}
