import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2 text-sm text-slate-900 shadow-sm backdrop-blur-md transition-all duration-300",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-slate-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:border-primary-500 focus-visible:bg-white",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-slate-900/50 dark:border-slate-800 dark:text-white dark:focus-visible:bg-slate-900",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }