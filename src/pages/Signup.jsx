import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../redux/authSlice"; // updated import
import { toast } from "react-toastify";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const { firstName, lastName, email, password } = formData;

      if (!firstName || !lastName || !email || !password) {
        return toast.error("All fields are required.");
      }

      const response = await dispatch(signupUser(formData)).unwrap();
      console.log({ response });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
    </form>
  );
}

export default Signup;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Input validation
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.password
//     ) {
//       return toast.error("All fields are required.");
//     }

//     try {
//       const response = await axios.post("/api/auth/signup", formData);
//       toast.success("OTP sent! Please check your email.");
//       navigate("/verify-otp", { state: { email: formData.email } });
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error || "Something went wrong.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={(e) =>
//             setFormData({ ...formData, firstName: e.target.value })
//           }
//         />
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={(e) =>
//             setFormData({ ...formData, lastName: e.target.value })
//           }
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <ToastContainer />
//     </>
//   );
// }

// export default Signup;
