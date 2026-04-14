import express from 'express';
import cookieParser from 'cookie-parser';
import pizzasRoutes from "./src/routes/pizza.js";
import branchesRoutes from "./src/routes/branches.js"
import employeesRoutes from "./src/routes/employees.js"
import reviewsRoutes from "./src/routes/reviews.js"
import customerRoutes from "./src/routes/customer.js"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import registerEmployeeRoutes from "./src/routes/registerEmployee.js"

//Creo una constante que es igual a la libreria express
const app = express();

app.use(cookieParser());

//Para que la API acepte JSON
app.use(express.json());

app.use("/api/pizzas", pizzasRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employee", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);

export default app;