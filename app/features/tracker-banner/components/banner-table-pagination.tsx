import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function BannerTablePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  return (
    <div className="flex gap-1 items-center">
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer text-primary hover:scale-110 hover:opacity-70 transform transition-transform"
      >
        <ChevronsLeft className="size-10" />
      </button>
      <div className="flex gap-1">
        {currentPage}
        {' '}
        <span>of</span>
        {' '}
        {totalPages}
      </div>
      <button
        type="button"
        className="cursor-pointer text-primary hover:scale-110 hover:opacity-70 transform transition-transform"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="size-10" />
      </button>
    </div>
  );
}
