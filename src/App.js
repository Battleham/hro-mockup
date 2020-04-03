import React from "react";
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
	const { data, loading } = useQuery(getLoggedInUser);
	if (loading) return <p>Loading...</p>;
	console.log("Cache:", data);
	return data.loggedIn ? <Pages user={data.user} /> : <Login />;
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
