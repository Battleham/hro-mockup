import React from "react";

const Lead = props => {
	const {
		name,
		phone,
		type,
		email,
		assigned,
		agent,
		source,
		date
	} = props.lead;
	return (
		<div>
			<span style={{ marginRight: "5px" }}>{name}</span>
			<span style={{ marginRight: "5px" }}>{phone}</span>
			<span style={{ marginRight: "5px" }}>{type}</span>
			<span style={{ marginRight: "5px" }}>{email}</span>
			{assigned ? (
				<span style={{ marginRight: "5px" }}>{agent}</span>
			) : (
				<span style={{ marginRight: "5px" }}>Unassigned</span>
			)}
			<span style={{ marginRight: "5px" }}>{source}</span>
			<span style={{ marginRight: "5px" }}>{date}</span>
		</div>
	);
};

export default Lead;
