// AprendiCoding — Armazenamento compartilhado de matrícula (localStorage).
// Serve como a "variável" que guarda os dados do aluno cadastrado entre as telas.
// Inclua este script em qualquer página que precise ler ou salvar a matrícula.

const MATRICULA_KEY = 'aprendicoding_matricula';

const MatriculaStore = {
  // Salva os dados da matrícula/cadastro do aluno.
  // dados: { nome, sobrenome, email, senha?, cursoId?, cursoNome? }
  salvar(dados) {
    const registro = {
      nome: dados.nome || '',
      sobrenome: dados.sobrenome || '',
      email: dados.email || '',
      cursoId: dados.cursoId || null,
      cursoNome: dados.cursoNome || null,
      data: new Date().toISOString(),
    };
    try {
      localStorage.setItem(MATRICULA_KEY, JSON.stringify(registro));
    } catch (e) {
      console.warn('Não foi possível salvar a matrícula:', e);
    }
    return registro;
  },

  // Retorna os dados salvos ou null se não houver cadastro.
  obter() {
    try {
      const raw = localStorage.getItem(MATRICULA_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  // Limpa os dados (logout / deslogar).
  limpar() {
    try {
      localStorage.removeItem(MATRICULA_KEY);
    } catch (e) {
      console.warn('Não foi possível limpar a matrícula:', e);
    }
  },

  // Retorna true se houver um aluno cadastrado.
  estaLogado() {
    return this.obter() !== null;
  },

  // Nome completo para exibição.
  nomeCompleto() {
    const m = this.obter();
    return m ? `${m.nome} ${m.sobrenome}`.trim() : '';
  },
};
