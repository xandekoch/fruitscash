import mongoose from "mongoose";


const AffiliateOperationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    referredUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    betId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet',
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    },
    operation: {
        type: String,
        enum: ['cpa', 'revShare'],
        required: true,
    },
    operationAmount: {
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
}, { timestamps: true });

const AffiliateOperation = mongoose.model('affiliateOperation', AffiliateOperationSchema);
export default AffiliateOperation;