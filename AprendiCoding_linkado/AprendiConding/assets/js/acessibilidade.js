/* ============================================================
   AprendiCoding — Menu de Acessibilidade
   Widget de acessibilidade reutilizável:
   - Tamanho do texto (pequena / normal / grande)
   - Alto contraste (ligar/desligar)
   - Escala de cinza (ligar/desligar)
   - Fonte mais legível (ligar/desligar)
   Preferências salvas em localStorage e aplicadas ao carregar.
   ============================================================ */

(() => {
  'use strict';

  const CHAVE = 'aprendicoding_acessibilidade';
  const PADRAO = {
    tamanho: 'normal', // 'pequena' | 'normal' | 'grande'
    contraste: false,
    cinza: false,
    fonteLegivel: false,
  };

  let cfg = {};
  try {
    cfg = JSON.parse(localStorage.getItem(CHAVE) || '{}');
  } catch (_) {
    cfg = {};
  }
  cfg = { ...PADRAO, ...cfg };

  const html = document.documentElement;
  let btn;
  let painel;

  function aplicarPreferencias() {
    html.classList.toggle('acess-fonte-grande', cfg.tamanho === 'grande');
    html.classList.toggle('acess-fonte-pequena', cfg.tamanho === 'pequena');
    html.classList.toggle('acess-contraste-alto', cfg.contraste);
    html.classList.toggle('acess-cinza', cfg.cinza);
    html.classList.toggle('acess-fonte-legivel', cfg.fonteLegivel);
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(cfg));
    } catch (_) {
      // sem suporte a localStorage: ignora
    }
    aplicarPreferencias();
    atualizarControles();
  }

  function definirTamanho(tamanho) {
    cfg.tamanho = tamanho;
    salvar();
  }

  function alternar(chave) {
    cfg[chave] = !cfg[chave];
    salvar();
  }

  function reiniciar() {
    cfg = { ...PADRAO };
    salvar();
  }

  function criarWidget() {
    if (document.getElementById('acessibilidade-widget')) return;

    const container = document.createElement('div');
    container.id = 'acessibilidade-widget';
    container.className = 'acessibilidade-widget';
    container.innerHTML = `
      <button
        class="acessibilidade-btn"
        id="acessibilidade-btn"
        aria-label="Menu de acessibilidade"
        aria-expanded="false"
        aria-haspopup="true"
        title="Opções de acessibilidade"
      >
        <span class="acessibilidade-icone" aria-hidden="true">&#x267F;</span>
        <span class="acessibilidade-rotulo">Acessibilidade</span>
      </button>
      <div
        class="acessibilidade-painel"
        id="acessibilidade-painel"
        role="menu"
        aria-hidden="true"
        hidden
      >
        <div class="acessibilidade-grupo">
          <h3 class="acessibilidade-titulo-grupo">Tamanho do texto</h3>
          <button class="acessibilidade-item" type="button" role="menuitemradio" aria-checked="false" data-tamanho="pequena">
            A<span class="sr-only">-</span> <span class="sr-only">texto menor</span>
          </button>
          <button class="acessibilidade-item" type="button" role="menuitemradio" aria-checked="false" data-tamanho="normal">
            Normal <span class="sr-only">tamanho normal do texto</span>
          </button>
          <button class="acessibilidade-item" type="button" role="menuitemradio" aria-checked="false" data-tamanho="grande">
            A<span class="sr-only">+</span> <span class="sr-only">texto maior</span>
          </button>
        </div>
        <div class="acessibilidade-grupo">
          <h3 class="acessibilidade-titulo-grupo">Contraste e cor</h3>
          <button class="acessibilidade-item acessibilidade-toggle" type="button" role="menuitemcheckbox" aria-checked="false" data-chave="contraste">
            Alto contraste <span class="acessibilidade-badge" aria-hidden="true">desligado</span>
          </button>
          <button class="acessibilidade-item acessibilidade-toggle" type="button" role="menuitemcheckbox" aria-checked="false" data-chave="cinza">
            Escala de cinza <span class="acessibilidade-badge" aria-hidden="true">desligado</span>
          </button>
        </div>
        <div class="acessibilidade-grupo">
          <h3 class="acessibilidade-titulo-grupo">Leitura</h3>
          <button class="acessibilidade-item acessibilidade-toggle" type="button" role="menuitemcheckbox" aria-checked="false" data-chave="fonteLegivel">
            Fonte mais legível <span class="acessibilidade-badge" aria-hidden="true">desligado</span>
          </button>
        </div>
        <div class="acessibilidade-grupo">
          <button class="acessibilidade-item acessibilidade-reiniciar" type="button">Reiniciar configurações</button>
        </div>
        <p class="acessibilidade-ajuda">
          Use a tecla <kbd>Esc</kbd> para fechar este menu.
        </p>
      </div>
    `;
    document.body.appendChild(container);

    btn = document.getElementById('acessibilidade-btn');
    painel = document.getElementById('acessibilidade-painel');

    const botoesTamanho = painel.querySelectorAll('[data-tamanho]');
    const botoesToggle = painel.querySelectorAll('[data-chave]');
    const btnReiniciar = painel.querySelector('.acessibilidade-reiniciar');

    function abrir() {
      painel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      const primeiro = painel.querySelector('[type="button"]');
      if (primeiro) primeiro.focus();
    }

    function fechar() {
      painel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }

    btn.addEventListener('click', () => {
      const aberto = painel.hidden;
      aberto ? abrir() : fechar();
    });

    botoesTamanho.forEach((b) => {
      b.addEventListener('click', () => definirTamanho(b.dataset.tamanho));
    });

    botoesToggle.forEach((b) => {
      b.addEventListener('click', () => alternar(b.dataset.chave));
    });

    btnReiniciar.addEventListener('click', reiniciar);

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && !painel.hidden) fechar();
    });

    painel.addEventListener('click', (evt) => {
      if (evt.target === painel) fechar();
    });

    atualizarControles();
  }

  function atualizarControles() {
    if (!btn || !painel) return;
    painel.querySelectorAll('[data-tamanho]').forEach((b) => {
      const ativo = b.dataset.tamanho === cfg.tamanho;
      b.setAttribute('aria-checked', String(ativo));
      b.classList.toggle('acessibilidade-item--ativo', ativo);
    });
    painel.querySelectorAll('[data-chave]').forEach((b) => {
      const ativo = cfg[b.dataset.chave];
      b.setAttribute('aria-checked', String(ativo));
      b.classList.toggle('acessibilidade-item--ativo', ativo);
      const badge = b.querySelector('.acessibilidade-badge');
      if (badge) badge.textContent = ativo ? 'ligado' : 'desligado';
    });
  }

  // Aplica preferências salvas assim que o script carrega
  aplicarPreferencias();

  // Cria o widget quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarWidget);
  } else {
    criarWidget();
  }

  // Exposta para uso externo, se necessário
  window.acessibilidade = {
    cfg,
    salvar,
    aplicarPreferencias,
    definirTamanho,
    alternar,
    reiniciar,
  };
})();
