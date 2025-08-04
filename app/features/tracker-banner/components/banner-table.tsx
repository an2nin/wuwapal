import type { ProcessedBanner, ProcessedBannerItem } from '@/shared/types/banner';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import BannerTableFilters from './banner-table-filters';
import BannerTablePagination from './banner-table-pagination';
import BannerTableRow from './banner-table-row';

interface Props {
  processedBanner: ProcessedBanner | null;
}

export default function BannerTable({ processedBanner }: Props) {
  const [activeFilters, setActiveFilters] = useState<number[]>([4, 5]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredItems = useMemo(() => {
    return (
      processedBanner?.items?.filter((obj: ProcessedBannerItem) =>
        activeFilters.includes(obj?.quality),
      ) ?? []
    );
  }, [activeFilters, processedBanner]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters]);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <Card className="h-full pb-0">
      <CardContent className=" flex flex-col overflow-x-auto">
        <div className="flex flex-wrap gap-5 lg:justify-between justify-center mb-5 items-center">
          <BannerTableFilters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <BannerTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Roll #</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Pity</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 border-b border-gray-800">
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-3 text-center text-sm text-gray-400">
                    No items found
                  </td>
                </tr>
              )}
              {currentItems.map(item => (
                <BannerTableRow key={item.roll} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
