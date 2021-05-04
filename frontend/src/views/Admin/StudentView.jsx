import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import Students from "../../components/Student";
import { GoPlus } from "react-icons/go";
import "./statics/css/studentView.css";

const selectedCLass = [
  {
    name: "CS 2019",
  },
];

const students = [
  {
    id: "1",
    name: "Aatish Shrestha",
  },
  {
    id: "2",
    name: "Yugesh Upadhyaya Luitel",
  },
  {
    id: "3",
    name: "Rushab  Humagain",
  },
  {
    id: "4",
    name: "Arpan Koirala",
  },
  {
    id: "5",
    name: "Abiral Banjade",
  },
  {
    id: "6",
    name: "Ishan Pant",
  },
  {
    id: "7",
    name: "Mulyankan Sharma",
  },
  {
    id: "8",
    name: "Sangarsha Paudel",
  },
  {
    id: "9",
    name: "Pawan Khatri",
  },
  {
    id: "10",
    name: "Nwang Choegyap Gurung",
  },
  {
    id: "11",
    name: "Heriz Bista",
  },
  {
    id: "12",
    name: "Anish Joshi",
  },
  {
    id: "13",
    name: "Paribesh Panta",
  },
  {
    id: "14",
    name: "Luniva Chitrakar",
  },
  {
    id: "15",
    name: "Lahana Kansakar",
  },
  {
    id: "16",
    name: "Sushma Lamsal",
  },
  {
    id: "17",
    name: "Abhijeet Poudel",
  },
  {
    id: "18",
    name: "Niranjan Pandey",
  },
];

const StudentView = ({ depart, ...rest }) => {
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
          <Grid item xs stlye="departContainer">
            <p className="departText">{selectedCLass[0].name}</p>
          </Grid>
          <Grid item xs={1} className="plusIcon">
            <GoPlus size={30} color={colorscheme.green3} />
          </Grid>
        </Grid>

        <Grid item className="botBar">
          <Grid item className="mainContainer" xs={12}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="Flex-start"
              spacing={1}
              className="innerContainer"
            >
              {students.map((item) => (
                <Grid item>
                  <Students name={item.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default StudentView;
