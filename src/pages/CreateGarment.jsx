import { Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuForm from "../components/menuForm";
import "../styles/main.css";
import "../styles/pages/new-garment.css";
import Layout from "./layout";

import axios from "axios"; // Para realizar peticiones HTTP

const CreateGarment = () => {
  const navigate = useNavigate();


  const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/categories");
          setCategories(response.data);
        } catch (error) {
          console.error("Error al obtener categorías:", error);
        }
      };

      fetchCategories();
    }, []);


  // Estados del formulario
  const [image, setImage] = useState(null); // Estado para la imagen
  const [name, setName] = useState(""); // Estado para el nombre/descripción
  const [talla, setTalla] = useState(""); // Estado para la talla
  const [categorie, setCategorie] = useState(""); // Estado para la categoría
  const [estado, setEstado] = useState(""); // Estado para el estado de la prenda

  // Función para manejar cambios en los inputs
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const categorieHandler = (e) => {
    setCategorie(e.target.value); // Guarda el valor seleccionado en el estado
  };

  // Función para manejar la captura de imágenes
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Guarda el archivo de imagen
    }
  };

  // Función para enviar el formulario
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!name || !talla || !categorie || !estado || !image) {
      alert("Todos los campos son obligatorios, incluyendo la imagen.");
      return;
    }

    // Crear FormData para enviar al backend
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", name);
    formData.append("size", talla);
    formData.append("condition", estado);
    formData.append("brand", "Sin Marca");
    formData.append("categoryId", categorie); // Se envía el ID de la categoría seleccionada

    // Verificar si la imagen es un archivo antes de agregarla
    if (image instanceof File) {
      formData.append("garment_image", image);
    } else {
      alert("Por favor, selecciona una imagen válida.");
      return;
    }

    // 🔹 Mostrar datos en consola antes de enviarlos
    console.log("Datos enviados:", Object.fromEntries(formData.entries()));

    try {
      // Enviar datos al backend
      const response = await axios.post("http://localhost:3000/api/garments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Prenda creada:", response.data);
      alert("Prenda creada exitosamente");
      navigate("/"); // Redirigir al home
    } catch (error) {
      console.error("Error al crear prenda:", error.response?.data || error.message);
      alert("Error al crear la prenda: " + (error.response?.data?.error || "Error desconocido"));
    }
};


  return (
    <Layout>
      {/* Encabezado */}
      <div className="header">
        <h1 className="display-large">Nueva Prenda</h1>
      </div>

      {/* Sección de carga de imagen */}
      <div>
        {!image && (
          <div className="cam-cont">
            <div className="camera-container">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
                id="input-camera"
              />
              <button className="camera-buton">
                <div className="icon">
                  <img src="/icons/new-img.png" alt="Nueva imagen" />
                </div>
              </button>
            </div>
            <label className="label-large label-input">
              Agrega una foto o sube una desde tu galería
            </label>
          </div>
        )}

        {/* Mostrar la imagen capturada */}
        {image && (
          <>
            <div className="image-upload">
              <img src={URL.createObjectURL(image)} alt="Capturada" />
            </div>
            <p className="label-large label-input">Imagen subida</p>
          </>
        )}
      </div>

      {/* Formulario de detalles de la prenda */}
      <section className="form">
        <h2 className="headline-small">Completemos algunos detalles</h2>
        <Box autoComplete="off" component="form">
          {/* Campo de descripción */}
          <div className="item-form">
            <p className="body-large bold">Ingresa la descripción de tu prenda</p>
            <p className="body-medium">
              Mientras más sencillo y descriptivo el nombre, existen mayores
              chances de que logres un intercambio más rápido.
            </p>
            <TextField
              sx={{ minWidth: 350 }}
              required
              id="filled-required"
              label="Descripción de la prenda"
              value={name}
              onChange={handleInputChange(setName)}
              variant="filled"
              placeholder="Ej: Chompa verde de cuero"
            />
          </div>

          {/* Campo de talla */}
          <div className="item-form">
            <p className="body-large bold">Escoge la talla</p>
            <p className="body-medium">
              Asegúrate de incluir la que está marcada en la etiqueta de tu
              prenda.
            </p>
            <MenuForm
              options={menuOptions.tallas}
              title="Selecciona la talla"
              state={talla}
              stateHandler={handleInputChange(setTalla)}
            />
          </div>

          {/* Campo de estilo */}
          <div className="item-form">
            <p className="body-large bold">
              Escoge el estilo más cercano a tu prenda
            </p>
            <p className="body-medium">
              Esto nos ayudará a categorizar de mejor manera tu prenda y
              conectarte con personas que estén buscando en este mismo estilo.
            </p>
            <MenuForm
              options={categories.map(category => ({
                value: category.id, // Enviamos el ID de la categoría
                name: category.categorie_name // Mostramos el nombre de la categoría
              }))}
              title="Selecciona la categoría"
              state={categorie}
              stateHandler={categorieHandler}
            />

          </div>

          {/* Campo de estado */}
          <div className="item-form">
            <p className="body-large bold">Selecciona el estado de tu prenda</p>
            <p className="body-medium">
              Te pedimos que elijas con la mayor sinceridad en este campo. Recuerda
              que no está permitido el intercambio en mal estado, a menos que
              quieras que la prenda que recibes esté en el mismo estado.
            </p>
            <MenuForm
              options={menuOptions.estado}
              title="Selecciona el estado"
              state={estado}
              stateHandler={handleInputChange(setEstado)}
            />

          </div>
        </Box>
      </section>

      {/* Botones de acción */}
      <div className="botonera">
        <button onClick={() => navigate(-1)} className="return headline-small">
          Cancelar
        </button>
        <button className="send headline-medium" onClick={submitHandler}>
          Publicar
        </button>
      </div>
    </Layout>
  );
};

export default CreateGarment;

// Opciones para los menús desplegables
const menuOptions = {
  tallas: [
    { value: "xs", name: "XS - Extra small" },
    { value: "s", name: "S - Small" },
    { value: "m", name: "M - Medium" },
    { value: "l", name: "L - Large" },
    { value: "xl", name: "XL - Extra large" },
  ],
  estado: [
    { value: "un-solo-uso", name: "Un solo uso" },
    { value: "nuevo-sin-etiqueta", name: "Nuevo sin etiqueta" },
    { value: "como-nuevo", name: "Como nuevo" },
    { value: "buen-estado", name: "En buen estado" },
    { value: "defectos-min", name: "Con defectos mínimos" },
    { value: "reparada", name: "Reparada" },
  ],
};