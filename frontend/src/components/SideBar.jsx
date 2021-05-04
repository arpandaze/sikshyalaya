import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import icon from "../assets/icon.png";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import NavIcons from "../components/NavIcons";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: "1" },
  sideBar: {},
  logoContainer: {
    width: "85%",
    margin: "20px auto",
  },
  horizontalLine: {
    width: "60px",
    height: "1.5px",
    backgroundColor: colorscheme.grey2,
    opacity: "0.3",
    margin: "-10px auto",
  },
  iconContainer: {
    width: "85%",
    margin: "40px auto",
  },
  sidebarLink: {
    textDecoration: "none",
  },
  iconStyle: {
    cursor: "pointer",
  },
}));

const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    route: "/dashboard",
    icon: <AiOutlineDashboard size={30} />,
  },
  {
    id: 2,
    title: "Quiz",
    route: "/quiz",
    icon: <FaChalkboardTeacher size={30} />,
  },
  {
    id: 3,
    title: "Note",
    route: "/note",
    icon: <BiNotepad size={30} />,
  },
];

const SideBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="flex-center"
        className={classes.sideBar}
        spacing={2}
      >
        <Grid item className={classes.logoContainer}>
          <Link to="/">
            <Image src={icon} alt={{ icon }} />
          </Link>
        </Grid>
        <div className={classes.horizontalLine}></div>
        <Grid
          container
          item
          direction="column"
          justify="center"
          className={classes.iconContainer}
        >
          {sidebarItems.map((item) => (
            <Link to={item.route} className={classes.sidebarLink} key={item.id}>
              <NavIcons title={item.title} path={item.route} icon={item.icon} />
            </Link>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
