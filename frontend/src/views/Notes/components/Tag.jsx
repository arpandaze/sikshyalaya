import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/tag.css";
import Button from "../../../components/Button";

const Tag = ({ tagName, onDelete, ...rest }) => {
  return (
    <Grid container direction="row" className="tag_root">
      <Grid item>
        <Button
          name={tagName}
          addStyles="noteTagButton"
          onClicked={() => {
            onDelete(tagName);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Tag;
