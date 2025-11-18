
import React from 'react';
import type { SidebarItem, SavedSchema, PRD, GeneratedPrompt, SuperPrompt, Idea, Document, Agent, ShowcaseProject, User, PromptAnalysis } from './types';
import { 
    WidgetsIcon, 
    DescriptionIcon, 
    CodeIcon, 
    SparkleIcon, 
    LightbulbIcon,
    StorageIcon,
    AgentIcon,
    StorefrontIcon,
    PencilIcon,
    SettingsIcon
} from './components/icons';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { type: 'divider', text: 'Principal' },
  { text: 'Dashboard', icon: <WidgetsIcon className="h-5 w-5" /> },
  { text: 'Gerar PRD', icon: <DescriptionIcon className="h-5 w-5" /> },
  { text: 'Gerar Prompt', icon: <CodeIcon className="h-5 w-5" /> },
  { text: 'Super Prompt', icon: <SparkleIcon className="h-5 w-5" />, badge: 'NEW' },
  { type: 'divider', text: 'Recursos' },
  { text: 'Catálogo de Ideias', icon: <LightbulbIcon className="h-5 w-5" /> },
  { text: 'Meus Documentos', icon: <DescriptionIcon className="h-5 w-5" /> },
  { text: 'Diagrama de Banco', icon: <StorageIcon className="h-5 w-5" />, badge: 'NEW' },
  { text: 'Agentes', icon: <AgentIcon className="h-5 w-5" />, badge: 'NEW' },
  { text: 'Vitrine de Projetos', icon: <StorefrontIcon className="h-5 w-5" /> },
  { type: 'divider', text: 'Conta' },
  { text: 'Configurações', icon: <SettingsIcon className="h-5 w-5" /> },
];

export const MOCK_USER: User = {
  name: 'Arreche Neto',
  email: 'helioarreche@gmail.com',
  avatarInitial: 'A',
};

export const MOCK_SCHEMAS: SavedSchema[] = [
  { id: 1, title: 'E-commerce', desc: 'Plataforma completa...', tables: 16, chatMsgs: 2, date: '29/10/2025' },
  { id: 2, title: 'Agendamento', desc: 'App de barbearia...', tables: 11, chatMsgs: 2, date: '28/10/2025' },
  { id: 3, title: 'Rede Social', desc: 'Clone do Instagram...', tables: 8, chatMsgs: 2, date: '28/10/2025' },
];

export const MOCK_PRDS: PRD[] = [
  { id: 'prd-1', title: 'Sistema de Gestão de Documentos (SGD)', content: 'Um sistema para upload, armazenamento, versionamento e compartilhamento seguro de documentos. Deve ter controle de acesso baseado em roles (admin, editor, viewer) e uma busca poderosa.' },
  { id: 'prd-2', title: 'Plataforma de Treinamento Online', content: 'Uma plataforma EAD onde instrutores podem criar cursos com vídeos, quizzes e materiais. Alunos podem se inscrever, acompanhar o progresso e receber certificados.' },
  { id: 'prd-3', title: 'App de Marketplace de Serviços Locais', content: 'Um aplicativo que conecta usuários a prestadores de serviços locais (eletricistas, encanadores, etc.). Inclui perfis, agendamento, pagamento in-app e sistema de avaliação.' },
];

