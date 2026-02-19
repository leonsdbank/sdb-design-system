import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "../text";

describe("Text", () => {
  it("renders children text", () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("renders with heading variant", () => {
    render(
      <Text variant="heading" size="2xl">
        Heading
      </Text>
    );
    expect(screen.getByText("Heading")).toBeTruthy();
  });

  it("renders with muted variant", () => {
    render(<Text variant="muted">Muted text</Text>);
    expect(screen.getByText("Muted text")).toBeTruthy();
  });

  it("renders with destructive variant", () => {
    render(<Text variant="destructive">Error</Text>);
    expect(screen.getByText("Error")).toBeTruthy();
  });

  it("renders with all sizes", () => {
    const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Text size={size}>size-{size}</Text>);
      expect(screen.getByText(`size-${size}`)).toBeTruthy();
      unmount();
    });
  });

  it("passes through additional props", () => {
    render(
      <Text testID="my-text" numberOfLines={1}>
        Truncated
      </Text>
    );
    expect(screen.getByTestId("my-text")).toBeTruthy();
  });
});
