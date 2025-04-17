import Firm from "../models/Firm.js";
import Vendor from "../models/Vendor.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});
const upload = multer({ storage: storage });

const addFrim = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) return res.status(404).json({ error: "Vendor not found!" });

        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "vendor can have only one firm" });
        }
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });
        const savedFirm =  await firm.save();
        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName
        vendor.firm.push(savedFirm._id);
        await vendor.save();
        return res.status(200).json({ message: "Firm added successfully", firm, firmId, vendorFirmName });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ message: "Firm not found" });
        }

        res.status(200).json({ message: "Firm deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting firm", error });
    }
} 

const firmController = {
    addFrim: [upload.single('image'), addFrim],
    deleteFirmById
};

export default firmController;