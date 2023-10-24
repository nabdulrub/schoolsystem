const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for the Classroom
const classroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create a model for the Classroom
const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
