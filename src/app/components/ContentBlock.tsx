import { cn } from '@/lib/utils';

interface ContentBlockProps {
  children: React.ReactNode;
  additionalClasses?: string;
}

export default function ContentBlock({ children, additionalClasses }: ContentBlockProps) {
  return (
    <div
      className={
        (cn('bg-[#F8F8FA] shadow-md rounded-md overflow-scroll h-full w-full scrollbar-hide', additionalClasses))
      }
    >
      {children}
    </div>
  );
}