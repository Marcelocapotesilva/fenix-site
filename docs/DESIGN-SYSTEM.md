# Design system — FÊNIX

Fonte de verdade: `src/styles/tokens.css` (tokens) e `src/styles/globals.css` (componentes).

## Princípios
Broadsheet editorial: canvas marfim, tinta carvão, régua de 1px, **0px de raio**, sem sombras, sem gradientes decorativos. A hierarquia vem do contraste de escala tipográfica e das bandas tonais. A logo oficial sempre sobre `#000`.

## Cores
| Token | Valor | Uso |
|---|---|---|
| `--carvao` | `#20201E` | Texto, réguas, botão ativo |
| `--marfim` | `#F3F0E9` | Canvas |
| `--banda` | `#E8E2D6` | Banda secundária (marfim × champanhe) |
| `--champanhe` | `#B6A78F` | Rótulos sobre preto, detalhes |
| `--bordo` | `#762433` | Foco, erros, pendências, banner de integração |
| `--cinza-mineral` | `#8A887E` | Somente decorativo (não atinge AA em texto) |
| `--ink-soft` | `#55534C` | Texto secundário (6,9:1 sobre marfim) |
| `--logo-black` | `#000000` | Fundo da logo, masthead, rodapé, Grand Tour |
| `--phoenix-red` | `#B81818` | Acento mínimo (marcador do Grand Tour) — amostrado da logo |

## Tipografia
- **Cormorant Garamond** 400/500/itálico — display e títulos.
- **Inter** 400/500/600 — interface, corpo, rótulos.
- Escala bimodal: leitura (11–22px) × anúncio (32–132px), com `clamp()` responsivo.
- Rótulos (`.eyebrow`): 11px, caixa-alta, tracking 0,14em.

## Espaçamento e grid
Ritmo 4/8 (`--space-*`), seções `clamp(64px, 9vw, 128px)`, gutter `clamp(20px, 3.4vw, 48px)`, largura máxima 1440px, grid de 12 colunas. Breakpoints: 1100 / 900 / 720 / 600px.

## Componentes
| Componente | Classe / arquivo |
|---|---|
| Masthead + navbar fixa (8 entradas) + menu mobile | `Header.tsx` |
| Rodapé | `Footer.tsx` |
| Logo (moldura e arte completa) | `Logo.tsx` |
| Hero de página, cabeçalho de seção, breadcrumb | `ui.tsx` → `PageHero`, `SectionHead`, `Breadcrumb` |
| Link “ghost” com seta / botão de régua | `.link-arrow`, `.btn`, `.btn--light` |
| Lista indexada (sem caixas) | `IndexList`, `.index-row` |
| Entradas editoriais (cards sem moldura) | `.entries`, `.entry` |
| Jornadas (grade de régua) | `.journeys`, `.journey` |
| Figura com crédito / imagem pendente | `Figure` |
| Status de projeto (5 estágios) e pendência | `StageBadge`, `PendingBadge` |
| Estado vazio | `EmptyState` |
| Avisos (pendente, sucesso, erro) | `Notice` |
| Lista de definição | `DefList` |
| Formulário contextual | `RequestForm.tsx`, `FormSection.tsx` |
| Busca (overlay e página) | `Search.tsx` |
| Catálogo com busca e filtros | `CatalogBrowser.tsx` |
| Biblioteca de projetos com filtros | `ProjectsBrowser.tsx` |
| Lista de interesse e barra fixa | `Selection.tsx` |
| Portal (shell, KPIs, tabelas vazias, faixa de integração) | `Portal.tsx` |
| Login, cadastro em etapas, recuperação | `AuthForms.tsx`, `AuthLayout.tsx` |
| Esqueleto de carregamento / spinner | `.skeleton`, `.spinner` |

## Logo
O PNG oficial é servido idêntico ao recebido. `LogoPlate` enquadra a arte ocultando só o campo preto vazio (símbolo, nome e assinatura sempre completos, escala uniforme). `LogoFull` mostra o quadrado inteiro. Na altura de um cabeçalho, a assinatura “FRAGRANCES HOLDING” não fica legível sem alterar a arte; por isso ela aparece em tamanho legível no hero da homepage, no rodapé e no Partner Access. Recomendação: o brand designer produzir uma versão horizontal oficial para cabeçalhos.

## Movimento e acessibilidade
Transições de 120–480ms só em opacidade, cor e transform; `prefers-reduced-motion` zera durações. Foco visível bordô em tudo; link “pular para o conteúdo”; validação no blur com limpeza imediata do erro; foco no primeiro campo inválido; `aria-live` nos estados de envio; alvos de toque ≥ 44px nos controles principais.
