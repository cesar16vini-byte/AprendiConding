# AprendiCoding — Plataforma de Cursos Online Gratuitos

Site profissional de educação online inspirado em referências como **EBAC** e **Alura** (plataformas de cursos e trilhas de tecnologia). O projeto é um **site institucional + catálogo de cursos** com navegação entre páginas, filtros dinâmicos, modal de detalhes, matrícula, login, painel do aluno e certificado digital.

> 👉 Desenvolvido com foco em **design moderno**, **responsividade**, **acessibilidade** e **código organizado**, seguindo boas práticas de **front-end** com **HTML5**, **CSS3** e **JavaScript (ES6+)**.

---

## 📁 Estrutura de pastas

```
AprendiConding/
├── Inicial/
│   └── pagina_inicial.html          # Página inicial (home)
├── cursos/
│   ├── cursos.html                  # Catálogo de cursos com filtros
│   ├── detalhe.html                 # Página de detalhe de um curso
│   ├── dados.js                     # Dados dos cursos (array CURSOS)
│   └── script.js                    # Script legado do catálogo (mantido)
├── login/
│   └── pagina_login.html            # Página de login do aluno
├── matricula/
│   └── pagina_matricula.html        # Página de matrícula/cadastro
├── perfil/
│   └── perfil.html                  # Painel do aluno (meus cursos)
├── assets/
│   ├── css/
│   │   └── style.css                # Folha de estilos única e unificada
│   ├── img/
│   │   └── curso-*.svg              # Capas dos cursos (SVG por categoria)
│   └── js/
│       └── app.js                   # Aplicação JavaScript principal
├── favicon.svg                      # Ícone da aba do navegador
├── og-image.svg                     # Imagem Open Graph (compartilhamento)
└── README.md                        # Este arquivo
```

---

## 🏷️ Palavras-chave (Keywords)

`HTML5` `CSS3` `JavaScript` `ES6+` `front-end` `responsivo` `design-system` `variáveis CSS` `grid` `flexbox` `modal` `filtros` `catálogo de cursos` `matrícula` `localStorage` `acessibilidade` `Open Graph` `favicon` `EBAC` `Alura` `plataforma de ensino` `EaD` `trilhas de conhecimento` `certificado digital` `UX` `UI` `single-page sections` `interatividade` `DOM` `event listeners` `Intersection Observer` `localStorage` `SPA-like navigation`

---

## 🧱 HTML — Tags e marcação utilizadas

O site utiliza **HTML5 semântico** com as seguintes tags e elementos:

| Tag / elemento | Uso no projeto |
|---|---|
| `<!DOCTYPE html>` | Declaração de documento HTML5 |
| `<html lang="pt-BR">` | Idioma da página (português do Brasil) |
| `<head>` | Metadados, títulos, links de CSS e ícones |
| `<meta charset="UTF-8">` | Codificação de caracteres |
| `<meta name="viewport">` | Responsividade em dispositivos móveis |
| `<meta name="description">` | Descrição para SEO |
| `<title>` | Título da aba do navegador |
| `<link rel="stylesheet">` | Vinculação ao CSS externo |
| `<link rel="icon">` | Favicon da página |
| `<meta property="og:*">` | Tags Open Graph (Facebook, WhatsApp, LinkedIn) |
| `<meta name="twitter:*">` | Tags Twitter Cards |
| `<header>` | Cabeçalho do site com logo e navegação |
| `<nav>` | Navegação principal (`<nav-links>`) |
| `<a>` | Links internos e externos |
| `<main>` | Conteúdo principal de cada página |
| `<section>` | Seções temáticas (hero, catálogo, depoimentos, CTA) |
| `<h1>`–`<h4>` | Títulos hierárquicos |
| `<p>` | Parágrafos de texto |
| `<ul>` / `<li>` | Listas (depoimentos, currículo, links do rodapé) |
| `<article>` | Cards de curso e depoimentos |
| `<figure>` / `<img>` | Imagens de capa dos cursos |
| `<button>` | Botões de ação, abrir modal, filtrar |
| `<form>` | Formulários de login, matrícula e contato |
| `<input>` | Campos de texto, e-mail, senha, telefone, busca, range |
| `<textarea>` | Campo de mensagem (contato) |
| `<label>` | Rótulo dos campos de formulário |
| `<aside>` | Barra lateral com informações complementares |
| `<footer>` | Rodapé institucional |
| `<svg>` / `<symbol>` / `<use>` | Ícones vetoriais reutilizáveis (sprite SVG) |
| `<dialog>` / overlay (`<div class="modal-overlay">`) | Modal de detalhes do curso |
| `aria-label`, `aria-expanded`, `aria-hidden` | Atributos de acessibilidade (ARIA) |
| `data-*` | Atributos personalizados (`data-id`, `data-categoria`, etc.) |

---

## 🎨 CSS — Classes, variáveis e técnicas usadas

Toda a estilização está centralizada em `assets/css/style.css`. O projeto adota um **design system** com variáveis CSS (design tokens).

