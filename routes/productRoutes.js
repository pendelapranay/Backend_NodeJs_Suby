import express from 'express';
import productController from '../controllers/productController.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Route to get all products
router.post('/add-product/:firmId', productController.addproduct);
router.get('/:firmId/products', productController.getProductByFirm);
router.get('/uploads/:imageName',(req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/*');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName) );
})
router.delete('/:productId', productController.deleteProductById);

export default router;

