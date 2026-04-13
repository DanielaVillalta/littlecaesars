import dotenv from "dotenv";

//Ejecutar la libreria dotenv
dotenv.config();

export const config = {
    JWT: {
        secret: process.env.JWT_Secret_key,
    }
}