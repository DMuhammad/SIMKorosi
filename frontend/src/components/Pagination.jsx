import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

export default function Pagination({ pagination, handlePagination }) {
  if (pagination.totalPages <= 1) {
    return null;
  }
  const paginationRange = () => {
    const rangeSize = 3;

    let rangeStart = Math.max(2, pagination.page - Math.floor(rangeSize / 2));
    let rangeEnd = Math.min(
      rangeStart + rangeSize - 1,
      pagination.totalPages - 1
    );

    if (rangeEnd - rangeStart < rangeSize - 1) {
      rangeStart = Math.max(2, rangeEnd - rangeSize + 1);
    }

    const range = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    return [1, ...range, pagination.totalPages].reduce(
      (list, page, index, arr) => {
        if (index > 0 && page - arr[index - 1] > 1) {
          list.push("...");
        }
        list.push(page);
        return list;
      },
      []
    );
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePagination(pagination.page - 1)}
          disabled={pagination.page === 1 && true}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePagination(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages && true}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {" "}
              {pagination.limit * (pagination.page - 1) + 1}{" "}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {" "}
              {pagination.limit * pagination.page}{" "}
            </span>{" "}
            of <span className="font-medium"> {pagination.total} </span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePagination(pagination.page - 1)}
              disabled={pagination.page === 1 && true}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {paginationRange().map((pageNum) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={pageNum}
                    className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={pageNum}
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    pagination.page === pageNum
                      ? "bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                  onClick={() => handlePagination(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePagination(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages && true}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired,
};
