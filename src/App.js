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
import Home from "./components/pages/Home";
import Route1 from "./components/pages/Route1";
import Route2 from "./components/pages/Route2";
import Login from "./components/pages/LogIn";

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
			agent: "meghan"
		},
		{
			name: "Louis Lane",
			phone: "123-456-7890",
			type: "b2c",
			email: "louis@gmail.com",
			assigned: true,
			agent: "meghan"
		},
		{
			name: "Bruce Wayne",
			phone: "123-456-7890",
			type: "b2c",
			email: "darkknight@gmail.com",
			assigned: true,
			agent: "lillian"
		},
		{
			name: "The Joker",
			phone: "123-456-7890",
			type: "b2c",
			email: "jokesonyou@gmail.com",
			assigned: false
		},
		{
			name: "The Penguin",
			phone: "123-456-7890",
			type: "b2c",
			email: "tuxedoallthetime@gmail.com",
			assigned: false
		},
		{
			name: "Global News 1",
			phone: "123-456-7890",
			type: "b2b",
			email: "info@globalnews.com",
			assigned: false
		},
		{
			name: "Daily Planet",
			phone: "123-456-7890",
			type: "b2b",
			email: "contact@dailyplanet.com",
			assigned: true,
			agent: "venessa"
		}
	]
};

function App() {
	const [pageName, setPageName] = useState("Home");
	const [loggedInUser, setUser] = useState(null);
	return (
		<div>
			{!loggedInUser ? (
				<Login
					setPageName={setPageName}
					setUser={setUser}
					users={mockData.users}
				/>
			) : (
				<Router>
					<ThemeProvider theme={theme}>
						<Layout pageName={pageName} user={loggedInUser} setUser={setUser}>
							<Switch>
								<Route
									exact
									path="/"
									render={props => (
										<Home {...props} setPageName={setPageName} />
									)}
								/>
								<Route
									exact
									path="/1"
									render={props => (
										<Route1 {...props} setPageName={setPageName} />
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
