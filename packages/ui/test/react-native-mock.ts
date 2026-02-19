import React from "react";

const View = React.forwardRef(({ children, testID, ...props }: any, ref: any) =>
  React.createElement("div", { ...props, "data-testid": testID, ref }, children)
);
View.displayName = "View";

const Text = React.forwardRef(({ children, testID, ...props }: any, ref: any) =>
  React.createElement("span", { ...props, "data-testid": testID, ref }, children)
);
Text.displayName = "Text";

const TextInput = React.forwardRef(
  ({ testID, placeholder, onChangeText, secureTextEntry, editable, ...props }: any, ref: any) =>
    React.createElement("input", {
      ...props,
      "data-testid": testID,
      placeholder,
      type: secureTextEntry ? "password" : "text",
      disabled: editable === false,
      onChange: (e: any) => onChangeText?.(e.target.value),
      ref,
    })
);
TextInput.displayName = "TextInput";

const Pressable = React.forwardRef(
  ({ children, testID, onPress, disabled, ...props }: any, ref: any) =>
    React.createElement(
      "button",
      {
        ...props,
        "data-testid": testID,
        onClick: disabled ? undefined : onPress,
        disabled,
        ref,
      },
      typeof children === "function" ? children({ pressed: false }) : children
    )
);
Pressable.displayName = "Pressable";

const ScrollView = React.forwardRef(({ children, testID, ...props }: any, ref: any) =>
  React.createElement("div", { ...props, "data-testid": testID, ref }, children)
);
ScrollView.displayName = "ScrollView";

const StyleSheet = {
  create: (styles: any) => styles,
  flatten: (style: any) => (Array.isArray(style) ? Object.assign({}, ...style) : style || {}),
};

const Platform = {
  OS: "web" as const,
  select: (obj: any) => obj.web || obj.default,
};

export {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
};

export type ViewProps = any;
export type TextProps = any;
export type TextInputProps = any;
export type PressableProps = any;
