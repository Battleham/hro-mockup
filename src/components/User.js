import React from "react";

const User = ({ user }) => {
	const { username, fullName, usergroup } = user;
	return (
		<div>
			<span className="grid">{fullName}</span>
			<span className="grid">{username}</span>
			<span className="grid">{usergroup}</span>
		</div>
	);
};

export default User;
