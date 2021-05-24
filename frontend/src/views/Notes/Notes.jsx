import React, { useState, useContext, useEffect } from "react";
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

const Notes = () => {
  const {user} = useContext(UserContext);
  const noteFormatter = (response) => {
    if (!response.data.length) {
      return [];
    }
  
    let responseData = [];
    responseData = response.data.map((note) => {
      return {
        id: note.id,
        user_id: note.user_id,
        title: note.title,
        tags: note.tags,
        content: JSON.parse(note.content),
      };
    });

    return responseData.reverse();
  
  };

  const [newNoteActive, setnewNoteActive] = useState(false);
  
  const defaultNotesvalue = [];

  let [allNotes, allNotesComplete] = useAPI(
    { endpoint: "/api/v1/personal_note/" },
    noteFormatter,
    defaultNotesvalue,
  );

  const [selectedNote, setSelectedNote] = useState({
    id:
      allNotes && allNotesComplete && allNotes.length
        ? allNotes[0].id
        : null,
    position: "0",
  });

  const onSavehandler = async (title, content, stateTag) => {
  
    let data = null;
    let newSelect = {id: "", position: ""};
    let statusNewCreate = true;

    data= {
        user_id: user.id,
        title: title,
        content: JSON.stringify(content),
        tags: stateTag,
    };

    if(selectedNote.id == null){
      let getRequestResponse = "";
      let notes = [];
      //on new note create
      //populate database
        await postReq("/api/v1/personal_note/", data);

        getRequestResponse = await getReq("/api/v1/personal_note/");
          
        try{
            notes = noteFormatter(getRequestResponse);
        } catch (e){
          console.log(e);
        }

        allNotes.splice(0, allNotes.length);
        allNotes.push(...notes);
        statusNewCreate = false;

        if(allNotes && allNotes.length){
          let newId = allNotes[0].id;
          let newPosition = "0";
          newSelect = {id: newId, position: newPosition};
        }

    }else{
      
      //on notes previously present in the database
      //update the notes
      let params = {id: selectedNote.id};
      let putResponse = null;
      putResponse = await putReq(`/api/v1/personal_note/${selectedNote.id}`, data);
      
      try{
        data = {...data, id: selectedNote.id, content: JSON.parse(data.content)};
        allNotes[selectedNote.position] = data;
        newSelect ={
          id: selectedNote.id,
          position: selectedNote.position,
        }
      }catch (e){
        console.log(e);
      }
      statusNewCreate = false;
    }

    setSelectedNote(newSelect);
    setnewNoteActive(statusNewCreate);
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
        id: allNotes[0].id,
        position: "0",
      };
    }
    setSelectedNote(note);
  };

  const handleSelectNote = (i, p) => {
    setSelectedNote({ id: i, position: p });
  };

  const handleCreateNote = () => {
      setnewNoteActive(true);
      if(allNotes && allNotes.length){
        allNotes.splice(0, 0, {
          title: "Title Goes Here",
          user_id: user.id,
          content: [
            {
              type: "paragraph",
              children: [{ text: "This is editable " }],
            },
          ],
          tags: [],
        });
      }else{
      allNotes.push({
        id: null,
        user_id: user.id,
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

    setSelectedNote({
      id: null,
      position: "0",
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
                  {!newNoteActive && <GoPlus
                    size={26}
                    color={colorscheme.green2}
                    onClick={() => {
                      handleCreateNote();
                    }}
                  />
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="notes_creatorBot">
              <Grid
                container
                direction="column"
                className="notes_sidebarContainer"
              >
                {allNotesComplete && allNotes.length? (
                  allNotes.map((notes, index) => (
                    <Grid
                      item
                      key={notes.id}
                      className="notes_sidebarComponent"
                    >
                      <SideNotes
                        id={notes.id}
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
