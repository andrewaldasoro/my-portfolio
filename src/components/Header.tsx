import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import ProfileImage from "./ProfileImage";
import { INNER_HEIGHT, mailto } from "../services/shared";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [fixed, setFixed] = useState(false);
  const navbar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isFixed = (_ev: Event) => {
      if (window.pageYOffset >= INNER_HEIGHT) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener("scroll", isFixed, true);

    return () => {
      window.removeEventListener("scroll", isFixed, true);
    };
  }, [fixed]);

  return (
    <div
      id="Header"
      className={"Header " + (fixed ? "padding-bottom" : "")}
      data-testid="Header"
    >
      <div className="first-header">
        <ProfileImage />
        <h1>
          <a href={mailto}>{t("greeting")} Kev Aldasoro.</a>
          {/* TODO add typing effect */}
        </h1>
      </div>
      <div className={fixed ? "fixed" : ""} ref={navbar}>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
