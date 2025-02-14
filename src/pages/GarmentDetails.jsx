import { useState, useEffect } from "react";
import Layout from "./layout";
import NavbarDetails from "../components/Navbars/NavbarDetails";
import InterchangeNotice from "../components/InterchangeNotice";
import Image from "../assets/products/more-details.png";
import "../styles/pages/garment-details.css";
import "../styles/utils/reusable-functions.css";
import Details from "../components/Details";

const date = new Date();

const garmentStatic={
  garment_image:Image,
  upload_date:date,
  title:"Blusa con tejidos",
  size:"xl",
  condition:"Un solo uso"
}

const GarmentDetails = () => {
  const [available, setAvailable] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [seller, setSeller] = useState("Adrian B.");
  const [garment, setGarment] = useState(garmentStatic)

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await fetch("https://api.example.com/data/{id}"); // URL de la API
//             const result = await response.json();
//             setGarment(result); 
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     fetchData();
// }, []); 

  return (
    <Layout>
      <NavbarDetails />

      <Details
        image={garment.garment_image}
        dateAvailable={garment.upload_date}
        name={garment.title}
        size={garment.size}
        condition={garment.condition}
      />

      {/* Section for notice */}
      {/* A este componente se le pasa el estado de favorito   */}
      {/* También setea un artículo como favorito. Esto implica que de ser el caso, toma el id del producto y lo mande como fetch al back para guardarlo en la lista  */}

      <InterchangeNotice
        seller={seller}
        available={available}
        isFavorite={isFavorite}
      />
    </Layout>
  );
};

export default GarmentDetails;
