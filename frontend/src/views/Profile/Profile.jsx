import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import defaultProfile from "../../assets/default-profile.svg";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/profile.css";
import CustomTextField from "./../../components/CustomTextField";
import useAPI from "../../utils/useAPI";
import callAPI from "../../utils/API";
import { UserContext } from "../../utils/Contexts/UserContext";
import configs from "../../utils/configs";

const programNames = [
  {
    name: "Computer Science",
    value: 10,
  },
  {
    name: "Chemical Engineering",
    value: 20,
  },
  {
    name: "Civil Engineering",
    value: 30,
  },
];
const semester = [
  { name: "I", value: 1 },
  { name: "II", value: 2 },
  { name: "III", value: 3 },
  { name: "IV", value: 4 },
  { name: "V", value: 5 },
  { name: "VI", value: 6 },
  { name: "VII", value: 7 },
  { name: "VIII", value: 8 },
];

const validationSchema = yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  dob: yup.string("Enter Date of Birth").required("Date of Birth is required"),
  phone_number: yup.number().typeError("Not a valid phone number"),
  semester: yup.number().required("Semester is required"),
});

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const groupFormatter = (req) => {
    return req.data;
  };
  const [group] = useAPI({ endpoint: "/api/v1/group/all/" }, groupFormatter);

  const programFormatter = (value) =>
    value.data.map((item) => ({
      name: item.name,
      value: item.id,
    }));

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
    console.log(group);
    let group_id_list = group.filter((item) => {
      if (
        item.sem === value.semester &&
        item.program_id === user.group.program.id
      ) {
        return item;
      }
    });

    let data = {
      full_name: value.name,
      address: value.address,
      dob: value.dob,
      email: value.email,
      contact_number: value.phone_number,
      group_id: group_id_list[0].id,
    };

    let resp = await callAPI({
      endpoint: "/api/v1/users/me/",
      method: "PUT",
      data: data,
    });

    if (resp.status === 200) {
      let imageData = new FormData();
      imageData.append("profile_photo", selectImage);
      let imageResp = await callAPI({
        endpoint: "/api/v1/users/me/profile/",
        method: "PUT",
        data: imageData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (imageResp.status === 200) {
        let newUserData = {
          ...resp.data,
          profile_image: `profiles/${imageResp.data.profile}`,
        };
        setUser(newUserData);
      }
    }
  };

  return (
    <DashboardLayout>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justify="flex-start"
        wrap="nowrap"
        className="profile_root"
      >
        <Grid item className="profile_titleContainer">
          <h1 className="profile_activeTitle">Edit your Profile</h1>
        </Grid>
        <Grid item className="profile_profileBoxContainer">
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            wrap="nowrap"
            className="profile_profileBox"
          >
            <Grid item xs={3} className="profile_imageContainer">
              <label for="photo-upload" className="profile_imageContainer">
                <div>
                  <Image
                    for="photo-upload"
                    src={
                      isPicked === true
                        ? tempImage
                        : user.profile_image == null
                        ? defaultProfile
                        : `${configs.PUBLIC_FILES_PATH}/${user.profile_image}`
                    }
                    addStyles="profile_image"
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
            <Grid item xs={9} className="profile_formBoxContainer">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="profile_container"
              >
                <Grid item>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      name: user.full_name,
                      address: user.address,
                      semester: user.group.sem,
                      dob: user.dob,
                      phone_number: user.contact_number,
                      email: user.email,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    <Form>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        className="profile_formContainer"
                      >
                        <Grid
                          item
                          xs={12}
                          style={{
                            padding: "0px 20px 0px 0px",
                          }}
                        >
                          <CustomTextField
                            name="name"
                            type="text"
                            placeHolder="Name"
                            id="name"
                            addStyles="profile_inputButton"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextField
                            name="address"
                            type="text"
                            placeHolder="Address"
                            id="address"
                            addStyles="profile_inputButton"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextField
                            name="semester"
                            dropdown={true}
                            type="text"
                            placeHolder="Semester"
                            menuItems={semester}
                            id="semester"
                            addStyles="profile_inputButton"
                            style={{
                              "max-width": "20",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextField
                            id="dob"
                            label="Birth Date"
                            type="date"
                            name="dob"
                            defaultValue=""
                            className="profile_inputButton"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextField
                            name="phone_number"
                            type="text"
                            placeHolder="Phone Number"
                            id="phone_number"
                            addStyles="profile_inputButton"
                            autoComplete="on"
                          />
                        </Grid>
                        {/* <Grid item xs={12}>
                          <CustomTextField
                            name="email"
                            type="text"
                            placeHolder="Email"
                            id="email"
                            addStyles="profile_inputButton"
                            autoComplete="on"
                          />
                        </Grid> */}
                        {/* <Grid item xs={12}>
                          <CustomTextField
                            name="password"
                            type="password"
                            placeHolder="Password"
                            id="password"
                            addStyles="profile_inputButton"
                            autoComplete="new-password"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextField
                            name="confirm_password"
                            type="password"
                            placeHolder="Confirm Password"
                            id="confirm_password"
                            addStyles="profile_inputButton"
                            autoComplete="new-password"
                          />
                        </Grid> */}
                        <Grid item>
                          <Button
                            name="Save"
                            type="submit"
                            addStyles="profile_button"
                          />
                        </Grid>
                      </Grid>
                    </Form>
                  </Formik>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Profile;
