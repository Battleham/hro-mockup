import React from "react";
import Lead from "../Lead";

const Leads = props => {
	const { setPageName, user } = props;
	setPageName("Leads");
	console.log("Leads: ", user.myLeads);
	return (
		<div>
			{user.myLeads.map(lead => {
				return <Lead lead={lead} key={lead.name} />;
			})}
		</div>
	);
};

export default Leads;
