'use server';

/**
 * @fileOverview A command safety check AI agent.
 *
 * - checkCommandSafety - A function that checks if a command is safe to execute.
 * - CheckCommandSafetyInput - The input type for the checkCommandSafety function.
 * - CheckCommandSafetyOutput - The return type for the checkCommandSafety function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckCommandSafetyInputSchema = z.object({
  command: z.string().describe('The command to check for safety.'),
});
export type CheckCommandSafetyInput = z.infer<typeof CheckCommandSafetyInputSchema>;

const CheckCommandSafetyOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the command is safe to execute.'),
  reason: z.string().describe('The reason for the safety determination.'),
});
export type CheckCommandSafetyOutput = z.infer<typeof CheckCommandSafetyOutputSchema>;

export async function checkCommandSafety(input: CheckCommandSafetyInput): Promise<CheckCommandSafetyOutput> {
  return checkCommandSafetyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkCommandSafetyPrompt',
  input: {schema: CheckCommandSafetyInputSchema},
  output: {schema: CheckCommandSafetyOutputSchema},
  prompt: `You are a security expert who reviews commands to determine if they are safe to execute.

You will be provided a command, and you will output a determination as to whether it is safe to execute or not.

Considerations for safety include:
- Will the command delete or modify important files?
- Will the command expose sensitive information?
- Is the command likely to be malicious?
- Is the command likely to cause harm to the system?
- Does the command require root privileges?

If the command is potentially harmful, explain the reason in the reason field.

Command: {{{command}}}`,
});

const checkCommandSafetyFlow = ai.defineFlow(
  {
    name: 'checkCommandSafetyFlow',
    inputSchema: CheckCommandSafetyInputSchema,
    outputSchema: CheckCommandSafetyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
