/*
Campos:
idEmployee
idPizza
rating (number)
comment (string)
*/

import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    idEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "Employees" },
    idPizza: { type: mongoose.Schema.Types.ObjectId, ref: "Pizzas" },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, maxlength: 200 }
}, {
    timestamps: true,
    strict: false
});

export default model("Reviews", reviewSchema);