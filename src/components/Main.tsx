import React, { Suspense, useEffect } from "react";
import "./Main.scss";

import Loader from "./Loader";

import pjson from "../../package.json";
import Navbar from "./Navbar";
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Map from "./Map";
import FullScreenContainer from "./FullScreenContainer";
import Page404 from "./Page404";
import changeColor from "../services/change-color";
import { useTranslation } from "react-i18next";
import ChangeColorButton from "./ChangeColorButton";

console.log(`Version: ${pjson.version}`);
const Test = () => {
  const { t } = useTranslation();
  const style = {
    fontSize: "8em",
  };

  useEffect(() => {
    changeColor("#f5df4d", "#000000");
  }, []);
  return <div style={style}> {t("greeting")} 👋🌐</div>;
};

// function usePageViews() {
//   const location = useLocation();
//   useEffect(() => {
//     ga.send(["pageview", location.pathname]);
//   }, [location]);
// }

function Body() {
  // usePageViews();
  const currentLocation = useLocation().pathname;

  return (
    <>
      <Navbar />
      <div className="body-container">
        <Switch>
          <Route exact path="/">
            <Test />
          </Route>
          <Route exact path="/(covid-)?map">
            <FullScreenContainer>
              <Map />
            </FullScreenContainer>
          </Route>
          <Route exact path="/404" render={(props) => <Page404 {...props} />} />
          <Route path="*">
            <Redirect
              to={{
                pathname: "/404",
                state: { referrer: currentLocation },
              }}
            />
          </Route>
        </Switch>
      </div>
      <ChangeColorButton />
    </>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
const Main: React.FC = (): JSX.Element => {
  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Body />
      </Suspense>
    </HashRouter>
  );
};

export default Main;
