import { AIMessage, HumanMessage, SystemMessage, ToolMessage, type BaseMessage } from "@langchain/core/messages";
import type { ChatOpenAI } from "@langchain/openai";
import { assistantTools, runAssistantTool } from "./tools.js";

export async function runAgent(model: ChatOpenAI, input: string) {
  const modelWithTools = model.bindTools(assistantTools);
  const messages: BaseMessage[] = [
    new SystemMessage(
      [
        "You are an AI assistant that can answer questions directly or call tools.",
        "Use the calculator for arithmetic.",
        "Use the course knowledge base for LangChain concept questions.",
      ].join(" "),
    ),
    new HumanMessage(input),
  ];

  const firstResponse = await modelWithTools.invoke(messages);
  messages.push(firstResponse);

  if (!firstResponse.tool_calls?.length) {
    return firstResponse.content;
  }

  for (const toolCall of firstResponse.tool_calls) {
    try {
      const toolResult = await runAssistantTool(toolCall.name, toolCall.args);
      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id ?? toolCall.name,
          content: String(toolResult),
        }),
      );
    } catch (error) {
      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id ?? toolCall.name,
          content: error instanceof Error ? error.message : "Tool execution failed.",
        }),
      );
    }
  }

  const finalResponse: AIMessage = await modelWithTools.invoke(messages);
  return finalResponse.content;
}
