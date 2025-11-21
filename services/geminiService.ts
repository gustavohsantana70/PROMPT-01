
import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { SchemaTable, PromptType, Competitor, PromptAnalysis } from '../types';

const schemaDefinition = {
    type: Type.OBJECT,
    properties: {
        tables: {
            type: Type.ARRAY,
            description: "List of tables in the database.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "Name of the table, should be plural and in snake_case (e.g., 'users', 'products')."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A brief description of what this table stores."
                    },
                    columns: {
                        type: Type.ARRAY,
                        description: "List of columns in the table.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {
                                    type: Type.STRING,
                                    description: "Name of the column, in snake_case (e.g., 'user_id', 'first_name')."
                                },
                                type: {
                                    type: Type.STRING,
                                    description: "The SQL data type of the column (e.g., 'INTEGER', 'VARCHAR(255)', 'TEXT', 'BOOLEAN', 'TIMESTAMP')."
                                },
                                description: {
                                    type: Type.STRING,
                                    description: "A brief description of the column's purpose."
                                }
                            },
                            required: ["name", "type", "description"]
                        }
                    }
                },
                required: ["name", "description", "columns"]
            }
        }
    },
    required: ["tables"]
};

// Function to get the AI client, assuming the API key is provided by the environment.
const getAiClient = () => {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const cleanJsonResult = (text: string): string => {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateDatabaseSchema = async (description: string): Promise<SchemaTable[]> => {
    try {
        const ai = getAiClient();

        const prompt = `
            Com base na descrição da aplicação a seguir, gere um schema de banco de dados SQL detalhado.
            O schema deve ser bem estruturado, seguir as melhores práticas e incluir tabelas, colunas com tipos de dados apropriados e descrições breves (em Português) para cada tabela e coluna.
            Certifique-se de que chaves primárias (como 'id') e chaves estrangeiras (como 'user_id') sejam incluídas onde for relevante.

            Descrição da Aplicação: "${description}"

            Por favor, retorne o schema no formato JSON especificado.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schemaDefinition,
            },
        });

        const jsonText = cleanJsonResult(response.text || "{}");
        const parsedJson = JSON.parse(jsonText);
        
        if (parsedJson && Array.isArray(parsedJson.tables)) {
             return parsedJson.tables as SchemaTable[];
        }
        
        console.error("Generated JSON does not match expected format:", parsedJson);
        throw new Error("Falha ao gerar um schema válido. O formato da resposta estava incorreto.");

    } catch (error) {
        console.error("Error generating database schema:", error);
        throw new Error("Ocorreu um erro ao comunicar com o serviço de IA. Por favor, verifique sua conexão e tente novamente.");
    }
};

export const generatePrompt = async (description: string): Promise<string> => {
    try {
        const ai = getAiClient();

        const systemInstruction = `Você é um especialista em Engenharia de Prompt de classe mundial. Sua missão é transformar a ideia simples de um usuário em um prompt abrangente e de nível profissional, adequado para LLMs avançados como o Google Gemini.

Quando você recebe o objetivo de um usuário, você deve expandi-lo para criar um prompt detalhado e altamente eficaz. O prompt gerado DEVE ser estruturado com as seguintes seções em Markdown (e o conteúdo deve estar em Português):

1.  **Persona:** Defina um papel claro e relevante para a IA adotar (ex: "Assuma o papel de um copywriter sênior especializado em marketing de tecnologia B2B.").
2.  **Contexto:** Elabore sobre a descrição inicial do usuário. Adicione detalhes de fundo essenciais, público-alvo e qualquer informação relevante. Faça suposições razoáveis se necessário.
3.  **Tarefa:** Forneça uma descrição passo a passo clara da tarefa que a IA precisa realizar. Seja explícito.
4.  **Formato de Saída:** Especifique o formato de saída com extrema clareza. Não diga apenas "uma lista"; em vez disso, defina a estrutura. Ex: "Retorne a resposta como um objeto JSON..." ou "Formate a saída em Markdown...".
5.  **Exemplos:** Isso é crucial. Forneça pelo menos um exemplo concreto 'few-shot', mostrando uma entrada de amostra e a saída desejada correspondente.
6.  **Restrições:** Liste quaisquer restrições ou coisas que a IA deve evitar (ex: "Não use linguagem excessivamente formal.", "Limite a resposta a 200 palavras.").

Sua saída final deve ser APENAS o prompt gerado (em português), pronto para ser copiado e colado pelo usuário.`;

        const userPrompt = `Aqui está o meu objetivo: "${description}"

Por favor, gere um prompt otimizado para mim.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 1024 } // Habilita raciocínio para melhor estruturação do prompt
            },
        });

        return response.text || "";

    } catch (error) {
        console.error("Error generating prompt:", error);
        throw new Error("Ocorreu um erro ao comunicar com o serviço de IA. Por favor, verifique sua conexão e tente novamente.");
    }
};

