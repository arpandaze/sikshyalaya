import React, { useState, useContext } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiSurveyLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscTelescope } from "react-icons/vsc";
import { BsBook } from "react-icons/bs";
import Grid from "@material-ui/core/Grid";
import iconbig from "../../assets/logo-large.svg";
import Image from "../Image";
import { Link } from "react-router-dom";
import NavIcons from "./NavIcons";
import "./statics/css/sideBar.css";
import { UserContext } from "../../utils/Contexts/UserContext";
import configs from "../../utils/configs";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const sidebarItems = [
  //Student
  [
    {
      id: 1,
      title: "Dashboard",
      route: "/class",
      icon: <AiOutlineDashboard className="sideBar_iconStyle" />,
    },
    {
      id: 2,
      title: "Profile",
      route: "/profile",
      icon: <IoPersonOutline className="sideBar_iconStyle" />,
    },
    {
      id: 3,
      title: "Quiz",
      route: "/quiz",
      icon: <RiSurveyLine className="sideBar_iconStyle" />,
    },
    {
      id: 4,
      title: "Note",
      route: "/note",
      icon: <BiNotepad className="sideBar_iconStyle" />,
    },
  ],
  //Teacher
  [
    {
      id: 1,
      title: "Dashboard",
      route: "/teacher-dashboard",
      icon: <AiOutlineDashboard className="sideBar_iconStyle" />,
    },
    {
      id: 2,
      title: "Quiz",
      route: "/quiz-creator-landing",
      icon: <RiSurveyLine className="sideBar_iconStyle" />,
    },
    {
      id: 3,
      title: "Class",
      route: "/class-session-create",
      icon: <FaChalkboardTeacher className="sideBar_iconStyle" />,
    },
    {
      id: 4,
      title: "Note",
      route: "/teacher/note",
      icon: <BiNotepad className="sideBar_iconStyle" />,
    },
  ],
  //Admin
  [
    {
      id: 1,
      title: "Dashboard",
      route: "/admin",
      icon: <AiOutlineDashboard className="sideBar_iconStyle" />,
    },
    {
      id: 2,
      title: "Explore",
      route: "/admin/explore",
      icon: <VscTelescope className="sideBar_iconStyle" />,
    },
    {
      id: 3,
      title: "Student",
      route: "/admin/student",
      icon: <IoPersonOutline className="sideBar_iconStyle" />,
    },
    {
      id: 4,
      title: "Teachers",
      route: "/admin/teacher",
      icon: <FaChalkboardTeacher className="sideBar_iconStyle" />,
    },
    {
      id: 5,
      title: "Courses",
      route: "/admin/courses",
      icon: <BsBook className="sideBar_iconStyle" />,
    },
  ],
];

const SideBar = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const admin = configs.USER_TYPES.ADMIN === user.user_type;
  const teacher = configs.USER_TYPES.TEACHER === user.user_type;
  const [buttonType, setButtonType] = useState(true);

  return (
    <div className="sideBar_root">
      <Grid
        container
        direction="column"
        alignItems="center"
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
          {sidebarItems[admin ? 2 : teacher ? 1 : 0].map((item) => (
            <Link to={item.route} className="sideBar_sidebarLink" key={item.id}>
              <NavIcons title={item.title} path={item.route} icon={item.icon} />
            </Link>
          ))}
        </Grid>
        <div className="sideBar_logOutContainer">
          <Button
            onMouseOver={() => {
              setButtonType(false);
            }}
            onMouseOut={() => {
              setButtonType(true);
            }}
            variant="outlined"
            color="primary"
            startIcon={<RiLogoutBoxLine className="logoutButton_icon" />}
            onClick={() => {
              history.push({
                pathname: "/logout",
              });
            }}
            className="sideBar_logOutButton"
          >
            Logout
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default SideBar;
