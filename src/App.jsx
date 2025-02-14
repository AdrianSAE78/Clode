import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appoiment from "./pages/Appoiment";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import GarmentDetails from "./pages/GarmentDetails";
import CreateGarment from "./pages/CreateGarment";
import AdminDashboard from "./pages/Admin";
import Login from "./pages/Login";
import Layout from "./pages/PrivateLayout";
import UserPreferences from "./pages/UserPreferences";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta publica */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Rutas privadas */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/complete-profile" element={<UserPreferences />} />
          <Route path="/create-garment" element={<CreateGarment />} />
          <Route path="/garment-details" element={<GarmentDetails />} />
          <Route path="/appoiment" element={<Appoiment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/public-profile" element={<PublicProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
