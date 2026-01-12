"use client";

// ===============================Props Interface==============================
interface TourEmptyStateProps {
  onReset: () => void;
}

// ===============================Component==============================
const TourEmptyState = ({ onReset }: TourEmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No tours found
      </h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your filters or search query
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default TourEmptyState;
