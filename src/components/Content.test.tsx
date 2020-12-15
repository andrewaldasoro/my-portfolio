import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Content from "./Content";

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

describe("<content />", () => {
  test("it should mount", () => {
    render(<Content title="summary" />);

    const content = screen.getByTestId("content");

    expect(content).toBeInTheDocument();
  });
});
