import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import { registerCallTools } from "./call";
import { registerAgentTools } from "./agent";
import { registerPhoneNumberTools } from "./phone-number";
// import { registerKnowledgeBaseTools } from "./knowledge-base";
import { registerVoiceTools } from "./voice";
import { registerRetellLLMTools } from "./retell-llm";

export const registerAllTools = (server: McpServer, retellClient: Retell) => {
  registerCallTools(server, retellClient);
  registerAgentTools(server, retellClient);
  registerPhoneNumberTools(server, retellClient);
  //   registerKnowledgeBaseTools(server, retellClient);
  registerVoiceTools(server, retellClient);
  registerRetellLLMTools(server, retellClient);
};
