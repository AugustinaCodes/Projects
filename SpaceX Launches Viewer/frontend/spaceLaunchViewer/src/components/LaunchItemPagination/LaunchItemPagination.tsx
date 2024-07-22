interface LaunchItemPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const LaunchItemPagination: React.FC<LaunchItemPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default LaunchItemPagination;
