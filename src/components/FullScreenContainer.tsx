import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import "./FullScreenContainer.scss";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Emoji from "./Emoji";

const FullScreenContainer: React.FC<{ children: ReactNode }> = (props) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isShowHint = isMouseIn && !isFullScreen;

  return (
    <>
      {
        /* To keep the space and don't have to scroll down every time returning full screen */
        isFullScreen ? <div className="full-screen-container"></div> : null
      }
      <div
        className={isFullScreen ? "full-screen-mode" : "full-screen-container"}
        data-testid="FullScreenContainer"
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
        onTouchStart={() => setIsMouseIn(true)}
        onTouchEnd={() => setIsMouseIn(false)}
        onClick={() => {
          if (!isFullScreen) setIsFullScreen(true);
        }}
      >
        {props.children}
        {isShowHint ? (
          <div className="prevent-touch advice">
            <p>Click to full screen mode.</p>
          </div>
        ) : !isFullScreen ? (
          <div className="prevent-touch"></div>
        ) : null}
        {isFullScreen ? (
          <Button
            onClick={() => {
              setIsFullScreen(false);
            }}
            className="return-button"
          >
            {new Emoji("◀", "Return").render()}
          </Button>
        ) : null}
      </div>
    </>
  );
};

FullScreenContainer.propTypes = {
  children: PropTypes.element,
};

export default FullScreenContainer;
