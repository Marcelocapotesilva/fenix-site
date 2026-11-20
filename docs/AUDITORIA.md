# Auditoria do site original e decisões de arquitetura

## 1. Materiais recebidos

| Material | Situação |
|---|---|
| Código-fonte original | **Não veio no ZIP enviado** (o ZIP contém 7 fotografias). Auditado a partir do repositório público `Marcelocapotesilva/fenix-site`, commit `330dd21` (08/10/2026), publicado em fenixfragrancesholding.uk. |
| Briefing executivo LBM (Luiz Barbosa) | **Não recebido.** Requisitos extraídos do documento “Projeto Fênix — Redesign integral” e das recomendações LBM citadas nele (§19). |
| Logo oficial FÊNIX — Fragrances Holding | Recebido (PNG 1600×1600, fundo `#000`). Usado sem alteração (arquivo idêntico byte a byte). |
| Fotografias | 7 imagens (WhatsApp, 19/11/2026). Otimizadas em WebP; direitos e créditos a confirmar. |
| DESIGN.md (referência de estilo) | Recebido. Usado como referência de linguagem (ver §4). |

## 2. Estrutura encontrada

- `index.html` único (~60 KB de HTML/CSS/JS + ~380 KB de imagens base64).
- Dependências por CDN: Three.js r128 (partículas “ember”), Phosphor Icons, Google Fonts (Cormorant Garamond + Inter).
- `content/posts.json` editado via **Pages CMS** (`.pages.yml`) e Decap (`admin/config.yml`) — 1 artigo publicado (06/10/2026).
- Seções: Hero, Who We Are, Ecosystem, Market Access, Representation, Granado Tour, Grand Tours (funil em 4 etapas), Journal, Contact.

## 3. Diagnóstico

| Item | Decisão | Motivo |
|---|---|---|
| Artigo do Journal (LatAm, governança de canal) | **Preservado** integralmente em `content/posts.json` (mesmo formato; campos novos opcionais). | Conteúdo real publicado. |
| Pages CMS do Journal | **Preservado e estendido** (`.pages.yml`). | Continuidade editorial sem backend. |
| Conteúdo de Market Access (alavancas: distribuição, importação, regulatório, PR, criadores, varejo, cultura, parceiros locais, lançamento) | **Reaproveitado** em FÊNIX Access. | Conteúdo válido do site atual. |
| Funil do Grand Tour (4 etapas) | **Reformulado** como formulário de interesse contextual. | O original exibia “Dossier Received… routed to our advisory committee” **sem enviar nada** — viola §17/§22. |
| Formulário de contato (`action="#"`) | **Substituído** por formulário segmentado com estados honestos. | Não enviava dados. |
| “Granado Heritage Immersive Tour” (iframe de granado.com.br) | **Removido.** | Uso de marca de terceiro sem autorização documentada; sugere parceria. Reintroduzir só com autorização formal. |
| Three.js, cursor customizado, cards com tilt 3D, preloader | **Removidos.** | §21: animações que prejudicam navegação; peso e acessibilidade. |
| Logo recriada (cabeça de fênix recortada em PNG, versão SVG em traço dourado) | **Substituída** pela arte oficial. | §3: proibido redesenhar ou recortar o símbolo. |
| Menu (Who We Are, Ecosystem…) | **Substituído** pelas 8 entradas obrigatórias. | §5. |
| Rodapé “fenix fragrance holdings sa — proprietary luxury ecosystem” | **Substituído**; razão social marcada como pendente. | Informação institucional não verificada. |
| Frases “dominant, protected presence”, “complete brand governance” | **Reescritas** no posicionamento “ao lado do ecossistema local”. | Alinhamento com a doutrina de posicionamento da FÊNIX. |

## 4. Direção de arte

O DESIGN.md enviado descreve a linguagem de uma perfumaria independente (broadsheet). Usamos seus **princípios** — canvas marfim, tinta escura, régua fina, 0px de raio, sem sombras nem gradientes decorativos, botões “ghost”, contraste extremo de escala tipográfica — **sem copiar identidade, textos ou tipografia de outra marca** (§2). Ajustes próprios da FÊNIX:

- Paleta do briefing (Carvão, Marfim, Champanhe, Bordô, Cinza mineral) no lugar da paleta de referência; vermelho da fênix só como acento mínimo (marcador do Grand Tour, status ativo).
- Tipografia em duas famílias — Cormorant Garamond (display, dialoga com o serifado da logo e com as diretrizes de marca existentes) e Inter (interface). Uma única família sem serifa em peso 800, como no DESIGN.md, competiria com a logo.
- Superfícies pretas `#000` sempre que a logo aparece, para a arte oficial fundir-se ao fundo sem moldura visível.

## 5. Arquitetura: migração para Next.js

**Decisão: migrar para Next.js 15 + React 19 + TypeScript, com exportação estática nesta fase.**

| Critério | Avaliação |
|---|---|
| Benefícios | 77 páginas a partir de templates tipados; componentes reutilizáveis; build estático (sem servidor) hoje e SSR/API amanhã no mesmo código; SEO (metadata, sitemap.xml, robots, JSON-LD); base recomendada pelo briefing LBM. |
| Riscos | Equipe precisa de Node 20+; um build a mais no deploy. Mitigado: Vercel já hospeda o site atual e builda Next.js nativamente. |
| Custo de manutenção | Baixo nesta fase (estático, zero servidor). Sobe quando Payload + PostgreSQL forem ligados (hospedagem de banco e storage). |
| Compatibilidade | Mesmo repositório, mesmo provedor (Vercel), mesmo domínio. `content/posts.json` e Pages CMS continuam funcionando. |
| Impacto no código atual | Substituição completa do `index.html` (não havia componentes reaproveitáveis; conteúdo válido foi migrado). |
| Necessidade de backend | **Sim** para: recebimento de formulários/CRM, Partner Access (autenticação, permissões, documentos privados), CMS de maisons/projetos/produtos. O front-end está pronto e isolado em adaptadores (`src/lib/forms.ts`, `src/lib/auth.ts`, `src/lib/cms.ts`). |

Evoluir o `index.html` existente não atenderia: um arquivo único não comporta 8 áreas com páginas internas, templates administráveis e portal B2B sem virar um segundo site paralelo.
