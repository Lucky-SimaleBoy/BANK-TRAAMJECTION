
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please provide an email'],
        lowercase: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'please provide a valid email'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'please provide a name'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        trim: true,
        minlength: [6, 'password must be at least 6 characters long'],
        select: false
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) 
        return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
