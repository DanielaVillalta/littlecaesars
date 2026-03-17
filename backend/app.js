import express from 'express';
import pizzasRoutes from "./src/routes/pizza.js";

//Creo una constante que es igual a la libreria express
const app = express();

//Para que la API acepte JSON
app.use(express.json());

app.use("/api/pizzas", pizzasRoutes);

export default app;