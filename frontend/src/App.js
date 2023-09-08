// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CustomerHome from "./pages/HomePage/CustomerHome";
import CustomerServiceHome from "./pages/HomePage/CustomerServiceHome";
import SalesHome from "./pages/HomePage/SalesHome";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/cs-home"
          element={
            <PrivateRoute>
              <CustomerServiceHome/>
            </PrivateRoute>
          }
        />

        <Route
          path="/sales-home"
          element={
            <PrivateRoute>
              <SalesHome />
            </PrivateRoute>
          }
        />

        <Route
          path="/customer-home"
          element={
            <PrivateRoute>
              <CustomerHome />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         {/* Use PrivateRoute as a wrapper for the protected routes */}
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <PrivateRoute path="/" element={<HomePage />} />
//         <PrivateRoute path="/cs-home" element={<CustomerServiceHome />} />
//         <PrivateRoute path="/sales-home" element={<SalesHome />} />
//         <PrivateRoute path="/customer-home" element={<CustomerHome />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }