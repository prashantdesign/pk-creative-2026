'use server';
/**
 * @fileOverview A flow for generating project case study details using AI.
 *
 * - generateProjectDetails - A function that uses a Gemini model to generate
 *   the problem, solution, and outcome for a project based on its title and description.
 * - GenerateProjectDetailsInput - The input type for the flow.
 * - GenerateProjectDetailsOutput - The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

// Define the input schema for the AI flow
const GenerateProjectDetailsInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A short description of the project.'),
  modelName: z.string().optional().describe('The specific Gemini model to use.'),
});
export type GenerateProjectDetailsInput = z.infer<typeof GenerateProjectDetailsInputSchema>;

// Define the output schema the AI should conform to
const GenerateProjectDetailsOutputSchema = z.object({
  problem: z.string().describe("The 'problem' statement for the case study. Should be 1-2 paragraphs."),
  solution: z.string().describe("The 'solution' statement for the case study. Should be 1-2 paragraphs."),
  outcome: z.string().describe("The 'outcome' statement for the case study. Should be 1-2 paragraphs."),
});
export type GenerateProjectDetailsOutput = z.infer<typeof GenerateProjectDetailsOutputSchema>;

// Define the prompt template for the AI
const projectDetailsPrompt = ai.definePrompt({
  name: 'projectDetailsPrompt',
  input: { schema: z.object({ title: z.string(), description: z.string() }) },
  output: { schema: GenerateProjectDetailsOutputSchema },
  prompt: `You are a world-class creative director and copywriter.
    Given the following project title and short description, write a compelling case study for a design portfolio.
    The case study should have three parts: "The Problem", "The Solution", and "The Outcome".
    Each part should be one or two paragraphs long. The tone should be professional, confident, and results-oriented.

    Project Title: {{{title}}}
    Short Description: {{{description}}}
  `,
});

// Define the main Genkit flow
const generateProjectDetailsFlow = ai.defineFlow(
  {
    name: 'generateProjectDetailsFlow',
    inputSchema: GenerateProjectDetailsInputSchema,
    outputSchema: GenerateProjectDetailsOutputSchema,
  },
  async ({ title, description, modelName }) => {
    // Select the specified model, or default to gemini-1.5-flash-latest
    const model = googleAI.model(modelName || 'gemini-1.5-flash-latest');
    
    // Call the AI model with the defined prompt and input
    const { output } = await projectDetailsPrompt({
      input: { title, description },
      model,
    });

    // Handle cases where the model might not return an output
    if (!output) {
      throw new Error('The AI model did not return an output.');
    }
    
    return output;
  }
);

/**
 * An exported wrapper function to make the flow easily callable from server components or actions.
 * @param input The title, description, and optional model name for the project.
 * @returns A promise that resolves to the generated case study details.
 */
export async function generateProjectDetails(input: GenerateProjectDetailsInput): Promise<GenerateProjectDetailsOutput> {
  const output = await generateProjectDetailsFlow(input);
  if (!output) {
    throw new Error('Failed to generate project details.');
  }
  return output;
}
