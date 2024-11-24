import mongoose from "mongoose";
import { hashPassword } from "../lib/utils.js";

const { Schema } = mongoose;

const emailRegex = "";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username must be provided"],
    unique: [true, "username is already in use"],
    minLength: [4, "Username could not contain below 4 characters"],
    maxLength: [15, "Username cannot be more than 15 characters"],
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: [true, "The email you entered alredy has an account"],
    lowercase: true,
    // match: [emailRegex, "Enter a valid email address"],
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

UserSchema.pre("save", function () {
  const { hash, salt } = hashPassword(this.hash);
  this.hash = hash;
  this.salt = salt;
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
