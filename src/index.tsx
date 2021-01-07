import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./i18n";
import Main from "./components/Main";

ReactDOM.render(<Main />, document.getElementById("root"), () => {
  setTimeout(() => {
    document.body.style.transition =
      "background-color 0.5s ease, color 0.5s ease";
  }, 500); // With no Timeout starts on white
});
