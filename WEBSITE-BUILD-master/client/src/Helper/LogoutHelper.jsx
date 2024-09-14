import { useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async (modelType, token) => {
    try {
      console.log("modelType", modelType, "token", token);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/${modelType}s/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // After successful API call, dispatch the setLogout action to clear the Redux state
      dispatch(setLogout());
      if(modelType==="agent")  { navigate("/CRM/login") ; return logout;}
      modelType==="host" ? navigate("/host_login"): navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout. " , error);
      // Optionally, handle the error by showing a notification to the user
    }
  };

  return logout;
};

