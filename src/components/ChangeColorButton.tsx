import React, { CSSProperties } from "react";
import Button from "@material-ui/core/Button";
import changeColor from "../services/change-color";

const ChangeColorButton: React.FC = () => {
  const style: CSSProperties = {
    position: "fixed",
    top: "10px",
    right: "10px",
    color: "var(--color)",
    backgroundColor: "var(--background-color)",
    border: "2px solid var(--color)",
    zIndex: 9,
  };
  return (
    <Button style={style} onClick={() => changeColor()}>
      Change Color
    </Button>
  );
};

export default ChangeColorButton;
