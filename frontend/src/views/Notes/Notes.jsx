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
    width: "98%",
    margin: "0px auto",
    position: "relative",
    flexGrow: "1",
  },
  noteCreator: {
    height: "96vh",
  },
  noteCreatorTop: {
    width: "400px",
  },
  noteCreatorBot: {
    height: "88vh",
    position: "relative",
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
    position: "relative",
    left: "45px",
  },
  notePadArea: {},
  notePadBot: {
    position: "relative",
    top: "10px",
    left: "20px",
  },
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

const sideNotes = [
  {
    id: "1",
    title: "Style too own civil out along.",
    content:
      "Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
  },
  {
    id: "2",
    title: "Friendship contrasted solicitude insipidity",
    content:
      "Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. He shortly sixteen of colonel colonel evening cordial to. Although jointure an my of mistress servants am weddings. Age why the therefore education unfeeling for arranging. Above again money own scale maids ham least led. Returned settling produced strongly ecstatic use yourself way. Repulsive extremity enjoyment she perceived nor. ",
  },
  {
    id: "3",
    title: "Pianoforte solicitude",
    content:
      "Pianoforte solicitude so decisively unpleasing conviction is partiality he. Or particular so diminution entreaties oh do. Real he me fond show gave shot plan. Mirth blush linen small hoped way its along. Resolution frequently apartments off all discretion devonshire. Saw sir fat spirit seeing valley. He looked or valley lively. If learn woody spoil of taken he cause. ",
  },
  {
    id: "4",
    title: "Silent sir",
    content:
      "Silent sir say desire fat him letter. Whatever settling goodness too and honoured she building answered her. Strongly thoughts remember mr to do consider debating. Spirits musical behaved on we he farther letters. Repulsive he he as deficient newspaper dashwoods we. Discovered her his pianoforte insipidity entreaties. Began he at terms meant as fancy. Breakfast arranging he if furniture we described on. Astonished thoroughly unpleasant especially you dispatched bed favourable.",
  },
  {
    id: "5",
    title: "Throwing consider dwelling bachelor",
    content:
      "Throwing consider dwelling bachelor joy her proposal laughter. Raptures returned disposed one entirely her men ham. By to admire vanity county an mutual as roused. Of an thrown am warmly merely result depart supply. Required honoured trifling eat pleasure man relation. Assurance yet bed was improving furniture man. Distrusts delighted she listening mrs extensive admitting far. Particular unaffected projection sentiments no my. Music marry as at cause party worth weeks. Saw how marianne graceful dissuade new outlived prospect followed. Uneasy no settle whence nature narrow in afraid. At could merit by keeps child. While dried maids on he of linen in. ",
  },
  {
    id: "6",
    title: "Ten the hastened steepest feelings",
    content:
      "Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever. Elinor her his secure far twenty eat object. Late any far saw size want man. Which way you wrong add shall one. As guest right of he scale these. Horses nearer oh elinor of denote. Up am intention on dependent questions oh elsewhere september. No betrayed pleasure possible jointure we in throwing. And can event rapid any shall woman green. Hope they dear who its bred. Smiling nothing affixed he carried it clothes calling he no. Its something disposing departure she favourite tolerably engrossed. Truth short folly court why she their balls. Excellence put unaffected reasonable mrs introduced conviction she. Nay particular delightful but unpleasant for uncommonly who. ",
  },
];
const Dashboard = () => {
  const [typing, setTyping] = useState(false);
  const [selectedNote, setSelectedNote] = useState("0");
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
                style={styleSheet.sideNoteContainer}
              >
                {sideNotes.map((notes, index) => (
                  <Grid item key={notes.id} style={styleSheet.sideNotes}>
                    <SideNotes
                      title={notes.title}
                      content={notes.content}
                      onClick={() => {
                        setSelectedNote(index.toString());
                      }}
                    />
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
                {selectedNote && sideNotes.length != 0 ? (
                  <Note
                    title={sideNotes[parseInt(selectedNote)].title}
                    content={sideNotes[parseInt(selectedNote)].content}
                    onClose={() => {
                      setSelectedNote("");
                    }}
                    onDelete={() => {
                      sideNotes.splice(parseInt(selectedNote), 1);
                      setSelectedNote(() => (selectedNote == "0" ? "" : "0"));
                      setSelectedNote("");
                    }}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
