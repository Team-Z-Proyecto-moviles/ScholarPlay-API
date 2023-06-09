const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ClassroomSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    teacher: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    student: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ]
  }, { timestamps: true });

  module.exports = Mongoose.model("Classroom", ClassroomSchema);