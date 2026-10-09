import type { ProcessedBanner, ProcessedBannerItem } from '@/shared/types/banner';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { cn } from '@/shared/utils';
import BannerTableFilters from './banner-table-filters';
import BannerTablePagination from './banner-table-pagination';
import BannerTableRow from './banner-table-row';

const headClass = 'px-3 sm:px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider';

interface Props {
  processedBanner: ProcessedBanner | null;
  isLoading?: boolean;
}

export default function BannerTable({ processedBanner, isLoading = false }: Props) {
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
      <CardContent className="flex flex-col px-3 sm:px-6">
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

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={headClass}>Roll #</TableHead>
              <TableHead className={headClass}>Item</TableHead>
              <TableHead className={headClass}>Pity</TableHead>
              <TableHead className={cn(headClass, 'hidden sm:table-cell')}>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && Array.from({ length: itemsPerPage }, (_, idx) => (
              <TableRow key={idx} className="hover:bg-transparent">
                <TableCell colSpan={4} className="px-3 sm:px-6 py-3">
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && currentItems.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  {processedBanner ? 'No items match the selected filters' : 'No pulls recorded for this banner yet'}
                </TableCell>
              </TableRow>
            )}
            {currentItems.map(item => (
              <BannerTableRow key={item.roll} item={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
