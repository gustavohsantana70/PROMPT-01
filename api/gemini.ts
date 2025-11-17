import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt, type } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt é obrigatório." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API KEY ausente." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result =
      type === "image"
        ? await model.generateContent([
            { text: prompt },
            { media: { format: "png" } },
          ])
        : await model.generateContent(prompt);

    return res.status(200).json({ result: result.response.text() });

  } catch (err) {
    console.error("Erro na IA:", err);
    return res.status(500).json({ error: "Erro interno na IA." });
  }
}
