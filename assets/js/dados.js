// AprendiCoding — Dados compartilhados do catálogo de cursos.
// Utilizados por cursos/script.js (catálogo) e cursos/detalhe.html (página do curso).

const CATEGORIAS = [
  { key: 'todos', label: 'Todos' },
  { key: 'web', label: 'Programador web' },
  { key: 'mobile', label: 'Programador mobile' },
  { key: 'dados', label: 'Banco de dados' },
  { key: 'linguagens', label: 'Linguagens de Programação' },
];

const TIPOS = [
  { key: 'introdutorio', label: 'Introdutório' },
  { key: 'intermediario', label: 'Intermediário' },
  { key: 'avancado', label: 'Avançado' },
];

const ICONES_POR_CATEGORIA = {
  web: 'icon-code',
  mobile: 'icon-phone',
  dados: 'icon-book',
  linguagens: 'icon-laptop',
};

const COR_POR_CATEGORIA = {
  web: 'var(--azul)',
  mobile: 'var(--roxo)',
  dados: 'var(--amarelo)',
  linguagens: 'var(--azul)',
};

const LABEL_POR_CATEGORIA = {
  web: 'Programador web',
  mobile: 'Programador mobile',
  dados: 'Banco de dados',
  linguagens: 'Linguagens de Programação',
};

const COR_POR_TIPO = {
  introdutorio: 'var(--azul)',
  intermediario: 'var(--roxo)',
  avancado: 'var(--amarelo)',
};

const ICONES_POR_TIPO_AULA = {
  video: 'icon-screen-play',
  leitura: 'icon-book',
  exercicio: 'icon-code',
  projeto: 'icon-laptop',
};

