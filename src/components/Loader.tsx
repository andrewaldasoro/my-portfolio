import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader: React.FC = () => (
  <Spinner
    className="Loader"
    data-testid="Loader"
    animation="border"
    role="status"
    variant="dark"
  />
);

export default Loader;
