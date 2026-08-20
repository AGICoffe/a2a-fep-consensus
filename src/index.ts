import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const CLOUDFLARE_WORKER_URL = "https://a2a-consensus.my-agent-api.workers.dev/v1/a2a-fep-consensus"; // あなたのWorker URL

const server = new Server(
  { name: "a2a-fep-consensus", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "a2a_consensus_step",
    description: "A2A 13th-Harmonic Consensus Engine (Requires 402 Payment on Rally 4)",
    inputSchema: {
      type: "object",
      properties: {
        point1: { type: "string" },
        point2: { type: "string" },
        token: { type: "string" },
        serialNo: { type: "number" },
        payment: { type: "string", description: "X-PAYMENT Header value if required" }
      },
      required: ["point1", "point2"]
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "a2a_consensus_step") {
    const args = request.params.arguments as any;

    // Cloudflare Workerへ転送
    const response = await fetch(CLOUDFLARE_WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(args.token && { "X-A2A-TOKEN": args.token }),
        ...(args.payment && { "X-PAYMENT": args.payment })
      },
      body: JSON.stringify(args)
    });

    const data = await response.json();

    return {
      content: [{ type: "text", text: JSON.stringify(data) }]
    };
  }
  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main();
