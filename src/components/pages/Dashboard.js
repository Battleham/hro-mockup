import React from "react";

const Home = ({ setPageName, data, user }) => {
	setPageName("Dashboard");
	return (
		<div>
			<div>Leads: {user.myLeads.length}</div>
			{user.usergroup === "exec" ? <div>Users: {data.users.length}</div> : null}
		</div>
	);
};

export default Home;
