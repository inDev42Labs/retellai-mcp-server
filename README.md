# RetellAI MCP Server

This is a Model Context Protocol (MCP) server implementation for RetellAI, allowing AI assistants to interact with RetellAI's voice services.

## Features

The RetellAI MCP server provides tools for:

- **Call Management**: Create and manage phone calls and web calls
- **Agent Management**: Create and manage voice agents with different LLM configurations
- **Phone Number Management**: Provision and configure phone numbers
- **Voice Management**: Access and use different voice options
- **Conversation Flow Management**: Manage and control conversation flows

## Claude Desktop Setup

1. Open `Claude Desktop` and press `CMD + ,` to go to `Settings`.
2. Click on the `Developer` tab.
3. Click on the `Edit Config` button.
4. This will open the `claude_desktop_config.json` file in your file explorer.
5. Get your Retell API key from the Retell dashboard (<https://dashboard.retellai.com/apiKey>).
6. Add the following to your `claude_desktop_config.json` file. See [here](https://modelcontextprotocol.io/quickstart/user) for more details.
7. Restart the Claude Desktop after editing the config file.

```json
{
  "mcpServers": {
    "retellai-mcp-server": {
      "command": "bun",
      "args": ["/path/to/retellai-mcp-server-repo/build/index.js"],
      "env": {
        "RETELL_API_KEY": "<your_retellai_token>"
      }
    }
  }
}
```
