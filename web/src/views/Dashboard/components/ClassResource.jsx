import React from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/classResource.css";
import ResourceIcons from "../../../components/ResourceIcons";
import configs from "../../../utils/configs";

const ClassResource = ({ resourceList, ...rest }) => {
  return (
    <>
      {resourceList.map((resource) => (
        <div>
          <Grid
            container="row"
            alignItems="center"
            className="classResource_root"
            wrap="nowrap"
          >
            <Grid item className="classResource_resourceIcon">
              <ResourceIcons iconType={resource.type} />
            </Grid>
            <Grid item className="classResource_resourceListContainer">
              <a
                href={configs.PUBLIC_FILES_PATH + resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="classResource_resourceList" key={resource.id}>
                  <p>{resource.name}</p>
                </li>
              </a>
              <li className="classResource_resourceListTimeText">
                {console.log(resource.time)}
                {timeDifference(resource.time)}
              </li>
              <div className="classResource_seperator"></div>
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};

const timeDifference = (postDate) => {
  const date1 = new Date(postDate);
  const date2 = new Date();
  const date3 = new Date(date1.toLocaleString() + " UTC");
  const diffTime = Math.abs(date2 - date3);
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
