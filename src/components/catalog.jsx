import { Box } from "@mui/material";
import ItemCatalog from "./itemCatalog";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState({}); // Guardaremos las categorías con sus IDs

  // 🔹 Obtener categorías desde la API y guardarlas en un objeto {id: nombre}
  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories/");
      if (!response.ok) throw new Error("Error al obtener las categorías");

      const categoryData = await response.json();
      const categoryMap = categoryData.reduce((acc, category) => {
        acc[category.id] = {
          name: category.categorie_name,
          icon: `http://localhost:3000/uploads/${category.categorie_picture}`
        };
        return acc;
      }, {});

      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // 🔹 Obtener las prendas desde la API
  const getGarments = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/garments/");
      if (!response.ok) throw new Error("Error al obtener las prendas");

      const garments = await response.json();
      setData(garments); 
    } catch (error) {
      console.error("Error fetching garments:", error);
    }
  };

  useEffect(() => {
    getCategories(); // Obtener categorías al cargar el componente
    getGarments(); // Obtener prendas
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
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
      {data.length === 0 ? (
        <div>Cargando prendas...</div> 
      ) : (
        data.map((item) => {
          const categoryInfo = categories[item.categoryId] || { name: "Sin categoría", icon: "/icons/default-icon.png" };

          return (
            <ItemCatalog
              key={item.id}
              image={`http://localhost:3000/uploads/${item.garment_image}`}
              icon={categoryInfo.icon} 
              categorieName={categoryInfo.name} 
              itemDescription={item.description}
            />
          );
        })
      )}
    </Box>
  );
};

export default Catalog;
