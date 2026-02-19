"use client";

import { Text } from "@sdb/ui";
import { View } from "react-native";

export function TextPreview() {
  return (
    <View className="gap-4">
      <View className="gap-1">
        <Text variant="heading" size="xl">Heading</Text>
        <Text variant="subheading" size="lg">Subheading</Text>
        <Text variant="default">Default text</Text>
        <Text variant="muted">Muted text</Text>
        <Text variant="destructive">Destructive text</Text>
      </View>

      <View className="gap-1">
        <Text size="xs">Extra Small (xs)</Text>
        <Text size="sm">Small (sm)</Text>
        <Text size="base">Base</Text>
        <Text size="lg">Large (lg)</Text>
        <Text size="xl">Extra Large (xl)</Text>
        <Text size="2xl">2XL</Text>
        <Text size="3xl">3XL</Text>
      </View>
    </View>
  );
}
