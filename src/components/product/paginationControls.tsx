"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalProducts: number;
}

const PaginationControls: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  totalProducts,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";
  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/collections?page=${Number(page) - 1}&per_page=${per_page}`
          );
        }}
      >
        <ChevronLeft />
      </Button>
      <div>
        {page}/{Math.ceil(totalProducts / Number(per_page))}
      </div>
      <Button
        size="icon"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/collections?page=${Number(page) + 1}&per_page=${per_page}`
          );
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationControls;
