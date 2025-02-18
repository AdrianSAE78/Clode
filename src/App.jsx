import { Routes, Route } from "react-router-dom";
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
import GarmentList from "./pages/GarmentList";
import ExchangeConfirmation from "./pages/ExchangeConfirmation";

function App() {
  return (
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
        <Route path="/garment-details/:id" element={<GarmentDetails />} />
        <Route path="/appoiment" element={<Appoiment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/public-profile" element={<PublicProfile />} />
        <Route path="/garments" element={<GarmentList />} />
        <Route path="/exchange-confirmation" element={<ExchangeConfirmation />} />
      </Route>
    </Routes>
  );
}

export default App;