interface PRDGenerationParams {
    title: string;
    description: string;
    industry: string;
    targetAudience: string;
    complexity: string;
}

export const generatePRD = async ({ title, description, industry, targetAudience, complexity }: PRDGenerationParams): Promise<string> => {
    try {
        const ai = getAiClient();

        const systemInstruction = `Você é um Gerente de Produto Sênior de classe mundial, especialista em criar Documentos de Requisitos de Produto (PRDs) claros, abrangentes e acionáveis. Sua tarefa é pegar a ideia de um produto e transformá-la em um PRD profissional e completo, seguindo as melhores práticas da indústria.
Sempre utilize formatação Markdown para estruturar o documento. Use cabeçalhos (#, ##), listas com marcadores (*), e negrito (**) para destacar informações importantes e garantir a legibilidade. O documento final deve ser bem organizado e pronto para ser compartilhado com uma equipe de desenvolvimento e stakeholders. O idioma do documento deve ser Português.`;

        const userPrompt = `
        Gere um PRD completo e detalhado para o seguinte produto:

        **Título do PRD:**
        ${title}

        **Descrição Geral do Produto:**
        ${description}

        ---

        ### **Contexto Adicional para Geração:**

        *   **Indústria do Produto:** ${industry}. Leve isso em consideração para a análise de mercado e tom de voz.
        *   **Público-Alvo Principal:** ${targetAudience}. Direcione as personas de usuário e os requisitos de UX para este grupo.
        *   **Complexidade Estimada do Projeto:** ${complexity}. A profundidade dos requisitos técnicos e o escopo das funcionalidades devem refletir essa complexidade.

        ---

        ### **Estrutura Recomendada para o PRD:**

        Por favor, gere um documento que inclua as seguintes seções, elaborando cada uma com base nas informações fornecidas:

        1.  **Resumo Executivo:** Uma visão geral de alto nível do produto e o problema que ele resolve.
        2.  **Problema e Oportunidade:** Detalhe o problema do cliente e por que agora é o momento certo para construir esta solução.
        3.  **Objetivos e Metas:** Quais são os objetivos de negócio e do produto? Como o sucesso será medido (KPIs)?
        4.  **Personas de Usuário:** Crie 1-2 personas detalhadas que representem o público-alvo.
        5.  **Requisitos Funcionais (User Stories):** Liste as principais funcionalidades no formato de user stories (Ex: "Como um [usuário], eu quero [fazer algo] para que [possa alcançar um objetivo].").
        6.  **Requisitos Não-Funcionais:** Considere aspectos como Desempenho, Segurança, Usabilidade e Escalabilidade.
        7.  **Escopo (O que não será feito):** Defina claramente os limites do projeto para esta versão.
        8.  **Estratégia de Lançamento (Go-to-Market):** Sugira uma breve estratégia de como o produto será lançado.

        Agora, por favor, gere o documento.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 4096 } // Alto budget de pensamento para garantir profundidade no PRD
            },
        });

        return response.text || "";

    } catch (error) {
        console.error("Error generating PRD:", error);
        throw new Error("Ocorreu um erro ao comunicar com o serviço de IA. Por favor, verifique sua conexão e tente novamente.");
    }
};

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        score: {
            type: Type.NUMBER,
            description: "An effectiveness score from 0 to 100 for the prompt."
        },
        justification: {
            type: Type.STRING,
            description: "A brief explanation for the given score in Portuguese."
        },
        suggestions: {
            type: Type.ARRAY,
            description: "A list of actionable suggestions for improving the prompt in Portuguese.",
            items: { type: Type.STRING }
        }
    },
    required: ["score", "justification", "suggestions"]
};

export const analyzeAndRefinePrompt = async (promptToAnalyze: string): Promise<PromptAnalysis> => {
     try {
        const ai = getAiClient();

        const systemInstruction = `Você é um especialista em Engenharia de Prompt de classe mundial. Sua tarefa é analisar um prompt enviado pelo usuário para um grande modelo de linguagem (LLM) e fornecer feedback estruturado e acionável em PORTUGUÊS.
Avalie o prompt com base nos seguintes critérios:
- **Clareza e Especificidade:** A tarefa está bem definida?
- **Contexto:** Há informações de fundo suficientes para o LLM ter sucesso?
- **Persona:** O papel da IA está claramente definido?
- **Definição de Formato:** O formato de saída desejado está especificado?
- **Definição de Restrições:** Existem regras ou limites claros?

Com base em sua análise, forneça uma pontuação, uma justificativa para a pontuação e uma lista de sugestões de melhoria.`;

        const userPrompt = `Por favor, analise o seguinte prompt e forneça seu feedback no formato JSON solicitado (em Português).

**Prompt para Analisar:**
---
${promptToAnalyze}
---
`;
        
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        const jsonText = cleanJsonResult(response.text || "{}");
        const parsedJson = JSON.parse(jsonText);
        
        if (parsedJson && typeof parsedJson.score === 'number' && typeof parsedJson.justification === 'string' && Array.isArray(parsedJson.suggestions)) {
            return parsedJson as PromptAnalysis;
        }

        console.error("Analysis JSON does not match expected format:", parsedJson);
        throw new Error("Falha ao analisar o prompt. O formato da resposta estava incorreto.");

    } catch (error) {
        console.error("Error analyzing prompt:", error);
        throw new Error("Ocorreu um erro ao comunicar com o serviço de IA. Por favor, verifique sua conexão e tente novamente.");
    }
};

interface AppPromptParams {
    prdContent: string;
    promptType: PromptType;
    technology: string;
    framework?: string;
    specialRequirements: string;
}

export const generateAppPrompt = async ({ prdContent, promptType, technology, framework, specialRequirements }: AppPromptParams): Promise<string> => {
    try {
        const ai = getAiClient();
        const systemInstruction = `Você é um Engenheiro de Prompt de IA de classe mundial, especializado em criar prompts para ferramentas de geração de código e construção de aplicativos (como Lovable, v0.dev, Cursor, etc.). Sua tarefa é converter um Documento de Requisitos de Produto (PRD) detalhado e especificações do usuário em um prompt abrangente, acionável e altamente detalhado. O prompt gerado deve ser tão claro que uma ferramenta de IA possa usá-lo para construir o aplicativo ou landing page especificado com o mínimo de ambiguidade.

**Instruções principais para você:**
- **Idioma:** O prompt final DEVE ser gerado em PORTUGUÊS.
- **Estrutura:** Sempre sugira uma estrutura lógica de arquivos e componentes.
- **Gerenciamento de Estado:** Mencione uma estratégia básica de gerenciamento de estado (ex: usando React Hooks como useState, useContext).
- **Placeholders de API:** Inclua comentários indicando onde as chamadas de API devem ser feitas.
- **Acessibilidade:** Inclua lembretes para atributos ARIA e HTML semântico.
- **Clareza:** O prompt final deve ser um único bloco de texto completo, pronto para o usuário copiar.

Estruture sua resposta como um único prompt completo. Não adicione nenhum texto de conversa antes ou depois do prompt em si.`;
        
        const userPrompt = `
        Com base nas informações fornecidas abaixo, gere um único prompt altamente detalhado para um construtor de aplicativos de IA.

        ---
        **1. Resumo do Documento de Requisitos de Produto (PRD):**
        ${prdContent}
        ---
        **2. Tipo de Saída Desejada:**
        Preciso de um prompt para gerar um(a) **${promptType}**.
        ---
        **3. Stack Tecnológico:**
        - Tecnologia Frontend Principal: **${technology}**
        ${framework ? `- Framework/Biblioteca: **${framework}**` : ''}
        ---
        **4. Requisitos Especiais:**
        ${specialRequirements || "Nenhum requisito especial fornecido. A IA deve inferir os detalhes com base nas melhores práticas para o tipo de aplicação descrito no PRD."}
        ---

        **Instruções de Geração do Prompt:**
        - **Seja Específico:** Traduza requisitos abstratos do PRD em detalhes concretos de UI/UX. Defina componentes, layouts, paletas de cores, tipografia e fluxos de usuário principais.
        - **Detalhamento de Componentes:** Liste os principais componentes necessários (ex: Navbar, HeroSection, ProductCard, LoginForm, DashboardSidebar). Para cada componente, descreva seus elementos, props e estados.
        - **Funcionalidade:** Descreva claramente o comportamento esperado para elementos interativos. Detalhe a lógica do lado do cliente, gerenciamento de estado e onde os dados seriam buscados.
        - **Estilização:** Forneça dicas claras de estilo (ex: "Use TailwindCSS para estilização", "O botão principal deve ter a cor de fundo #4F46E5").
        - **Responsividade:** Garanta que o prompt mencione que a saída final deve ser totalmente responsiva.
        - **Saída Final:** O texto final deve ser o próprio prompt, em PORTUGUÊS, começando com uma instrução clara como "Crie um(a) novo(a) [Aplicação/Landing Page] em [React/Vue/...] que..."
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 2048 } // Habilita raciocínio para planejar a arquitetura do app
            },
        });

        return response.text || "";

    } catch (error) {
        console.error("Error generating app prompt:", error);
        throw new Error("Ocorreu um erro ao comunicar com o serviço de IA. Por favor, verifique sua conexão e tente novamente.");
    }
};

