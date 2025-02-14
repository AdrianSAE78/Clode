import { Link } from "react-router-dom";
import Arrow from "../../assets/arrow_back.png";
import Bookmarks from "../../assets/bookmarks.png";

const NavbarDetails = () => {
  return (
   <div className="nav-details">
           <div>
             <Link to={-1}>
               <div className="arrow">
                 <img src={Arrow} />
               </div>
             </Link>
           </div>
           <p className="bold title-large">Más detalles</p>
           {/* icon cart */}
           <div className="bookmarks">
             <img src={Bookmarks} />
           </div>
         </div>
  )
}

export default NavbarDetails