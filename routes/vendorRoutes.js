import vendorController from '../controllers/vendorController.js';
import express from 'express';
const router = express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);
router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:vendorId', vendorController.getVendorById);

export default router;