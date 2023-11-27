import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../../models/User/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { email, name, password, collegeId, referredBy, onBoarded } =
      req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ errMessage: "Password is required" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json({ errMessage: "User Already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = await User.create({
      email,
      name,
      collegeId,
      referredBy,
      password: hashedPassword,
      onBoarded,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_USER,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    res.status(500).json({ errMessage: "Internal Server Error" });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email }).populate(
      "RegisteredEvents"
    );

    if (!user) {
      return res.status(200).json({ errMessage: "Invalid Email / Password" });
    }

    // Check if the entered password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(200).json({ errMessage: "Invalid Email / Password" });
    }

    user.password = undefined;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_USER, {
      expiresIn: "1h", // You can adjust the expiration time
    });

    res.status(200).json({ token, user }); // Combine token and user into a single object
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Internal Error" });
  }
};
