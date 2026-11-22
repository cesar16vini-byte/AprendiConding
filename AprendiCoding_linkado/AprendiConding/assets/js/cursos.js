// AprendiCoding — Interatividade do catálogo de cursos.
// Filtros: categoria, busca, duração máxima e nível. Modal de detalhes do curso.

(function () {
  const GRID = document.getElementById("gridCursos");
  const CONTADOR = document.getElementById("contador");
  const CHIPS = document.getElementById("categorias");
  const CAMPO_BUSCA = document.getElementById("campoBusca");
  const SLIDER = document.getElementById("sliderDuracao");
  const VALOR_DURACAO = document.getElementById("valorDuracao");
  const CHECKBOXES = document.querySelectorAll('.filtros__tipos input[type="checkbox"]');
  const LIMPAR = document.getElementById("limparFiltros");

  // Modal
  const OVERLAY = document.getElementById("overlay");
  const FECHAR_MODAL = document.getElementById("fecharModal");
  const MODAL_ICONE = document.getElementById("modalIcone");
  const MODAL_DURACAO = document.getElementById("modalDuracao");
  const MODAL_TITULO = document.getElementById("modalTitulo");
  const MODAL_NIVEL = document.getElementById("modalNivel");
  const MODAL_CATEGORIA = document.getElementById("modalCategoria");
  const MODAL_DESCRICAO = document.getElementById("modalDescricao");
  const MODAL_APRENDA = document.getElementById("modalAprenda");
  const BTN_MATRICULAR = document.getElementById("btnMatricular");
  const BTN_VER_CURSO = document.getElementById("btnVerCurso");

  let estado = {
    categoria: "todos",
    busca: "",
    meses: 24,
    tipos: new Set(),
  };

  // ------------------------------------------------------------------
  // Renderização dos chips de categoria
  // ------------------------------------------------------------------
  function renderChips() {
    CHIPS.innerHTML = "";
    CATEGORIAS.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `categorias__chip${estado.categoria === cat.key ? " ativo" : ""}`;
      btn.dataset.categoria = cat.key;
      btn.textContent = cat.label;
      btn.addEventListener("click", () => {
        estado.categoria = cat.key;
        render();
      });
      CHIPS.appendChild(btn);
    });
  }

  // ------------------------------------------------------------------
  // Filtragem e renderização dos cards
  // ------------------------------------------------------------------
  function filtrar() {
    return CURSOS.filter((curso) => {
      if (estado.categoria !== "todos" && curso.categoria !== estado.categoria) {
        return false;
      }
      if (curso.meses > estado.meses) {
        return false;
      }
      if (estado.tipos.size > 0 && !estado.tipos.has(curso.tipo)) {
        return false;
      }
      const termo = estado.busca.toLowerCase();
      if (termo && !curso.titulo.toLowerCase().includes(termo) && !curso.descricao.toLowerCase().includes(termo)) {
        return false;
      }
      return true;
    });
  }

  function render() {
    const cursos = filtrar();

    // Contador
    CONTADOR.textContent = `${cursos.length} curso${cursos.length !== 1 ? "s" : ""} encontrado${cursos.length !== 1 ? "s" : ""}`;

    // Grid
    GRID.innerHTML = "";
    if (cursos.length === 0) {
      const vazio = document.createElement("p");
      vazio.className = "sem-resultados";
      vazio.textContent = "Nenhum curso encontrado com esses filtros.";
      GRID.appendChild(vazio);
      return;
    }

    cursos.forEach((curso) => {
      const card = document.createElement("article");
      card.className = "curso-card";
      card.dataset.id = curso.id;
      card.dataset.categoria = curso.categoria;
      card.dataset.meses = curso.meses;
      card.dataset.tipo = curso.tipo;

      card.innerHTML = `
        <div class="curso-card__cabecalho">
          <span class="curso-card__duracao">${curso.duracao}</span>
          <span class="curso-card__icone" style="--cat: ${COR_POR_CATEGORIA[curso.categoria]}; border-color: ${COR_POR_CATEGORIA[curso.categoria]}; color: ${COR_POR_CATEGORIA[curso.categoria]};">
            <svg class="icon" viewBox="0 0 24 24"><use href="#${ICONES_POR_CATEGORIA[curso.categoria]}"></use></svg>
          </span>
        </div>
        <h4 class="curso-card__titulo">${curso.titulo}</h4>
        <span class="curso-card__categoria">${LABEL_POR_CATEGORIA[curso.categoria]}</span>
        <span class="curso-card__nivel">${curso.tipoLabel}</span>
        <p class="curso-card__descricao">${curso.descricao}</p>
        <button class="btn btn--outline btn--pequeno" type="button" data-abrir-modal="${curso.id}">Mais sobre o curso</button>
      `;
      GRID.appendChild(card);
    });

    GRID.querySelectorAll("[data-abrir-modal]").forEach((btn) => {
      btn.addEventListener("click", () => abrirModal(parseInt(btn.dataset.abrirModal, 10)));
    });
  }

  // ------------------------------------------------------------------
  // Modal de detalhes do curso
  // ------------------------------------------------------------------
  function abrirModal(id) {
    const curso = cursoPorId(id);
    if (!curso) return;

    MODAL_ICONE.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><use href="#${ICONES_POR_CATEGORIA[curso.categoria]}"></use></svg>`;
    MODAL_ICONE.style.setProperty("--cat", COR_POR_CATEGORIA[curso.categoria]);
    MODAL_ICONE.style.borderColor = COR_POR_CATEGORIA[curso.categoria];
    MODAL_ICONE.style.color = COR_POR_CATEGORIA[curso.categoria];

    MODAL_DURACAO.textContent = curso.duracao;
    MODAL_TITULO.textContent = curso.titulo;
    MODAL_NIVEL.textContent = curso.tipoLabel;
    MODAL_NIVEL.style.color = COR_POR_TIPO[curso.tipo];
    MODAL_CATEGORIA.textContent = LABEL_POR_CATEGORIA[curso.categoria];
    MODAL_DESCRICAO.textContent = curso.descricao;

    MODAL_APRENDA.innerHTML = curso.aprenda.map((item) => `<li>${item}</li>`).join("");

    BTN_MATRICULAR.href = `../matricula/pagina_matricula.html?curso=${curso.id}&nome=${encodeURIComponent(curso.titulo)}`;
    BTN_VER_CURSO.href = `detalhe.html?id=${curso.id}`;

    OVERLAY.classList.add("aberto");
    document.body.style.overflow = "hidden";
    FECHAR_MODAL.focus();
  }

  function fecharModal() {
    OVERLAY.classList.remove("aberto");
    document.body.style.overflow = "";
  }

  FECHAR_MODAL.addEventListener("click", fecharModal);
  OVERLAY.addEventListener("click", (evt) => {
    if (evt.target === OVERLAY) fecharModal();
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && OVERLAY.classList.contains("aberto")) fecharModal();
  });

  // ------------------------------------------------------------------
  // Filtros da sidebar
  // ------------------------------------------------------------------
  CAMPO_BUSCA.addEventListener("input", (evt) => {
    estado.busca = evt.target.value;
    render();
  });

  SLIDER.addEventListener("input", (evt) => {
    estado.meses = parseInt(evt.target.value, 10);
    VALOR_DURACAO.textContent = `Até ${estado.meses} meses`;
    render();
  });

  CHECKBOXES.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        estado.tipos.add(checkbox.value);
      } else {
        estado.tipos.delete(checkbox.value);
      }
      render();
    });
  });

  LIMPAR.addEventListener("click", () => {
    estado.categoria = "todos";
    estado.busca = "";
    estado.meses = 24;
    estado.tipos = new Set();

    CAMPO_BUSCA.value = "";
    SLIDER.value = 24;
    VALOR_DURACAO.textContent = "Até 24 meses";
    CHECKBOXES.forEach((cb) => (cb.checked = false));
    renderChips();
    render();
  });

  // ------------------------------------------------------------------
  // Inicialização
  // ------------------------------------------------------------------
  renderChips();
  render();
})();
