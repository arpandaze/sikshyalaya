import React from "react";
import Grid from "@material-ui/core/Grid";
import SideBar from "./SideBar";
import ProfileBar from "./ProfileBar";
import "./statics/css/dashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <Grid container direction="row" className="dashboardLayout_mainRoot">
      <Grid sm={1} item className="dashboardLayout_sideBar">
        <SideBar />
      </Grid>
      <Grid sm={8} item className="dashboardLayout_mainArea">
        {children}
      </Grid>
      <Grid sm={3} item className="dashboardLayout_profileBar">
        <ProfileBar />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
