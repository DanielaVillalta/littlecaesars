import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";

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

app.use("/api/pizzas", pizzasRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employee", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/loginCustomers", loginCustomerRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);

export default app;