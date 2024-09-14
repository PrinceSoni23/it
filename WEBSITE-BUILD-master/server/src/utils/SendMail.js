import { ApiError } from "./ApiError.js";
import { User } from "../api/v1/models/user.model.js"
import { Host } from "../api/v1/models/host/host.model.js"
import { Agent } from "../api/v1/models/agent.model.js"
import jwt from 'jsonwebtoken';
import nodeMailer from "nodemailer"

const sendingMail = async(email, htmlContent, role, subject) => {
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
    console.log("email: ",email, "\nhtmlContent: ",htmlContent, "\nrole: ",role, "\nsubject: ",subject);
    if(!email || !htmlContent || !subject){
        throw new ApiError(401, "Email, Subject and htmlContent is required");
    }

    const user = await Model.findOne({email});
    if(!user){
        throw new ApiError(401, "User with the given email not found");
    }

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

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: htmlContent,
        });
        console.log("Email sent successfully",info);
        return true;
    
    } catch (error) {
        console.error("Error in sending email:", error.message);
        return false;
    }
}

export { sendingMail }