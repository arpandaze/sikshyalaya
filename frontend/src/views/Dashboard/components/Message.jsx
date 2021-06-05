import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import Image from "../../../components/Image";
import { UserContext } from "../../../utils/Contexts/UserContext";
import "./statics/css/message.css";

const Message = ({ messages }) => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="flex-start"
			className="message_root"
		>
			<Grid item>
				{messages &&
					messages.length !== 0 &&
					messages.map((msg, index) => (
						<>
							<Grid item>
								<p className="message_name">{msg.name}</p>
							</Grid>
							<Grid
								container
								direction="row"
								alignItems="center"
								justify="flex-start"
							>
								<Grid item className="message_ImageRoot">
									<Image src={msg.photo} addStyles="message_Image" />
								</Grid>
								<Grid item>
									<Grid container direction="column">
										<Grid item className="message_Content">
											<span style={{ color: colorscheme.white }}>
												{msg.text}
											</span>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</>
					))}
			</Grid>
		</Grid>
	);
};

export default Message;
