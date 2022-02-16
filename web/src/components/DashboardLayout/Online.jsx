import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "../Image";
import MiniProfile from "./MiniProfile";
import "./statics/css/online.css";

const Online = ({
  id,
  username,
  src,
  program,
  semester,
  year,
  online,
  miniProfile,
  size,
  ...rest
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className="online_root"
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      {/* {miniProfile ? (
        <Grid item className="online_miniProfile">
          <MiniProfile
            id={id}
            username={username}
            src={src}
            year={year}
            semester={semester}
            program={program}
            className="online_miniprofileinner"
          />
        </Grid>
      ) : (
        <Formik
          initialValues={{
            isPresent: false,
          }}
        >
          <Form>
            <Grid item className="online_check">
              <Checkbox
                id="is_present"
                name="isPresent"
                label=""
                className="online_randomCheckBox"
              />
            </Grid>
          </Form>
        </Formik>
      )} */}
      <Grid
        item
        className={
          !toggle ? "online_ImageRoot" : "online_ImageRoot online_disabled"
        }
      >
        <div className="online_greenDot" hidden={!online}></div>
        <Image src={src} addStyles="online_Image" />
      </Grid>
      <Grid
        item
        className={
          !toggle
            ? "online_nameContainer"
            : "online_nameContainer online_disabled"
        }
      >
        <p className="online_name">{username}</p>
      </Grid>
      <Grid item xs={12} className={toggle ? "" : "online_disabled"}>
        <MiniProfile
          id={id}
          username={username}
          src={src}
          year={year}
          semester={semester}
          program={program}
        />
      </Grid>
    </Grid>
  );
};

export default Online;
