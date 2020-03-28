export const resolvers = {
    Query: {

        users: async (_obj: any, _args: any, _context: any, _info: any) => {
            return 7;
        }
    },

    Mutation: {

        createUser: async (_obj: any, { data }: { data: any }, _context: any, _info: any) => {

            return data;
        },

    }
}



