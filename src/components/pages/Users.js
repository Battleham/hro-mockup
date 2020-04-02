import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const USERS_QUERY = gql`
	query getUsers {
		users {
			id
			name
			email
			role {
				name
			}
		}
		user @client {
			name
			email
			role
			permissions {
				name
			}
		}
		loggedIn @client
	}
`;

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	paper: {
		marginTop: theme.spacing(3),
		width: "100%",
		overflowX: "auto",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 650
	}
}));
const Users = props => {
	const { setPageName } = props;
	const classes = useStyles();
	setPageName("Users");
	const { data, loading } = useQuery(USERS_QUERY);
	if (loading) return <p>Loading...</p>;
	let { users, user } = data;
	console.log(data);
	if (user.role !== "Executive") {
		return <Redirect to="/" />;
	} else {
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Table
						className={classes.table}
						size="small"
						aria-label="a dense table"
					>
						<TableHead>
							<TableRow>
								<TableCell>Full Name</TableCell>
								<TableCell align="center">Email</TableCell>
								<TableCell align="right">User Group</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map(u => (
								<TableRow key={u.id}>
									<TableCell component="th" scope="row">
										{u.name}
									</TableCell>
									<TableCell align="center">{u.email}</TableCell>
									<TableCell align="right">{u.role.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
};

export default Users;
