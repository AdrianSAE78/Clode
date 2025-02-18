import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Metrics from "../components/metrics";
import "../styles/pages/profile.css";
import NextExchangeSection from "../components/NextExchange";

const Profile = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const metrics = [
    {
      name: "agua",
      number: user.literCounter,
      unidad: (user.literCounter === 0) ? 'litros': 'mil litros',
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
  
  return (
    <>
      <h1>Mi perfil</h1>
      {/* Card */}
      <div className="card">
        {/* Profile img */}
        <div className="profile-picture">
          <img src={user.profilePicture} />
        </div>
        {/* identification info */}
        <div className="personal-info">
          {/* user name and nickname */}
          <p className="headline-medium bold">{user.username}</p>
          <p className="body-large">@{user.username}</p>
          {/* score */}
          <div className="score">
            <div className="icon">
              <img src="/icons/star.png" />
            </div>
            <p className="body-medium">{user.trustScore}</p>
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

        <button onClick={() => navigate("/complete-profile")}
        className="update" to="/complete-profile">
          Actualizar tu información y preferencias
        </button>
      </div>

      <NextExchangeSection />
    </>
  );
};

export default Profile;
