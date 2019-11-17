import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { Fragment } from "react";

const Layout = props => {
	return (
		<Fragment>
			<ResponsiveDrawer>{props.children}</ResponsiveDrawer>
		</Fragment>
	);
};

export default Layout;
