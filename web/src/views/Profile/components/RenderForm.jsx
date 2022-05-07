import React, { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import GeneralInfo from "./GeneralInfo";
import PasswordChange from "./PasswordChange";
import Session from "./Session";
import TwoFactor from "./TwoFactor";

const RenderForm = () => {
  const { tabId } = useContext(ProfileContext);
  switch (tabId) {
    case 1:
      return <GeneralInfo />;
    case 2:
      return <PasswordChange />;
    case 3:
      return <Session />;
    case 4:
      return <TwoFactor />;
    default:
      return <GeneralInfo />;
  }
};

export default RenderForm;
