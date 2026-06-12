import z from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AIMessage, SystemMessage } from "@langchain/core/messages";

import { State } from "./../states.js";
import { ai } from "../libs/google_genai.js";
import { agents } from "./index.js";

const createBill = new DynamicStructuredTool({
  name: "create_bill",
  description: "Criar novo boleto da conta do usuário",
  schema: z.object({
    price: z.number(),
  }),
  func: async () => {
    console.log("Gerando boleto da conta...");
    return "Boleto gerado com sucesso!";
  },
});

const payBill = new DynamicStructuredTool({
  name: "pay_bill",
  description: "Pagar a conta do usuário",
  schema: z.object({}),
  func: async () => {
    console.log("Pagando a conta...");
    return "Conta paga com sucesso!";
  },
});

const getBill = new DynamicStructuredTool({
  name: "get_bill",
  description: "Buscar o valor da conta do usuário",
  schema: z.object({}),
  func: async () => {
    console.log("Buscando o valor da conta...");
    return "Sua conta tem o valor de R$ 500,00 (Quinhentos reais).";
  },
});

const agent = createReactAgent({
  llm: ai,
  tools: [createBill, getBill, payBill],
  prompt: new SystemMessage(
    "Você é um analista financeiro de uma consultoria financeira," +
      "você não precisa de nenhuma informação adicional do usuário," +
      "analise a conversa e tome a melhor ação para atender o usuário.",
  ),
});

export const financialSpecialist = async (state: typeof State.State) => {
  console.log(`Running ${agents.financial_specialist}`);

  const result = await agent.invoke(state);

  const response = await result.messages[result.messages.length - 1]!.content;

  return {
    messages: [
      new AIMessage({
        content: `${agents.financial_specialist}: ${response}`,
      }),
    ],
  };
};
