import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

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
