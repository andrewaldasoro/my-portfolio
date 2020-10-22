import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProfileImage from "./ProfileImage";

describe("<ProfileImage />", () => {
  test("it should mount", () => {
    render(<ProfileImage />);

    const profileImage = screen.getByTestId("ProfileImage");

    expect(profileImage).toBeInTheDocument();
  });
});
