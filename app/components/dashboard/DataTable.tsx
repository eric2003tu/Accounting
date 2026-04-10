'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  ListFilter,
} from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableFilter<T> {
  key: keyof T;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

interface DataTableProps<T> {
  title?: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  filters?: TableFilter<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  pagination?: boolean;
  itemsPerPage?: number;
  selectableRows?: boolean;
  exportable?: boolean;
  fileName?: string;
  getRowId?: (row: T, index: number) => string;
  onSelectionChange?: (rows: T[]) => void;
  className?: string;
  rowClassName?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, any>>({
  title,
  description,
  columns,
  data,
  filters = [],
  searchable = true,
  searchPlaceholder = 'Search...',
  onSearch,
  pagination = true,
  itemsPerPage = 10,
  selectableRows = true,
  exportable = true,
  fileName = 'table-export',
  getRowId,
  onSelectionChange,
  className = '',
  rowClassName = '',
  onRowClick,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRowIds, setSelectedRowIds] = React.useState<Set<string>>(new Set());
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({});

  const resolveRowId = React.useCallback(
    (row: T, index: number): string => {
      if (getRowId) {
        return getRowId(row, index);
      }

      if (row.id !== undefined && row.id !== null) {
        return String(row.id);
      }

      return String(index);
    },
    [getRowId]
  );

  const filteredData = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return data.filter((row) => {
      const passesSearch =
        !query ||
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(query)
        );

      const passesFilters = filters.every((filter) => {
        const activeValue = filterValues[String(filter.key)] || 'all';
        if (activeValue === 'all') {
          return true;
        }

        return String(row[filter.key]) === activeValue;
      });

      return passesSearch && passesFilters;
    });
  }, [data, searchQuery, filters, filterValues]);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const selectedRows = React.useMemo(
    () =>
      filteredData.filter((row, idx) =>
        selectedRowIds.has(resolveRowId(row, idx))
      ),
    [filteredData, selectedRowIds, resolveRowId]
  );

  const currentPageRowIds = React.useMemo(
    () => paginatedData.map((row, idx) => resolveRowId(row, startIndex + idx)),
    [paginatedData, resolveRowId, startIndex]
  );

  const allFilteredRowIds = React.useMemo(
    () => filteredData.map((row, idx) => resolveRowId(row, idx)),
    [filteredData, resolveRowId]
  );

  const isAllCurrentPageSelected =
    currentPageRowIds.length > 0 &&
    currentPageRowIds.every((id) => selectedRowIds.has(id));

  React.useEffect(() => {
    onSelectionChange?.(selectedRows);
  }, [selectedRows, onSelectionChange]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
    setCurrentPage(1);
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleCurrentPageSelection = () => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (isAllCurrentPageSelected) {
        currentPageRowIds.forEach((id) => next.delete(id));
      } else {
        currentPageRowIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const selectAllFilteredRows = () => {
    setSelectedRowIds(new Set(allFilteredRowIds));
  };

  const clearSelection = () => {
    setSelectedRowIds(new Set());
  };

  const exportRowsToCsv = (rows: T[], exportName: string) => {
    if (!rows.length) {
      return;
    }

    const escapeCsv = (value: unknown) => {
      const stringValue = String(value ?? '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const headers = columns.map((column) => column.label);
    const csvRows = rows.map((row) =>
      columns.map((column) => escapeCsv(row[column.key])).join(',')
    );
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${className}`}>
      {/* Header */}
      {(title || searchable || filters.length > 0 || exportable) && (
        <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
              {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>

            {exportable && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => exportRowsToCsv(selectedRows, `${fileName}-selected`)}
                  disabled={selectedRows.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Export Selected ({selectedRows.length})
                </button>
                <button
                  type="button"
                  onClick={() => exportRowsToCsv(filteredData, `${fileName}-all`)}
                  disabled={filteredData.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Export All ({filteredData.length})
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {searchable && (
              <div className="relative min-w-[220px] flex-1 sm:flex-none sm:w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            )}

            {filters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <ListFilter className="h-4 w-4" />
                  Filters
                </span>
                {filters.map((filter) => (
                  <select
                    key={String(filter.key)}
                    value={filterValues[String(filter.key)] || 'all'}
                    onChange={(e) => {
                      setFilterValues((prev) => ({
                        ...prev,
                        [String(filter.key)]: e.target.value,
                      }));
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  >
                    <option value="all">All {filter.label}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            )}

            {selectableRows && (
              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  type="button"
                  onClick={selectAllFilteredRows}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {selectableRows && (
                <th className="w-12 px-3 py-3 text-left sm:px-4">
                  <input
                    type="checkbox"
                    checked={isAllCurrentPageSelected}
                    onChange={toggleCurrentPageSelection}
                    className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                    aria-label="Select all rows on current page"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider sm:px-6 ${
                    column.width ? column.width : ''
                  }`}
                  style={{
                    textAlign: column.align || 'left',
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={resolveRowId(row, startIndex + idx)}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-slate-200 transition-colors ${
                    onRowClick
                      ? 'cursor-pointer hover:bg-slate-50'
                      : ''
                  } ${rowClassName}`}
                >
                  {selectableRows && (
                    <td className="px-3 py-4 sm:px-4">
                      <input
                        type="checkbox"
                        checked={selectedRowIds.has(resolveRowId(row, startIndex + idx))}
                        onChange={() => toggleRowSelection(resolveRowId(row, startIndex + idx))}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                        aria-label="Select row"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-3 py-4 text-sm text-slate-900 sm:px-6"
                      style={{
                        textAlign: column.align || 'left',
                      }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectableRows ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-slate-500 sm:px-6"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-4 py-4 sm:px-6">
          <p className="text-sm text-slate-600">
            Page {currentPage} of {totalPages} ({filteredData.length} items)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-300 p-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-300 p-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
