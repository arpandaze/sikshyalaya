import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import Image from "../../../components/Image";
import "./statics/css/message.css";

const Message = ({ messages }) => {
	return (
		<Grid
			container
			direction="column"
			justify="flex-start"
			alignItems="flex-start"
		>
			<Grid item>
				{messages &&
					messages.length !== 0 &&
					messages.map((msg, index) => (
						<Grid
							container
							direction="row"
							alignItems="flex-start"
							justify="flex-start"
						>
							<Grid item>
								<Image src={msg.photo} />
							</Grid>
							<ul>
								<li key={index}>
									<Grid item>{msg.name}</Grid>

									<Grid item>{msg.text}</Grid>
								</li>
							</ul>
						</Grid>
					))}
			</Grid>
		</Grid>
	);
};

export default Message;
