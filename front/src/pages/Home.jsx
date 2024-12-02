import { Box } from "@mui/material";
import CircleLabels from "../components/circleLabels";
import Catalog from "../components/catalog";
import "../styles/main.css";
import zapatos from "../assets/products/calzado.jpg";

const Home = () => {
  return (
    <div className="body-custom">
      <div className="header">
        <h1 className="display-large">InterMod</h1>
        <div className="icon-bag">
          <img src="/icons/bag.png" alt="Liked bag" />
        </div>
      </div>
      {/* fist section */}
      <section className="water-save">
        <div className="headline-small">
          <p>Has ahorrado 54 litros.</p>
          <p>Increíble, sigue así</p>
        </div>
        <div>
          <div className="water-icon">
            <img src="/icons/water-recicle-icon.png" />
          </div>
        </div>
      </section>

      <section>
        <div className="next-appoiment">
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

      <section>
        {/* Categorie filter */}
        <div>
          <h2 className="body-medium title-categories">
            Buscar por categorías
          </h2>
          {/* Container con scroll hacia la izquierda */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              py: 1,
              overflow: "auto",
              width: "full",
              scrollSnapType: "x mandatory",
              "& > *": {
                scrollSnapAlign: "center",
                flexShrink: 0,
              },
              "::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((item) => (
              <CircleLabels
                key={item.label}
                label={item.label}
                imgSrc={item.image}
              />
            ))}
          </Box>
        </div>
        {/* Catálogo home */}
        <div className="catalog-home">
          <h2 className="body-medium title-categories">Recomendados para ti</h2>
          {/* Insertar catálogo sin preferencia alguna, solo los artículos más recientes. */}
          <Catalog />
        </div>
      </section>
    </div>
  );
};

export default Home;

const categories = [
  {
    label: "Mujer",
    image: "/categories/women.jpg",
  },
  {
    label: "Hombre",
    image: "/categories/hombre.jpg",
  },
  {
    label: "Invierno",
    image: "/categories/invierno.jpg",
  },
  {
    label: "Verano",
    image: "/categories/verano.jpg",
  },
  {
    label: "Urbano",
    image: "/categories/urbano.jpg",
  },
  {
    label: "Rock",
    image: "/categories/rock.jpg",
  },
  {
    label: "Vintage",
    image: "/categories/vintage.jpg",
  },
  {
    label: "Étnico",
    image: "/categories/etnico.jpg",
  },
  {
    label: "Bussines",
    image: "/categories/bussines.jpg",
  },
  {
    label: "Casual",
    image: "/categories/casual.jpg",
  },
  {
    label: "Deportivo",
    image: "/categories/sport.jpg",
  },
];
