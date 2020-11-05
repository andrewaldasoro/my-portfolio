import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("<Header />", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = screen.getByTestId("Header");

    expect(header).toBeInTheDocument();
  });
});
