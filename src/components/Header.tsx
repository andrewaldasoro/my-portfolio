import React from "react";
import "./Header.scss";
import ProfileImage from "./ProfileImage";
import { mailto } from "../services/shared";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div id="Header" className="Header" data-testid="Header">
      <div className="first-header">
        <ProfileImage />
        <h1>
          <a href={mailto}>{t("greeting")} Kev Aldasoro.</a>
          {/* TODO add typing effect */}
        </h1>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
