/*
Campos:
    name
    lastName
    email
    password
    birthdate
    isVerified
    loginAttemps
    timeOut
*/

import {Shema, model} from "mongoose"

const customersSchema = new Shema ({
    name: {type: String},
    lastname: {type: String},
    birthdate: {type: Date},
    email: {type: String},
    password: {type: String},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Date},
}, {
    timeStamps: true,
    strict: false
})

export default model ("Customer", customersSchema)