import React, { CSSProperties } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  loader: {
    color: "var(--color)",
  },
}));

const Loader: React.FC<{ styles?: CSSProperties }> = ({ styles }) => {
  const classes = useStyles();
  return (
    <div className={classes.container} style={styles}>
      <CircularProgress
        className={classes.loader}
        size={100}
        thickness={2}
        data-testid="Loader"
      />
    </div>
  );
};

Loader.propTypes = {
  styles: PropTypes.any,
};
export default Loader;
