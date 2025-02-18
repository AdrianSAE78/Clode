// import ClockOk from "../assets/clock-ok.png";
// import ActiveBookmark from "../assets/bookmark-active.png";
// import AddBookmark from "../assets/bookmark_add.png";
// import Exchange from "../assets/interchange.png";

// const AvailableInterchange = ({ seller, isFavorite }) => {
//   return (
//     <>
//       <div className="exchange ok-exchange">
//         <div className="flex-between">
//           <p className="headline-medium bold">¡Estamos cerca!</p>
//           {/* Icon clock */}
//           <div className="clock">
//             <img src={ClockOk} />
//           </div>
//         </div>
//         <div className="body-small content">
//           <p>
//             <span className="bold">{seller}</span> tienen horarios similares que
//             nos permiten generar una fecha automática para el intercambio.
//           </p>
//           <p>
//             Si te ha gustado mucho esta prenda y quieres intercambiarla, envía
//             un aviso a su propietario para que este pueda buscar en tu catálogo
//             alguna prenda de su interés y arreglar un intercambio.
//           </p>
//         </div>
//       </div>

//       <div className="flex-between action-btns">
//         {isFavorite ? <Favorite /> : <AddFavorite />}
//         <button className="flex-between make-exchange">
//           <div className="icon-btn">
//             <img src={Exchange} />
//           </div>
//           <p className="body-medium">Haz un intercambio</p>
//         </button>
//       </div>
//     </>
//   );
// };

// export default AvailableInterchange;

// const AddFavorite = () => {
//   return (
//     <button className="flex-between add-bookmark">
//       <div className="icon-btn">
//         <img src={AddBookmark} />
//       </div>
//       <p className="body-medium">Añadir a favoritos</p>
//     </button>
//   );
// };

// const Favorite = () => {
//   return (
//     <button className="flex-between active-bookmark">
//       <div className="icon-btn">
//         <img src={ActiveBookmark} />
//       </div>
//       <p className="body-medium">En tus favoritos</p>
//     </button>
//   );
// };
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import SelectGarmentModal from "./SelectGarmentModal"; // Importa el modal
import ClockOk from "../assets/clock-ok.png";
import ActiveBookmark from "../assets/bookmark-active.png";
import AddBookmark from "../assets/bookmark_add.png";
import Exchange from "../assets/interchange.png";

const AvailableInterchange = ({
  seller,
  isFavorite,
  receivedGarmentId, // ID de la prenda que se solicita (la prenda que está viendo el usuario)
  sellerId          // ID del vendedor (propietario de la prenda solicitada)
}) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectGarment = async (selectedGarmentId) => {
    // Armamos el payload para crear el intercambio
    const payload = {
      sent_exchanges: selectedGarmentId, // La prenda que el usuario elige de su catálogo
      received_exchanges: receivedGarmentId, //La prenda que el usuario quiere intercambiar
      sender_user: user.id,  //El id del usuario que manda la solicitud
      receiver_user: sellerId, //El id del usuario que recibe la solicitud
    };
    console.log(payload)
    try {
      const response = await axios.post("http://localhost:3000/api/exchange/create", payload, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}` 
        }
      });
      console.log("Intercambio creado:", response.data);

    } catch (error) {
      console.error("Error completo:", error.response?.data || error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="exchange ok-exchange">
        <div className="flex-between">
          <p className="headline-medium bold">¡Estamos cerca!</p>
          <div className="clock">
            <img src={ClockOk} alt="Clock" />
          </div>
        </div>
        <div className="body-small content">
          <p>
            <span className="bold">{seller}</span> tiene horarios similares que
            permiten generar una fecha automática para el intercambio.
          </p>
          <p>
            Si te ha gustado esta prenda y deseas intercambiarla, envía un aviso
            a su propietario para que pueda revisar tu catálogo y acordar el
            intercambio.
          </p>
        </div>
      </div>

      <div className="flex-between action-btns">
        {isFavorite ? <Favorite /> : <AddFavorite />}
        <button className="flex-between make-exchange" onClick={openModal}>
          <div className="icon-btn">
            <img src={Exchange} alt="Exchange" />
          </div>
          <p className="body-medium">Haz un intercambio</p>
        </button>
      </div>
      <SelectGarmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectGarment}
      />
    </>
  );
};

export default AvailableInterchange;

const AddFavorite = () => {
  return (
    <button className="flex-between add-bookmark">
      <div className="icon-btn">
        <img src={AddBookmark} alt="Añadir a favoritos" />
      </div>
      <p className="body-medium">Añadir a favoritos</p>
    </button>
  );
};

const Favorite = () => {
  return (
    <button className="flex-between active-bookmark">
      <div className="icon-btn">
        <img src={ActiveBookmark} alt="En favoritos" />
      </div>
      <p className="body-medium">En tus favoritos</p>
    </button>
  );
};