import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const maxDuration = 30;

const requestSchema = z.object({
  decision: z
    .string()
    .trim()
    .min(10, "Decision must be at least 10 characters long.")
    .max(1000, "Decision is too long."),

  optionA: z
    .string()
    .trim()
    .min(1, "Option A is required.")
    .max(500, "Option A is too long."),

  optionB: z
    .string()
    .trim()
    .min(1, "Option B is required.")
    .max(500, "Option B is too long."),

  priority: z
    .string()
    .trim()
    .min(1, "Priority is required.")
    .max(100, "Priority is too long."),
});

const decisionSchema = z.object({
  summary: z.string(),
  recommendation: z.string(),

  optionA: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
  }),

  optionB: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
  }),

  tradeoffs: z.array(z.string()),
  risks: z.array(z.string()),
  considerations: z.array(z.string()),
  nextStep: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate incoming request
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          error: "Please check your decision details and try again.",
          details: validation.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const { decision, optionA, optionB, priority } = validation.data;

    // Prevent the same option from being submitted twice
    if (optionA.toLowerCase() === optionB.toLowerCase()) {
      return Response.json(
        {
          error: "Option A and Option B must be different.",
        },
        { status: 400 }
      );
    }

    const result = await generateObject({
  model: google("gemini-3.8-flash"),
  maxRetries: 0,

      schema: decisionSchema,

      system: `
You are an AI decision-support assistant.

Your job is to help users understand a decision by comparing
their options and identifying important trade-offs.

Do not make the decision for the user.

Provide balanced analysis based only on the information provided.
Do not invent facts about the user's situation.

Consider the user's stated priority when comparing the options.

Treat both options fairly. Do not automatically favor one option.

If important information is missing, acknowledge the uncertainty
instead of making assumptions.

Your analysis should:
- Explain the situation clearly.
- Compare both options fairly.
- Identify strengths and weaknesses.
- Explain important trade-offs.
- Identify potential risks.
- Give useful considerations.
- Suggest a practical next step.

The recommendation should explain how each option relates to the
user's stated priority. Do not present the recommendation as
a guaranteed or universally correct answer.

The final decision belongs to the user.
`,

      prompt: `
Decision:
${decision}

Option A:
${optionA}

Option B:
${optionB}

User's main priority:
${priority}
`,
    });

    return Response.json(result.object);
   } catch (error) {
    console.error("Decision analysis error:", error);

    const errorMessage =
      error instanceof Error ? error.message.toLowerCase() : "";

    if (
      errorMessage.includes("high demand") ||
      errorMessage.includes("unavailable") ||
      errorMessage.includes("503")
    ) {
      return Response.json(
        {
          error:
            "The AI service is temporarily busy. Please wait a moment and try again.",
        },
        { status: 503 }
      );
    }

    return Response.json(
      {
        error:
          "We couldn't analyze your decision right now. Please try again.",
      },
      { status: 500 }
    );
  }
}