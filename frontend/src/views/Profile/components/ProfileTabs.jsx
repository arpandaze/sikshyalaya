import React, { useState, useEffect, useContext } from "react";
import Image from "../../../components/Image";
import Grid from "@material-ui/core/Grid";
import defaultProfile from "../../../assets/default-profile.svg";
import configs from "../../../utils/configs";
import "./css/profileTabs.css";
import TabIcons from "./TabIcons";
import { UserContext } from "../../../utils/Contexts/UserContext";

const ProfileTabs = ({ tabs }) => {
  const { user, setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({ name: null, image: null });

  useEffect(() => {
    let department = null;
    try {
      department = user.group.program.name;
    } catch (e) {}
    const formattedData = {
      name: user.full_name,
      department: department,
      image: user.profile_image,
    };
    setUserInfo(formattedData);
  }, [user]);
  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="flex_start"
        justify="flex-start"
        className="profileTabs_tabs"
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
            className="profileTabs_topPart"
          >
            <Grid item xs={4} className="profileTabs_imageContainer">
              <Image
                src={
                  userInfo.image
                    ? `${configs.PUBLIC_FILES_PATH}/${userInfo.image}`
                    : defaultProfile
                }
                alt="profile-image"
                addStyles="profileTabs_image"
              />
            </Grid>
            <Grid item xs={7} className="profileTabs_nameContainer">
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <span className="profileTabs_name">{userInfo.name}</span>
                </Grid>
                <Grid item>
                  <span className="profileTabs_departname">
                    {userInfo.department}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="profileTabs_tabIconContainer">
          {tabs.map((item) => (
            <TabIcons name={item.name} icon={item.icon} id={item.id} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileTabs;
