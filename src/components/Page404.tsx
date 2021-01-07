import React, { useEffect, useState } from "react";
import "./Page404.scss";
import { RouteComponentProps } from "react-router-dom";
import PropTypes from "prop-types";
import changeColor from "../services/change-color";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page404: React.FC<RouteComponentProps<any, any, any>> = (props) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (props.location.state) {
      setPathname(props.location.state.referrer);
    }
    changeColor("#ff6347", "#000000");
  }, []);

  return (
    <div className="Page404">
      <p>Error404</p>
      {pathname ? <div>Not Found: {pathname}</div> : null}
    </div>
  );
};

Page404.propTypes = {
  location: PropTypes.any,
};

export default Page404;
