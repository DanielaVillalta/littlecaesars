import express from "express"
import employeesController from "../controllers/employeesControler.js"

//De la libreria Express utilizo Router() que es para colocar los metodos HTTP (get, post, put, delete)

const router = express.Router();

router.route("/")
.get(employeesController.getEmployees) /*
.post(employeesController.insertEmployees);*/

router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployees);

export default router;