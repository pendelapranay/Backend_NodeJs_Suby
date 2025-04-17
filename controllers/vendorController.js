import Vendor from '../models/Vendor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
dotEnv.config();


const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if(vendorEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword,
        });
        await newVendor.save();
        res.status(201).json({ message: 'Vendor registered successfully' });
        console.log("registered")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const vendor = await Vendor.findOne({ email });
        if(!vendor|| !(await bcrypt.compare(password, vendor.password))) {
            return res.status(400).json({ message: 'Invalid username and password' });
        }
        const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ sucess: 'Login successful',token });
        console.log(email,"this is token",token)

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllVendors = async (req, res)=>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.status(200).json({ vendors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getVendorById = async (req, res) => {
    const vendorId = req.params.vendorId;
    try {
        if (!mongoose.Types.ObjectId.isValid(vendorId)) {
            return res.status(400).json({ error: "Invalid vendor ID" });
        }
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export default { vendorRegister, vendorLogin, getAllVendors, getVendorById };