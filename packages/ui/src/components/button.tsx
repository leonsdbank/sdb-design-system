import React from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import { cn } from "../lib/utils";

export type ButtonVariant = "default" | "secondary" | "destructive" | "outline" | "ghost";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-blue-600 active:bg-blue-700",
  secondary: "bg-gray-200 active:bg-gray-300",
  destructive: "bg-red-600 active:bg-red-700",
  outline: "border border-gray-300 bg-transparent active:bg-gray-100",
  ghost: "bg-transparent active:bg-gray-100",
};

const variantTextClasses: Record<ButtonVariant, string> = {
  default: "text-white",
  secondary: "text-gray-900",
  destructive: "text-white",
  outline: "text-gray-900",
  ghost: "text-gray-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-4 py-2.5",
  sm: "px-3 py-1.5",
  lg: "px-6 py-3",
  icon: "p-2.5",
};

const sizeTextClasses: Record<ButtonSize, string> = {
  default: "text-sm",
  sm: "text-xs",
  lg: "text-base",
  icon: "text-sm",
};

export function Button({
  variant = "default",
  size = "default",
  className,
  textClassName,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "items-center justify-center rounded-lg",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "font-semibold",
            variantTextClasses[variant],
            sizeTextClasses[size],
            textClassName
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
