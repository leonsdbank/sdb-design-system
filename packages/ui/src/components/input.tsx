import React, { forwardRef } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "../lib/utils";
import { Text } from "./text";

export interface InputProps extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  placeholder?: string;
  value?: string;
  editable?: boolean;
  onChangeText?: (val: string) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ className, label, error, labelClassName, ...props }, ref) => {
    return (
      <View className="w-full">
        {!!label && (
          <Text
            variant="default"
            size="sm"
            className={cn("mb-1.5 font-medium", labelClassName)}
          >
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900",
            "placeholder:text-gray-400",
            !!error && "border-red-500",
            props.editable === false && "opacity-50",
            className
          )}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {!!error && (
          <Text variant="destructive" size="xs" className="mt-1">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
