import React, { useEffect, useState, Suspense, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./Main.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";

import Loader from "./Loader";
import Page404 from "./Page404";
import Header from "./Header";
import Navbar from "./Navbar";
import Content from "./Content";
import Map from "./Map";
import Footer from "./Footer";

import pjson from "../../package.json";
import FullScreenContainer from "./FullScreenContainer";

console.log(`Version: ${pjson.version}`);

function Body() {
  const [fixed, setFixed] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isFixed = (_ev: Event) => {
      const navbar = navbarRef.current;

      if (navbar) {
        const navbarTop = navbar.getBoundingClientRect().y;

        if (navbarTop <= 0) {
          setFixed(true);
        } else {
          setFixed(false);
        }
      }
    };

    window.addEventListener("scroll", isFixed, true);

    return () => {
      window.removeEventListener("scroll", isFixed, true);
    };
  }, [fixed]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="body">
          <Navbar
            ref={navbarRef}
            style={{
              position: fixed ? "fixed" : "absolute",
            }}
          />
          <div className="content-container">
            <Switch>
              <Route exact path="/">
                <Content title="summary" />
                <Content title="skills" />
                <Content title="employment" />
                <Content title="education" />
              </Route>
              <Route path="/map">
                <FullScreenContainer>
                  <Map />
                </FullScreenContainer>
              </Route>
              <Route path="*">
                <Page404 />
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
const Main: React.FC = (): JSX.Element => {
  gsap.registerPlugin(ScrollTrigger);

  return (
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
};

export default Main;
