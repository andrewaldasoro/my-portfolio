import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./Navbar";
import { HashRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("<Navbar />", () => {
  test("it should mount", () => {
    render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );

    const navbar = screen.getByTestId("Navbar");

    expect(navbar).toBeInTheDocument();
  });
});
