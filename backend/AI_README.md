# AI Assistant Architecture

The assistant uses the OpenAI Responses API with native function calling. It never receives database access or organization identifiers from the model.

```text
React
  -> Express POST /api/ai/chat
  -> authentication + rate limiting
  -> AI controller
  -> AI service + controlled instructions
  -> OpenAI Responses API (allowlisted tools)
  -> secure tool executor + Zod validation
  -> existing domain services
  -> repositories
  -> MongoDB (organizationId from JWT context)
```

Supported examples:

- `Show shipment SHP-1001`
- `Show shipments going to DXB`
- `How many shipments are in transit?`
- `Create a shipment from BLR to DXB`

Reads resolve airport codes/names through the airport service before querying ObjectId references. Tool results are reduced to safe human-readable fields. Every request is authenticated, rate limited, bounded to five tool rounds, and logged without secrets.

Creating a shipment is a two-step workflow. The assistant first stages the validated details and returns a confirmation requirement. The user must explicitly confirm, after which the same protected AI endpoint performs role and organization checks again before calling the existing shipment service. Normal users cannot create shipments through this tool.

The endpoint accepts a bounded `history` array and `conversationId`; server instructions are always supplied separately and cannot be replaced by client messages.
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
OPENAI_MODEL=gpt-4o-mini
AI_RATE_LIMIT_WINDOW_MS=60000
AI_RATE_LIMIT_MAX_REQUESTS=10
```

For local development when you don't have an OpenAI key, you can enable mock mode:

```
AI_MOCK=true
```
This exercises the allowlisted tool executor without contacting OpenAI.

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
    "message": "I found 3 shipments to DXB.",
    "conversationId": "...",
    "usage": { "inputTokens": 0, "outputTokens": 0 }
  }
}
```

## Tools implemented

- get_shipment_by_number
- search_shipments
- get_recent_shipments
- get_shipment_statistics (summary, status, origin, and destination groups)
- get_airport_by_code
- get_airport_by_name
- create_shipment (explicit confirmation required)

These are read-only and always scoped using `req.user.organizationId`.

## Security

- The AI feature is protected by the existing `authenticate` middleware.
- OpenAI API key must be set in the server environment; it is never exposed to the frontend.
- All tool calls include `userId` and `organizationId` from `req.user` and cannot be overridden by the model.
- Rate limiting applied to `/api/ai/chat` with configurable window and max.
- Zod validation on tool arguments prevents invalid queries.

## Confirmation workflow

For a request such as `Create a shipment from BLR to DXB`, the assistant calls
`create_shipment` with `confirmation: false`. The backend validates and stages
the details, then returns `confirmationRequired`. The frontend presents those
details and sends a follow-up such as `Yes, confirm creation.`. The backend
requires an authenticated `ADMIN` role and explicit confirmation before calling
the existing shipment creation service.

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

## Conversation and safety boundaries

Conversation history is accepted only as bounded user/assistant messages. It is
never used as system instructions. The backend controls organization scope,
tool names, schemas, authorization, and a five-round tool-call limit. Tool
results are projected to human-readable fields and never expose database IDs,
credentials, or other internal metadata.

## Files added (summary)

- `backend/src/ai/*` (controller, service, routes, tools, schemas, logger, prompts)
- `frontend/src/features/ai/*` (api, hook, components, page, styles)

## How to extend

- Add more tools in `backend/src/ai/ai.tools.js` and corresponding service/repository helpers.
- Improve model prompting and use the official tool-calling API for structured function calls when available.

*** End of README ***
