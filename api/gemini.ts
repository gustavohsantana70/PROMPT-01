import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);

    res.status(200).json({
      output: result.response.text()
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar resposta" });
  }
}
