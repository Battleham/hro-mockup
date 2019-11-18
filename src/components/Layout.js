import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { Fragment } from "react";

const Layout = ({ user, data, ...props }) => {
	return (
		<Fragment>
			<ResponsiveDrawer
				pageName={props.pageName}
				user={user}
				setUser={props.setUser}
			>
				{props.children}
			</ResponsiveDrawer>
		</Fragment>
	);
};

export default Layout;
