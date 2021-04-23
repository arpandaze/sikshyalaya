import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import * as yup from "yup";
import Tab from "../../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import SideBar from "../../components/SideBar";
import colorscheme from "../../utils/colors";
import ProfileBar from "../../components/ProfileBar";
import DashboardLayout from "../../components/DashboardLayout";
import Note from "../../components/Note";
import SideNotes from "../../components/SideNotes";
import { GoPlus } from "react-icons/go";
import { BiSquare } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";

const styleSheet = {
  root: {
    width: "92%",
    margin: "0px auto",
    position: "relative",
    left: "-20px",
    flexGrow: "1",
  },
  noteCreator: {
    height: "94vh",
  },
  noteCreatorTop: {
    width: "400px",
  },
  noteCreatorBot: {
    position: "relative",
    height: "86vh",
    top: "15px",
    overflow: "scroll",
    overflowX: "hidden",
  },
  notePad: {
    height: "100vh",
  },
  sideNoteContainer: {},
  sideNotes: {
    padding: "10px",
  },
  notesTextContainer: {
    cursor: "text",
  },
  notesText: {
    fontWeight: "bold",
    fontSize: "2.5em",
    cursor: "text",
  },
  notePadTop: {
    width: "86%",
  },
  notePadArea: {
    marginTop: "10px",
  },
  notePadBot: {},
  notePadContainer: {
    position: "relative",
    top: "5%",
  },
  noteCreatorTopInside: {},
  plusIcon: {
    cursor: "pointer",
    height: "30px",
  },
  gridIconsContainer: {
    width: "70px",
    cursor: "pointer",
    float: "right",
  },
};
const typing = true;
const note = {
  title: "Lorem Ipsum",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor imperdiet elit, ut consectetur tortor fringilla id. Quisque mollis, nisi porta porttitor vehicula, ipsum lacus blandit felis, vel mattis quam urna eget tellus. Vestibulum euismod risus sit amet leo dignissim accumsan. Phasellus aliquam tortor vel lacus gravida pharetra. Suspendisse commodo dolor a nunc scelerisque interdum auctor sed eros. Vestibulum sit amet sem fringilla ante rhoncus cursus. Pellentesque mattis venenatis vehicula. Nulla sit amet dapibus erat. Integer sit amet lectus sit amet urna facilisis volutpat nec eu lacus. Nulla id nulla lectus. In congue suscipit dui sit amet elementum. Cras at lacus ac metus interdum rutrum ullamcorper malesuada sapien. In sed mollis est, in volutpat sem. Proin ut pharetra libero. Nunc in leo vel urna varius varius. Nullam tempor aliquet semper.Nunc dapibus ac metus in interdum. Nulla at justo commodo arcu imperdiet blandit. Pellentesque sit amet rutrum neque. Donec pharetra, mauris posuere mollis fermentum, nisi quam congue eros, in congue lectus elit eu purus. Suspendisse facilisis imperdiet neque, at tincidunt felis vestibulum sed. Sed eget consequat nisl. Suspendisse sollicitudin, mi sed condimentum consequat, ipsum nisi hendrerit erat, sed scelerisque velit quam eu enim. Fusce nisl nunc, lacinia et odio nec, porta ultricies sem. Fusce et tortor posuere, mollis lacus vel, pretium purus. Duis scelerisque facilisis mollis. Sed elementum metus eu ligula condimentum interdum. Phasellus sit amet sem convallis, imperdiet tellus aliquam, lacinia est. Nullam vitae molestie orci, nec rhoncus mi. Morbi orci erat, tincidunt id auctor nec, ornare nec quam.",
  state: typing ? "Typing..." : "Saved",
};
const sideNotes = [
  {
    id: "1",
    title: "Lorem Ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor imperdiet elit, ut consectetur tortor fringilla id. Quisque mollis, nisi porta porttitor vehicula, ipsum lacus blandit felis, vel mattis quam urna eget tellus. Vestibulum euismod risus sit amet leo dignissim accumsan. Phasellus aliquam tortor vel lacus gravida pharetra. Suspendisse commodo dolor a nunc scelerisque interdum auctor sed eros. Vestibulum sit amet sem fringilla ante rhoncus cursus. Pellentesque mattis venenatis vehicula. Nulla sit amet dapibus erat. Integer sit amet lectus sit amet urna facilisis volutpat nec eu lacus. Nulla id nulla lectus. In congue suscipit dui sit amet elementum. Cras at lacus ac metus interdum rutrum ullamcorper malesuada sapien. In sed mollis est, in volutpat sem. Proin ut pharetra libero. Nunc in leo vel urna varius varius. Nullam tempor aliquet semper.",
  },
  {
    id: "2",
    title: "Lorem Ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor imperdiet elit, ut consectetur tortor fringilla id. Quisque mollis, nisi porta porttitor vehicula, ipsum lacus blandit felis, vel mattis quam urna eget tellus. Vestibulum euismod risus sit amet leo dignissim accumsan. Phasellus aliquam tortor vel lacus gravida pharetra. Suspendisse commodo dolor a nunc scelerisque interdum auctor sed eros. Vestibulum sit amet sem fringilla ante rhoncus cursus. Pellentesque mattis venenatis vehicula. Nulla sit amet dapibus erat. Integer sit amet lectus sit amet urna facilisis volutpat nec eu lacus. Nulla id nulla lectus. In congue suscipit dui sit amet elementum. Cras at lacus ac metus interdum rutrum ullamcorper malesuada sapien. In sed mollis est, in volutpat sem. Proin ut pharetra libero. Nunc in leo vel urna varius varius. Nullam tempor aliquet semper.",
  },
  {
    id: "3",
    title: "Lorem Ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor imperdiet elit, ut consectetur tortor fringilla id. Quisque mollis, nisi porta porttitor vehicula, ipsum lacus blandit felis, vel mattis quam urna eget tellus. Vestibulum euismod risus sit amet leo dignissim accumsan. Phasellus aliquam tortor vel lacus gravida pharetra. Suspendisse commodo dolor a nunc scelerisque interdum auctor sed eros. Vestibulum sit amet sem fringilla ante rhoncus cursus. Pellentesque mattis venenatis vehicula. Nulla sit amet dapibus erat. Integer sit amet lectus sit amet urna facilisis volutpat nec eu lacus. Nulla id nulla lectus. In congue suscipit dui sit amet elementum. Cras at lacus ac metus interdum rutrum ullamcorper malesuada sapien. In sed mollis est, in volutpat sem. Proin ut pharetra libero. Nunc in leo vel urna varius varius. Nullam tempor aliquet semper.",
  },
  {
    id: "4",
    title: "Lorem Ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor imperdiet elit, ut consectetur tortor fringilla id. Quisque mollis, nisi porta porttitor vehicula, ipsum lacus blandit felis, vel mattis quam urna eget tellus. Vestibulum euismod risus sit amet leo dignissim accumsan. Phasellus aliquam tortor vel lacus gravida pharetra. Suspendisse commodo dolor a nunc scelerisque interdum auctor sed eros. Vestibulum sit amet sem fringilla ante rhoncus cursus. Pellentesque mattis venenatis vehicula. Nulla sit amet dapibus erat. Integer sit amet lectus sit amet urna facilisis volutpat nec eu lacus. Nulla id nulla lectus. In congue suscipit dui sit amet elementum. Cras at lacus ac metus interdum rutrum ullamcorper malesuada sapien. In sed mollis est, in volutpat sem. Proin ut pharetra libero. Nunc in leo vel urna varius varius. Nullam tempor aliquet semper.",
  },
];
const Dashboard = () => {
  const [typing, setTyping] = useState(false);
  return (
    <DashboardLayout>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={styleSheet.root}
      >
        <Grid item xs={4} style={styleSheet.noteCreator}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item style={styleSheet.noteCreatorTop}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                style={styleSheet.noteCreatorTopInside}
              >
                <Grid xs={11} item style={styleSheet.notesTextContainer}>
                  <a style={styleSheet.notesText}>Notes</a>
                </Grid>
                <Grid xs={1} item style={styleSheet.plusIcon}>
                  <GoPlus size={30} color={colorscheme.green2} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={styleSheet.noteCreatorBot}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                style={styleSheet.sideNoteContainer}
              >
                {sideNotes.map((notes) => (
                  <Grid item key={notes.id} style={styleSheet.sideNotes}>
                    <SideNotes title={notes.title} content={notes.content} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} style={styleSheet.notePad}>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={styleSheet.notePadContainer}
          >
            <Grid item style={styleSheet.notePadTop}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                style={styleSheet.gridIconsContainer}
              >
                <Grid item>
                  <BiSquare size={30} color={colorscheme.grey1} />
                </Grid>
                <Grid item>
                  <CgMenuGridR size={30} color={colorscheme.grey1} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={styleSheet.notePadBot}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                style={styleSheet.notePadArea}
              >
                <Note title={note.title} content={note.content} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
