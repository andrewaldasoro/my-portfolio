import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./i18n";
import Main from "./components/Main";
import * as serviceWorker from "./serviceWorker";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
import { TextPlugin } from "gsap/src/TextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
