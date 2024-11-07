
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTPVerification';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;




// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup';
// import OTPVerification from './pages/OTPVerification';
// import Login from './pages/Login';
// import Home from './pages/Home';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/verify-otp" element={<OTPVerification />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/Home" element={<Home />} /> {/* Replace with your Home component */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
