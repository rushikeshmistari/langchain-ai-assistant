import { assertRequiredConfig } from "./config.js";
import { createChatModel } from "./model.js";
import { createSupportChain, createStudyPlanChain } from "./chains.js";
import { ConversationMemory, createMemoryChain } from "./memory.js";
import { runAgent } from "./agent.js";
import { printLangSmithStatus } from "./langsmith.js";

async function main() {
  assertRequiredConfig();

  const model = createChatModel();

  console.log("TypeScript LangChain AI Assistant");
  console.log("=================================\n");

  const supportChain = createSupportChain(model);
  const supportAnswer = await supportChain.invoke({
    question: "What problem does LangChain solve for developers?",
  });
  console.log("1. Basic chain output");
  console.log(supportAnswer);

  const studyPlanChain = createStudyPlanChain(model);
  const studyPlan = await studyPlanChain.invoke({
    topic: "LangChain agents",
    level: "beginner",
    time: "30 minutes",
  });
  console.log("\n2. Prompt flow chain output");
  console.log(studyPlan);

  const memory = new ConversationMemory();
  const memoryChain = createMemoryChain(model, memory);
  const firstMemoryAnswer = await memoryChain.invoke("Teach me what memory means in LangChain.");
  const secondMemoryAnswer = await memoryChain.invoke("Now explain it using the same example.");
  console.log("\n3. Memory output");
  console.log(firstMemoryAnswer);
  console.log(secondMemoryAnswer);

  const agentAnswer = await runAgent(
    model,
    "Use your tools: what is 18 * 7, and how does LangSmith help debugging?",
  );
  console.log("\n4. Agent output");
  console.log(agentAnswer);

  printLangSmithStatus();
}

main().catch((error) => {
  console.error("Application failed:");
  console.error(error);
  process.exit(1);
});
