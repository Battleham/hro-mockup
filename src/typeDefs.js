import gql from "graphql-tag";

export const typeDefs = gql`
	input LocalUserInput {
		email: String!
		name: String!
		role: String!
		permission: [String]!
	}
	extend type Mutation {
		addLocalUser(user: LocalUserInput): LocalUser
	}
`;
