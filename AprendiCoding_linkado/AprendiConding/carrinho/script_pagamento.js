/* ============================================================
   AprendiCoding — Páginas de pagamento (Pix / débito / crédito)
   Lê carrinho e cupom do localStorage, exibe resumo, aplica
   cupom e finaliza a compra no método selecionado.
   ============================================================ */

(() => {
  'use strict';

  const CHAVE_CARRINHO = 'aprendicoding_carrinho';
  const CHAVE_CUPOM = 'aprendicoding_cupom';

  const CUPOMS = {
    BEMVINDO:  { tipo: 'percentual', valor: 10, label: '10% de desconto' },
    APRENDA10: { tipo: 'percentual', valor: 10, label: '10% de desconto' },
    DESCONTO20:{ tipo: 'percentual', valor: 20, label: '20% de desconto' },
    PIX10:     { tipo: 'percentual', valor: 10, label: '10% de desconto no Pix' },
  };

  const METODO = document.body.dataset.metodo || 'pix';

  const EL = {
    lista: document.getElementById('itensPagamento'),
    subtotal: document.getElementById('resumoSubtotal'),
    descontoEl: document.getElementById('resumoDesconto'),
    linhaDesconto: document.getElementById('linhaDesconto'),
    total: document.getElementById('resumoTotal'),
    cupom: document.getElementById('cupom'),
    btnAplicarCupom: document.getElementById('btnAplicarCupom'),
    msgCupom: document.getElementById('msgCupom'),
    btnConfirmar: document.getElementById('btnConfirmarPagamento'),
    form: document.getElementById('formPagamento'),
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
  function lerCupom() {
    try {
      const bruto = localStorage.getItem(CHAVE_CUPOM);
      return bruto ? JSON.parse(bruto) : null;
    } catch (e) {
      return null;
    }
  }
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
      desconto = cupom.tipo === 'percentual'
        ? subtotal * (cupom.valor / 100)
        : cupom.valor;
      if (desconto > subtotal) desconto = subtotal;
    }
    return { subtotal, desconto: Math.round(desconto * 100) / 100, total: subtotal - desconto, ids, cupom };
  }

  /* ---------- render ---------- */
  function renderizar() {
    const { subtotal, desconto, total, ids, cupom } = calcularTotais();

    if (EL.lista) {
      EL.lista.innerHTML = '';
      if (ids.length === 0) {
        EL.lista.innerHTML = '<p style="color:var(--cor-texto-secundario);">Carrinho vazio.</p>';
      }
      ids.forEach((id) => {
        const curso = cursoPorId(id);
        if (!curso) return;
        const precoTexto = curso.preco && curso.preco > 0
          ? `${curso.precoLabel || formatarMoeda(curso.preco)}/mês`
          : 'Grátis';
        const linha = document.createElement('div');
        linha.className = 'item-linha';
        linha.innerHTML = `
          <span class="titulo">${curso.titulo} <span style="font-weight:400;font-size:0.8rem;color:var(--cor-texto-secundario);">(${precoTexto})</span></span>
          <span>${formatarMoeda(curso.preco || 0)}</span>
        `;
        EL.lista.appendChild(linha);
      });
    }

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

    if (EL.cupom && cupom) EL.cupom.value = cupom.codigo || '';
  }

  function mostrarMsg(texto, tipo = 'sucesso') {
    if (!EL.msgCupom) return;
    EL.msgCupom.textContent = texto;
    EL.msgCupom.className = `form-msg ${tipo}`;
    setTimeout(() => {
      EL.msgCupom.textContent = '';
      EL.msgCupom.className = 'form-msg';
    }, 4000);
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
    localStorage.setItem(CHAVE_CUPOM, JSON.stringify({ codigo, ...cupom }));
    mostrarMsg(`Cupom aplicado: ${cupom.label}`);
    renderizar();
  }

  /* ---------- validação por método ---------- */
  function validaFormulario() {
    const form = EL.form;
    if (!form) return true;
    const campos = form.querySelectorAll('input[required], select[required]');
    for (const campo of campos) {
      if (!campo.value.trim()) {
        campo.focus();
        mostrarMsg('Preencha todos os campos obrigatórios.', 'erro');
        return false;
      }
    }
    return true;
  }

  function finalizar() {
    if (!validaFormulario()) return;

    const ids = lerCarrinho();
    if (ids.length === 0) {
      mostrarMsg('Carrinho vazio.', 'erro');
      return;
    }

    const { total } = calcularTotais();

    // Limpa carrinho e cupom (compra concluída)
    localStorage.removeItem(CHAVE_CARRINHO);
    localStorage.removeItem(CHAVE_CUPOM);

    // Mostra tela de sucesso no lugar do formulário
    const container = document.getElementById('conteudoPagamento');
    if (container) {
      container.innerHTML = `
        <div class="sucesso-card">
          <div class="sucesso-icone" aria-hidden="true">✅</div>
          <h2>Pagamento confirmado!</h2>
          <p>Sua matrícula foi realizada com sucesso pelo método <strong>${rotuloMetodo()}</strong>.</p>
          <span class="sucesso-total">Total pago: ${formatarMoeda(total)}</span>
          <a href="../Inicial/pagina_inicial.html" class="btn btn--saida btn--largo">Voltar ao início</a>
          <a href="../perfil/perfil.html" class="btn btn--fantasma btn--largo" style="margin-top:10px;">Ir para o painel do aluno</a>
        </div>
      `;
    }
  }

  function rotuloMetodo() {
    const map = { pix: 'Pix', debito: 'Cartão de débito', credito: 'Cartão de crédito' };
    return map[METODO] || METODO;
  }

  /* ---------- init ---------- */
  function init() {
    renderizar();
    if (EL.btnAplicarCupom) EL.btnAplicarCupom.addEventListener('click', aplicarCupom);
    if (EL.cupom) {
      EL.cupom.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') aplicarCupom();
      });
    }
    if (EL.btnConfirmar) EL.btnConfirmar.addEventListener('click', finalizar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