export const MOCK_GENERATED_PROMPTS: GeneratedPrompt[] = [
    { id: 'p-1', prdId: 'prd-1', title: 'Sistema de Gestão de Documentos', type: 'Aplicativo', createdAt: '31/05/2025', prompt: 'Crie uma aplicação full-stack usando React e Node.js para um Sistema de Gestão de Documentos. A UI deve ser limpa e profissional, com um dashboard principal mostrando os documentos recentes e estatísticas. Implemente upload de arquivos com drag-and-drop, visualização de PDFs e imagens no navegador. O sistema de autenticação deve ter rotas protegidas e diferenciar entre admin, editor e viewer. A busca deve ser rápida e indexar o conteúdo dos documentos.' },
    { id: 'p-2', prdId: 'prd-2', title: 'Página de Vendas - Treinamento Online', type: 'Landing Page', createdAt: '30/05/2025', prompt: 'Desenvolva uma landing page de alta conversão para uma plataforma de treinamento online usando Next.js. A página deve ter uma Hero Section com um título impactante e um CTA claro para inscrição. Inclua seções para "Cursos Populares", "Depoimentos de Alunos" com fotos e "Planos e Preços". O design deve ser moderno e responsivo, com foco em confiança e profissionalismo. Use animações sutis ao rolar a página.' },
    { id: 'p-3', prdId: 'prd-2', title: 'Plataforma de Treinamento - Admin', type: 'Aplicativo', createdAt: '30/05/2025', prompt: 'Construa o painel de administração para a plataforma de treinamento online. Instrutores devem conseguir criar, editar e publicar cursos. A interface deve permitir a criação de módulos e lições, upload de vídeos, e criação de quizzes com diferentes tipos de perguntas. Inclua um dashboard com estatísticas de matrículas e receita. Use um design funcional e data-driven.' },
];


export const MOCK_SUPER_PROMPTS: SuperPrompt[] = [
    {
        id: 'sp-1',
        title: 'Gerador de Resumo de Artigo',
        goal: 'Resumir um artigo científico em 3 pontos principais para um público leigo.',
        fullPrompt: '**🎯 OBJETIVO:**\nResumir um artigo científico em 3 pontos principais para um público leigo.\n\n**👤 PERSONA:**\nAssuma o papel de um jornalista de ciência.\n\n**📝 TAREFA:**\nLeia o artigo fornecido e extraia a ideia principal, a metodologia chave e a conclusão mais importante. Explique cada ponto de forma simples, sem jargões técnicos.\n\n**📄 FORMATO DE SAÍDA:**\nUma lista com 3 itens, onde cada item é um parágrafo curto.',
        analysis: {
            score: 95,
            justification: 'Prompt excelente, muito claro e bem estruturado.',
            suggestions: ['Considere adicionar um exemplo para maior clareza.']
        },
        createdAt: '31/05/2025',
    },
    {
        id: 'sp-2',
        title: 'Criador de Roteiro para Vídeo',
        goal: 'Criar um roteiro de 2 minutos para um vídeo no YouTube sobre IA.',
        fullPrompt: '**🎯 OBJETIVO:**\nCriar um roteiro de 2 minutos para um vídeo no YouTube sobre IA.\n\n**👤 PERSONA:**\nAssuma o papel de um youtuber de tecnologia popular.\n\n**CONTEXTO:**\nO vídeo é para um canal com foco em tecnologia e inovação, para um público jovem e curioso.\n\n**📝 TAREFA:**\nEstruture o roteiro em: Introdução (gancho de 15s), Desenvolvimento (3 tópicos de 30s cada) e Conclusão (chamada para ação de 15s). O tom deve ser energético e divertido.',
        analysis: {
            score: 92,
            justification: 'O prompt define bem a estrutura e o tom, o que é ótimo para a tarefa.',
            suggestions: ['Especificar o formato exato da saída, como "Divida o roteiro usando cabeçalhos de Markdown para cada seção".']
        },
        createdAt: '30/05/2025',
    },
     {
        id: 'sp-3',
        title: 'Prompt de Geração de Código Python',
        goal: 'Gerar uma função em Python',
        fullPrompt: '**🎯 OBJETIVO:**\nGerar uma função em Python\n\n**📝 TAREFA:**\nEscreva uma função que recebe uma lista de números e retorna a média.',
        analysis: {
            score: 45,
            justification: 'O prompt é muito vago. Falta contexto, exemplos e especificações claras sobre o formato da saída.',
            suggestions: ['Defina uma persona (ex: programador Python sênior), adicione exemplos de entrada e saída, e especifique como a função deve lidar com listas vazias.']
        },
        createdAt: '29/05/2025',
    }
];

