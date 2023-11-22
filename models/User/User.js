import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  collegeId: {
    type: String,
  },
  referredBy: {
    type: String,
  },
  onBoarded: {
    type: Boolean,
    default: false,
  },
  referrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  RegisteredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
