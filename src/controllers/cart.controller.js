import Cart from '../models/cart.model.js';

export const viewCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    res.json(cart ? cart.items : []);
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) cart = new Cart({ user: req.params.userId, items: [] });
    cart.items.push({ product: productId, quantity });
    await cart.save();
    res.status(201).json(cart.items);
};

export const updateItem = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    item.quantity = quantity;
    await cart.save();
    res.json(cart.items);
};

export const removeItem = async (req, res) => {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ user: userId });
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    res.json(cart.items);
};