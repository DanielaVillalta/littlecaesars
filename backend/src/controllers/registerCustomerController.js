import nodemailer from "nodemailer"; //Enviar correos
import crypto from "crypto"; //Generar código aleatorio
import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar contraseña

import customerModel from "../models/customers.js";

import { config } from "../../config.js";

//array de funciones
const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {
    try {
        //#1- Solicitar los datos a guardar
        const {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut
        } = req.body;

        //#2- Validar si el correo existe en la base de datos
        const existsCustomer = await customerModel.findOne({ email });

        if (existsCustomer) {
            return res.status(400).json({ message: "Customer already exists" })
        }

        //Encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        //Generar un código aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //Guardamos todo en un token
        const token = jsonwebtoken.sign(
            //#1- ¿Qué vamos a guardar?
            { randomCode, 
                name, 
                lastName, 
                birthdate, 
                email, 
                password: passwordHashed, isVerified, 
                loginAttemps, 
                timeOut },
            //#2- Secret key
            config.JWT.secret,
            //#3 ¿Cuándo expira?
            { expiresIn: "15m" }
        );

        //guardamos el token en una cookie
        res.cookie("registrationCookie", token, {maxAge: 15 *60 * 1000})
    } catch (error) {
        console.error("Error registering customer:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}