import ClockOk from "../assets/clock-ok.png";
import ActiveBookmark from "../assets/bookmark-active.png";
import AddBookmark from "../assets/bookmark_add.png";
import Exchange from "../assets/interchange.png";

const AvailableInterchange = ({ seller, isFavorite }) => {
  return (
    <>
      <div className="exchange ok-exchange">
        <div className="flex-between">
          <p className="headline-medium bold">¡Estamos cerca!</p>
          {/* Icon clock */}
          <div className="clock">
            <img src={ClockOk} />
          </div>
        </div>
        <div className="body-small content">
          <p>
            <span className="bold">{seller}</span> tienen horarios similares que
            nos permiten generar una fecha automática para el intercambio.
          </p>
          <p>
            Si te ha gustado mucho esta prenda y quieres intercambiarla, envía
            un aviso a su propietario para que este pueda buscar en tu catálogo
            alguna prenda de su interés y arreglar un intercambio.
          </p>
        </div>
      </div>

      <div className="flex-between action-btns">
        {isFavorite ? <Favorite /> : <AddFavorite />}
        <button className="flex-between make-exchange">
          <div className="icon-btn">
            <img src={Exchange} />
          </div>
          <p className="body-medium">Haz un intercambio</p>
        </button>
      </div>
    </>
  );
};

export default AvailableInterchange;

const AddFavorite = () => {
  return (
    <button className="flex-between add-bookmark">
      <div className="icon-btn">
        <img src={AddBookmark} />
      </div>
      <p className="body-medium">Añadir a favoritos</p>
    </button>
  );
};

const Favorite = () => {
  return (
    <button className="flex-between active-bookmark">
      <div className="icon-btn">
        <img src={ActiveBookmark} />
      </div>
      <p className="body-medium">En tus favoritos</p>
    </button>
  );
};
