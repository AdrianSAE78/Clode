import {useAuth} from "../context/AuthContext"
import { Navigate } from "react-router-dom";
import "../styles/login.css";
import GoogleIcon from "../assets/google-icon.png";

const Login = () => {
    const {user, loginWithGoogle} = useAuth()

    if (user) {
        return <Navigate to="/"/>
    }
  return (
    <div className="body-custom">
      <div>
        <h1 className="display-large title">InterMod</h1>
        <h2 className="headline-large">Bienvenido de nuevo</h2>
        <p className="body-large description">Ingresa mediante tu cuenta de Google</p>

        <button className="btn-auth headline-small" onClick={loginWithGoogle}>
          <div className="icon">
            <img src={GoogleIcon} />
          </div>
          <p>Ingresa con Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
