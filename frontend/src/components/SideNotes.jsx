import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/sideNotes.css";

const SideNotes = ({id, title, content, onClick, ...rest }) => {
    return (
        <Grid
            container
            direction="column"
            className="sideNotes_root"
            onClick={onClick}
        >
            <Grid item className="sideNotes_innerContainer">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <Grid item className="sideNotes_titleTextContainer">
                        <p className="sideNotes_titleText">{title}</p>
                        <p className="sideNotes_titleText">{id}</p>
                    </Grid>
                    <Grid item className="sideNotes_contentTextContainer">
                        <p className="sideNotes_contentText">{content}</p>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SideNotes;
