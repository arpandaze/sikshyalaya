import React from "react";

const buttonStyles = {
	outline: "none",
	border: "none",
	cursor: "pointer",
};

const Button = ({ children, name, colorStyles, ...rest }) => {
	const finalStyles = { ...buttonStyles, ...colorStyles };
	return (
		<div>
			<button {...rest} id={name} style={finalStyles}>
				{name}
			</button>
		</div>
	);
};

export default Button;
