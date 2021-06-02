import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import CustomTextField from "../../../components/CustomTextField";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import Switch from "@material-ui/core/Switch";
import { BiSend } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const DiscussionBox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        className="discussionBox_root"
      >
        <Grid item className="discussionBox_chatBox"></Grid>
        <Grid item xs={11} className="discussionBox_inputField">
          <Formik
            initialValues={{ chat_input: "", isAnonymus: checked }}
            onSubmit={(values) =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500)
            }
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                >
                  <Grid item xs={9} className="discussionBox_textFieldRoot">
                    <CustomTextField
                      name="chat_input"
                      type="text"
                      placeHolder="Type Something..."
                      addStyles="discussionBox_textField"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    className="discussionBox_sendButtonContainer"
                  >
                    <button
                      type="submit"
                      name="submit"
                      style={{
                        border: "none",
                        backgroundColor: colorscheme.white,
                      }}
                    >
                      <BiSend
                        size={30}
                        color={colorscheme.green3}
                        className="discussionBox_sendButton"
                      />
                    </button>
                  </Grid>
                  <Grid item xs={2} className="discussionBox_switchContainer">
                    <p className="discussionBox_label">Send Anonymously</p>
                    <Switch
                      name="isAnonymus"
                      checked={checked}
                      onChange={(value) => {
                        setFieldValue("isAnonymus", !checked);
                        setChecked(!checked);
                      }}
                      className="discussionBox_switch"
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default DiscussionBox;
