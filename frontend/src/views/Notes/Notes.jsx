import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout";
import Note from "../../components/Note";
import SideNotes from "../../components/SideNotes";
import { GoPlus } from "react-icons/go";
import { useAPI } from "../../utils/useAPI";
import {getReq, postReq, putReq} from "../../utils/API";
import "./statics/css/notes.css";
import {UserContext} from "../../utils/Contexts/UserContext"

const noteFormatter = (response) => {

  if (response.data.length === 0) {
    return [{
        id: "",
        title: "Title Goes Here",
          content: [
            {
              type: "paragraph",
              children: [{ text: "This is editable." }],
            },
          ],
          tags: ["add", "tags", "here"],
        }];
    }

  let responseData = response.data.map((note) => {
    return {
      id: note.id,
      title: note.title,
      tags: note.tags,
      content: JSON.parse(note.content),
      isEditing: false,
    };
  });
  return responseData;

};

const Notes = () => {

  let [allNotes, allNotesComplete] = useAPI(
    { endpoint: "/api/v1/personal_note/" },
    noteFormatter
  );

  const {user} = useContext(UserContext);

  const [selectedNote, setSelectedNote] = useState({
    id:
      allNotes && allNotesComplete && allNotes.length !== 0
        ? allNotes[0].id
        : null,
    position: "0",
  });

  const onSavehandler = async (title, content, stateTag) => {
    let data = null;

    try{
      data= {
        user_id: user.id,
        title: title,
        content: JSON.stringify(content),
        tags: stateTag,
      };
    }catch (e){
      console.log(e);
    }

    console.log("XXXData:",data);
    if(selectedNote.id == ""){
      console.log("a new note is being created");
      //on new note create
      //populate database
      try{
        let postResponse = await postReq("/api/v1/personal_note/", data);
    
        if (postResponse.status === 200){
          
          let getResponse = await getReq("/api/v1/personal_note/");
          let notes = [];
          try{
            notes = noteFormatter(getResponse);
          } catch (e){
            console.log(e);
          }
          allNotes = notes;
        }else{
          alert("Save Failed!")
        }

        // if (postResponse.status == 200){
        //   let response = getReq("/api/v1/personal_note/");
        //   console.log(response);
        // }
      }catch (e) {
        console.log(e);
      }
    
    }else{
      //on notes previously present in the database
      //update the notes
    }
    console.log(data);
  };

  const onDeleteHandler = () => {
    allNotes.splice(parseInt(selectedNote.position), 1);

    // delete note from the database;

    let note = {
      id: "",
      position: "",
    };

    if (allNotes.length !== 0 && allNotes) {
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
    if(allNotes){
      if(allNotes.length){
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
      }
    }else{
      console.log(typeof allNotes);
      allNotes[0]={
        title: "Title Goes Here",
        content: [
          {
            type: "paragraph",
            children: [{ text: "This is editable " }],
          },
        ],
        tags: [],
      };
    }
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
                {allNotesComplete && allNotes.length !== 0 ? (
                  allNotes.map((notes, index) => (
                    <Grid
                      item
                      key={notes.id}
                      className="notes_sidebarComponent"
                    >
                      <SideNotes
                        title={notes.title}
                        content={notes.content[0].children[0].text}
                        onClick={() => {
                          handleSelectNote(notes.id, index);
                        }}
                      />
                    </Grid>
                  ))
                ) : (
                  <></>
                )}
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
                {allNotesComplete &&
                allNotes.length &&
                selectedNote.position !== "" ? (
                  <Note
                    title={allNotes[selectedNote.position].title}
                    content={allNotes[selectedNote.position].content}
                    tags={allNotes[selectedNote.position].tags}
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
