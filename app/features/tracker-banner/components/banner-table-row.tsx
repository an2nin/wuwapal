import type { ProcessedBannerItem } from '@/shared/types/banner';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { cn, formatDateToHumanReadable, getColorClassWithSeverity, getRarityTextColor } from '@/shared/utils';

interface Props {
  item: ProcessedBannerItem;
}

const cellClass = 'px-3 sm:px-6 py-3';

export default function BannerTableRow({ item }: Props) {
  const date = formatDateToHumanReadable(new Date(item.time));

  return (
    <TableRow className={cn('hover:bg-background/50', item.quality === 5 && 'border-l-4 border-l-quality-5')}>
      <TableCell className={cn(cellClass, 'font-medium text-foreground/90')}>
        #
        {item.roll}
      </TableCell>
      <TableCell className={cellClass}>
        <div className="flex items-center gap-3">
          <img
            className="size-10 rounded-full object-cover shrink-0"
            src={item.icon || ''}
            alt=""
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className={cn('font-bold truncate', getRarityTextColor(item.quality))}>{item.name}</p>
            <p className="text-xs text-muted-foreground sm:hidden">{date}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className={cellClass}>
        <span className={cn('font-bold', getColorClassWithSeverity(item.pity, item.quality === 4 ? 10 : item.quality === 5 ? 80 : 0))}>
          {item.pity}
        </span>
      </TableCell>
      <TableCell className={cn(cellClass, 'hidden sm:table-cell text-foreground/90')}>
        {date}
      </TableCell>
    </TableRow>
  );
}
