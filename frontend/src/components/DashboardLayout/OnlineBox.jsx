import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./statics/css/onlineBox.css";
import Profile from "./../../assets/pp.jpg";
import Online from "./Online";
import { WebsocketContext } from "../../utils/Contexts/WebsocketContext";
import { UserContext } from "../../utils/Contexts/UserContext";
import configs from "../../utils/configs";
import defaultProfile from "../../assets/default-profile.svg";

const users = [
  {
    id: 1,
    name: "Yughyaya Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 2,
    name: "Yugesh Upadhyitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 3,
    name: "Yugesh Upaya Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 4,
    name: "Yugesh Upadh",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 5,
    name: "Yugesh Upadhyaitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 6,
    name: "Yugesh Upadhytel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 7,
    name: "Yugesh Upadteasdlsasasadasdadadas",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 8,
    name: "Yugeadhyaya Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 9,
    name: "Yugesh Upa Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
  {
    id: 10,
    name: "Yuga Luitel",
    image: Profile,
    program: "Computer Science",
    year: "1st",
    semester: "II",
  },
];

var end = ["st", "nd", "rd", "th", "th"];
const OnlineBox = ({ miniProfile = true, size, ...rest }) => {
  const {
    chatHistory,
    sendMessage,
    setClassmatesState,
    setClassIDState,
    onlineState,
    classmatesState,
  } = useContext(WebsocketContext);

  const { user } = useContext(UserContext);

  const [classmates, setClassmates] = useState([]);
  useEffect(() => {
    if (classmatesState) {
      let year = Math.floor(user.group ? user.group.sem / 2 : 0);
      let cmates = Object.keys(classmatesState).map((item) => {
        console.log(item, typeof parseInt(item), onlineState);
        return {
          id: item,
          name: classmatesState[item].full_name,
          online:
            item == user.id
              ? true
              : onlineState.includes(parseInt(item))
              ? true
              : false,
          image: classmatesState[item].profile_image
            ? `${configs.PUBLIC_FILES_PATH}/${classmatesState[item].profile_image}`
            : defaultProfile,
          program: user.group.program.name,
          year: year ? String(year) + end[year - 1] : "NaN",
          semester: user.group
            ? user.group.sem % 2 === 1
              ? "I"
              : "II"
            : "NaN",
        };
      });
      console.log(cmates);
      setClassmates(cmates);
    }
  }, [classmatesState, JSON.stringify(onlineState)]);
  return (
		<Grid
			container
			direction="row"
			className="onlineBox_root"
			alignItems="center"
		>
			<Grid item className="online_titleBar">
				<Grid container direction="row">
					<Grid item>
						<div className="onlineBox_greenDot"></div>
					</Grid>
					<Grid item>
						<p className="onlineBox_courseTextTitle">Online Users</p>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} className="onlineBox_userlistContainerOuter">
				<Grid
					container
					direction="column"
					className="onlineBox_userlistContainer"
				>
					{classmates.map((user) => (
						<Grid item className="onlineBox_userList">
							<Online
								id={user.id}
								username={user.name}
								src={user.image}
								year={user.year}
								online={user.online}
								semester={user.semester}
								program={user.program}
								miniProfile={miniProfile}
								size={size}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default OnlineBox;
