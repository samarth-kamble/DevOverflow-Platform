"use client";

import { toast } from "@/hooks/use-toast";
import { incrementViews } from "@/lib/actions/question.action";
import React, { useEffect, useRef } from "react";

const View = ({ questionId }: { questionId: string }) => {
  const hasIncremented = useRef(false);

  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });

    if (result.success) {
      toast({
        title: "Success",
        description: "View incremented",
      });
    } else {
      toast({
        title: "Error",
        description: result.error?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!hasIncremented.current) {
      hasIncremented.current = true;
      handleIncrement();
    }
  }, [questionId]);

  return null;
};

export default View;
