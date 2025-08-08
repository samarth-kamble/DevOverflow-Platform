import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";
import { text } from "stream/consumers";

export async function POST(req: Request) {
  const { question, content } = await req.json();

  try {
    const validationData = AIAnswerSchema.safeParse({
      question,
      content,
    });

    if (!validationData.success) {
      throw new ValidationError(validationData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Generate a markdown-formatted response to the following question: ${question}. Base it on the provided content: ${content}`,
      system:
        "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
    });

    return NextResponse.json(
      {
        success: true,
        data: text,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
