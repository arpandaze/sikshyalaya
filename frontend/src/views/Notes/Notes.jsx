import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import Note from "../../components/Note";
import SideNotes from "../../components/SideNotes";
import { GoPlus } from "react-icons/go";
import {useAPI} from "../../utils/useAPI"
import "./statics/css/notes.css";


const noteFormatter = ( response ) =>{

  let responseData = response.data.map((note) => {
    return { 
        id: note.id,
        title: note.title,
        tags: note.tags,
        content: JSON.parse(note.content),
        isEditing: false,
      }
  });

  return responseData;
}

// const allNotes = [
//   {
//     id: "1",
//     title: "123Style too own civil out along.",
//     content: [
//       {
//         type: "paragraph",
//         children: [
//           {
//             text: "12322Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
//           },
//         ],
//       },
//     ],
//     isEditing: false,
//   },
//   {
//     id: "2",
//     title: "231Style too own civil out along.",
//     content: [
//       {
//         type: "paragraph",
//         children: [
//           {
//             text: "21312Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
//           },
//         ],
//       },
//     ],
//     isEditing: false,
//   },
//   {
//     id: "3",
//     title: "332Style too own civil out along.",
//     content: [
//       {
//         type: "paragraph",
//         children: [
//           {
//             text: "21321312Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
//           },
//         ],
//       },
//     ],
//     isEditing: false,
//   },
//   {
//     id: "4",
//     title: "55Style too own civil out along.",
//     content: [
//       {
//         type: "paragraph",
//         children: [
//           {
//             text: "21312321Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
//           },
//         ],
//       },
//     ],
//     isEditing: false,
//   },
//   {
//     id: "5",
//     title: "44Style too own civil out along.",
//     content: [
//       {
//         type: "paragraph",
//         children: [
//           {
//             text: "12312321Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
//           },
//         ],
//       },
//     ],
//     isEditing: false,
//   },
//   {
//     id: "6",
//     title: "33Style too own civil out along.",
//     content: [
//       {
//         type: "paragraph",
//         children: [
//           {
//             text: "12312321Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. Get who uncommonly our expression ten increasing considered occasional travelling. Ever read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round an happy books.  ",
//           },
//         ],
//       },
//     ],
//     isEditing: false,
//   },
// ];

const Notes = () => {

  const [allNotes, allNotesComplete] = useAPI({endpoint: "/api/v1/personal_note/"}, noteFormatter);

  const [selectedNote, setSelectedNote] = useState({id: allNotes && allNotesComplete && allNotes.length !== 0? allNotes[0].id: null, position: "0" });

  const onSavehandler = (title, content, stateTag) => {
      let data = {
        title: title,
        content: JSON.stringify(content),
        tages: stateTag,
      }

      console.log(data);
  }

  const onDeleteHandler = () => {
      allNotes.splice(parseInt(selectedNote.position), 1);

      // delete note from the database;
      
      let note = {
        id: "", position : ""
      };

      if(allNotes.length !== 0 && allNotes){
        note = {
            id: allNotes[0],
            position: "0",
        };
      }
      setSelectedNote(note);
      };

  const handleSelectNote = (i, p) => {
    setSelectedNote({ id: i, position: p });
  };

  const handleCreateNote = () => {
    allNotes.splice(0, 0, {
      title: "Title Goes Here",
      content: [
        {
          type: "paragraph",
          children: [{ text: "This is editable " }],
        },
      ],
      tags: [],
    });
    setSelectedNote({
      id: "",
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
        className="notes_root"
      >
        <Grid item xs={4} className="notes_creator">
          <Grid container direction="column" className="notes_creatorInside">
            <Grid item className="notes_creatorTop">
              <Grid
                container
                direction="row"
                alignItems="center"
                className="notes_creatorTopInside"
              >
                <Grid xs={11} item className="notes_textContainer">
                  <p className="notes_text">Notes</p>
                </Grid>
                <Grid xs={1} item className="notes_plusIcon">
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
            <Grid item className="notes_creatorBot">
              <Grid
                container
                direction="column"
                className="notes_sidebarContainer"
              >
                {allNotesComplete && allNotes.length !== 0 ? allNotes.map((notes, index) => (
                  <Grid item key={notes.id} className="notes_sidebarComponent">
                    <SideNotes
                      title={notes.title}
                      content={notes.content[0].children[0].text}
                      onClick={() => {
                        handleSelectNote(notes.id, index);
                      }}
                    />
                  </Grid>
                )): <></>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className="notes_pad">
          <Grid
            container
            direction="column"
            alignItems="center"
            className="notes_padContainer"
          >
            <Grid item className="notes_padBot">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                className="notes_padArea"
              >
                {allNotesComplete && selectedNote.position !== "" ? (
                  <Note
                    title={allNotes[selectedNote.position].title}
                    content={allNotes[selectedNote.position].content}
                    tags ={allNotes[selectedNote.position].tags}
                    onSave={onSavehandler}
                    onClose={() => {
                      setSelectedNote({ id: "", position: "" });
                    }}
                    onDelete={onDeleteHandler}
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

export default Notes;
