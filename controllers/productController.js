import Product from "../models/Product.js";
import multer from "multer";
import Firm from "../models/Firm.js";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

const addproduct = async (req, res) => {
    try {
        const { productName, price, description, category, bestSeller } = req.body;
        const image = req.file ? req.file.filename : undefined; // Assuming you are using multer for file upload

        const firmId = req.params.firmId; // Assuming firmId is passed in the request body
        const firm = await Firm.findById(firmId); // Check if the firm exists
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }

        const newProduct = new Product({
            productName,
            price,
            description,
            category,
            image,
            bestSeller,
            firm: firm._id, // Link the product to the firm
        });
        const savedProduct = await newProduct.save();
        firm.products.push(savedProduct); // Add the product to the firm's product array
        await firm.save(); // Save the updated firm
        res.status(200).json(savedProduct );
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
}
const getProductByFirm = async(req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({ firm: firmId });

        res.status(200).json({ restaurantName, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product", error });
    }
}   

const productController = {
    addproduct: [upload.single('image'), addproduct],
    getProductByFirm,
    deleteProductById
};

export default productController;