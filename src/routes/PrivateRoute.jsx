import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import CustomModal from "../components/CustomModal";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(loading);
  }, [loading]);

  if (loading) {
    return (
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Verificando tu sesión"
        message="Estamos verificando tu sesión. Por favor, espera."
      />
    );
  }

  return user ? (children ? children : <Outlet />) : <Navigate to="/login" />;
};

export default PrivateRoute;