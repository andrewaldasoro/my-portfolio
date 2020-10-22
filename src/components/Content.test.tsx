import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Content from "./Content";

describe("<content />", () => {
  test("it should mount", () => {
    render(<Content title="summary" />);

    const content = screen.getByTestId("content");

    expect(content).toBeInTheDocument();
  });
});
