import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type Retell from "retell-sdk";

import {
  GetConversationFlowInputSchema,
  UpdateConversationFlowInputSchema,
} from "../schemas/index";
import {
  transformConversationFlowOutput,
  transformUpdateConversationFlowInput,
} from "../transformers/index";
import { createToolHandler } from "./utils";

export const registerConversationFlowTools = (
  server: McpServer,
  retellClient: Retell,
) => {
  server.tool(
    "get_conversation_flow",
    "Retrieves details of a specific conversation flow by ID",
    GetConversationFlowInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const conversationFlow = await retellClient.conversationFlow.retrieve(
          data.conversationFlowId,
          data.version ? { version: data.version.toString() } : undefined,
        );
        if (!conversationFlow) {
          throw new Error(
            `Conversation flow with ID ${data.conversationFlowId} not found`,
          );
        }
        return transformConversationFlowOutput(conversationFlow);
      } catch (error: any) {
        console.error(`Error getting conversation flow: ${error.message}`);
        throw error;
      }
    }),
  );

  server.tool(
    "update_conversation_flow",
    "Updates an existing conversation flow",
    UpdateConversationFlowInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const conversationFlowId = data.conversationFlowId;

        // Transform update data
        const updateConversationFlowDto =
          transformUpdateConversationFlowInput(data);

        // Update conversation flow
        const updatedConversationFlow =
          await retellClient.conversationFlow.update(
            conversationFlowId,
            updateConversationFlowDto,
          );

        return transformConversationFlowOutput(updatedConversationFlow);
      } catch (error: any) {
        console.error(`Error updating conversation flow: ${error.message}`);
        throw error;
      }
    }),
  );
};
