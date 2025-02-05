import { Box } from "@mui/material";
import camisa from "../assets/products/camisa.jpg";
import calzado from "../assets/products/calzado.jpg";
import ItemCatalog from "./itemCatalog";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [data, setData] = useState([]);

  const getGarments = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/garments/"
      );
      const garments = await response.json();
      const updatedData = matchCategoriesWithData(garments, categories);
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching garments:", error);
    }
  };

  const matchCategoriesWithData = (data, categories) => {
    return data.map((product) => {
      const matchedCategory = categories.find(
        (category) => category.label === product.category
      );

      return {
        ...product,
        categorie: {
          name: product.category,
          icon: matchedCategory ? matchedCategory.image : null,
        },
        img: product.garment_image,
        name: product.title,
      };
    });
  };

  useEffect(() => {
    getGarments();
  }, []);

  // const updatedData = matchCategoriesWithData(data, categories);

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
      <div>Loading...</div> // Puedes agregar un spinner o mensaje aquí
    ) : (
      data.map((item) => (
        <ItemCatalog
          key={item.id}
          image={item.img}
          icon={item.categorie.icon}
          categorieName={item.categorie.name}
          itemDescription={item.description}
        />
      ))
    )}
    </Box>
  );
};

export default Catalog;

const data = [
    {
        id:1,
        img:camisa,
        categorie:{
            name:"Verano",
            icon:'/categories/verano.jpg'
        },
        name:"Camisa de varios colores"
    },
    {
        id:2,
        img:calzado,
        categorie:{
            name:"Urbano",
            icon:'/categories/verano.jpg'
        },
        name:"Zapatos de color verde"
    },
    {
      id:3,
      img:camisa,
      categorie:{
          name:"Rock",
          icon:'/categories/verano.jpg'
      },
      name:"Camisas hipster"
  }
]

const categories = [
  {
    label: "Camisas",
    image: "/categories/women.jpg",
  },
  {
    label: "Pantalones",
    image: "/categories/hombre.jpg",
  },
  {
    label: "Chaquetas",
    image: "/categories/invierno.jpg",
  },
  {
    label: "Calzado",
    image: "/categories/verano.jpg",
  },
  {
    label: "Blusas",
    image: "/categories/urbano.jpg",
  },
  {
    label: "Faldas",
    image: "/categories/rock.jpg",
  },
  {
    label: "Accesorios",
    image: "/categories/vintage.jpg",
  },
  {
    label: "Étnico",
    image: "/categories/etnico.jpg",
  },
  {
    label: "Bussines",
    image: "/categories/bussines.jpg",
  },
  {
    label: "Casual",
    image: "/categories/casual.jpg",
  },
  {
    label: "Deportivo",
    image: "/categories/sport.jpg",
  },
];
