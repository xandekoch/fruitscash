import mongoose from "mongoose";


const affiliateOperationSchema = new mongoose.Schema({
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
    operation: {
        type: String,
        enum: ['cpa', 'revShare'],
        required: true,
    },
    operationAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const affiliateOperation = mongoose.model('affiliateOperation', affiliateOperationSchema);
export default affiliateOperation;