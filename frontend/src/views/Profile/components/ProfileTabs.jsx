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
    <Grid
      container
      direction="column"
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
          <Grid item xs={5} className="profileTabs_imageContainer">
            <div className="profielTabs_imageContainerInside">
              <Image
                src={
                  userInfo.image
                    ? `${configs.PUBLIC_FILES_PATH}/${userInfo.image}`
                    : defaultProfile
                }
                alt="profile-image"
                addStyles="profileTabs_image"
              />
            </div>
          </Grid>
          <Grid item xs={7} className="profileTabs_nameContainer">
            <Grid container direction="column">
              <Grid item>
                <p className="profileTabs_name">{userInfo.name}</p>
              </Grid>
              <Grid item>
                <p className="profileTabs_departname">{userInfo.department}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="profileTabs_tabIconContainer">
          {tabs.map((item, index) => (
            <TabIcons
              key={index}
              name={item.name}
              icon={item.icon}
              id={item.id}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileTabs;
