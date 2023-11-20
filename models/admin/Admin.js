import mongoose from "mongoose";

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
