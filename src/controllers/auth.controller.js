import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password)))
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