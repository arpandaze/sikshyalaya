import React from "react";
import colorscheme from "../../../utils/colors";
import Grid from "@material-ui/core/Grid";
import FancyButton from "../../../components/FancyButton";
import "./statics/css/adminBoxSmall.css";

const AdminBoxSmall = ({ cardData, onSubmit, type, ...rest }) => {
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
              justify="center"
              className="adminBoxSmall_row_col_box"
            >
              <Grid item className="adminBoxSmall_row_col_1">
                <p className="adminBoxSmall_row_col_1_bold">{data.name}</p>
                {data.code ? (
                  <p className="adminBoxSmall_row_col_1_bold">{data.code}</p>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} className="adminBoxSmall_row2">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
            >
              {type !== "course" ? (
                <Grid item className="adminBoxSmall_buttonContainer">
                  <FancyButton color={colorscheme.purple} onSubmit={onSubmit} />
                </Grid>
              ) : (
                <></>
              )}

              <Grid item className="adminBoxSmall_row2_bot">
                <p className="adminBoxSmall_row2_bot_text">
                  {data.address != null ? data.address : " "}
                </p>
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
