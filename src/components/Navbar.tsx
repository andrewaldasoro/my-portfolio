import React from "react";
import { Link } from "react-router-dom";
import { StringUtils } from "../utils";
import { EmojiRE } from "./Emoji";
import Input from "./Input";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const routes = location.pathname.split("/").filter((route) => route !== "");

  const pwd = routes.map((route, i) => {
    const path = "/" + routes.slice(0, i + 1).join("/");

    if (EmojiRE.test(route)) {
      /* TODO: <Link to={{ pathname: path }} component={EmojiLink}>
            {route}
            </Link>{" "} */
      return (
        <React.Fragment key={i}>
          / <Link to={{ pathname: path }}>{route}</Link>{" "}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={i}>
        /{" "}
        <Link key={i} to={{ pathname: path }}>
          {StringUtils.toSentenceCase(route)}
        </Link>{" "}
      </React.Fragment>
    );
  });

  return (
    <div className="Navbar" data-testid="Navbar">
      <Link replace to={{ pathname: "/" }}>
        🏡
      </Link>{" "}
      /{" "}
      <Link replace to={{ pathname: "/" }}>
        Kev
      </Link>{" "}
      {pwd} / <Input maxLength={50} />
    </div>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
