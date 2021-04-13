import React, { useState } from "react";
import Button from "../components/Button";
import theme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import Image from "../components/Image";

const styleSheet = {
  sideBar: {
    height: "100vh",
    backgroundColor: theme.white,
  },
};

const SideBar = () => {
  return <div style={styleSheet.sideBar}></div>;
};

export default SideBar;
