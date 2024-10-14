// src/config/env.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/chatbot-db',
  huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
  huggingFaceApiUrl:
    process.env.HUGGINGFACE_API_URL ||
    'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
};
