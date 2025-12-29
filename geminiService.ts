import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Mode } from "../types";

export const generateGeminiResponse = async (text: string, mode: Mode): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please configure the API_KEY environment variable in Vercel.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstructions: Record<Mode, string> = {
    [Mode.FACT_CHECK]: "You are iGemini. Your task is to fact-check the provided text. Be objective, concise, and provide evidence-based conclusions. If unsure, state the degree of uncertainty.",
    [Mode.ROAST]: "You are iGemini. Your task is to humorously roast the provided text. Be witty, sharp, and satirical, but maintain a level of safe playfulness.",
    [Mode.ANALYSIS]: "You are iGemini. Provide a deep analysis of the provided text, including tone, sentiment, core message, and hidden subtext. Be insightful and professional."
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text }] }],
      config: {
        systemInstruction: systemInstructions[mode],
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error("Invalid API Key. Please check your Gemini API key configuration.");
    }
    throw new Error("Failed to communicate with Gemini. Please check your connection or try again later.");
  }
};