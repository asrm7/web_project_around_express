const mongoose = require("mongoose");
const { isURL } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v, { protocols: ["http", "https"], require_protocol: true }),
      message: "O campo avatar deve ser um link válido.",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
