import mongoose from 'mongoose';

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const cartItem = new mongoose.Schema({
    product: { type: Number, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
    user: { type: Number, ref: 'User', unique: true },
    items: [cartItem]
}, {
    collection: COLLECTION_NAME
});

export default mongoose.model(DOCUMENT_NAME, cartSchema);
