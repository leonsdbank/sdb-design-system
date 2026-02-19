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
  Input,
} from "@sdb/ui";
import { useState } from "react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ButtonShowcase() {
  const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
  ] as const;
  const sizes = ["sm", "default", "lg"] as const;

  return (
    <Section title="Button">
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-500">Variants</h3>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button variant="default">
            disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-500">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
          <Button size="icon">+</Button>
        </div>
      </div>
    </Section>
  );
}

function TextShowcase() {
  const variants = [
    "default",
    "heading",
    "subheading",
    "muted",
    "destructive",
  ] as const;
  const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"] as const;

  return (
    <Section title="Text">
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-500">Variants</h3>
        <div className="space-y-2">
          {variants.map((variant) => (
            <Text key={variant} variant={variant}>
              {variant} — The quick brown fox jumps over the lazy dog
            </Text>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-500">Sizes</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
            <Text key={size} size={size}>
              {size} — The quick brown fox
            </Text>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CardShowcase() {
  return (
    <Section title="Card">
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>A simple card with all sub-components</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>
              This card demonstrates the composable Card API with Header, Title,
              Description, Content, and Footer.
            </Text>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Styled Card</CardTitle>
            <CardDescription>With custom className overrides</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>
              Cards accept className for custom styling via Tailwind utilities.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  );
}

function InputShowcase() {
  const [value, setValue] = useState("");

  return (
    <Section title="Input">
      <div className="max-w-sm space-y-4">
        <Input label="Default Input" placeholder="Type something..." />

        <Input
          label="Controlled Input"
          placeholder="Type here..."
          value={value}
          onChangeText={setValue}
        />
        {value ? (
          <Text variant="muted" size="sm">
            Value: {value}
          </Text>
        ) : null}

        <Input
          label="With Error"
          placeholder="Invalid input"
          error="This field is required"
        />

        <Input
          label="Disabled"
          placeholder="Cannot edit"
          editable={false}
        />
      </div>
    </Section>
  );
}

export function ComponentShowcase() {
  return (
    <div>
      <ButtonShowcase />
      <TextShowcase />
      <CardShowcase />
      <InputShowcase />
    </div>
  );
}
