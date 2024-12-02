import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuForm from "../components/menuForm";
import "../styles/main.css";
import "../styles/pages/new-garment.css";

const CreateGarment = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  const [talla, setTalla] = useState("");
  const [categorie, setCategorie] = useState("");
  const [estado, setEstado] = useState("");

  const [toSend, setToSend] = useState({});
  const [errors, setErrors] = useState({});

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const tallaHandler = (e) => {
    setTalla(e.target.value);
  };
  const categorieHandler = (e) => {
    setCategorie(e.target.value);
  };

  const estadoHandler = (e) => {
    setEstado(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "La descripción es obligatoria.";
    if (!talla) newErrors.talla = "La talla es obligatoria.";
    if (!categorie) newErrors.categorie = "La categoría es obligatoria.";
    if (!estado) newErrors.estado = "El estado es obligatorio.";
    if (!image) newErrors.image = "La imagen es obligatoria.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const submitHandler = () => {
    if (!validate()) {
      console.log("Formulario no válido", errors);
      return; // Detener el envío si hay errores
    }

    console.log("Datos enviados:", toSend);

    navigate("/"); 
  };

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

  useEffect(() => {
    setToSend({
      image,
      name,
      talla,
      categorie,
      estado,
    });
  }, [image, name, talla, categorie, estado]);

  return (
    <div className="body-custom">
      <h1>Nueva prenda</h1>
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
                  <img src="/icons/new-img.png" />
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
              <img src={image} alt="Capturada" />
            </div>
            <p className="label-large label-input">Imagen subida</p>
          </>
        )}
      </div>
      <section className="form">
        <h2 className="headline-small">Completemos algunos detalles</h2>
        <Box autoComplete="off" component="form">
          <div className="item-form">
            <p className="body-large bold">
              Ingresa la descripción de tu prenda
            </p>
            <p className="body-medium">
              Mientras más sencillo y descriptivo el nombre, existen mayores
              chances de que logres un intercambio más rápido.{" "}
            </p>
            <TextField
              sx={{ minWidth: 350 }}
              required
              id="filled-required"
              label="Descripción de la prenda"
              value={name}
              onChange={nameHandler}
              variant="filled"
              placeholder="Ej: Chompa verde de cuero"
            />
          </div>
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
              stateHandler={tallaHandler}
            />
          </div>
          <div className="item-form">
            <p className="body-large bold">
              Escoge el estilo más cercano a tu prenda
            </p>
            <p className="body-medium">
              Esto nos ayudará a categorizar de mejor manera tu prenda y
              conectarte con personas que estén buscando en este mismo estilo.
            </p>
            <MenuForm
              options={menuOptions.estilos}
              title="Selecciona el estilo"
              state={categorie}
              stateHandler={categorieHandler}
            />
          </div>
          <div className="item-form">
            <p className="body-large bold">Selecciona el estado de tu prenda</p>
            <p className="body-medium">
              Te pedimos que elijas la mayor sinceridad en este campo. Recuerda
              que no está permitido el intercambio en mal estado, a menos que
              quieras que la prenda que recibes esté en el mismo estado.
            </p>
            <MenuForm
              options={menuOptions.estado}
              title="Selecciona el estado"
              state={estado}
              stateHandler={estadoHandler}
            />
          </div>
        </Box>
      </section>

      <div className="botonera">
        <button onClick={() => navigate(-1)} className="return headline-small">
          Cancelar
        </button>
        <button className="send headline-medium" onClick={submitHandler}>
          Publicar
        </button>
      </div>
    </div>
  );
};

export default CreateGarment;

const menuOptions = {
  tallas: [
    {
      value: "xs",
      name: "XS - Extra small",
    },
    {
      value: "s",
      name: "S - Small",
    },
    {
      value: "m",
      name: "M - Medium",
    },
    {
      value: "l",
      name: "L - Large",
    },
    {
      value: "xl",
      name: "XL - Extra large",
    },
  ],
  estilos: [
    {
      value: "vintage",
      name: "Vintage",
    },
    {
      value: "rock",
      name: "Rock",
    },
    {
      value: "verano",
      name: "Verano",
    },
    {
      value: "invierno",
      name: "Invierno",
    },
    {
      value: "urbano",
      name: "Urbano",
    },
    {
      value: "bussines",
      name: "Bussines",
    },
    {
      value: "etnico",
      name: "etnico",
    },
    {
      value: "deportivo",
      name: "Deportivo",
    },
    {
      value: "formal",
      name: "Formal",
    },
    {
      value: "playa",
      name: "Playa",
    },
    {
      value: "casual",
      name: "Casual",
    },
  ],
  estado: [
    {
      value: "un-solo-uso",
      name: "Un solo uso",
    },
    {
      value: "nuevo-sin-etiqueta",
      name: "Nuevo sin etiqueta",
    },
    {
      value: "como-nuevo",
      name: "Como nuevo",
    },
    {
      value: "buen-estado",
      name: "En buen estado",
    },
    {
      value: "defectos-min",
      name: "Con defectos mínimos",
    },
    {
      value: "reparada",
      name: "Reparada",
    },
  ],
};
