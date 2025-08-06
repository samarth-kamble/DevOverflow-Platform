"use server";

import mongoose, { Types } from "mongoose";

import Question from "@/database/question.model";
import TagQuestion from "@/database/tag-question.model";
import Tag from "@/database/tag.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { AskQuestionSchema } from "../validations";

export async function createQuestion(
  params: CreateQuestionParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, tags } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Convert userId to ObjectId if it's a string
    let authorId: mongoose.Types.ObjectId;

    if (typeof userId === "string") {
      if (userId.includes("-")) {
        const cleanId = userId.replace(/-/g, "").substring(0, 24);
        authorId = new mongoose.Types.ObjectId(cleanId);
      }
      // Option 2: Try to convert if it looks like ObjectId
      else if (mongoose.Types.ObjectId.isValid(userId)) {
        authorId = new mongoose.Types.ObjectId(userId);
      }
      // Option 3: Create a new ObjectId and store mapping (recommended for production)
      else {
        throw new Error(`Invalid user ID format: ${userId}`);
      }
    } else if (userId) {
      authorId = userId;
    } else {
      throw new Error("User ID is required");
    }

    const [question] = await Question.create(
      [{ title, content, author: authorId }],
      { session }
    );

    if (!question) {
      throw new Error("Failed to create question");
    }

    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, new: true, session }
      );

      tagIds.push(existingTag._id);
      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: question._id,
      });
    }

    await TagQuestion.insertMany(tagQuestionDocuments, { session });

    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagIds } } },
      { session }
    );

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
