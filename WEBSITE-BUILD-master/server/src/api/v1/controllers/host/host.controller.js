import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Host } from "../../models/host/host.model.js";
import { Message } from "../../models/host/message.model.js";
import validator from "validator";
import bcrypt from "bcrypt"

//------GET HOST BY ID--------- GTM
const getHostbyId = asyncHandler( async(req, res) => {
    const {hostId} = req.params
    console.log("hostId",hostId);
    try{
        const host = await Host.findById(hostId)
        // console.log("===host - ",host);
        return res.status(200).json(
            new ApiResponse(200, host, "Host fetched successfully")
        )
    }catch(error){
        throw new ApiError(400, error.message || "Something went wrong while fetching the host")
    }
});

const generateAccessAndRefreshTokens = async(host) => {
    try{
        // const host = await Host.findById(hostId)
        const accessToken = host.generateAccessToken()
        const refreshToken = host.generateRefreshToken()
        console.log("accesstoken", accessToken, "\n refreshToken",refreshToken);
        return {accessToken, refreshToken}

    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while generating the tokens")
    }
    
}

const getRegisterHost = asyncHandler( async(req, res) => {
    res.status(200).json({
        message: "Write your host registration form here."
    })
})

const registerHost = asyncHandler( async(req, res) => {
    const{ email, phoneNumber, firstName, lastName, password } = req.body
    // console.log("idhar aa rhaa", req.body);

    if([email, phoneNumber, firstName, lastName, password].some((field)=> field?.trim==="")){
        throw new ApiError(400, "All fields are required.")
    }

    const existedHost = await Host.findOne({email})

    if(existedHost){
        throw new ApiError(409, "Host already exists")
    }
    if(!validator.isEmail(email)){
        throw new ApiError(400, "Invalid email")
    }
    console.log("file: ",req.file, req.file?.path);
    const avatarLocalPath = req.file?.path;
    
    try{    
        const host = await Host.create({
            email,
            phoneNumber,
            firstName,
            lastName,
            password,
            avatar: avatarLocalPath || "",
        })

        const createdHost = await Host.findById(host._id).select("-password -refreshToken")

        if(!createdHost){
            throw new ApiError(400, "Something went wrong couldn't register the host")
        }

        return res.status(200).json(
            new ApiResponse(200, createdHost, "Host registered sucessfully")
        )
    }catch(error){
        console.log("error message: ",error.message);
        throw new ApiError(400, "Something went wrong")
    }
})

const loginHost = asyncHandler( async(req, res) => {     

    const alreadyLoggedIn = req.cookies?.role || req.header("role");
    
    if(alreadyLoggedIn){
      throw new ApiError(401, `Already logged in as ${alreadyLoggedIn}`);
    }

    const{email, password} = req.body
    if(!email || !password){
        throw new ApiError(401, "All the fields are required")
    }
    console.log("email: ",email, "password: ",password)
    const host = await Host.findOne({email})

    if(!host){
        throw new ApiError(404, "host doesn't exist.")
    }
    console.log("host: ", host.email, host.firstName,"password", password);
    const isPasswordValid = await host.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Password incorrect")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(host);

    const role = "Host"

    const hostData = await Host.findById(host._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }
    res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .cookie("role", role, options)
    .json(
        new ApiResponse(200, {hostData , refreshToken, accessToken}, "host logged in successfully")
    )
})

const logoutHost = asyncHandler( async(req, res) => {
   // console.log("hostData",req.hostData);
    const host = req.hostData
   // console.log("host",host);
    try{
        await Host.findByIdAndUpdate(req.hostData._id,
            {
                $set: {
                    lastLogoutTime: new Date(),
                    refreshToken: undefined
                },
            },
            {
                new: true,  
            }
        )
        const options = {
            httpOnly: true,
            secure: true
        }
        console.log("host logged out successfully");
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .clearCookie("role", options)
        .json(
            new ApiResponse(200, null, "Host logged out successfully")
        )

    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't logout the host")
    }
})

const getCurrentHost = asyncHandler( async(req, res) => {
    const host = req.hostData
    return res.status(200).json(
        new ApiResponse(200, host, "Host fetched successfully")
    )
})

const refreshAccessToken = asyncHandler( async(req, res) => {
    const host = req.hostData
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(host)
    const options = {
        httpOnly: true,
        secure: true
    }
    return res  
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {accessToken, refreshToken}, "Access token refreshed successfully")
    )
})

