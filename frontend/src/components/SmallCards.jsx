import React from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import FancyButton from "./FancyButton";

const styleSheet = {
  container: {
    width: "400px",
    height: "220px",
    background: colorscheme.white,
    borderRadius: "20px",
    boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
  },
  root: { flexGrow: "1" },
  image: {
    borderRadius: "50%",
  },
  row_col_box: {
    height: "220px",
    position: "relative",
  },
  row1: {},
  row2: {
    height: "220px",
  },
  buttonContainer: {
    height: "35px",
    position: "relative",
    top: "20px",
  },
  button: {
    backgroundColor: colorscheme.purple4,
  },
  row_col_1: {
    position: "relative",
    top: "-30px",
  },
  row_col_2: {
    position: "relative",
  },
  row_col_1_bold: {
    fontSize: "1.7em",
    fontWeight: "bold",
  },
  row_col_1_light: {
    fontSize: "0.8em",
    fontWeight: "600",
    color: colorscheme.grey1,
  },
  row_col_2_bold: {
    fontSize: "1.1em",
    fontWeight: "bold",
  },
  row_col_2_light: {
    fontSize: "0.9em",
    fontWeight: "600",
    color: colorscheme.grey1,
  },
  row2_bot: {
    position: "relative",
    top: "120px",
    textAlign: "right",
  },
  row2_bot_text: {
    fontSize: "0.9em",
    color: colorscheme.blue,
  },
  timeText: {
    fontSize: "1.0em",
    fontWeight: "400",
  },
};

const SmallCards = ({ cardData, addStyles, ...rest }) => {
  const data = cardData;
  const finalStyles = { ...styleSheet.container, ...addStyles };
  return (
    <div style={finalStyles}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        style={styleSheet.root}
      >
        <Grid item xs={7} style={styleSheet.row1}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            style={styleSheet.row_col_box}
          >
            <Grid item style={styleSheet.row_col_1}>
              <a style={styleSheet.row_col_1_bold}>{data.title}</a> <br />
              <a style={styleSheet.row_col_1_light}>{data.titleDescription}</a>
            </Grid>
            <Grid item style={styleSheet.row_col_2}>
              <a style={styleSheet.row_col_2_bold}>{data.title2}</a> <br />
              <br />
              <a style={styleSheet.row_col_2_light}>{data.title2Description}</a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={styleSheet.row2}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
            spacing={2}
          >
            {data.button ? (
              <Grid item style={styleSheet.buttonContainer}>
                <FancyButton colorStyles={styleSheet.button}></FancyButton>
              </Grid>
            ) : (
              <Grid item style={styleSheet.buttonContainer}>
                <a style={styleSheet.timeText}>{data.time}</a>
              </Grid>
            )}
            <Grid item style={styleSheet.row2_bot}>
              <a style={styleSheet.row2_bot_text}>{data.bottomText}</a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SmallCards;
