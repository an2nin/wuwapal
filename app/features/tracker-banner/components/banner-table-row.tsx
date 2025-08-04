import type { ProcessedBannerItem } from '@/shared/types/banner';
import { cn, formatDateToHumanReadable, getColorClassWithSeverity, getRarityTextColor } from '@/shared/utils';

interface Props {
  item: ProcessedBannerItem;
}

export default function BannerTableRow({ item }: Props) {
  return (
    <tr key={item.roll} className={cn('hover:bg-background/50 transition-colors', item.quality === 5 && 'border-l-4 border-yellow-500 border-b-0')}>
      <td className="px-6 py-3 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-300">
          #
          {item.roll}
        </span>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="size-10 rounded-full object-cover"
            src={item.icon || ''}
            alt={item.name}
          />
          <div className="ml-3">
            <p className={cn('text-sm font-bold', getRarityTextColor(item.quality))}>{item.name}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <span className={cn('text-sm font-bold text-gray-300 capitalize', getColorClassWithSeverity(item.pity, item.quality === 4 ? 10 : item.quality === 5 ? 80 : 0))}>
          {item.pity}
        </span>
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-300">
        {formatDateToHumanReadable(new Date(item.time))}
      </td>
    </tr>
  );
}
