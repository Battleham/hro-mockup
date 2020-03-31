import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/pages/LogIn";
import Pages from "./components/pages/Pages";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

import ApolloClient, { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

const cache = new InMemoryCache({});
const gqlUrl = "/graphql";
const apolloClient = new ApolloClient({
	uri: gqlUrl,
	cache: cache,
	credentials: "include",
	fetchOptions: {
		credentials: "include"
	},
	clientState: {
		defaults: {
			user: {
				name: "None",
				email: "asdf",
				role: "None",
				permissions: [],
				__typename: "LocalUser"
			},
			loggedIn: false
		},
		resolvers: resolvers,
		typeDefs: typeDefs
	}
});

// apolloClient
// 	.query({
// 		query: gql`
// 			query {
// 				role(id: ${roleId}) {
// 					name
// 					description
// 					permissions {
// 						name
// 						description
// 					}
// 				}
// 			}
// 		`
// 	})
// 	.then(result => console.log(result));

export const getLoggedInUser = gql`
	query LoggedInUser {
		user @client {
			name
			email
			role
			permissions {
				name
			}
		}
		loggedIn @client
	}
`;

const IsUserLoggedIn = () => {
	const { data } = useQuery(getLoggedInUser);
	useEffect(() => {
		console.log("Cache:", data);
	}, [data]);
	return data.loggedIn ? (
		<Pages />
	) : (
		<div>
			<div>
				<h3>Name: {data.user.name}</h3>
				<h3>Email: {data.user.email}</h3>
				<h3>Role: {data.user.role}</h3>
			</div>
			<Login />
		</div>
	);
};

function App() {
	//const [loggedInUser, setUser] = useState(null);
	return (
		<ApolloProvider client={apolloClient}>
			<IsUserLoggedIn />
		</ApolloProvider>
	);
}

export default App;
