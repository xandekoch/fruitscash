import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    suitPayTransactionId: {
        type: String,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    cpf: {
        type: String,
        default: '',
    },
    operation: {
        type: String,
        enum: ['deposit', 'withdraw', 'affiliateWithdraw'],
        required: true,
    },
    operationAmount: {
        type: Number,
        required: true,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    status: {
        type: String,
        enum: ['pending', 'concluded', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;