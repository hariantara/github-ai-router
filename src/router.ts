import { GithubAIRouterConfig, ChatMessage } from './types';
import { fetchFromGitHubAI } from './githubClient';

export class GithubAIRouter {
  private token: string;
  private models: string[];

  constructor(config: GithubAIRouterConfig) {
    this.token = config.token;
    this.models = config.models;
  }

  async chat(messages: ChatMessage[], stream = false) {
    for (const model of this.models) {
      try {
        const result = await fetchFromGitHubAI(this.token, model, messages, stream);
        return result;
      } catch (err: any) {
        if (err.response?.status === 429 || err.response?.status >= 500) {
          console.warn(`[GithubAIRouter] Model ${model} failed. Trying next...`);
          continue;
        }
        throw err;
      }
    }
    throw new Error("All models failed or quota exceeded.");
  }
}
          
