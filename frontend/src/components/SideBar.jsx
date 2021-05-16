import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import iconbig from "../assets/logo-big.png";
import iconsmall from "../assets/logo-small.png";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import NavIcons from "../components/NavIcons";
import "./statics/css/sideBar.css";

const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    route: "/dashboard",
    icon: <AiOutlineDashboard className="sideBar_iconStyle" />,
  },
  {
    id: 2,
    title: "Quiz",
    route: "/quiz",
    icon: <FaChalkboardTeacher className="sideBar_iconStyle" />,
  },
  {
    id: 3,
    title: "Note",
    route: "/note",
    icon: <BiNotepad className="sideBar_iconStyle" />,
  },
];

const SideBar = () => {
  return (
    <div className="sideBar_root">
      <Grid
        container
        direction="column"
        alignItems="flex-center"
        className="sideBar_sideBar"
      >
        <Grid item className="sideBar_logoContainerBig">
          <Link to="/">
            <Image src={iconbig} alt={{ iconbig }} />
          </Link>
        </Grid>
        <div className="sideBar_horizontalLine"></div>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          justify="center"
          className="sideBar_iconContainer"
        >
          {sidebarItems.map((item) => (
            <Link to={item.route} className="sideBar_sidebarLink" key={item.id}>
              <NavIcons title={item.title} path={item.route} icon={item.icon} />
            </Link>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
