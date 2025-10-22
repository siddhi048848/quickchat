import jwt from "jsonwebtoken";

// Utility function to generate a JWT token
export function generateToken(userId) {
    const token = jwt.sign({userId }, process.env.JWT_SECRET);
    return token;
}