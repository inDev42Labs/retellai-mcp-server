import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type Retell from "retell-sdk";
import { registerAgentTools } from "./agent";
// import { registerCallTools } from "./call";
// import { registerPhoneNumberTools } from "./phone-number";
import { registerRetellLLMTools } from "./retell-llm";
// import { registerKnowledgeBaseTools } from "./knowledge-base";
import { registerVoiceTools } from "./voice";

export const registerAllTools = (server: McpServer, retellClient: Retell) => {
  // registerCallTools(server, retellClient);
  registerAgentTools(server, retellClient);
  // registerPhoneNumberTools(server, retellClient);
  // registerKnowledgeBaseTools(server, retellClient);
  registerVoiceTools(server, retellClient);
  registerRetellLLMTools(server, retellClient);
};