export const MOCK_IDEAS: Idea[] = [
  // AI/ML Ideas
  { id: 'idea-250', title: 'Validador de Ideias de Negócio', description: 'Uma IA que recebe uma ideia de negócio e fornece uma análise de viabilidade, mercado potencial e sugestões.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'negócios', 'análise'] },
  { id: 'idea-201', title: 'Analisador de Sentimento de Reviews', description: 'Uma ferramenta que analisa reviews de produtos e os classifica como positivos, negativos ou neutros.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'analytics', 'e-commerce'] },
  { id: 'idea-212', title: 'Ferramenta de Extração de Entidades (NER)', description: 'Identifique e extraia entidades como nomes de pessoas, locais e organizações de um texto.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'ner', 'extração de dados'] },
  { id: 'idea-239', title: 'Ferramenta de Análise de Código', description: 'Use ML para analisar código-fonte e identificar potenciais bugs ou "code smells".', category: 'AI/ML', difficulty: 'Difícil', tags: ['desenvolvimento', 'análise estática', 'qualidade'] },
  { id: 'idea-412', title: 'Analisador de Feedback de Usuários', description: 'Analisa e classifica feedbacks de clientes para descobrir padrões e oportunidades.', category: 'AI/ML', difficulty: 'Médio', tags: ['análise', 'ux', 'produto'] },
  { id: 'idea-425', title: 'Analisador de Tendências de Mercado', description: 'Gera relatórios sobre oportunidades em nichos específicos.', category: 'AI/ML', difficulty: 'Médio', tags: ['análise', 'dados', 'pesquisa'] },
  { id: 'idea-232', title: 'Agente de Jogo (Reinforcement Learning)', description: 'Treine um agente para jogar um jogo simples, como o jogo da velha ou Flappy Bird, usando aprendizado por reforço.', category: 'AI/ML', difficulty: 'Difícil', tags: ['aprendizado por reforço', 'games', 'ia'] },
  { id: 'idea-216', title: 'Agrupamento de Clientes (Clusterização)', description: 'Use algoritmos como K-Means para segmentar clientes em grupos com base em seu comportamento de compra.', category: 'AI/ML', difficulty: 'Médio', tags: ['clusterização', 'marketing', 'segmentação'] },
  { id: 'idea-221', title: 'Assistente de Escrita com IA', description: 'Uma ferramenta que autocompleta frases, sugere sinônimos e corrige erros gramaticais enquanto você escreve.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'produtividade', 'escrita'] },
  { id: 'idea-418', title: 'Avaliador de Ideias de Negócios', description: 'Valida rapidamente ideias de apps com base em viabilidade, mercado e diferencial.', category: 'AI/ML', difficulty: 'Médio', tags: ['startup', 'análise', 'estratégia'] },
  { id: 'idea-207', title: 'Chatbot de Atendimento ao Cliente', description: 'Um chatbot que responde a perguntas frequentes (FAQ) de clientes.', category: 'AI/ML', difficulty: 'Médio', tags: ['chatbot', 'nlp', 'suporte'] },
  { id: 'idea-248', title: 'Classificador de Gêneros Musicais', description: 'Analise um arquivo de áudio e classifique a música em gêneros como rock, pop, jazz, etc.', category: 'AI/ML', difficulty: 'Médio', tags: ['áudio', 'música', 'classificação'] },
  { id: 'idea-204', title: 'Classificador de Imagens', description: 'Treine um modelo para classificar imagens em categorias (ex: cães vs. gatos).', category: 'AI/ML', difficulty: 'Fácil', tags: ['visão computacional', 'classificação', 'imagens'] },
  { id: 'idea-228', title: 'Classificação de Tópicos de Notícias', description: 'Um modelo que lê uma notícia e a classifica em categorias como esportes, política ou tecnologia.', category: 'AI/ML', difficulty: 'Fácil', tags: ['nlp', 'classificação', 'notícias'] },
  { id: 'idea-211', title: 'Colorizador de Fotos em Preto e Branco', description: 'Use uma rede neural convolucional para adicionar cor a fotos antigas.', category: 'AI/ML', difficulty: 'Médio', tags: ['visão computacional', 'deep learning', 'imagens'] },
  { id: 'idea-414', title: 'Consultor de UX com IA', description: 'Analisa interfaces e textos para sugerir melhorias de experiência do usuário.', category: 'AI/ML', difficulty: 'Difícil', tags: ['ux', 'design', 'consultoria'] },
  { id: 'idea-420', title: 'Criador de Chatbots Personalizados', description: 'Gera roteiros e personas para chatbots inteligentes de atendimento.', category: 'AI/ML', difficulty: 'Difícil', tags: ['automação', 'suporte', 'ia'] },
  { id: 'idea-408', title: 'Criador de UI por Descrição', description: 'Gera interfaces (HTML/CSS ou componentes React) a partir de descrições textuais.', category: 'AI/ML', difficulty: 'Difícil', tags: ['design', 'front-end', 'ui'] },
  { id: 'idea-245', title: 'Detecção de "Clickbait" em Títulos', description: 'Crie um classificador para determinar se o título de uma notícia é sensacionalista (clickbait).', category: 'AI/ML', difficulty: 'Fácil', tags: ['nlp', 'classificação', 'notícias'] },
  { id: 'idea-246', title: 'Sistema de Alerta de Desmatamento', description: 'Analise imagens de satélite para detectar áreas de desmatamento recente.', category: 'AI/ML', difficulty: 'Difícil', tags: ['visão computacional', 'meio ambiente', 'geoespacial'] },
  { id: 'idea-229', title: 'Detecção de Discurso de Ódio', description: 'Crie um sistema para identificar e moderar comentários contendo discurso de ódio em redes sociais.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'moderação', 'segurança'] },
  { id: 'idea-225', title: 'Detecção de Emoções em Texto', description: 'Classifique um texto com base na emoção que ele transmite (alegria, tristeza, raiva, etc.).', category: 'AI/ML', difficulty: 'Fácil', tags: ['nlp', 'análise de sentimento', 'emoções'] },
  { id: 'idea-236', title: 'Detecção de Idioma', description: 'Crie um modelo que recebe um texto e identifica em qual idioma ele está escrito.', category: 'AI/ML', difficulty: 'Fácil', tags: ['nlp', 'classificação', 'texto'] },
  { id: 'idea-215', title: 'Detecção de Objetos em Imagens', description: 'Desenvolva um modelo (como YOLO) para identificar e localizar múltiplos objetos em uma imagem.', category: 'AI/ML', difficulty: 'Difícil', tags: ['visão computacional', 'detecção de objetos', 'yolo'] },
  { id: 'idea-206', title: 'Detecção de Spam em E-mails', description: 'Construa um classificador de texto para identificar se um e-mail é spam ou não.', category: 'AI/ML', difficulty: 'Fácil', tags: ['nlp', 'classificação', 'segurança'] },
  { id: 'idea-230', title: 'Estimativa de Preços de Imóveis', description: 'Com base em características como área, número de quartos e localização, preveja o preço de um imóvel.', category: 'AI/ML', difficulty: 'Médio', tags: ['previsão', 'regressão', 'imobiliário'] },
  { id: 'idea-243', title: 'Gerador de Avatares a partir de Fotos', description: 'Transforme uma foto de rosto em um avatar estilizado (cartoon, pixel art, etc.) usando GANs.', category: 'AI/ML', difficulty: 'Difícil', tags: ['gans', 'visão computacional', 'geração de imagens'] },
  { id: 'idea-240', title: 'Gerador de "Deep Fakes" Ético', description: 'Um projeto para estudar a tecnologia de deep fakes, trocando rostos em vídeos de forma controlada.', category: 'AI/ML', difficulty: 'Difícil', tags: ['deep learning', 'gans', 'visão computacional'] },
  { id: 'idea-234', title: 'Gerador de "Style Transfer" para Imagens', description: 'Aplique o estilo artístico de uma imagem (ex: Van Gogh) a outra imagem.', category: 'AI/ML', difficulty: 'Médio', tags: ['visão computacional', 'deep learning', 'arte'] },
  { id: 'idea-247', title: 'Gerador de "Thumbnails" para Vídeos', description: 'Analise o conteúdo de um vídeo e sugira frames ou crie thumbnails atrativas automaticamente.', category: 'AI/ML', difficulty: 'Médio', tags: ['visão computacional', 'marketing', 'vídeo'] },
  { id: 'idea-217', title: 'Gerador de Legendas para Imagens', description: 'Crie um modelo que gera uma descrição textual para uma imagem fornecida.', category: 'AI/ML', difficulty: 'Difícil', tags: ['visão computacional', 'nlp', 'deep learning'] },
  { id: 'idea-210', title: 'Gerador de Música com IA', description: 'Treine uma rede neural (como uma RNN) para gerar pequenas melodias musicais.', category: 'AI/ML', difficulty: 'Difícil', tags: ['música', 'geração', 'deep learning'] },
  { id: 'idea-224', title: 'Gerador de Perguntas a partir de Texto', description: 'Forneça um parágrafo e a IA gera perguntas de múltipla escolha ou dissertativas sobre o conteúdo.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'educação', 'ferramenta'] },
  { id: 'idea-203', title: 'Gerador de Resumos de Texto', description: 'Cole um texto longo ou um link de artigo e a IA gera um resumo conciso.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'sumarização', 'produtividade'] },
  { id: 'idea-237', title: 'Matching de Currículos com Vagas', description: 'Desenvolva um sistema que ranqueia os melhores currículos para uma determinada descrição de vaga.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'rh', 'recrutamento'] },
  { id: 'idea-249', title: 'Otimizador de Preços Dinâmicos', description: 'Ajuste os preços de produtos em um e-commerce em tempo real com base na demanda, estoque e preços dos concorrentes.', category: 'AI/ML', difficulty: 'Difícil', tags: ['e-commerce', 'otimização', 'preços'] },
  { id: 'idea-409', title: 'Planejador de MVP com IA', description: 'Ajuda fundadores a planejar MVPs, escopo mínimo e roadmap inicial.', category: 'AI/ML', difficulty: 'Médio', tags: ['startup', 'gestão', 'produto'] },
  { id: 'idea-244', title: 'Previsão de Atrasos de Voos', description: 'Utilize dados históricos de voos e condições climáticas para prever a probabilidade de um voo atrasar.', category: 'AI/ML', difficulty: 'Médio', tags: ['previsão', 'classificação', 'viagem'] },
  { id: 'idea-213', title: 'Previsão de Churn de Clientes', description: 'Use dados de clientes para prever quais deles têm maior probabilidade de cancelar um serviço.', category: 'AI/ML', difficulty: 'Médio', tags: ['previsão', 'negócios', 'retenção'] },
  { id: 'idea-227', title: 'Previsão de Demanda de Estoque', description: 'Use dados de vendas históricos para prever a demanda futura de produtos e otimizar o estoque.', category: 'AI/ML', difficulty: 'Médio', tags: ['previsão', 'varejo', 'logística'] },
  { id: 'idea-205', title: 'Previsão de Preços de Ações', description: 'Use séries temporais e dados históricos para prever a tendência de preços de uma ação.', category: 'AI/ML', difficulty: 'Difícil', tags: ['fintech', 'previsão', 'séries temporais'] },
  { id: 'idea-235', title: 'Previsão de Qualidade de Vinho', description: 'Use dados físico-químicos para prever a qualidade de um vinho em uma escala de 0 a 10.', category: 'AI/ML', difficulty: 'Fácil', tags: ['classificação', 'dados', 'alimentos'] },
  { id: 'idea-220', title: 'Previsão do Tempo', description: 'Use dados meteorológicos históricos para treinar um modelo que prevê a temperatura para o dia seguinte.', category: 'AI/ML', difficulty: 'Médio', tags: ['previsão', 'séries temporais', 'clima'] },
  { id: 'idea-238', title: 'Reconhecimento de Atividade Humana em Vídeo', description: 'Analise um vídeo e classifique a atividade que uma pessoa está realizando (correndo, andando, etc.).', category: 'AI/ML', difficulty: 'Difícil', tags: ['visão computacional', 'vídeo', 'classificação'] },
  { id: 'idea-208', title: 'Reconhecimento de Dígitos Manuscritos', description: 'Crie um modelo que reconhece números escritos à mão, usando o dataset MNIST.', category: 'AI/ML', difficulty: 'Fácil', tags: ['visão computacional', 'reconhecimento de padrões', 'mnist'] },
  { id: 'idea-231', title: 'Reconhecimento Facial', description: 'Desenvolva um sistema que pode identificar uma pessoa em uma foto a partir de um banco de dados de rostos conhecidos.', category: 'AI/ML', difficulty: 'Difícil', tags: ['visão computacional', 'reconhecimento facial', 'segurança'] },
  { id: 'idea-226', title: 'Recomendação de Produtos em E-commerce', description: 'Crie um sistema que recomenda produtos para usuários com base em seu histórico de navegação e compras.', category: 'AI/ML', difficulty: 'Médio', tags: ['recomendação', 'e-commerce', 'vendas'] },
  { id: 'idea-219', title: 'Removedor de Fundo de Imagens', description: 'Desenvolva um sistema que identifica e remove o fundo de uma imagem, deixando apenas o objeto principal.', category: 'AI/ML', difficulty: 'Médio', tags: ['visão computacional', 'segmentação', 'ferramenta'] },
  { id: 'idea-242', title: 'Removedor de Ruído de Áudio', description: 'Use redes neurais para limpar gravações de áudio, removendo ruído de fundo.', category: 'AI/ML', difficulty: 'Médio', tags: ['áudio', 'deep learning', 'processamento de sinal'] },
  { id: 'idea-209', title: 'Sistema de Detecção de Fraudes em Cartão de Crédito', description: 'Analise transações para identificar padrões anômalos que possam indicar fraude.', category: 'AI/ML', difficulty: 'Difícil', tags: ['segurança', 'fintech', 'detecção de anomalias'] },
  { id: 'idea-222', title: 'Sistema de Diagnóstico Médico por Imagem', description: 'Treine um modelo para detectar sinais de uma doença (ex: pneumonia) em imagens de raios-X.', category: 'AI/ML', difficulty: 'Difícil', tags: ['saúde', 'visão computacional', 'medicina'] },
  { id: 'idea-404', title: 'Sistema de Geração de Dashboards com IA', description: 'Crie visualizações e painéis de dados dinâmicos com base em descrições em linguagem natural.', category: 'AI/ML', difficulty: 'Difícil', tags: ['data', 'analytics', 'visualização'] },
  { id: 'idea-233', title: 'Sistema de OCR (Reconhecimento Óptico de Caracteres)', description: 'Extraia texto de imagens, como documentos escaneados ou placas de rua.', category: 'AI/ML', difficulty: 'Médio', tags: ['visão computacional', 'ocr', 'extração de dados'] },
  { id: 'idea-202', title: 'Sistema de Recomendação de Filmes', description: 'Com base nas avaliações de um usuário, recomende novos filmes usando filtragem colaborativa.', category: 'AI/ML', difficulty: 'Médio', tags: ['recomendação', 'filmes', 'dados'] },
  { id: 'idea-241', title: 'Sistema de "Smart Reply"', description: 'Como no Gmail, gere sugestões de respostas curtas para e-mails ou mensagens recebidas.', category: 'AI/ML', difficulty: 'Médio', tags: ['nlp', 'geração', 'produtividade'] },
  { id: 'idea-214', title: 'Sistema de Tradução Automática', description: 'Construa um modelo sequence-to-sequence para traduzir frases de um idioma para outro.', category: 'AI/ML', difficulty: 'Difícil', tags: ['nlp', 'tradução', 'deep learning'] },
  { id: 'idea-218', 'title': 'Verificador de Plágio', 'description': 'Compare dois documentos de texto e calcule uma pontuação de similaridade para detectar plágio.', 'category': 'AI/ML', 'difficulty': 'Médio', 'tags': ['nlp', 'similaridade', 'educação'] },
  { id: 'idea-322', title: 'Otimizador de Orçamento de Campanha (CBO)', description: 'Conecte sua conta de anúncios e a IA analisará o desempenho em tempo real para realocar o orçamento entre os conjuntos de anúncios e maximizar o ROAS.', category: 'AI/ML', difficulty: 'Difícil', tags: ['marketing', 'ai', 'facebook ads', 'otimização'] },
  { id: 'idea-223', 'title': 'Otimizador de Rotas de Entrega', 'description': 'Resolva o problema do caixeiro-viajante para encontrar a rota mais curta e eficiente para múltiplas entregas.', 'category': 'AI/ML', 'difficulty': 'Difícil', 'tags': ['otimização', 'logística', 'algoritmos'] },
  // ... (remaining ideas are unchanged) ...
];
// ... (remaining constants are unchanged) ...
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    title: 'PRD: Sistema de Gestão de Documentação para Revendas de Carros',
    type: 'PRD',
    status: 'Finalizado',
    content: MOCK_PRDS[0].content,
    createdAt: '31/05/2025',
    parentTitle: 'PRD para Negócios - Consumidores gerais',
    industry: 'Negócios',
    complexity: 'Média',
    linkedPrompts: [
        { id: 'p-1', title: 'Prompt para App Principal' }
    ],
  },
  // ... (rest of documents unchanged) ...
  {
    id: 'doc-2',
    title: 'PRD: Plataforma de Treinamento de Funcionários: Capacitação Contínua',
    type: 'PRD',
    status: 'Finalizado',
    content: MOCK_PRDS[1].content,
    createdAt: '30/05/2025',
    parentTitle: 'PRD para Educação - Outro',
    industry: 'Educação',
    complexity: 'Média',
    linkedPrompts: [
        { id: 'p-2', title: 'Prompt para Landing Page' },
        { id: 'p-3', title: 'Prompt para Painel Admin' }
    ],
  },
    {
    id: 'p-1',
    title: 'Prompt App: Sistema de Gestão de Documentos',
    type: 'Prompt Aplicativo',
    status: 'Finalizado',
    content: MOCK_GENERATED_PROMPTS[0].prompt,
    createdAt: '31/05/2025',
    parentTitle: 'PRD: Sistema de Gestão de Documentação...',
  },
  {
    id: 'doc-3',
    title: 'PRD: Criar um app parecido com linktree',
    type: 'PRD',
    status: 'Finalizado',
    content: MOCK_PRDS[2].content,
    createdAt: '05/06/2025',
    parentTitle: 'PRD para Negócios - Profissionais',
    industry: 'Tecnologia / SaaS',
    complexity: 'Baixa',
    linkedPrompts: [
        { id: 'p-4', title: 'Prompt para ...' }
    ],
  },
    {
    id: 'p-2',
    title: 'Prompt LP: Página de Vendas - Treinamento Online',
    type: 'Prompt Landing Page',
    status: 'Finalizado',
    content: MOCK_GENERATED_PROMPTS[1].prompt,
    createdAt: '30/05/2025',
    parentTitle: 'PRD: Plataforma de Treinamento de Funcionários: Capacitação Contínua',
  },
];

export const MOCK_AGENTS: Agent[] = [
  // ... (unchanged) ...
  {
    id: 'agent-1',
    name: 'Revisor de Código Python',
    description: 'Analisa seu código Python em busca de erros, estilo e boas práticas.',
    persona: 'Você é um engenheiro de software sênior e especialista em Python. Revise o código fornecido de forma crítica, mas construtiva. Aponte erros de lógica, sugira melhorias de performance, e verifique a conformidade com a PEP 8. Forneça exemplos de código corrigido.',
    icon: 'CodeIcon',
  },
  {
    id: 'agent-2',
    name: 'Copywriter de Marketing',
    description: 'Cria textos persuasivos para anúncios, e-mails e redes sociais.',
    persona: 'Você é um copywriter de marketing digital com 10 anos de experiência em startups de tecnologia. Seu tom é energético, direto e focado em conversão. Crie textos que gerem curiosidade e incentivem o leitor a tomar uma ação. Use gatilhos mentais como escassez e prova social.',
    icon: 'PencilIcon',
  },
  {
    id: 'agent-3',
    name: 'Gerador de Ideias de Negócio',
    description: 'Ajuda a ter novas ideias de negócio com base em uma indústria ou problema.',
    persona: 'Você é um consultor de inovação e estrategista de negócios. Seu objetivo é gerar ideias de negócios criativas e viáveis. Para cada pedido, forneça 3 ideias distintas, cada uma com um nome, um público-alvo, o problema que resolve e um modelo de monetização.',
    icon: 'LightbulbIcon',
  },
];

export const MOCK_SHOWCASE_PROJECTS: ShowcaseProject[] = [
  // ... (unchanged) ...
  {
    id: 'proj-1',
    title: 'FinTrack - Gerenciador Financeiro',
    description: 'Um dashboard moderno para visualizar despesas e receitas, construído com React e Recharts.',
    imageUrl: 'https://placehold.co/600x400/7c3aed/ffffff?text=FinTrack',
    techStack: ['React', 'TailwindCSS', 'Recharts'],
    liveUrl: '#',
    repoUrl: '#',
    author: 'Ana Clara',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 'proj-2',
    title: 'GourmetGo - App de Receitas',
    description: 'Encontre e salve suas receitas favoritas. Feito com Vue.js e uma API pública de receitas.',
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=GourmetGo',
    techStack: ['Vue.js', 'API Rest', 'CSS Grid'],
    liveUrl: '#',
    repoUrl: '#',
    author: 'Bruno Martins',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
  },
  {
    id: 'proj-3',
    title: 'SvelteKit Blog',
    description: 'Um blog minimalista e super rápido, gerado a partir de arquivos Markdown, usando SvelteKit.',
    imageUrl: 'https://placehold.co/600x400/f97316/ffffff?text=Blog',
    techStack: ['SvelteKit', 'Markdown', 'TypeScript'],
    liveUrl: '#',
    repoUrl: '#',
    author: 'Carla Dias',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
  },
  {
    id: 'proj-4',
    title: 'TaskFlow - Kanban Board',
    description: 'Organize suas tarefas com este quadro Kanban com funcionalidade de arrastar e soltar.',
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=TaskFlow',
    techStack: ['React', 'dnd-kit', 'Firebase'],
    liveUrl: '#',
    repoUrl: '#',
    author: 'Daniel Souza',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
  },
    {
    id: 'proj-5',
    title: 'WeatherNow - App de Clima',
    description: 'Consulte a previsão do tempo de qualquer cidade com uma interface limpa e animações sutis.',
    imageUrl: 'https://placehold.co/600x400/0ea5e9/ffffff?text=WeatherNow',
    techStack: ['Vue.js', 'OpenWeatherMap API'],
    liveUrl: '#',
    repoUrl: '#',
    author: 'Eduarda Lima',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
  },
  {
    id: 'proj-6',
    title: 'Angular CRM Dashboard',
    description: 'Painel de administração para um CRM, com gráficos e tabelas de dados interativas.',
    imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=CRM',
    techStack: ['Angular', 'TypeScript', 'SCSS'],
    repoUrl: '#',
    author: 'Fábio Rocha',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
  },
   {
    id: 'proj-7',
    title: 'E-commerce de Tênis',
    description: 'Uma loja virtual completa para venda de tênis, com carrinho de compras e checkout.',
    imageUrl: 'https://placehold.co/600x400/14b8a6/ffffff?text=ShoeStore',
    techStack: ['Next.js', 'Stripe', 'TailwindCSS'],
    liveUrl: '#',
    author: 'Gabriela Alves',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026710d',
  },
   {
    id: 'proj-8',
    title: 'Portfolio Pessoal',
    description: 'Um portfólio criativo para desenvolvedores, com animações e um layout único.',
    imageUrl: 'https://placehold.co/600x400/6366f1/ffffff?text=Portfolio',
    techStack: ['HTML/CSS/JS', 'GSAP'],
    liveUrl: '#',
    repoUrl: '#',
    author: 'Heitor Barros',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026711d',
  },
];
