import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

// Mengabaikan (omit) 'children' dari HTMLMotionProps untuk mencegah error type clash,
// lalu kita definisikan ulang children menggunakan React.ReactNode
interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    // Base style ditambahkan transisi warna yang lebih mulus dan rounded yang lebih modern (rounded-xl)
    const baseStyles = "relative inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
    
    // Varian sekarang menggunakan warna tech dari globals.css dan efek glowing
    const variants = {
      primary: "bg-primary-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] border border-primary-500/50 focus:ring-primary-500",
      secondary: "bg-accent-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] border border-accent-400/50 focus:ring-accent-500",
      outline: "glass text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:ring-slate-400",
      ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 py-2",
      lg: "h-12 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading}
        // Micro-interactions menggunakan Framer Motion
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Shimmer effect overlay for primary and secondary variants */}
        {(variant === 'primary' || variant === 'secondary') && (
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";