const updateAccountDetails = asyncHandler( async(req, res) => {
    const {email, phoneNumber, firstName, lastName, work, timeZone, languages, about} = req.body
    const host = req.hostData
    if(!host){
        throw new ApiError(404, "Host not found")
    }
    if([email, phoneNumber, firstName, lastName, work, timeZone, languages, about].some((field)=> field?.trim==="")){
        throw new ApiError(400, "All fields are required.")
    }
    if(!validator.isEmail(email)){
        throw new ApiError(400, "Invalid email")
    }
    try{
        const updatedHost = await Host.findByIdAndUpdate(host._id,
            {
                $set: {
                    email,
                    phoneNumber,
                    firstName,
                    lastName,
                    work,
                    timeZone,
                    languages,
                    about
                }
            },
            {
                new: true,  select: "-password -refreshToken"
            }
        )
        if(!updatedHost){
            throw new ApiError(400, "Couldn't update the host")
        }
        return res.status(200).json(
            new ApiResponse(200, updatedHost, "Host updated successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't update the host")
    }
})

const updateAvatar = asyncHandler( async(req, res) => {
    const host = req.hostData
    if(!host){
        throw new ApiError(404, "Host not found")
    }
    try{
        const updatedHost = await Host.findByIdAndUpdate(host._id,
            {
                $set: {
                    avatar: req.file.path
                }
            },
            {
                new: true,  select: "-password -refreshToken"
            }
        )
        if(!updatedHost){
            throw new ApiError(400, "Couldn't update the host")
        }
        return res.status(200).json(
            new ApiResponse(200, updatedHost, "Host updated successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't update the host")
    }
})

const changePassword = asyncHandler( async(req, res) => {
 //   console.log("password badalne aaye hain host ka")
    const{currentPassword, newPassword} = req.body
    if(!(currentPassword || newPassword)){
        throw new ApiError(401, "Please provide both old and new password")
    }
    const host = await Host.findById(req.hostData._id)
    if(!host){
        throw new ApiError(404, "Host not found")
    }
    try{
        // console.log("host",host.firstName, host.password); 
        const isPasswordValid = await host.isPasswordCorrect(currentPassword)
        if(!isPasswordValid){
            throw new ApiError(401, "Password incorrect")
        }
        host.password = newPassword
        await host.save({validateBeforeSave: false})
        return res.status(200).json(
            new ApiResponse(200, {} , "Password updated successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't update the password")
    }
})

const deleteAccount = asyncHandler( async(req, res) => {
    const host = req.hostData
    if(!host){
        throw new ApiError(404, "Host not found")
    }
    try{
        await Host.findByIdAndDelete(host._id)
        return res.status(200).json(
            new ApiResponse(200, null, "Host deleted successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't delete the host")
    }
})

const messages = asyncHandler( async(req, res) => {
    const {hostId} = req.params;
    // console.log("hostId",hostId);
    try{
        const msg = await Message.find({hostId})
        console.log();
        return res.status(200).json(
            new ApiResponse(200, msg ,"messages fetched successfully")
        )

    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't get messages");
    }
})

const createHostWithoutOffer = asyncHandler( async(req, res) => {
    const agentId = req.agent._id
    if(!agentId){
        throw new ApiError(401, "Unauthorized request")
    }


    const {firstName, lastName, email, phoneNumber, password, hostStatus, statusReason, propertyURL, callBackTime, languages, work, company, isHost} = req.body
    if([firstName, lastName, email, phoneNumber, password, hostStatus, statusReason, propertyURL, languages, work, company].some((field)=> field?.trim==="")){
        throw new ApiError(400, "All fields are required.")
    }
    if(!validator.isEmail(email)){
        throw new ApiError(400, "Invalid email")
    }


    try{
        const host = await Host.create({
            agentId,
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            hostStatus,
            statusReason,
            propertyURL,
            callBackTime,
            languages,
            work,    //gtm
            company //gtm
        })
        return res.status(200).json(
            new ApiResponse(200, host, "Host created successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Couldn't create the host")
    }
})



export {
    getHostbyId,   //GTM
    registerHost,
    getRegisterHost,
    loginHost,
    logoutHost,
    getCurrentHost,
    refreshAccessToken,
    updateAccountDetails,
    updateAvatar,
    changePassword,
    deleteAccount,
    messages,
    createHostWithoutOffer,
}