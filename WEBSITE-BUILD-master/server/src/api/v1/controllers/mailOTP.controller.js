import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { User } from "../models/user.model.js";
import { Host } from "../models/host/host.model.js";
import { Agent } from "../models/agent.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { ApiResponse } from "../../../utils/ApiResponse.js";
import bcrypt from "bcrypt";    


const sendPasswordChangeMail = async (req, res) => {
    const { email, role } = req.body;
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
    console.log("email: ",email, "\nrole: ",role);
    if(!email || !role){
        throw new ApiError(401, "Email and role are required");
    }
    const model = await Model.findOne({email});
    if(!model){
        throw new ApiError(401, `${role} with the given email not found`);
    }
    console.log("model: ",model);
    const otpTokenVerification = jwt.sign(
        {
            email,
        },
        process.env.RESET_PASSWORD_TOKEN,
        {
            expiresIn: process.env.RESET_PASSWORD_EXPIRY,
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

        const modelMailContent = `<div style="font-family: Arial, sans-serif;">
                                                <h2>Change your password</h2>
                                                <p>Dear ${model.firstName} ${model.lastName},</p>
                                                <p>You can change your password by clicking the button below:</p>
                                                <a href="${process.env.FRONTEND_URL}/${model._id}/reset-password/${otpTokenVerification}?role=${role}" 
                                                    style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #2a9d8f; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                    Change Password
                                                </a>
                                            </div>`;

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            html: modelMailContent,
        });
        console.log("Email sent successfully",info);
        res.status(200).json( new ApiResponse(200, null, "Email sent successfully"));
    
    } catch (error) {
        throw new ApiError(400, error.message);
    }

}

const verifyOtpAndChangePassword = async (req, res) => {
    const { token } = req.params;
    const { role } = req.query;
    const { password } = req.body;
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
    console.log("token: ",token, "\nrole: ",role, "\nnewPassword: ",password);
    if(!token || !role || !password){
        throw new ApiError(401, "Token, role AND password are required");
    }
    try{
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
        if(!decoded){
            throw new ApiError(401, "Token invalid or expired");
        }
        console.log("decoded.email: ",decoded.email);
        const model = await Model.findOne({email: decoded.email});
        if(model.length==0){
            throw new ApiError(401, `${role} with the given email not found`);
        }
        console.log("model: ",model);
        model.password = password;
        const modelWithNewPassword = await model.save({validateBeforeSave: false});
        res.status(200).json( 
            new ApiResponse(200, modelWithNewPassword, "Token verified successfully")
        );
    }catch(error){
        throw new ApiError(401, error.message);
    }
}

export {
    sendPasswordChangeMail,
    verifyOtpAndChangePassword,
}