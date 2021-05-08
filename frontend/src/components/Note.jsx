import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";
import { ImCross } from "react-icons/im";
import { FiTrash } from "react-icons/fi";
import "./statics/css/notes.css";
const Note = ({ title, content, state, onClose, onDelete, ...rest }) => {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className="notes_root"
      wrap="nowrap"
    >
      <Grid item className="notes_notePadTop">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={11} className="notes_titleTextContainer">
            <p className="notes_titleText">{title}</p>
            <div className="notes_line"></div>
          </Grid>
          <Grid item xs={1} className="notes_closeButtonContainer">
            <div className="notes_closeButton">
              <ImCross size={20} color={colorscheme.red4} onClick={onClose} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="notes_notePadBot">
        <Grid container direction="column">
          <Grid item className="notes_contentTextContainer">
            <p className="notes_contentText">{content}</p>
          </Grid>
          <Grid item className="notes_trashButtonContainer">
            <div className="notes_trashButton">
              <FiTrash size={20} color={colorscheme.red4} onClick={onDelete} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Note;
