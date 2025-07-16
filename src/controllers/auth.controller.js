import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import productModel from '../models/product.model.js';

const JWT_KEY = "17dc48baee7cc12688c1f4598f9ad95038e85498"

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (await User.findOne({ username }))
            return res.status(400).json({ error: 'Username exists' });

        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ id: user._id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log({ username, password });

        const user = await User.findOne({ username }).lean();
        console.log({ user });

        if (!user || !(user.password === password))
            return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || JWT_KEY, { expiresIn: '10h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.headers["authorization"]
        const decodeUser = jwt.verify(accessToken, JWT_KEY)
        req.userId = decodeUser.sub
        next()
    } catch (error) {
        throw error
    }
}

export const initializeUsers = async (count) => {
    for (let i = 1; i <= count; i++) {
        const _id = i;
        const username = `user${String(i).padStart(3, '0')}`; // e.g. user001, user002, …
        let password;               // default password
        if (i < 10 && i > 0) {
            password = `pass00${i}`
        } else if (i >= 10 && i < 100) {
            password = `pass0${i}`
        } else if (i >= 100) {
            password = `pass${i}`
        }
        console.log({ password, username });

        await User.create({
            _id,
            username,
            password: password
        })
    }
}

export const initProducts = async (count) => {
    for (let i = 1; i <= count; i++) {
        const productId = i;
        const productName = `Sneaker ${i}`
        const productPrice = Math.floor(Math.random() * 100);

        await productModel.create({
            _id: productId,
            name: productName,
            price: productPrice
        })
    }
}