### Variáveis CSS (design tokens)

| Variável | Significado |
|---|---|
| `--cor-primaria` | Cor principal da marca (azul EBAC/Alura) |
| `--cor-primaria-escura` | Variação escura da cor primária |
| `--cor-acento` | Cor de destaque (CTA, botões de ação) |
| `--cor-sucesso` | Cor para estados de sucesso |
| `--cor-erro` | Cor para estados de erro |
| `--cor-fundo` | Cor de fundo da página |
| `--cor-card` | Cor de fundo de cards |
| `--cor-texto` / `--cor-texto-secundario` | Cores de texto primário e secundário |
| `--cor-borda` | Cor de bordas e divisórias |
| `--sombra` / `--sombra-card` / `--sombra-hover` | Sombras de elementos |
| `--raio` / `--raio-sm` | Arredondamento de bordas (border-radius) |
| `--transicao` / `--transicao-rapida` | Tempos de transição e animação |
| `--fonte-principal` | Família tipográfica (Inter) |
| `--largura-max` | Largura máxima do container |
| `--altura-header` | Altura fixa do cabeçalho sticky |
| `--cat-web` / `--cat-mobile` / `--cat-dados` / `--cat-linguagens` | Cores por categoria de curso |

### Classes e seções CSS principais

| Classe | Uso |
|---|---|
| `.container` | Container centralizado com largura máxima e padding |
| `.section` | Espaçamento padrão de seção (padding vertical) |
| `.section-header` | Cabeçalho de seção com título e descrição |
| `.site-header` | Cabeçalho fixo (sticky) com logo, nav e ações |
| `.brand` / `.brand-text` / `.brand-sub` | Logotipo da marca |
| `.nav-links` | Links de navegação principal |
| `.icon-btn` | Botões ícone (carrinho, menu, usuário) |
| `.btn` / `.btn--primario` / `.btn--saida` / `.btn--fantasma` / `.btn--largo` / `.btn--pequeno` / `.btn--bloco` | Variantes de botão |
| `.hero` | Seção hero da página inicial |
| `.hero-card` | Card de destaque dentro do hero |
| `.stats` / `.stat` | Bloco de estatísticas (números + rótulo) |
| `.cursos-grid` | Grid de cards de cursos |
| `.curso-card` | Card individual de curso |
| `.filtros` / `.filtros-area` | Barra lateral de filtros (busca, duração, nível, categoria) |
| `.chip` / `.chip--ativo` | Filtro por categoria (chip selecionável) |
| `.modal-overlay` / `.modal` | Modal de detalhes do curso |
| `.passos` / `.passo` | Seção "Como funciona" (3 passos) |
| `.depoimentos` / `.depoimento` | Depoimentos de alunos |
| `.cta` | Chamada para ação (CTA) final |
| `.info-grid` / `.info-card` | Cartões de informação (nível, carga horária, etc.) |
| `.curriculo` / `.modulo` / `.aula` | Currículo do curso com módulos expansíveis |
| `.instrutor` | Card do instrutor do curso |
| `.form-card` / `.form-layout` / `.campo` | Formulários (login, matrícula, contato) |
| `.info-lateral` / `.info-item` | Informações laterais ao formulário |
| `.site-footer` / `.footer-grid` / `.footer-col` | Rodapé com colunas |
| `.reveal` / `.visivel` / `.reveal-delay-*` | Animações de revelação ao rolar a página |

### Técnicas CSS aplicadas

- **CSS Grid** e **Flexbox** para layouts responsivos
- **Media queries** para adaptação mobile (quebra de pontos em 1024px, 900px e 600px)
- **Variáveis CSS** para facilitar manutenção e temas
- **Backdrop-filter** (blur) no cabeçalho sticky
- **Transições e animações** (hover em botões, cards, revelação ao scroll)
- **Design responsivo mobile-first** com `grid-template-columns` adaptativo

---

## ⚙️ JavaScript — Como o código foi escrito

A aplicação JavaScript está em `assets/js/app.js` e é carregada em todas as páginas. Ela é escrita em **ES6+**, envolvida em um IIFE (função autoinvocável) para evitar poluição do escopo global, usando `'use strict'`.

### Estrutura geral

```js
(() => {
  'use strict';
  const estado = { ... };
  const EL = { ... };
  // utilitários, renderização, eventos, init
})();
```

### Estado da aplicação (`estado`)

O objeto `estado` concentra o estado reativo da interface:

- `categoria` — categoria selecionada nos filtros (`'todos'` por padrão)
- `busca` — termo digitado no campo de busca
- `meses` — duração máxima filtrada (range slider)
- `tipos` — `Set` de níveis selecionados (introdutório, intermediário, avançado)
- `matriculados` — array de IDs de cursos em que o usuário se matriculou (persistido em `localStorage`)
- `carrinho` — array de IDs de cursos no carrinho de matrículas

### Principais funções

