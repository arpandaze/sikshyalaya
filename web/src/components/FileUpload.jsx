import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneDialog } from "material-ui-dropzone";
import { BsFilePlus } from "react-icons/bs";
import "./statics/css/fileupload.css";

const FileUpload = ({
  label,
  maxSize = 10000000,
  acceptedFiles,
  previews = true,
  iconSize = 20,
  handleSave,
  maxFiles = 3,
}) => {
  const [uploadPopUp, setUploadPopUp] = useState(false);

  const handleUploadOpen = () => {
    setUploadPopUp(true);
  };
  const handleUploadClose = () => {
    setUploadPopUp(false);
  };

  return (
    <>
      <Grid item onClick={handleUploadOpen}>
        <Grid container spacing={1} className="fileUpload_textContainer">
          <Grid item className="fileUpload_textContainerInnerMost">
            <span className="fileUpload_label">{label}</span>
          </Grid>
          <Grid item>
            <BsFilePlus className="fileUpload_icon" size={iconSize} />
          </Grid>
        </Grid>
      </Grid>
      <DropzoneDialog
        open={uploadPopUp}
        maxFileSize={maxSize}
        onSave={(files) => {
          handleSave(files);
          setUploadPopUp(false);
        }}
        acceptedFiles={acceptedFiles}
        showPreviews={previews}
        onClose={handleUploadClose}
        filesLimit={maxFiles}
      />
    </>
  );
};

export { FileUpload };
