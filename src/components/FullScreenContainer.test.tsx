import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FullScreenContainer from "./FullScreenContainer";

describe("<FullScreenContainer />", () => {
  test("it should mount", () => {
    render(<FullScreenContainer>hey</FullScreenContainer>);

    const fullScreenContainer = screen.getByTestId("FullScreenContainer");

    expect(fullScreenContainer).toBeInTheDocument();
  });
});
