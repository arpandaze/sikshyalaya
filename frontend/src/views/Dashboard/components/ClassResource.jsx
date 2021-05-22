import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/classResource.css";
import ResourceIcons from "./ResourceIcons";

const ClassResource = ({ resourceList, ...rest }) => {
  return (
    <>
      {resourceList.map((resource) => (
        <Grid
          container="row"
          justify="center"
          alignItems="center"
          className="classResource_root"
        >
          <Grid item className="classResource_resourceIcon">
            <ResourceIcons iconType={resource.type} />
          </Grid>
          <Grid item className="classResource_resourceListContainer">
            <li className="classResource_resourceList" key={resource.id}>
              {resource.name}
            </li>
            <li className="classResource_resourceListTimeText">
              {timeDifference(resource.time)}
            </li>
          </Grid>
          <span className="classResource_seperator"></span>
        </Grid>
      ))}
    </>
  );
};

const timeDifference = (postDate) => {
  const date1 = new Date(postDate);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffSeconds = diffTime / 1000;
  let timeDiff;
  let timeLetter;
  if (diffSeconds <= 60) {
    timeDiff = 0;
  } else if (diffSeconds <= 3600) {
    timeDiff = Math.floor(diffSeconds / 60);
    timeLetter = "min";
  } else if (diffSeconds <= 86400) {
    timeDiff = Math.floor(diffSeconds / (60 * 60));
    timeLetter = "hour";
  } else if (diffSeconds <= 2592000) {
    timeDiff = Math.floor(diffSeconds / (60 * 60 * 24));
    timeLetter = "day";
  } else if (diffSeconds <= 31104000) {
    timeDiff = Math.floor(diffSeconds / (60 * 60 * 24 * 30));
    timeLetter = "month";
  } else {
    timeDiff = Math.floor(diffSeconds / (60 * 60 * 24 * 30 * 12));
    timeLetter = "year";
  }

  if (timeDiff === 0) {
    return "just now";
  } else {
    return timeDiff + " " + timeLetter + " " + "ago";
  }
};

export default ClassResource;
