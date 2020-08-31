import React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import { PrimaryColor } from "../Colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  logoDiv: {
    display: "flex !important",
    alignItems: "center",
    width: "170px",
    marginLeft: "15px",
    paddingTop: "5px",
  },
  logo: {
    borderRadius: "50%",
    backgroundColor: PrimaryColor,
    marginRight: "5px",
    margin: "auto",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    webkitFilter: "invert(100%)",
    filter: "invert(100%)",
  },
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.logoDiv}>
      <div className={classes.logo}>
        <DashboardIcon className={classes.svg} />
      </div>
      <h3>Notes Manager</h3>
    </div>
  );
};

export default Logo;
