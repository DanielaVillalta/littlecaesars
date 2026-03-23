//#1- Creo un array de funciones vacio
const branchesController = {};

import { trusted } from "mongoose";
//#2 Importo el Chema de la colección que voy a dedicar
import branchesModel from "../models/branches.js";

//SELECT
branchesController.getbranches = async (req, res) => {
  const branches = await branchesModel.find();
  res.json(branches);
};

//INSERT
branchesController.insertBranches = async (req, res) => {
  //#1- Solicito los datos que quiero guardar
  const { name, address, schedule, isActive } = req.body;
  //#2- lleno el Schema con estos datos
  const newBranch = new branchesModel({ name, address, schedule, isActive });
  //#3- Guardo todo en la base de datos
  await newBranch.save();

  res.json({ message: "Branch saved" });
};

//ELIMINAR
branchesController.deleteBranches = async (req, res) => {
  await branchesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Branch deleted" });
};

//ACTUALIZAR
branchesController.updateBranches = async (req, res) => {
  //#1- Solicito los nuevos valores
  const { name, address, schedule, isActive } = req.body;
  //#2- Actualizo
  await branchesModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      address,
      schedule,
      isActive,
    },
    { new: true },
  );

  res.json({ message: "Branch updated" });
};

export default branchesController;
