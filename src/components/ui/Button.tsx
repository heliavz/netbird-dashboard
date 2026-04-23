import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-netbird text-white hover:bg-netbird-500 active:bg-netbird-600":
              variant === "primary",
            "bg-nb-gray-900 text-nb-gray-100 border border-nb-gray-800 hover:bg-nb-gray-850":
              variant === "secondary",
            "text-nb-gray-300 hover:text-nb-gray-100 hover:bg-nb-gray-900":
              variant === "ghost",
          },
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-4 py-2 text-sm": size === "md",
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export default Button;
