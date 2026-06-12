import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import z from "zod";

import { State } from "./states.js";
import { agents } from "./agents/index.js";
import { ai } from "./libs/google_genai.js";

const routingTool = {
  name: "routingTool",
  description: "Selecione o próximo estado",
  schema: z.object({
    next: z.enum([
      agents.financial_specialist,
      agents.scheduling_specialist,
      agents.comms_specialist,
      "END",
    ]),
  }),
};

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Você é o supervisor de uma consultoria de investimentos. Tome a melhor ação para atender a necessidade do cliente" +
      "com base na conversa a seguir:",
  ],
  new MessagesPlaceholder("messages"),
  [
    "human",
    `Escolha um desse próximos estados: ${agents.financial_specialist}, ${agents.scheduling_specialist}, ${agents.comms_specialist} e END (estado de finalização e encerramento se não tiver mais nada para fazer).`,
  ],
]);

export const supervisorAction = async (state: typeof State.State) => {
  console.log(`Running SupervisorAction selecionando action`);
  console.log(state.messages);
  const aiWithTool = ai.bindTools([routingTool], {
    tool_choice: "routingTool",
  });

  const aiResponse = await prompt.pipe(aiWithTool).invoke({
    messages: state.messages,
  });
  if (aiResponse.tool_calls) {
    console.log(
      `Supervisor chamou a func: ${aiResponse.tool_calls[0]?.args.next}`,
    );
    return {
      nextNode: aiResponse.tool_calls[0]?.args.next,
    };
  } else {
    console.log(`Supervisor chamou a func: Terminou o chat.`);
    return {
      nextNode: "END",
    };
  }
};
