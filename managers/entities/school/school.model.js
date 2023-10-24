const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
