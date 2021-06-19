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

const tabs = [
  {
    id: 1,
    name: "General Information",
    icon: <IoMdInformationCircleOutline size={30} />,
  },
  {
    id: 2,
    name: "Security",
    icon: <BiShieldQuarter size={30} />,
  },
  {
    id: 3,
    name: "Sessions",
    icon: <IoMdInformationCircleOutline size={30} />,
  },
];

const Profile = () => {
  const [tabId, setTabId] = useState(null);
  const id_value = useMemo(() => ({ tabId, setTabId }), [tabId, setTabId]);

  return (
    <DashboardLayout>
      <ProfileContext.Provider value={id_value}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
          className="profile_root"
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justfiy="flex-start"
              className="profile_mainContainer"
            >
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                  className="profile_topBar"
                >
                  <Grid item xs={12} className="profile_titleBox">
                    <p className="profile_title">My profile</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" className="profile_Container">
                  <Grid item xs={3} className="profile_tabsContainer">
                    <ProfileTabs tabs={tabs} />
                  </Grid>
                  <Grid item xs={8} className="profile_profileBox">
                    <RenderForm />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ProfileContext.Provider>
    </DashboardLayout>
  );
};

export default Profile;
