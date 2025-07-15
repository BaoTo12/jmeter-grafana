import mongoose from 'mongoose';

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    collection: COLLECTION_NAME
});

export default mongoose.model(DOCUMENT_NAME, productSchema);