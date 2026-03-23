import express from 'express';
import pizzasRoutes from "./src/routes/pizza.js";
import branchesRoutes from "./src/routes/branches.js"

//Creo una constante que es igual a la libreria express
const app = express();

//Para que la API acepte JSON
app.use(express.json());

app.use("/api/pizzas", pizzasRoutes);
app.use("/api/branches", branchesRoutes)

export default app;