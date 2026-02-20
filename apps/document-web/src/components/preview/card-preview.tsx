"use client";

import {
  Button,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@sdbank/ui";
import { View } from "react-native";

export function CardPreview() {
  return (
    <View className="gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description of the card.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card content goes here. You can place any components inside.</Text>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle>Custom Styled</CardTitle>
          <CardDescription>Cards accept a className prop for custom styling.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted">Compose with any @sdbank/ui components inside.</Text>
        </CardContent>
      </Card>
    </View>
  );
}
