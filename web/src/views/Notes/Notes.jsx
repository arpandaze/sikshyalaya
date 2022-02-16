import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import Note from "./components/Note";
import SideNotes from "./components/SideNotes";
import { GoPlus } from "react-icons/go";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import "./statics/css/notes.css";
import { UserContext } from "../../utils/Contexts/UserContext";
import { format } from "date-fns";

const Notes = () => {
  const { user } = useContext(UserContext);
  const defaultNotesvalue = [];
  const [selectedNote, setSelectedNote] = useState({ id: null, position: "0" });
  const [isNewNote, setIsNewNote] = useState(true);

  const noteFormatter = (response) => {
    if (response.data.length === 0) {
      return [];
    }

    let responseData = [];
    responseData = response.data.map((note) => {
      const tempDate = new Date(note.last_updated_time);
      const notesDate = new Date(tempDate.toLocaleString().toString() + " UTC");
      let formattedResponseData = {
        id: note.id,
        last_updated_time: format(notesDate, "do LLL yyy , hh:mm aaa"),
        user_id: note.user_id,
        title: note.title,
        tags: note.tags,
        content: JSON.parse(note.content),
      };

      return formattedResponseData;
    });

    return responseData.reverse();
  };

  let [allNotes, allNotesComplete] = useAPI(
    { endpoint: "/api/v1/personal_note/" },
    noteFormatter,
    defaultNotesvalue
  );

  useEffect(() => {
    setSelectedNote({
      id:
        allNotes && allNotesComplete && allNotes.length ? allNotes[0].id : null,
      position: "0",
    });
  }, [allNotes]);

  const handleSelectNote = (i, p) => {
    setSelectedNote({ id: i, position: p });
  };

  const handleCreateNote = () => {
    allNotes.splice(0, 0, {
      id: null,
      title: "Title Goes Here",
      user_id: user.id,
      content: [
        {
          attributes: {
            font: "Roboto",
          },
          insert:
            "Content Goes here. This is Editable. You can also add tags!! :)",
        },
      ],
      tags: [],
    });
    setSelectedNote({
      id: null,
      position: "0",
    });
  };

  const onDeleteHandler = async () => {
    let deleteResponse = null;

    let note = {
      id: null,
      position: "",
    };

    allNotes.splice(parseInt(selectedNote.position), 1);

    if (allNotes && allNotes.length !== 0) {
      note = {
        id: allNotes[0].id,
        position: "0",
      };
    }

    if (selectedNote.id === null) {
      setIsNewNote(true);
    } else {
      try {
        deleteResponse = await callAPI({
          endpoint: `/api/v1/personal_note/${selectedNote.id}`,
          method: "DELETE",
        });
      } catch (e) {}
    }

    setSelectedNote(note);
  };

  const onSavehandler = async (title, content, stateTag) => {
    let data = null;
    let newSelect = { id: "", position: "" };
    let statusNewCreate = true;

    data = {
      user_id: user.id,
      title: title,
      content: JSON.stringify(content.ops),
      tags: stateTag,
    };

    if (selectedNote.id == null) {
      let notes = [];
      //on new note create
      //populate database
      const postResponse = await callAPI({
        endpoint: "/api/v1/personal_note/",
        method: "POST",
        data: data,
      });

      const formattedResponse = {
        data: [postResponse["data"]],
      };

      try {
        notes = noteFormatter(formattedResponse);
      } catch (e) {}
      allNotes[selectedNote.position] = notes[0];
      newSelect = { id: notes[0].id, position: selectedNote.position };
    } else {
      //on notes previously present in the database
      //update the notes
      try {
        const notesDate = new Date();
        data = {
          ...data,
          content: JSON.parse(data.content),
          id: selectedNote.id,
        };
        allNotes[selectedNote.position] = data;
        allNotes[selectedNote.position].last_updated_time = format(
          notesDate,
          "do LLL yyy , hh:mm aaa"
        );
        newSelect = {
          id: selectedNote.id,
          position: selectedNote.position,
        };
        data = {
          ...data,
          content: JSON.stringify(data.content),
        };
        delete data.last_updated_time;
        await callAPI({
          endpoint: `/api/v1/personal_note/${selectedNote.id}`,
          method: "PUT",
          data: data,
        });
      } catch (e) {}
    }

    setIsNewNote(true);
    setSelectedNote(newSelect);
  };

  return (
    <DashboardLayout>
      <Grid
        container
        direction="row"
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
                justify="center"
                className="notes_creatorTopInside"
              >
                <Grid xs={9} item className="notes_textContainer">
                  <p className="notes_text">Notes</p>
                </Grid>
                <Grid
                  container
                  item
                  xs={2}
                  direction="row"
                  alignItems="center"
                  justify="center"
                  className="notes_plusButtonContainer"
                >
                  {isNewNote ? (
                    <Grid
                      container
                      item
                      direction="row"
                      alignItems="center"
                      justify="center"
                      className="notes_plusButton"
                    >
                      <GoPlus
                        size={20}
                        color={colorscheme.green2}
                        onClick={() => {
                          setIsNewNote(false);
                          handleCreateNote();
                        }}
                        className="notes_plusButtonImage"
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="notes_creatorBot">
              <Grid
                container
                direction="column"
                className="notes_sidebarContainer"
              >
                {allNotesComplete && allNotes.length ? (
                  allNotes.map((notes, index) => (
                    <Grid
                      item
                      key={notes.id}
                      className="notes_sidebarComponent"
                    >
                      <SideNotes
                        id={notes.id}
                        title={notes.title}
                        noteTime={notes.last_updated_time}
                        content={notes.content[0].insert}
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
                    noteTime={allNotes[selectedNote.position].last_updated_time}
                    title={allNotes[selectedNote.position].title}
                    content={allNotes[selectedNote.position].content}
                    tags={allNotes[selectedNote.position].tags}
                    onSave={onSavehandler}
                    onClose={() => {
                      setSelectedNote({ id: null, position: "" });
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
