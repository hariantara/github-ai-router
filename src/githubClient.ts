import axios from 'axios';
import { ChatMessage } from './types';

export async function fetchFromGitHubAI(token: string, model: string, messages: ChatMessage[], stream = false) {
  const response = await axios.post(
    "https://models.github.ai/inference",
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
