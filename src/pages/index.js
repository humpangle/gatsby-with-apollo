import React from 'react';
import { graphql } from 'gatsby';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql as apolloGraphql } from 'react-apollo';

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  query {
    rickAndMorty {
      character(id: 1) {
        name
        image
      }
    }
  }
`;

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  query {
    character(id: 1) {
      id
      name
      image
    }
  }
`;

export const Comp = ({
  data: {
    rickAndMorty: { character },
  },

  apolloQuery: { character: characterFromApollo, loading, error },
}) => (
  <div style={{ textAlign: 'center', width: '600px', margin: '50px auto' }}>
    <h1>{character.name} With His Pupper</h1>
    <p>
      Rick & Morty API data loads at build time. Dog API data loads at run time.
    </p>
    <div>
      <img src={character.image} alt={character.name} style={{ width: 300 }} />

      {(function() {
        if (loading) return <p>Loading pupper...</p>;
        if (error) return <p>Error: ${error.message}</p>;

        const { image: src, name } = characterFromApollo;
        return <img src={src} alt={name} style={{ maxWidth: 300 }} />;
      })()}
    </div>
  </div>
);

export default apolloGraphql(APOLLO_QUERY, {
  props: props => ({ apolloQuery: props.data }),
})(Comp);
