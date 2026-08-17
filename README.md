# A2A FEP Consensus Node (MCP Server)

An Agent-to-AI (A2A) negotiation and deadlock-resolution Model Context Protocol (MCP) server built on Free Energy Principle (FEP) spatial dynamics and x402 payment protocols.

## Overview
When multiple autonomous LLM agents interact, they often encounter deadlock, semantic stalemate, or hallucination loops. This MCP server exposes deterministic FEP matrix-pruning tools to reduce computational overhead (64x64x1 spatial reduction) and resolve conflicts between competing AI agents using Samurai-Clamp (`候`) syntax verification.

## MCP Capabilities

### Tools
- **`resolve_fep_consensus`**
  - **Description:** Resolves semantic deadlocks and conflict states between two or more LLM agents by applying FEP matrix pruning and harmonic phase locking.
  - **Input Parameters:**
    - `agent_proposals` (array of strings, required): List of competing agent proposals or reasoning outputs.
    - `fep_threshold` (number, optional): Free energy reduction sensitivity threshold (default: 0.85).
  - **Output:** Pruned consensus state, syntax-locked validation token (`候`), and free energy reduction metrics.

### Prompts
- **`a2a_negotiation_template`**
  - A structured prompt template to orchestrate multi-agent negotiations utilizing the `resolve_fep_consensus` tool.

## Integration & Protocol Support
- **Model Context Protocol (MCP):** Fully compliant with MCP v1.0 specification built on Worker edge runtime (`GET /.well-known/mcp.json`).
- **x402 Micro-payments:** Native support for `402 Payment Required` headers enabling autonomous Agent-to-Agent (A2A) transactions (0.01 USDC on Base / Cloudflare Workers).

## Usage & Endpoint
- **Hosted MCP Endpoint:** `https://a2a-fep-consensus.my-agent-api.workers.dev/.well-known/mcp.json`
- **Method:** `POST /v1/consensus`


https://a2a-fep-consensus.my-agent-api.workers.dev
