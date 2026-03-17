import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/littleCaesarDB")

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