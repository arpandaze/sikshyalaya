import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/tag.css";
import CustomButton from "../../../components/CustomButton";

const Tag = ({ tagName, onDelete, ...rest }) => {
  return (
    <Grid container direction="row" className="tag_root">
      <Grid item>
        <CustomButton
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
