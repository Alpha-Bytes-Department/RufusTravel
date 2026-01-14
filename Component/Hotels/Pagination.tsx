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
  return (
    <div className="flex items-center justify-center gap-4 p-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500 disabled:opacity-40"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-16 w-16 items-center justify-center rounded-full border-2 text-xl font-semibold transition
            ${
              currentPage === page
                ? "bg-yellow-500 border-yellow-500 text-black"
                : "border-yellow-500 text-black hover:bg-yellow-100"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500 disabled:opacity-40"
      >
        ›
      </button>
    </div>
  );
}
