# Design system — FÊNIX

Fonte de verdade: `src/styles/tokens.css` (tokens) e `src/styles/globals.css` (componentes).

## Origem
Sistema visual definido no Google Stitch ("Haute Parfumerie & Botanical Heritage", pacote enviado em 20/11/2026) e implementado aqui com o conteúdo real do site. O conteúdo de exemplo das maquetes do Stitch (maisons, números, escritórios, certificações) não foi usado.

## Princípios
Planos obsidiana em degraus (`#171612` → `#201E19` → `#29261F`), filetes minerais de 1px, dossiês monolíticos no lugar de cards, 0px de raio, sem sombras. Bodoni Moda em caixa-alta com itálicos champanhe; Manrope para corpo e rótulos. Bordô como ação principal; vermelho da fênix só em marcadores. Faixa do cabeçalho e rodapé em `#000` para a logo oficial se fundir ao fundo.

## Cores
| Token | Valor | Uso |
|---|---|---|
| `--canvas` | `#171612` | Obsidian Warm — fundo |
| `--night` | `#201E19` | Deep Charcoal — bandas, dossiês, campos |
| `--night-2` | `#29261F` | Smoked Black — elevação, hover |
| `--black` | `#000000` | Cabeçalho, rodapé, selo da logo |
| `--ivory` | `#F1EEE7` | Texto |
| `--ivory-2` | `#A7A196` | Warm Grey — texto secundário |
| `--mineral` | `#716E65` | Filetes (20–45% de opacidade) |
| `--gold` | `#B8A17B` | Antique Champagne — itálicos, rótulos, bordas ativas |
| `--gold-soft` | `#D0BD99` | Soft Gold — hover |
| `--bordo` | `#652D37` | Deep Burgundy — botão principal, marcadores |
| `--phoenix-red` | `#C8232B` | Hover do botão principal, marcador do Grand Tour |

## Tipografia
- **Bodoni Moda** 400/500/itálico — títulos em caixa-alta, palavra de ênfase em itálico champanhe.
- **Manrope** 300/400/500/600 — corpo (300 para leads), rótulos 11px 600 em caixa-alta com tracking 0,2em.

## Espaçamento e grid
Grid de 12 colunas, margens `clamp(22px, 4vw, 64px)`, seções `clamp(80px, 11vw, 168px)`, largura máxima 1440px.

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
Transições de 160–900ms só em opacidade, cor e transform; entrada suave das seções ao rolar (`Reveal.tsx`); `prefers-reduced-motion` zera durações. Foco visível bordô em tudo; link “pular para o conteúdo”; validação no blur com limpeza imediata do erro; foco no primeiro campo inválido; `aria-live` nos estados de envio; alvos de toque ≥ 44px nos controles principais.