export const chatWithAgent = async (systemInstruction: string, message: string): Promise<string> => {
    try {
        const ai = getAiClient();
        
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: message,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text || "";

    } catch (error) {
        console.error("Error chatting with agent:", error);
        throw new Error("Ocorreu um erro ao comunicar com o agente de IA. Por favor, verifique sua conexão e tente novamente.");
    }
};

const competitorSchema = {
    type: Type.OBJECT,
    properties: {
        competitors: {
            type: Type.ARRAY,
            description: "A list of competitor applications.",
            items: {
                type: Type.OBJECT,
                properties: {
                    appName: { type: Type.STRING, description: "The name of the competitor app." },
                    platform: { type: Type.STRING, description: "The platforms it runs on (e.g., 'Web', 'iOS, Android')." },
                    mainFeatures: { type: Type.STRING, description: "A brief summary of its key features in Portuguese." },
                    popularity: { type: Type.STRING, description: "A measure of its popularity (e.g., '4.8/5 (500k+ reviews)')." },
                    pricingModel: { type: Type.STRING, description: "The pricing model (e.g., 'Freemium', 'Subscription from $9/mo') in Portuguese." },
                    link: { type: Type.STRING, description: "A direct link to their website." },
                },
                required: ["appName", "platform", "mainFeatures", "popularity", "pricingModel", "link"]
            }
        }
    },
    required: ["competitors"]
};

