import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log("API URL: ", process.env.NEXT_PUBLIC_API_URL);  // This will print the API URL to the console

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});
