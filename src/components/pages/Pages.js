import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";

import Leads from "./Leads";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Layout from "../Layout";

const theme = createMuiTheme({
	palette: {
		type: "dark",
		background: {
			default: "#303030",
			paper: "#545454"
		}
	}
});

function Pages() {
	const [pageName, setPageName] = useState("Home");
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Layout pageName={pageName}>
					<Switch>
						<Route
							exact
							path="/"
							render={props => (
								<Dashboard {...props} setPageName={setPageName} />
							)}
						/>
						<Route
							exact
							path="/leads"
							render={props => <Leads {...props} setPageName={setPageName} />}
						/>
						<Route
							exact
							path="/users"
							render={props => <Users {...props} setPageName={setPageName} />}
						/>
						<Route
							exact
							path="/logout"
							render={props => {
								return <Redirect to="/" />;
							}}
						/>
						<Redirect from="/login" to="/" />
					</Switch>
				</Layout>
			</ThemeProvider>
		</Router>
	);
}

export default Pages;
