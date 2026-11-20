# Design system — FÊNIX

Fonte de verdade: `src/styles/tokens.css` (tokens) e `src/styles/globals.css` (componentes).

## Princípios — "Maison noir"
Canvas preto `#000` (o mesmo campo da logo oficial, que se funde à página), tinta marfim, filetes dourados, 0px de raio, sem caixas nem sombras. Serifada leve em grandes tamanhos, itálicos dourados como acento, rótulos pequenos em Montserrat. Vermelho da fênix só como ponto (Grand Tour). Bordô em uma única banda (Start a Project).

## Cores
| Token | Valor | Uso |
|---|---|---|
| `--black` | `#000000` | Canvas, masthead, rodapé |
| `--night` / `--night-2` | `#0C0B0A` / `#141210` | Bandas e superfícies elevadas |
| `--ivory` | `#EDE7DC` | Texto |
| `--ivory-2` | `#B4AC9E` | Texto secundário (9,6:1 sobre preto) |
| `--ivory-3` | `#7D776C` | Metadados e decoração |
| `--gold` | `#C9A96E` | Dourado da marca: filetes, itálicos, botões, foco |
| `--bordo-deep` | `#4A1620` | Banda Start a Project, faixa de integração |
| `--phoenix-red` | `#C41E1E` | Ponto do Grand Tour |
| `--error` | `#E0827A` | Mensagens de erro |

## Tipografia
- **Cormorant Garamond** 300/400 + itálico — display, títulos, citações (diretriz de marca).
- **Montserrat** 400/500/600 — interface, corpo, rótulos (diretriz de marca).
- Escala bimodal com `clamp()`; rótulos 10–11px, caixa-alta, tracking 0,22em.

## Espaçamento e grid
Ritmo 4/8, seções `clamp(80px, 11vw, 168px)`, gutter `clamp(22px, 4vw, 64px)`, largura máxima 1440px, grid de 12 colunas. Breakpoints 1100 / 900 / 720 / 600px.

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
