import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20", className)}>
      {children}
    </Tag>
  );
}
