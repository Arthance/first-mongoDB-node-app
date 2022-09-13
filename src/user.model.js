import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.SECRET_KEY
  );
  return token;
};

const User = mongoose.model("users", UserSchema);
export default User;
