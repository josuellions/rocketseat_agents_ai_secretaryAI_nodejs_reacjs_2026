import z from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AIMessage, SystemMessage } from "@langchain/core/messages";

import { State } from "./../states.js";
import { ai } from "../libs/google_genai.js";
import { agents } from "./index.js";

const payBill = new DynamicStructuredTool({
  name: "pay_bill",
  description: "Pagar a conta do usuário",
  schema: z.object({
    price: z.number().describe("Valor da conta"),
  }),
  func: async ({ price }) => {
    console.log("Pagando a conta...");
    return "Conta paga com sucesso!";
  },
});

const financialSpecialistAgent = createReactAgent({
  llm: ai,
  tools: [payBill],
  prompt: new SystemMessage(
    "Você é um analista financeiro de uma consultoria financeira," +
      "analise a conversa e tome a melhor ação para atender o usuário.",
  ),
});

export const financialSpecialist = async (state: typeof State.State) => {
  console.log(`Running ${agents.financial_specialist}`);

  const result = await financialSpecialistAgent.invoke(state);

  const responseFinancialSpecialist =
    await result.messages[result.messages.length - 1]!.content;

  return {
    messages: [new AIMessage({ content: responseFinancialSpecialist })],
  };
};
