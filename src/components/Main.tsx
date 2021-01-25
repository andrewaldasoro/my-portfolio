import React, { CSSProperties, Suspense, useEffect } from "react";
import "./Main.scss";

import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import Loader from "./Loader";
import Page404 from "./Page404";
import Navbar from "./Navbar";

import changeColor from "../services/change-color";
import pjson from "../../package.json";
// import ChangeColorButton from "./ChangeColorButton";

console.log(`Version: ${pjson.version}`);

const Home = () => {
  const { t } = useTranslation();
  const style: CSSProperties = {
    fontSize: "8em",
    fontWeight: "bold",
    gridColumn: "1 / -1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    const colors = {
      backgroundColor: localStorage.getItem("backgroundColor") || undefined,
      color: localStorage.getItem("color") || undefined,
    };
    if (colors.backgroundColor && colors.color) {
      changeColor(colors.backgroundColor, colors.color);
    } else {
      changeColor("#f5ce4d", "#000000");
    }
  }, []);

  return (
    <div style={style}>
      {t("greeting")} 👋{t("🌐")}
    </div>
  );
};

const Body: React.FC = () => {
  const currentLocation = useLocation().pathname;

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/404" render={(props) => <Page404 {...props} />} />
        <Route path="*">
          <Redirect
            to={{
              pathname: "/404/",
              state: { referrer: currentLocation },
            }}
          />
        </Route>
      </Switch>
      {/* <ChangeColorButton /> */}
    </>
  );
};

// Here app catches the suspense from page in case translations are not yet loaded
const Main: React.FC = () => (
  <HashRouter>
    <Suspense fallback={<Loader />}>
      <Body />
    </Suspense>
  </HashRouter>
);

export default Main;
