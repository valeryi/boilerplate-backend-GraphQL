import { User } from "../../services/users/users.model";

interface InputUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string
}

export const resolvers = {

    Query: {
        allUsers: async (_parent: any, _args: any, _context: any, _info: any) => {
            const allUsers = User.find();

            // console.log('Resolver: ', _args);

            return allUsers;
        }
    },

    Mutation: {

        createUser: async (
            _obj: any,
            { data }: { data: InputUser },
            _context: any,
            _info: any) => {

            const user = await User.findOne({ email: data.email });

            if (user) {
                throw new Error('User already exists');
            }

            const newUser = await new User({ ...data }).save();

            return newUser;

        },

    }
}



