import { cn } from '../utils';

interface Props {
  children?: string;
  className?: string;
  text?: string;
}

export default function ThemedGradientText({
  children,
  className,
  text,
}: Props) {
  return (
    <span
      className={cn('text-base font-bold', className)}
      style={{
        background: 'linear-gradient(to right, var(--primary), #fff)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
      {children}
    </span>
  );
}
