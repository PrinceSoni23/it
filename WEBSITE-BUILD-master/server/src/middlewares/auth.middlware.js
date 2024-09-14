import { User } from "../api/v1/models/user.model.js";
import { Host } from "../api/v1/models/host/host.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Agent } from "../api/v1/models/agent.model.js";


export const verifyJWT = (Model) => asyncHandler(async (req, res, next) => {
//   console.log("jwt model: ", Model);
//   console.log("req.body: ", req.body, "\nreq.header: ", req.header("Authorization"));
  
  try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");  
    //   console.log("jwt token: ", token);
      if (!token) {    
          throw new ApiError(401, "Unauthorized request");
      }
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const model = await Model.findById(decodedToken?._id).select("-password -refreshToken");

      if (!model) {
          throw new ApiError(401, "Invalid Access Token");
      }
      console.log("route: ",req.path);
      // Skip lastLogoutTime check if the request is a logout
    //   if (req.path !== '/logout') { // Adjust this path if your logout route is different
    //       console.log("lastLogoutTime: ", model.lastLogoutTime?.getTime() / 1000, "decodedToken.iat: ", decodedToken.iat);
    //       if (model.lastLogoutTime?.getTime() / 1000 > decodedToken.iat) {
    //           throw new ApiError(401, "Invalid Access Token(Token is blacklisted)");
    //       }
    //   }

      // Set the appropriate request object based on the model type
      if (Model == User) {
          req.user = model;
          console.log("req.user: ", req.user);
      } else if (Model == Host) {
          req.hostData = model;
          console.log("req.hostData: ", req.hostData);
      } else if (Model == Agent) {
          req.agent = model;
          console.log("req.agent: ", req.agent);
      }

      next();
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
  }
});
