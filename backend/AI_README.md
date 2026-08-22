# Air Cargo AI Assistant

This document describes the AI Assistant feature added to the Air Cargo Management System.

## Architecture

React
 ↓
Express (/api/ai/chat)
 ↓
Authentication middleware
 ↓
AI Controller
 ↓
AI Service (OpenAI Responses API)
 ↓
Tool Executor + Tools
 ↓
Domain Services (shipment.service)
 ↓
Repositories
 ↓
MongoDB

## Environment variables

Add the following to `backend/.env` (do not commit secrets):

```
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o
AI_RATE_LIMIT_WINDOW_MS=60000
AI_RATE_LIMIT_MAX_REQUESTS=10
```

For local development when you don't have an OpenAI key, you can enable mock mode:

```
AI_MOCK=true
```
This returns a deterministic mocked response and helps exercise the frontend without contacting OpenAI.

## API Endpoint

POST /api/ai/chat
Protected: requires Bearer token (same authentication as other APIs)

Request body:

```
{ "message": "Show me shipments going to DXB" }
```

Response (example):

```
{
  "success": true,
  "data": {
    "message": "You have 3 shipments to DXB.",
    "toolCalls": [ { "name": "search_shipments" } ]
  }
}
```

## Tools implemented

- get_shipment_by_number
- search_shipments
- get_shipment_statistics
- get_recent_shipments
- get_shipments_by_date_range
- get_shipment_summary

These are read-only and always scoped using `req.user.organizationId`.

## Security

- The AI feature is protected by the existing `authenticate` middleware.
- OpenAI API key must be set in the server environment; it is never exposed to the frontend.
- All tool calls include `userId` and `organizationId` from `req.user` and cannot be overridden by the model.
- Rate limiting applied to `/api/ai/chat` with configurable window and max.
- Zod validation on tool arguments prevents invalid queries.

## Testing

Manual test steps:

1. Start the backend and frontend.
2. Login as an existing user to obtain a token.
3. Open the app and navigate to `AI Assistant` in the sidebar.
4. Try queries like:
   - "Show my shipments in transit"
   - "How many shipments do I have?"
   - "What is the status of SHP-2026-000001?"

Server-side quick checks (example):

```bash
# from backend folder
node -e "require('./src/app'); console.log('app loaded')"
```

## Limitations

- Current model orchestration expects the model to return JSON tool requests; this is a lightweight implementation for V1.
- No persistent conversation history yet.
- Tool-calling loop is limited to a small number of iterations to prevent infinite loops.

## Files added (summary)

- `backend/src/ai/*` (controller, service, routes, tools, schemas, logger, prompts)
- `frontend/src/features/ai/*` (api, hook, components, page, styles)

## How to extend

- Add more tools in `backend/src/ai/ai.tools.js` and corresponding service/repository helpers.
- Improve model prompting and use the official tool-calling API for structured function calls when available.

*** End of README ***
