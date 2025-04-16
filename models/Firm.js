import mongoose from 'mongoose';

const FirmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg'],
        }],
        required: true,
    },
    region: {
        type: [{
            type: String,
            enum: ['north-indian', 'south-indian', 'chinese', 'bakery'],
        }],
    },
    offer: {
        type: String,
    },
    image: {
        type: String,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
});

export default mongoose.model('Firm', FirmSchema);