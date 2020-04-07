import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServer } from "apollo-server-express";
import { Application } from 'express';

import { applyGeneralValidation } from './validation/general';
import { readySchema } from './schemas';
import { readyResolvers } from './resolvers';
import { customDirectives, schemaMiddlewares } from './validation';

const schemaMiddleware = makeExecutableSchema({
    typeDefs: readySchema,
    resolvers: readyResolvers,
    schemaDirectives: customDirectives
});

const schema = applyMiddleware(schemaMiddleware, schemaMiddlewares.middleware);
applyGeneralValidation(schemaMiddleware);

const apolloServer = new ApolloServer({
    schema: schema,
    debug: true,
    context: {}
})

export const applyGraphQLMiddleware = (app: Application) => {
    apolloServer.applyMiddleware({ app });
}


// CHALLENGE: Write my own solution of using partials of schema and resolvers as a library for npm - in place of deprecated "merge-graphql-schemas"