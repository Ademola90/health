// Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((action) => {
      if (!action.error) {
        toast.success("Login successful! Redirecting to homepage.");
        navigate("/home");
      } else {
        toast.error(action.payload);
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
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
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       return toast.error("Email and Password are required.");
//     }

//     try {
//       const response = await axios.post("/api/auth/login", formData);
//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         toast.success("Login successful! Redirecting...");
//         navigate("/home");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed.");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleLogin}>
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
//         <button type="submit">Login</button>
//       </form>
//       <ToastContainer />
//     </>
//   );
// }

// export default Login;
