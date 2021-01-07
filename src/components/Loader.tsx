import React from "react";
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

const Loader: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress
        className={classes.loader}
        size={100}
        thickness={2}
        data-testid="Loader"
      />
    </div>
  );
};
export default Loader;
