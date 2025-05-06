import { cn } from '@/lib/utils';

interface FormButtonsWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FormButtonsWrapper({
  children,
  className,
}: FormButtonsWrapperProps) {
  return (
    <div className={cn('mt-8 flex flex-col gap-4 md:flex-row', className)}>
      {children}
    </div>
  );
}
