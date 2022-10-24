import mongoose from "mongoose"

mongoose.connect("mongodb+srv://maria:wm0qcuhtgyfpCgNM@cluster0.c9udyre.mongodb.net/API_REST");

let db = mongoose.connection;

export default db;
