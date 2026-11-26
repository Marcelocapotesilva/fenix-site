# Integrações pendentes

Todas as integrações estão isoladas em adaptadores. Nenhuma tela simula sucesso: sem a integração, a interface diz explicitamente que nada foi enviado ou autenticado.

## 1. Classificação das funcionalidades (§22)

| Funcionalidade | Status |
|---|---|
| Navegação, 8 áreas, páginas internas, templates, responsividade | 1 — Implementada e testada |
| Busca global (overlay + página `/search`) | 1 — Implementada e testada |
| Filtros do Portfolio e de Special Projects | 1 — Implementada e testada |
| Lista de interesse (seleção múltipla, salva no navegador) | 1 — Implementada e testada |
| Validação e estados dos formulários (erro, carregando, pendente, erro de rede, sucesso) | 1 — Implementada e testada |
| Envio de formulários → registro/CRM/notificação | 2 — Implementada, aguardando integração (`NEXT_PUBLIC_FORMS_ENDPOINT`) |
| Partner Access: login, cadastro em 4 etapas, recuperação de senha | 2 — Implementada, aguardando integração (`NEXT_PUBLIC_PARTNER_API_URL`) |
| Partner Access: painel, catálogo privado, solicitações, documentos, calendário, 8 telas de admin | 3 — Preparada, ainda inativa (estados vazios; exige backend) |
| Seletor PT / EN / ES | Interface: 1. Conteúdo editorial EN/ES: 3 — Preparada, ainda inativa |
| GA4 e Search Console | 3 — Preparada, ainda inativa (exige banner de consentimento) |
| Vitrine de maisons, Edits, experiências do Grand Tour | 4 — Bloqueada por material/autorização pendente (estados vazios e modelos de página prontos) |
| Checkout do Grand Tour | Fora de escopo (§14) |

## 2. CMS (Payload CMS + PostgreSQL + S3)

`src/lib/cms.ts` é o único ponto de leitura de conteúdo. Hoje lê `src/content/*` e `content/posts.json`; ao ligar o Payload, troque o corpo das funções por chamadas à API — as páginas não mudam. Com SSR/ISR, remova `output: 'export'` de `next.config.mjs`.

Coleções a criar (os tipos estão em `src/lib/types.ts`):

| Coleção | Campos-chave | Regra |
|---|---|---|
| `maisons` | nome, país, logo, fotos, história, posicionamento, coleções, produtos, categorias, mercados, documentação, contato | `publication` (draft/in_review/authorized/withdrawn) + `authorizedBy` + `authorizedAt`. Cadastro interno ≠ publicação. |
| `products` (catálogo) | marca, tipo, categoria, origem, SKU, volume, concentração, imagens, documentos, mercados habilitados, disponibilidade | Preço, margem, estoque e wholesale em coleção **separada** (`commercial_terms`), acessível só pela API autenticada. |
| `projects` | título, categoria (9), território, descrição, objetivo, papel FÊNIX, imagens, `stage` (5), resultados comprovados, CTA | `stage` e `publication` independentes; `confidential` sempre bloqueia. |
| `experiences` | todos os campos do §14 + `commercialState` | Publicar só com operador e condições aprovados. |
| `edits` | categoria (market/category/opportunity), mercado, categoria de produto, ocasião, oportunidade, itens | Itens só de marcas autorizadas. |
| `posts` | título, subtítulo, autor, data, imagem, legenda, corpo, categorias (7), tags, referências, SEO, relacionados | Migrar de `content/posts.json`. |
| `people` | nome, cargo, bio, retrato | Autorização individual. |
| `media` | arquivo, alt, legenda, crédito, `rightsConfirmed` | S3; privados com URL assinada. |

## 3. Formulários → registro, CRM e notificação

`src/lib/forms.ts` faz `POST` JSON para `NEXT_PUBLIC_FORMS_ENDPOINT`:

```json
{
  "formId": "expertise-fenix-labs",
  "intent": "Desenvolver um projeto industrial",
  "sourcePage": "/our-expertise/fenix-labs/",
  "fields": { "Nome": "…", "E-mail profissional": "…", "Empresa": "…", "Cargo": "…", "País": "…", "Segmento": "…", "O que você deseja desenvolver?": "…" },
  "items": [{ "slug": "acai-seed-infusion", "name": "Açaí Seed Infusion" }],
  "consent": { "privacy": true, "at": "2026-11-20T16:00:00.000Z", "policyVersion": "draft-2026-11" },
  "locale": "pt",
  "submittedAt": "2026-11-20T16:00:00.000Z"
}
```

O endpoint deve: validar no servidor; gravar a solicitação (histórico, status de atendimento); classificar por `intent` e país; criar/atualizar lead no CRM; enviar e-mail transacional ao responsável e confirmação ao remetente; responder `200 {"reference": "FNX-…"}`. Proteções: rate limit, honeypot ou captcha invisível, CORS restrito ao domínio. Exportação CSV a partir do painel admin.

## 4. Partner Access (portal B2B)

`src/lib/auth.ts` chama `NEXT_PUBLIC_PARTNER_API_URL`: `POST /auth/login`, `/auth/register`, `/auth/forgot-password`.

Requisitos de servidor (a proteção **não** pode depender da interface):

- Sessão em cookie `httpOnly`, `Secure`, `SameSite=Lax`; senhas com Argon2/bcrypt; bloqueio após tentativas.
- Fluxo: cadastro → verificação de e-mail → aprovação manual → acesso. Estados `pending_email`, `pending_approval`, `active`, `suspended`.
- Perfis: Administrador FÊNIX, Maison/fornecedor, Distribuidor/importador, Boutique/comprador, Outros parceiros.
- Permissões por empresa × mercado × categoria verificadas em **cada** rota da API.
- Rotas `/partner-access/portal/*` e `/admin/*` servidas por middleware que exige sessão válida (com SSR). Hoje são estáticas e exibem a faixa “Pré-visualização de interface — sem dados”.
- Documentos privados em bucket S3 privado; download por URL assinada de curta duração, registrada em log.

## 5. Medição e busca

- GA4 (`NEXT_PUBLIC_GA4_ID`): carregar só após consentimento.
- Google Search Console: verificar domínio e enviar `/sitemap.xml` (gerado no build).

## 6. Ao conectar o backend

1. Definir as variáveis em `.env.local` / Vercel (ver `.env.example`).
2. Remover `output: 'export'` se usar SSR, middleware ou rotas de API no mesmo projeto.
3. Trocar os corpos de `src/lib/cms.ts`.
4. Atualizar este documento e a tabela do §1.
