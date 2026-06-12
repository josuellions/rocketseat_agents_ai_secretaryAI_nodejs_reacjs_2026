import z from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AIMessage, SystemMessage } from "@langchain/core/messages";

import { ai } from "../libs/google_genai.js";
import { State } from "./../states.js";
import { agents } from "./index.js";

const createSchedule = new DynamicStructuredTool({
  name: "create_schedule",
  description: "Criar novo agendamento na agenda.",
  schema: z.object({}),
  func: async () => {
    console.log("Criando novo agendando...");
    return "Seu agendamento foi realizado com sucesso.";
  },
});
const resSchedule = new DynamicStructuredTool({
  name: "res_schedule",
  description: "Remarcar um agendamento da agenda para nova data e horario.",
  schema: z.object({}),
  func: async () => {
    console.log("Remarcando agendando...");
    return "Seu agendamento foi remarcado com sucesso.";
  },
});
const cancelSchedule = new DynamicStructuredTool({
  name: "cancel_schedule",
  description: "Cancelar um agendamento da agenda.",
  schema: z.object({}),
  func: async () => {
    console.log("Cancelando o agendando...");
    return "Seu agendamento foi cancelado com sucesso.";
  },
});

const agent = createReactAgent({
  llm: ai,
  tools: [createSchedule, resSchedule, cancelSchedule],
  prompt: new SystemMessage(
    "Você é uma secretária de uma consultoria financeira," +
      "responsável por organizar agenda," +
      "você não precisa de nenhuma informação adicional do usuário," +
      "analise a conversa e tome a melhor ação para atender o usuário.",
  ),
});

export const schedulingSpecialist = async (state: typeof State.State) => {
  console.log(`Running ${agents.scheduling_specialist}`);

  const result = await agent.invoke(state);

  const response = await result.messages[result.messages.length - 1]!.content;

  return {
    messages: [
      new AIMessage({
        content: `${agents.scheduling_specialist}: ${response}`,
      }),
    ],
  };
};
