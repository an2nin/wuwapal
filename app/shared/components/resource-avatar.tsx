import { IMAGE_PATH } from '../constants/game/paths';
import { cn } from '../utils';

interface Props {
  item: {
    name: string;
    quality: number;
    type: 'resonators' | 'weapons';
  };
  className?: string;
}

export default function ResourceAvatar({ item, className }: Props) {
  return (
    <div
      className={cn(
        'relative rounded-full bg-transparent border-black border-[0.15rem] lg:border-[0.2rem] items-center justify-center flex',
        className,
      )}
    >
      <img
        className={cn(
          'size-14 rounded-full lg:size-16 border-[0.2rem] lg:border-[0.25rem]',
          {
            'border-quality-5': item.quality === 5,
            'border-quality-4': item.quality === 4,
          },
        )}
        src={`${IMAGE_PATH}/${item.type}/${item.quality}/${item.name}.webp`}
        alt={item.name}
      />
      {' '}
    </div>
  );
}
