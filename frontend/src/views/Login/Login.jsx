import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "../../components/Button";
import theme from "../../utils/colors";
import * as yup from "yup";
import Tab from "../../components/Tab";

const styleSheet = {
  tabButton: {
    width: "80px",
    height: "30px",
    backgroundColor: "transparent",
  },
  tabActiveButton: {
    width: "80px",
    height: "30px",
    backgroundColor: "transparent",
    borderBottom: "2px solid " + theme.red4,
  },
  loginButton: {
    width: "400px",
    height: "65px",
    backgroundColor: theme.red4,
    color: theme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
  guestButton: {
    width: "400px",
    height: "65px",
    backgroundColor: theme.black,
    color: theme.white,
    borderRadius: "15px",
    fontSize: "1.2em",
  },
  inputButton: {
    outline: "none",
    border: "none",
    borderBottom: "2px solid " + theme.grey1,
    fontSize: "1.2em",
    background: "transparent",
  },
  inputLabel: { fontSize: "1.2em" },
};
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
});
const Login = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <div>
        <div>
          <Button
            name="Student"
            onClick={() => {
              setActive(active ? 0 : 1);
            }}
            colorStyles={
              active ? styleSheet.tabActiveButton : styleSheet.tabButton
            }
          />
          <Button
            name="Teacher"
            onClick={() => {
              setActive(active ? 0 : 1);
            }}
            colorStyles={
              active ? styleSheet.tabButton : styleSheet.tabActiveButton
            }
          />
        </div>
        <h1>Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          //   onSubmit={async (values) => {
          //     await new Promise((r) => setTimeout(r, 500));
          //     alert(JSON.stringify(values, null, 2));
          //   }}
        >
          <Form>
            <Field
              id="email"
              name="email"
              placeholder="Email"
              style={styleSheet.inputButton}
            />
            <br />
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              style={styleSheet.inputButton}
            />
            <Button name="Login" colorStyles={styleSheet.loginButton} />
            <Button name="Guest" colorStyles={styleSheet.guestButton} />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
