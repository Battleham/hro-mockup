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
					}
					//loggedIn: true
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
		}
	}
};
