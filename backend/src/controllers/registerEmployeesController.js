import nodemailer from "nodemailer"; //Enviar correos
import crypto from "crypto"; //Generar código aleatorio
import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar contraseña

import employeesModel from "../models/employees.js";

import { config } from "../../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
    try {
        //#1- Solicitar los datos a guardar
        const {
            name,
            lastName,
            DUI,
            birthdate,
            email,
            password,
            isVerified,
            status,
            idBranch
        } = req.body;

        const existsEmployee = await employeesModel.findOne({ email });

        if (existsEmployee) {
            return res.status(400).json({ message: "Employee already exists" })
        }

        const passwordHashed = await bcryptjs.hash(password, 10);

        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            { randomCode, name, lastName, DUI, birthdate, email, password: passwordHashed, isVerified, status, idBranch },
            config.JWT.secret,
            { expiresIn: "15m" }
        );
        res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: `Tu código de verificación es: ${randomCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("error" + error);
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Email sent" });
        });
    } catch (error) {
        console.error("error" + error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

registerEmployeesController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.registrationCookie;

        if (!token) {
            return res.status(400).json({ message: "Token not provided" });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const { randomCode: storedCode, name, lastName, DUI, birthdate, email, password, isVerified, status, idBranch } = decoded;

        

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        const newEmployee = employeesModel({
            name,
            lastName,
            DUI,
            birthdate,
            email,
            password,
            isVerified: true,
            status,
            idBranch
        });
        await newEmployee.save();

        res.clearCookie("registrationCookie");

        res.status(201).json({ message: "Employee registered successfully" });
    } catch (error) {
        console.error("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default registerEmployeesController;