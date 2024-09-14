
import mongoose from "mongoose";
import { Offer } from "../models/offer.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";
import { Host } from "../models/host/host.model.js";
import e from "express";


const createOffer = asyncHandler(async (req, res) => {
    const agentId = req.agent._id
    if (!agentId) {
        res.status(403).json({ message: "Unauthorized request to create offer" });
    }
    const { firstName, lastName, email, phoneNumber, password, hostStatus, propertyURL, statusReason, work, company, callBackTime, languages , offerStatus, quantity, planDetail, price, expiryDate, membershipPlan } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !hostStatus || !propertyURL || !offerStatus || !statusReason || !expiryDate || !callBackTime || !membershipPlan || !quantity || !planDetail || !price) {
        throw new ApiError(400, "All fields are required")
    }
    let hostId, host, alreadyHost;
    alreadyHost = await Host.findOne({email});
    if (alreadyHost) {
        hostId = alreadyHost._id;
    } else {
        host = await Host.create({
            agentId,
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            hostStatus,
            propertyURL,
            statusReason,
            work,
            company,
            callBackTime,
            languages
        })
        hostId = host._id;
    }
    // console.log("hostId",hostId);
    
    if (!hostId && expiryDate && callBackTime ) {
        throw new ApiError(400, "HostId, expiryDate and callBackTime are required")
        
    }

    if ([propertyURL, offerStatus, statusReason, membershipPlan, quantity, planDetail, price].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingproperty = await Offer.findOne({propertyURL})
    if (existingproperty) {
        throw new ApiError(409, "Offer to this property already exists")
    }

    const offer = await Offer.create({
        agentId,
        hostId,
        propertyURL,
        offerStatus,
        statusReason,
        expiryDate,
        callBackTime,
        membershipPlan,
        quantity,
        planDetail,
        price
    })

    if (!offer) {
        throw new ApiError(400, "Something went wrong couldn't create the offer")
    }


    return res.status(201).json(
        new ApiResponse(200, {offer, alreadyHost}, "Offer created successfully")
    )
})


const updateOffer = asyncHandler(async (req, res) => {
    const agentId = req.agent._id
    const offerId = req.params.id
    if (!offerId || !agentId) {
        throw new ApiError(400, "Unauthorized request")
    }
    // const existingOffer = await Offer.find({offerId, agentId})
    const existingOffer = await Offer.findOne({ _id: offerId, agentId: agentId });

    
    if (!existingOffer) {
        throw new ApiError(404, "Offer not found")
    }
    const { offerStatus, statusReason, expiryDate, callBackTime, membershipPlan, quantity, planDetail, price, isExpired } = req.body


    if ([ offerStatus, statusReason, membershipPlan, quantity, planDetail, price].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
  //  console.log("im here");
    
    // if (existingOffer.agentId.toString() !== agentId.toString()) {
    //     throw new ApiError(403, "You are not authorized to update this offer")
    // }
    if (existingOffer.agentId.toString() !== agentId.toString()) {
        throw new ApiError(403, "You are not authorized to update this offer")
    }

    existingOffer.offerStatus = offerStatus
    existingOffer.statusReason = statusReason
    existingOffer.expiryDate = expiryDate
    existingOffer.callBackTime = callBackTime
    existingOffer.membershipPlan = membershipPlan
    existingOffer.quantity = quantity
    existingOffer.planDetail = planDetail
    existingOffer.price = price
    existingOffer.isExpired = isExpired

    await existingOffer.save()

    return res.status(200).json(
        new ApiResponse(200, existingOffer, "Offer updated successfully")
    )
})

const getExpiredOffers = async (req, res) => {
    try {
        const expiredOffers = await Offer.find({ isExpired: true, offerStatus: "expired", agentId: req.agent._id });
    //    console.log('offers: ', expiredOffers);
        res.status(200).json({
            message: 'Expired offers retrieved successfully',
            expiredOffers
        });
    } catch (error) {
        console.error('Error retrieving expired offers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getPendingOffers = async (req, res) => {
    try {
        const pendingOffers = await Offer.find({ offerStatus: "pending", agentId: req.agent._id });
        res.status(200).json({
            message: 'Pending offers retrieved successfully',
            pendingOffers
        });
    } catch (error) {
        console.error('Error retrieving pending offers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getRejectedOffers = async (req, res) => {
    try {
        const rejectedOffers = await Offer.find({ offerStatus: "rejected", agentId: req.agent._id });
        res.status(200).json({
            message: 'Rejected offers retrieved successfully',
            rejectedOffers
        });
    } catch (error) {
        console.error('Error retrieving rejected offers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ agentId: req.agent._id });
        res.status(200).json({
            message: 'Offers retrieved successfully',
            offers
        });
    } catch (error) {
        console.error('Error retrieving offers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export { createOffer, updateOffer, getPendingOffers, getRejectedOffers, getExpiredOffers, getAllOffers }