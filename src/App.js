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

const apolloClient = new ApolloClient({
	uri: "http://134.122.22.200/graphql",
	cache: cache,
	clientState: {
		defaults: {
			user: { name: "None", role: "None", permissions: [] },
			__typename: "LocalUser"
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

const getLoggedInUser = gql`
	query LoggedInUser {
		user @client {
			name
			email
			permissions {
				name
			}
		}
	}
`;

const IsUserLoggedIn = () => {
	const { data } = useQuery(getLoggedInUser);
	useEffect(() => {
		console.log("Cache:", data);
	}, [data]);
	console.log(data);
	return data.user ? <Pages /> : <Login />;
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
