import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";
import { Text } from "../text";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>
    );
    expect(screen.getByText("Card content")).toBeTruthy();
  });

  it("renders full card composition", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Content here</Text>
        </CardContent>
        <CardFooter>
          <Text>Footer</Text>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();
    expect(screen.getByText("Content here")).toBeTruthy();
    expect(screen.getByText("Footer")).toBeTruthy();
  });

  it("accepts custom className", () => {
    render(
      <Card testID="card" className="bg-red-500">
        <Text>Styled</Text>
      </Card>
    );
    expect(screen.getByTestId("card")).toBeTruthy();
  });
});
