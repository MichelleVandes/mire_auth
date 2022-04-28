const mongoose = require("mongoose");
const isEmail = require("validator")
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  pseudo: { type: String, require: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
     //  validate: [ isEmail, 'invalid email' ]
  },
  password: { type: String, required: true },
  acceptTerm: { type: Boolean, require: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);