import { Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./layout";
import MenuForm from "../components/menuForm";
import CustomModal from "../components/CustomModal";
import "../styles/pages/new-garment.css";
import "../styles/main.css";

const CreateGarment = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Estados del formulario
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [categorie, setCategorie] = useState("");
  const [estado, setEstado] = useState("");

  // Estados para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Get para categorias disponibles en sistema
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Función para manejar cambios en los inputs
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const categorieHandler = (e) => {
    setCategorie(e.target.value);
  };

  // Funcion para comprimir tamaño de archivo
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir la imagen a JPEG con 90% de calidad
        canvas.toBlob((blob) => callback(blob), "image/jpeg", 0.9);
      };
    };
  };

  // Función para manejar la captura y compresión de imágenes
  const handleCapture = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    compressImage(file, (compressedBlob) => {
      const compressedFile = new File([compressedBlob], file.name, {
        type: "image/jpeg",
      });
      setImage(compressedFile);
    });
  };

  // Función para enviar el formulario
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!name || !size || !categorie || !estado || !image) {
      setModalTitle("Error");
      setModalMessage(
        "Todos los campos son obligatorios, incluyendo la imagen."
      );
      setModalOpen(true);
      return;
    }

    // Crear FormData para enviar al backend
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", name);
    formData.append("size", size);
    formData.append("condition", estado);
    formData.append("brand", "Sin Marca");
    formData.append("categoryId", categorie); // Se envía el ID de la categoría seleccionada

    // Verificar si la imagen es un archivo antes de agregarla
    if (image instanceof File) {
      formData.append("garment_image", image);
    } else {
      setModalTitle("Error");
      setModalMessage("Por favor, selecciona una imagen válida.");
      setModalOpen(true);
      return;
    }

    // Envio
    try {
      const response = await axios.post(
        "http://localhost:3000/api/garments",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setModalTitle("Éxito");
      setModalMessage("Prenda creada exitosamente");
      setModalOpen(true);
      setTimeout(() => navigate("/"), 2000); // Redirige después de 2s
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(
        "Error al crear la prenda: " +
          (error.response?.data?.error || "Error desconocido")
      );
      setModalOpen(true);
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
            <p className="body-large bold">
              Ingresa la descripción de tu prenda
            </p>
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
              options={menuOptions.sizes}
              title="Selecciona la talla"
              state={size}
              stateHandler={handleInputChange(setSize)}
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
              options={categories.map((category) => ({
                value: category.id, // Enviamos el ID de la categoría
                name: category.categorie_name, // Mostramos el nombre de la categoría
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
              Te pedimos que elijas con la mayor sinceridad en este campo.
              Recuerda que no está permitido el intercambio en mal estado, a
              menos que quieras que la prenda que recibes esté en el mismo
              estado.
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
      {/* Modal que maneja errore */}
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </Layout>
  );
};

export default CreateGarment;

// Opciones para los menús desplegables
const menuOptions = {
  sizes: [
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
