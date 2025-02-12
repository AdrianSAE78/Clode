import ClockError from "../assets/clock-error.png";
import CalendarIcon from "../assets/edit-calendar.png"
import LeftShort from "../assets/chevron-left.png"
import { Link } from "react-router-dom";

const ImposibleInterchange = ({ seller }) => {
  return (
    <>
    <div className="exchange error-exchange">
      <div className="flex-between header">
        <div className="notice-text">
          <p className="headline-medium bold">Ups!</p>
          <p className="headline-small">Tus horarios no coinciden</p>
        </div>
        {/* Icon clock */}
        <div className="clock">
          <img src={ClockError} />
        </div>
      </div>
      <div className="body-small content">
        <p>
          <span className="bold">{seller} y tu</span> no tienen horarios
          similares que nos permiten generar una fecha automática para el
          intercambio.
        </p>
        <p>
          <span className="bold">
            Puedes enviar una solicitud de intercambio
          </span>{" "}
          siempre que estés dispuesto a elegir uno de los horarios disponibles
          de Adrián. Esto no garantiza un intercambio, solo facilita la
          asignación automática.
        </p>
        <p>
          Si te ha gustado mucho esta prenda y quieres intercambiarla, envía un
          <span className="bold">
            {" "}
            avisa a su propietario para que este pueda buscar en tu catálogo
            alguna prenda de su interés.
          </span>
        </p>
      </div>
    </div>

    <div className="flex-between action-btns">
            <Link to={-1} className="flex-between negative-btn button return-btn">
              <div className="icon-btn">
                <img src={LeftShort} />
              </div>
              <p className="body-medium">Buscar otras opciones</p>
            </Link>
            <button className="flex-between make-exchange negative-btn calendar-btn" >
              <div className="icon-btn">
                <img src={CalendarIcon} />
              </div>
              <p className="body-medium">Horarios disponibles</p>
            </button>
          </div></>
  );
};

export default ImposibleInterchange;
