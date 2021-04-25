import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import * as yup from "yup";
import Tab from "../../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import SideBar from "../../components/SideBar";
import colorscheme from "../../utils/colors";
import ProfileBar from "../../components/ProfileBar";
import DashboardLayout from "../../components/DashboardLayout";
import { IoMdNotificationsOutline } from "react-icons/io";

const styleSheet = {
	root: {
		width: "95%",
		height: "100vh",
		margin: "0px auto",
		position: "relative",
		left: "-20px",
		flexGrow: "1",
	},
	notificationButtonContainer: {
		width: "35px",
		height: "35px",
		float: "right",
		position: "relative",
		top: "5px",
		right: "20px",
	},
	notificationIcon: {
		position: "absolute",
		cursor: "pointer",
	},
	notificationButton: {
		width: "35px",
		height: "35px",
		borderRadius: "50%",
		backgroundColor: colorscheme.red6,
	},
	topBar: {
		width: "1350px",
		height: "50px",
		marginTop: "50px",
	},
	botBar: {
		width: "1350px",
		height: "810px",
		marginTop: "20px",
	},
	leftContainer: {
		height: "810px",
	},
	middleContainer: {
		height: "810px",
	},
	rightContainer: {
		height: "810px",
	},
	activeClassBoxContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	classResourcesBoxContainer: {
		width: "400px",
		height: "510px",
		marginTop: "40px",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	discussionBoxContainer: {
		width: "400px",
		height: "800px",
		margin: "0px auto",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	postBoxContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	quizBoxContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		marginTop: "25px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
	tbdBoxContainer: {
		width: "400px",
		height: "250px",
		background: colorscheme.white,
		borderRadius: "15px",
		marginTop: "25px",
		boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
	},
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={styleSheet.root}
        wrap="nowrap"
      >
        <Grid item style={styleSheet.topBar}>
          <div style={styleSheet.notificationButtonContainer}>
            <IoMdNotificationsOutline
              size={35}
              color={colorscheme.red4}
              style={styleSheet.notificationIcon}
            ></IoMdNotificationsOutline>
            <Button colorStyles={styleSheet.notificationButton} />
          </div>
        </Grid>
        <Grid item style={styleSheet.botBar}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item style={styleSheet.leftContainer} xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={styleSheet.xdd}
              >
                <Grid item style={styleSheet.activeClassBoxContainer}></Grid>
                <Grid item style={styleSheet.classResourcesBoxContainer}></Grid>
              </Grid>
            </Grid>
            <Grid item style={styleSheet.middleContainer} xs={4}>
              <div style={styleSheet.discussionBoxContainer}></div>
            </Grid>
            <Grid item style={styleSheet.rightContainer} xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={styleSheet.xdd}
              >
                <Grid item style={styleSheet.postBoxContainer}></Grid>
                <Grid item style={styleSheet.quizBoxContainer}></Grid>
                <Grid item style={styleSheet.tbdBoxContainer}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
