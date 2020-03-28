import React, { useState } from "react";
//import { Redirect } from "react-router-dom";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";
import { getLoggedInUser } from "../../App";

const LOG_IN = gql`
	mutation LogIn($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			name
			email
			role {
				name
			}
			permissions {
				name
			}
		}
	}
`;

const ADD_LOCAL_USER = gql`
	mutation AddLocalUser($user: LocalUserInput!) {
		addLocalUser(user: $user) @client
	}
`;

const LogIn = () => {
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
		errors: "No errors",
		visibility: "hidden",
		loggedIn: false
	});

	const [logIn, { data, loading, error, called }] = useMutation(LOG_IN);
	const [addLocalUser] = useMutation(ADD_LOCAL_USER);

	if (called && !loading && data && !loginInfo.loggedIn) {
		if (data.login) {
			setLoginInfo({ ...loginInfo, loggedIn: true });
			const { name, email: userEmail, role, permissions } = data.login;
			let user = {
				name,
				email: userEmail,
				role: role.name,
				permissions: permissions,
				__typename: "LocalUser"
			};
			console.log(user);
			addLocalUser({ variables: { user } });
		}
	}
	if (error) {
		console.log(error);
	}

	const styles = {
		elementSize: {
			width: "200px",
			height: "30px",
			borderRadius: "2px",
			marginBottom: "10px"
		},
		button: {
			background: "none",
			color: "white",
			fontWeight: "bold",
			fontSize: "1.25rem",
			cursor: "pointer"
		},
		errors: {
			width: "auto",
			minWidth: "100px",
			border: "1px solid red",
			color: "white",
			fontWeight: "bold",
			paddingLeft: "3px",
			visibility: loginInfo.visibility
		},
		loginForm: {
			border: "2px solid black",
			borderRadius: "2px",
			boxShadow: "0 0 20px black",
			padding: "20px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		},
		mainDiv: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh"
		}
	};

	const { email, password } = loginInfo;

	const onChange = e =>
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		logIn({
			variables: { email, password }
		});
		console.log("Mutating...");
	};
	return (
		<div style={styles.mainDiv}>
			<form style={styles.loginForm}>
				<h2>Login</h2>
				<div>
					<div style={{ ...styles.elementSize, ...styles.errors }}>
						{loginInfo.errors}
					</div>
					<input
						style={styles.elementSize}
						type="email"
						placeholder="Please enter your email"
						name="email"
						value={email}
						onChange={onChange}
					/>
				</div>
				<div>
					<input
						style={styles.elementSize}
						type="password"
						placeholder="Please enter your password"
						name="password"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div>
					<button
						style={{ ...styles.elementSize, ...styles.button }}
						onClick={onSubmit}
						disabled={loading}
					>
						Log In
					</button>
				</div>
			</form>
		</div>
	);
};

export default LogIn;
