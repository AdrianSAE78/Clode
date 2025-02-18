import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import "../styles/components/select-garment-modal.css";

const SelectGarmentModal = ({ open, onClose, onSelect }) => {

    const { user } = useAuth();
    const [garments, setGarments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open) {
            // Llama a tu API para obtener las prendas del usuario
            axios
                .get("http://localhost:3000/api/garments/by-user", {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                .then((response) => {
                    setGarments(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al cargar tus prendas:", error);
                    setLoading(false);
                });
        }
    }, [open, user]);

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Selecciona la prenda que deseas intercambiar</h2>
                {loading ? (
                    <div>Cargando prendas...</div>
                ) : (
                    <ul className="garment-modal-list">
                        {garments.map((garment) => (
                            <li
                                key={garment.id}
                                onClick={() => {
                                    onSelect(garment.id);
                                    onClose();
                                }}
                            >
                                <img
                                    src={`http://localhost:3000/uploads/${garment.garment_image}`}
                                    alt={garment.title}
                                />
                                <p>{garment.title}</p>
                            </li>
                        ))}
                    </ul>
                )}
                <button className="close-modal" onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default SelectGarmentModal;
