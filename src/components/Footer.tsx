import React, { useEffect } from "react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";
import Emoji from "./Emoji";
import ReactLogo from "./ReactLogo";
import githubLogo from "../assets/logo-github.svg";
import linkedinLogo from "../assets/logo-linkedin.svg";
import trelloLogo from "../assets/logo-trello.svg";
import { Button } from "react-bootstrap";

import pjson from "../../package.json";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.title = t("title") + " - Kev";
  };
  const mailto: string =
    "mailto:" +
    pjson.author.email +
    "?subject=" +
    t("email.subject") +
    "&body=" +
    t("email.body");

  useEffect(() => {
    document.title = t("title") + " - Kev";
  }, [t]);

  return (
    <>
      <footer id="bottom" className="Footer" data-testid="Footer">
        <ReactLogo />
        <address>
          {t("email.trans")}: <a href={mailto}>{pjson.author.email}</a>
          <div className="social-networks">
            <a
              href="https://github.com/andrewaldasoro/cv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubLogo} alt="GitHub" title="GitHub" />
            </a>
            <a
              href="https://linkedin.com/in/andrewaldasoro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinLogo} alt="LinkedIn" title="LinkedIn" />
            </a>
            <a
              href="https://trello.com/b/2lJcsfa0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={trelloLogo} alt="Trello" title="Trello" />
            </a>
          </div>
        </address>
        <div className="language">
          <Button type="button" onClick={() => changeLanguage("es")}>
            {new Emoji("ES 🌮", t("spanish")).render()}
          </Button>
          <Button type="button" onClick={() => changeLanguage("en")}>
            {new Emoji("EN 🍁", t("english")).render()}
          </Button>
          <Button type="button" onClick={() => changeLanguage("fr")}>
            {new Emoji("FR 🥖", t("french")).render()}
          </Button>
        </div>
        <div className="version">Version: {pjson.version}</div>
      </footer>
    </>
  );
};

export default Footer;
