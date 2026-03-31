import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTacticalAdvice(query: string, history: { role: string; parts: { text: string }[] }[]) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: "You are a tactical gear expert and manufacturing engineer for Redneck Ammunition LLC. Your goal is to help customers choose the right firearm components and provide technical advice on installation and performance. Keep your tone professional, authoritative, and focused on precision engineering. Mention that our products are American-made and tested in real-world conditions." }]
      },
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      {
        role: "user",
        parts: [{ text: query }]
      }
    ],
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    }
  });

  const response = await model;
  return response.text;
}
