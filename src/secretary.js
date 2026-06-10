import { GoogleGenAI, mcpToTool } from "@google/genai";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client";
import dotenv from "dotenv";
import readline from "readline";
import { server } from "typescript";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

//Cria interface terminal (shell)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const models = {
  pro: "gemini-2.5-pro",
  flash: "gemini-2.5-flash",
  tts: "Gemini 2.5 Flash TTS",
  lite: "gemini-3.1-flash-lite",
};

const baseUseAICalendar = async () => {
  try {
    console.log("Script iniciado:", new Date().toISOString());

    const serverParams = new StdioClientTransport({
      command: "node",
      args: ["index.js"],
    });

    const client = new Client({
      name: "secretaryAI-client",
      version: "1.0.0",
    });

    await client.connect(serverParams);

    const model = models.lite;

    const contents = [];

    while (true) {
      const query = await new Promise((resolve) => {
        rl.question("Voce: ", resolve);
      });

      contents.push({
        role: "user",
        parts: [{ text: query }],
      });

      let response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          tools: [mcpToTool(client)],
        },
      });

      console.log(
        `SecretaryAI: ${response.candidates[0].content.parts[0].text}`,
      );
    }
  } catch (error) {
    if (error.status === 429) {
      console.error("Limite de requisições excedido.");
    } else {
      console.error(error);
    }
  }
};

baseUseAICalendar();
