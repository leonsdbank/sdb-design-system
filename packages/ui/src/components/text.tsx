import React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cn } from "../lib/utils";

export type TextVariant = "default" | "heading" | "subheading" | "muted" | "destructive";
export type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  size?: TextSize;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  default: "text-gray-900",
  heading: "text-gray-900 font-bold",
  subheading: "text-gray-700 font-semibold",
  muted: "text-gray-500",
  destructive: "text-red-600",
};

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

export function Text({
  variant = "default",
  size = "base",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </RNText>
  );
}
