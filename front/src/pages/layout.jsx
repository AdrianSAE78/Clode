
import ItemNav from "../components/itemNav";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="body-custom">
      <main>{children}</main>
      <nav className="navbar">
        <ul>
            {items.map(i=>{
                return <ItemNav 
                route={i.route}
                icon={i.icon}
                key={i.name}/>
            })}
        </ul>
      </nav>
    </div>
  );
};

export default Layout;

const items=[
    {
        icon:'/icons/home.png', 
        name:"home", 
        route:'/'
    }, 
    {
        icon:'/icons/profile.png', 
        name:"profile", 
        route:'/profile'
    }, 
    {
        icon:'/icons/add.png', 
        name:"new-article", 
        route:'/new-garment'
    }
]



