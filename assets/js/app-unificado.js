/* ============================================================
   AprendiCoding — JS unificado (todas as páginas)
   Funcionalidades:
   - Estado da aplicação (matrículas, carrinho, progresso, blog)
   - Catálogo de cursos: filtros, renderização, chips
   - Modal de detalhes do curso
   - Matrícula e carrinho (localStorage)
   - Painel do aluno (perfil): estatísticas, matrículas, certificados
   - Carrinho de matrículas: leitura, renderização, limpeza
   - Blog: dados, filtros, renderização de artigos
   - Menu mobile, cart toggle, navegação ativa
   - Animações de revelação ao rolar
   - Formulários, header scroll
   - Cursos: toggle de módulos (detalhe/curso-X)
   ============================================================ */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Utilitários de DOM
     ------------------------------------------------------------------ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ------------------------------------------------------------------
     Design tokens / helpers
     ------------------------------------------------------------------ */
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Exibe o preço de um curso: grátis para introdutórios, mensalidade para assinaturas.
  function formatarPreco(curso) {
    if (!curso) return 'Grátis';
    if (curso.preco === 0 || curso.assinatura === false) {
      return 'Grátis';
    }
    return `${curso.precoLabel || formatarMoeda(curso.preco)}/mês`;
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

  function cursoPorId(id) {
    return typeof CURSOS !== 'undefined' ? CURSOS.find((c) => c.id === id) : null;
  }

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
    progresso: JSON.parse(localStorage.getItem('aprendicoding_progresso') || '{}'),
  };

  const estadoBlog = { categoria: 'todas', busca: '' };

  /* ------------------------------------------------------------------
     Persistência
     ------------------------------------------------------------------ */
  function persistir() {
    localStorage.setItem('aprendicoding_matriculados', JSON.stringify(estado.matriculados));
    localStorage.setItem('aprendicoding_carrinho', JSON.stringify(estado.carrinho));
    localStorage.setItem('aprendicoding_progresso', JSON.stringify(estado.progresso));
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
     Catálogo de cursos
     ------------------------------------------------------------------ */
  function filtrarCursos() {
    if (typeof CURSOS === 'undefined') return [];
    return CURSOS.filter((curso) => {
      if (estado.categoria !== 'todos' && curso.categoria !== estado.categoria) {
        return false;
      }
      if (curso.meses > estado.meses) return false;
      if (estado.tipos.size > 0 && !estado.tipos.has(curso.tipo)) return false;
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
    const grid = document.getElementById('gridCursos');
    const contador = document.getElementById('contador');
    if (!grid) return;

    const cursos = filtrarCursos();
    if (contador) {
      contador.textContent = `${cursos.length} curso${cursos.length !== 1 ? 's' : ''} encontrado${
        cursos.length !== 1 ? 's' : ''
      }`;
    }

    grid.innerHTML = '';
    if (cursos.length === 0) {
      const vazio = document.createElement('p');
      vazio.className = 'sem-resultados';
      vazio.textContent = 'Nenhum curso encontrado com esses filtros.';
      grid.appendChild(vazio);
      return;
    }

    const jaMatriculado = (id) => estado.matriculados.includes(id);
    const noCarrinho = (id) => estado.carrinho.includes(id);

    cursos.forEach((curso) => {
      const card = document.createElement('article');
      card.className = 'curso-card';
      card.dataset.id = curso.id;
      card.dataset.categoria = curso.categoria;
      card.dataset.meses = curso.meses;
      card.dataset.tipo = curso.tipo;

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
            <span class="curso-card-preco">${formatarPreco(curso)}</span>
          </div>
        </div>
        <button class="btn btn--saida btn--pequeno" data-abrir-modal="${curso.id}">
          Ver curso
        </button>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll('[data-abrir-modal]').forEach((btn) => {
      btn.addEventListener('click', () => abrirModal(parseInt(btn.dataset.abrirModal, 10)));
    });
  }

  function renderizarChips() {
    const chips = document.getElementById('categorias');
    if (!chips || typeof CATEGORIAS === 'undefined') return;
    chips.innerHTML = '';
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
      chips.appendChild(btn);
    });
  }

  /* ------------------------------------------------------------------
     Modal de detalhes
     ------------------------------------------------------------------ */
  function abrirModal(id) {
    const curso = cursoPorId(id);
    const overlay = document.getElementById('overlay');
    if (!curso || !overlay) return;

    const modalIcone = document.getElementById('modalIcone');
    const modalDuracao = document.getElementById('modalDuracao');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalNivel = document.getElementById('modalNivel');
    const modalCategoria = document.getElementById('modalCategoria');
    const modalDescricao = document.getElementById('modalDescricao');
    const modalAprenda = document.getElementById('modalAprenda');
    const btnMatricular = document.getElementById('btnMatricular');
    const btnVerCurso = document.getElementById('btnVerCurso');
    const fecharModal = document.getElementById('fecharModal');

    if (modalIcone) {
      modalIcone.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><use href="#${iconeCategoria(curso.categoria)}"></use></svg>`;
      modalIcone.style.color = corCategoria(curso.categoria);
    }
    if (modalDuracao) modalDuracao.textContent = curso.duracao;
    if (modalTitulo) modalTitulo.textContent = curso.titulo;
    if (modalNivel) {
      modalNivel.textContent = curso.tipoLabel;
      modalNivel.style.color = corTipo(curso.tipo);
    }
    if (modalCategoria) modalCategoria.textContent = curso.categoriaLabel;
    if (modalDescricao) modalDescricao.textContent = curso.descricao;
    if (modalAprenda) modalAprenda.innerHTML = curso.aprenda.map((item) => `<li>${item}</li>`).join('');

    const jaMatriculado = estado.matriculados.includes(curso.id);
    const noCarrinho = estado.carrinho.includes(curso.id);

    if (btnMatricular) {
      btnMatricular.textContent = jaMatriculado ? 'Já matriculado' : noCarrinho ? 'Adicionar ao carrinho' : 'Matricular-se neste curso';
      btnMatricular.disabled = jaMatriculado;
      btnMatricular.onclick = () => toggleMatricula(curso.id);
    }

    if (btnVerCurso) btnVerCurso.href = `detalhe.html?id=${curso.id}`;

    overlay.classList.add('aberto');
    document.body.style.overflow = 'hidden';
    if (fecharModal) fecharModal.focus();
  }

  function fecharModal() {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;
    overlay.classList.remove('aberto');
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
    const curso = cursoPorId(cursoId);
    if (estado.matriculados.includes(cursoId)) {
      estado.matriculados = estado.matriculados.filter((id) => id !== cursoId);
    } else if (curso && curso.assinatura) {
      // Curso por assinatura (intermediário/avançado): vai para o carrinho, não matricula direto.
      if (!estado.carrinho.includes(cursoId)) {
        estado.carrinho.push(cursoId);
      }
    } else {
      estado.matriculados.push(cursoId);
      if (!estado.carrinho.includes(cursoId)) {
        estado.carrinho.push(cursoId);
      }
    }
    persistir();
    renderizarCursos();
    const overlay = document.getElementById('overlay');
    if (overlay && overlay.classList.contains('aberto')) {
      abrirModal(cursoId);
    }
    // Atualiza perfil se estiver na página
    if (document.getElementById('meusCursos')) {
      renderizarPerfil();
    }
  }

  /* ------------------------------------------------------------------
     Filtros do catálogo
     ------------------------------------------------------------------ */
  function configurarFiltros() {
    const campoBusca = document.getElementById('campoBusca');
    const slider = document.getElementById('sliderDuracao');
    const valorDuracao = document.getElementById('valorDuracao');
    const tipos = document.querySelectorAll('.filtros__tipos input[type="checkbox"]');
    const limpar = document.getElementById('limparFiltros');

    if (campoBusca) {
      campoBusca.addEventListener('input', (evt) => {
        estado.busca = evt.target.value;
        renderizarCursos();
      });
    }

    if (slider && valorDuracao) {
      slider.addEventListener('input', (evt) => {
        estado.meses = parseInt(evt.target.value, 10);
        valorDuracao.textContent = `Até ${estado.meses} meses`;
        renderizarCursos();
      });
    }

    tipos.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) estado.tipos.add(checkbox.value);
        else estado.tipos.delete(checkbox.value);
        renderizarCursos();
      });
    });

    if (limpar) {
      limpar.addEventListener('click', () => {
        estado.categoria = 'todos';
        estado.busca = '';
        estado.meses = 24;
        estado.tipos = new Set();
        if (campoBusca) campoBusca.value = '';
        if (slider) {
          slider.value = 24;
          valorDuracao.textContent = 'Até 24 meses';
        }
        tipos.forEach((cb) => (cb.checked = false));
        renderizarChips();
        renderizarCursos();
      });
    }
  }

  /* ------------------------------------------------------------------
     Modal: fechar com botão, clique fora e ESC
     ------------------------------------------------------------------ */
  function configurarModal() {
    const overlay = document.getElementById('overlay');
    const fecharModal = document.getElementById('fecharModal');
    if (!overlay || !fecharModal) return;
    fecharModal.addEventListener('click', fecharModal);
    overlay.addEventListener('click', (evt) => {
      if (evt.target === overlay) fecharModal();
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && overlay.classList.contains('aberto')) fecharModal();
    });
  }

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  function configurarMenuMobile() {
    const menuBtn = document.querySelector('.menu-btn');
    const menuToggle = document.getElementById('menu-toggle');
    if (!menuBtn || !menuToggle) return;
    menuBtn.addEventListener('click', () => {
      const aberto = menuToggle.checked;
      menuBtn.setAttribute('aria-expanded', String(!aberto));
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
     Navegação ativa
     ------------------------------------------------------------------ */
  function destacarNavAtiva() {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;
    const caminho = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const alvo = href ? href.split('/').pop() : '';
      if (alvo && (caminho === alvo || (alvo !== 'index.html' && caminho.includes(alvo)))) {
        link.classList.add('ativo');
      } else {
        link.classList.remove('ativo');
      }
    });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.forEach((l) => l.classList.remove('ativo'));
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
    const header = document.querySelector('.site-header');
    if (!header) return;
    let ultimaPos = window.scrollY;
    window.addEventListener('scroll', () => {
      const pos = window.scrollY;
      if (pos > ultimaPos && pos > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      ultimaPos = Math.max(0, pos);
    });
    header.style.transition = 'transform 0.3s ease';
  }

  /* ------------------------------------------------------------------
     Painel do aluno (perfil)
     ------------------------------------------------------------------ */
  function renderizarPerfil() {
    const grid = document.getElementById('meusCursos');
    const vazio = document.getElementById('vazioMatriculas');
    const bemvindo = document.getElementById('perfil-bemvindo');
    const perfilEmail = document.getElementById('perfil-email');
    const perfilTitulo = document.getElementById('perfil-titulo');
    const certSection = document.getElementById('certificadosSection');
    const certGrid = document.getElementById('meusCertificados');

    const elMatriculados = document.getElementById('stat-matriculados');
    const elConcluidos = document.getElementById('stat-concluidos');
    const elHoras = document.getElementById('stat-horas');
    const elProgresso = document.getElementById('stat-progresso');

    const matricula = typeof MatriculaStore !== 'undefined' ? MatriculaStore.obter() : null;
    const matriculados = estado.matriculados;
    const progresso = estado.progresso;

    // Boas-vindas
    if (bemvindo) {
      if (matricula && matricula.nome) {
        bemvindo.textContent = 'Bem-vindo de volta, ' + matricula.nome + '.';
      } else if (matricula && matricula.email) {
        bemvindo.textContent = 'Bem-vindo de volta, ' + matricula.email.split('@')[0] + '.';
      } else {
        bemvindo.textContent = 'Faça sua matrícula para começar a estudar.';
      }
    }
    if (perfilEmail) perfilEmail.textContent = (matricula && matricula.email) ? matricula.email : '';
    if (perfilTitulo) perfilTitulo.textContent = 'Meu painel';

    // Contadores
    if (elMatriculados) elMatriculados.textContent = matriculados.length;

    if (!grid || matriculados.length === 0) {
      if (vazio) vazio.style.display = 'block';
      if (elConcluidos) elConcluidos.textContent = '0';
      if (elHoras) elHoras.textContent = '0';
      if (elProgresso) elProgresso.textContent = '0%';
      if (certSection) certSection.style.display = 'none';
      return;
    }

    grid.innerHTML = '';
    let totalHoras = 0;
    let concluidos = 0;
    let totalProgresso = 0;

    matriculados.forEach((id) => {
      const curso = cursoPorId(parseInt(id, 10));
      if (!curso) return;
      const p = progresso[id] || { percentual: 0, concluido: false, dataConclusao: null };
      const percentual = p.percentual || 0;
      const concluido = p.concluido === true;
      if (concluido) concluidos++;
      totalHoras += curso.horas || 0;
      totalProgresso += percentual;

      const cor = {
        web: 'var(--cat-web)',
        mobile: 'var(--cat-mobile)',
        dados: 'var(--cat-dados)',
        linguagens: 'var(--cat-linguagens)',
      }[curso.categoria] || 'var(--cor-primaria)';

      const card = document.createElement('article');
      card.className = 'curso-card ' + (concluido ? 'concluido-card' : 'matriculado-card');
      card.dataset.id = curso.id;
      card.innerHTML = `
        <div class="curso-card-imagem">
          <img src="../../assets/img/curso-${curso.id}.svg" alt="Capa ${curso.titulo}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='var(--cor-fundo-suave)'">
          <div class="curso-card-badge">${concluido ? 'Concluído' : 'Matriculado'}</div>
        </div>
        <div class="curso-card-conteudo">
          <div class="curso-card-meta">
            <span class="curso-card-categoria" style="color:${cor}">${curso.categoriaLabel}</span>
            <span class="curso-card-nivel">${curso.tipoLabel}</span>
          </div>
          <h3 class="curso-card-titulo">${curso.titulo}</h3>
          <p class="curso-card-descricao">${curso.descricao}</p>
          <div class="curso-progresso">
            <div class="curso-progresso-label">
              <span>Progresso</span>
              <span>${percentual}%</span>
            </div>
            <div class="curso-progresso-track">
              <div class="curso-progresso-bar" style="width:${percentual}%"></div>
            </div>
          </div>
          <div class="curso-card-rodape" style="margin-top:14px;">
            <div class="curso-card-avaliacao">
              <span class="curso-card-nota">${curso.nota.toFixed(1)}</span>
            </div>
            <span class="curso-card-preco">Grátis</span>
          </div>
          <div class="curso-acoes">
            <a href="../cursos/detalhe.html?id=${curso.id}" class="btn btn--saida btn--pequeno">Continuar estudando</a>
            ${concluido ? '<button type="button" class="btn btn--fantasma btn--pequeno" onclick="emitirCertificado(' + curso.id + ')">Certificado</button>' : ''}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    if (vazio) vazio.style.display = 'none';

    if (elConcluidos) elConcluidos.textContent = concluidos;
    if (elHoras) elHoras.textContent = totalHoras;
    if (elProgresso) elProgresso.textContent = matriculados.length ? Math.round(totalProgresso / matriculados.length) + '%' : '0%';

    // Certificados emitidos
    const certificados = matriculados.map(function (id) {
      const curso = cursoPorId(parseInt(id, 10));
      const p = progresso[id] || {};
      return { curso: curso, p: p };
    }).filter(function (c) { return c.curso && c.p.concluido === true; });

    if (certificados.length > 0 && certSection) {
      certSection.style.display = 'block';
      certificados.forEach(function (c) {
        const curso = c.curso;
        const p = c.p;
        const card = document.createElement('article');
        card.className = 'curso-card certificado-card';
        card.innerHTML = `
          <div class="curso-card-imagem">
            <img src="../../assets/img/curso-${curso.id}.svg" alt="Capa ${curso.titulo}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='var(--cor-fundo-suave)'">
            <div class="curso-card-badge" style="background:var(--cor-sucesso);">Certificado</div>
          </div>
          <div class="curso-card-conteudo">
            <div class="curso-card-meta">
              <span class="curso-card-categoria" style="color:var(--cor-sucesso)">Certificado válido</span>
              <span class="curso-card-nivel">${curso.certificado ? curso.certificado.cargaHoraria : '—'}</span>
            </div>
            <h3 class="curso-card-titulo">${curso.titulo}</h3>
            <p class="curso-card-descricao">Certificado digital de ${curso.certificado ? curso.certificado.cargaHoraria : '—'}, emitido em ${p.dataConclusao ? new Date(p.dataConclusao).toLocaleDateString('pt-BR') : '—'}.</p>
            <div class="curso-card-rodape">
              <span class="curso-card-preco">Grátis</span>
            </div>
            <div class="curso-acoes">
              <button type="button" class="btn btn--saida btn--pequeno" onclick="emitirCertificado(${curso.id})">Baixar PDF</button>
              <a href="../cursos/detalhe.html?id=${curso.id}" class="btn btn--fantasma btn--pequeno">Revisar curso</a>
            </div>
          </div>
        `;
        certGrid.appendChild(card);
      });
    } else if (certSection) {
      certSection.style.display = 'none';
    }
  }

  // Exposta globalmente para uso no onclick do perfil
  window.emitirCertificado = function (cursoId) {
    const curso = cursoPorId(cursoId);
    if (!curso) return;
    alert('Certificado do curso "' + curso.titulo + '" — ' + (curso.certificado ? curso.certificado.cargaHoraria : '—') + '\n\n(Em ambiente de produção, este PDF seria gerado para download.)');
  };

  /* ------------------------------------------------------------------
     Carrinho de matrículas
     ------------------------------------------------------------------ */
  function lerCarrinho() {
    try {
      const raw = localStorage.getItem('aprendicoding_carrinho');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function renderizarCarrinho() {
    const container = document.getElementById('itensCarrinho');
    const totalEl = document.getElementById('totalCarrinho');
    const btnLimpar = document.getElementById('btnLimparCarrinho');
    if (!container) return;

    const ids = lerCarrinho();
    if (!ids.length) {
      container.innerHTML = '<p style="color:var(--cor-texto-secundario);margin:0;text-align:center;">Seu carrinho está vazio.</p>';
      if (totalEl) totalEl.textContent = 'R$ 0,00';
      return;
    }
    let total = 0;
    const lista = ids.map(function (id) {
      const curso = cursoPorId(id);
      if (!curso) return '';
      const preco = Number(curso.preco || 0);
      total += preco;
      const precoTexto = curso.preco && curso.preco > 0
        ? (curso.precoLabel || formatarMoeda(curso.preco)) + '/mês'
        : 'Grátis';
      return `
        <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--cor-borda);">
          <span style="color:var(--cor-texto);font-weight:600;">${curso.titulo || 'Curso'}</span>
          <span style="color:var(--cor-texto-secundario);margin-left:auto;">${precoTexto}</span>
        </div>
      `;
    }).join('');
    container.innerHTML = lista;
    if (totalEl) totalEl.textContent = 'R$ ' + total.toFixed(2);

    if (btnLimpar) {
      btnLimpar.addEventListener('click', function () {
        localStorage.removeItem('aprendicoding_carrinho');
        estado.carrinho = [];
        atualizarContadorCarrinho();
        renderizarCarrinho();
        document.dispatchEvent(new Event('carrinhoAtualizado'));
      });
    }
  }

  /* ------------------------------------------------------------------
     Blog
     ------------------------------------------------------------------ */
  function filtrarPosts() {
    const POSTS = window.POSTS || [];
    return POSTS.filter((p) => {
      if (estadoBlog.categoria !== 'todas' && p.categoria !== estadoBlog.categoria) return false;
      const termo = estadoBlog.busca.toLowerCase().trim();
      if (termo && !p.titulo.toLowerCase().includes(termo) && !p.resumo.toLowerCase().includes(termo)) return false;
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
      const destaque = posts.find((p) => p.destaque);
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

  function renderizarFiltrosBlog() {
    const container = document.getElementById('filtrosBlog');
    if (!container || typeof CATEGORIAS_BLOG === 'undefined') return;
    container.innerHTML = '';
    CATEGORIAS_BLOG.forEach((cat) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip ${estadoBlog.categoria === cat.key ? 'chip--ativo' : ''}`;
      b.dataset.categoria = cat.key;
      b.textContent = cat.label;
      b.addEventListener('click', () => {
        estadoBlog.categoria = cat.key;
        renderizarFiltrosBlog();
        renderizarPosts();
      });
      container.appendChild(b);
    });
  }

  function initBlog() {
    renderizarFiltrosBlog();
    renderizarPosts();
    const busca = document.getElementById('buscaBlog');
    if (busca) {
      busca.addEventListener('input', (evt) => {
        estadoBlog.busca = evt.target.value;
        renderizarPosts();
      });
    }
  }

  /* ------------------------------------------------------------------
     Cursos: toggle de módulos (detalhe / curso-X)
     ------------------------------------------------------------------ */
  window.toggleModulo = function (index) {
    const aulas = document.getElementById('modulos-' + index);
    if (!aulas) return;
    const aberto = aulas.classList.contains('aberto');
    document.querySelectorAll('.modulo-aulas').forEach((el) => el.classList.remove('aberto'));
    if (!aberto) {
      aulas.classList.add('aberto');
    }
  };

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

    // Página de perfil
    if (document.getElementById('meusCursos') || document.getElementById('meusCertificados')) {
      renderizarPerfil();
    }

    // Página de carrinho
    if (document.getElementById('itensCarrinho')) {
      renderizarCarrinho();
      document.addEventListener('carrinhoAtualizado', renderizarCarrinho);
    }

    // Página do blog
    if (document.getElementById('gridPosts')) {
      initBlog();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
