import Box from "@mui/material";
import TextField from "@mui/material";
import { useState } from "react";

const CreateGarment = () => {
  const [image, setImage] = useState(null);

  // Función para manejar la captura de imágenes
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Nueva prenda</h1>
      <div>
        {/* Componente de camara */}
        <div className="">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCapture}
            style={{ display: "block", marginBottom: "20px" }}
          />
          <label>Agrega una foto o sube una desde tu galería</label>
        </div>

        {/* Mostrar la imagen capturada */}
        {image && (
          <div>
            <h3>Imagen Capturada:</h3>
            <img src={image} alt="Capturada" width="300" />
          </div>
        )}
      </div>

      <h2>Completemos algunos detalles</h2>
      <p>Ingresa la descripción de tu prenda</p>
      <p>
        Mientras más sencillo y descriptivo el nombre, existen mayores chances
        de que logres un intercambio más rápido.{" "}
      </p>
      <Box>
      <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        />
      </Box>
    </div>
  );
};

export default CreateGarment;