const CURSOS = [
  {
    id: 1,
    titulo: "A.D.S — Análise e Desenvolvimento de Sistemas",
    categoria: "web",
    duracao: "12 meses",
    meses: 12,
    horas: 360,
    tipo: "intermediario",
    tipoLabel: "Intermediário",
    categoriaLabel: "Programador web",
    preco: 89.90,
    precoLabel: "R$ 89,90/mês",
    assinatura: true,
    nota: 4.6,
    avaliacoes: 128,
    descricao: "Análise e Desenvolvimento de Sistemas: lógica de programação, banco de dados e engenharia de software na prática. Do zero ao deploy de aplicações reais.",
    instrutor: {
      nome: "Carla Mendes",
      bio: "Engenheira de software com 10 anos de experiência em sistemas corporativos. Já treinou mais de 3.000 alunos em bootcamps de programação.",
      avatar: 'icon-user',
    },
    certificado: {
      tipo: "Digital",
      cargaHoraria: "360h",
      valido: true,
    },
    prerequisitos: [
      "Não é necessário ter conhecimento prévio em programação",
      "Noções básicas de uso de computador e internet",
    ],
    publicoAlvo: [
      "Quem está começando do zero na área de tecnologia",
      "Pessoas em transição de carreira para a programação",
      "Estudantes que querem construir o próprio portfólio",
    ],
    aprenda: [
      "Lógica de programação e algoritmo",
      "Estruturas de dados e banco de dados relacional",
      "Engenharia de software na prática",
      "Documentação e versionamento com Git",
      "Deploy de aplicações na nuvem",
    ],
    modulos: [
      { nome: "Fundamentos de programação", aulas: [
        { titulo: "Lógica de programação com JavaScript", duracao: "40 min", tipo: "video" },
        { titulo: "Variáveis, tipos de dados e operadores", duracao: "35 min", tipo: "leitura" },
        { titulo: "Estruturas de condição e repetição", duracao: "45 min", tipo: "exercicio" },
        { titulo: "Funções e escopo", duracao: "30 min", tipo: "video" },
      ] },
      { nome: "Banco de dados e SQL", aulas: [
        { titulo: "Modelagem relacional e entidades", duracao: "50 min", tipo: "video" },
        { titulo: "Consultas SELECT, WHERE e JOIN", duracao: "55 min", tipo: "exercicio" },
        { titulo: "Normalização de banco de dados", duracao: "40 min", tipo: "leitura" },
        { titulo: "Projeto: banco de dados de uma loja", duracao: "60 min", tipo: "projeto" },
      ] },
      { nome: "Engenharia de software", aulas: [
        { titulo: "Ciclo de vida do software (SDLC)", duracao: "35 min", tipo: "video" },
        { titulo: "Metodologias ágeis: Scrum e Kanban", duracao: "45 min", tipo: "leitura" },
        { titulo: "Documentação de requisitos", duracao: "40 min", tipo: "exercicio" },
      ] },
    ],
    depoimentos: [
      { autor: "Marcos Silva", avaliacao: 5, texto: "O curso me deu base para sair do zero e criar meu primeiro sistema. Recomendo!" },
      { autor: "Fernanda Costa", avaliacao: 4, texto: "Conteúdo bem estruturado. Só senti falta de mais exercícios práticos no módulo de banco." },
    ],
    relacionados: [2, 11],
  },
  {
    id: 2,
    titulo: "Redes de Computadores",
    categoria: "dados",
    duracao: "12 meses",
    meses: 12,
    horas: 240,
    tipo: "introdutorio",
    tipoLabel: "Introdutório",
    categoriaLabel: "Banco de dados",
    preco: 0,
    precoLabel: "Grátis",
    assinatura: false,
    nota: 4.4,
    avaliacoes: 94,
    descricao: "Fundamentos de redes de computadores, protocolos, cabeamento estruturado e administração de servidores.",
    instrutor: {
      nome: "Roberto Lima",
      bio: "Analista de redes sênior, especialista em infraestrutura de TI e segurança da informação.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "240h", valido: true },
    prerequisitos: [
      "Noções básicas de informática",
      "Acesso a um computador com conexão à internet",
    ],
    publicoAlvo: [
      "Quem quer atuar com suporte de TI e redes",
      "Estudantes de cursos de tecnologia",
    ],
    aprenda: [
      "Modelos OSI e TCP/IP",
      "Protocolos de rede e endereçamento",
      "Cabeamento estruturado",
      "Administração de servidores",
    ],
    modulos: [
      { nome: "Introdução às redes", aulas: [
        { titulo: "O que é uma rede de computadores", duracao: "30 min", tipo: "video" },
        { titulo: "Tipos de rede: LAN, MAN, WAN", duracao: "35 min", tipo: "leitura" },
        { titulo: "Hardware de rede", duracao: "40 min", tipo: "video" },
      ] },
      { nome: "Protocolos e cabeamento", aulas: [
        { titulo: "Protocolos TCP e UDP", duracao: "45 min", tipo: "video" },
        { titulo: "Tipos de cabo e conectores", duracao: "35 min", tipo: "leitura" },
        { titulo: "Configuração de endereçamento IP", duracao: "50 min", tipo: "exercicio" },
      ] },
      { nome: "Servidores", aulas: [
        { titulo: "Instalação de servidor Linux", duracao: "60 min", tipo: "video" },
        { titulo: "Serviços de DNS e DHCP", duracao: "45 min", tipo: "exercicio" },
      ] },
    ],
    depoimentos: [
      { autor: "João Pereira", avaliacao: 5, texto: "Excelente para entender como as redes funcionam por baixo do capô." },
    ],
    relacionados: [8, 9],
  },
  {
    id: 3,
    titulo: "ZOO — Desenvolvimento Web com Projeto Temático",
    categoria: "web",
    duracao: "12 meses",
    meses: 12,
    horas: 200,
    tipo: "introdutorio",
    tipoLabel: "Introdutório",
    categoriaLabel: "Programador web",
    preco: 0,
    precoLabel: "Grátis",
    assinatura: false,
    nota: 4.7,
    avaliacoes: 156,
    descricao: "Introdução ao desenvolvimento web usando um projeto temático de catalogação de animais como estudo de caso.",
    instrutor: {
      nome: "Ana Paula Souza",
      bio: "Desenvolvedora front-end e instrutora de web. Criadora de projetos educativos com foco em prática.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "200h", valido: true },
    prerequisitos: [
      "Não requer conhecimentos prévios",
      "Navegador web e editor de texto instalados",
    ],
    publicoAlvo: [
      "Iniciantes em desenvolvimento web",
      "Quem quer aprender HTML, CSS e JavaScript na prática",
    ],
    aprenda: [
      "HTML5 e CSS3 do zero",
      "JavaScript básico",
      "Consumo de APIs",
      "Deploy de sites estáticos",
    ],
    modulos: [
      { nome: "HTML e CSS", aulas: [
        { titulo: "Estrutura de uma página HTML", duracao: "40 min", tipo: "video" },
        { titulo: "CSS: cores, fontes e layout", duracao: "50 min", tipo: "video" },
        { titulo: "Responsividade com media queries", duracao: "45 min", tipo: "exercicio" },
        { titulo: "Projeto: página do ZOO", duracao: "60 min", tipo: "projeto" },
      ] },
      { nome: "JavaScript na prática", aulas: [
        { titulo: "Variáveis e funções em JS", duracao: "40 min", tipo: "video" },
        { titulo: "Manipulação do DOM", duracao: "55 min", tipo: "exercicio" },
        { titulo: "Eventos e interatividade", duracao: "40 min", tipo: "video" },
      ] },
      { nome: "Projeto ZOO", aulas: [
        { titulo: "Catálogo de animais com filtro", duracao: "70 min", tipo: "projeto" },
        { titulo: "Deploy do site final", duracao: "30 min", tipo: "leitura" },
      ] },
    ],
    depoimentos: [
      { autor: "Lucas Alves", avaliacao: 5, texto: "Aprendi a construir meu primeiro site do zero. A didática é ótima." },
      { autor: "Beatriz Rocha", avaliacao: 5, texto: "O projeto do ZOO deixa as aulas muito mais divertidas." },
    ],
    relacionados: [1, 11],
  },
  {
    id: 4,
    titulo: "AGRO — IoT e Dados no Agronegócio",
    categoria: "dados",
    duracao: "12 meses",
    meses: 12,
    horas: 220,
    tipo: "intermediario",
    tipoLabel: "Intermediário",
    categoriaLabel: "Banco de dados",
    preco: 79.90,
    precoLabel: "R$ 79,90/mês",
    assinatura: true,
    nota: 4.5,
    avaliacoes: 73,
    descricao: "Tecnologia aplicada ao agronegócio: coleta e análise de dados de sensores IoT em propriedades rurais.",
    instrutor: {
      nome: "Tiago Ribeiro",
      bio: "Especialista em IoT e dados aplicados ao campo. Trabalha com sensores e dashboards para grandes propriedades.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "220h", valido: true },
    prerequisitos: [
      "Noções de banco de dados",
      "Lógica de programação básica",
    ],
    publicoAlvo: [
      "Profissionais do agronegócio que querem usar tecnologia",
      "Analistas de dados iniciantes",
    ],
    aprenda: [
      "Sensores IoT e coleta de dados",
      "Banco de dados para séries temporais",
      "Dashboards e visualização",
      "Automação no campo",
    ],
    modulos: [
      { nome: "IoT no agronegócio", aulas: [
        { titulo: "Sensores e coletores de dados", duracao: "40 min", tipo: "video" },
        { titulo: "Conectividade no campo", duracao: "35 min", tipo: "leitura" },
      ] },
      { nome: "Armazenamento de dados", aulas: [
        { titulo: "Banco para séries temporais", duracao: "50 min", tipo: "video" },
        { titulo: "Inserção e consulta de dados", duracao: "45 min", tipo: "exercicio" },
      ] },
      { nome: "Dashboards", aulas: [
        { titulo: "Visualização de dados agrícolas", duracao: "55 min", tipo: "video" },
        { titulo: "Projeto: dashboard de safra", duracao: "60 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Carlos Mendes", avaliacao: 4, texto: "Boa introdução a IoT aplicada ao campo." },
    ],
    relacionados: [8, 9],
  },
  {
    id: 5,
    titulo: "Game DEV — Desenvolvimento de Jogos",
    categoria: "linguagens",
    duracao: "12 meses",
    meses: 12,
    horas: 320,
    tipo: "avancado",
    tipoLabel: "Avançado",
    categoriaLabel: "Linguagens de Programação",
    preco: 129.90,
    precoLabel: "R$ 129,90/mês",
    assinatura: true,
    nota: 4.8,
    avaliacoes: 210,
    descricao: "Desenvolvimento de jogos do zero: motores gráficos, física de colisão e lógica de gameplay.",
    instrutor: {
      nome: "Gustavo Nunes",
      bio: "Desenvolvedor de jogos independente. Criou três títulos publicados em lojas digitais.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "320h", valido: true },
    prerequisitos: [
      "Lógica de programação avançada",
      "Conhecimentos de JavaScript ou C#",
      "Noções de matemática para games",
    ],
    publicoAlvo: [
      "Desenvolvedores que querem criar jogos",
      "Estudantes avançados de programação",
    ],
    aprenda: [
      "Lógica de programação avançada",
      "Motores gráficos",
      "Física de colisão",
      "Criação de gameplay",
    ],
    modulos: [
      { nome: "Motor gráfico", aulas: [
        { titulo: "Renderização 2D e 3D", duracao: "60 min", tipo: "video" },
        { titulo: "Sprites e animações", duracao: "45 min", tipo: "exercicio" },
      ] },
      { nome: "Física e colisão", aulas: [
        { titulo: "Detecção de colisão AABB", duracao: "50 min", tipo: "video" },
        { titulo: "Gravidade e movimento", duracao: "40 min", tipo: "exercicio" },
      ] },
      { nome: "Gameplay completo", aulas: [
        { titulo: "HUD e pontuação", duracao: "35 min", tipo: "video" },
        { titulo: "Projeto: jogo completo", duracao: "90 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Rafael Lima", avaliacao: 5, texto: "Saí do curso com meu próprio jogo pronto para publicar." },
      { autor: "Julia Santos", avaliacao: 5, texto: "Física de colisão explicada de forma clara." },
    ],
    relacionados: [6],
  },
  {
    id: 6,
    titulo: "Pixel Art para Jogos",
    categoria: "linguagens",
    duracao: "12 meses",
    meses: 12,
    horas: 100,
    tipo: "introdutorio",
    tipoLabel: "Introdutório",
    categoriaLabel: "Linguagens de Programação",
    preco: 0,
    precoLabel: "Grátis",
    assinatura: false,
    nota: 4.6,
    avaliacoes: 112,
    descricao: "Arte digital em pixel art para jogos e mídias interativas, com foco em paleta de cores e animação de sprites.",
    instrutor: {
      nome: "Larissa Dias",
      bio: "Artista digital e ilustradora especializada em pixel art para jogos indie.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "100h", valido: true },
    prerequisitos: [
      "Não requer conhecimentos prévios",
      "Editor de imagens (gratuito) instalado",
    ],
    publicoAlvo: [
      "Artistas que querem entrar para games",
      "Desenvolvedores de jogos independentes",
    ],
    aprenda: [
      "Paleta de cores",
      "Desenho de sprites",
      "Animação frame a frame",
      "Exportação para jogos",
    ],
    modulos: [
      { nome: "Fundamentos de pixel art", aulas: [
        { titulo: "Paleta de cores e contraste", duracao: "30 min", tipo: "video" },
        { titulo: "Ferramentas de edição", duracao: "25 min", tipo: "leitura" },
      ] },
      { nome: "Criação de sprites", aulas: [
        { titulo: "Personagem em pixel art", duracao: "45 min", tipo: "exercicio" },
        { titulo: "Tilesets de cenário", duracao: "50 min", tipo: "exercicio" },
      ] },
      { nome: "Animação", aulas: [
        { titulo: "Animação frame a frame", duracao: "40 min", tipo: "video" },
        { titulo: "Exportação para engines", duracao: "20 min", tipo: "leitura" },
      ] },
    ],
    depoimentos: [
      { autor: "Pedro Gomes", avaliacao: 5, texto: "Consegui criar os sprites do meu jogo depois desse curso." },
    ],
    relacionados: [5],
  },
  {
    id: 7,
    titulo: "Culinária Digital — Cardápios e Presença Online",
    categoria: "web",
    duracao: "12 meses",
    meses: 12,
    horas: 140,
    tipo: "introdutorio",
    tipoLabel: "Introdutório",
    categoriaLabel: "Programador web",
    preco: 0,
    precoLabel: "Grátis",
    assinatura: false,
    nota: 4.3,
    avaliacoes: 61,
    descricao: "Curso de gastronomia com foco em criação de cardápios digitais e presença online para negócios do setor.",
    instrutor: {
      nome: "Mariana Alves",
      bio: "Gastrônoma e especialista em marketing digital para negócios de alimentação.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "140h", valido: true },
    prerequisitos: [
      "Não requer conhecimentos prévios",
      "Acesso à internet e smartphone ou computador",
    ],
    publicoAlvo: [
      "Dono de restaurantes e food trucks",
      "Profissionais de gastronomia",
    ],
    aprenda: [
      "Criação de cardápios digitais",
      "Presença online para negócios",
      "Fotografia de alimentos",
      "Redes sociais para gastronomia",
    ],
    modulos: [
      { nome: "Cardápio digital", aulas: [
        { titulo: "Estrutura de um cardápio online", duracao: "35 min", tipo: "video" },
        { titulo: "Fotos que vendem", duracao: "30 min", tipo: "leitura" },
      ] },
      { nome: "Presença online", aulas: [
        { titulo: "Google Meu Negócio", duracao: "35 min", tipo: "video" },
        { titulo: "Redes sociais para delivery", duracao: "40 min", tipo: "exercicio" },
      ] },
      { nome: "Redes sociais", aulas: [
        { titulo: "Conteúdo para Instagram", duracao: "40 min", tipo: "video" },
        { titulo: "Projeto: presença online completa", duracao: "60 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Sandra Lima", avaliacao: 4, texto: "Meu delivery ganhou muito com o cardápio digital." },
    ],
    relacionados: [1, 11],
  },
  {
    id: 8,
    titulo: "Machine Learning com Python",
    categoria: "dados",
    duracao: "12 meses",
    meses: 12,
    horas: 300,
    tipo: "avancado",
    tipoLabel: "Avançado",
    categoriaLabel: "Banco de dados",
    preco: 139.90,
    precoLabel: "R$ 139,90/mês",
    assinatura: true,
    nota: 4.7,
    avaliacoes: 189,
    descricao: "Algoritmos de aprendizado de máquina, redes neurais e aplicações práticas com Python.",
    instrutor: {
      nome: "Dra. Sofia Cardoso",
      bio: "Doutora em ciência de dados. Pesquisadora de machine learning aplicado a negócios.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "300h", valido: true },
    prerequisitos: [
      "Python para dados",
      "Estatística básica",
      "Álgebra linear introdutória",
    ],
    publicoAlvo: [
      "Cientistas de dados em formação",
      "Desenvolvedores backend interessados em IA",
    ],
    aprenda: [
      "Python para dados",
      "Algoritmos de aprendizado de máquina",
      "Redes neurais",
      "Aplicações práticas",
    ],
    modulos: [
      { nome: "Python e dados", aulas: [
        { titulo: "Pandas e NumPy", duracao: "60 min", tipo: "video" },
        { titulo: "Limpeza e preparação de dados", duracao: "50 min", tipo: "exercicio" },
      ] },
      { nome: "Algoritmos ML", aulas: [
        { titulo: "Regressão e classificação", duracao: "55 min", tipo: "video" },
        { titulo: "Árvores de decisão", duracao: "45 min", tipo: "exercicio" },
      ] },
      { nome: "Redes neurais", aulas: [
        { titulo: "Perceptron e redes neurais", duracao: "60 min", tipo: "video" },
        { titulo: "Projeto: predição com redes neurais", duracao: "90 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Henrique Moraes", avaliacao: 5, texto: "Conteúdo avançado, mas bem explicado. Saí capaz de construir modelos." },
    ],
    relacionados: [9, 10],
  },
  {
    id: 9,
    titulo: "SQL — Consultas e Modelagem de Bancos",
    categoria: "dados",
    duracao: "12 meses",
    meses: 12,
    horas: 160,
    tipo: "intermediario",
    tipoLabel: "Intermediário",
    categoriaLabel: "Banco de dados",
    preco: 84.90,
    precoLabel: "R$ 84,90/mês",
    assinatura: true,
    nota: 4.5,
    avaliacoes: 134,
    descricao: "Consultas, modelagem e otimização de bancos de dados relacionais usando SQL.",
    instrutor: {
      nome: "Paulo Henrique",
      bio: "DBA sênior com especialização em modelagem de dados e otimização de consultas SQL.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "160h", valido: true },
    prerequisitos: [
      "Noções de banco de dados",
      "Conhecimento básico de informática",
    ],
    publicoAlvo: [
      "Analistas de dados",
      "Desenvolvedores que trabalham com bancos",
    ],
    aprenda: [
      "Consultas SQL",
      "Modelagem de dados",
      "Otimização de bancos",
      "Bancos relacionais",
    ],
    modulos: [
      { nome: "Consultas SQL", aulas: [
        { titulo: "SELECT, WHERE e JOIN", duracao: "50 min", tipo: "video" },
        { titulo: "Agregação e GROUP BY", duracao: "40 min", tipo: "exercicio" },
      ] },
      { nome: "Modelagem", aulas: [
        { titulo: "Modelo entidade-relacionamento", duracao: "45 min", tipo: "leitura" },
        { titulo: "Normalização", duracao: "40 min", tipo: "video" },
      ] },
      { nome: "Otimização", aulas: [
        { titulo: "Índices e performance", duracao: "50 min", tipo: "video" },
        { titulo: "Projeto: banco otimizado", duracao: "60 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Alessandra F.", avaliacao: 5, texto: "SQL ficou muito mais claro depois das aulas de modelagem." },
    ],
    relacionados: [2, 8],
  },
  {
    id: 10,
    titulo: "Java — Programação Orientada a Objetos",
    categoria: "linguagens",
    duracao: "8 meses",
    meses: 8,
    horas: 200,
    tipo: "intermediario",
    tipoLabel: "Intermediário",
    categoriaLabel: "Linguagens de Programação",
    preco: 74.90,
    precoLabel: "R$ 74,90/mês",
    assinatura: true,
    nota: 4.4,
    avaliacoes: 97,
    descricao: "Programação orientada a objetos com Java: classes, herança, interfaces e aplicações de desktop.",
    instrutor: {
      nome: "Ricardo Campos",
      bio: "Desenvolvedor Java com foco em aplicações corporativas e desktop.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "200h", valido: true },
    prerequisitos: [
      "Lógica de programação",
      "JDK e IDE instalados",
    ],
    publicoAlvo: [
      "Quem quer aprender Java do zero",
      "Desenvolvedores de desktop",
    ],
    aprenda: [
      "Java do zero",
      "Programação orientada a objetos",
      "Classes, herança e interfaces",
      "Aplicações de desktop",
    ],
    modulos: [
      { nome: "Java fundamentals", aulas: [
        { titulo: "Primeiros passos com Java", duracao: "40 min", tipo: "video" },
        { titulo: "Tipos de dados e controle de fluxo", duracao: "45 min", tipo: "exercicio" },
      ] },
      { nome: "POO na prática", aulas: [
        { titulo: "Classes e objetos", duracao: "50 min", tipo: "video" },
        { titulo: "Herança e interfaces", duracao: "50 min", tipo: "exercicio" },
      ] },
      { nome: "Projeto final", aulas: [
        { titulo: "Aplicação de desktop completa", duracao: "80 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Marina Lopes", avaliacao: 4, texto: "Boa base de Java. O projeto final ajuda a fixar." },
    ],
    relacionados: [5],
  },
  {
    id: 11,
    titulo: "React — Interfaces Modernas",
    categoria: "web",
    duracao: "6 meses",
    meses: 6,
    horas: 160,
    tipo: "avancado",
    tipoLabel: "Avançado",
    categoriaLabel: "Programador web",
    preco: 119.90,
    precoLabel: "R$ 119,90/mês",
    assinatura: true,
    nota: 4.9,
    avaliacoes: 267,
    descricao: "Interfaces modernas com React: componentes, hooks, estado e consumo de APIs.",
    instrutor: {
      nome: "Diego Martins",
      bio: "Tech lead front-end. Especialista em React e arquitetura de aplicações single-page.",
      avatar: 'icon-user',
    },
    certificado: { tipo: "Digital", cargaHoraria: "160h", valido: true },
    prerequisitos: [
      "JavaScript intermediário",
      "HTML e CSS",
      "Noções de ES6+",
    ],
    publicoAlvo: [
      "Desenvolvedores front-end",
      "Quem quer construir SPAs com React",
    ],
    aprenda: [
      "Componentes React",
      "Hooks e estado",
      "Consumo de APIs",
      "Deploy de aplicações",
    ],
    modulos: [
      { nome: "Componentes", aulas: [
        { titulo: "JSX e componentes", duracao: "45 min", tipo: "video" },
        { titulo: "Props e crianças", duracao: "35 min", tipo: "leitura" },
        { titulo: "Eventos e formulários", duracao: "40 min", tipo: "exercicio" },
      ] },
      { nome: "Hooks", aulas: [
        { titulo: "useState e useEffect", duracao: "50 min", tipo: "video" },
        { titulo: "Hooks personalizados", duracao: "40 min", tipo: "exercicio" },
      ] },
      { nome: "Projeto final", aulas: [
        { titulo: "Aplicação completa com API", duracao: "90 min", tipo: "projeto" },
      ] },
    ],
    depoimentos: [
      { autor: "Thiago R.", avaliacao: 5, texto: "O melhor curso de React que já fiz. Direto ao ponto." },
      { autor: "Camila B.", avaliacao: 5, texto: "Consegui construir meu portfólio com o projeto final." },
    ],
    relacionados: [1, 3],
  },
];

function cursoPorId(id) {
  return CURSOS.find((c) => c.id == id);
}

function cursosRelacionados(ids, excluindoId) {
  return CURSOS.filter((c) => ids.includes(c.id) && c.id != excluindoId);
}
