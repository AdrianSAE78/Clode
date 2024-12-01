import { Box } from "@mui/material";
import camisa from "../assets/products/camisa.jpg"    
import calzado from '../assets/products/calzado.jpg'
import ItemCatalog from "./itemCatalog";

const Catalog = () => {
  const matchCategoriesWithData = (data, categories) => {
    return data.map((product) => {
      const matchedCategory = categories.find(
        (category) => category.label === product.categorie.name
      );
  
      return {
        ...product,
        categorie: {
          ...product.categorie,
          icon: matchedCategory ? matchedCategory.image : null, // Asigna el icono si se encuentra, o null si no
        },
      };
    });
  };
  const updatedData = matchCategoriesWithData(data, categories);

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
      {updatedData.map((item) => {
        return (
          <ItemCatalog
            key={item.id}
            image={item.img}
            icon ={item.categorie.icon}
            categorieName={item.categorie.name}
            itemDescription={item.name}
          />
        );
      })}
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
    label: "Mujer",
    image: "/categories/women.jpg",
  },
  {
    label: "Hombre",
    image: "/categories/hombre.jpg",
  },
  {
    label: "Invierno",
    image: "/categories/invierno.jpg",
  },
  {
    label: "Verano",
    image: "/categories/verano.jpg",
  },
  {
    label: "Urbano",
    image: "/categories/urbano.jpg",
  },
  {
    label: "Rock",
    image: "/categories/rock.jpg",
  },
  {
    label: "Vintage",
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
