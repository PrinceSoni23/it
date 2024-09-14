import { ApiError } from '../../../utils/ApiError.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { Host } from "../models/host/host.model.js"
import { Agent } from "../models/agent.model.js"
import jwt from 'jsonwebtoken';
import nodeMailer from "nodemailer";


const sendMail = asyncHandler( async(req, res) => {
    const { email, htmlContent, role } = req.body;
    let Model;
    if(role=="user"){
        Model = User;
    }else if(role=="host"){
        Model = Host;
    }else if(role=="agent"){
        Model = Agent;
    }else{
        throw new ApiError(401, "Role(ModelType) is required");
    }
    // console.log("email: ",email, "\nhtmlContent: ",htmlContent);
    console.log("Sending email to : ",email);
    if(!email || !htmlContent){
        throw new ApiError(401, "Email and htmlContent is required")
    }

    const user = await Model.findOne({email});
    if(!user){
        throw new ApiError(401, "User with the given email not found");
    }

    const mailTokenVerification = jwt.sign(
        {
            email,
        },
        process.env.EMAIL_TOKEN_SECRET,
        {
            expiresIn: process.env.EMAIL_TOKEN_EXPIRY
        }
    );

    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    
        const url = `${process.env.FRONTEND_URL}/verify-email/${mailTokenVerification}?role=${role}`;
        // Replace placeholders in the HTML content
        const processedHtmlContent = htmlContent.replace("{{verificationUrl}}", url);
        console.log("processedHTMLContent: ",processedHtmlContent);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            html: processedHtmlContent,
        });
        console.log("Email sent successfully",info);
        res.status(200).json( new ApiResponse(200, null, "Email sent successfully"));
    
    } catch (error) {
        console.error("Error in sending email:", error.message);
        throw new ApiError(400, error.message);
    }
})

const verifyMail = asyncHandler( async(req, res) => {
    const { token } = req.params;
    const { role } = req.query;
    let Model;
    if(role=="user"){
        Model = User;
    }else if(role=="host"){
        Model = Host;
    }else if(role=="agent"){
        Model = Agent;
    }else{
        throw new ApiError(401, "Role(ModelType) is required");
    }
    console.log("verify karne aaye",token);
    if(!token){
        throw new ApiError(401, "Token invalid or not found");
    }
    try{
        const decodedToken = jwt.verify( token, process.env.EMAIL_TOKEN_SECRET);
        console.log("try block: ",decodedToken);
        if(!decodedToken){
            throw new ApiError(401, "Token invalid or expired");
        }
        const email = decodedToken.email;
        const user = await Model.findOneAndUpdate(
            { email },
            { emailVerified: true },
            { new: true }
        ).select('-password -refreshToken');
        
        if(!user){
            throw new ApiError(401, "User with the given email not found.")
        }
        res.status(200).json(
            new ApiResponse(200, user,"Email verified successfully")
        );
    }catch(error){
        throw new ApiError(401, error.message);
    }
})

export {
    sendMail,
    verifyMail
}