# FÊNIX — Fragrances Holding · Website institucional (Projeto Fênix)

Front-end completo do novo site da FÊNIX: 8 áreas principais, 77 páginas estáticas, templates reutilizáveis, catálogo B2B, formulários contextuais e telas do Partner Access. Next.js 15 · React 19 · TypeScript · exportação estática.

## Executar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev          # http://localhost:3000 (desenvolvimento)
npm run build        # gera a versão estática em out/
npm start            # serve out/ (npx serve)
npm run typecheck    # TypeScript
npm run check:links  # verifica todos os links internos de out/ (rodar após o build)
```

Para revisar sem instalar nada: abra `fenix-site-build.zip`, descompacte e sirva a pasta com qualquer servidor estático (`npx serve .` ou `python3 -m http.server`). Abrir os HTML direto do disco (file://) não funciona, porque os caminhos são absolutos.

## Estrutura

```
content/posts.json       Journal (editável pelo Pages CMS — .pages.yml)
public/brand/            Logo oficial (arquivo original, intacto)
public/images/           Fotografias otimizadas (WebP 1600/800)
src/app/                 Páginas (App Router) — uma pasta por rota
src/components/          Header, Footer, Logo, ui, RequestForm, Search, CatalogBrowser,
                         ProjectsBrowser, Selection, Portal, AuthForms…
src/content/             Conteúdo tipado (especialidades, jornadas, mercados, projetos, catálogo…)
src/lib/                 cms.ts (adaptador de conteúdo + regra de publicação), forms.ts, auth.ts,
                         i18n.tsx, selection.tsx, search-index.ts, routes.ts, types.ts
src/styles/              tokens.css + globals.css (design system)
scripts/check-links.mjs  Verificação de links do build
docs/                    AUDITORIA · INTEGRACOES · SITEMAP · DESIGN-SYSTEM
```

## Páginas prontas

Homepage (12 seções na ordem do briefing) · Grand Tour + 3 entradas + modelo de experiência · Maisons + modelo de maison · Edits + 3 categorias · Portfolio (busca, filtros, 4 fichas, lista de interesse e solicitação) · Discovery · Our Expertise + 8 especialidades + serviços transversais · Special Projects (filtros) + 6 projetos · FÊNIX BIO · Journal + artigo · Who We Work With + 6 jornadas · Selected Markets · About / People · Help · Contato (Start a Project) · Busca · Partner Access (login, cadastro, verificação, recuperação, análise, 5 telas do parceiro, 8 telas de administração) · Privacidade, Termos, Cookies · Mapa do site · 404. Sitemap completo em `docs/SITEMAP.md`.

## Testes executados

- `next build` sem erros nem avisos; TypeScript estrito.
- 74 HTML e 4.285 referências internas verificadas: zero links quebrados.
- 73 rotas × 2 viewports (1440px e 390px) no Chrome: zero erros de console, zero transbordo horizontal.
- Fluxos testados: validação e estado “envio não conectado” do formulário, `?intent=` pré-selecionado, login sem autenticação simulada, busca no catálogo, filtros, lista de interesse, busca global, filtros de projetos, troca de idioma.

## Regras de veracidade aplicadas

Nada foi inventado: nenhuma maison, cliente, contrato, SKU, preço, resultado, equipe ou fotografia fictícia. Onde falta material autorizado, a página mostra estado vazio ou “imagem pendente”. Publicação depende de `publication: 'authorized'` e `confidential !== true` (`src/lib/cms.ts`), independentemente do estágio do projeto.

## Conteúdos que dependem de aprovação

| Item | Situação |
|---|---|
| Maisons representadas | Nenhuma publicada. Exige contrato + autorização de cada marca. |
| Fragrâncias/SKUs de terceiros | Nenhum publicado. |
| Fotografias (7) | Direitos, créditos e autorização de imagem das pessoas identificáveis a confirmar. A foto aérea do campus exibe a marca FUCAPI: confirmar autorização ou substituir. |
| Legendas das fotos (cupuaçu, copaíba, castanha) | Conferir identificação botânica antes de publicar. |
| Projetos FÊNIX BIO | Publicados conforme o briefing; confirmar o responsável pela autorização e os estágios atribuídos (In Development / Concept). |
| Ingredientes no Portfolio | Exibidos como “em avaliação”, sem especificação, volume ou preço. Confirmar se devem constar no catálogo público. |
| Categoria, tags e referências do artigo do Journal | Classificação editorial adicionada; links das fontes a incluir. |
| Biografia do fundador | Extraída do artigo publicado; retrato pendente. Demais integrantes: pendente. |
| Mercados | Status de Europa/Brasil/América Latina e existência de operação local a confirmar juridicamente. |
| Contatos, razão social, sede, redes sociais | Pendentes de verificação (marcados no rodapé e na página de contato). |
| Textos legais (Privacidade, Termos, Cookies) | Estrutura LGPD pronta; texto final do jurídico pendente. |
| Versões EN/ES do conteúdo editorial | Interface traduzida; conteúdo em tradução. |
| “The 3 Islands®” | Confirmar registro da marca antes de manter o ®. |
| Granado (site anterior) | Removido; reintroduzir só com autorização formal. |

## Integrações pendentes

Formulários → CRM/e-mail (`NEXT_PUBLIC_FORMS_ENDPOINT`) · Partner Access (`NEXT_PUBLIC_PARTNER_API_URL`, autenticação e permissões no servidor) · Payload CMS + PostgreSQL + S3 · e-mail transacional · GA4 com consentimento · Search Console. Detalhes, contratos de API e classificação 1–4 de cada funcionalidade em `docs/INTEGRACOES.md`.

## Para colocar em produção

1. Aprovar o conteúdo da tabela acima (autorizações, fotos, contatos, textos legais).
2. Conectar o endpoint de formulários e testar o recebimento ponta a ponta.
3. Decidir entre lançar o site público agora (estático) e manter o Partner Access oculto, ou aguardar o backend do portal.
4. Configurar variáveis de ambiente no Vercel (`.env.example`).
5. Substituir o conteúdo do repositório `fenix-site` por este projeto em um branch, revisar no preview do Vercel e só então promover para o domínio, **com autorização expressa**.
6. Verificar o domínio no Search Console e enviar `/sitemap.xml`.
