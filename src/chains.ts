import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { ChatOpenAI } from "@langchain/openai";

export function createSupportChain(model: ChatOpenAI) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      [
        "You are a helpful support assistant.",
        "Explain answers clearly, ask one follow-up question when needed,",
        "and keep the tone friendly and practical.",
      ].join(" "),
    ],
    ["human", "{question}"],
  ]);

  return prompt.pipe(model).pipe(new StringOutputParser());
}

export function createStudyPlanChain(model: ChatOpenAI) {
  const prompt = ChatPromptTemplate.fromTemplate(`
Create a short study plan for this topic:

Topic: {topic}
Current level: {level}
Available time: {time}

Return:
1. A simple explanation of the topic
2. A 3-step plan
3. One practice task
`);

  return prompt.pipe(model).pipe(new StringOutputParser());
}
