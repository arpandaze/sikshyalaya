import React from "react";
import colorscheme from "../../../utils/colors";
import Grid from "@material-ui/core/Grid";
import FancyButton from "../../../components/FancyButton";
import "./statics/css/smallCards.css";
import { Link } from "react-router-dom";

const SmallCards = ({ cardData, addStyles, ...rest }) => {
  const data = cardData;
  return (
    <div className="smallCards_container">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className="smallCards_root"
      >
        <Grid item xs={7} className="smallCards_row1">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            className="smallCards_row_col_box"
          >
            <Grid item className="smallCards_row_col_1">
              <p className="smallCards_row_col_1_bold">{data.title}</p>

              <p className="smallCards_row_col_1_light">
                {data.titleDescription}
              </p>
            </Grid>
            <Grid item className="smallCards_row_col_2">
              <p className="smallCards_row_col_2_bold">{data.title2}</p>
              <p className="smallCards_row_col_2_light">
                {data.title2Description}
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className="smallCards_row2">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            {data.button ? (
              <Grid item className="smallCards_buttonContainer">
                <Link to={`class/${data.id}`}>
                  <FancyButton color={colorscheme.purple} />
                </Link>
              </Grid>
            ) : (
              <Grid item className="smallCards_buttonContainer">
                <p className="smallCards_timeText">{data.time}</p>
              </Grid>
            )}
            <Grid item className="smallCards_row2_bot">
              <p className="smallCards_row2_bot_text">{data.bottomText}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SmallCards;
