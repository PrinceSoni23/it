import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import './api/v1/controllers/expireOffer.controller.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true
}))

// Parse the CORS_ORIGINS environment variable
// const allowedOrigins = process.env.CORS_ORIGINS.split(',');
// console.log("Allowed origins: ", allowedOrigins);
// app.use((req, res, next) => {
//     console.log("req.path: ", req.path);
//     if (req.path.startsWith('//temp')) {
//         // Allow all origins for static files
//         cors({
//             origin: '*', // Adjust to specific origins if needed
//             credentials: true
//         })(req, res, next);
//     } else {
//         // Apply the standard CORS policy
//         cors({
//             origin: function (origin, callback) {
//                 if (origin && allowedOrigins.includes(origin)) {
//                     callback(null, true);
//                 } else {
//                     console.log("Origin blocked:", origin);
//                     callback(new Error('Not allowed by CORS'));
//                 }
//             },
//             credentials: true
//         })(req, res, next);
//     }
// });



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import

import userRouter from './api/v1/routes/user.routes.js'
import otpRouter from './api/v1/routes/otp.routes.js'
import mailRouter from './api/v1/routes/mail.routes.js'
import hostRouter from './api/v1/routes/host/host.routes.js'
import agentRouter from '../src/api/v1/routes/agent.routes.js'
import offerRouter from '../src/api/v1/routes/offer/offer.routes.js'

// routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", otpRouter);
app.use("/api/v1/users", mailRouter);
app.use("/api/v1/hosts", hostRouter);
app.use("/api/v1/agents", agentRouter)
app.use("/api/v1/offers", offerRouter)

export { app }
