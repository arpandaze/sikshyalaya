import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import Students from "../../components/Student";
import { GoPlus } from "react-icons/go";
import "./statics/css/studentView.css";
import useAPI from "../../utils/useAPI";

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

const StudentView = ({ match, ...rest }) => {
  const studentsFormatter = (values) => {
    console.log(values);
    return values.data.student.map((item) => {
      return {
        id: item.id,
        name: item.full_name,
      };
    });
  };
  const studentsDefault = [];
  const [students] = useAPI(
    { endpoint: `/api/v1/group/${match.params.group}/student` },
    studentsFormatter,
    studentsDefault
  );

  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className="adminStudent_root"
        wrap="nowrap"
      >
        <Grid item className="adminStudent_topBarContainer">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="adminStudent_topBar"
          >
            <Grid xs item className="adminStudent_textContainer">
              <p className="adminStudent_text">
                Computer Science and Engineering
              </p>
            </Grid>
            <Grid xs={1} item className="adminStudent_plusIcon">
              <GoPlus size={30} color={colorscheme.green2} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item className="adminStudent_botBar">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="Flex-start"
            spacing={1}
            className="adminStudent_innerContainer"
            wrap="wrap"
          >
            {students.map((item) => (
              <Grid item>
                <Students name={item.name} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <br />
        <br />
      </Grid>
    </DashboardLayout>
  );
};

export default StudentView;
