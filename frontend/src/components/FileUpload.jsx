import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneDialog } from "material-ui-dropzone";
import { BsFilePlus } from "react-icons/bs";

const FileUpload = ({
  label,
  maxSize = 10000000,
  acceptedFiles,
  previews = true,
  iconSize = 20,
  handleSave,
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
        <span className="fileUpload_label">{label}</span>
        <BsFilePlus className="fileUpload_icon" size={iconSize} />
      </Grid>
      <DropzoneDialog
        open={uploadPopUp}
        maxFileSize={maxSize}
        onSave={() => {
          handleSave();
          setUploadPopUp(false);
        }}
        acceptedFiles={acceptedFiles}
        showPreviews={previews}
        onClose={handleUploadClose}
      />
    </>
  );
};

export { FileUpload };
