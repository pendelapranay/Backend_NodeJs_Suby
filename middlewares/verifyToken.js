import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json("Token is required!");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) return res.status(404).json({ error: "Vendor not found!" });
        req.vendorId = vendor._id
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Invalid Token" });
    }
}

export default verifyToken;