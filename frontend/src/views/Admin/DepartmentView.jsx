import React, { useState } from "react";
import Button from "../../components/Button";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import NotificationButton from "../../components/NotificationButton";
import AdminBoxSmall from "../../components/AdminBoxSmall";
import { GoPlus } from "react-icons/go";
const styleSheet = {
  root: {
    width: "100%",
    height: "100vh",
    margin: "0px auto",
    position: "relative",
    flexGrow: "1",
  },
  topBar: {
    width: "95%",
    height: "50px",
    marginTop: "50px",
  },
  titleText: {
    fontSize: "2.3em",
    fontWeight: "bold",
  },
  botBar: {
    width: "95%",
    height: "800px",
    marginTop: "30px",
  },
  notesTextContainer: {
    cursor: "text",
  },
  notesText: {
    fontWeight: "bold",
    fontSize: "2.5em",
    cursor: "text",
  },
  plusIcon: {
    cursor: "pointer",
    height: "30px",
  },
};

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
        style={styleSheet.root}
        wrap="nowrap"
      >
        <Grid item style={styleSheet.topBar}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid xs={11} item style={styleSheet.notesTextContainer}>
              <a style={styleSheet.notesText}>
                Computer Science and Engineering
              </a>
            </Grid>
            <Grid xs={1} item style={styleSheet.plusIcon}>
              <GoPlus size={30} color={colorscheme.green2} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={styleSheet.botBar}>
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
