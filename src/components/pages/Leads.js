import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Utils from "../../utils";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const MY_LEADS_QUERY = gql`
	query myContacts {
		myContacts {
			id
			name
			email
			phone
			source
			life_stage {
				name
			}
			user {
				name
			}
			created_at
		}
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

const Leads = ({ setPageName }) => {
	setPageName("Leads");
	const classes = useStyles();
	const { data, loading } = useQuery(MY_LEADS_QUERY);
	if (loading) return <p>Loading...</p>;
	const myContacts = data ? data.myContacts : null;

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
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell align="center">Phone</TableCell>
							{/* <TableCell align="right">Type</TableCell> */}
							<TableCell align="center">Email</TableCell>
							<TableCell align="center">Agent</TableCell>
							<TableCell align="center">Source</TableCell>
							<TableCell align="right">Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{myContacts.map(lead => (
							<TableRow key={lead.id}>
								<TableCell>{lead.id}</TableCell>
								<TableCell component="th" scope="row">
									{lead.name}
								</TableCell>
								<TableCell align="center">{lead.phone}</TableCell>
								<TableCell align="center">{lead.email}</TableCell>
								{lead.user ? (
									<TableCell align="center">{lead.user.name}</TableCell>
								) : (
									<TableCell align="center">Unassigned</TableCell>
								)}
								<TableCell align="center">{lead.source}</TableCell>
								<TableCell align="right">
									{Utils.dateString(lead.created_at)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default Leads;
