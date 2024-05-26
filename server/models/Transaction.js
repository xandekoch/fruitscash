import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    operation: {
        type: String,
        enum: ['deposit', 'withdraw', 'affiliateWithdraw'],
        required: true,
    },
    operationAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'concluded', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;