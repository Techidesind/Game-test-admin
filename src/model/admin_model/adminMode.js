const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    name: {type:String, trim: true, required: [true, "Admin name is required"]},
    email: {type: String, trim: true, required: [true, "Admin email is required"]},
    status: {type: String, enum: ["active", "inactive", "delete"], default: "active"},
    password: {type: String, trim: true, required: [true, "Password is required"]},
}, {timestamps: true});

module.exports = mongoose.model("Admin", AdminSchema)