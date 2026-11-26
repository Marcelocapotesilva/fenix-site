import type { Expertise } from '@/lib/types';
import { IMAGES } from './images';

export const EXPERTISE: Expertise[] = [
  {
    slug: 'fenix-beauty',
    number: '01',
    name: 'FÊNIX Beauty',
    short: 'Representação internacional e desenvolvimento de mercado para maisons de perfumaria e beleza.',
    intro:
      'A FÊNIX Beauty conduz a chegada e o crescimento de maisons de perfumaria, beleza e luxo em novos territórios. Trabalhamos ao lado do ecossistema local — distribuidores, importadores, especialistas regulatórios e varejistas — para que a presença de uma marca se transforme em operação coordenada.',
    valueProposition:
      'Distribuição cria presença. Coordenação cria operação. A FÊNIX Beauty alinha marca, operador e varejo em torno de uma única direção comercial, preservando a identidade da maison em cada ponto de contato.',
    capabilities: [
      'Diagnóstico de mercado e estratégia de entrada',
      'Mapeamento e avaliação de distribuidores e importadores',
      'Critérios de governança de canal, rastreabilidade e autenticidade',
      'Arquitetura de posicionamento e de portfólio por território',
      'Planejamento de lançamento e calendário comercial',
      'Localização de narrativa de marca, PR e criadores',
      'Acompanhamento de sell-in, sell-out e reposição com os parceiros',
      'Representação comercial junto a varejo seletivo e boutiques',
    ],
    clients: [
      'Maisons de perfumaria e casas de herança',
      'Marcas independentes e de perfumaria artística',
      'Marcas de beleza e cuidados premium',
      'Grupos de luxo com novos territórios em avaliação',
    ],
    applications: [
      'Entrada estruturada no Brasil e na América Latina',
      'Reorganização de presença já existente no território',
      'Seleção ou substituição de operador local',
      'Lançamento de coleção ou de nova linha de produto',
    ],
    relatedProjects: ['latam-operator-governance-review'],
    cta: { label: 'Apresentar uma maison', intent: 'Representar ou expandir uma marca' },
  },
  {
    slug: 'fenix-access',
    number: '02',
    name: 'FÊNIX Access',
    short: 'Acesso a mercado para perfumaria internacional: importação, regulação, varejo e cultura.',
    intro:
      'A FÊNIX Access reúne em uma só coordenação as alavancas que levam uma maison do primeiro embarque à desejabilidade na prateleira — distribuição, importação, regulatório, PR, criadores, varejo, cultura, parceiros locais e estratégia de lançamento.',
    valueProposition:
      'Um interlocutor único que conecta especialistas locais, sem substituí-los: cada parceiro executa sua função especializada, a FÊNIX governa a sequência e o ritmo.',
    capabilities: [
      'Mapa regulatório e de importação por categoria de produto',
      'Coordenação entre importador, despachante e especialista regulatório',
      'Introdução comercial a compradores, distribuidores e varejo',
      'Busca de compradores internacionais para produtores',
      'Preparação de documentação comercial e técnica',
      'Plano de PR, criadores e cultura para o lançamento',
      'Catálogo B2B, amostras e kits comerciais',
    ],
    clients: [
      'Maisons sem presença no território',
      'Distribuidores e importadores em busca de novas marcas',
      'Varejistas e boutiques em busca de curadoria',
      'Produtores que desejam acessar compradores internacionais',
    ],
    applications: [
      'Primeira exportação para o Brasil',
      'Rodada de apresentações a compradores',
      'Solicitação estruturada de amostras e cotações',
      'Revisão de rota de mercado já iniciada',
    ],
    relatedProjects: ['latam-operator-governance-review'],
    cta: { label: 'Encontrar compradores ou marcas', intent: 'Encontrar compradores internacionais' },
  },
  {
    slug: 'fenix-amazon-raw',
    number: '03',
    name: 'FÊNIX Amazon Raw',
    short: 'Matérias-primas amazônicas e latino-americanas para perfumaria, cosmética e alimentos.',
    intro:
      'A FÊNIX Amazon Raw avalia e estrutura cadeias de matérias-primas amazônicas — óleos, resinas, extratos e insumos botânicos — para a indústria de perfumaria, cosmética e alimentos, com prioridade para rastreabilidade, prontidão de fornecedores e viabilidade de exportação.',
    valueProposition:
      'Transformar a origem amazônica em material qualificado para a indústria internacional exige método: documentação, conformidade, volume consistente e relação justa com as comunidades e os fornecedores.',
    capabilities: [
      'Mapeamento de fornecedores e avaliação de prontidão',
      'Rastreabilidade de origem e documentação de lote',
      'Avaliação técnica e regulatória com parceiros especializados',
      'Portfólio nacional de óleos vegetais, manteigas e grãos esfoliantes',
      'Estruturação de amostras para casas de composição e indústria',
      'Preparação para exportação e trade internacional',
      'Conexão com a pesquisa da FÊNIX BIO e da FÊNIX Labs',
    ],
    clients: [
      'Casas de composição e fornecedores de fragrância',
      'Indústria cosmética e de cuidados pessoais',
      'Indústria de alimentos e nutrição',
      'Cooperativas e produtores amazônicos',
    ],
    applications: [
      'Qualificação de um novo ingrediente para portfólio',
      'Avaliação de fornecedor para exportação',
      'Desenvolvimento de amostra técnica',
    ],
    relatedProjects: ['acai-seed-infusion', 'amazonian-honey', 'tucuma-absolute', 'amazonian-botanical-oils'],
    cta: { label: 'Apresentar matérias-primas', intent: 'Apresentar matérias-primas' },
    image: IMAGES.copaiba,
    note: 'O portfólio comercial de óleos e ingredientes está no Portfolio. Os projetos de pesquisa (FÊNIX BIO) são conceitos em avaliação, não produtos finalizados ou certificados.',
  },
  {
    slug: 'fenix-labs',
    number: '04',
    name: 'FÊNIX Labs',
    short: 'Pesquisa, desenvolvimento e inovação em parceria com instituições e indústria.',
    intro:
      'A FÊNIX Labs articula pesquisa e desenvolvimento aplicados à perfumaria, à beleza e aos ingredientes, conectando marcas, indústria e instituições técnicas. É o núcleo onde conceitos são avaliados antes de se tornarem projetos industriais.',
    valueProposition:
      'Antes do produto, a validação. A FÊNIX Labs organiza a pergunta técnica certa, encontra o parceiro capaz de respondê-la e documenta o caminho até a decisão.',
    capabilities: [
      'Estruturação de projetos de P&D com parceiros técnicos',
      'Avaliação técnica, regulatória e de viabilidade',
      'Desenvolvimento de conceitos de produto e de ingrediente',
      'Coordenação de testes, amostras e protocolos',
      'Conexão com fomento, institutos de pesquisa e indústria',
    ],
    clients: [
      'Marcas com projeto de desenvolvimento de produto',
      'Indústrias e fabricantes',
      'Pesquisadores e instituições',
      'Produtores de matérias-primas',
    ],
    applications: [
      'Estudo de viabilidade de um novo ingrediente',
      'Desenvolvimento de produto em parceria industrial',
      'Programa de inovação com instituição de pesquisa',
    ],
    relatedProjects: ['acai-seed-infusion', 'tucuma-absolute', 'amazonian-nutrition-research'],
    cta: { label: 'Desenvolver um projeto industrial', intent: 'Desenvolver um projeto industrial' },
    image: IMAGES.labPipette,
    note: 'A FÊNIX Labs atua por meio de parcerias técnicas. A FÊNIX não apresenta laboratório próprio em operação.',
  },
  {
    slug: 'fenix-scent-spaces',
    number: '05',
    name: 'FÊNIX Scent Spaces',
    short: 'Identidade olfativa para hotéis, destinos, varejo e espaços de marca.',
    intro:
      'A FÊNIX Scent Spaces desenvolve identidades olfativas para lugares: hotéis, destinos, boutiques, escritórios e eventos. O perfume passa a fazer parte da arquitetura da experiência e da memória da marca.',
    valueProposition:
      'Um espaço é lembrado pelo que se sente nele. Traduzimos o posicionamento de uma marca ou destino em uma assinatura olfativa coerente, aplicável e mensurável na operação.',
    capabilities: [
      'Briefing olfativo a partir do posicionamento e da arquitetura',
      'Desenvolvimento de assinatura com casas de composição parceiras',
      'Plano de difusão por ambiente e de manutenção',
      'Extensões de marca: amenities, velas, home fragrance e presentes',
      'Ativação de lançamento e treinamento de equipes',
    ],
    clients: ['Hotéis e grupos de hospitalidade', 'Destinos e equipamentos culturais', 'Varejo e boutiques', 'Empresas e incorporadoras'],
    applications: ['Identidade olfativa de hotel', 'Assinatura de flagship', 'Ambientação de evento ou exposição'],
    relatedProjects: [],
    cta: { label: 'Desenvolver uma identidade olfativa', intent: 'Desenvolver uma identidade olfativa' },
  },
  {
    slug: 'stakeholder-studio',
    number: '06',
    name: 'Stakeholder Studio',
    short: 'PR, marketing e digital para perfumaria, música, lifestyle e luxo.',
    intro:
      'O Stakeholder Studio é a agência de comunicação do grupo: relações públicas, marketing, conteúdo e estratégia digital para marcas de perfumaria, música, lifestyle e luxo — com foco em desejabilidade antes de visibilidade.',
    valueProposition:
      'Desirability Before Visibility. Estratégia antes de atividade. Comunicação construída para gerar relação e receita, não apenas alcance.',
    capabilities: [
      'Estratégia de marca e de comunicação por território',
      'Relações públicas, imprensa e relacionamento com criadores',
      'Conteúdo editorial e direção de arte',
      'Gestão de redes sociais e campanhas digitais',
      'Lançamentos, assessoria e gestão de reputação',
    ],
    clients: ['Maisons e marcas de perfumaria', 'Artistas e projetos musicais', 'Marcas de lifestyle e luxo', 'Grupos e instituições'],
    applications: ['Lançamento de marca em novo mercado', 'Plano anual de PR e conteúdo', 'Campanha de colaboração cultural'],
    relatedProjects: [],
    cta: { label: 'Conversar com o Studio', intent: 'Representar ou expandir uma marca' },
  },
  {
    slug: 'stakeholder-experiences',
    number: '07',
    name: 'Stakeholder Experiences',
    short: 'Eventos, ativações e experiências privadas para marcas, grupos e parceiros.',
    intro:
      'O Stakeholder Experiences concebe e produz experiências — encontros privados, ativações de marca, programas culturais e eventos corporativos — onde relações comerciais se constroem com tempo, contexto e hospitalidade.',
    valueProposition: 'Relationships Create Revenue. Cada experiência é desenhada em torno de quem precisa estar na sala e do que precisa acontecer depois dela.',
    capabilities: [
      'Concepção curatorial e roteiro da experiência',
      'Produção executiva com parceiros locais',
      'Lista de convidados, protocolo e hospitalidade',
      'Integração olfativa com a FÊNIX Scent Spaces',
      'Conteúdo, registro e desdobramento comercial',
    ],
    clients: ['Maisons e marcas', 'Grupos empresariais', 'Instituições culturais', 'Destinos e hotéis'],
    applications: ['Jantar privado de lançamento', 'Ativação em feira ou semana de moda', 'Programa cultural corporativo'],
    relatedProjects: [],
    cta: { label: 'Criar uma experiência', intent: 'Criar uma experiência ou evento' },
  },
  {
    slug: 'fenix-grand-tour',
    number: '08',
    name: 'FÊNIX Grand Tour',
    short: 'Jornadas curadas, viagens privadas e missões comerciais pelo universo da perfumaria.',
    intro:
      'O FÊNIX Grand Tour organiza jornadas pelo universo da perfumaria e do luxo — ateliês, origens de matérias-primas, feiras, maisons e destinos culturais — para convidados privados, empresas e delegações comerciais.',
    valueProposition: 'Conhecer um mercado no próprio território, com acesso, contexto e as pessoas certas.',
    capabilities: [
      'Curadoria de roteiro e de acessos',
      'Viagens privadas e corporativas sob medida',
      'Missões comerciais e agenda de reuniões',
      'Coordenação com operadores de viagem responsáveis',
    ],
    clients: ['Viajantes privados', 'Empresas e grupos', 'Delegações e associações comerciais', 'Maisons e parceiros'],
    applications: ['Jornada curada em torno de feira internacional', 'Viagem corporativa de incentivo', 'Missão comercial a um território'],
    relatedProjects: [],
    cta: { label: 'Registrar interesse no Grand Tour', intent: 'Participar do Grand Tour' },
    image: IMAGES.river,
    externalPage: '/grand-tour/',
  },
];

export const TRANSVERSAL_SERVICES = [
  { name: 'Retail & Boutique Development', text: 'Conceito, sortimento, layout e lançamento de pontos de venda e boutiques.' },
  { name: 'International Sales', text: 'Estruturação de vendas internacionais, pipeline de compradores e negociação.' },
  { name: 'Licensing', text: 'Avaliação e estruturação de licenciamentos de marca em perfumaria e beleza.' },
  { name: 'Export & Trade', text: 'Exportação, documentação e coordenação de trade internacional.' },
  { name: 'The 3 Islands® / Retail Training', text: 'Metodologia de treinamento de equipes de varejo de luxo.' },
  { name: 'Corporate Growth', text: 'Estratégia de crescimento, parcerias e estruturação corporativa.' },
];

export const getExpertise = (slug: string) => EXPERTISE.find((e) => e.slug === slug);
