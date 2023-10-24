const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { username, password, email } = require("../../_common/schema.models");

// Create a schema for the User
const userSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: true,
    ...username,
  },
  password: {
    type: String,
    required: true,
    ...password,
  },
  role: {
    type: String,
    enum: ["admin", "student", "superadmin"],
    default: "student",
  },
  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },
  ],
});

// Create a model for the User
const User = mongoose.model("User", userSchema);

module.exports = User;
