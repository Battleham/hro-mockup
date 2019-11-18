import React from "react";
import Lead from "../Lead";
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

const Leads = props => {
	const { setPageName, user } = props;
	setPageName("Leads");
	const classes = useStyles();
	console.log("Leads: ", user.myLeads);
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
							<TableCell>Name</TableCell>
							<TableCell align="right">Phone</TableCell>
							<TableCell align="right">Type</TableCell>
							<TableCell align="right">Email</TableCell>
							<TableCell align="right">Agent</TableCell>
							<TableCell align="right">Source</TableCell>
							<TableCell align="right">Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.myLeads.map(lead => (
							<TableRow key={lead.name}>
								<TableCell component="th" scope="row">
									{lead.name}
								</TableCell>
								<TableCell align="right">{lead.phone}</TableCell>
								<TableCell align="right">{lead.type}</TableCell>
								<TableCell align="right">{lead.email}</TableCell>
								{lead.assigned ? (
									<TableCell align="right">{lead.agent}</TableCell>
								) : (
									<TableCell align="right">Unassigned</TableCell>
								)}
								<TableCell align="right">{lead.source}</TableCell>
								<TableCell align="right">{lead.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default Leads;
