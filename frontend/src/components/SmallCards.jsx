import React from "react";
import colorscheme from "../utils/colors";
import Grid from "@material-ui/core/Grid";
import FancyButton from "./FancyButton";
import "./statics/css/smallCards.css";

const styleSheet = {
    container: {
        width: "360px",
        height: "220px",
        background: colorscheme.white,
        borderRadius: "20px",
        boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
    },

    button: {
        backgroundColor: colorscheme.purple4,
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
                            <p className="smallCards_row_col_1_bold">
                                {data.title}
                            </p>
                            <br />
                            <p className="smallCards_row_col_1_light">
                                {data.titleDescription}
                            </p>
                        </Grid>
                        <Grid item className="smallCards_row_col_2">
                            <p className="smallCards_row_col_2_bold">
                                {data.title2}
                            </p>
                            <br />
                            <br />
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
                        spacing={2}
                    >
                        {data.button ? (
                            <Grid item className="smallCards_buttonContainer">
                                <FancyButton
                                    colorStyles={styleSheet.button}
                                ></FancyButton>
                            </Grid>
                        ) : (
                            <Grid item className="smallCards_buttonContainer">
                                <p className="smallCards_timeText">
                                    {data.time}
                                </p>
                            </Grid>
                        )}
                        <Grid item className="smallCards_row2_bot">
                            <p className="smallCards_row2_bot_text">
                                {data.bottomText}
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SmallCards;
