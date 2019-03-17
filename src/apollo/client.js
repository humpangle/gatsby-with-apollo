import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  fetch,
  fetchOptions: {
    'Access-Control-Allow-Origin': '*',
  },
});
