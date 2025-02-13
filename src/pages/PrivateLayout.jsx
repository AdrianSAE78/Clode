import ItemNav from "../components/itemNav";
import "../styles/layout.css";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const { user } = useAuth();

  return user ? (
    <div className="body-custom">
      <Outlet />
      <nav className="navbar">
        <ul>
          {items.map((i) => {
            return <ItemNav route={i.route} icon={i.icon} key={i.name} />;
          })}
        </ul>
      </nav>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Layout;

const items = [
  {
    icon: "/icons/home.png",
    name: "home",
    route: "/",
  },
  {
    icon: "/icons/profile.png",
    name: "profile",
    route: "/profile",
  },
  {
    icon: "/icons/add.png",
    name: "new-article",
    route: "/create-garment",
  },
];
