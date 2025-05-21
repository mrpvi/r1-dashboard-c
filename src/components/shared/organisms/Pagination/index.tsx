'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import ChevronLeft from '@/app/assets/icons/ChevronLeft';
import ChevronRight from '@/app/assets/icons/ChevronRight';
import { PaginationProps } from '@/types/components/organisms/Pagination.type';

const classes = {
  container: 'ar-pagination',
  wrapper: 'flex items-center gap-2',
  button: 'ar-pagination-button',
  activeButton: 'active',
  ellipsis: 'px-2 text-gray-700',
  pageNumbersWrapper: 'flex items-center gap-2'
} as const;

export function Pagination({
  currentPage,
  totalPages,
  baseUrl = '',
  onPageChange,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
    if (baseUrl) {
      const newPageNumber = newPage + 1;
      const newUrl = newPageNumber === 1 ? baseUrl : `${baseUrl}/${newPageNumber}`;
      router.push(newUrl);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages: (number | string)[] = [];
    
    pages.push(0);

    const { startPage, endPage } = calculatePageRange();

    if (startPage > 1) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const calculatePageRange = () => {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages - 2, currentPage + 1);

    if (currentPage <= 2) {
      endPage = Math.min(3, totalPages - 2);
    }
    else if (currentPage >= totalPages - 3) {
      startPage = Math.max(totalPages - 4, 1);
    }

    return { startPage, endPage };
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <button
          className={classes.button}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        <div className={classes.pageNumbersWrapper}>
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className={classes.ellipsis}>...</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={ classNames(classes.button, { [classes.activeButton]: page === currentPage }) }
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {(page as number) + 1}
              </button>
            )
          ))}
        </div>

        <button
          className={classes.button}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
} 