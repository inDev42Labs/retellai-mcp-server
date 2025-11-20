import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type Retell from "retell-sdk";

import { GetVoiceInputSchema } from "../schemas/index";
import { transformVoiceOutput } from "../transformers/index";
import { createToolHandler } from "./utils";

export const registerVoiceTools = (server: McpServer, retellClient: Retell) => {
  server.tool(
    "list_voices",
    "Lists all available Retell voices",
    {},
    createToolHandler(async () => {
      const voices = await retellClient.voice.list();
      return voices.map(transformVoiceOutput);
    }),
  );

  server.tool(
    "get_voice",
    "Gets details of a specific voice",
    GetVoiceInputSchema.shape,
    createToolHandler(async (data) => {
      const voice = await retellClient.voice.retrieve(data.voiceId);
      return transformVoiceOutput(voice);
    }),
  );
};
