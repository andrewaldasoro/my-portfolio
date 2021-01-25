import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Input.scss";
import { StringUtils } from "../utils";

const routes = ["/skills", "/experience", "/education"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input: React.FC<any> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [hint, setHint] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Backspace" || key === "Escape") {
      setHint("");
      return;
    }

    if (key === "Tab") {
      e.preventDefault();
      if (hint) {
        setValue(hint);
      }
      setHint("");
      return;
    }

    if (key === "Enter") {
      if (inputRef && inputRef.current) {
        let path = value;
        let actualPath = location.hash;

        if (!actualPath.endsWith("/")) {
          actualPath += "/";
        }

        if (path.startsWith("/") || path.startsWith("~")) {
          const spreadedPath = [...path];
          spreadedPath.shift();
          path = spreadedPath.join("");

          actualPath = "#/";
        }

        if (path.includes("/")) {
          const paths = path.split("/").filter((r) => r !== "");
          paths.forEach((p) => {
            if (p === "..") {
              if (actualPath !== "#/") {
                const actualPaths = actualPath
                  .split("/")
                  .filter((p) => p !== "");
                actualPaths.pop();
                if (actualPaths.length === 1) {
                  actualPath = "#/";
                } else {
                  actualPath = actualPaths.join("/");
                }
              }
            } else {
              actualPath += p + "/";
            }
          });
        } else {
          if (path === "..") {
            if (actualPath !== "#/") {
              const actualPaths = actualPath.split("/").filter((p) => p !== "");
              actualPaths.pop();
              if (actualPaths.length === 1) {
                actualPath = "#/";
              } else {
                actualPath = actualPaths.join("/");
              }
            }
          } else {
            actualPath += path;
          }
          if (!actualPath.endsWith("/")) {
            actualPath += "/";
          }
        }
        location.href = location.origin + "/" + actualPath;

        setValue("");
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let actualPath = location.hash.substring(1);

    if (!actualPath.endsWith("/")) {
      actualPath += "/";
    }

    const filteredRoutes = routes
      .filter((r) => r.startsWith(actualPath))
      .map((r) => r.split("/")[1]);

    filteredRoutes.push(
      ...filteredRoutes.map((r) => StringUtils.toSentenceCase(r))
    );

    setHint(filteredRoutes.find((r) => r.startsWith(value + e.key)) || "");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ position: "relative", width: "150px" }}>
      <div ref={hintRef} className="autocomplete">
        {hint}
      </div>
      <input
        {...props}
        ref={inputRef}
        type="text"
        inputMode="url"
        className="input"
        value={value}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        onChange={handleOnChange}
        autoComplete="off"
        data-cursor="text"
      />
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.object,
        PropTypes.string,
      ])
    ),
  ]),
};

export default Input;
