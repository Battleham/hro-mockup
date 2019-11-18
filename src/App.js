import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Route2 from "./components/pages/Route2";
import Login from "./components/pages/LogIn";
import Leads from "./components/pages/Leads";

const theme = createMuiTheme({
	palette: {
		type: "dark"
	}
});

const mockData = {
	users: [
		{
			fullName: "Venessa Kiyoko",
			username: "venessa",
			password: "1234",
			usergroup: "exec"
		},
		{
			fullName: "Meghan Borges",
			username: "meghan",
			password: "1234",
			usergroup: "admin"
		},
		{
			fullName: "Lillian Lang",
			username: "lillian",
			password: "1234",
			usergroup: "admin"
		}
	],
	leads: [
		{
			name: "Clark Kent",
			phone: "123-456-7890",
			type: "b2c",
			email: "clarkkent@gmail.com",
			assigned: true,
			agent: "meghan",
			source: "twitter",
			date: "11-01-2019"
		},
		{
			name: "Louis Lane",
			phone: "123-456-7890",
			type: "b2c",
			email: "louis@gmail.com",
			assigned: true,
			agent: "meghan",
			source: "facebook",
			date: "11-08-2019"
		},
		{
			name: "Bruce Wayne",
			phone: "123-456-7890",
			type: "b2c",
			email: "darkknight@gmail.com",
			assigned: true,
			agent: "lillian",
			source: "instagram",
			date: "11-03-2019"
		},
		{
			name: "The Joker",
			phone: "123-456-7890",
			type: "b2c",
			email: "jokesonyou@gmail.com",
			assigned: false,
			source: "linkedin",
			date: "11-05-2019"
		},
		{
			name: "The Penguin",
			phone: "123-456-7890",
			type: "b2c",
			email: "tuxedoallthetime@gmail.com",
			assigned: false,
			source: "website",
			date: "11-11-2019"
		},
		{
			name: "Global News 1",
			phone: "123-456-7890",
			type: "b2b",
			email: "info@globalnews.com",
			assigned: false,
			source: "call in",
			date: "11-04-2019"
		},
		{
			name: "Daily Planet",
			phone: "123-456-7890",
			type: "b2b",
			email: "contact@dailyplanet.com",
			assigned: true,
			agent: "venessa",
			source: "referral",
			date: "11-12-2019"
		}
	]
};

function App() {
	const [pageName, setPageName] = useState("Home");
	const [loggedInUser, setUser] = useState(null);
	return (
		<div>
			{!loggedInUser ? (
				<Login setPageName={setPageName} setUser={setUser} data={mockData} />
			) : (
				<Router>
					<ThemeProvider theme={theme}>
						<Layout
							pageName={pageName}
							user={loggedInUser}
							setUser={setUser}
							data={mockData}
						>
							<Switch>
								<Route
									exact
									path="/"
									render={props => (
										<Dashboard
											{...props}
											setPageName={setPageName}
											user={loggedInUser}
											data={mockData}
										/>
									)}
								/>
								<Route
									exact
									path="/leads"
									render={props => (
										<Leads
											{...props}
											setPageName={setPageName}
											user={loggedInUser}
										/>
									)}
								/>
								<Route
									exact
									path="/2"
									render={props => (
										<Route2 {...props} setPageName={setPageName} />
									)}
								/>
								<Route
									exact
									path="/logout"
									render={props => {
										setUser(null);
										return <Redirect to="/" />;
									}}
								/>
								<Redirect from="/login" to="/" />
							</Switch>
						</Layout>
					</ThemeProvider>
				</Router>
			)}
		</div>
	);
}

export default App;
