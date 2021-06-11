import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import Image from "../Image";
import { UserContext } from "../../utils/Contexts/UserContext";
import "./statics/css/miniProfile.css";
import configs from "../../utils/configs";

const MiniProfile = ({
	id,
	username,
	src,
	program,
	semester,
	year,
	...rest
}) => {
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justify="flex-start"
			className="miniProfile_root"
			wrap="wrap"
		>
			<Grid item  className="miniProfile_ImageRoot">
				<div className="miniProfile_greenDot"></div>
				<Image src={src} addStyles="miniProfile_Image" />
			</Grid>

			<Grid item  className="miniProfile_nameContainer">
				<p className="miniProfile_name">{username}</p>
			</Grid>
			<Grid item  className="miniProfile_descriptionOuter">
				<p className="miniProfile_description">
					{program}
					<br />
					{year} Year /{semester} Semester
				</p>
			</Grid>
		</Grid>
	);
};

export default MiniProfile;
