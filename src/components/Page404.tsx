import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import changeColor from "../services/change-color";
import "./Page404.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page404: React.FC<any> = (props) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (props.location.state) {
      setPathname(props.location.state.referrer);
    }
    changeColor("#ff6347", "#000000");

    return () => {
      changeColor();
    };
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
