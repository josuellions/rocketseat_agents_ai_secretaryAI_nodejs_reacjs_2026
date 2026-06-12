import { HumanMessage } from "@langchain/core/messages";
import { StateGraph, START, END } from "@langchain/langgraph";
import fs from "fs";

import { State } from "./src/states.js";
import { agents } from "./src/agents/index.js";
import { supervisorAction } from "./src/supervisor.js";
import { financialSpecialist } from "./src/agents/financial_specialist.js";
import { schedulingSpecialist } from "./src/agents/scheduling_specialist.js";
import { commsSpecialist } from "./src/agents/comms_specialist.js";

const graph = new StateGraph(State)
  .addNode(agents.supervisor, supervisorAction)
  .addNode(agents.financial_specialist, financialSpecialist)
  .addNode(agents.scheduling_specialist, schedulingSpecialist)
  .addNode(agents.comms_specialist, commsSpecialist)
  .addEdge(START, agents.supervisor)
  .addConditionalEdges(agents.supervisor, (state: typeof State.State) => {
    return state.nextNode;
  })
  .addEdge(agents.financial_specialist, agents.supervisor)
  .addEdge(agents.scheduling_specialist, agents.supervisor)
  .addEdge(agents.comms_specialist, agents.supervisor)
  .addEdge(agents.supervisor, END)
  .compile();

const result = await graph.invoke({
  messages: [new HumanMessage("Quero pagar a minha conta de R$ 500,00")],
});

console.log(result);

const drawableGraph = await graph.getGraphAsync();
const graphImage = await drawableGraph.drawMermaidPng();
const graphArrayBuffer = await graphImage.arrayBuffer();

fs.writeFileSync(
  `./img/${Date.now()}-ghaph.png`,
  new Uint8Array(graphArrayBuffer),
);

// console.log(drawableGraph);
console.log(graphImage);
