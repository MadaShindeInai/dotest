type Props = {
  page: number;
  setPage: (arg: number) => void;
  maximumPages: number;
};

export const Pagination = ({ page, maximumPages, setPage }: Props) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (page < maximumPages) {
            setPage(page + 1);
          }
        }}
        disabled={page === maximumPages}
      >
        Next
      </button>
    </div>
  );
};
