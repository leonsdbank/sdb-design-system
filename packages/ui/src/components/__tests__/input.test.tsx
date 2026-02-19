import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("renders label when provided", () => {
    render(<Input label="Email" placeholder="email@example.com" />);
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("renders error message when provided", () => {
    render(<Input error="This field is required" placeholder="test" />);
    expect(screen.getByText("This field is required")).toBeTruthy();
  });

  it("handles text changes", () => {
    const onChangeText = vi.fn();
    render(
      <Input placeholder="Type here" onChangeText={onChangeText} />
    );
    fireEvent.change(screen.getByPlaceholderText("Type here"), {
      target: { value: "Hello" },
    });
    expect(onChangeText).toHaveBeenCalledWith("Hello");
  });

  it("renders without label and error", () => {
    render(<Input placeholder="Simple input" />);
    expect(screen.getByPlaceholderText("Simple input")).toBeTruthy();
  });
});
