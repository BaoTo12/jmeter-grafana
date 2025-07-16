import Product from '../models/product.model.js';

export const listProducts = async (req, res) => {
    const prods = await Product.find();
    res.json(prods);
};

export const getProduct = async (req, res) => {
    const p = await Product.findOne({
        _id: req.params.productId
    });
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
};

export const createProduct = async (req, res) => {
    const { productName, productPrice } = req.body
    const newProduct = await Product.create({
        name: productName,
        price: productPrice
    })
    return res.json(newProduct)
}