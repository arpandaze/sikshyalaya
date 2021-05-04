import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
import "./statics/css/commonView.css";

const schools = [
  {
    id: 1,
    title: "CS 2020",
    bottomText: "Mr. Nischal Khatri",
    button: true,
  },
  {
    id: 2,
    title: "CS 2019",
    bottomText: "Mr. Ayush Pokharel",
    button: true,
  },
  {
    id: 3,
    title: "CS 2018",
    bottomText: "Mr. Sagar Uprety",
    button: true,
  },
  {
    id: 4,
    title: "CS 2017",
    bottomText: "Mr. Ashish Dhakal",
    button: true,
  },
];
const DepartmentView = () => {
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
            <Grid xs item className="notesTextContainer">
              <p className="notesText">Computer Science and Engineering</p>
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
