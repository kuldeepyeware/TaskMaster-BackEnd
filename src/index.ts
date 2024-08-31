import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Task } from "./tables/task/index.js";

const typeDefs = `#graphql
  ${Task.types}

  type Query {
    ${Task.queries}
  }

  type Mutation {
    ${Task.mutations}
  }
`;

const resolvers = {
  Query: {
    ...Task.resolvers.queries,
  },
  Mutation: {
    ...Task.resolvers.mutations,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
