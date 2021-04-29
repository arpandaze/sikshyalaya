import React, { useState } from "react";
import colorscheme from "../utils/colors";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationBox from "../components/NotificationBox";
import Button from "../components/Button";
import { IconContext } from "react-icons";

const styleSheet = {
	notificationButtonContainer: {
		width: "35px",
		height: "35px",
		float: "right",
		position: "relative",
		top: "5px",
		right: "20px",
	},
	notificationIcon: {
		position: "absolute",
		cursor: "pointer",
	},
	notificationButton: {
		width: "35px",
		height: "35px",
		borderRadius: "50%",
		backgroundColor: colorscheme.red6,
	},
};

const NotificationButton = (props) => {
	const [clicked, setClicked] = useState(false);
	const [hovered, setHovered] = useState(false);

	return (
		<div style={styleSheet.notificationButtonContainer}>
			<div
				onMouseEnter={() => {
					setHovered(true);
				}}
				onMouseLeave={() => {
					setHovered(false);
				}}
				onClick={() => {
					setClicked(!clicked);
				}}
			>
				<IconContext.Provider
					value={{
						color: clicked
							? colorscheme.green3
							: hovered
							? colorscheme.grey2
							: colorscheme.red3,
					}}
				>
					<IoMdNotificationsOutline
						size={35}
						style={styleSheet.notificationIcon}
					></IoMdNotificationsOutline>
				</IconContext.Provider>
			</div>

			<Button colorStyles={styleSheet.notificationButton} />
			{clicked ? <NotificationBox /> : null}
		</div>
	);
};

export default NotificationButton;