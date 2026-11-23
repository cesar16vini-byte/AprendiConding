/* ============================================================
   AprendiCoding — Blog: dados e renderização dos artigos
   ============================================================ */

const POSTS = [
  {
    id: 1,
    titulo: 'Como começar a programar do zero: guia completo para iniciantes',
    categoria: 'carreira',
    categoriaLabel: 'Carreira',
    resumo: 'Dê os primeiros passos na tecnologia sem se sentir perdido. Linguagens, rotas de estudo e o que esperar nos primeiros meses.',
    leitura: '8 min',
    data: '14 nov 2026',
    imagem: '../assets/img/curso-3.svg',
    destaque: true,
  },
  {
    id: 2,
    titulo: 'HTML, CSS e JavaScript: como a trindade da web funciona na prática',
    categoria: 'front-end',
    categoriaLabel: 'Front-end',
    resumo: 'Entenda o papel de cada tecnologia na construção de uma página e veja um exemplo simples que você pode copiar e testar agora.',
    leitura: '6 min',
    data: '10 nov 2026',
    imagem: '../assets/img/curso-3.svg',
  },
  {
    id: 3,
    titulo: 'Git e GitHub para iniciantes: controle de versão sem mistério',
    categoria: 'ferramentas',
    categoriaLabel: 'Ferramentas',
    resumo: 'Commits, branches, pull requests e push: um passo a passo direto para você começar a versionar seus projetos hoje.',
    leitura: '5 min',
    data: '07 nov 2026',
    imagem: '../assets/img/curso-1.svg',
  },
  {
    id: 4,
    titulo: 'Como escolher sua primeira linguagem de programação',
    categoria: 'carreira',
    categoriaLabel: 'Carreira',
    resumo: 'Python, JavaScript, Java ou C#? Compare as principais opções pelo seu objetivo de carreira e pelo mercado de trabalho.',
    leitura: '7 min',
    data: '03 nov 2026',
    imagem: '../assets/img/curso-10.svg',
  },
  {
    id: 5,
    titulo: 'Consumindo sua primeira API com JavaScript (fetch + async/await)',
    categoria: 'back-end',
    categoriaLabel: 'Back-end',
    resumo: 'Aprenda a buscar dados de uma API pública, tratar a resposta e exibir na página com JavaScript moderno.',
    leitura: '9 min',
    data: '29 out 2026',
    imagem: '../assets/img/curso-11.svg',
  },
  {
    id: 6,
    titulo: 'Dicas de estudo para conciliar curso e trabalho',
    categoria: 'dicas',
    categoriaLabel: 'Dicas',
    resumo: 'Rotina, intervalos, método pomodoro e como manter a consistência mesmo com uma agenda cheia.',
    leitura: '4 min',
    data: '25 out 2026',
    imagem: '../assets/img/curso-5.svg',
  },
];

const CATEGORIAS_BLOG = [
  { key: 'todas', label: 'Todas' },
  { key: 'carreira', label: 'Carreira' },
  { key: 'front-end', label: 'Front-end' },
  { key: 'back-end', label: 'Back-end' },
  { key: 'ferramentas', label: 'Ferramentas' },
  { key: 'dicas', label: 'Dicas' },
];

let estadoBlog = { categoria: 'todas', busca: '' };

function filtrarPosts() {
  return POSTS.filter((p) => {
    if (estadoBlog.categoria !== 'todas' && p.categoria !== estadoBlog.categoria) {
      return false;
    }
    const termo = estadoBlog.busca.toLowerCase().trim();
    if (termo && !p.titulo.toLowerCase().includes(termo) && !p.resumo.toLowerCase().includes(termo)) {
      return false;
    }
    return true;
  });
}

function renderizarPosts() {
  const grid = document.getElementById('gridPosts');
  const contador = document.getElementById('contadorPosts');
  const destaqueEl = document.getElementById('destaqueBlog');
  if (!grid) return;

  const posts = filtrarPosts();
  if (contador) {
    contador.textContent = `${posts.length} artigo${posts.length !== 1 ? 's' : ''}`;
  }

  if (destaqueEl) {
    const destaque = POSTS.find((p) => p.destaque && filtrarPosts().includes(p));
    destaqueEl.innerHTML = destaque
      ? `
          <div class="post-destaque">
            <div class="post-imagem">
              <img src="${destaque.imagem}" alt="Capa: ${destaque.titulo}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='var(--cor-fundo-suave)'">
              <span class="post-categoria">${destaque.categoriaLabel}</span>
            </div>
            <div>
              <span class="post-leitura">${destaque.leitura} leitura</span>
              <h2 class="post-titulo">${destaque.titulo}</h2>
              <p class="post-resumo">${destaque.resumo}</p>
              <a href="artigo-${destaque.id}.html" class="btn btn--fantasma btn--pequeno">Ler artigo &rarr;</a>
            </div>
          </div>
        `
      : '';
  }

  grid.innerHTML = '';
  if (posts.length === 0) {
    const vazio = document.createElement('p');
    vazio.className = 'sem-resultados';
    vazio.style.gridColumn = '1 / -1';
    vazio.textContent = 'Nenhum artigo encontrado com esses filtros.';
    grid.appendChild(vazio);
    return;
  }

  posts.forEach((p) => {
    const artigo = document.createElement('article');
    artigo.className = 'post-card';
    artigo.innerHTML = `
      <div class="post-imagem">
        <img src="${p.imagem}" alt="Capa: ${p.titulo}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='var(--cor-fundo-suave)'">
        <span class="post-categoria">${p.categoriaLabel}</span>
      </div>
      <div class="post-conteudo">
        <span class="post-leitura">${p.leitura}</span>
        <h3 class="post-titulo">${p.titulo}</h3>
        <p class="post-resumo">${p.resumo}</p>
        <div class="post-rodape">
          <span class="post-data">${p.data}</span>
          <a href="artigo-${p.id}.html" class="btn btn--fantasma btn--pequeno">Ler artigo &rarr;</a>
        </div>
      </div>
    `;
    grid.appendChild(artigo);
  });
}

function renderizarFiltros() {
  const container = document.getElementById('filtrosBlog');
  if (!container) return;
  container.innerHTML = '';
  CATEGORIAS_BLOG.forEach((cat) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `chip ${estadoBlog.categoria === cat.key ? 'chip--ativo' : ''}`;
    b.dataset.categoria = cat.key;
    b.textContent = cat.label;
    b.addEventListener('click', () => {
      estadoBlog.categoria = cat.key;
      renderizarFiltros();
      renderizarPosts();
    });
    container.appendChild(b);
  });
}

function initBlog() {
  renderizarFiltros();
  renderizarPosts();
  const busca = document.getElementById('buscaBlog');
  if (busca) {
    busca.addEventListener('input', (evt) => {
      estadoBlog.busca = evt.target.value;
      renderizarPosts();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlog);
} else {
  initBlog();
}
