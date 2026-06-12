import { AIMessage } from "@langchain/core/messages";
import { State } from "./../states.js";

export const schedulingSpecialist = (state: typeof State.State) => {
  console.log(`Running schedulingSpecialist`);
  return {
    messages: [new AIMessage("Olá do schedulingSpecialist")],
  };
};
