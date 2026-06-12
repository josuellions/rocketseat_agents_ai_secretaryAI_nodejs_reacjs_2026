import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

// export const State = Annotation.Root({
//   input: Annotation<HumanMessage>,
//   executedNodes: Annotation<number>({
//     reducer: (currentExecuted, newExecuted = 1) =>
//       currentExecuted + newExecuted,
//     default: () => 0,
//   }),
//   nextNode: Annotation<string>,
//   output: Annotation<BaseMessage[]>({
//     reducer: (currentOutput, newOutput) => currentOutput.concat(newOutput),
//     default: () => [],
//   }),
// });
export const State = Annotation.Root({
  nextNode: Annotation<string>,
  messages: Annotation<BaseMessage[]>({
    reducer: (currentOutput, newOutput) => currentOutput.concat(newOutput),
    default: () => [],
  }),
});
