# TypeScript LangChain AI Assistant

This project demonstrates the fundamentals of building an AI app with LangChain in TypeScript. It includes model setup, prompt chains, memory handling, an agent-style workflow with tools, and LangSmith tracing notes for debugging.

## What LangChain Solves

LangChain helps developers build LLM applications by connecting common pieces of an AI workflow:

- Prompts that format user input
- Models that generate responses
- Chains that run predictable steps
- Memory that keeps conversation context
- Tools that let the model take actions
- Tracing that helps debug what happened during execution

Instead of manually wiring every prompt, model call, tool call, and response parser, LangChain gives reusable building blocks for those steps.

## Project Structure

```text
src/
  agent.ts       Agent workflow with tool calling
  chains.ts      Basic prompt chains
  config.ts      Environment variable setup
  index.ts       Demo runner
  langsmith.ts   LangSmith tracing status helper
  memory.ts      Conversation memory example
  model.ts       OpenAI chat model setup
  tools.ts       Calculator and knowledge base tools
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your API keys to `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=your_langsmith_api_key_here
LANGSMITH_PROJECT=typescript-langchain-ai-assistant
```

4. Run the project:

```bash
npm run dev
```

## How the App Works

### 1. Model Connection

`src/model.ts` creates a `ChatOpenAI` model. The model name and API key are read from environment variables.

### 2. Prompt Chains

`src/chains.ts` shows two chains:

- `createSupportChain` answers support-style questions.
- `createStudyPlanChain` creates a structured study plan.

Both chains follow the same flow:

```text
prompt -> model -> string output parser
```

### 3. Memory Handling

`src/memory.ts` stores previous human and AI messages in a simple `ConversationMemory` class. The memory chain sends previous messages back into the prompt so the assistant can answer with conversation context.

### 4. Agent Workflow

`src/agent.ts` binds tools to the chat model. The model can decide whether it needs a tool call.

Available tools:

- `calculator`: solves arithmetic
- `course_knowledge_base`: searches small LangChain concept notes

The flow is:

```text
user input -> model decides tool calls -> tools run -> model writes final answer
```

### 5. LangSmith Debugging

LangSmith helps trace and debug the app by recording:

- Prompt inputs
- Model outputs
- Tool calls
- Errors
- Latency
- Full execution traces

When `LANGSMITH_TRACING=true` and `LANGSMITH_API_KEY` is set, LangChain can send traces to the LangSmith project named in `LANGSMITH_PROJECT`.

## Assignment Summary

This repository demonstrates:

- TypeScript project setup
- LangChain model connection
- Prompt flow with chains
- Conversation memory
- Tool-using agent workflow
- LangSmith tracing and debugging explanation

You can upload this folder to GitHub and submit the repository URL for the assignment.