export const generateCompetitorAnalysis = async (prdContent: string): Promise<Competitor[]> => {
    try {
        const ai = getAiClient();
        const systemInstruction = "Você é um analista de pesquisa de mercado sênior, especialista na indústria de tecnologia. Sua tarefa é identificar os principais concorrentes para uma determinada ideia de produto e apresentar os dados em um formato JSON estruturado. O conteúdo deve estar em Português.";

        const userPrompt = `
        Com base no Documento de Requisitos de Produto (PRD) a seguir, encontre de 5 a 7 concorrentes diretos ou indiretos. Para cada concorrente, forneça o nome do aplicativo, a plataforma, as principais funcionalidades (em português), uma medida de popularidade (ex: avaliação, número de reviews), o modelo de precificação (em português) e um link para o site.

        **PRD:**
        ---
        ${prdContent}
        ---

        Retorne os dados no formato JSON especificado.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: competitorSchema,
            },
        });

        const jsonText = cleanJsonResult(response.text || "{}");
        const parsedJson = JSON.parse(jsonText);

        if (parsedJson && Array.isArray(parsedJson.competitors)) {
            return parsedJson.competitors as Competitor[];
        }

        console.error("Competitor analysis JSON does not match expected format:", parsedJson);
        throw new Error("Falha ao analisar concorrentes. O formato da resposta estava incorreto.");

    } catch (error) {
        console.error("Error generating competitor analysis:", error);
        throw new Error("Ocorreu um erro ao pesquisar concorrentes. Por favor, tente novamente.");
    }
};

export const generateUIInterfaces = async (prdContent: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const systemInstruction = "Você é um designer de UI/UX e estrategista de produtos de classe mundial. Sua tarefa é conceituar e descrever a interface do usuário para um aplicativo com base em seu Documento de Requisitos de Produto (PRD). Sua saída deve ser clara, estruturada, em Português e fornecer uma direção de design acionável. Use Markdown para formatação.";

        const userPrompt = `
        Com base no seguinte Documento de Requisitos de Produto (PRD), gere uma descrição detalhada da Interface do Usuário (UI) e da Experiência do Usuário (UX).

        **PRD:**
        ---
        ${prdContent}
        ---

        Por favor, estruture sua resposta em Markdown (em Português) com as seguintes seções:

        1.  **🎨 Filosofia de Design Geral & Guia de Estilo:**
            *   **Aparência e Sensação (Look & Feel):** Descreva a estética geral (ex: "Limpo e profissional", "Moderno e divertido", "Orientado a dados e minimalista").
            *   **Paleta de Cores:** Sugira uma cor primária, uma cor secundária/de destaque e cores neutras (cinzas/brancos). Forneça códigos hexadecimais, se possível.
            *   **Tipografia:** Sugira um par de fontes (uma para títulos, uma para o corpo do texto) que se encaixe na personalidade da marca.

        2.  **📱 Telas / Visualizações Principais:**
            *   Liste as principais telas ou visualizações do aplicativo (ex: "Tela de Login", "Dashboard", "Página de Detalhes do Produto", "Perfil do Usuário").
            *   Para **cada tela**, forneça uma breve descrição de seu propósito e liste os componentes de UI essenciais que ela deve conter (ex: "Dashboard: Deve apresentar uma Navbar, uma área de conteúdo principal com widgets de dados e uma barra lateral para navegação.").

        3.  **🌊 Fluxos de Usuário Principais:**
            *   Descreva a jornada passo a passo para 2-3 ações críticas do usuário.
            *   **Exemplo de Fluxo (Onboarding):**
                1. O usuário chega à tela de Boas-vindas.
                2. Clica em "Cadastrar-se".
                3. Preenche o formulário de registro (Nome, Email, Senha).
                4. Recebe um e-mail de confirmação.
                5. É redirecionado para o Dashboard principal.

        Gere a descrição de UI/UX agora.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction,
                thinkingConfig: { thinkingBudget: 2048 } // Habilita raciocínio para UX design
            },
        });

        return response.text || "";

    } catch (error) {
        console.error("Error generating UI interfaces:", error);
        throw new Error("Ocorreu um erro ao gerar as sugestões de interface. Por favor, tente novamente.");
    }
};

