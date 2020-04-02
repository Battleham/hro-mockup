import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect, Link } from "react-router-dom";

const Home = ({ setPageName }) => {
	setPageName("Dashboard");
	return (
		<div>
			<div>
				<Button
					onClick={() => {
						console.log("Button Clicked");
						return <Redirect to="/leads" />;
					}}
				>
					Leads
				</Button>
				<Link to="/leads">Leads</Link>
			</div>
		</div>
	);
};

export default Home;
