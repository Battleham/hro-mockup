import React from "react";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LOGOUT_QUERY = gql`
	mutation logout {
		logout
		logout @client
	}
`;

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		},

		backgroundColor: "inherit"
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(1)
	},
	mainBody: {
		backgroundColor: "#fff",
		color: "black"
	},
	userName: {
		color: "inherit",
		fontSize: "1.25rem",
		marginRight: "20px"
	}
}));
//"#21bf74"
const StyledListItem = withStyles({
	root: {
		"&$selected": {
			backgroundColor: "#9fc5c5",
			color: "#303030",
			"&:hover": {
				backgroundColor: "#9fc5c5",
				color: "#303030"
			}
		},

		"&:hover": {
			backgroundColor: "#9fc5c5",
			color: "#303030"
		}
	},
	selected: {}
})(ListItem);

function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const location = useLocation();
	let history = useHistory();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [logoutFunction] = useMutation(LOGOUT_QUERY);

	const logOut = () => {
		logoutFunction();
		return <Redirect to="/" />;
	};
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const navigate = path => {
		setMobileOpen(false);
		history.push(path);
	};

	const drawer = (
		<div>
			<div
				className={classes.toolbar}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Typography variant="h6">HRO CRM</Typography>
			</div>
			<List>
				<StyledListItem
					dense
					button
					onClick={() => {
						navigate("/");
					}}
					selected={location.pathname === "/"}
					ContainerComponent="li"
				>
					<ListItemIcon style={{ color: "inherit" }}>
						<InsertChartIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</StyledListItem>
				<StyledListItem
					dense
					button
					onClick={() => {
						navigate("/leads");
					}}
					selected={location.pathname === "/leads"}
				>
					<ListItemIcon style={{ color: "inherit" }}>
						<MenuBookIcon />
					</ListItemIcon>
					<ListItemText primary="Leads" />
				</StyledListItem>
			</List>
			{props.user.role === "Executive" ? (
				<List>
					<StyledListItem
						value={"/users"}
						button
						dense
						onClick={() => {
							navigate("/users");
						}}
						selected={location.pathname === "/users"}
					>
						<ListItemIcon>
							<PeopleAltIcon />
						</ListItemIcon>
						<ListItemText primary="Users" />
					</StyledListItem>
				</List>
			) : null}
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{props.pageName}
					</Typography>
				</Toolbar>
				<div
					style={{
						position: "absolute",
						right: "10px",
						top: "50%",
						transform: "translateY(-50%)"
					}}
				>
					{props.user ? (
						<div>
							<span className={classes.userName}>{props.user.fullName}</span>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={logOut}
							>
								<ExitToAppIcon />
							</IconButton>
						</div>
					) : (
						<Link to="/login">Login</Link>
					)}
				</div>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	container: PropTypes.instanceOf(
		typeof Element === "undefined" ? Object : Element
	)
};

export default ResponsiveDrawer;
