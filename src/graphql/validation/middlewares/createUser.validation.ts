export const middleware = {
    Mutation: {
        createUser: async (
            resolve: any,
            parent: any,
            args: any,
            context: any,
            info: any
        ) => {
            // You can use middleware to override arguments
            const { data } = args;
            const modified = { ...data, firstName: data.firstName.toUpperCase() };
            const result = await resolve(parent, { data: modified }, context, info);
            // Or change the returned values of resolvers
            return result;
        },
    },
}