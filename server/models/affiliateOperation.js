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

const AffiliateOperation = mongoose.model('affiliateOperation', AffiliateOperationSchema);
export default AffiliateOperation;