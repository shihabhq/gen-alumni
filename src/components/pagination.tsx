"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        style={{ borderColor: "#007f8c" }}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} style={{ color: "#006747" }} />
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..." || page === currentPage}
            className={`px-3 py-2 rounded font-medium transition-colors ${
              page === currentPage
                ? "text-white cursor-default"
                : page === "..."
                ? "cursor-default"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
            style={{
              backgroundColor: page === currentPage ? "#006747" : "transparent",
              color: page === currentPage ? "white" : "#1e293b",
              borderColor: "#007f8c",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        style={{ borderColor: "#007f8c" }}
        aria-label="Next page"
      >
        <ChevronRight size={20} style={{ color: "#006747" }} />
      </button>
    </div>
  );
}
