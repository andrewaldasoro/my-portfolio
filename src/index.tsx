import React from "react";
import { render } from "react-dom";
import "./index.scss";
import "./i18n";
import Main from "./components/Main";
import gsap from "gsap";

render(<Main />, document.getElementById("root"));

gsap.set("#cursor", { force3D: true });
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  gsap.to("#cursor", {
    x: x - 16,
    y: y - 16,
    ease: "power3",
  });
});

document.body.addEventListener("mouseleave", () => {
  gsap.to("#cursor", {
    scale: 0,
    duration: 0.1,
    ease: "none",
  });
});

document.body.addEventListener("mouseenter", () => {
  if (
    document.getElementById("cursor") &&
    (document.getElementById("cursor") as HTMLDivElement).style.display === ""
  ) {
    (document.getElementById("cursor") as HTMLDivElement).style.display =
      "block";
  }

  gsap.to("#cursor", {
    scale: 1,
    duration: 0.1,
    ease: "none",
  });
});

const textContainers = document.querySelectorAll('[data-cursor="text"]');

textContainers.forEach((container) => {
  container.addEventListener("mouseenter", () => {
    gsap.to("#cursor", {
      borderRadius: 0,
      width: "10px",
      scale: 0.6,
      duration: 0.2,
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      borderRadius: "50%",
      width: "32px",
      scale: 1,
      duration: 0.2,
    });
  });
});

[...document.getElementsByTagName("a")].forEach((element) => {
  element.setAttribute("data-cursor", "pointer");
});
const pointerContainers = document.querySelectorAll('[data-cursor="pointer"]');

pointerContainers.forEach((container) => {
  container.addEventListener("mouseenter", () => {
    gsap.to("#cursor", {
      scale: 0.5,
      duration: 0.2,
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to("#cursor", {
      scale: 1,
      duration: 0.2,
    });
  });
});
