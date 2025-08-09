"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface Props {
  page: number | undefined | string;
  isNext: boolean;
  containerClasses?: string;
}

const Pagination = ({ page = 1, isNext, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(page);
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = !isNext;

  const handleNavigation = (type: "prev" | "next") => {
    if (type === "prev" && isPrevDisabled) return;
    if (type === "next" && isNextDisabled) return;

    const nextPageNumber = type === "prev" ? currentPage - 1 : currentPage + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2 mt-5",
        containerClasses
      )}
    >
      {/* Previous Page Button - Always shown */}
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={isPrevDisabled}
        className={cn(
          "light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border",
          isPrevDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>

      {/* Current Page Display */}
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{currentPage}</p>
      </div>

      {/* Next Page Button - Always shown */}
      <Button
        onClick={() => handleNavigation("next")}
        disabled={isNextDisabled}
        className={cn(
          "light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border",
          isNextDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
