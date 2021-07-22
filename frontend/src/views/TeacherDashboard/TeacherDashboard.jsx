import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/teacherDashboard.css";
import Profile from "./../../assets/pp.jpg";
import colorscheme from "../../utils/colors";
import { ImCross } from "react-icons/im";
import Student from "./components/Student";

const users = [
  {
    id: 1,
    name: "Yughyaya Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 2,
    name: "Yugesh Upadhyitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 3,
    name: "Yugesh Upaya Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 4,
    name: "Yugesh Upadh",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 5,
    name: "Yugesh Upadhyaitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 6,
    name: "Yugesh Upadhytel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 7,
    name: "Yugesh Upadteasdlsasasadasdadadas",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 8,
    name: "Yugeadhyaya Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 9,
    name: "Yugesh Upa Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 10,
    name: "Yuga Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 11,
    name: "Yuga Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 12,
    name: "Yuga Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 13,
    name: "Yuga Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 14,
    name: "Yuga Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
];

const TeacherDashbaord = () => {
  const [popup, setPopup] = useState(false);
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
        className="teacherDash_root"
      >
        <Grid item className="teacherDash_topBar"></Grid>
        <Grid item className="teacherDash_botBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="teacherDash_leftContainer" xs={4}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  className="teacherDash_activeClassBoxContainer"
                ></Grid>
                <Grid item className="teacherDash_attendanceContainer"></Grid>
              </Grid>
            </Grid>
            <Grid item className="teacherDash_rightContainer" xs={8}>
              <div className="teacherDash_discussionBoxContainer"></div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default TeacherDashbaord;
