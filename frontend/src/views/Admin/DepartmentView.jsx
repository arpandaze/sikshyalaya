import React, { useState } from "react";
import Button from "../../components/Button";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";

const schools = [
  {
    id: 1,
    title: "Department of Computer Engineering",
    bottomText: "Dr. Bal Krishna Bal",
    button: true,
  },
  {
    id: 2,
    title: "Department of Computer Science",
    bottomText: "Dr. Bal Krishna Bal",
    button: true,
  },
];
const DepartmentView = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className="root"
        wrap="nowrap"
      >
        <Grid item className="topBar">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid xs={11} item className="notesTextContainer">
              <a className="notesText">Computer Science and Engineering</a>
            </Grid>
            <Grid xs={1} item className="plusIcon">
              <GoPlus size={30} color={colorscheme.green2} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="botBar">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            {schools.map((school) => (
              <Grid item key={school.id} xs={6}>
                <AdminBoxSmall cardData={school} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default DepartmentView;
