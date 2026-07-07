import { tool } from "@langchain/core/tools";
import { z } from "zod";

const calculatorSchema = z.object({
  expression: z.string().describe("A basic arithmetic expression, for example 12 * (4 + 2)."),
});

const knowledgeBaseSchema = z.object({
  question: z.string().describe("Question about LangChain, agents, memory, or LangSmith."),
});

export const calculatorTool = tool(
  async ({ expression }) => {
    if (!/^[\d\s+\-*/().]+$/.test(expression)) {
      return "Only numbers and basic arithmetic operators are allowed.";
    }

    const result = Function(`"use strict"; return (${expression});`)();
    return String(result);
  },
  {
    name: "calculator",
    description: "Evaluate a basic arithmetic expression.",
    schema: calculatorSchema,
  },
);

export const knowledgeBaseTool = tool(
  async ({ question }) => {
    const notes = [
      "LangChain helps developers connect prompts, models, memory, retrievers, and tools.",
      "Chains define predictable steps for an LLM workflow.",
      "Agents let a model decide which tool to call and when to stop.",
      "LangSmith records traces, inputs, outputs, tool calls, latency, and errors.",
    ];

    const normalizedQuestion = question.toLowerCase();
    const match = notes.find((note) =>
      note.toLowerCase().split(" ").some((word) => normalizedQuestion.includes(word)),
    );

    return match ?? "No exact note found. Try asking about chains, agents, memory, or LangSmith.";
  },
  {
    name: "course_knowledge_base",
    description: "Search a tiny course knowledge base about LangChain concepts.",
    schema: knowledgeBaseSchema,
  },
);

export const assistantTools = [calculatorTool, knowledgeBaseTool];

export async function runAssistantTool(name: string, args: unknown) {
  if (name === calculatorTool.name) {
    return calculatorTool.invoke(calculatorSchema.parse(args));
  }

  if (name === knowledgeBaseTool.name) {
    return knowledgeBaseTool.invoke(knowledgeBaseSchema.parse(args));
  }

  throw new Error(`Tool ${name} was not found.`);
}
