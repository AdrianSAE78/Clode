import { useNavigate } from "react-router-dom";
const ItemNav = ({route, icon, name}) => {

    const navigate = useNavigate()

    const handler =()=>{
        navigate(route)
    }
  return (
    <li>
      <button onClick={handler} className="icon">
        <img src={icon} alt={name}/>
      </button>
    </li>
  );
};

export default ItemNav;
