import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// ================================================
// CONFIGURAÇÃO DA API
// ================================================
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ ERRO: VITE_GEMINI_API_KEY não encontrada no .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Configurações de segurança
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

// ================================================
// FUNÇÃO BASE
// ================================================
async function gerar(prompt: string) {
  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      safetySettings,
    });

    return result.response.text();
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return "Erro ao processar solicitação da IA.";
  }
}

// ================================================
// 1. GERAR PRD PROFISSIONAL
// ================================================
export async function generatePRD(data: {
  title: string;
  description: string;
  industry?: string;
  targetAudience?: string;
  complexity?: string;
}) {
  const prompt = `
Gere um PRD PROFISSIONAL, extremamente detalhado e organizado com:

Título: ${data.title}
Descrição: ${data.description}
Setor: ${data.industry}
Público-alvo: ${data.targetAudience}
Complexidade: ${data.complexity}

Estrutura obrigatória:

1. Visão Geral
2. Problema
3. Oportunidade
4. Solução Proposta
5. Personas
6. Jornada do Usuário
7. Funcionalidades (com prioridade)
8. Requisitos Funcionais
9. Requisitos Não Funcionais
10. Regras de Negócio
11. KPIs & Métricas
12. Fluxo de Telas
13. Estrutura do Banco (se necessário)
14. Riscos
15. Roadmap (90 dias)
16. Considerações Finais
`;

  return await gerar(prompt);
}

// ================================================
// 2. GERAR FLUXOGRAMA
// ================================================
export async function generateFlowchart(idea: string) {
  const prompt = `
Gere um FLUXOGRAMA textual para a seguinte ideia:
${idea}

Modelo:
INÍCIO →
Ação 1 →
Decisão? (Sim / Não) →
Ação 2 →
FIM

Mostre o fluxo da forma mais clara possível.
`;

  return await gerar(prompt);
}

// ================================================
// 3. GERAR ROADMAP
// ================================================
export async function generateRoadmap(title: string) {
  const prompt = `
Crie um ROADMAP COMPLETO de 90 dias para o projeto:
${title}

Divida em:
- Semana 1–2
- Semana 3–4
- Mês 2
- Mês 3

Inclua:
✔ Planejamento
✔ Design
✔ Desenvolvimento
✔ Testes
✔ Implantação
✔ Marketing
✔ Métricas

Seja extremamente detalhado.
`;

  return await gerar(prompt);
}

// ================================================
// 4. GERAR IDEIAS / FEATURES
// ================================================
export async function generateFeatures(topic: string) {
  const prompt = `
Gere 20 funcionalidades inovadoras e úteis para a ideia:
${topic}

Classifique em:
- Essenciais
- Importantes
- Avançadas
`;

  return await gerar(prompt);
}

// ================================================
// 5. GERAR COPY
// ================================================
export async function generateCopy(topic: string) {
  const prompt = `
Gere uma copy persuasiva e profissional sobre:
${topic}

Formato:
- Headline
- Subheadline
- Benefícios
- CTA
`;

  return await gerar(prompt);
}
