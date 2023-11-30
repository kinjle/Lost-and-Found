const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemStatus: { type: String, default: "found" },
    securityQues: { type: String, required: true },
    correspondingAnswer: { type: String, required: true },
    itemImage: String,
    answer: { type: String },
    isClaimed: Boolean,
    isVerified: Boolean,
    isRejected: Boolean,
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//------------------------static signup method-------------------------------------
userSchema.statics.signup = async function (
  fullname,
  username,
  email,
  password,
  phoneNumber
) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //storing in db as the hased password and returning because we will call this signup func somewhere else
  const user = await this.create({
    fullname,
    username,
    email,
    password: hash,
    phoneNumber,
  });
  return user;
};

//------------------------static login method-------------------------------------
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

//-----------------------------------------------------------------------------------------------------------

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);

module.exports = { User, Item };
