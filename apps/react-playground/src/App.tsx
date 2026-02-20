import { View } from "react-native";
import { Text } from "@sdbank/ui";
import { ComponentShowcase } from "./components/component-showcase";

export default function App() {
  return (
    <View className="min-h-screen bg-gray-50 p-6">
      <View className="max-w-2xl mx-auto">
        <Text variant="heading" size="3xl" className="mb-1">
          @sdbank/ui
        </Text>
        <Text variant="muted" className="mb-8">
          React + Vite Playground
        </Text>
        <ComponentShowcase />
      </View>
    </View>
  );
}
