import { ApiError } from "../utils/ApiError.js";
const allowedIPs = [
    '192.168.2.147',
    '192.168.2.27',
    '::1'
];

export const IPVerification = (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log("IP Address: ", clientIp);

    if (allowedIPs.includes(clientIp)) {
        next(); // Allow access
    } else {
        throw new ApiError(401, "Invalid IP Address");
    }
};