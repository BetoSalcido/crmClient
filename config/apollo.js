import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from "@apollo/link-context";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  fetch
});

//Update headers
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
 return {
   headers: {
     ...headers,
     authorization: token ? `Bearer ${token}` : ''
   }
 }
});

const Client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat( httpLink)
});

export default Client;