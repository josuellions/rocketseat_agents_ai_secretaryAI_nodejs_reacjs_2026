import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const GOOGLE_GEN_AI_API_KEY = process!.env!.GOOGLE_GEN_AI_API_KEY || "";

const models = {
  pro: "gemini-2.5-pro",
  flash: "gemini-2.5-flash",
  tts: "Gemini 2.5 Flash TTS",
  lite: "gemini-3.1-flash-lite",
};

export const ai = new ChatGoogleGenerativeAI({
  model: models.flash,
  apiKey: GOOGLE_GEN_AI_API_KEY,
});
