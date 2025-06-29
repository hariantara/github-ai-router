import axios from 'axios';
import { ChatMessage } from './types';

// Add a type declaration for 'process' if it does not exist (for browser/Next.js environments)
declare const process: any;

// Determine the default endpoint, supporting both Node.js and browser environments
let DEFAULT_GITHUB_AI_ENDPOINT = "https://models.github.ai/inference/chat/completions";
if (typeof process !== 'undefined' && process.env && process.env.GITHUB_AI_ENDPOINT) {
  DEFAULT_GITHUB_AI_ENDPOINT = process.env.GITHUB_AI_ENDPOINT;
}

/**
 * Fetches a response from the GitHub AI Models API.
 * @param token - The GitHub token for authentication.
 * @param model - The model name to use.
 * @param messages - The chat messages.
 * @param stream - Whether to use streaming responses.
 * @param endpoint - (Optional) Override the API endpoint.
 */
export async function fetchFromGitHubAI(token: string, model: string, messages: ChatMessage[], stream = false, endpoint?: string) {
  const apiEndpoint = endpoint || DEFAULT_GITHUB_AI_ENDPOINT;
  const response = await axios.post(
    apiEndpoint,
    {
      model,
      messages,
      stream
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      responseType: stream ? "stream" : "json"
    }
  );

  return response.data;
}
