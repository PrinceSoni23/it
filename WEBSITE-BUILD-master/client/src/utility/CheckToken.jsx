import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {

    if (!token) return true;
  
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    //  console.log("Token expires at", decodedToken.exp, "Current time is", currentTime);
      return decodedToken.exp < currentTime; // Returns true if the token is expired
    } catch (error) {
     // console.error("Invalid token", error);
      return true; // Treat invalid token as expired
    }
  };
