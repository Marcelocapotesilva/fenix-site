import type { Journey } from '@/lib/types';

export const JOURNEYS: Journey[] = [
  {
    slug: 'maisons-and-brands',
    number: '01',
    name: 'Maisons & Brands',
    short: 'Para marcas que desejam entrar, crescer ou reorganizar sua presença em um novo território.',
    intro:
      'A marca é dona da marca. O operador opera. O especialista exerce a função especializada. A FÊNIX governa e desenvolve o mercado — para que cada decisão local preserve a identidade e a ambição da maison.',
    forYou: [
      'Diagnóstico do território e da categoria',
      'Seleção e avaliação de operadores locais',
      'Plano de lançamento, posicionamento e calendário',
      'Coordenação contínua entre marca, operador e varejo',
    ],
    weNeed: ['Apresentação institucional da marca', 'Portfólio e documentação disponível', 'Mercados de interesse e situação atual', 'Objetivos e horizonte de tempo'],
    nextSteps: ['Conversa inicial de qualificação', 'Diagnóstico e proposta de escopo', 'Mandato e plano de mercado'],
    intent: 'Representar ou expandir uma marca',
    relatedExpertise: ['fenix-beauty', 'fenix-access', 'stakeholder-studio'],
  },
  {
    slug: 'distributors-and-importers',
    number: '02',
    name: 'Distributors & Importers',
    short: 'Para operadores que desejam novas marcas e uma relação mais estruturada com as maisons.',
    intro:
      'Trabalhamos ao lado de distribuidores e importadores. Nosso papel é alinhar marca e operador, organizar a informação e criar condições para crescimento previsível — nunca substituir a operação local.',
    forYou: [
      'Acesso a marcas em processo de entrada',
      'Documentação técnica e comercial organizada',
      'Critérios claros de governança de canal',
      'Planejamento conjunto de lançamento e reposição',
    ],
    weNeed: ['Perfil da empresa e cobertura', 'Categorias e canais atendidos', 'Estrutura logística e regulatória', 'Marcas de interesse'],
    nextSteps: ['Cadastro e conversa de apresentação', 'Avaliação de aderência por marca', 'Acesso ao Partner Access após aprovação'],
    intent: 'Distribuir ou importar produtos',
    relatedExpertise: ['fenix-access', 'fenix-beauty'],
  },
  {
    slug: 'retailers-and-boutiques',
    number: '03',
    name: 'Retailers & Boutiques',
    short: 'Para varejistas e boutiques em busca de curadoria, amostras e condições comerciais.',
    intro:
      'Boutiques e varejistas seletivos encontram aqui curadoria de marcas, materiais de apresentação, amostras e um canal direto para cotação — com condições comerciais disponíveis apenas a parceiros aprovados.',
    forYou: ['Curadoria por categoria e ocasião', 'Solicitação de amostras e kits', 'Cotações via canal privado', 'Treinamento de equipe (The 3 Islands®)'],
    weNeed: ['Perfil da loja ou rede', 'Localização e público', 'Categorias e faixas de interesse', 'Volume estimado'],
    nextSteps: ['Solicitação de cadastro', 'Validação comercial', 'Acesso ao catálogo privado'],
    intent: 'Comprar produtos para uma boutique',
    relatedExpertise: ['fenix-access', 'fenix-beauty'],
  },
  {
    slug: 'producers-and-manufacturers',
    number: '04',
    name: 'Producers & Manufacturers',
    short: 'Para produtores de matérias-primas e fabricantes que desejam acessar a indústria internacional.',
    intro:
      'Produtores, cooperativas e fabricantes podem apresentar matérias-primas, capacidades industriais e projetos. Avaliamos prontidão, documentação e viabilidade antes de qualquer apresentação a compradores.',
    forYou: ['Avaliação de prontidão para exportação', 'Estruturação de amostras técnicas', 'Conexão com compradores e indústria', 'Projetos de P&D com a FÊNIX Labs'],
    weNeed: ['Descrição do material ou capacidade', 'Origem e volume disponível', 'Documentação técnica existente', 'Certificações e licenças vigentes'],
    nextSteps: ['Envio de informações técnicas', 'Avaliação preliminar', 'Plano de qualificação'],
    intent: 'Apresentar matérias-primas',
    relatedExpertise: ['fenix-amazon-raw', 'fenix-labs'],
  },
  {
    slug: 'hotels-and-destinations',
    number: '05',
    name: 'Hotels & Destinations',
    short: 'Para hotéis, destinos e espaços que desejam identidade olfativa e experiências próprias.',
    intro:
      'Hotéis, destinos e espaços culturais podem desenvolver uma assinatura olfativa, amenities, programas de experiência e jornadas do Grand Tour com a FÊNIX.',
    forYou: ['Identidade olfativa e plano de difusão', 'Amenities e extensões de marca', 'Experiências privadas e programas culturais', 'Inclusão em jornadas do Grand Tour'],
    weNeed: ['Posicionamento do espaço ou destino', 'Áreas e públicos', 'Calendário e objetivos', 'Referências de marca'],
    nextSteps: ['Briefing', 'Proposta criativa', 'Desenvolvimento e implantação'],
    intent: 'Desenvolver uma identidade olfativa',
    relatedExpertise: ['fenix-scent-spaces', 'stakeholder-experiences', 'fenix-grand-tour'],
  },
  {
    slug: 'groups-institutions-special-projects',
    number: '06',
    name: 'Groups, Institutions & Special Projects',
    short: 'Para grupos empresariais, instituições e projetos que exigem uma estrutura sob medida.',
    intro:
      'Grupos, instituições, governos e associações podem desenvolver com a FÊNIX projetos especiais de mercado, indústria, cultura, educação e inovação.',
    forYou: ['Estruturação de projeto sob medida', 'Coordenação de parceiros e especialistas', 'Missões comerciais e programas institucionais', 'Governança e acompanhamento'],
    weNeed: ['Contexto e objetivo do projeto', 'Instituições envolvidas', 'Território e prazo', 'Recursos previstos'],
    nextSteps: ['Conversa de escopo', 'Nota conceitual', 'Plano de projeto'],
    intent: 'Apresentar outra oportunidade',
    relatedExpertise: ['fenix-labs', 'stakeholder-experiences', 'fenix-grand-tour'],
  },
];

export const getJourney = (slug: string) => JOURNEYS.find((j) => j.slug === slug);
