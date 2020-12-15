import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FullScreenContainer from "./FullScreenContainer";

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

describe("<FullScreenContainer />", () => {
  test("it should mount", () => {
    render(
      <FullScreenContainer>
        <></>
      </FullScreenContainer>
    );

    const fullScreenContainer = screen.getByTestId("FullScreenContainer");

    expect(fullScreenContainer).toBeInTheDocument();
  });
});
