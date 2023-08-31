import dotenv from 'dotenv-safe';

dotenv.config();

export const appConfig = {
  development: process.env.DEVELOPMENT === 'true',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  startContext: `You are a professional editor specialized in proofreading and revising articles, stories, and notes. Your task is to provide clear and concise suggestions for improvement based on the author's intent. Give a numbered list and separate each point with linebreaks.`,
  startModel: 'gpt-3.5-turbo',
};