export const generateDbSchemaFromPrd = async (prdContent: string): Promise<SchemaTable[]> => {
    try {
        const ai = getAiClient();

        const prompt = `
            Baseado no seguinte Documento de Requisitos de Produto (PRD), gere um schema de banco de dados SQL detalhado.
            O schema deve ser bem estruturado, seguir as melhores práticas e incluir tabelas, colunas com tipos de dados apropriados e descrições breves (em Português) para cada tabela e coluna.
            Certifique-se de que chaves primárias (como 'id') e chaves estrangeiras (como 'user_id') sejam incluídas onde for relevante.

            PRD: "${prdContent}"

            Por favor, retorne o schema no formato JSON especificado.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schemaDefinition,
            },
        });

        const jsonText = cleanJsonResult(response.text || "{}");
        const parsedJson = JSON.parse(jsonText);
        
        if (parsedJson && Array.isArray(parsedJson.tables)) {
             return parsedJson.tables as SchemaTable[];
        }
        
        console.error("Generated JSON for PRD DB schema does not match expected format:", parsedJson);
        throw new Error("Falha ao gerar um schema de banco de dados válido. O formato da resposta estava incorreto.");

    } catch (error) {
        console.error("Error generating database schema from PRD:", error);
        throw new Error("Ocorreu um erro ao comunicar com o serviço de IA para gerar o schema. Por favor, tente novamente.");
    }
};

export const generateLogoImages = async (prdContent: string): Promise<string[]> => {
    try {
        const ai = getAiClient();
        const generatedImages: string[] = [];
        
        // Generate 3 distinct logo concepts by making separate calls
        // Using gemini-3-pro-image-preview for highest quality logos
        for (let i = 0; i < 3; i++) {
             const userPrompt = `
                Based on the following Product Requirements Document (PRD), generate a unique, high-quality professional logo concept.
                This is for concept variation #${i + 1} of 3.
                **PRD:**
                ---
                ${prdContent}
                ---
                The logo should be a modern, vector-style, minimalist icon suitable for a tech company or app.
                Ensure the background is solid white.
                Focus on clean lines and memorability.
            `;
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: {
                    parts: [{ text: userPrompt }],
                },
                config: {
                    // responseMimeType not supported for image models usually, handling raw output
                    imageConfig: {
                        aspectRatio: "1:1",
                        imageSize: "1K"
                    }
                },
            });
            
            let foundImage = false;
            if (response.candidates && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData && part.inlineData.data) {
                        generatedImages.push(part.inlineData.data);
                        foundImage = true;
                        break; 
                    }
                }
            }
            
            if (!foundImage) {
                 console.warn(`Image data not found in response for concept ${i + 1}.`);
            }
        }
        
        if(generatedImages.length === 0) {
            throw new Error("A IA não conseguiu gerar nenhuma imagem de logotipo.");
        }
        return generatedImages;
    } catch (error) {
        console.error("Error generating logo images:", error);
        throw new Error("Ocorreu um erro ao gerar as imagens de logotipo. Por favor, tente novamente.");
    }
};

export const generatePrdDetails = async (prdContent: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const systemInstruction = `Você é um Gerente de Produto Sênior e Arquiteto de Software. Sua tarefa é analisar um PRD e gerar um resumo estratégico e técnico conciso e acionável em Português. Formate a saída usando Markdown.`;

        const userPrompt = `
        Com base no seguinte Documento de Requisitos de Produto (PRD), gere uma análise detalhada com as seguintes seções:

        **PRD:**
        ---
        ${prdContent}
        ---

        **Estrutura da Análise:**

        1.  **### Stack de Tecnologia Sugerida:**
            *   Liste as tecnologias recomendadas para Frontend, Backend e Banco de Dados, com uma breve justificativa para cada escolha.

        2.  **### Detalhamento das Features Principais:**
            *   Descreva 2-3 das funcionalidades mais importantes do produto em mais detalhes.

        3.  **### Escopo do MVP (Produto Mínimo Viável):**
            *   Defina um conjunto mínimo de funcionalidades que entregam valor principal e permitem o lançamento inicial do produto.

        4.  **### Estratégias de Monetização:**
            *   Sugira 2-3 possíveis modelos de monetização para este produto (ex: Assinatura, Freemium, Compra única).

        5.  **### Análise de Riscos Potenciais:**
            *   Identifique 2-3 riscos técnicos ou de mercado e sugira possíveis mitigações.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction,
                thinkingConfig: { thinkingBudget: 1024 } // Habilita raciocínio para análise estratégica
            },
        });

        return response.text || "";

    } catch (error) {
        console.error("Error generating PRD details:", error);
        throw new Error("Ocorreu um erro ao gerar os detalhes do PRD. Por favor, tente novamente.");
    }
};

