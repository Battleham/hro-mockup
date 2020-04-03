import { getLoggedInUser } from "./App";
export const resolvers = {
	Mutation: {
		addLocalUser: (_, { user }, { cache }) => {
			user = { ...user, __typename: "LocalUser" };
			console.log(user);
			cache.writeQuery({
				query: getLoggedInUser,
				data: {
					user: {
						name: user.name,
						email: user.email,
						role: user.role,
						permissions: user.permissions,
						__typename: "LocalUser"
					},
					loggedIn: true
				}
			});
			// cache.writeData({
			// 	data: {
			// 		user: {
			// 			name: user.name,
			// 			email: user.email,
			// 			role: user.role,
			// 			permissions: user.permissions,
			// 			__typename: "LocalUser"
			// 		}
			// 	}
			// });
			return user;
		},
		logout(_, __, { cache }) {
			document.cookie =
				"sid=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
			cache.writeQuery({
				query: getLoggedInUser,
				data: {
					user: {
						name: "",
						email: "",
						role: "",
						permissions: [],
						__typename: "LocalUser"
					},
					loggedIn: false
				}
			});
		}
	}
};
