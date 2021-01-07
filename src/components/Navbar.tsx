import React from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import EmojiLink from "./EmojiLink";
import { EmojiRE } from "./Emoji";
import changeColor from "../services/change-color";

String.prototype.toSentenceCase = function () {
  if (/\$|\.|\!|\*|\'|\(|\)|\,/.test(this.toString())) return this.toString();
  const symbols = /\-|\_|\+/;
  if (symbols.test(this.toString())) {
    return this.split(symbols)
      .map((s) => s.toSentenceCase())
      .join(" ");
  }

  return this.charAt(0).toUpperCase() + this.slice(1);
};

const Navbar: React.FC = () => {
  const location = useLocation();

  const routes = location.pathname.split("/").filter((route) => route !== "");

  const pwd = routes.map((route, i) => {
    const path = "/" + routes.slice(0, i + 1).join("/");

    if (EmojiRE.test(route)) {
      return (
        <React.Fragment key={i}>
          /{" "}
          <Link to={{ pathname: path }} component={EmojiLink}>
            {route}
          </Link>{" "}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={i}>
        /{" "}
        <Link key={i} to={{ pathname: path }}>
          {route.toSentenceCase()}
        </Link>{" "}
      </React.Fragment>
    );
  });

  return (
    <div className="Navbar" data-testid="Navbar">
      <Link
        replace
        to={{ pathname: "/" }}
        component={EmojiLink}
        onClick={() => changeColor("#f5df4d", "#000000")}
      >
        🏡
      </Link>{" "}
      /{" "}
      <Link replace to={{ pathname: "/" }} onClick={() => changeColor()}>
        Kev
      </Link>{" "}
      {pwd}
    </div>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
