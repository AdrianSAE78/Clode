import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "../styles/pages/garment-list.css";
import "../styles/main.css";
import { Box } from "@mui/material";
import CircleLabels from "../components/circleLabels";

const GarmentList = () => {
  const { user } = useAuth();
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories/");
      if (!response.ok) {
        throw new Error("Error al obtener las categorías");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchGarments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/garments');
        setGarments(response.data);
      } catch (error) {
        setError('Error cargando prendas', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGarments();
    getCategories();
  }, []);

  if (loading) return <div>Cargando prendas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="garment-list">
        <div>
          {/* Container con scroll hacia la izquierda */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              py: 1,
              overflow: "auto",
              width: "full",
              scrollSnapType: "x mandatory",
              "& > *": {
                scrollSnapAlign: "center",
                flexShrink: 0,
              },
              "::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((item) => (
              <CircleLabels
                key={item.categorie_name}
                label={item.categorie_name}
                imgSrc={item.categorie_picture}
              />
            ))}
          </Box>
        </div>
      <div className="garments-grid">
        {garments.map(garment => (
          garment.is_available && (
            <div key={garment.id} className="garment-card">
              <img 
                src={`http://localhost:3000/uploads/${garment.garment_image}`} 
                alt={garment.title}
              />
              <div className="garment-info">
                <h3>{garment.title}</h3>
                <p>Talla: {garment.size.toUpperCase()}</p>
                <p>Estado: {garment.condition}</p>
                <Link to={`/garment-details/${garment.id}`} className="view-detail">
                  Ver detalle
                </Link>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default GarmentList;