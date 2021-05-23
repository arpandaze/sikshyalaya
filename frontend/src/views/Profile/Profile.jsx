import React, { useState, useHistory } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Image from "../../components/Image";
import profile from "../../assets/pp.jpg";
import DashboardLayout from "../../components/DashboardLayout";
import "./statics/css/profile.css";
import colorscheme from "../../utils/colors";
import CustomTextField from "./../../components/CustomTextField";
import { useAPI } from "../../utils/useAPI";

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
    first_name: yup
        .string("Enter your name")
        .required("First Name is required"),
    middle_name: yup.string("Enter your Middle Name"),
    last_name: yup
        .string("Enter your Last Name")
        .required("Last Name is required"),
    address: yup.string("Enter your address").required("Address is required"),
    join_year: yup
        .string("Enter Joined Year")
        .required("Join year is required"),
    dob: yup
        .string("Enter Date of Birth")
        .required("Date of Birth is required"),
    phone_number: yup.number().typeError("Not a valid phone number"),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email!")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Minimum 8 characters")
        .required("Password is required"),
    semester: yup.number().required("Semester is required"),
    program: yup.number().required("Program is required"),
    confirm_password: yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
            .string()
            .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});

const Profile = () => {
    const programFormatter = (value) =>
        value.data.map((item) => ({
            name: item.name,
            value: item.id,
        }));

    const [program] = useAPI(
        { endpoint: "/api/v1/program/all/" },
        programFormatter
    );
    const [selectImage, setSelectedImage] = useState();
    const [isPicked, setIsPicked] = useState(false);

    const onFileUpload = (e) => {
        setSelectedImage(e.target.files[0]);
        setIsPicked(true);
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
                            <label
                                for="photo-upload"
                                className="profile_imageContainer"
                            >
                                <div>
                                    <Image
                                        for="photo-upload"
                                        src={profile}
                                        addStyles="profile_image"
                                    />
                                </div>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileUpload}
                                    style={{ display: "none" }}
                                />
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
                                        initialValues={{
                                            first_name: "",
                                            middle_name: "",
                                            last_name: "",
                                            address: "",
                                            program: "",
                                            semester: "",
                                            join_year: "",
                                            dob: "",
                                            email: "",
                                            password: "",
                                            confirm_password: "",
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            alert(
                                                JSON.stringify(values, null, 2)
                                            );
                                        }}
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
                                                    xs={6}
                                                    style={{
                                                        padding:
                                                            "0px 20px 0px 0px",
                                                    }}
                                                >
                                                    <CustomTextField
                                                        name="first_name"
                                                        type="text"
                                                        placeHolder="First Name"
                                                        id="first_name"
                                                        addStyles="profile_inputButton"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CustomTextField
                                                        name="middle_name"
                                                        type="text"
                                                        placeHolder="Middle Name"
                                                        id="middle_name"
                                                        addStyles="profile_inputButton"
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    style={{
                                                        padding:
                                                            "0px 20px 0px 0px",
                                                    }}
                                                >
                                                    <CustomTextField
                                                        name="last_name"
                                                        type="text"
                                                        placeHolder="Last Name"
                                                        id="last_name"
                                                        addStyles="profile_inputButton"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <CustomTextField
                                                        name="address"
                                                        type="text"
                                                        placeHolder="Address"
                                                        id="address"
                                                        addStyles="profile_inputButton"
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    style={{
                                                        padding:
                                                            "0px 20px 0px 0px",
                                                    }}
                                                >
                                                    <CustomTextField
                                                        name="program"
                                                        dropdown={true}
                                                        type="text"
                                                        placeHolder="Program"
                                                        menuItems={
                                                            program || []
                                                        }
                                                        id="program"
                                                        addStyles="profile_inputButton"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
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
                                                        onChange={(e) => {
                                                            console.log(e);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    style={{
                                                        padding:
                                                            "0px 20px 0px 0px",
                                                    }}
                                                >
                                                    <CustomTextField
                                                        id="join_year"
                                                        name="join_year"
                                                        label="Join year"
                                                        type="date"
                                                        defaultValue=""
                                                        className="profile_inputButton"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
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
                                                <Grid item xs={12}>
                                                    <CustomTextField
                                                        name="email"
                                                        type="text"
                                                        placeHolder="Email"
                                                        id="email"
                                                        addStyles="profile_inputButton"
                                                        autoComplete="on"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
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
                                                </Grid>
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