export const generateUiFlowchart = async (prdContent: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const systemInstruction = `Você é um designer de UX sênior especializado em modelagem de fluxo de usuário. Sua tarefa é analisar um Documento de Requisitos de Produto (PRD) e gerar um diagrama de fluxo de usuário detalhado usando a sintaxe Mermaid.js (graph TD). O fluxograma deve representar a jornada do usuário através do aplicativo, incluindo telas, ações e decisões. As descrições dos nós devem estar em Português.`;

        const userPrompt = `
        Com base no seguinte Documento de Requisitos de Produto (PRD), crie um fluxograma de usuário usando a sintaxe Mermaid.js.

        **PRD:**
        ---
        ${prdContent}
        ---

        **Instruções para a Geração do Fluxograma:**
        1.  Use a sintaxe \`graph TD\` para um gráfico de cima para baixo.
        2.  Represente telas ou páginas com nós retangulares (ex: \`A[Tela de Login]\`).
        3.  Represente ações do usuário com setas (ex: \`A -->|Clica em 'Cadastrar'| B\`).
        4.  Represente decisões ou condições com nós em formato de losango (ex: \`C{Usuário Logado?}\`).
        5.  Conecte as decisões às rotas apropriadas (ex: \`C -->|Sim| D[Dashboard]\` e \`C -->|Não| A[Tela de Login]\`).
        6.  Mapeie os principais fluxos descritos no PRD, como onboarding, login, e a principal funcionalidade do aplicativo.
        7.  O código Mermaid deve ser completo e pronto para ser renderizado.

        Retorne APENAS o código Mermaid, sem qualquer texto ou explicação adicional.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: userPrompt,
            config: {
                systemInstruction,
                // Thinking config can be risky for strict code generation if it leaks into output, 
                // but Mermaid is robust enough usually. Keeping it off for strict syntax safety or low budget.
                thinkingConfig: { thinkingBudget: 1024 }
            },
        });

        // Clean up the response to ensure it's just the Mermaid code
        const mermaidCode = (response.text || "").replace(/```mermaid/g, '').replace(/```/g, '').trim();
        return mermaidCode;

    } catch (error) {
        console.error("Error generating UI flowchart:", error);
        throw new Error("Ocorreu um erro ao gerar o fluxograma. Por favor, tente novamente.");
    }
};
