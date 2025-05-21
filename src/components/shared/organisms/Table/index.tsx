'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { Pagination } from '../Pagination';

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  defaultPageSize?: number;
  className?: string;
  enablePagination?: boolean;
  enablePageSize?: boolean;
  baseUrl?: string;
}

export function Table<T>({
  columns,
  data,
  defaultPageSize = 10,
  className = '',
  enablePagination = false,
  enablePageSize = false,
  baseUrl = '',
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const pathname = usePathname();

  // Get current page from URL
  const getCurrentPageFromUrl = () => {
    if (!baseUrl) return 0;
    const pathParts = pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    const pageNumber = parseInt(lastPart);
    return isNaN(pageNumber) ? 0 : pageNumber - 1;
  };

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: getCurrentPageFromUrl(),
        pageSize: enablePagination ? defaultPageSize : data.length,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  // Sync table page with URL changes
  useEffect(() => {
    const urlPage = getCurrentPageFromUrl();
    if (urlPage !== table.getState().pagination.pageIndex) {
      table.setPageIndex(urlPage);
    }
  }, [pathname]);

  return (
    <div className={`w-full p-6 bg-neutral-bg1-default rounded-b-lg h-[calc(100%-100px)] flex flex-col justify-between ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-bg2-default py-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-neutral-fg1-default text-title-3 py-3 px-4.5">
                    <div className="flex items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-4.5 py-3'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="flex justify-end mt-6">
          <Pagination
            currentPage={table.getState().pagination.pageIndex}
            totalPages={table.getPageCount()}
            baseUrl={baseUrl}
            onPageChange={table.setPageIndex}
          />
        </div>
      )}
    </div>
  );
}