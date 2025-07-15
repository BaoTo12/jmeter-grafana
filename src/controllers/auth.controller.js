import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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

        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};