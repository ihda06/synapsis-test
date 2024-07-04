import cn from "@/utils/formatter";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";

const textFieldVariants = cva(
  "w-full  bg-white text-neutral-700 placeholder-gray-400 rounded-md border border-slate-300 p-2 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      error: {
        true: "border-red-500 focus:ring-red-300",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

export interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textFieldVariants> {}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(textFieldVariants({ error, className }))}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
