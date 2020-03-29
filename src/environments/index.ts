import dotenv from 'dotenv';
import { development } from './development';
import { production } from './production';
dotenv.config();

export const env = (process.env.NODE_ENV === 'production') ? production : development;

// COMPLETE: Improve environments module and make it more comfortable and dynamic 