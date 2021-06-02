import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/discussionBox.css";
import colorscheme from "../../../utils/colors";
import Switch from "@material-ui/core/Switch";
import { BiSend } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Message from "./Message";
import Image from "../../../components/Image";
import defaultProfile from "../../../assets/default-profile.svg";

const DiscussionBox = () => {
	const [checked, setChecked] = useState(false);
	const [messages, setMessage] = useState([
		{
			name: "Rushab",
			photo: defaultProfile,
			text: "Hello",
			sentTime: "2021",
		},
		{ name: "Arpan", photo: defaultProfile, text: "Hi", sentTime: "2020" },
	]);
	return (
		<>
			<Grid
				container
				direction="row"
				alignItems="center"
				justify="center"
				className="discussionBox_root"
			>
				<Grid item className="discussionBox_chatBox">
					<Message messages={messages} />
				</Grid>
				<Grid item xs={11} className="discussionBox_inputField">
					<Grid
						container
						direction="row"
						alignItems="center"
						justify="flex-start"
					>
						<Grid item xs={9} className="discussionBox_textFieldRoot">
							<input
								name="chat_input"
								type="text"
								placeholder="Type Something..."
								className="discussionBox_textField"
							/>
						</Grid>
						<Grid item xs={1} className="discussionBox_sendButtonContainer">
							<button
								type="submit"
								name="submit"
								style={{
									border: "none",
									backgroundColor: colorscheme.white,
								}}
							>
								<BiSend
									size={30}
									color={colorscheme.green3}
									className="discussionBox_sendButton"
								/>
							</button>
						</Grid>
						<Grid item xs={2} className="discussionBox_switchContainer">
							<p className="discussionBox_label">Send Anonymously</p>
							<Switch
								name="isAnonymus"
								checked={checked}
								onChange={(value) => {
									setChecked(!checked);
								}}
								className="discussionBox_switch"
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default DiscussionBox;
