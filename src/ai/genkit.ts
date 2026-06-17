import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize Genkit and export the 'ai' object
export const ai = genkit({
  plugins: [
    googleAI(), // The Google AI plugin will automatically use the GEMINI_API_KEY from your .env file.
  ],
});
