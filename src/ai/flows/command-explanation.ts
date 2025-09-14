'use server';
/**
 * @fileOverview Explains command from user before execution
 *
 * - explainCommand - A function that handles the command explanation process.
 * - ExplainCommandInput - The input type for the explainCommand function.
 * - ExplainCommandOutput - The return type for the explainCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCommandInputSchema = z.object({
  command: z
    .string()
    .describe('The command that the user wants to run.'),
});
export type ExplainCommandInput = z.infer<typeof ExplainCommandInputSchema>;

const ExplainCommandOutputSchema = z.object({
  explanation: z.string().describe('Explanation of what the command does.'),
});
export type ExplainCommandOutput = z.infer<typeof ExplainCommandOutputSchema>;

export async function explainCommand(input: ExplainCommandInput): Promise<ExplainCommandOutput> {
  return explainCommandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCommandPrompt',
  input: {schema: ExplainCommandInputSchema},
  output: {schema: ExplainCommandOutputSchema},
  prompt: `You are an expert command line explainer.

You will use this information to explain what the command does, and the potential impact of the command.

Command: {{{command}}}`,
});

const explainCommandFlow = ai.defineFlow(
  {
    name: 'explainCommandFlow',
    inputSchema: ExplainCommandInputSchema,
    outputSchema: ExplainCommandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
