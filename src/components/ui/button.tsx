import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "rounded-md px-4 py-2 font-semibold shadow active:translate-y-0.5 active:translate-x-0.5 hover:scale-105 duration-300 active:shadow-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:shadow-none",
  {
    variants: {
      size: {
        sm: "text-xs ",
        md: "text-sm ",
        lg: "px-3 py-1 text-sm",
      },
      color: {
        blue: "bg-blue-50 text-blue-700 ",
        green: "bg-emerald-50 text-emerald-700",
        red: "bg-red-50 text-red-700",
      },
    },
    compoundVariants: [
      {
        size: ["sm", "md"],
        className: "py-0.5 pl-2 pr-2.5 ",
      },
    ],
    defaultVariants: {
      color: "green",
      size: "md",
    },
  }
);

interface CustomButtonProps
  extends VariantProps<typeof buttonVariants>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {}

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, color, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ color, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