| Função | O que faz |
|---|---|
| `init()` | Inicializa a aplicação: renderiza chips, cursos, configura filtros, modal, menu, revelação, formulários e header |
| `renderizarChips()` | Renderiza os botões de categoria (chips) e marca o ativo |
| `renderizarCursos()` | Filtra `CURSOS` (de `dados.js`) e renderiza os cards no grid |
| `filtrarCursos()` | Aplica filtros de categoria, duração, nível e busca textual |
| `abrirModal(id)` / `fecharModal()` | Abre/fecha o modal de detalhes com dados do curso |
| `toggleMatricula(cursoId)` | Adiciona/remove curso da matrícula e carrinho, persiste em `localStorage` |
| `configurarFiltros()` | Vincula eventos de input/change dos campos de filtro |
| `configurarModal()` | Fecha modal com botão ×, clique fora e tecla Esc |
| `configurarMenuMobile()` | Controla o menu hamburguer mobile |
| `destacarNavAtiva()` | Destaca o link da página atual na navegação |
| `configurarRevelacao()` | Usa `IntersectionObserver` para animar elementos `.reveal` ao entrar na viewport |
| `configurarFormularios()` | Intercepta submissões de formulário e exibe mensagens de sucesso |
| `configurarHeader()` | Esconde/mostra o cabeçalho ao rolar (scroll) |
| `atualizarContadorCarrinho()` | Atualiza o badge numérico do carrinho no header |
| `persistir()` | Salva `matriculados` e `carrinho` no `localStorage` |

### Utilitários

- `$(sel)` / `$$(sel)` — atalhos para `querySelector` e `querySelectorAll`
- `formatarMoeda(valor)` — formata valores em reais (BRL)
- `estrelas(nota)` — gera estrelas cheias/vazias com base na avaliação
- `corCategoria(categoria)` / `iconeCategoria(categoria)` — mapeia categoria para cor e ícone SVG

### Eventos e interatividade

- **Filtros em tempo real**: digitar na busca, mover o slider de duração, marcar níveis ou clicar em categoria atualiza o grid instantaneamente (sem recarregar a página)
- **Modal de curso**: clicar em "Ver curso" abre um overlay com imagem, categoria, nível, descrição, o que irá aprender e botão de matrícula
- **Matrícula / carrinho**: ao matricular, o curso é salvo em `localStorage` e aparece no painel do aluno (`perfil.html`)
- **Módulos expansíveis**: na página de detalhe, clicar no título do módulo expande/colapsa a lista de aulas
- **Animação ao rolar**: elementos com classe `.reveal` animam (fade-in + subir) ao entrarem na viewport, usando `IntersectionObserver`
- **Header sticky com efeito de rolagem**: o cabeçalho some ao rolar para baixo e reaparece ao rolar para cima

### Persistência de dados

O site usa `localStorage` para lembrar:

- `aprendicoding_matriculados` — cursos em que o usuário se matriculou
- `aprendicoding_carrinho` — cursos adicionados ao carrinho
- `aprendicoding_nome` — nome do aluno (exibido no painel)

---

## 🚀 Como usar

1. Abra o arquivo `Inicial/pagina_inicial.html` em qualquer navegador moderno.
2. Ou sirva os arquivos com um servidor local (ex.: `python -m http.server` ou extensão "Live Server" do VS Code) para evitar problemas com caminhos relativos e modules.
3. Navegue pelo catálogo, filtre cursos, abra o modal de detalhes, faça matrícula e acesse o painel do aluno.

---

## ✅ Recursos de acessibilidade e SEO

- Idioma definido (`lang="pt-BR"`)
- Links "Pular para o conteúdo" (`skip-to-content`)
- Atributos ARIA (`aria-label`, `aria-expanded`, `aria-hidden`, `aria-live`)
- Ícones SVG inline com `aria-hidden="true"` quando decorativos
- Tags Open Graph e Twitter Cards para compartilhamento em redes sociais
- Favicon e `theme-color` para navegadores móveis
- URLs canônicas (`rel="canonical"`)
- Navegação por teclado funcional (`Tab`, `Enter`, `Esc` fecha modal)

---

## 📌 Referências visuais

O layout e a experiência de usuário foram inspirados nas plataformas **EBAC** (Escola Britânica de Artes Criativas e Tecnologia) e **Alura**, com ênfase em:

- Catálogo de cursos com cards visuais e filtros laterais
- Cores de marca fortes e contraste adequado
- Tipografia limpa e hierarquia visual clara
- Botões de chamada para ação (CTA) proeminentes
- Depoimentos de alunos e estatísticas de confiança
- Rodapé institucional com links rápidos e contato

---

## 🛠️ Tecnologias

- HTML5
- CSS3 (variáveis, Grid, Flexbox, media queries)
- JavaScript ES6+ (IIFE, modules-like, localStorage, IntersectionObserver)
- Fontes: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Ícones: SVG inline (sprite com `<symbol>`)

---

© 2026 AprendiCoding. Projeto educacional desenvolvido com foco em front-end profissional.
