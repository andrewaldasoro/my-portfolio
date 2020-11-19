import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./Main.scss";

import Content from "./Content";
import Map from "./Map";

import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";

import pjson from "../../package.json";

console.log(`Version: ${pjson.version}`);

function Body() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="body">
          <div className="content-container">
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
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
const Main: React.FC = (): JSX.Element => (
  <Suspense
    fallback={
      <div className="loading">
        <Loader />
      </div>
    }
  >
    <Body />
  </Suspense>
);

export default Main;
