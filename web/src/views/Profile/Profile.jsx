import React, { useState, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import "./statics/css/profile.css";
import CustomTextField from "./../../components/CustomTextField";
import ProfileTabs from "./components/ProfileTabs";
import GeneralInfo from "./components/GeneralInfo";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BiShieldQuarter } from "react-icons/bi";
import { ProfileContext } from "./ProfileContext";
import RenderForm from "./components/RenderForm";
import { MdDevices } from "react-icons/md";

const tabs = [
  {
    id: 1,
    name: "General Information",
    icon: <IoMdInformationCircleOutline className="profile_icons" />,
  },
  {
    id: 2,
    name: "Password",
    icon: <BiShieldQuarter className="profile_icons" />,
  },
  {
    id: 3,
    name: "Sessions",
    icon: <MdDevices className="profile_icons" />,
  },
  {
    id: 4,
    name: "Two Factor Auth",
    icon: <BiShieldQuarter className="profile_icons" />,
  },
];

const Profile = () => {
  const [tabId, setTabId] = useState(null);
  const id_value = useMemo(() => ({ tabId, setTabId }), [tabId, setTabId]);

  return (
    <DashboardLayout mode={1}>
      <ProfileContext.Provider value={id_value}>
        <Grid container direction="column" className="profile_root">
          <Grid item className="profile_topBar">
            <Grid
              container
              className="profile_topBarInside"
              alignItems="center"
            >
              <Grid item>
                <p className="profile_title">My Profile</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="profile_botBar">
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="center"
              className="profile_mainContainer"
            >
              <Grid item xs={3} className="profile_tabsContainer">
                <ProfileTabs tabs={tabs} />
              </Grid>
              <Grid item xs={8} className="profile_profileBox">
                <RenderForm />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ProfileContext.Provider>
    </DashboardLayout>
  );
};

export default Profile;
