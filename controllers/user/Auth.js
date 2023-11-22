import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../../models/User/User.js";

/* REGISTER USER */
/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { email, name, password, collegeId, referredBy } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      name,
      collegeId,
      referredBy,
      password: hashedPassword, // Set the hashed password directly
    });

    // Save the user to the database
    await newUser.save();

    // Send response with the success message and user details
    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* LOGGING IN */ export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the entered password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.password = undefined;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_USER, {
      expiresIn: "1h", // You can adjust the expiration time
    });

    res.status(200).json({ token, user }); // Combine token and user into a single object
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
