import ItemNav from "../components/itemNav";
import "../styles/layout.css";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";


const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="body-custom">
      <main className="content">
        <Outlet />
      </main>

      {user && (
        <nav className="navbar">
          <ul>
            {items.map((i) => {
              return <ItemNav route={i.route} icon={i.icon} key={i.name} />;
            })}
            <li><LogoutButton /></li>
          </ul>
        </nav>
      )}
    </div>
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
    icon: "/icons/garment.png",
    name: "garments",
    route: "/garments",
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
