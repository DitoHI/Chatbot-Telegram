import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    index: true
  },
  name: {
    type: String,
    index: true
  },
  role: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^(hr|vendor)$/, "is invalid"]
  }
});

userSchema.plugin(mongooseUniqueValidator, { message: "is already taken" });

mongoose.model("User", userSchema);
