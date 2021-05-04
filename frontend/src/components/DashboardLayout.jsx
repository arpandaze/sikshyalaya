import React from "react";
import Grid from "@material-ui/core/Grid";
import SideBar from "../components/SideBar";
import ProfileBar from "../components/ProfileBar";

const styleSheet = {
  mainRoot: {
    flexGrow: "1",
    width: "100vw",
    maxWidth: "1920px",
    margin: "0px auto",
  },
  sideBar: {
    height: "100vh",
    borderRight: "1px solid rgba(127,127,127,0.2)",
  },
  mainArea: {
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    overflowY: "scroll",
  },
  profileBar: {
    height: "100vh",
    cursor: "pointer",
    borderLeft: "1px solid rgba(127,127,127,0.2)",
  },
};

const DashboardLayout = ({ children }) => {
  return (
    <Grid container direction="row" style={styleSheet.mainRoot}>
      <Grid xs={1} item style={styleSheet.sideBar}>
        <SideBar />
      </Grid>
      <Grid xs={8} item style={styleSheet.mainArea}>
        {children}
      </Grid>
      <Grid xs={3} item style={styleSheet.profileBar}>
        <ProfileBar />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
