export const resolvers = {
	Mutation: {
		addLocalUser: (_, { user }, { cache }) => {
			cache.writeData({
				data: {
					user: { ...user, __typename: "LocalUser" }
				}
			});
		}
	}
};
