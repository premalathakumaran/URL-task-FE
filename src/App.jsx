import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/User/Login";
import ForgotPassword from "./Components/User/ForgotPassword";
import Register from "./Components/User/Register";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboards";
import { PrivateRoute } from "./Components/User/Auth/ProtectedRoute";
import ResetPassword from "./Components/User/ResetPassword";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        <Route path="*" element={<PageNotFound />}/>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;