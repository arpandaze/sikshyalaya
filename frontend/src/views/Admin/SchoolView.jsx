import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";

const schools = [
  {
    id: 1,
    title: "School of Science",
    bottomText: "Dr. Kanhaiya Jha",
    button: true,
  },
  {
    id: 2,
    title: "School of Engineering",
    bottomText: "Prof. Manish Pokharel",
    button: true,
  },
  {
    id: 3,
    title: "School of Law",
    bottomText: "Dr. Rishikesh Wagle",
    button: true,
  },
  {
    id: 4,
    title: "School of Arts",
    bottomText: "Dr. Sagar Raj Sharma",
    button: true,
  },
];
const SchoolView = () => {
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className="adminCommon_root"
        wrap="nowrap"
      >
        <Grid item className="adminCommon_topBarContainer">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="adminCommon_topBar"
          >
            <Grid xs item className="adminCommon_textContainer">
              <p className="adminCommon_text">
                Computer Science and Engineering
              </p>
            </Grid>
            <Grid xs={1} item className="adminCommon_plusIcon">
              <GoPlus size={30} color={colorscheme.green2} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="adminCommon_botBar">
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

export default SchoolView;
