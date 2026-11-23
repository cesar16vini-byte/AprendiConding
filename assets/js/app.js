/* ============================================================
   AprendiCoding — Aplicação principal (JavaScript)
   Funcionalidades:
   - Renderização dinâmica do catálogo de cursos a partir de dados.js
   - Filtros: categoria, busca, duração máxima e nível
   - Modal de detalhes do curso
   - Menu mobile e navegação ativa
   - Animações de revelação ao rolar (scroll)
   - Matrícula e carrinho de cursos (localStorage)
   - Manipulação de formulários (login, matrícula, contato)
   ============================================================ */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Estado da aplicação
     ------------------------------------------------------------------ */
  const estado = {
    categoria: 'todos',
    busca: '',
    meses: 24,
    tipos: new Set(),
    matriculados: JSON.parse(localStorage.getItem('aprendicoding_matriculados') || '[]'),
    carrinho: JSON.parse(localStorage.getItem('aprendicoding_carrinho') || '[]'),
  };

  /* ------------------------------------------------------------------
     Referências de DOM (inicializadas quando existem na página)
     ------------------------------------------------------------------ */
  const EL = {
    gridCursos: document.getElementById('gridCursos'),
    contador: document.getElementById('contador'),
    chips: document.getElementById('categorias'),
    campoBusca: document.getElementById('campoBusca'),
    slider: document.getElementById('sliderDuracao'),
    valorDuracao: document.getElementById('valorDuracao'),
    tipos: document.querySelectorAll('.filtros__tipos input[type="checkbox"]'),
    limpar: document.getElementById('limparFiltros'),
    overlay: document.getElementById('overlay'),
    fecharModal: document.getElementById('fecharModal'),
    modalIcone: document.getElementById('modalIcone'),
    modalDuracao: document.getElementById('modalDuracao'),
    modalTitulo: document.getElementById('modalTitulo'),
    modalNivel: document.getElementById('modalNivel'),
    modalCategoria: document.getElementById('modalCategoria'),
    modalDescricao: document.getElementById('modalDescricao'),
    modalAprenda: document.getElementById('modalAprenda'),
    btnMatricular: document.getElementById('btnMatricular'),
    btnVerCurso: document.getElementById('btnVerCurso'),
    menuBtn: document.querySelector('.menu-btn'),
    menuToggle: document.getElementById('menu-toggle'),
    navLinks: document.querySelectorAll('.nav-links a'),
    header: document.querySelector('.site-header'),
  };

  /* ------------------------------------------------------------------
     Utilitários
     ------------------------------------------------------------------ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function estrelas(nota) {
    const cheia = Math.round(nota);
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="estrela" aria-hidden="true">${i <= cheia ? '★' : '☆'}</span>`;
    }
    return html;
  }

  function corCategoria(categoria) {
    const mapa = {
      web: 'var(--cat-web)',
      mobile: 'var(--cat-mobile)',
      dados: 'var(--cat-dados)',
      linguagens: 'var(--cat-linguagens)',
    };
    return mapa[categoria] || 'var(--cor-primaria)';
  }

  function iconeCategoria(categoria) {
    const mapa = {
      web: 'icon-code',
      mobile: 'icon-phone',
      dados: 'icon-book',
      linguagens: 'icon-laptop',
    };
    return mapa[categoria] || 'icon-code';
  }

  function persistir() {
    localStorage.setItem('aprendicoding_matriculados', JSON.stringify(estado.matriculados));
    localStorage.setItem('aprendicoding_carrinho', JSON.stringify(estado.carrinho));
    atualizarContadorCarrinho();
  }

  function atualizarContadorCarrinho() {
    const el = document.getElementById('cart-count');
    if (el) {
      el.textContent = estado.carrinho.length;
      el.hidden = estado.carrinho.length === 0;
    }
  }

  /* ------------------------------------------------------------------
     Catálogo: filtragem e renderização
     ------------------------------------------------------------------ */
  function filtrarCursos() {
    return CURSOS.filter((curso) => {
      if (estado.categoria !== 'todos' && curso.categoria !== estado.categoria) {
        return false;
      }
      if (curso.meses > estado.meses) {
        return false;
      }
      if (estado.tipos.size > 0 && !estado.tipos.has(curso.tipo)) {
        return false;
      }
      const termo = estado.busca.toLowerCase().trim();
      if (
        termo &&
        !curso.titulo.toLowerCase().includes(termo) &&
        !curso.descricao.toLowerCase().includes(termo) &&
        !curso.categoriaLabel.toLowerCase().includes(termo)
      ) {
        return false;
      }
      return true;
    });
  }

  function renderizarCursos() {
    if (!EL.gridCursos) return;

    const cursos = filtrarCursos();

    if (EL.contador) {
      EL.contador.textContent = `${cursos.length} curso${cursos.length !== 1 ? 's' : ''} encontrado${
        cursos.length !== 1 ? 's' : ''
      }`;
    }

    EL.gridCursos.innerHTML = '';

    if (cursos.length === 0) {
      const vazio = document.createElement('p');
      vazio.className = 'sem-resultados';
      vazio.textContent = 'Nenhum curso encontrado com esses filtros.';
      EL.gridCursos.appendChild(vazio);
      return;
    }

    cursos.forEach((curso) => {
      const card = document.createElement('article');
      card.className = 'curso-card';
      card.dataset.id = curso.id;
      card.dataset.categoria = curso.categoria;
      card.dataset.meses = curso.meses;
      card.dataset.tipo = curso.tipo;

      const jaMatriculado = estado.matriculados.includes(curso.id);
      const noCarrinho = estado.carrinho.includes(curso.id);

      card.innerHTML = `
        <div class="curso-card-imagem">
          <img src="assets/img/curso-${curso.id}.svg" alt="Capa do curso ${curso.titulo}" loading="lazy" onerror="this.style.display='none'; this.parentElement.style.background='var(--cor-fundo-suave)'">
          <div class="curso-card-badge">${curso.tipoLabel}</div>
        </div>
        <div class="curso-card-conteudo">
          <div class="curso-card-meta">
            <span class="curso-card-categoria" style="color: ${corCategoria(curso.categoria)};">
              ${curso.categoriaLabel}
            </span>
            <span class="curso-card-nivel">${curso.tipoLabel}</span>
          </div>
          <h3 class="curso-card-titulo">${curso.titulo}</h3>
          <p class="curso-card-descricao">${curso.descricao}</p>
          <div class="curso-card-rodape">
            <div class="curso-card-avaliacao">
              <span class="curso-card-nota">${curso.nota.toFixed(1)}</span>
              <span>${estrelas(curso.nota)} (${curso.avaliacoes})</span>
            </div>
            <span class="curso-card-preco">${curso.preco}</span>
          </div>
        </div>
        <button class="btn btn--saida btn--pequeno" data-abrir-modal="${curso.id}">
          Ver curso
        </button>
      `;

      EL.gridCursos.appendChild(card);
    });

    // Vincula eventos de abertura do modal
    EL.gridCursos.querySelectorAll('[data-abrir-modal]').forEach((btn) => {
      btn.addEventListener('click', () => abrirModal(parseInt(btn.dataset.abrirModal, 10)));
    });
  }

  function renderizarChips() {
    if (!EL.chips) return;
    EL.chips.innerHTML = '';
    CATEGORIAS.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip ${estado.categoria === cat.key ? 'chip--ativo' : ''}`;
      btn.dataset.categoria = cat.key;
      btn.textContent = cat.label;
      btn.addEventListener('click', () => {
        estado.categoria = cat.key;
        renderizarChips();
        renderizarCursos();
      });
      EL.chips.appendChild(btn);
    });
  }

  /* ------------------------------------------------------------------
     Modal de detalhes
     ------------------------------------------------------------------ */
  function abrirModal(id) {
    const curso = cursoPorId(id);
    if (!curso || !EL.overlay) return;

    EL.modalIcone.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><use href="#${iconeCategoria(curso.categoria)}"></use></svg>`;
    EL.modalIcone.style.color = corCategoria(curso.categoria);
    EL.modalDuracao.textContent = curso.duracao;
    EL.modalTitulo.textContent = curso.titulo;
    EL.modalNivel.textContent = curso.tipoLabel;
    EL.modalNivel.style.color = corTipo(curso.tipo);
    EL.modalCategoria.textContent = curso.categoriaLabel;
    EL.modalDescricao.textContent = curso.descricao;
    EL.modalAprenda.innerHTML = curso.aprenda.map((item) => `<li>${item}</li>`).join('');

    const jaMatriculado = estado.matriculados.includes(curso.id);
    const noCarrinho = estado.carrinho.includes(curso.id);

    if (EL.btnMatricular) {
      EL.btnMatricular.textContent = jaMatriculado ? 'Já matriculado' : noCarrinho ? 'Adicionar ao carrinho' : 'Matricular-se neste curso';
      EL.btnMatricular.disabled = jaMatriculado;
      EL.btnMatricular.onclick = () => toggleMatricula(curso.id);
    }

    if (EL.btnVerCurso) {
      EL.btnVerCurso.href = `detalhe.html?id=${curso.id}`;
    }

    EL.overlay.classList.add('aberto');
    document.body.style.overflow = 'hidden';
    if (EL.fecharModal) EL.fecharModal.focus();
  }

  function fecharModal() {
    if (!EL.overlay) return;
    EL.overlay.classList.remove('aberto');
    document.body.style.overflow = '';
  }

  function corTipo(tipo) {
    const mapa = {
      introdutorio: 'var(--cat-web)',
      intermediario: 'var(--cat-mobile)',
      avancado: 'var(--cat-dados)',
    };
    return mapa[tipo] || 'var(--cor-texto-secundario)';
  }

  function toggleMatricula(cursoId) {
    if (estado.matriculados.includes(cursoId)) {
      estado.matriculados = estado.matriculados.filter((id) => id !== cursoId);
    } else {
      estado.matriculados.push(cursoId);
      if (!estado.carrinho.includes(cursoId)) {
        estado.carrinho.push(cursoId);
      }
    }
    persistir();
    renderizarCursos();
    if (EL.overlay && EL.overlay.classList.contains('aberto')) {
      abrirModal(cursoId);
    }
  }

  /* ------------------------------------------------------------------
     Eventos dos filtros
     ------------------------------------------------------------------ */
  function configurarFiltros() {
    if (!EL.campoBusca) return;

    EL.campoBusca.addEventListener('input', (evt) => {
      estado.busca = evt.target.value;
      renderizarCursos();
    });

    if (EL.slider && EL.valorDuracao) {
      EL.slider.addEventListener('input', (evt) => {
        estado.meses = parseInt(evt.target.value, 10);
        EL.valorDuracao.textContent = `Até ${estado.meses} meses`;
        renderizarCursos();
      });
    }

    EL.tipos.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          estado.tipos.add(checkbox.value);
        } else {
          estado.tipos.delete(checkbox.value);
        }
        renderizarCursos();
      });
    });

    if (EL.limpar) {
      EL.limpar.addEventListener('click', () => {
        estado.categoria = 'todos';
        estado.busca = '';
        estado.meses = 24;
        estado.tipos = new Set();

        if (EL.campoBusca) EL.campoBusca.value = '';
        if (EL.slider) {
          EL.slider.value = 24;
          EL.valorDuracao.textContent = 'Até 24 meses';
        }
        EL.tipos.forEach((cb) => (cb.checked = false));
        renderizarChips();
        renderizarCursos();
      });
    }
  }

  /* ------------------------------------------------------------------
     Modal: fechar com botão, clique fora e ESC
     ------------------------------------------------------------------ */
  function configurarModal() {
    if (!EL.overlay || !EL.fecharModal) return;
    EL.fecharModal.addEventListener('click', fecharModal);
    EL.overlay.addEventListener('click', (evt) => {
      if (evt.target === EL.overlay) fecharModal();
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && EL.overlay.classList.contains('aberto')) fecharModal();
    });
  }

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  function configurarMenuMobile() {
    if (!EL.menuBtn || !EL.menuToggle) return;
    EL.menuBtn.addEventListener('click', () => {
      const aberto = EL.menuToggle.checked;
      EL.menuBtn.setAttribute('aria-expanded', String(!aberto));
    });
  }

  /* ------------------------------------------------------------------
     Cart toggle: redireciona para a página do carrinho
     ------------------------------------------------------------------ */
  function configurarCartToggle() {
    const btn = document.querySelector('.cart-toggle');
    if (!btn) return;
    const arquivo = location.pathname.split('/').pop();
    const paginasRaiz = [
      'ajuda.html',
      'validacao-certificados.html',
      'central-do-aluno.html',
      'termos-de-uso.html',
      'trilhas-de-aprendizagem.html',
    ];
    const url = paginasRaiz.includes(arquivo)
      ? 'carrinho/pagina_carrinho.html'
      : '../carrinho/pagina_carrinho.html';
    btn.addEventListener('click', () => {
      location.href = url;
    });
    btn.setAttribute('role', 'link');
    btn.setAttribute('aria-roledescription', 'carrinho');
  }

  /* ------------------------------------------------------------------
     Navegação ativa (destaca link da página atual)
     ------------------------------------------------------------------ */
  function destacarNavAtiva() {
    if (!EL.navLinks.length) return;
    const caminho = location.pathname.split('/').pop() || 'index.html';
    EL.navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const alvo = href.split('/').pop();
      if (alvo && (caminho === alvo || (alvo !== 'index.html' && caminho.includes(alvo)))) {
        link.classList.add('ativo');
      } else {
        link.classList.remove('ativo');
      }
    });

    // Qualquer link clicado fica amarelo (ativo)
    EL.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        EL.navLinks.forEach((l) => l.classList.remove('ativo'));
        link.classList.add('ativo');
      });
    });
  }

  /* ------------------------------------------------------------------
     Animação de revelação ao rolar
     ------------------------------------------------------------------ */
  function configurarRevelacao() {
    const observaveis = $$('.reveal');
    if (!observaveis.length) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observer.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observaveis.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------
     Formulários
     ------------------------------------------------------------------ */
  function configurarFormularios() {
    $$('form').forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const msg = form.querySelector('.form-msg');
        const dados = Object.fromEntries(new FormData(form).entries());

        if (msg) {
          msg.textContent = 'Mensagem enviada com sucesso! Retornaremos em breve.';
          msg.className = 'form-msg sucesso';
        }

        setTimeout(() => {
          form.reset();
          if (msg) msg.textContent = '';
        }, 2500);
      });
    });
  }

  /* ------------------------------------------------------------------
     Cabeçalho: efeito de rolagem
     ------------------------------------------------------------------ */
  function configurarHeader() {
    if (!EL.header) return;
    let ultimaPos = window.scrollY;
    window.addEventListener('scroll', () => {
      const pos = window.scrollY;
      if (pos > ultimaPos && pos > 100) {
        EL.header.style.transform = 'translateY(-100%)';
      } else {
        EL.header.style.transform = 'translateY(0)';
      }
      ultimaPos = Math.max(0, pos);
    });
    EL.header.style.transition = 'transform 0.3s ease';
  }

  /* ------------------------------------------------------------------
     Inicialização
     ------------------------------------------------------------------ */
  function init() {
    renderizarChips();
    renderizarCursos();
    configurarFiltros();
    configurarModal();
    configurarMenuMobile();
    destacarNavAtiva();
    configurarRevelacao();
    configurarFormularios();
    configurarHeader();
    configurarCartToggle();
    atualizarContadorCarrinho();
  }

  // Executa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
