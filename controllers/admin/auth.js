import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import Admin from "../../models/admin/Admin.js";
/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: passwordHash,
      department,
      role,
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { email, name, password } = req.body;
  
      // Check if the email or name exists in the database
      const admin = await Admin.findOne({ $or: [{ email }, { name }] });
  
      if (!admin) {
        return res.status(400).json({ message: "Invalid email, name, or password" });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, admin.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid email, name, or password" });
      }
      admin.password = undefined;
      
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, admin });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
export const deleteA = async (req, res) => {
  try {
    const { name, email } = req.body;

    const deletedAdmin = await Admin.findOneAndDelete({ name, email });

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully', deletedAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
