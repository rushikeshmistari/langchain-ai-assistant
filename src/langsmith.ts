import { config } from "./config.js";

export function printLangSmithStatus() {
  const enabled = config.langSmithTracing.toLowerCase() === "true";

  console.log("\nLangSmith tracing");
  console.log("-----------------");
  console.log(`Enabled: ${enabled}`);
  console.log(`Project: ${config.langSmithProject}`);
  console.log(
    enabled
      ? "Open LangSmith to inspect prompts, model calls, tool calls, latency, and errors."
      : "Set LANGSMITH_TRACING=true and LANGSMITH_API_KEY in .env to enable tracing.",
  );
}
