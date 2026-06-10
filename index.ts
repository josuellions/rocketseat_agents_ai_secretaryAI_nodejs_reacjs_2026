import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { allDefinitions as calendarDefinitions } from "./src/tools/calendar.js";
import { allDefinitions as emailDefinitions } from "./src/tools/email.js";

const allDefinitions = calendarDefinitions.concat(emailDefinitions);

const server = new McpServer({
  name: "secretary-ai",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

for (let definition of allDefinitions) {
  server.tool(
    definition.declaration.name,
    definition.declaration.description,
    definition.declaration.parameters ?? {},
    definition.function,
  );
}

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("MCP Server running...");
