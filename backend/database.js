import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI)

//Comprobar que todo funciona

//Creo una constante que es igual a la conexión
const connection = mongoose.connection

connection.once("open", () => {
    console.log("Database is connected")
})

connection.on("disconnected", () => {
    console.log("Database is disconnected")
})

connection.on("error", (err) => {
    console.log("Error found: " + err)
})