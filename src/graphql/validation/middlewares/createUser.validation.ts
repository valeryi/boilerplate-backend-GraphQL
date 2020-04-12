export const middleware = {
    Mutation: {
        createUser: async (
            resolve: any,
            parent: any,
            args: any,
            context: any,
            info: any
        ) => {
            // Before
            const result = await resolve(parent, args, context, info);
            // After
            return result;
        },
    },
}