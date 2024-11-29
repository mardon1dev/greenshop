import React from "react";
import { usePagination, DOTS } from "@/hooks/usePagination";

import "./pagination.css"

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1] as number;

  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item`}
        onClick={currentPage === 1 ? undefined : onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`dots-${index}`} className={`pagination-item dots`}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`page-${pageNumber}`}
            className={`pagination-item ${pageNumber == currentPage ? "selected" : ""}`}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item`}
        onClick={currentPage === lastPage ? undefined : onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
