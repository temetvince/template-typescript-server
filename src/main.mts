import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './graphql/resolvers.mjs';
import typeDefs from './graphql/schema.mjs';

const main = async () => {
   const server = new ApolloServer({
      typeDefs,
      resolvers,
   });

   const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
   });

   console.log(`Server ready at: ${url}`);
};

await main();
