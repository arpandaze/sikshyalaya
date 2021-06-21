import React, { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import GeneralInfo from "./GeneralInfo";
import PasswordChange from "./PasswordChange";

const RenderForm = () => {
  const { tabId } = useContext(ProfileContext);
  switch (tabId) {
    case 1:
      return <GeneralInfo />;
      break;
    case 2:
      return <PasswordChange />;
      break;
    case 3:
      return <></>;
      break;
    default:
      return <GeneralInfo />;
  }
};

export default RenderForm;
