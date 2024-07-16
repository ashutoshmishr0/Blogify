const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
