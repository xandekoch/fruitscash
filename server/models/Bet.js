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
    betAmount: {
        type: Number,
        required: true,
    },
    returnedAmount: {
        type: Number,
        required: true,
    },
    outcomeAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Bet = mongoose.model('Bet', BetSchema);
export default Bet;