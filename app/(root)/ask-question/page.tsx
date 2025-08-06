import React from "react";

import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskQuestion;
