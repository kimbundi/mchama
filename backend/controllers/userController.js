import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Function to create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login User
const loginUser = async (req, res) => {
    const { phonenumber, password } = req.body;
    try {
        const user = await userModel.findOne({ phonenumber });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, isAdmin: user.isAdmin }); // Send isAdmin to frontend

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error occurred during login" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, phonenumber, isAdmin } = req.body; // Accept isAdmin flag

    try {
        const exists = await userModel.findOne({ phonenumber });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isMobilePhone(phonenumber, "en-KE")) {
            return res.json({ success: false, message: "Please enter a valid Kenyan phone number" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            phonenumber,
            password: hashedPassword,
            isAdmin: isAdmin || false // Default to false unless explicitly set
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error occurred during registration" });
    }
};

export { loginUser, registerUser };
