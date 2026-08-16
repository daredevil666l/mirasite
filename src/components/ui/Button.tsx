import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

/**
 * Базовый компонент кнопки с вариантами из дизайн-системы MiraMoney
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mira-green focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none";

    const variantStyles = {
      // Основная зеленая кнопка (#0D8C47)
      primary:
        "bg-mira-green text-white hover:bg-mira-green-hover shadow-sm",
      // Прозрачная кнопка с полупрозрачным белым бордером для Hero
      secondary:
        "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/60",
      // Светлая кнопка с серым бордером
      outline:
        "bg-white text-mira-dark-900 border border-mira-gray-300 hover:bg-mira-gray-200 hover:border-mira-gray-400",
      // Кнопка без фона
      ghost:
        "bg-transparent text-mira-dark-700 hover:bg-mira-gray-200 hover:text-mira-dark-900",
      // Темная кнопка
      dark:
        "bg-mira-dark-800 text-white hover:bg-mira-dark-700",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs font-semibold gap-1.5",
      md: "h-[44px] px-5 text-sm font-semibold gap-2",
      lg: "h-[50px] px-6 text-[15px] font-semibold gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
