import { cn } from '@/shared/utils';

interface Props {
  children: React.ReactNode;
  hoverable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
export default function MovingBorder({
  children,
  hoverable = false,
  disabled = false,
  onClick,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'relative inline-flex overflow-hidden rounded-2xl p-[3px]',
        hoverable && !disabled && 'hover:scale-105 cursor-pointer',
        disabled && 'cursor-not-allowed text-muted-foreground',
        className,
      )}
      onClick={disabled ? undefined : onClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#F1F1F1_50%,var(--primary)_100%)]" />
      <span className="inline-flex h-full w-full items-center justify-center rounded-2xl bg-card px-4 py-3 text-foreground backdrop-blur-3xl">
        {children}
      </span>
    </div>
  );
}
