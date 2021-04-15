import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import colorscheme from "../utils/colors";
import { AiOutlineDashboard } from "react-icons/ai";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import icon from "../assets/icon.png";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import NavIcons from "../components/NavIcons";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: "1" },
  sideBar: {
    margin: "0px",
    width: "60px",
    height: "100vh",
    backgroundColor: colorscheme.white,
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  horizontalLine: {
    width: "60px",
    height: "1.5px",
    backgroundColor: colorscheme.grey2,
    opacity: "0.3",
    marginTop: "3px",
    marginBottom: "5px",
  },

  sidebarLink: {
    textDecoration: "none",
    color: colorscheme.black,
  },
  iconStyle: {
    marginTop: "30px",
    cursor: "pointer",
  },
}));

const sidebarItems = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: <AiOutlineDashboard size={30} color={colorscheme.grey1} />,
    iconHovered: <AiOutlineDashboard size={30} color={colorscheme.red3} />,
  },
  {
    title: "Quiz",
    route: "/quiz",
    icon: <AiOutlineDashboard size={30} color={colorscheme.grey1} />,
    iconHovered: <AiOutlineDashboard size={30} color={colorscheme.red3} />,
  },
  {
    title: "Note",
    route: "/note",
    icon: <AiOutlineDashboard size={30} color={colorscheme.grey1} />,
    iconHovered: <AiOutlineDashboard size={30} color={colorscheme.red3} />,
  },
];

const SideBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [hovered, setHovered] = useState(false);
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="flex-center"
        className={classes.sideBar}
        spacing={2}
      >
        <Grid item>
          <Image src={icon} alt={{ icon }} />
        </Grid>
        <div className={classes.horizontalLine}></div>
        <Grid container direction="column" alignItems="center" justify="center">
          {sidebarItems.map((item, index) => (
            <Link to={item.route} className={classes.sidebarLink}>
              <NavIcons
                title={item.title}
                icon={item.icon}
                iconHovered={item.iconHovered}
              />
            </Link>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
