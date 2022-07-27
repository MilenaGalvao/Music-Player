import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

export const client = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://desired-lion-49.hasura.app/v1/graphql',
        options:{
            reconnect: true,
            connectionParams: {
                headers : { 'x-hasura-admin-secret' : 'ZTM347Yb1rP2RoSpFSK4RU1kTUO3c4w7mpB9S0VYQ3lsWCqG2oNJiS2vXhuteHYq' },
            }
        }
    }),
    cache: new InMemoryCache()
});