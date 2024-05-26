import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    name: {
        type: String,
        default: '',
        min: 2,
        max: 40,
    },
    birthday: {
        type: Date,
        default: Date.now,
    },
    cpf: {
        type: String,
        default: '',
    },
    balance: {
        type: Number,
        default: 0,
    },
    bonusBalance: {
        type: Number,
        default: 0,
    },
    affiliateBalance: {
        type: Number,
        default: 0,
    },
    bets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Bet',
        default: [],
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction',
        default: [],
    },
    affiliateOperations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'affiliateOperation',
        default: [],
    },
    referredUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    referrerUser: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: undefined,
    },
    isInfluencer: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;