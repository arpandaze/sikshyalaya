import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";
import { ImCross } from "react-icons/im";
import { FiTrash } from "react-icons/fi";

const styleSheet = {
  root: {
    width: "750px",
    height: "800px",
    position: "relative",
    background: colorscheme.white,
    borderRadius: "20px",
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
    flexGrow: "1",
  },
  notePadTop: {
    width: "100%",
  },
  line: {
    backgroundColor: colorscheme.grey1,
    opacity: "30%",
    width: "550px",
    height: "2px",
    position: "relative",
    marginTop: "15px",
    left: "38px",
  },
  titleTextContainer: {
    position: "relative",
    marginTop: "30px",
  },
  titleText: {
    position: "relative",
    fontWeight: "bold",
    fontSize: "1.7em",
    cursor: "text",
    position: "relative",
    left: "40px",
  },
  notePadBot: {
    width: "100%",
    height: "86.8%",
    textAlign: "justify",
    position: "relative",
    top: "25px",
  },
  contentTextContainer: {
    width: "88%",
    textAlign: "justify",
    lineHeight: "2em",
    position: "relative",
    left: "38px",
  },
  contentText: {
    position: "relative",
    fontSize: "1.15em",
  },
  closeButtonContainer: {
    height: "80px",
  },
  closeButton: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "8px",
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  trashButtonContainer: {
    position: "absolute",
    right: "20px",
    top: "630px",
  },
  trashButton: {
    bot: "50px",
    width: "20px",
    height: "20px",
    padding: "8px",
    borderRadius: "50%",
    color: colorscheme.red4,
    cursor: "pointer",
  },
};

const Note = ({ title, content, state, onClose, onDelete, ...rest }) => {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={styleSheet.root}
      wrap="nowrap"
    >
      <Grid item style={styleSheet.notePadTop}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={11} style={styleSheet.titleTextContainer}>
            <p style={styleSheet.titleText}>{title}</p>
            <div style={styleSheet.line}></div>
          </Grid>
          <Grid item xs={1} style={styleSheet.closeButtonContainer}>
            <div style={styleSheet.closeButton}>
              <ImCross size={20} color={colorscheme.red4} onClick={onClose} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={styleSheet.notePadBot}>
        <Grid container direction="column">
          <Grid item style={styleSheet.contentTextContainer}>
            <p style={styleSheet.contentText}>{content}</p>
          </Grid>
          <Grid item style={styleSheet.trashButtonContainer}>
            <div style={styleSheet.trashButton}>
              <FiTrash size={20} color={colorscheme.red4} onClick={onDelete} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Note;
