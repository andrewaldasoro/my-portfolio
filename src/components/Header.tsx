import React from "react";
import "./Header.scss";
import ProfileImage from "./ProfileImage.lazy";
import { mailto } from "../services/shared";
import { useTranslation } from "react-i18next";
// import { Navbar } from "react-bootstrap";

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="Header" data-testid="Header">
      {/* <Navbar /> TODO Responsive to all screen*/}
      <ProfileImage />
      <h1>
        <a href={mailto}>{t("greeting")} Kev Aldasoro.</a>
        {/* TODO add typing effect */}
      </h1>
    </div>
  );
};

export default Header;
