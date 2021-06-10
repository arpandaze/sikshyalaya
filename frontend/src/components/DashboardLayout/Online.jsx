import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import Image from "../Image";
import { UserContext } from "../../utils/Contexts/UserContext";
import "./statics/css/online.css";
import configs from "../../utils/configs";

const Online = ({ id, username, src, ...rest }) => {
	return (
		<Grid
			container
			direction="row"
			justify="flex-start"
			alignItems="center"
			className="online_root"
		>
			<Grid item className="online_ImageRoot">
				<div className="online_greenDot"></div>
				<Image src={src} addStyles="online_Image" />
			</Grid>
			<Grid item className="online_nameContainer">
				<p className="online_name">{username}</p>
			</Grid>
		</Grid>
	);
};

export default Online;
