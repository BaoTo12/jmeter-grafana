import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';

export const checkout = async (req, res) => {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0)
        return res.status(400).json({ error: 'Cart empty' });

    const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const order = new Order({ user: userId, items: cart.items, total });
    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
};

