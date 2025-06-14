import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full bg-white px-3 py-2 text-sm font-medium text-black placeholder:text-gray-500",
          "border-2 border-gray-300 focus:border-cyan-400 focus:outline-none",
          "transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-gray-400 focus:shadow-lg focus:shadow-cyan-400/10",
          "font-bold tracking-wide",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
