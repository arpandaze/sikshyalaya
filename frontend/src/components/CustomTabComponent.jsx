import React from "react";
import "./statics/css/customTabComponent.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const CustomTabComponent = ({
  name,
  dropdown = false,
  value,
  onChange,
  type,
  placeHolder,
  tabList,
  addStyles,
  ...rest
}) => {
  return (
    <div className="customTab_root">
      <Tabs
        value={value}
        onChange={onChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        {tabList &&
          tabList.map((tab) => (
            <Tab key={tab.id} icon={tab.icon} label={tab.label} />
          ))}
      </Tabs>
    </div>
  );
};

export default CustomTabComponent;
