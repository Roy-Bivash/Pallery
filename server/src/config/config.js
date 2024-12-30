import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL, // TODO : change later
    JWT_SECRET: process.env.JWT_SECRET,
}