"use client";

import { Button } from "@sdb/ui";
import { View } from "react-native";

export function ButtonPreview() {
  return (
    <View className="gap-6">
      <View>
        <View className="flex-row flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </View>
      </View>

      <View>
        <View className="flex-row flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </View>
      </View>

      <View>
        <View className="flex-row gap-2">
          <Button disabled>Disabled</Button>
        </View>
      </View>
    </View>
  );
}
