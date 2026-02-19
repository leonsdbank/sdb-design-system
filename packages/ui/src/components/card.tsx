import React from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "../lib/utils";
import { Text } from "./text";

export interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export interface CardHeaderProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <View className={cn("mb-3", className)} {...props}>
      {children}
    </View>
  );
}

export interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <Text variant="heading" size="lg" className={className}>
      {children}
    </Text>
  );
}

export interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return (
    <Text variant="muted" size="sm" className={className}>
      {children}
    </Text>
  );
}

export interface CardContentProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <View className={cn("py-2", className)} {...props}>
      {children}
    </View>
  );
}

export interface CardFooterProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <View
      className={cn("mt-3 flex-row items-center", className)}
      {...props}
    >
      {children}
    </View>
  );
}
