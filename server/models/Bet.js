import mongoose from "mongoose";

const BetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    result: {
        type: String,
        enum: ['win', 'loss'],
        required: true,
    },
    betAmount: { // Sum of real and bonus
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    realBetAmount: {
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    bonusBetAmount: {
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    returnedAmount: {
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    outcomeAmount: {
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
}, { timestamps: true });

const Bet = mongoose.model('Bet', BetSchema);
export default Bet;