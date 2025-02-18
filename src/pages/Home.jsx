import { Box } from "@mui/material";
import CircleLabels from "../components/circleLabels";
import Catalog from "../components/catalog";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import NextExchangeSection from "../components/NextExchange";

const Home = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const categories = CategoriesList();
  
  if (!Array.isArray(categories)) {
    return <div>Cargando categorías...</div>;
  }
  return (
    <>
      <div className="header">
        <h1 className="display-large">Clode </h1>
        <div className="icon-bag">
          <img src="/icons/bag.png" alt="Liked bag" />
        </div>  
        <div>
          <button className="admin-button" onClick={() => navigate("/admin")}><img
        src="/icons/admin-icon.png"
        alt="Admin Icono"/></button>
        </div>
      </div>

      {/* fist section */}
      <section className="water-save">
        <div className="headline-small">
          <p>Has ahorrado 54 litros.</p>
          <p>Increíble, sigue así</p>
        </div>
        <div>
          <div className="water-icon">
            <img src="/icons/water-recicle-icon.png" />
          </div>
        </div>
      </section>

      <NextExchangeSection />

      <section>
        {/* Categorie filter */}
        <div>
          <h2 className="body-medium title-categories">
            Buscar por categorías
          </h2>
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
        {/* Catálogo home */}
        <div className="catalog-home">
          <h2 className="body-medium title-categories">Recomendados para ti</h2>
          {/* Insertar catálogo sin preferencia alguna, solo los artículos más recientes. */}
          <Catalog /> {/* 🔹 Aquí se insertan las prendas obtenidas del backend */}
        </div>
      </section>
    </>
  );
};

export default Home;


const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null);

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
    getCategories();
  }, []);

  if (error) {
    console.log("Error: ", error);
    return [];
  }

  return (categories);
};