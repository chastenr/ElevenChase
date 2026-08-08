import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimatedArrowProps = {
  className?: string;
  size?: number;
};

export function AnimatedArrow({ className, size = 16 }: AnimatedArrowProps) {
  return (
    <span
      className={cn(
        "relative inline-grid overflow-hidden align-middle",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <ArrowUpRight
        size={size}
        className="col-start-1 row-start-1 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:translate-x-full"
      />
      <ArrowUpRight
        size={size}
        className="col-start-1 row-start-1 -translate-x-full translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  );
}
