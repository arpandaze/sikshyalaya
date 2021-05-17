import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import Note from "../../components/Note";
import SideNotes from "../../components/SideNotes";
import { GoPlus } from "react-icons/go";
import "./statics/css/quiz.css";

const sideNotes = [
  {
    id: "1",
    title: "123Style too own civil out along.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "12322Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
          },
        ],
      },
    ],
    isEditing: false,
  },
  {
    id: "2",
    title: "231Style too own civil out along.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "21312Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
          },
        ],
      },
    ],
    isEditing: false,
  },
  {
    id: "3",
    title: "332Style too own civil out along.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "21321312Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
          },
        ],
      },
    ],
    isEditing: false,
  },
  {
    id: "4",
    title: "55Style too own civil out along.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "21312321Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
          },
        ],
      },
    ],
    isEditing: false,
  },
  {
    id: "5",
    title: "44Style too own civil out along.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "12312321Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
          },
        ],
      },
    ],
    isEditing: false,
  },
  {
    id: "6",
    title: "33Style too own civil out along.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "12312321Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
          },
        ],
      },
    ],
    isEditing: false,
  },
];

const Quiz = () => {
  const [selectedNote, setSelectedNote] = useState({ id: "1", position: "0" });
  const handleSelectNote = (i, p) => {
    setSelectedNote({ id: i, position: p });
  };
  const handleCreateNote = () => {
    sideNotes.splice(0, 0, {
      title: "Title Goes Here",
      content: [
        {
          type: "paragraph",
          children: [{ text: "This is editable " }],
        },
      ],
    });
    setSelectedNote({
      id: (parseInt(sideNotes[sideNotes.length - 1].id) + 1).toString(),
      position: 0,
    });
  };
  return (
    <DashboardLayout>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className="quiz_root"
      >
        <Grid item xs={4} className="quiz_creator">
          <Grid container direction="column" className="quiz_creatorInside">
            <Grid item className="quiz_creatorTop">
              <Grid
                container
                direction="row"
                alignItems="center"
                className="quiz_creatorTopInside"
              >
                <Grid xs={11} item className="quiz_textContainer">
                  <p className="quiz_text">Quiz</p>
                </Grid>
                <Grid xs={1} item className="quiz_plusIcon">
                  <GoPlus
                    size={26}
                    color={colorscheme.green2}
                    onClick={() => {
                      handleCreateNote();
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="quiz_creatorBot">
              <Grid
                container
                direction="column"
                className="quiz_sidebarContainer"
              >
                {sideNotes.map((notes, index) => (
                  <Grid item key={notes.id} className="quiz_sidebarComponent">
                    <SideNotes
                      title={notes.title}
                      content={notes.content[0].children[0].text}
                      onClick={() => {
                        handleSelectNote(notes.id, index);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className="quiz_pad">
          <Grid
            container
            direction="column"
            alignItems="center"
            className="quiz_padContainer"
          >
            <Grid item className="quiz_padBot">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                className="quiz_padArea"
              >
                {selectedNote.id != "" && sideNotes.length !== 0 ? (
                  <Note
                    title={sideNotes[selectedNote.position].title}
                    content={sideNotes[selectedNote.position].content}
                    onClose={() => {
                      setSelectedNote({ id: "", position: "" });
                    }}
                    onDelete={() => {
                      sideNotes.splice(parseInt(selectedNote.position), 1);
                      setSelectedNote(() => ({
                        id: sideNotes[selectedNote.id],
                        position: "0",
                      }));
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

export default Quiz;
