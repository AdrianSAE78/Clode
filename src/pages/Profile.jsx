import { useNavigate } from "react-router-dom";
import Metrics from "../components/metrics";
import "../styles/pages/profile.css";


import photo from "../assets/profile.jpg";
import zapatos from "../assets/products/calzado.jpg";
import Layout from "./layout";


const Profile = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="header">
        <h1 className="display-large">Mi Perfil</h1>
      </div>
      {/* Card */}
      <div className="card">
        {/* Profile img */}
        <div className="profile-picture">
          <img src={photo} />
        </div>
        {/* identification info */}
        <div className="personal-info">
          {/* user name and nickname */}
          <p className="headline-medium bold">Ariel Umatambo</p>
          <p className="body-large">@arielU</p>
          {/* score */}
          <div className="score">
            <div className="icon">
              <img src="/icons/star.png" />
            </div>
            <p className="body-medium">4.5</p>
          </div>
        </div>

        {/* metricas */}
        <div className="metrics">
          {metrics.map((item) => {
            return (
              <Metrics
                key={item.name}
                icon={item.icon}
                estado={item.estado}
                number={item.number}
                unidad={item.unidad}
                active={item.active}
              />
            );
          })}
        </div>

        <button onClick={() => navigate("/create-garment")}
        className="add" to="/create-garment">
          + Agrega prendas para intercambiar
        </button>
      </div>

      <section>
        <div className="next-appoiment1">
          <h2 className="headline-small">
            Intercambios <span className="body-large">próximos</span>
          </h2>
          <div className="details">
            {/* img de proximo intercambio */}
            <div className="next-app-img">
              <img src={zapatos} alt="Image del siguiente intercambio" />
            </div>
            {/* Contenedor de información de cita */}
            <div className="body-large text">
              {/* fecha */}
              <p>Lunes 07 de enero, 2024</p>
              {/* ubicación estática */}
              <p className="place">Patio central -PUCE</p>
              {/* Hora disponible */}
              <p>12:00</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;

const metrics = [
  {
    name: "agua",
    number: 2.5,
    unidad: "mil litros",
    estado: "Ahorrados",
    icon: "/icons/water.png",
    active: false,
  },
  {
    name: "recive",
    number: 5,
    unidad: "prendas",
    estado: "Recibidas",
    icon: "/icons/cicle.png",
    active: true,
  },
  {
    name: "publish",
    number: 10,
    unidad: "prendas",
    estado: "Publicadas",
    icon: "/icons/shirt.png",
    active: false,
  },
];
