import express from 'express';
import firmController from '../controllers/firmController.js';
import verifyToken from '../middlewares/verifyToken.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Route to get all firms
router.post('/add-firm', verifyToken, firmController.addFrim);

router.get('/uploads/:imageName',(req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/png');
    //const __dirname = path.dirname(new URL(import.meta.url).pathname);
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
})
router.delete('/:firmId', firmController.deleteFirmById);

export default router;