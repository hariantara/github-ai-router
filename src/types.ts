export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GithubAIRouterConfig {
  token: string;
  models: string[];
}
