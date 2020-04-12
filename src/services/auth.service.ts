import BaseService from "./base.service";
import { compareSync } from "bcryptjs";
import { User } from "../models/users.model";
// import { AuthenticationError, DBError, ValidationError } from '../utils/';
import { userService } from '../services/user.service';
import { sign } from "../utils/jwt";
import { DB_Error } from "../errorHandlers/HTTPErrors/ServerError";
import { User as IUser } from './user.types';
import SimpleCrypto from 'simple-crypto-js';
import { mailService } from '../services/mail.service';

import { env } from "../environments";

class AuthService extends BaseService {

    constructor() {
        super(User);
    }

    async signIn(email: string, password: string) {
        const user = await this.findByEmail(email);

        if (!user) {
            //   throw new AuthenticationError(`User with this email doesn't exist: ${email}`, { errors: ['no such user'] })
            throw new Error(`User with this email doesn't exist: ${email}`); // TODO: Proper Error 
        }

        if (!compareSync(password, user.password)) {
            //   throw new AuthenticationError(`Wrong creadentials`, { errors: ['wrong password'] })
            throw new Error(`Wrong creadentials`);
        }

        if (!user.confirmed) {
            //   throw new AuthenticationError(`Email address is not confirmed yet. First, confirm your email address!`, { errors: ['email not confirmed'] })
            throw new Error(`Email address is not confirmed yet. First, confirm your email address!`);
        }

        // TODO: Remove 'password' property from the object. delete user.password - doesn't work 
        user.password = null;

        const token = sign({ userData: user });

        return {
            success: true, message: 'Logged in successfully!', token
        };

    }

    async signUp(params: any) {

        // FIXME: This check if user exists is hardcoded twice. It would be more confortable to make it as a function
        // in case I need to change something so I don't need to change the same thing in two different places
        // this chech is in <Signup> and <CreateUser> Resolvers
        const user = await userService.findByEmail(params.email);

        if (user) {
            //   throw new AuthenticationError(`This user already exists in the database`, { errors: ['user already exists'] })
            throw new Error(`This user already exists in the database`);
        }

        const created = await userService.createUser(params);

        this.sendConfirmLetter(created);

        return {
            success: true,
            message: 'User created successfully',
            created
        };
    }

    sendConfirmLetter(user: IUser) {

        const crypter = new SimpleCrypto((env.token_secret as string));
        const encrypt = crypter.encrypt(user._id);

        const template = {
            name: 'SignUp',
            data: {
                encrypt
            }
        }

        mailService.sendEmail({
            to: user.email,
            subject: "Confirmation"
        }, template);
    }

    async confirm(id: string) {

        const user = await this.findById(id);

        if (!user) {
            //   throw new ValidationError(`Broken confirmation link: ${user.id}`);
            throw new Error(`Broken confirmation link: ${user.id}`);
        };

        if (user.confirmed) {
            // throw new ValidationError(`Email address had already been confirmed`);
            throw new Error(`Email address had already been confirmed`);
        }

        return await this.update(id, { confirmed: true })
            .then((updated: any) => {
                // TODO: Set redirect after email confirmation
                return { message: `User with id "${updated._id}" is successfully updated`, success: true, updated };
            })
            .catch((err: Error) => {
                if (err) {
                    throw new DB_Error(`Couldn't update ${{ confirmed: true }} for a user with id: ${id}`);
                }
            })
    }
}

export const authService = new AuthService();
