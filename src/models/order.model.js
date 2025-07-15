import mongoose from 'mongoose';

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

const orderItem = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [orderItem],
    total: { type: Number },
    date: { type: Date, default: Date.now }
}, {
    collection: COLLECTION_NAME
});

export default mongoose.model(DOCUMENT_NAME, orderSchema);