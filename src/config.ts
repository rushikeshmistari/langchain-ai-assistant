import "dotenv/config";

export const config = {
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  langSmithTracing: process.env.LANGSMITH_TRACING ?? "false",
  langSmithProject: process.env.LANGSMITH_PROJECT ?? "typescript-langchain-ai-assistant",
};

export function assertRequiredConfig() {
  if (!config.openAIApiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY. Copy .env.example to .env and add your API key.",
    );
  }
}
