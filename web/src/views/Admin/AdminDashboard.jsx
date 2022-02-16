import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import student from "../../assets/student.svg";
import teacher from "../../assets/teacher.svg";
import explore from "../../assets/explore.svg";
import course from "../../assets/course.svg";
import Image from "../../components/Image";
import "./statics/css/adminDashboard.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdminDashboard = () => {
  const history = useHistory();
  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        wrap="nowrap"
        className="admin_root"
      >
        <Grid item className="admin_mainBar">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              item
              container
              direction="row"
              className="admin_middleContainer"
              xs={12}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                item
                xs={5}
                className="admin_customCards"
                onClick={() => {
                  history.push({
                    pathname: "/admin/teacher",
                  });
                }}
              >
                <div className="admin_compImage">
                  <Image src={teacher} />
                </div>
                <div className="admin_imageTextContainer">
                  <p className="admin_imageText">Teacher</p>
                </div>
                <div className="admin_imageTextContainer2"></div>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                item
                xs={5}
                className="admin_customCards"
                onClick={() => {
                  history.push({
                    pathname: "/admin/student",
                  });
                }}
              >
                <div className="admin_compImage">
                  <Image src={student} />
                </div>
                <div className="admin_imageTextContainer">
                  <p className="admin_imageText">Student</p>
                </div>
                <div className="admin_imageTextContainer2"></div>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                item
                xs={5}
                className="admin_customCards"
                onClick={() => {
                  history.push({
                    pathname: "/admin/explore",
                  });
                }}
              >
                <div className="admin_compImage">
                  <Image src={explore} />
                </div>
                <div className="admin_imageTextContainer">
                  <p className="admin_imageText">Explore</p>
                </div>
                <div className="admin_imageTextContainer2"></div>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                item
                xs={5}
                className="admin_customCards"
                onClick={() => {
                  history.push({
                    pathname: "/admin/course",
                  });
                }}
              >
                <div className="admin_compImage">
                  <Image src={course} />
                </div>
                <div className="admin_imageTextContainer">
                  <p className="admin_imageText">Course</p>
                </div>
                <div className="admin_imageTextContainer2"></div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
