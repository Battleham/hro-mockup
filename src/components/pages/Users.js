import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
	const { user, users, setPageName } = props;
	const classes = useStyles();
	setPageName("Users");
	if (user.usergroup !== "exec") {
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
								<TableCell align="right">Username</TableCell>
								<TableCell align="right">User Group</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map(user => (
								<TableRow key={user.username}>
									<TableCell component="th" scope="row">
										{user.fullName}
									</TableCell>
									<TableCell align="right">{user.username}</TableCell>
									<TableCell align="right">{user.usergroup}</TableCell>
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
