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
    height: "90vh",
    overflow: "clip",
  },
  notePad: {
    height: "100vh",
    border: "1px solid black",
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
  noteCreatorTop: {
    width: "80%",
  },
  notePadTop: {
    border: "1px solid black",
  },
  notePadArea: {},
  notePadBot: {
    border: "1px solid black",
  },
  noteCreatorTopInside: {},
  noteCreatorBot: {
    position: "relative",
    top: "15px",
  },
  plusIcon: {
    cursor: "pointer",
    height: "30px",
  },
  gridIconsContainer: {
    cursor: "pointer",
  },
};
const typing = true;
const note = {
  title: "Title goes here.",
  content: "Content goes here",
  state: typing ? "Typing..." : "Saved",
};
const sideNotes = [
  {
    id: "1",
    title: "Test",
    content: "hello hi there",
  },
  {
    id: "2",
    title: "Hello",
    content: "heeeeelllo",
  },
  {
    id: "3",
    title: "Hello",
    content: "heeeeelllo",
  },
  {
    id: "4",
    title: "Hello",
    content: "heeeeelllo",
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
                ;
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} style={styleSheet.notePad}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item style={styleSheet.notePadTop}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
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
