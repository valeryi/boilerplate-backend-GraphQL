import { readySchema } from './schemas';
import { readyResolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServer } from "apollo-server-express";
import { Application } from 'express';

const schema = makeExecutableSchema({ typeDefs: readySchema, resolvers: readyResolvers });
const middleware = applyMiddleware(schema);

const apolloServer = new ApolloServer({
    schema: middleware,
    debug: true
})

export const applyGraphQLMiddleware = (app: Application) => {
    apolloServer.applyMiddleware({ app });
}


// CHALLENGE: Write my own solution of using partials of schema and resolvers as a library for npm - in place of deprecated "merge-graphql-schemas"