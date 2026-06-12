import { AIMessage } from "@langchain/core/messages";

import { State } from "./../states.js";

export const commsSpecialist = (state: typeof State.State) => {
  console.log(`Running commsSpecialist`);
  return {
    messages: [new AIMessage("Olá do schedulingSpecialist")],
  };
};
