import { forwardRef, HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "@/utils/formatter";

const statusVariants = cva(
  "flex w-fit cursor-default items-center gap-1.5 whitespace-nowrap rounded-full font-medium tracking-tight",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "px-3 py-1 text-sm",
      },
      color: {
        green: "bg-emerald-50 text-emerald-700",
        red: "bg-red-50 text-red-700",
      },
    },
    compoundVariants: [
      {
        size: ["sm", "md"],
        className: "py-0.5 pl-2 pr-2.5",
      },
    ],
    defaultVariants: {
      color: "green",
      size: "md",
    },
  }
);

export type StatusColor = VariantProps<typeof statusVariants>["color"];

interface CustomStatusProps
  extends VariantProps<typeof statusVariants>,
    Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  text?: string;
}
const Status = forwardRef<HTMLSpanElement, CustomStatusProps>(
  ({ className, text, color, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusVariants({ color, size, className }))}
        {...props}
      >
        <span
          className={cn(
            {
              "bg-emerald-700": color === "green",

              "bg-red-700": color === "red",
            },
            "inline-block h-2 w-2 shrink-0 rounded-full"
          )}
        ></span>
        {text}
      </span>
    );
  }
);

Status.displayName = "Status";
export default Status;
