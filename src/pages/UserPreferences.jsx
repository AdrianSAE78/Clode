import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuForm from "../components/menuForm";
import CustomModal from "../components/CustomModal";
import TimeRangeSlider from "../components/timeRangeSlider"
import PreferedStyleLabel from "../components/PreferedStyleLabels";
import "../styles/main.css";


const UserPreferences = () => {
    const navigate = useNavigate();
    const [prefered_free_hours, setFreeHours] = useState({
        start: "",
        end: "",
    });
    const [prefered_size, setSize] = useState("");
    const [prefered_size_shoes, setShoesSize] = useState("");
    const [prefered_style, setStyle] = useState([]);

    const [categories, setCategories] = useState([])

    // Estados para el modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const handleInputChange = (setState) => (e) => {
        setState(e.target.value);
    };

    const handleSelectStyle = (style) => {
        setStyle((prevStyles) =>
            prevStyles.includes(style)
                ? prevStyles.filter((s) => s !== style) // Si ya está, lo quita
                : [...prevStyles, style] // Si no está, lo agrega
        );
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validación de campos obligatorios
        if (!prefered_free_hours || !prefered_size || !prefered_size_shoes || !prefered_style) {
            setModalTitle("Error");
            setModalMessage(
                "Todos los campos son obligatorios."
            );
            setModalOpen(true);
            return;
        }

        // // Crear FormData para enviar al backend
        const formData = new FormData();
        formData.append("prefered_free_hours", prefered_free_hours);
        formData.append("prefered_size", prefered_size);
        formData.append("prefered_size_shoes", prefered_size_shoes);
        formData.append("prefered_style", prefered_style);
        // formData.append("userId", id); // Se envía el ID de la categoría seleccionada
        console.log(formData)
        // // Envio
        try {
            await axios.post(
                "http://localhost:3000/api/user-preferences",
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
            //}
        };
    }

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
            <div className="header complete-profile">
                <h1 className="headline-large">Completemos tu perfil</h1>
            </div>

            <p className="body-medium">
                Para proporcionarte mejores recomendaciones y facilitar los intercambios, requerimos información adicional.
                No te preocupes, no compartiremos con nadie la información que nos proporciones.
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
                            state={prefered_size}
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
                            state={prefered_size_shoes}
                            stateHandler={handleInputChange(setShoesSize)}
                        />
                    </div>

                    {/* Estilo preferido */}
                    <div className="item-form">
                        <p className="body-large bold">Selecciona uno o más estilos</p>
                        <p className="body-medium">
                            ¿Con cuál de estos estilos te identificas o hacia cuál de estos quieren cambiar tu estilo?
                            <strong> Puedes seleccionar más de uno.</strong>
                        </p>
                        <div className="container-categories">
                            {
                                categories.map((item, index) => (
                                    <PreferedStyleLabel
                                        key={item.categorie_name}
                                        label={item.categorie_name}
                                        colorIndex={index}
                                        onClick={handleSelectStyle}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    {/* Horarios preferidos */}
                    <div className="item-form">
                        <p className="body-large bold">Selecciona tus horas libres</p>
                        <p className="body-medium">
                            Nuestra plataforma utiliza tus horarios libres como horarios para generar intercambios. Selecciona los horarios en que tienes espacio u horas libres, de preferencia todos los días que estás en el campus.
                        </p>
                        <p className="body-medium">
                            Recuerda que los intercambios solo se podrán hacer en el campus de la universidad, de Lunes a Viernes
                        </p>

                        <TimeRangeSlider newHour={prefered_free_hours} setNewHour={setFreeHours} />

                    </div>

                    {/* Botones de acción */}
                    <div className="botonera">
                        <button onClick={() => navigate(-1)} className="return headline-small">
                            Cancelar
                        </button>
                        <button className="send headline-medium" onClick={submitHandler}>
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

// Opciones para los menús desplegables
const menuOptions = {
    shoes: [
        { value: "35EU / 3US", name: "35EU / 3US" },
        { value: "36EU / 4US", name: "36EU / 4US" },
        { value: "37EU / 5US", name: "37EU / 5US" },
        { value: "38EU / 6US", name: "38EU / 6US" },
        { value: "39EU / 7US", name: "39EU / 7US" },
        { value: "40EU / 7.5US", name: "40EU / 7.5US" },
        { value: "41EU / 8US", name: "41EU / 8US" },
        { value: "42EU / 9US", name: "42EU / 9US" },
        { value: "43EU / 10US", name: "43EU / 10US" },
        { value: "44EU / 10.5US", name: "44EU / 10.5US" },
        { value: "45EU / 11US", name: "45EU / 11US" },
        { value: "46EU / 12US", name: "46EU / 12US" },
        { value: "47EU / 13US", name: "47EU / 13US" },
    ],
    sizes: [
        { value: "xs", name: "XS - Extra small" },
        { value: "s", name: "S - Small" },
        { value: "m", name: "M - Medium" },
        { value: "l", name: "L - Large" },
        { value: "xl", name: "XL - Extra large" },
    ],
};
