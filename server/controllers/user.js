import { User } from "../models/user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        //finding user is already register with the email id
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exits."
            })
        }
        //hashing our password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exits."
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            });
        }
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 }).json({
            success: true,
            message: `Welcome back ${user.fullname}`
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (_, res) => {

    try {
        return res.status(200).cookie("token", "", { 
            maxAge: 0,
            httpOnly: true, // Ensure this matches the original settings
            path: '/'       // Ensure this matches the original settings
        }).json({
            success: true,
            message: "User logged out successfully."
        });
    } catch (error) {
        console.log(error);
    }
};
