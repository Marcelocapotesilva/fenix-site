import type { ReactNode } from 'react';
import { RequestForm, type ExtraField } from './RequestForm';

export function FormSection({
  id = 'formulario', label, title, intro, formId, intent, lockIntent, extra, includeSelection, submitLabel, messageLabel, band = true, aside,
}: {
  id?: string; label: string; title: string; intro?: ReactNode; formId: string; intent?: string; lockIntent?: boolean;
  extra?: ExtraField[]; includeSelection?: boolean; submitLabel?: string; messageLabel?: string; band?: boolean; aside?: ReactNode;
}) {
  return (
    <section className={`section ${band ? 'section--band' : 'section--ruled'}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="grid">
          <div className="col-4 stack">
            <p className="eyebrow">{label}</p>
            <h2 id={`${id}-title`} className="h2">{title}</h2>
            {intro && <div className="muted">{intro}</div>}
            {aside}
          </div>
          <div className="col-8">
            <RequestForm
              formId={formId}
              intent={intent}
              lockIntent={lockIntent}
              extra={extra}
              includeSelection={includeSelection}
              submitLabel={submitLabel}
              messageLabel={messageLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
