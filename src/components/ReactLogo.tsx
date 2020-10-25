import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo-react.svg";
import "./ReactLogo.scss";

export default function ReactLogo(): JSX.Element {
  const { t } = useTranslation();
  const [hide, setHide] = useState(false);

  return (
    <div className="dw-container">
      <div className="text-container">
        <p>{t("developed_with")} ReactJS </p>
        <div
          className={hide ? "hidden" : "fading-effect"}
          onAnimationEnd={() => setHide(true)}
        ></div>
      </div>
      <div className="logo-container">
        <img
          src={logo}
          className="logo"
          alt="React Logo"
          data-testid="react-logo"
        />
      </div>
    </div>
  );
}
