import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./Main.scss";
import Emoji from "./Emoji";
import Navbar from "./Navbar";
import ProfileImage from "./ProfileImage";
import ReactLogo from "./ReactLogo";
import Content from "./Content";
import Map from "./Map";

import githubLogo from "../assets/logo-github.svg";
import linkedinLogo from "../assets/logo-linkedin.svg";
import trelloLogo from "../assets/logo-trello.svg";

import pjson from "../../package.json";

console.log(`Version: ${pjson.version}`);

function Body() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const mailto: string =
    "mailto:" +
    pjson.author.email +
    "?subject=" +
    t("mail.subject") +
    "&body=" +
    t("mail.body");

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <ProfileImage />
          <h1>
            <a href={mailto}>Kev Andrew ALDASORO CHAVARRIA</a>
          </h1>
          <Navbar />
        </header>
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Content title="summary" />
              <Content title="skills" />
              <Content title="employment" />
              <Content title="education" />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
          </Switch>
          <footer id="bottom" className="footer">
            <ReactLogo />
            <address>
              Email: <a href={mailto}>{pjson.author.email}</a>
              <br />
              <a
                href="https://github.com/andrewaldasoro/cv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={githubLogo} alt="GitHub" title="GitHub" />
              </a>
              <br />
              <a
                href="https://linkedin.com/in/andrewaldasoro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinLogo} alt="LinkedIn" title="LinkedIn" />
              </a>
              <br />
              <a
                href="https://trello.com/b/2lJcsfa0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={trelloLogo} alt="Trello" title="Trello" />
              </a>
            </address>
            <button onClick={() => changeLanguage("es")}>
              {new Emoji("ES 🌮", t("spanish")).render()}
            </button>
            <button onClick={() => changeLanguage("en")}>
              {new Emoji("EN 🍁", t("english")).render()}
            </button>
            <div className="version">{pjson.version}</div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>Loader</div> {/* TODO */}
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
const Main = (): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <Body />
  </Suspense>
);

export default Main;
