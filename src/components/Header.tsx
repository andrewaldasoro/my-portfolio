import React from "react";
import "./Header.scss";
import Navbar from "./Navbar";
import ProfileImage from "./ProfileImage.lazy";
import { mailto } from "../services/shared";

const Header: React.FC = () => {
  return (
    <div className="Header" data-testid="Header">
      <header className="header">
        <ProfileImage />
        <h1>
          <a href={mailto}>Kev Andrew ALDASORO CHAVARRIA</a>
        </h1>
        <Navbar />
      </header>
    </div>
  );
};

export default Header;
