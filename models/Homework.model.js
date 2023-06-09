const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const HomeworkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    classroom: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    rubric: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Rubric',
        required: true
    },
}, {timestamps: true});

module.exports = Mongoose.model("Homework", HomeworkSchema);