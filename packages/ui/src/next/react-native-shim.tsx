// @ts-nocheck
/**
 * React Native → Web shim for Next.js
 *
 * Applies Uniwind's $$css pattern so that `className` props on RN components
 * are converted to CSS class names that react-native-web's styleq can consume.
 *
 * Without this shim, react-native-web ignores the className prop entirely
 * and only applies its own atomic CSS classes.
 */
import React, { forwardRef } from "react";
import {
  View as RNWView,
  Text as RNWText,
  TextInput as RNWTextInput,
  Pressable as RNWPressable,
  ScrollView as RNWScrollView,
  Image as RNWImage,
} from "react-native-web";

// Re-export everything from react-native-web (types, utils, other components)
export * from "react-native-web";

/**
 * Convert a className string into a react-native-web $$css style object.
 * react-native-web's styleq recognizes { $$css: true } and applies the
 * value as actual CSS class names on the DOM element.
 */
const toRNWClassName = (className?: string) =>
  className !== undefined ? ({ $$css: true, tailwind: className } as any) : {};

// --- Component overrides ---

export const View = forwardRef<any, any>(({ className, style, ...props }, ref) => (
  <RNWView ref={ref} {...props} style={[toRNWClassName(className), style]} />
));
View.displayName = "View";

export const Text = forwardRef<any, any>(({ className, style, ...props }, ref) => (
  <RNWText ref={ref} {...props} style={[toRNWClassName(className), style]} />
));
Text.displayName = "Text";

export const TextInput = forwardRef<any, any>(
  ({ className, style, ...props }, ref) => (
    <RNWTextInput
      ref={ref}
      {...props}
      style={[toRNWClassName(className), style]}
    />
  )
);
TextInput.displayName = "TextInput";

export const Pressable = forwardRef<any, any>(
  ({ className, style, ...props }, ref) => (
    <RNWPressable
      ref={ref}
      {...props}
      style={(state: any) => [
        toRNWClassName(className),
        typeof style === "function" ? style(state) : style,
      ]}
    />
  )
);
Pressable.displayName = "Pressable";

export const ScrollView = forwardRef<any, any>(
  ({ className, style, ...props }, ref) => (
    <RNWScrollView
      ref={ref}
      {...props}
      style={[toRNWClassName(className), style]}
    />
  )
);
ScrollView.displayName = "ScrollView";

export const Image = forwardRef<any, any>(
  ({ className, style, ...props }, ref) => (
    <RNWImage ref={ref} {...props} style={[toRNWClassName(className), style]} />
  )
);
Image.displayName = "Image";
