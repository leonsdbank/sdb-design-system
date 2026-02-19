import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press</Button>);
    fireEvent.click(screen.getByText("Press"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = vi.fn();
    render(
      <Button onPress={onPress} disabled>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByText("Default")).toBeTruthy();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toBeTruthy();

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText("Destructive")).toBeTruthy();

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toBeTruthy();

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText("Ghost")).toBeTruthy();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText("Small")).toBeTruthy();

    rerender(<Button size="default">Default</Button>);
    expect(screen.getByText("Default")).toBeTruthy();

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText("Large")).toBeTruthy();
  });

  it("renders ReactNode children", () => {
    const { container } = render(
      <Button>
        <span>Icon</span>
      </Button>
    );
    expect(container).toBeTruthy();
  });
});
