import mongoose from 'mongoose';

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    collection: COLLECTION_NAME
});

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// userSchema.methods.comparePassword = function (candidate) {
//     return bcrypt.compare(candidate, this.password);
// };

export default mongoose.model(DOCUMENT_NAME, userSchema);