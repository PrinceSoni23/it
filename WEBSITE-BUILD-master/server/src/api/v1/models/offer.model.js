import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema({
    agentId: {
        type: Schema.Types.ObjectId, // one who gives offer
        ref: "Agent",
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId, // one who recieves offer
        ref: "Host",
        required: true
    },
    propertyURL: {
        type: String,
        unique: true,
        required: true
    },
    offerStatus: {
        type: String,
        Enum: ["paid", "rejected", "expired", "pending"],
        default: "pending",
        // required: true
    },
    callBackTime: {
        type: Date,
    },
    membershipPlan: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    planDetail: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    isExpired: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const Offer = mongoose.model("Offer", offerSchema)