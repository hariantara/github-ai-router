# GitHub AI Router

A TypeScript router for GitHub AI models with automatic fallback and retry logic. Automatically switches between models when a request fails or hits rate limits.

## Installation

```bash
npm install github-ai-router
```

## Usage

```ts
import { GithubAIRouter } from "github-ai-router";

const router = new GithubAIRouter({
  token: process.env.GITHUB_AI_TOKEN,
  models: [
    "openai/gpt-3.5-turbo",
    "meta/llama-3"
  ]
});

// Basic usage
const res = await router.chat([
  { role: "user", content: "Hello AI!" }
]);
console.log(res.choices[0].message.content);

// Enable streaming mode
const streamRes = await router.chat([
  { role: "user", content: "Stream this!" }
], true); // Pass 'true' as the second argument to enable streaming
```

## Features

- **Automatic Fallback**: Automatically tries the next model if one fails
- **Rate Limit Handling**: Handles 429 (rate limit) errors gracefully
- **Server Error Recovery**: Retries on 5xx server errors
- **TypeScript Support**: Full TypeScript support with type definitions
- **Streaming Support**: Optional streaming mode for real-time responses

## Configuration

```ts
interface GithubAIRouterConfig {
  token: string;      // Your GitHub AI token
  models: string[];   // Array of model names to try in order
}
```

## API

### `chat(messages: ChatMessage[], stream?: boolean)`

Sends a chat request to the configured models with automatic fallback.

- `messages`: Array of chat messages with role and content
- `stream`: Optional boolean to enable streaming mode (default: false)
  - If `true`, the response will be streamed (if supported by the model)

Returns the response from the first successful model, or throws an error if all models fail.

## Error Handling

The router automatically handles:
- **429 Rate Limit Errors**: Moves to the next model
- **5xx Server Errors**: Moves to the next model
- **Other Errors**: Throws immediately without trying other models

## License

MIT
