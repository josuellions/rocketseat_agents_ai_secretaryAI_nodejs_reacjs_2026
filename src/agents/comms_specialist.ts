import z from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AIMessage, SystemMessage } from "@langchain/core/messages";

import { ai } from "../libs/google_genai.js";
import { State } from "./../states.js";
import { agents } from "./index.js";

const sendEmail = new DynamicStructuredTool({
  name: "send_email",
  description: "Enviar uma email para o destinatario.",
  schema: z.object({
    emailContent: z.string(),
  }),
  func: async ({ emailContent }) => {
    console.log("Enviando email...");
    console.log(emailContent);
    return "Email enviado com sucesso.";
  },
});

const agent = createReactAgent({
  llm: ai,
  tools: [sendEmail],
  prompt: new SystemMessage(
    "Você é um especialista em emails de uma consultoria financeira," +
      "responsável por organizar os emails," +
      "você não precisa de nenhuma informação adicional do usuário," +
      "analise a conversa e tome a melhor ação para atender o usuário.",
  ),
});

export const commsSpecialist = async (state: typeof State.State) => {
  console.log(`Running ${agents.comms_specialist}`);

  const result = await agent.invoke(state);

  const response = await result.messages[result.messages.length - 1]!.content;

  return {
    messages: [
      new AIMessage({
        content: `${agents.comms_specialist}: ${response}`,
      }),
    ],
  };
};
