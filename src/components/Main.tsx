import React, { CSSProperties, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import pjson from "../../package.json";
import changeColor from "../services/change-color";
import Loader from "./Loader";
import "./Main.scss";
import Navbar from "./Navbar";
import Page404 from "./Page404";
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
    textAlign: "center",
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
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      {/* <ChangeColorButton /> */}
    </>
  );
};

// Here app catches the suspense from page in case translations are not yet loaded
const Main: React.FC = () => (
  <HashRouter>
    <Suspense
      fallback={<Loader styles={{ gridColumn: "1 / -1", gridRow: "1 / -1" }} />}
    >
      <Body />
    </Suspense>
  </HashRouter>
);

export default Main;
