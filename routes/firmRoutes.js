import express from 'express';
import firmController from '../controllers/firmController.js';
import verifyToken from '../middlewares/verifyToken.js';
import path from 'path';

const router = express.Router();

// Route to get all firms
router.post('/add-firm', verifyToken, firmController.addFrim);

router.get('/uploads/:imageName',(req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName) );
})
router.delete('/:firmId', firmController.deleteFirmById);

export default router;