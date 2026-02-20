import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
} from "@sdbank/ui";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-8">
      <Text variant="subheading" size="lg" className="mb-3">
        {title}
      </Text>
      {children}
    </View>
  );
}

function ButtonShowcase() {
  return (
    <Section title="Button">
      <Text variant="muted" size="xs" className="mb-2">
        Variants
      </Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </View>

      <Text variant="muted" size="xs" className="mb-2">
        Sizes
      </Text>
      <View className="flex-row flex-wrap items-center gap-2 mb-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </View>

      <Text variant="muted" size="xs" className="mb-2">
        Disabled
      </Text>
      <View className="flex-row flex-wrap gap-2">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </View>
    </Section>
  );
}

function TextShowcase() {
  return (
    <Section title="Text">
      <Text variant="muted" size="xs" className="mb-2">
        Variants
      </Text>
      <View className="gap-1 mb-4">
        <Text variant="heading" size="xl">
          Heading
        </Text>
        <Text variant="subheading">Subheading</Text>
        <Text variant="default">Default text</Text>
        <Text variant="muted">Muted text</Text>
        <Text variant="destructive">Destructive text</Text>
      </View>

      <Text variant="muted" size="xs" className="mb-2">
        Sizes
      </Text>
      <View className="gap-1">
        <Text size="xs">Extra Small (xs)</Text>
        <Text size="sm">Small (sm)</Text>
        <Text size="base">Base</Text>
        <Text size="lg">Large (lg)</Text>
        <Text size="xl">Extra Large (xl)</Text>
        <Text size="2xl">2XL</Text>
        <Text size="3xl">3XL</Text>
      </View>
    </Section>
  );
}

function CardShowcase() {
  return (
    <Section title="Card">
      <View className="gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>
              A simple card with header and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This is the card content area.</Text>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Styled Card</CardTitle>
            <CardDescription>Card with custom colors</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Cards accept className for custom styling.</Text>
          </CardContent>
        </Card>
      </View>
    </Section>
  );
}

function InputShowcase() {
  const [value, setValue] = useState("");

  return (
    <Section title="Input">
      <View className="gap-4">
        <Input placeholder="Default input" />

        <Input label="With Label" placeholder="Enter something..." />

        <Input
          label="With Error"
          placeholder="Invalid input"
          error="This field is required"
        />

        <Input
          label="Controlled"
          placeholder="Type here..."
          value={value}
          onChangeText={setValue}
        />
        {!!value && (
          <Text variant="muted" size="xs">
            Value: {value}
          </Text>
        )}

        <Input
          label="Disabled"
          placeholder="Cannot edit"
          editable={false}
        />
      </View>
    </Section>
  );
}

export function ComponentShowcase() {
  return (
    <View>
      <ButtonShowcase />
      <TextShowcase />
      <CardShowcase />
      <InputShowcase />
    </View>
  );
}
