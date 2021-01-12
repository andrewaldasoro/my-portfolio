import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input: React.FC<any> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  const classNames = props.className + " input";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (ref && ref.current) {
        let path = ref?.current?.value;
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

        ref.current.value = "";
      }
    }
  };

  return (
    <input
      {...props}
      ref={ref}
      type="text"
      inputMode="url"
      className={classNames}
      onKeyPress={(e) => {
        handleKeyPress(e);
      }}
    />
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
