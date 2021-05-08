import React from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import FancyButton from "./FancyButton";
import "./statics/css/adminBoxSmall.css";

const styleSheet = {
  button: {
    backgroundColor: colorscheme.purple4,
  },
};

const AdminBoxSmall = ({ cardData, ...rest }) => {
  const data = cardData;
  return (
    <div className="adminBoxSmall_container">
      {cardData ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className="adminBoxSmall_root"
        >
          <Grid item xs={7} className="adminBoxSmall_row1">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              className="adminBoxSmall_row_col_box"
            >
              <Grid item className="adminBoxSmall_row_col_1">
                <p className="adminBoxSmall_row_col_1_bold">{data.title}</p>{" "}
                <br />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} className="adminBoxSmall_row2">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item className="adminBoxSmall_buttonContainer">
                <FancyButton colorStyles={styleSheet.button}></FancyButton>
              </Grid>

              <Grid item className="adminBoxSmall_row2_bot">
                <p className="adminBoxSmall_row2_bot_text">{data.bottomText}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminBoxSmall;
