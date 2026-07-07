import { ChatOpenAI } from "@langchain/openai";
import { config } from "./config.js";

export function createChatModel() {
  return new ChatOpenAI({
    apiKey: config.openAIApiKey,
    model: config.modelName,
    temperature: 0.2,
  });
}
