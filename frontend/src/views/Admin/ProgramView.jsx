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
    title: "Department of Chemical Science and Engineering",
    bottomText: "Dr. Rajendra Joshi",
    button: true,
  },
  {
    id: 2,
    title: "Department of Civil Engineering",
    bottomText: "Dr. Prachand Man Pradhan",
    button: true,
  },
  {
    id: 3,
    title: "Department of Computer Science and Engineering",
    bottomText: "Dr. Bal Krishna Bal",
    button: true,
  },
  {
    id: 4,
    title: "Department of Electrical and Electronics Engineering",
    bottomText: "Dr. Shailendra Kumar Jha",
    button: true,
  },
  {
    id: 5,
    title: "Department of Geomatics Engineering",
    bottomText: "Dr. Subash Ghimire",
    button: true,
  },
  {
    id: 6,
    title: "Department of Mechanical Engineering",
    bottomText: "Dr. Daniel Tualdhar",
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
