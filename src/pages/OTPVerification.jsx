import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../redux/authSlice";
import { toast } from "react-toastify";

function OTPVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, error } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!state?.email) {
      toast.error("Email is missing. Please restart the signup process.");
      return;
    }

    dispatch(verifyOtp({ email: state.email, otp })).then((action) => {
      if (!action.error) {
        toast.success("OTP verified! You can now log in.");
        navigate("/login");
      } else {
        toast.error(action.payload);
      }
    });
  };

  return (
    <form onSubmit={handleOtpVerification}>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Verify OTP
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default OTPVerification;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function OTPVerification() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email } = location.state || {};
//   const [otp, setOtp] = useState("");

//   const handleOTPVerify = async (e) => {
//     e.preventDefault();

//     if (!otp) {
//       return toast.error("OTP is required.");
//     }

//     try {
//       const response = await axios.post("/api/auth/verify-otp", { email, otp });
//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         toast.success("OTP verified! Redirecting...");
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "OTP verification failed.");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleOTPVerify}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <button type="submit">Confirm</button>
//       </form>
//       <ToastContainer />
//     </>
//   );
// }

// export default OTPVerification;
