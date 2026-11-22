/* ============================================================
   AprendiCoding — Carrinho: itens, preços, cupom e pagamento
   Integra com localStorage 'aprendicoding_carrinho' e
   'aprendicoding_cupom'. Usa CURSOS (dados.js) para os preços.
   ============================================================ */

(() => {
  'use strict';

  const CHAVE_CARRINHO = 'aprendicoding_carrinho';
  const CHAVE_CUPOM = 'aprendicoding_cupom';

  // Cupons válidos (exemplo de mercado)
  const CUPOMS = {
    BEMVINDO:  { tipo: 'percentual', valor: 10, label: '10% de desconto' },
    APRENDA10: { tipo: 'percentual', valor: 10, label: '10% de desconto' },
    DESCONTO20:{ tipo: 'percentual', valor: 20, label: '20% de desconto' },
    PIX10:     { tipo: 'percentual', valor: 10, label: '10% de desconto no Pix' },
  };

  const EL = {
    cheio: document.getElementById('carrinho-cheio'),
    vazio: document.getElementById('carrinho-vazio'),
    lista: document.getElementById('itensCarrinho'),
    subtotal: document.getElementById('resumoSubtotal'),
    descontoEl: document.getElementById('resumoDesconto'),
    linhaDesconto: document.getElementById('linhaDesconto'),
    total: document.getElementById('resumoTotal'),
    cupom: document.getElementById('cupom'),
    btnAplicarCupom: document.getElementById('btnAplicarCupom'),
    msgCupom: document.getElementById('msgCupom'),
    btnContinuar: document.getElementById('btnContinuarPagamento'),
    btnLimpar: document.getElementById('btnLimparCarrinho'),
    cartCount: document.getElementById('cart-count'),
  };

  /* ---------- leitura/escrita ---------- */
  function lerCarrinho() {
    try {
      const bruto = localStorage.getItem(CHAVE_CARRINHO);
      return bruto ? JSON.parse(bruto) : [];
    } catch (e) {
      return [];
    }
  }
  function gravarCarrinho(ids) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(ids));
    atualizarContadorHeader();
  }
  function lerCupom() {
    try {
      const bruto = localStorage.getItem(CHAVE_CUPOM);
      return bruto ? JSON.parse(bruto) : null;
    } catch (e) {
      return null;
    }
  }
  function gravarCupom(cupom) {
    if (cupom) localStorage.setItem(CHAVE_CUPOM, JSON.stringify(cupom));
    else localStorage.removeItem(CHAVE_CUPOM);
  }

  function atualizarContadorHeader() {
    const el = EL.cartCount;
    const ids = lerCarrinho();
    if (el) {
      el.textContent = ids.length;
      el.hidden = ids.length === 0;
    }
  }

  /* ---------- preços ---------- */
  function cursoPorId(id) {
    return typeof CURSOS !== 'undefined' ? CURSOS.find((c) => c.id == id) : null;
  }
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /* ---------- cálculo ---------- */
  function calcularTotais() {
    const ids = lerCarrinho();
    const cupom = lerCupom();

    let subtotal = 0;
    ids.forEach((id) => {
      const curso = cursoPorId(id);
      if (curso && curso.preco) subtotal += Number(curso.preco || 0);
    });

    let desconto = 0;
    if (cupom) {
      if (cupom.tipo === 'percentual') {
        desconto = subtotal * (cupom.valor / 100);
      } else if (cupom.tipo === 'fixo') {
        desconto = cupom.valor;
      }
      if (desconto > subtotal) desconto = subtotal;
    }

    const total = subtotal - desconto;
    return { subtotal, desconto, total, ids, cupom };
  }

  /* ---------- render ---------- */
  function renderizar() {
    const { subtotal, desconto, total, ids, cupom } = calcularTotais();

    // vazio / cheio
    if (EL.cheio && EL.vazio) {
      if (ids.length === 0) {
        EL.vazio.hidden = false;
        EL.cheio.hidden = true;
      } else {
        EL.vazio.hidden = true;
        EL.cheio.hidden = false;
      }
    }

    // lista de itens
    if (EL.lista) {
      EL.lista.innerHTML = '';
      if (ids.length === 0) return;

      ids.forEach((id) => {
        const curso = cursoPorId(id);
        if (!curso) return;

        const item = document.createElement('article');
        item.className = 'carrinho-item';
        item.dataset.id = curso.id;

        const precoTexto = curso.preco && curso.preco > 0
          ? `${curso.precoLabel || formatarMoeda(curso.preco)}/mês`
          : 'Grátis';

        item.innerHTML = `
          <div class="carrinho-item-imagem">
            <img src="${curso.imagem || `../assets/img/curso-${curso.id}.svg`}" alt="Capa ${curso.titulo}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <span class="sem-imagem" style="display:none">📚</span>
          </div>
          <div class="carrinho-item-info">
            <span class="carrinho-item-categoria">${curso.categoriaLabel}</span>
            <h3 class="carrinho-item-titulo">${curso.titulo}</h3>
            <div class="carrinho-item-meta">
              <span class="carrinho-item-duracao">${curso.duracao} • ${curso.horas}h</span>
              <span class="carrinho-item-preco">${precoTexto}</span>
            </div>
          </div>
          <div class="carrinho-item-acoes">
            <button class="btn-remover" data-remover="${curso.id}" title="Remover do carrinho" aria-label="Remover ${curso.titulo} do carrinho">×</button>
          </div>
        `;
        EL.lista.appendChild(item);
      });

      EL.lista.querySelectorAll('[data-remover]').forEach((btn) => {
        btn.addEventListener('click', () => {
          removerDoCarrinho(parseInt(btn.dataset.remover, 10));
        });
      });
    }

    // resumo
    if (EL.subtotal) EL.subtotal.textContent = formatarMoeda(subtotal);
    if (EL.total) EL.total.textContent = formatarMoeda(total);

    if (EL.linhaDesconto && EL.descontoEl) {
      if (desconto > 0) {
        EL.linhaDesconto.hidden = false;
        EL.descontoEl.textContent = `- ${formatarMoeda(desconto)}`;
      } else {
        EL.linhaDesconto.hidden = true;
      }
    }

    // preenche cupom salvo
    if (EL.cupom && cupom) EL.cupom.value = cupom.codigo || '';

    atualizarContadorHeader();
  }

  function mostrarMsg(texto, tipo = 'sucesso') {
    if (!EL.msgCupom) return;
    EL.msgCupom.textContent = texto;
    EL.msgCupom.className = `form-msg ${tipo}`;
    setTimeout(() => {
      EL.msgCupom.textContent = '';
      EL.msgCupom.className = 'form-msg';
    }, 3500);
  }

  /* ---------- eventos ---------- */
  function removerDoCarrinho(cursoId) {
    let ids = lerCarrinho();
    ids = ids.filter((id) => id !== cursoId);
    gravarCarrinho(ids);
    mostrarMsg('Curso removido do carrinho.');
    renderizar();
  }

  function limparCarrinho() {
    gravarCarrinho([]);
    gravarCupom(null);
    if (EL.cupom) EL.cupom.value = '';
    mostrarMsg('Carrinho limpo.');
    renderizar();
  }

  function aplicarCupom() {
    const codigo = (EL.cupom && EL.cupom.value || '').trim().toUpperCase();
    if (!codigo) {
      mostrarMsg('Informe um código de cupom.', 'erro');
      return;
    }
    const cupom = CUPOMS[codigo];
    if (!cupom) {
      mostrarMsg('Cupom inválido. Tente: BEMVINDO, APRENDA10, DESCONTO20 ou PIX10.', 'erro');
      return;
    }
    gravarCupom({ codigo, ...cupom });
    mostrarMsg(`Cupom aplicado: ${cupom.label}`);
    renderizar();
  }

  function continuarParaPagamento() {
    const ids = lerCarrinho();
    if (ids.length === 0) {
      mostrarMsg('Seu carrinho está vazio.', 'erro');
      return;
    }

    const metodo = document.querySelector('input[name="pagamento"]:checked');
    if (!metodo) {
      mostrarMsg('Escolha uma forma de pagamento.', 'erro');
      return;
    }

    const arquivo = {
      pix: 'pagamento-pix.html',
      debito: 'pagamento-debito.html',
      credito: 'pagamento-credito.html',
    }[metodo.value];

    location.href = arquivo;
  }

  function init() {
    if (EL.btnAplicarCupom) EL.btnAplicarCupom.addEventListener('click', aplicarCupom);
    if (EL.btnLimpar) EL.btnLimpar.addEventListener('click', limparCarrinho);
    if (EL.btnContinuar) EL.btnContinuar.addEventListener('click', continuarParaPagamento);

    // Enter aplica cupom
    if (EL.cupom) {
      EL.cupom.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') aplicarCupom();
      });
    }

    renderizar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
