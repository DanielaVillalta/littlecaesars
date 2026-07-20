import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import swaggerUi from "swagger-ui-express"

import { validateAuthCookie } from './src/middlewares/authMiddleware.js';
import limiter from './src/middlewares/limiter.js';

import swaggerDocument from "./src/utils/montetabor-60e-littlecaesars-1.0-resolved.json" with {type: "json"}

import pizzasRoutes from "./src/routes/pizza.js";
import branchesRoutes from "./src/routes/branches.js"
import employeesRoutes from "./src/routes/employees.js"
import reviewsRoutes from "./src/routes/reviews.js"
import customerRoutes from "./src/routes/customer.js"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import registerEmployeeRoutes from "./src/routes/registerEmployee.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import logoutRoutes from "./src/routes/logout.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
import providerRoutes from "./src/routes/provider.js"
import cartRoutes from "./src/routes/cart.js"
import wompiRoutes from "./src/routes/wompi.js"
import deliveriesRoutes from "./src/routes/deliveries.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js"

//Creo una constante que es igual a la libreria express
const app = express();

app.use(cookieParser());

//Para que la API acepte JSON
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //Permitir el envío de cookies y credenciales
    credentials: true
}))

app.use(limiter)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api/pizzas", pizzasRoutes);
app.use("/api/branches", validateAuthCookie(["admin"]), branchesRoutes);
app.use("/api/employees", validateAuthCookie(["admin"]), employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/loginCustomers", loginCustomerRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wompi", wompiRoutes);
app.use("/api/deliveries", deliveriesRoutes);
app.use("/api/registerAdmin", registerAdminRoutes);
app.use("/api/loginAdmin", loginAdminRoutes);

export default app;