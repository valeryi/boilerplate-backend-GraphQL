import { fileLoader } from "merge-graphql-schemas";
import path from 'path';

export const readyResolvers = fileLoader(path.join(__dirname, '**/*.resolvers.js'));
