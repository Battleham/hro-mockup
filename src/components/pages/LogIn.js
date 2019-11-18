import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const LogIn = ({ setUser, users, setPageName }) => {
	setPageName("Login");

	const [login, setLoginInfo] = useState({
		username: "",
		password: "",
		errors: "No errors",
		visibility: "hidden"
	});

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
			visibility: login.visibility
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

	const { username, password } = login;

	const onChange = e =>
		setLoginInfo({ ...login, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();

		let me = null;
		users.forEach(user => {
			if (
				user.username === login.username &&
				user.password === login.password
			) {
				me = user;
			}
		});
		if (!!me) {
			login.errors = `Successfully logged in as ${login.username}`;
			setLoginInfo({ ...login, visibility: "visible" });
			setUser(me);
			return <Redirect to="/" />;
		} else {
			login.errors = "Username or password is incorrect";
			setLoginInfo({ ...login, visibility: "visible" });
		}
		console.log("User ", me);
	};
	return (
		<div style={styles.mainDiv}>
			<form style={styles.loginForm}>
				<h2>Login</h2>
				<div>
					<div style={{ ...styles.elementSize, ...styles.errors }}>
						{login.errors}
					</div>
					<input
						style={styles.elementSize}
						type="text"
						placeholder="Please enter your username"
						name="username"
						value={username}
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
					>
						Log In
					</button>
				</div>
			</form>
		</div>
	);
};

export default LogIn;
