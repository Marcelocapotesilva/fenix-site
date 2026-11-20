'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useRef, useState, type FormEvent } from 'react';
import { COUNTRIES, OBJECTIVES, SEGMENTS } from '@/content/site';
import { FORMS_ENDPOINT, isEmail, isFreeMail, PRIVACY_POLICY_VERSION, submitRequest, summarize, type RequestPayload } from '@/lib/forms';
import { useI18n } from '@/lib/i18n';
import { useSelection } from '@/lib/selection';

export interface ExtraField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'radio' | 'checks';
  options?: readonly string[];
  required?: boolean;
  hint?: string;
  full?: boolean;
}

interface Props {
  formId: string;
  intent?: string;
  lockIntent?: boolean;
  extra?: ExtraField[];
  includeSelection?: boolean;
  submitLabel?: string;
  showMessage?: boolean;
  messageLabel?: string;
  tone?: 'light' | 'ink';
}

type State = 'idle' | 'submitting' | 'sent' | 'not_configured' | 'error';
type Values = Record<string, string | string[] | boolean>;

const CORE_REQUIRED = ['name', 'email', 'company', 'role', 'country', 'segment', 'objective'] as const;

export function RequestForm({
  formId, intent, lockIntent = false, extra = [], includeSelection = false, submitLabel, showMessage = true, messageLabel, tone = 'light',
}: Props) {
  const { t, locale } = useI18n();
  const pathname = usePathname() || '/';
  const selection = useSelection();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<Values>(() => {
    const v: Values = { objective: intent || '', consent: false };
    extra.forEach((f) => (v[f.name] = f.type === 'checks' ? [] : ''));
    return v;
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [reference, setReference] = useState<string | undefined>();

  const fid = (n: string) => `${uid}-${n}`;
  const required = [...CORE_REQUIRED.filter((k) => k !== 'objective' || !lockIntent), ...extra.filter((f) => f.required).map((f) => f.name)];

  function validateField(name: string, v: Values): string {
    const val = v[name];
    if (name === 'consent') return v.consent ? '' : 'É necessário aceitar a Política de Privacidade.';
    if (required.includes(name)) {
      if (Array.isArray(val) ? val.length === 0 : !String(val ?? '').trim()) return 'Campo obrigatório.';
    }
    if (name === 'email' && val && !isEmail(String(val))) return 'Informe um e-mail válido.';
    return '';
  }

  function validateAll(v: Values) {
    const e: Record<string, string> = {};
    [...required, 'email', 'consent'].forEach((n) => {
      const msg = validateField(n, v);
      if (msg) e[n] = msg;
    });
    return e;
  }

  function set(name: string, value: string | string[] | boolean) {
    const next = { ...values, [name]: value };
    setValues(next);
    // errors clear instantly as soon as the field becomes valid
    if (errors[name]) {
      const msg = validateField(name, next);
      setErrors((cur) => ({ ...cur, [name]: msg }));
    }
  }

  function blur(name: string) {
    setTouched((c) => ({ ...c, [name]: true }));
    const msg = validateField(name, values);
    setErrors((cur) => ({ ...cur, [name]: msg }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateAll(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(errs).map((k) => [k, true])));
    const firstInvalid = Object.keys(errs).find((k) => errs[k]);
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }
    const fields: RequestPayload['fields'] = {};
    const labelOf: Record<string, string> = {
      name: t('name'), email: t('email'), company: t('company'), role: t('role'), country: t('country'),
      segment: t('segment'), objective: t('objective'), message: messageLabel || t('message'),
    };
    extra.forEach((f) => (labelOf[f.name] = f.label));
    Object.entries(values).forEach(([k, v]) => {
      if (k === 'consent') return;
      if (Array.isArray(v) ? v.length : String(v).trim()) fields[labelOf[k] || k] = v;
    });
    const payload: RequestPayload = {
      formId,
      intent: String(values.objective || intent || formId),
      sourcePage: pathname,
      fields,
      items: includeSelection ? selection.items.map(({ slug, name }) => ({ slug, name })) : undefined,
      consent: { privacy: Boolean(values.consent), at: new Date().toISOString(), policyVersion: PRIVACY_POLICY_VERSION },
      locale,
      submittedAt: new Date().toISOString(),
    };
    setSummary(summarize(payload));
    setState('submitting');
    const res = await submitRequest(payload);
    if (res.status === 'sent') {
      setReference(res.reference);
      setState('sent');
    } else if (res.status === 'not_configured') {
      setState('not_configured');
    } else {
      setErrorMsg(res.message);
      setState('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  const err = (n: string) => (touched[n] || state !== 'idle') && errors[n];
  const fieldClass = (n: string, full = false) => `field${err(n) ? ' field--error' : ''}${full ? ' full' : ''}`;
  const describedBy = (n: string) => (err(n) ? `${fid(n)}-err` : undefined);
  const Req = () => <span className="req" aria-hidden="true">*</span>;
  const ErrorText = ({ n }: { n: string }) =>
    err(n) ? <span id={`${fid(n)}-err`} className="error-text">{errors[n]}</span> : null;

  if (state === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} className="notice notice--success" role="status">
        <p className="eyebrow">{t('sent')}</p>
        <p className="h3">Obrigado. Sua solicitação foi registrada.</p>
        <p className="body-sm">
          {reference ? <>Referência: <strong>{reference}</strong>. </> : null}
          A equipe responsável retornará pelo e-mail informado.
        </p>
      </div>
    );
  }

  const textInput = (n: string, label: string, opts: { type?: string; auto?: string; req?: boolean; hint?: string } = {}) => (
    <div className={fieldClass(n)}>
      <label htmlFor={fid(n)}>{label}{opts.req !== false && <Req />}</label>
      <input
        id={fid(n)} name={n} className="input" type={opts.type || 'text'} autoComplete={opts.auto}
        value={String(values[n] ?? '')} onChange={(e) => set(n, e.target.value)} onBlur={() => blur(n)}
        aria-invalid={Boolean(err(n))} aria-describedby={describedBy(n)} aria-required={opts.req !== false}
      />
      {opts.hint && <span className="hint">{opts.hint}</span>}
      <ErrorText n={n} />
    </div>
  );

  const select = (n: string, label: string, options: readonly string[], req = true, full = false) => (
    <div className={fieldClass(n, full)}>
      <label htmlFor={fid(n)}>{label}{req && <Req />}</label>
      <select
        id={fid(n)} name={n} className="select" value={String(values[n] ?? '')}
        onChange={(e) => set(n, e.target.value)} onBlur={() => blur(n)}
        aria-invalid={Boolean(err(n))} aria-describedby={describedBy(n)} aria-required={req}
      >
        <option value="">{t('select')}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ErrorText n={n} />
    </div>
  );

  const email = String(values.email || '');

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby={`${uid}-req-note`}>
      <p id={`${uid}-req-note`} className="full caption muted"><span className="req">*</span> {t('required')}</p>

      {!lockIntent && (
        <fieldset className={`field full${err('objective') ? ' field--error' : ''}`} aria-describedby={describedBy('objective')}>
          <legend className="mb-4">{t('objective')}<Req /></legend>
          <div className="choice-grid">
            {OBJECTIVES.map((o) => (
              <label className="choice" key={o}>
                <input type="radio" name="objective" value={o} checked={values.objective === o} onChange={() => set('objective', o)} onBlur={() => blur('objective')} />
                <span>{o}</span>
              </label>
            ))}
          </div>
          <ErrorText n="objective" />
        </fieldset>
      )}

      {textInput('name', t('name'), { auto: 'name' })}
      {textInput('email', t('email'), {
        type: 'email', auto: 'email',
        hint: email && isEmail(email) && isFreeMail(email) ? 'Recomendamos usar o e-mail da empresa para agilizar a validação.' : undefined,
      })}
      {textInput('company', t('company'), { auto: 'organization' })}
      {textInput('role', t('role'), { auto: 'organization-title' })}
      {select('country', t('country'), COUNTRIES)}
      {select('segment', t('segment'), SEGMENTS)}

      {extra.map((f) => {
        if (f.type === 'select') return <div key={f.name} className={f.full ? 'full' : undefined} style={{ display: 'contents' }}>{select(f.name, f.label, f.options || [], Boolean(f.required), f.full)}</div>;
        if (f.type === 'text') return <div key={f.name} style={{ display: 'contents' }}>{textInput(f.name, f.label, { req: Boolean(f.required), hint: f.hint })}</div>;
        if (f.type === 'textarea')
          return (
            <div key={f.name} className={fieldClass(f.name, true)}>
              <label htmlFor={fid(f.name)}>{f.label}{f.required && <Req />}</label>
              <textarea id={fid(f.name)} name={f.name} className="textarea" value={String(values[f.name] ?? '')} onChange={(e) => set(f.name, e.target.value)} onBlur={() => blur(f.name)} aria-invalid={Boolean(err(f.name))} aria-describedby={describedBy(f.name)} />
              {f.hint && <span className="hint">{f.hint}</span>}
              <ErrorText n={f.name} />
            </div>
          );
        const isChecks = f.type === 'checks';
        const cur = values[f.name];
        return (
          <fieldset key={f.name} className={`field full${err(f.name) ? ' field--error' : ''}`}>
            <legend className="mb-4">{f.label}{f.required && <Req />}</legend>
            {f.hint && <span className="hint">{f.hint}</span>}
            <div className="choice-grid">
              {(f.options || []).map((o) => (
                <label className="choice" key={o}>
                  <input
                    type={isChecks ? 'checkbox' : 'radio'} name={f.name} value={o}
                    checked={isChecks ? (cur as string[]).includes(o) : cur === o}
                    onChange={() => {
                      if (!isChecks) return set(f.name, o);
                      const arr = cur as string[];
                      set(f.name, arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
                    }}
                    onBlur={() => blur(f.name)}
                  />
                  <span>{o}</span>
                </label>
              ))}
            </div>
            <ErrorText n={f.name} />
          </fieldset>
        );
      })}

      {showMessage && (
        <div className="field full">
          <label htmlFor={fid('message')}>{messageLabel || t('message')}</label>
          <textarea id={fid('message')} name="message" className="textarea" value={String(values.message ?? '')} onChange={(e) => set('message', e.target.value)} />
        </div>
      )}

      {includeSelection && (
        <div className="full notice">
          <p className="eyebrow">Itens incluídos na solicitação ({selection.items.length})</p>
          {selection.items.length ? (
            <ul className="body-sm">{selection.items.map((i) => <li key={i.slug}>— {i.name} <span className="muted">· {i.type}</span></li>)}</ul>
          ) : (
            <p className="body-sm muted">Nenhum item selecionado. <Link href="/portfolio/" className="text-btn">Abrir o Portfolio</Link></p>
          )}
        </div>
      )}

      <div className={`full ${err('consent') ? 'field--error' : ''}`}>
        <label className="check">
          <input type="checkbox" name="consent" checked={Boolean(values.consent)} onChange={(e) => set('consent', e.target.checked)} onBlur={() => blur('consent')} aria-describedby={describedBy('consent')} aria-required="true" />
          <span>{t('consent')} <Link href="/legal/privacy/" className="text-btn" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'inherit' }}>Política de Privacidade</Link>.<span className="req" aria-hidden="true"> *</span></span>
        </label>
        <ErrorText n="consent" />
      </div>

      <div className="full form-actions">
        <button type="submit" className={`btn ${tone === 'ink' ? 'btn--light' : ''}`} disabled={state === 'submitting'} aria-busy={state === 'submitting'}>
          {state === 'submitting' ? (<><span className="spinner" aria-hidden="true" /> {t('sending')}</>) : (submitLabel || t('submit'))}
        </button>
        {!FORMS_ENDPOINT && <span className="caption muted">Integração de envio pendente — nenhum dado será transmitido.</span>}
      </div>

      <div ref={statusRef} tabIndex={-1} className="full" aria-live="polite">
        {Object.values(errors).some(Boolean) && state === 'idle' && Object.keys(touched).length > 0 && (
          <p className="error-text">{t('fixErrors')}</p>
        )}
        {state === 'not_configured' && (
          <div className="notice notice--pending">
            <p className="eyebrow">{t('notConfiguredTitle')}</p>
            <p className="body-sm">{t('notConfigured')}</p>
            <pre className="summary-box mt-3">{summary}</pre>
            <div className="row mt-3">
              <button type="button" className="btn btn--sm" onClick={copySummary}>{copied ? t('copied') : t('copy')}</button>
            </div>
          </div>
        )}
        {state === 'error' && (
          <div className="notice notice--error">
            <p className="eyebrow">{t('errorTitle')}</p>
            <p className="body-sm">{errorMsg} Seus dados continuam no formulário.</p>
            <div className="row mt-3"><button type="submit" className="btn btn--sm">{t('retry')}</button></div>
          </div>
        )}
      </div>
    </form>
  );
}
