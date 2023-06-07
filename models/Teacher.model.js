const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const TeacherSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
     },
     password: {
        type: String,
        required: true
     },
     email: {
        type: String,
        required: true,
        trim: true,
        unique: true
     }
    }, { timestamps: true });
    
    module.exports = Mongoose.model("Teacher", TeacherSchema);