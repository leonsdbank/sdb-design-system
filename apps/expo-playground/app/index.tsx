import { ScrollView, View } from "react-native";
import { Text } from "@sdb/ui";
import { ComponentShowcase } from "~/components/component-showcase";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text variant="heading" size="2xl" className="mb-1">
          @sdb/ui Playground
        </Text>
        <Text variant="muted" size="sm" className="mb-6">
          Cross-platform component showcase
        </Text>
        <ComponentShowcase />
      </View>
    </ScrollView>
  );
}
