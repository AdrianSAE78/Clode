import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import NavbarDetails from "../components/Navbars/NavbarDetails";
import InterchangeNotice from "../components/InterchangeNotice";
import Details from "../components/Details";
import "../styles/pages/garment-details.css";
import "../styles/utils/reusable-functions.css";

const GarmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [available, setAvailable] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [seller, setSeller] = useState("");
  const [garment, setGarment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/garments/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        });
        console.log("Datos de la prenda:", response.data.garment);
        setAvailable(response.data.match_hours);
        console.log(available)
        setGarment(response.data.garment);
        setSeller(response.data.garment.user_garments?.username || "Vendedor desconocido");
        
      } catch (error) {
        console.error("Error cargando prenda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user?.token]);

  const handleToggleFavorite = async () => {
    try {
      await axios.post(`http://localhost:3000/api/favorites`, {
        userId: user.id,
        garmentId: id
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
    }
  };

  if (loading) return <div>Cargando detalles de la prenda...</div>;
  if (!garment) return <div>Prenda no encontrada</div>;

  return (
    <>
      <NavbarDetails />

      <Details
        image={`http://localhost:3000/uploads/${garment.garment_image}`}
        dateAvailable={new Date(garment.upload_date).toLocaleDateString()}
        name={garment.title}
        size={garment.size.toUpperCase()}
        condition={garment.condition}
      />

      <InterchangeNotice
        seller={seller}
        available={available}
        isFavorite={isFavorite}
        receivedGarmentId={garment.id}
        sellerId={garment.user_garments?.id}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
};

export default GarmentDetails;
