import React, { useState, useContext } from "react";
import Image from "../../../components/Image";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import defaultProfile from "../../../assets/default-profile.svg";
import configs from "../../../utils/configs";
import { UserContext } from "../../../utils/Contexts/UserContext";
import CustomTextField from "./../../../components/CustomTextField";
import { DatePicker } from "../../../components/CustomDateTime";
import CustomButton from "../../../components/CustomButton";
import callAPI from "../../../utils/API";
import "./css/generalInfo.css";
import { format } from "date-fns";

const validationSchema = yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  dob: yup.string("Enter Date of Birth").required("Date of Birth is required"),
  phone_number: yup.number().typeError("Not a valid phone number"),
});

const GeneralInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectImage, setSelectedImage] = useState();
  const [tempImage, setTempImage] = useState();
  const [isPicked, setIsPicked] = useState(false);

  const onFileUpload = async (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setTempImage(reader.result);
    };
    setIsPicked(true);
    setSelectedImage(e.target.files[0]);
  };
  const onSubmit = async (value) => {
    let date = format(value.dob, "yyyy-MM-dd");
    let formData = new FormData();
    formData.append("full_name", value.name);
    formData.append("address", value.address);
    formData.append("dob", date);
    formData.append("email", value.email);
    formData.append("contact_number", value.phone_number);
    if (selectImage) {
      formData.append("profile_photo", selectImage || null);
    }

    let resp = await callAPI({
      endpoint: "/api/v1/users/me/",
      method: "PUT",
      data: formData,
    });

    if (resp.status === 200) {
      setUser(resp.data);
    }
  };
  return (
    <div>
      <Grid container direction="column" className="generalInfo_root">
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            className="generalInfo_titleBar"
          >
            <Grid item>
              <p className="generalInfo_title">General Information</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="generalInfo_topPart">
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item className="generalInfo_imageContainer">
              <label
                htmlFor="photo-upload"
                className="generalInfo_imageContainer"
              >
                <div className="generalInfo_imageWrapper">
                  <Image
                    src={
                      isPicked === true
                        ? tempImage
                        : user.profile_image == null
                        ? defaultProfile
                        : `${configs.PUBLIC_FILES_PATH}/${user.profile_image}`
                    }
                    alt="profile-image"
                    addStyles="generalInfo_image"
                  />
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={onFileUpload}
                  style={{ display: "none" }}
                ></input>
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: user.full_name,
              address: user.address,
              email: user.email,
              phone_number: user.contact_number,
              dob: new Date(user.dob),
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  className="generalInfo_formContainer"
                >
                  <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                    <CustomTextField
                      name="name"
                      type="text"
                      placeHolder="Name"
                      id="name"
                      addStyles="generalInfo_inputField"
                    />
                  </Grid>
                  <Grid item xs={6} style={{ padding: "0px 20px 0px 0px" }}>
                    <CustomTextField
                      name="address"
                      type="text"
                      placeHolder="Address"
                      id="address"
                      addStyles="generalInfo_inputField"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="email"
                      type="text"
                      placeHolder="Email"
                      id="email"
                      addStyles="generalInfo_inputField"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      name="phone_number"
                      type="text"
                      placeHolder="Phone Number"
                      id="phone_number"
                      addStyles="generalInfo_inputField"
                      autoComplete="on"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      id="dob"
                      label="Birth Date"
                      className="generalInfo_inputField"
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center">
                  <Grid item>
                    <CustomButton
                      name="Save"
                      disabled={!(selectImage || props.dirty)}
                      type="submit"
                      addStyles="generalInfo_button"
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneralInfo;
