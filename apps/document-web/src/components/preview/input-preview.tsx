"use client";

import { Input } from "@sdbank/ui";
import { View } from "react-native";

export function InputPreview() {
  return (
    <View className="gap-4 max-w-sm">
      <Input placeholder="Basic input" />

      <Input label="Email" placeholder="you@example.com" />

      <Input
        label="Password"
        placeholder="Enter password"
        error="Password is required"
      />

      <Input
        label="Disabled"
        placeholder="Cannot edit"
        editable={false}
      />
    </View>
  );
}
