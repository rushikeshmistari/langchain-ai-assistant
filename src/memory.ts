import { AIMessage, HumanMessage, type BaseMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { ChatOpenAI } from "@langchain/openai";

export class ConversationMemory {
  private readonly messages: BaseMessage[] = [];

  addUserMessage(content: string) {
    this.messages.push(new HumanMessage(content));
  }

  addAssistantMessage(content: string) {
    this.messages.push(new AIMessage(content));
  }

  getHistory() {
    return [...this.messages];
  }
}

export function createMemoryChain(model: ChatOpenAI, memory: ConversationMemory) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a study helper. Use the conversation history to avoid repeating yourself.",
    ],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  return {
    async invoke(input: string) {
      const answer = await chain.invoke({
        input,
        history: memory.getHistory(),
      });

      memory.addUserMessage(input);
      memory.addAssistantMessage(answer);

      return answer;
    },
  };
}
