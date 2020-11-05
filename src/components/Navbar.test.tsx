import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("<Navbar />", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const navbar = screen.getByTestId("Navbar");

    expect(navbar).toBeInTheDocument();
  });
});
