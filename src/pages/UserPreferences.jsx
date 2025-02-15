import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuForm from "../components/menuForm";
import CustomModal from "../components/CustomModal";
import TimeInput from "../components/TimePicker";
import PreferedStyleLabel from "../components/PreferedStyleLabels";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "../styles/main.css";
import "../styles/pages/user-preferences.css";
import { menuOptions } from "../components/MenuOptionsPreferences";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const UserPreferences = () => {
  const navigate = useNavigate();
  // Estados para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Estados de los inputs
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [preferedSize, setSize] = useState("");
  const [preferedSizeShoes, setShoesSize] = useState("");
  const [preferedStyle, setStyle] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const handleSelectStyle = (style) => {
    setStyle((prevStyles) =>
      prevStyles.includes(style)
        ? prevStyles.filter((s) => s !== style)
        : [...prevStyles, style]
    );
  };

  const handleStartChange = (newValue) => {
    setStartHour(newValue ? dayjs(newValue) : null);
  };

  const handleEndChange = (newValue) => {
    setEndHour(newValue ? dayjs(newValue) : null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let errorMessages = [];

    if (!startHour) {
      errorMessages.push("Debe seleccionar una hora de inicio.");
    }
    if (!endHour) {
      errorMessages.push("Debe seleccionar una hora de finalización.");
    }
    if (
      startHour &&
      endHour &&
      dayjs(startHour).isSameOrAfter(dayjs(endHour))
    ) {
      errorMessages.push(
        `La hora de inicio (${startHour.format(
          "HH:mm"
        )}) debe ser menor que la de finalización (${endHour.format("HH:mm")}).`
      );
    }

    if (!preferedSize) {
      errorMessages.push("Debe seleccionar una talla de ropa.");
    }
    if (!preferedSizeShoes) {
      errorMessages.push("Debe seleccionar una talla de zapatos.");
    }
    if (preferedStyle.length === 0) {
      errorMessages.push("Debe seleccionar al menos un estilo preferido.");
    }

    if (errorMessages.length > 0) {
      setModalTitle("Error");
      setModalMessage(errorMessages.join("\n"));
      setModalOpen(true);
      return;
    }
    console.log(Array.isArray(preferedStyle))
    try {
      await axios.post("http://localhost:3000/api/user-preferences", {
        prefered_free_hours: {
          start: startHour.format("HH:mm"),
          end: endHour.format("HH:mm"),
        },
        prefered_size: preferedSize,
        prefered_size_shoes: preferedSizeShoes,
        prefered_style: [...preferedStyle],
      });

      setModalTitle("Éxito");
      setModalMessage("Preferencias guardadas exitosamente.");
      setModalOpen(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(
        "Error al guardar: " +
          (error.response?.data?.error || "Error desconocido")
      );
      setModalOpen(true);
    }
  };
  useEffect(() => {
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
      }
    };
    getCategories();
  }, []);

  return (
    <div className="body-complete-profile">
      <h1 className="headline-large title-section">Completemos tu perfil</h1>
      <p className="body-medium">
        Para proporcionarte mejores recomendaciones y facilitar los
        intercambios, requerimos información adicional. No te preocupes, no
        compartiremos con nadie la información que nos proporciones.
      </p>

      <section className="form">
        <form onSubmit={submitHandler}>
          {/* Talla preferida */}
          <div className="item-form">
            <p className="body-large bold">Selecciona tu talla de ropa</p>
            <p className="body-medium">
              Asegúrate de incluir la talla que con mayor frecuencia utilizas.
            </p>
            <MenuForm
              options={menuOptions.sizes}
              title="Selecciona la talla"
              state={preferedSize}
              stateHandler={handleInputChange(setSize)}
            />
          </div>

          {/* Talla de zapatos */}
          <div className="item-form">
            <p className="body-large bold">Selecciona tu talla de zapatos</p>
            <p className="body-medium">
              Asegúrate de incluir el número de zapatos de tu preferencia.
              <strong> Las tallas está marcadas en formato EU/US</strong>
            </p>
            <MenuForm
              options={menuOptions.shoes}
              title="Selecciona la talla"
              state={preferedSizeShoes}
              stateHandler={handleInputChange(setShoesSize)}
            />
          </div>

          {/* Estilo preferido */}
          <div className="item-form">
            <p className="body-large bold">Selecciona uno o más estilos</p>
            <p className="body-medium">
              ¿Con cuál de estos estilos te identificas o hacia cuál de estos
              quieren cambiar tu estilo?
              <strong> Puedes seleccionar más de uno.</strong>
            </p>
            <div className="container-categories">
              {categories.map((item, index) => {
                const isActive = preferedStyle.includes(item.categorie_name);

                return (
                  <PreferedStyleLabel
                    key={item.categorie_name}
                    label={item.categorie_name}
                    colorIndex={index}
                    onClick={handleSelectStyle}
                    active={isActive}
                  />
                );
              })}
            </div>
          </div>

          {/* Horarios preferidos */}
          <div className="item-form">
            <p className="body-large bold">Selecciona tus horas libres</p>
            <p className="body-medium">
              Nuestra plataforma utiliza tus horarios libres como horarios para
              generar intercambios. Selecciona los horarios en que tienes
              espacio u horas libres, de preferencia todos los días que estás en
              el campus.
            </p>
            <p className="body-medium">
              Recuerda que los intercambios solo se podrán hacer en el campus de
              la universidad, de Lunes a Viernes.
            </p>

            <div className="hours-input">
              <TimeInput
                placeholder="Hora de inicio"
                value={startHour}
                onChange={handleStartChange}
              />
              <TimeInput
                placeholder="Hora de finalización"
                value={endHour}
                onChange={handleEndChange}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="botonera">
            <button
              onClick={() => navigate(-1)}
              className="return headline-small"
            >
              Cancelar
            </button>
            <button className="send headline-medium" type="submit">
              Guardar
            </button>
          </div>
          {/* Modal que maneja errore */}
          <CustomModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={modalTitle}
            message={modalMessage}
          />
        </form>
      </section>
    </div>
  );
};

export default UserPreferences;


