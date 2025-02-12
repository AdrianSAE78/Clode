import { useState, useEffect } from "react";
import { formatDate } from "../components/utils/formatDate";

const Details = ({dateAvailable, image, name, size, condition }) => {

    const [sizeText, setSizeText] = useState("")

    useEffect(() => {
    if (sizes[size.toLowerCase()]) {
        setSizeText(sizes[size]);
    } else {
        setSizeText("Size not found");
    }
    }, [])
    
  return (
    <>
      <div>
        {/* img content */}
        {/* Deberia venir desde la llamada fetch */}
        <div>
          <img src={image} />
        </div>

        {/* Available from */}
        <p className="body-small date-available">
          <span>Publicado desde el</span> {formatDate(dateAvailable)}
        </p>
      </div>

      {/* Item info */}
      <div>
        <h1>{name}</h1>
        <div className="flex-between body-large details">
          <p>
            {" "}
            <span className="bold">Talla:</span> {size.toUpperCase()} - {sizeText}
          </p>
          <p>
            <span className="bold">Estado:</span> {condition}
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;



const sizes = {
    "xl": "Extra large", 
    "lg": "Large",
    "m":"Medium", 
    "s":"Small", 
    "xm":"Extra small"

}