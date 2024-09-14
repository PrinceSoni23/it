import { Router } from "express";
import { sendOTP, verifyOTP } from "../controllers/otp.controller.js";
import { sendPasswordChangeMail, verifyOtpAndChangePassword } from "../controllers/mailOTP.controller.js";

const router = Router();

router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);
router.route("/send-password-change-mail").post(sendPasswordChangeMail);
router.route("/verify-otp-and-change-password/:token").patch(verifyOtpAndChangePassword);

export default router;